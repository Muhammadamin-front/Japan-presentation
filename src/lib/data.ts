/* Barcha matn va raqamlar shu faylda. Taqdimotdan oldin shu yerda tahrirlang.
   "~" belgisi — yaxlitlangan yoki taxminiy qiymat. Valyuta: € — yevro, $ — AQSh dollari. */

/** Ismingiz va guruhingizni yozing — bo‘sh qolsa, ko‘rsatilmaydi. */
export const PRESENTER = {
  name: "Odinaxon",
  group: "Meliboyeva",
  course: "Iqtisodiyot fanidan taqdimot",
}

export type SectionId = "kirish" | "davlat" | "tarix" | "daromad" | "muzeylar" | "muammolar" | "taqqoslash" | "kelajak" | "xulosa"

export const SECTIONS: { id: SectionId; label: string; latin: string }[] = [
  { id: "kirish", label: "Kirish", latin: "Introitus" },
  { id: "davlat", label: "Davlat", latin: "Civitas" },
  { id: "tarix", label: "Tarix", latin: "Historia" },
  { id: "daromad", label: "Daromad", latin: "Aerarium" },
  { id: "muzeylar", label: "Muzeylar", latin: "Musea" },
  { id: "muammolar", label: "Muammolar", latin: "Difficultates" },
  { id: "taqqoslash", label: "Taqqoslash", latin: "Comparatio" },
  { id: "kelajak", label: "Kelajak", latin: "Futurum" },
  { id: "xulosa", label: "Xulosa", latin: "Conclusio" },
]

export const HERO_READOUTS = [
  { label: "Maydoni", value: "0,49 km²", note: "dunyodagi eng kichik davlat" },
  { label: "Aholisi", value: "882", note: "rezident, 2024-yil oxiri" },
  { label: "Valyutasi", value: "Yevro", note: "Yevropa Ittifoqi bilan kelishuv" },
]

export const STATE_FACTS = [
  { value: "0,49 km²", label: "Maydoni — Toshkentning taxminan 1/890 qismi" },
  { value: "882", label: "Doimiy aholi (2024-yil 31-dekabr); fuqarolar — 673" },
  { value: "135", label: "Shveytsariya gvardiyasi — davlatning yagona «armiyasi» (2025)" },
  { value: "1929", label: "Lateran shartnomasi: Italiya Vatikanni mustaqil davlat deb tan oldi" },
]

export const TWO_VATICANS = [
  {
    name: "Muqaddas Taxt",
    latin: "Sancta Sedes",
    text: "Katolik cherkovining markaziy boshqaruvi. Xalqaro huquq subyekti: 180 dan ortiq davlat bilan diplomatik aloqada. Byudjetning asosiy qismi shu yerda.",
    figure: "~1,23 mlrd €",
    note: "operatsion daromad, 2024",
  },
  {
    name: "Vatikan shahar-davlati",
    latin: "Status Civitatis Vaticanae",
    text: "0,49 km² hudud: muzeylar, pochta, bog‘lar, pochta markalari va tangalar. Uni Gubernatorlik boshqaradi; muzeylar daromadining katta qismi shu yerga tushadi.",
    figure: "~100 mln €",
    note: "muzeylar yillik tushumi, taxmin",
  },
]

export const PAPACY = {
  name: "Leo XIV",
  text: "2025-yil 8-mayda saylangan Papa — davlat boshlig‘i va mutlaq saylov monarxi: qonun chiqaruvchi, ijro va sud hokimiyati bir qo‘lda.",
}

export const LADDER = [
  {
    year: "756",
    title: "Papa davlatlari",
    text: "Frank qiroli Pipin Markaziy Italiyadagi yerlarni Papaga topshirdi. 1100 yil davomida Papa katta hududdan soliq yig‘gan dunyoviy hukmdor bo‘ldi.",
  },
  {
    year: "1870",
    title: "Hududsiz qolish",
    text: "Italiya qo‘shini Rimni egalladi, Papa davlatlari tugadi. 59 yil davomida Papa o‘zini «Vatikan asiri» deb atadi — soliq tushumi yo‘qoldi.",
  },
  {
    year: "1929",
    title: "Lateran shartnomasi",
    text: "Mussolini hukumati Vatikanni mustaqil davlat deb tan oldi va tovon to‘ladi: 750 mln lira naqd va 1 mlrd lira davlat obligatsiyasi. Bu pul — bugungi APSA mulkining asosi.",
  },
  {
    year: "1942",
    title: "Vatikan banki — IOR",
    text: "«Diniy ishlar instituti» (IOR) tashkil etildi: cherkov tashkilotlari, ruhoniylar va xodimlarning pulini saqlaydi va boshqaradi.",
  },
  {
    year: "1982",
    title: "Banco Ambrosiano",
    text: "IOR bilan bog‘liq Italiya banki ~1,3 mlrd $ teshik bilan qulab tushdi. 1984-yilda IOR javobgarlikni tan olmay, kreditorlarga 224 mln $ to‘ladi.",
  },
  {
    year: "2002",
    title: "Yevro",
    text: "Vatikan lirasi o‘rniga yevro keldi. 2009-yilgi Yevropa Ittifoqi bilan valyuta kelishuvi tangalar chiqarish chegarasini belgilaydi.",
  },
  {
    year: "2014",
    title: "Moliyaviy islohot",
    text: "Papa Fransisk Iqtisodiyot kotibiyati va Iqtisodiyot kengashini tuzdi: xalqaro buxgalteriya standartlari, audit, ochiq hisobotlar.",
  },
  {
    year: "2025",
    title: "Yubiley va yangi Papa",
    text: "Muqaddas yil: Rimga 33,5 mln ziyoratchi keldi. 21-aprelda Papa Fransisk vafot etdi, 8-mayda Leo XIV saylandi.",
  },
]

/** Muqaddas Taxt konsolidatsiyalangan hisoboti, 2024 (Iqtisodiyot kotibiyati, 2025-noyabr). */
export const BUDGET_2024 = {
  income: 1.23,
  expense: 1.275,
  result: 1.6,
  /** Shifoxonalarsiz daromad, mln € */
  core: 546.5,
  split: [
    { label: "Xayriyalar", value: 43, note: "yeparxiyalar, dindorlar, jamg‘armalar" },
    { label: "O‘z daromadi", value: 40, note: "ko‘chmas mulk, nashriyot, xizmatlar" },
    { label: "Moliyaviy va boshqa", value: 17, note: "investitsiyalar va boshqalar" },
  ],
}

/** Pul qayerdan keladi — to‘rt «favvora». */
export const SOURCES_OF_MONEY = [
  {
    name: "Vatikan muzeylari",
    latin: "Musea Vaticana",
    figure: "~100 mln €",
    meaning: "yiliga chipta va suvenirlardan",
    text: "6,8 mln tashrif (2024). Muzeylar o‘z pulini o‘zida saqlamaydi: tushum butun shahar-davlat xarajatini qoplaydi — bu Gubernatorlik daromadining qariyb yarmi.",
  },
  {
    name: "Avliyo Pyotr ulushi",
    latin: "Obolus Sancti Petri",
    figure: "57,6 mln €",
    meaning: "2025-yildagi tushum",
    text: "Butun dunyo dindorlarining yillik xayriyasi. Eng ko‘p — AQShdan (14,2 mln €), keyin Italiya va Braziliya. 2025-yilda xarajat 59,8 mln € bo‘ldi.",
  },
  {
    name: "Vatikan banki (IOR)",
    latin: "Institutum pro Operibus Religionis",
    figure: "51 mln €",
    meaning: "sof foyda, 2025",
    text: "Mijozlar aktivi 5,9 mlrd €. Foyda 2024-yilga nisbatan 55,5% o‘sdi; Papaga 24,3 mln € dividend ajratildi.",
  },
  {
    name: "APSA — mulk boshqaruvi",
    latin: "Patrimonium Sedis Apostolicae",
    figure: "62,2 mln €",
    meaning: "sof foyda, 2024",
    text: "5 000 dan ortiq ko‘chmas mulk birligi (Italiyada 4 234 ta). Ijaradan 35,1 mln € natija; Muqaddas Taxt kamomadiga 46,1 mln € qo‘shdi.",
  },
]

export const NO_TAX = [
  {
    title: "Soliq yo‘q",
    text: "Vatikan xodimlari va fuqarolari daromad solig‘i to‘lamaydi. Davlat byudjeti soliq emas, xayriya va mulk daromadiga tayanadi.",
  },
  {
    title: "O‘z valyutasi yo‘q",
    text: "Pul-kredit siyosati yo‘q, markaziy bank yo‘q — Vatikan yevrodan foydalanadi va Yevropa Ittifoqi ruxsat bergan miqdorda yevro tangalar zarb qiladi.",
  },
  {
    title: "Kollektsiya bozori",
    text: "Vatikan yevro tangalari va pochta markalari asosan kolleksionerlarga nominaldan qimmatroq sotiladi — kichik, ammo barqaror daromad.",
  },
]

export const MUSEUM_ITEMS = [
  {
    img: "/images/sistine.jpg",
    title: "Sikstin kapellasi",
    sub: "Mikelanjelo, 1508–1512",
    desc: "Muzeylar marshrutining yakuni: har bir tashrifchi chiptasi aynan shu shiftga olib boradi.",
  },
  {
    img: "/images/athens.jpg",
    title: "Afina maktabi",
    sub: "Rafael, 1509–1511",
    desc: "Rafael xonalari — muzeylarning eng ko‘p suratga olinadigan qismlaridan biri.",
  },
  {
    img: "/images/laocoon.jpg",
    title: "Laokoon",
    sub: "Pio-Klementino muzeyi",
    desc: "1506-yilda topilgan antik haykal — Vatikan muzeylari kolleksiyasining boshlanishi.",
  },
  {
    img: "/images/maps.jpg",
    title: "Xaritalar galereyasi",
    sub: "Ignatsio Danti, 1580–1585",
    desc: "120 metrlik yo‘lak: 40 ta freska-xarita. Har kuni o‘n minglab odam shu yerdan o‘tadi.",
  },
  {
    img: "/images/basilica-blue.jpg",
    title: "Avliyo Pyotr sobori",
    sub: "Kirish bepul",
    desc: "Soborga kirish bepul — daromad xayriya, gumbazga chiqish va muzeylar orqali keladi.",
  },
  {
    img: "/images/guard.jpg",
    title: "Shveytsariya gvardiyasi",
    sub: "1506-yildan beri",
    desc: "135 kishilik qo‘riqchi — xavfsizlik ham turizm brendining bir qismi.",
  },
]

/** Muqaddas Taxt yakuniy natijasi va operatsion kamomadi, mln €. */
export const DEFICITS = [
  { year: "2023", operating: -83, result: -51.2 },
  { year: "2024", operating: -44, result: 1.6 },
]

export const PROBLEMS = [
  {
    figure: "≥139 mln €",
    date: "2019–2026",
    title: "London binosi janjali",
    text: "Davlat kotibiyati Londondagi Sloane Avenue binosiga ~350 mln € tikdi va zarar bilan sotdi. 2023-yilda kardinal Bechchu 5,5 yilga hukm qilindi; apellyatsiya 2026-yilda davom etmoqda.",
  },
  {
    figure: "~631 mln €",
    date: "2022 · 2024",
    title: "Pensiya jamg‘armasi",
    text: "2022-yildagi baho bo‘yicha kelajakdagi pensiya majburiyatlari yetishmovchiligi. 2024-yil noyabrida Papa Fransisk «jiddiy nomutanosiblik» haqida ogohlantirdi.",
  },
  {
    figure: "−2,2 mln €",
    date: "2025",
    title: "Xayriyalar kamaymoqda",
    text: "Avliyo Pyotr ulushi 2025-yilda ham xarajatni to‘liq qoplamadi; 2010-yillar boshidagi tushumlardan ancha past.",
  },
]

/** Taqqoslash bo‘limi. */
export const SCALE_STOPS = [
  {
    title: "O‘zbekiston",
    text: "448 969 km² — Vatikandan ~916 ming marta katta.",
  },
  {
    title: "Toshkent",
    text: "435 km² — doira shahar maydoniga teng. Vatikan Toshkentga ~890 marta sig‘adi.",
  },
  {
    title: "Vatikan",
    text: "0,49 km² — xuddi shu masshtabda, Toshkent markaziga qo‘yilgan. Uni piyoda 40 daqiqada aylanib chiqish mumkin.",
  },
]

export type CompareRow = { topic: string; va: string; uz: string; ratio?: string }

export const COMPARE: CompareRow[] = [
  { topic: "Maydoni", va: "0,49 km²", uz: "448 969 km²", ratio: "×916 000" },
  { topic: "Aholisi", va: "882", uz: "~39 mln", ratio: "×44 000" },
  { topic: "Iqtisodiyot hajmi", va: "YaIM hisoblanmaydi", uz: "YaIM ~147 mlrd $ (2025)" },
  { topic: "Byudjet daromadi", va: "~1,23 mlrd € (2024)", uz: "~41,3 mlrd $ (2025)", ratio: "×~30" },
  { topic: "Asosiy daromad", va: "Xayriya va mulk", uz: "Soliqlar (QQS, foyda solig‘i)" },
  { topic: "Valyuta", va: "Yevro, markaziy bank yo‘q", uz: "So‘m, Markaziy bank" },
  { topic: "Daromad solig‘i", va: "Yo‘q", uz: "12%" },
  { topic: "Iqtisodiy o‘sish", va: "O‘lchanmaydi", uz: "7,7% (2025)" },
  { topic: "Sayyohlar", va: "6,8 mln (muzeylar, 2024)", uz: "11,7 mln xorijiy (2025)" },
  { topic: "YuNESKO merosi", va: "Butun davlat — 1 obyekt", uz: "8 obyekt (2026)" },
  { topic: "Davlatchilik", va: "1929 · saylov monarxiyasi", uz: "1991 · prezidentlik respublikasi" },
]

export const COMPARE_LESSONS = [
  {
    title: "Meros — daromad manbai",
    text: "6,8 mln muzey tashrifi ~100 mln € beradi. Samarqand, Buxoro, Xiva va endi Toshkent modernizmi uchun yagona chipta, bron va narx siyosati shu darajadagi tushum keltirishi mumkin.",
  },
  {
    title: "Shaffoflik ishonch yaratadi",
    text: "Vatikan 2014-yildan keyin ochiq hisobot berishni boshladi va 2024-yilda kamomaddan chiqdi. Ochiq byudjet — investor va donor ishonchi.",
  },
  {
    title: "Masshtab emas, model muhim",
    text: "O‘zbekiston — ishlab chiqaruvchi, o‘sayotgan iqtisodiyot; Vatikan — xayriya va mulk bilan yashovchi institut. Ularni bir xil o‘lchov bilan baholab bo‘lmaydi.",
  },
]

export const FUTURE = [
  {
    title: "«Fratello Sole» quyosh-agro stansiyasi",
    text: "Santa Mariya di Galeriyada 80–90 MVt quvvatli agrivoltaik stansiya, ~100 mln € loyiha: Italiya bilan kelishuv 2026-yil 28-mayda kuchga kirdi. Maqsad — Vatikanni to‘liq energiya bilan ta’minlash.",
  },
  {
    title: "Pensiya islohoti",
    text: "Kardinal Farrell jamg‘armaning yagona boshqaruvchisi etib tayinlandi: majburiyatlarni qayta hisoblash va tizimni barqarorlashtirish.",
  },
  {
    title: "Leo XIV va moliya",
    text: "Yangi Papa davrida IOR rekord foyda berdi; xarajatlarni qisqartirish va xayriyalarni ochiq hisob bilan jalb qilish davom etmoqda.",
  },
  {
    title: "Turizm — asosiy tayanch",
    text: "Yubiley tugadi, ammo muzeylar va ziyorat turizmi daromadning eng barqaror manbai bo‘lib qoladi.",
  },
]

export const CONCLUSIONS = [
  "Vatikan — oddiy davlat iqtisodiyoti emas: soliq, sanoat va o‘z valyutasi yo‘q; u xayriya, mulk va madaniy meros daromadi bilan yashovchi global institut.",
  "Moliyaviy janjallar va kamomadlar islohotga majbur qildi: 2024-yilda Muqaddas Taxt yillar davomidagi kamomaddan so‘ng ilk bor profitsit bilan yopildi.",
  "O‘zbekiston bilan taqqoslash ko‘rsatadiki, iqtisodiy kuch hudud va aholiga emas, daromad modeli va boshqaruv sifatiga bog‘liq.",
]

export const SOURCES = [
  "Muqaddas Taxt Iqtisodiyot kotibiyati — 2024-yil konsolidatsiyalangan moliyaviy hisoboti (2025-noyabr)",
  "APSA — 2024-yil moliyaviy hisoboti (2025-iyul)",
  "IOR (Vatikan banki) — 2024 va 2025-yil yillik hisobotlari",
  "Avliyo Pyotr ulushi — 2024 va 2025-yil hisobotlari",
  "Vatican State — population (vaticanstate.va), 2024-yil 31-dekabr",
  "The Art Newspaper — muzeylar tashrifi reytingi, 2025; Vatikan muzeylari",
  "Yangi evangelizatsiya dikasteriyasi — Yubiley 2025 yakunlari",
  "Yevropa Ittifoqi — Vatikan bilan valyuta kelishuvi (2009)",
  "O‘zbekiston Milliy statistika qo‘mitasi — YaIM 2025, aholi 2026",
  "O‘zbekiston Iqtisodiyot va moliya vazirligi — 2025-yil byudjet ijrosi",
  "Turizm qo‘mitasi — 2025-yil xorijiy sayyohlar; YuNESKO Butunjahon meros markazi",
  "Xaritalar: Natural Earth (ochiq), OpenStreetMap (© OSM hissadorlari, ODbL)",
]

/** Suratlar — Wikimedia Commons; har biri o‘z litsenziyasi bilan. */
export const PHOTO_CREDITS = [
  "Vatikan havodan — Helloworld314, CC BY-SA 4.0",
  "Gumbaz va bog‘lar, Sobor, Gvardiya — Jebulon, CC0",
  "Sikstin shifti (surat) — CC BY-SA 3.0; Afina maktabi — jamoat mulki",
  "Laokoon — Wilfredor, CC0; Xaritalar galereyasi — Alvesgaspar, CC BY-SA 4.0",
  "Kechki Vatikan — lafiguradelpadre, CC BY 2.0",
]
