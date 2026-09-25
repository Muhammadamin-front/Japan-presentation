"use client"

/**
 * InkBasin — a suminagashi basin rendered as a WebGL2 stable-fluid solver.
 *
 * Translation of the "Tubes" cursor hero (Hero animate.md) into the ink world:
 * the pointer still drags a current through the scene, and a click still changes
 * the pigment — here it drops a new ring of ink onto the water.
 *
 * Two mechanisms work together:
 * 1. A Navier–Stokes solver (advection, vorticity, pressure projection) moves the
 *    dye when the pointer or the "fan" drags the surface.
 * 2. Drops use the area-preserving marbling map p' = c + (p − c)·√(1 + A/π|p − c|²):
 *    each new drop pushes every earlier ring outward, exactly as ink and
 *    surfactant do on water. The newest drop is always the darkest region.
 *
 * Dye is stored as absorbance and shown with Beer–Lambert (paper · e^(−dye)),
 * so thinning ink fades to gray-blue instead of going transparent.
 */

import * as React from "react"
import { cn } from "@/lib/utils"

type Pigment = [number, number, number]

const PAPER: Pigment = [0xf6 / 255, 0xf7 / 255, 0xf9 / 255]

/** Absorbance that turns paper into the given ink colour at full strength. */
function pigmentFrom(hex: string, strength = 1): Pigment {
  const n = parseInt(hex.slice(1), 16)
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255)
  return c.map((v, i) => -Math.log(Math.max(v, 0.01) / PAPER[i]) * strength) as Pigment
}

const INDIGO = pigmentFrom("#1e2d4a")
const SUMI = pigmentFrom("#14171d", 0.9)
const DILUTE = pigmentFrom("#1e2d4a", 0.42)
const CLEAR: Pigment = [0, 0, 0]
const INKS = [INDIGO, SUMI, DILUTE]

const CFG = {
  simRes: 128,
  dyeRes: 1024,
  densityDissipation: 0.018,
  velocityDissipation: 0.9,
  pressure: 0.8,
  pressureIterations: 20,
  curl: 6,
  splatRadius: 0.0009,
  splatForce: 3200,
}

// ── GLSL ────────────────────────────────────────────────────────────────────

const VERT = `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv; out vec2 vL; out vec2 vR; out vec2 vT; out vec2 vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`

const HEAD = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
out vec4 fragColor;
`

const FRAG = {
  copy: `${HEAD}
uniform sampler2D uTexture;
void main () { fragColor = texture(uTexture, vUv); }`,

  clear: `${HEAD}
uniform sampler2D uTexture; uniform float value;
void main () { fragColor = value * texture(uTexture, vUv); }`,

  splat: `${HEAD}
uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color; uniform vec2 point; uniform float radius;
void main () {
  vec2 p = vUv - point; p.x *= aspectRatio;
  vec3 s = exp(-dot(p, p) / radius) * color;
  fragColor = vec4(texture(uTarget, vUv).xyz + s, 1.0);
}`,

  advection: `${HEAD}
uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 texelSize; uniform float dt; uniform float dissipation;
void main () {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
  fragColor = texture(uSource, coord) / (1.0 + dissipation * dt);
}`,

  divergence: `${HEAD}
uniform sampler2D uVelocity;
void main () {
  float L = texture(uVelocity, vL).x; float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y; float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) L = -C.x; if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y; if (vB.y < 0.0) B = -C.y;
  fragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`,

  curl: `${HEAD}
uniform sampler2D uVelocity;
void main () {
  float L = texture(uVelocity, vL).y; float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x; float B = texture(uVelocity, vB).x;
  fragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,

  vorticity: `${HEAD}
uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt;
void main () {
  float L = texture(uCurl, vL).x; float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x; float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C; force.y *= -1.0;
  vec2 v = texture(uVelocity, vUv).xy + force * dt;
  fragColor = vec4(clamp(v, -1000.0, 1000.0), 0.0, 1.0);
}`,

  pressure: `${HEAD}
uniform sampler2D uPressure; uniform sampler2D uDivergence;
void main () {
  float L = texture(uPressure, vL).x; float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x; float B = texture(uPressure, vB).x;
  float d = texture(uDivergence, vUv).x;
  fragColor = vec4((L + R + B + T - d) * 0.25, 0.0, 0.0, 1.0);
}`,

  gradient: `${HEAD}
uniform sampler2D uPressure; uniform sampler2D uVelocity;
void main () {
  float L = texture(uPressure, vL).x; float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x; float B = texture(uPressure, vB).x;
  vec2 v = texture(uVelocity, vUv).xy - vec2(R - L, T - B);
  fragColor = vec4(v, 0.0, 1.0);
}`,

  // Area-preserving marbling drop: pixels at radius r sample the dye that sat at √(r² − A/π).
  drop: `${HEAD}
uniform sampler2D uTarget; uniform vec2 center; uniform float aspectRatio;
uniform float area; uniform vec3 pigment; uniform float softness;
void main () {
  vec2 d = vUv - center; d.x *= aspectRatio;
  float r2 = dot(d, d);
  float a = area / 3.14159265;
  vec4 base = vec4(pigment, 1.0);
  if (r2 > a) {
    vec2 src = d * sqrt((r2 - a) / r2);
    src.x /= aspectRatio;
    base = texture(uTarget, center + src);
  }
  float k = smoothstep(sqrt(a) - softness, sqrt(a) + softness, sqrt(r2));
  fragColor = mix(vec4(pigment, 1.0), base, k);
}`,

  // Unsharp mask on the dye before Beer–Lambert: advection softens edges every
  // frame, this restores the hairline veins that real suminagashi keeps.
  display: `${HEAD}
uniform sampler2D uTexture; uniform vec3 paper; uniform vec2 dyeTexel;
float hash (vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main () {
  vec3 c = texture(uTexture, vUv).rgb;
  vec2 o = dyeTexel * 1.5;
  vec3 blur = (texture(uTexture, vUv + vec2(o.x, 0.0)).rgb + texture(uTexture, vUv - vec2(o.x, 0.0)).rgb
             + texture(uTexture, vUv + vec2(0.0, o.y)).rgb + texture(uTexture, vUv - vec2(0.0, o.y)).rgb) * 0.25;
  vec3 a = max(c + (c - blur) * 1.1, 0.0);
  vec3 col = paper * exp(-a);
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  fragColor = vec4(col, 1.0);
}`,
}

// ── GL helpers ──────────────────────────────────────────────────────────────

type Program = { program: WebGLProgram; uniforms: Record<string, WebGLUniformLocation> }
type FBO = {
  texture: WebGLTexture
  fbo: WebGLFramebuffer
  width: number
  height: number
  texelSizeX: number
  texelSizeY: number
  attach: (id: number) => number
}
type DoubleFBO = { read: FBO; write: FBO; swap: () => void; width: number; height: number; texelSizeX: number; texelSizeY: number }

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader")
  return s
}

function makeProgram(gl: WebGL2RenderingContext, vs: WebGLShader, fsSrc: string): Program {
  const program = gl.createProgram()!
  gl.attachShader(program, vs)
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fsSrc))
  gl.bindAttribLocation(program, 0, "aPosition")
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? "link")
  const uniforms: Record<string, WebGLUniformLocation> = {}
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number
  for (let i = 0; i < count; i++) {
    const name = gl.getActiveUniform(program, i)!.name
    uniforms[name] = gl.getUniformLocation(program, name)!
  }
  return { program, uniforms }
}

function makeFBO(gl: WebGL2RenderingContext, w: number, h: number, internal: number, format: number): FBO {
  gl.activeTexture(gl.TEXTURE0)
  const texture = gl.createTexture()!
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, gl.HALF_FLOAT, null)
  const fbo = gl.createFramebuffer()!
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
  gl.viewport(0, 0, w, h)
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  return {
    texture,
    fbo,
    width: w,
    height: h,
    texelSizeX: 1 / w,
    texelSizeY: 1 / h,
    attach(id) {
      gl.activeTexture(gl.TEXTURE0 + id)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      return id
    },
  }
}

function makeDouble(gl: WebGL2RenderingContext, w: number, h: number, internal: number, format: number): DoubleFBO {
  let a = makeFBO(gl, w, h, internal, format)
  let b = makeFBO(gl, w, h, internal, format)
  return {
    width: w,
    height: h,
    texelSizeX: 1 / w,
    texelSizeY: 1 / h,
    get read() {
      return a
    },
    get write() {
      return b
    },
    swap() {
      const t = a
      a = b
      b = t
    },
  } as DoubleFBO
}

function resolution(gl: WebGL2RenderingContext, res: number) {
  let aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
  if (aspect < 1) aspect = 1 / aspect
  const min = Math.round(res)
  const max = Math.round(res * aspect)
  return gl.drawingBufferWidth > gl.drawingBufferHeight ? { w: max, h: min } : { w: min, h: max }
}

// ── Choreography ────────────────────────────────────────────────────────────

type Drop = { kind: "drop"; at: number; x: number; y: number; area: number; pigment: Pigment; frames: number; done: number }
type Stroke = { kind: "stroke"; at: number; dur: number; path: (s: number) => [number, number]; force: number; last?: [number, number] }
type Action = Drop | Stroke

const rand = (a: number, b: number) => a + Math.random() * (b - a)

/** Alternating ink and clear-water drops at one point, ending on the darkest ink. */
function rings(x: number, y: number, count: number, area: number, start: number, gap = 0.2): Drop[] {
  const out: Drop[] = []
  for (let i = 0; i < count; i++) {
    const last = i === count - 1
    const ink = (count - 1 - i) % 2 === 0
    out.push({
      kind: "drop",
      at: start + i * gap,
      x,
      y,
      area: area * (ink ? 1 : 0.75) * rand(0.7, 1.3),
      pigment: last ? INDIGO : ink ? INKS[Math.floor(Math.random() * INKS.length)] : CLEAR,
      frames: 9,
      done: 0,
    })
  }
  return out
}

export interface InkBasinProps extends React.ComponentProps<"div"> {
  /** Keep dropping new ink while the presenter is not touching the basin. */
  auto?: boolean
  onInkDrop?: (count: number) => void
}

export function InkBasin({ auto = true, onInkDrop, className, children, ...rest }: InkBasinProps) {
  const hostRef = React.useRef<HTMLDivElement>(null)
  const [failed, setFailed] = React.useState(false)
  const onDropRef = React.useRef(onInkDrop)
  onDropRef.current = onInkDrop

  React.useEffect(() => {
    const host = hostRef.current
    if (!host) return
    // A fresh canvas per effect run: the cleanup loses its context, so a
    // StrictMode remount (or fast refresh) must never reuse a dead one.
    const canvas = document.createElement("canvas")
    canvas.setAttribute("aria-hidden", "true")
    canvas.className = "absolute inset-0 -z-10 block size-full touch-none"
    host.prepend(canvas)

    const gl = canvas.getContext("webgl2", { alpha: false, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: false })
    if (!gl || !(gl.getExtension("EXT_color_buffer_float") || gl.getExtension("EXT_color_buffer_half_float"))) {
      canvas.remove()
      setFailed(true)
      return
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let programs: Record<keyof typeof FRAG, Program>
    try {
      const vs = compile(gl, gl.VERTEX_SHADER, VERT)
      programs = Object.fromEntries(
        (Object.keys(FRAG) as (keyof typeof FRAG)[]).map((k) => [k, makeProgram(gl, vs, FRAG[k])]),
      ) as Record<keyof typeof FRAG, Program>
    } catch (err) {
      console.warn("InkBasin: shader failed", err)
      canvas.remove()
      setFailed(true)
      return
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(0)

    const blit = (target: FBO | null) => {
      if (target) {
        gl.viewport(0, 0, target.width, target.height)
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo)
      } else {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
    }
    const use = (p: Program) => {
      gl.useProgram(p.program)
      return p.uniforms
    }

    let dye: DoubleFBO
    let velocity: DoubleFBO
    let divergence: FBO
    let curl: FBO
    let pressure: DoubleFBO

    const resizeDouble = (old: DoubleFBO, w: number, h: number, internal: number, format: number) => {
      if (old.width === w && old.height === h) return old
      const next = makeDouble(gl, w, h, internal, format)
      const u = use(programs.copy)
      gl.uniform2f(u.texelSize, 1 / w, 1 / h)
      gl.uniform1i(u.uTexture, old.read.attach(0))
      blit(next.write)
      next.swap()
      return next
    }

    const initFramebuffers = (first: boolean) => {
      const sim = resolution(gl, CFG.simRes)
      const dyeR = resolution(gl, CFG.dyeRes)
      gl.disable(gl.BLEND)
      if (first) {
        dye = makeDouble(gl, dyeR.w, dyeR.h, gl.RGBA16F, gl.RGBA)
        velocity = makeDouble(gl, sim.w, sim.h, gl.RG16F, gl.RG)
      } else {
        dye = resizeDouble(dye, dyeR.w, dyeR.h, gl.RGBA16F, gl.RGBA)
        velocity = resizeDouble(velocity, sim.w, sim.h, gl.RG16F, gl.RG)
      }
      divergence = makeFBO(gl, sim.w, sim.h, gl.R16F, gl.RED)
      curl = makeFBO(gl, sim.w, sim.h, gl.R16F, gl.RED)
      pressure = makeDouble(gl, sim.w, sim.h, gl.R16F, gl.RED)
    }

    const fit = () => {
      const rect = host.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.round(rect.width * dpr))
      const h = Math.max(1, Math.round(rect.height * dpr))
      if (canvas.width === w && canvas.height === h) return false
      canvas.width = w
      canvas.height = h
      return true
    }

    fit()
    initFramebuffers(true)

    const aspect = () => canvas.width / canvas.height

    const splatVelocity = (x: number, y: number, dx: number, dy: number) => {
      const u = use(programs.splat)
      gl.uniform1i(u.uTarget, velocity.read.attach(0))
      gl.uniform1f(u.aspectRatio, aspect())
      gl.uniform2f(u.point, x, y)
      gl.uniform3f(u.color, dx, dy, 0)
      const r = CFG.splatRadius * (aspect() > 1 ? aspect() : 1)
      gl.uniform1f(u.radius, r)
      blit(velocity.write)
      velocity.swap()
    }

    const dropStep = (d: Drop) => {
      const u = use(programs.drop)
      gl.uniform1i(u.uTarget, dye.read.attach(0))
      gl.uniform2f(u.center, d.x, d.y)
      gl.uniform1f(u.aspectRatio, aspect())
      gl.uniform1f(u.area, d.area / d.frames)
      gl.uniform3f(u.pigment, d.pigment[0], d.pigment[1], d.pigment[2])
      gl.uniform1f(u.softness, 1.2 / dye.height)
      blit(dye.write)
      dye.swap()
    }

    const step = (dt: number) => {
      gl.disable(gl.BLEND)
      let u = use(programs.curl)
      gl.uniform2f(u.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl.uniform1i(u.uVelocity, velocity.read.attach(0))
      blit(curl)

      u = use(programs.vorticity)
      gl.uniform2f(u.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl.uniform1i(u.uVelocity, velocity.read.attach(0))
      gl.uniform1i(u.uCurl, curl.attach(1))
      gl.uniform1f(u.curl, CFG.curl)
      gl.uniform1f(u.dt, dt)
      blit(velocity.write)
      velocity.swap()

      u = use(programs.divergence)
      gl.uniform2f(u.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl.uniform1i(u.uVelocity, velocity.read.attach(0))
      blit(divergence)

      u = use(programs.clear)
      gl.uniform1i(u.uTexture, pressure.read.attach(0))
      gl.uniform1f(u.value, CFG.pressure)
      blit(pressure.write)
      pressure.swap()

      u = use(programs.pressure)
      gl.uniform2f(u.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl.uniform1i(u.uDivergence, divergence.attach(0))
      for (let i = 0; i < CFG.pressureIterations; i++) {
        gl.uniform1i(u.uPressure, pressure.read.attach(1))
        blit(pressure.write)
        pressure.swap()
      }

      u = use(programs.gradient)
      gl.uniform2f(u.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl.uniform1i(u.uPressure, pressure.read.attach(0))
      gl.uniform1i(u.uVelocity, velocity.read.attach(1))
      blit(velocity.write)
      velocity.swap()

      u = use(programs.advection)
      gl.uniform2f(u.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      const vid = velocity.read.attach(0)
      gl.uniform1i(u.uVelocity, vid)
      gl.uniform1i(u.uSource, vid)
      gl.uniform1f(u.dt, dt)
      gl.uniform1f(u.dissipation, CFG.velocityDissipation)
      blit(velocity.write)
      velocity.swap()

      gl.uniform1i(u.uVelocity, velocity.read.attach(0))
      gl.uniform1i(u.uSource, dye.read.attach(1))
      gl.uniform1f(u.dissipation, CFG.densityDissipation)
      blit(dye.write)
      dye.swap()
    }

    const render = () => {
      const u = use(programs.display)
      gl.uniform1i(u.uTexture, dye.read.attach(0))
      gl.uniform3f(u.paper, PAPER[0], PAPER[1], PAPER[2])
      gl.uniform2f(u.dyeTexel, dye.texelSizeX, dye.texelSizeY)
      blit(null)
    }

    // ── choreography ──
    let clock = 0
    let drops = 0
    let lastTouch = -10
    let nextAuto = 11
    const actions: Action[] = [
      ...rings(0.72, 0.55, 11, 0.0068, 0.15, 0.16),
      ...rings(0.8, 0.16, 7, 0.0042, 0.9, 0.16),
      ...rings(0.6, 0.9, 5, 0.0026, 1.6, 0.16),
      {
        kind: "stroke",
        at: 3.6,
        dur: 3.2,
        force: 0.3,
        path: (s) => [0.42 + s * 0.6, 0.98 - s * 0.95 + Math.sin(s * Math.PI * 2) * 0.08],
      },
      // The fan pass: a comb of alternating tines drawn through the rings pulls them into feathered veins.
      ...[0.3, 0.44, 0.58, 0.72].map(
        (ty, i): Stroke => ({
          kind: "stroke",
          at: 5.2 + i * 0.35,
          dur: 2.4,
          force: 0.34,
          path: (s) => (i % 2 === 0 ? [0.48 + s * 0.56, ty + Math.sin(s * Math.PI) * 0.02] : [1.04 - s * 0.56, ty - Math.sin(s * Math.PI) * 0.02]),
        }),
      ),
      {
        kind: "stroke",
        at: 8.4,
        dur: 2.6,
        force: 0.26,
        path: (s) => [1.02 - s * 0.5, 0.44 + Math.sin(s * Math.PI * 3) * 0.05],
      },
    ]

    const addDrops = (list: Drop[]) => {
      actions.push(...list)
    }

    const runActions = () => {
      for (let i = actions.length - 1; i >= 0; i--) {
        const a = actions[i]
        if (clock < a.at) continue
        if (a.kind === "drop") {
          if (a.done === 0 && a.pigment !== CLEAR) {
            drops += 1
            onDropRef.current?.(drops)
          }
          dropStep(a)
          a.done += 1
          if (a.done >= a.frames) actions.splice(i, 1)
        } else {
          const s = Math.min(1, (clock - a.at) / a.dur)
          const p = a.path(s)
          if (a.last) splatVelocity(p[0], p[1], (p[0] - a.last[0]) * CFG.splatForce * a.force, (p[1] - a.last[1]) * CFG.splatForce * a.force)
          a.last = p
          if (s >= 1) actions.splice(i, 1)
        }
      }
    }

    const scheduleAuto = () => {
      if (!auto || reduce) return
      if (clock < nextAuto) return
      if (clock - lastTouch < 5) {
        nextAuto = clock + 3
        return
      }
      const x = rand(0.56, 0.82)
      const y = rand(0.15, 0.85)
      addDrops(rings(x, y, 3 + Math.floor(Math.random() * 3) * 2, rand(0.0025, 0.005), clock + 0.05, 0.22))
      const ang = rand(0, Math.PI * 2)
      const len = rand(0.25, 0.45)
      const sx = x + Math.cos(ang) * 0.25
      const sy = y + Math.sin(ang) * 0.25
      actions.push({
        kind: "stroke",
        at: clock + 2.4,
        dur: 1.8,
        force: 0.2,
        path: (s) => [sx - Math.cos(ang) * len * s, sy - Math.sin(ang) * len * s + Math.sin(s * Math.PI * 2) * 0.03],
      })
      nextAuto = clock + rand(8, 11)
    }

    // ── pointer: drag = current, click = new drop ──
    let pointer: { x: number; y: number; down: boolean; moved: number } | null = null
    const toUv = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      return [(e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height] as const
    }
    const onMove = (e: PointerEvent) => {
      if (reduce) return
      const [x, y] = toUv(e)
      if (x < 0 || x > 1 || y < 0 || y > 1) return
      if (pointer) {
        const dx = x - pointer.x
        const dy = y - pointer.y
        if (Math.abs(dx) + Math.abs(dy) > 0) {
          splatVelocity(x, y, dx * CFG.splatForce, dy * CFG.splatForce)
          pointer.moved += Math.hypot(dx, dy)
        }
        pointer.x = x
        pointer.y = y
      } else pointer = { x, y, down: false, moved: 0 }
      lastTouch = clock
      wake()
    }
    const onDown = (e: PointerEvent) => {
      const [x, y] = toUv(e)
      pointer = { x, y, down: true, moved: 0 }
    }
    const onUp = (e: PointerEvent) => {
      if (!pointer?.down) return
      const target = e.target as HTMLElement
      if (target.closest("a,button")) return
      if (pointer.moved < 0.02) {
        const [x, y] = toUv(e)
        addDrops(rings(x, y, 3, rand(0.003, 0.0055), clock, 0.18))
        lastTouch = clock
        wake()
      }
      pointer.down = false
    }
    const onLeave = () => {
      pointer = null
    }

    // ── loop ──
    let raf = 0
    let last = performance.now()
    let visible = true
    const frozenAfter = reduce ? 9 : Infinity

    const frame = (now: number) => {
      raf = 0
      const dt = Math.min((now - last) / 1000, 1 / 60)
      last = now
      clock += dt
      if (fit()) initFramebuffers(false)
      runActions()
      scheduleAuto()
      step(dt)
      render()
      if (visible && !document.hidden && clock < frozenAfter) raf = requestAnimationFrame(frame)
    }
    const wake = () => {
      if (!raf && visible && !document.hidden) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true
        if (visible) wake()
      },
      { threshold: 0 },
    )
    io.observe(host)
    const onVis = () => wake()
    const ro = new ResizeObserver(() => wake())
    ro.observe(host)
    document.addEventListener("visibilitychange", onVis)
    host.addEventListener("pointermove", onMove)
    host.addEventListener("pointerdown", onDown)
    host.addEventListener("pointerup", onUp)
    host.addEventListener("pointerleave", onLeave)
    wake()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener("visibilitychange", onVis)
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerdown", onDown)
      host.removeEventListener("pointerup", onUp)
      host.removeEventListener("pointerleave", onLeave)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
      canvas.remove()
    }
  }, [auto])

  return (
    <div ref={hostRef} className={cn("relative isolate overflow-hidden bg-paper", className)} {...rest}>
      {failed && <StaticRings />}
      {children}
    </div>
  )
}

/** Fallback when WebGL2 float buffers are unavailable: a still set of rings. */
function StaticRings() {
  const radii = [300, 262, 230, 196, 170, 138, 112, 84, 60, 36]
  return (
    <svg aria-hidden="true" className="absolute inset-0 -z-10 size-full" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
      {radii.map((r, i) => (
        <circle key={r} cx="690" cy="320" r={r} fill={i % 2 === 0 ? (i === radii.length - 1 ? "#1e2d4a" : "#aeb6c2") : "#f6f7f9"} opacity={0.25 + i * 0.05} />
      ))}
    </svg>
  )
}

export default InkBasin
