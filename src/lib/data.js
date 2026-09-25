/* Barcha matn va raqamlar shu faylda. Taqdimotdan oldin shu yerda tahrirlang.
   "~" belgisi — yaxlitlangan yoki taxminiy qiymat. */

/** Ismingiz va guruhingizni yozing — bo‘sh qolsa, ko‘rsatilmaydi. */
export const PRESENTER = {
  name: "",
  group: "",
  course: "Iqtisodiyot fanidan taqdimot",
}

 











export const SECTIONS = [
  { id: "kirish", label: "Kirish", jp: "序" },
  { id: "nippon", label: "Nippon", jp: "日本" },
  { id: "raqamlar", label: "Raqamlarda", jp: "数" },
  { id: "tarix", label: "Tarix", jp: "史" },
  { id: "turgunlik", label: "Turg‘unlik", jp: "停" },
  { id: "monozukuri", label: "Sanoat", jp: "工" },
  { id: "robotlar", label: "Robotlar", jp: "ロボ" },
  { id: "muammolar", label: "Muammolar", jp: "課題" },
  { id: "kelajak", label: "Kelajak", jp: "未来" },
  { id: "xulosa", label: "Xulosa", jp: "結" },
]

export const HERO_READOUTS = [
  { label: "YaIM", value: "~4,2 trln $", note: "2025, XVF" },
  { label: "Aholi", value: "~123 mln", note: "2025" },
  { label: "65+ yoshdagilar", value: "29,6%", note: "2026, rekord" },
]

export const NIPPON_FACTS = [
  { value: "378 ming km²", label: "Maydoni — O‘zbekistondan biroz kichik" },
  { value: "14 125", label: "Orollar soni (2023-yilgi qayta sanoq)" },
  { value: "~13%", label: "Energiyani o‘zi ta’minlashi — qolgani import" },
  { value: "¥ Yen", label: "Milliy valyuta · Poytaxt — Tokio" },
]

/** GDP comparison drawn as flag drops (area ∝ value). XVF WEO, 2025-aprel, 2025 uchun baho. */
export const GDP_DROPS = [
  { country: "AQSh", code: "us", value: 30.5 },
  { country: "Xitoy", code: "cn", value: 19.2 },
  { country: "Germaniya", code: "de", value: 4.7 },
  { country: "Hindiston", code: "in", value: 4.19 },
  { country: "Yaponiya", code: "jp", value: 4.19, focus: true },
  { country: "Buyuk Britaniya", code: "gb", value: 3.8 },
]

export const KEY_FIGURES = [
  {
    value: 34,
    prefix: "~",
    suffix: " ming $",
    label: "Aholi jon boshiga YaIM",
    note: "XVF, 2025",
  },
  {
    value: 2.5,
    prefix: "~",
    suffix: "%",
    decimals: 1,
    label: "Ishsizlik darajasi — dunyodagi eng pastlardan",
    note: "Statistika byurosi, 2025",
  },
  {
    value: 230,
    prefix: "~",
    suffix: "%",
    label: "Davlat qarzi / YaIM — rivojlangan davlatlar ichida eng yuqori",
    note: "XVF WEO, 2025-oktabr",
  },
  {
    value: 110.4,
    prefix: "¥",
    suffix: " trln",
    decimals: 1,
    label: "Eksport — 1979-yildan beri eng yuqori (rekord)",
    note: "Moliya vazirligi, 2025",
  },
  {
    value: 42.7,
    suffix: " mln",
    decimals: 1,
    label: "Xorijiy sayyohlar — rekord, ¥9,5 trln sarfladi",
    note: "JNTO, 2025",
  },
  {
    value: 70,
    prefix: "~",
    suffix: "%",
    label: "Xizmatlar sohasining YaIMdagi ulushi (sanoat ~29%, qishloq xo‘jaligi ~1%)",
    note: "Jahon banki",
  },
]

export const LADDER = [
  {
    year: "1945",
    title: "Vayronadan boshlanish",
    text: "Urush shaharlar va zavodlarni vayron qildi. AQSh ishg‘oli davrida yer islohoti o‘tkazildi, yirik oilaviy konsernlar (dzaybatsu) tarqatildi.",
  },
  {
    year: "1964",
    title: "Shinkansen va Olimpiada",
    text: "Tezyurar Tokaido Shinkansen ochildi, Tokio Olimpiadasi o‘tdi, Yaponiya OECDga kirdi. 1955–1973: yiliga ~9% o‘sish — «yapon mo‘jizasi».",
  },
  {
    year: "1968",
    title: "Dunyoda ikkinchi",
    text: "Yaponiya G‘arbiy Germaniyani ortda qoldirib, kapitalistik dunyoning 2-yirik iqtisodiyotiga aylandi va bu o‘rinni 2010-yilgacha saqladi.",
  },
  {
    year: "1989",
    title: "Pufak cho‘qqisi",
    text: "Nikkei indeksi 38 916 punktga chiqdi, yer narxlari osmonga ko‘tarildi. 1985-yilgi Plaza kelishuvidan so‘ng arzon kredit «pufak»ni shishirdi.",
  },
  {
    year: "2013",
    title: "Abenomika",
    text: "Bosh vazir Abe Shinzo «uch o‘q» siyosatini boshladi: pul-kredit yumshatish, davlat xarajatlari va tarkibiy islohotlar. Maqsad — deflyatsiyadan chiqish.",
  },
  {
    year: "2024",
    title: "Uyg‘onish",
    text: "Nikkei 34 yildan so‘ng 1989-yil cho‘qqisini yangiladi, Yaponiya Banki manfiy foizni bekor qildi. 2026: Nikkei 70 000 dan oshdi.",
  },
]

/** Real YaIM o‘rtacha yillik o‘sishi, %. Kabinet idorasi (Naikakufu). */
export const ERAS = [
  { period: "1956–1973", name: "Yuqori o‘sish davri", value: 9.1 },
  { period: "1974–1990", name: "Barqaror o‘sish davri", value: 4.2 },
  { period: "1991–2024", name: "Past o‘sish davri", value: 0.8, approx: true },
]

export const LOST = [
  {
    title: "Pufak yorildi",
    period: "1990–1992",
    text: "Aksiya va yer narxlari qulab tushdi: Nikkei ikki yil ichida 60% dan ko‘proq arzonladi.",
  },
  {
    title: "Yomon qarzlar",
    period: "1990-yillar",
    text: "Banklar qaytmaydigan kreditlarga botdi, «zombi» kompaniyalar sun’iy tirik saqlandi. 1997-yilda Yamaichi Securities bankrot bo‘ldi.",
  },
  {
    title: "Deflyatsiya",
    period: "1998–2012",
    text: "Narxlar o‘smadi, aksincha tushdi. Odamlar xaridni kechiktirdi, kompaniyalar ish haqini oshirmadi — iqtisodiyot joyida qotdi.",
  },
]

export const ARROWS = [
  {
    n: "一",
    title: "Pul-kredit siyosati",
    text: "Yaponiya Banki pul massasini keskin oshirdi (2013), 2016-yildan manfiy foiz stavkasi.",
  },
  {
    n: "二",
    title: "Moliyaviy rag‘bat",
    text: "Davlat investitsiyalari va infratuzilma dasturlari talabni qo‘llab-quvvatladi.",
  },
  {
    n: "三",
    title: "Tarkibiy islohotlar",
    text: "Ayollar bandligi, CPTPP savdo kelishuvi, korporativ boshqaruv qoidalari.",
  },
]

export const SECTORS = [
  {
    name: "Avtomobilsozlik",
    jp: "自動車",
    text: "Toyota 2020-yildan beri dunyoda eng ko‘p avtomobil sotadigan kompaniya. Avtomobillar — Yaponiya eksportining eng yirik moddasi.",
    makers: "Toyota · Honda · Nissan · Suzuki · Mazda",
  },
  {
    name: "Yarimo‘tkazgich materiallari",
    jp: "半導体",
    text: "Dunyo kremniy plastinalarining katta qismi yapon kompaniyalarida. TSMC Kumamoto zavodi 2024-yilda ochildi, Rapidus 2 nm chip ustida ishlamoqda.",
    makers: "Shin-Etsu · SUMCO · Tokyo Electron",
  },
  {
    name: "Robototexnika",
    jp: "ロボット",
    text: "Dunyodagi sanoat robotlarining 38% i Yaponiyada ishlab chiqariladi — mamlakat bu sohada birinchi.",
    makers: "FANUC · Yaskawa · Kawasaki · Nachi · Epson",
  },
  {
    name: "Elektronika va kontent",
    jp: "電子",
    text: "Kamera sensorlari, o‘yin konsollari, anime va o‘yinlar — butun dunyoga sotiladigan madaniy eksport.",
    makers: "Sony · Nintendo · Panasonic · Canon",
  },
]

export const FLASHCARDS = [
  {
    kanji: "改善",
    romaji: "Kaizen",
    meaning: "Doimiy takomillashtirish",
    text: "Har bir ishchi har kuni kichik yaxshilanish taklif qiladi. Toyota ishlab chiqarish tizimining asosi.",
  },
  {
    kanji: "看板",
    romaji: "Kanban · JIT",
    meaning: "Aynan o‘z vaqtida",
    text: "Detal faqat kerak bo‘lganda keltiriladi. Ombor xarajati kamayadi, isrof yo‘qoladi.",
  },
  {
    kanji: "系列",
    romaji: "Keiretsu",
    meaning: "Kompaniyalar zanjiri",
    text: "Bank, zavod va yetkazib beruvchilar bir-birining aksiyasiga egalik qilib, uzoq yillar hamkorlik qiladi.",
  },
  {
    kanji: "終身雇用",
    romaji: "Shūshin koyō",
    meaning: "Umrbod ish",
    text: "Xodim bir kompaniyada nafaqagacha ishlaydi: sadoqat va malaka oshadi, lekin mehnat bozori sekin o‘zgaradi.",
  },
]

export const MAKERS = [
  ["トヨタ", "Toyota"],
  ["ソニー", "Sony"],
  ["任天堂", "Nintendo"],
  ["ホンダ", "Honda"],
  ["日立", "Hitachi"],
  ["ファナック", "FANUC"],
  ["安川電機", "Yaskawa"],
  ["キーエンス", "Keyence"],
  ["東京エレクトロン", "Tokyo Electron"],
  ["信越化学", "Shin-Etsu"],
  ["パナソニック", "Panasonic"],
  ["三菱", "Mitsubishi"],
  ["キヤノン", "Canon"],
  ["デンソー", "Denso"],
  ["ユニクロ", "Uniqlo"],
  ["ソフトバンク", "SoftBank"],
]

/** IFR World Robotics 2025 (2024 yil ma’lumotlari). */
export const ROBOT_STATS = [
  { value: 38, suffix: "%", label: "Dunyo sanoat robotlari ishlab chiqarishidagi ulushi", note: "2024 · 1-o‘rin" },
  { value: 44500, label: "2024-yilda o‘rnatilgan yangi robotlar", note: "dunyoda 2-bozor" },
  { value: 450500, label: "Hozir ishlab turgan sanoat robotlari", note: "2024" },
  { value: 446, label: "Har 10 000 ishchiga to‘g‘ri keladigan robot", note: "dunyoda 4-o‘rin" },
]

export const ROBOT_TIMELINE = [
  { year: "1969", name: "Kawasaki-Unimate 2000", text: "Yaponiyaning birinchi sanoat roboti" },
  { year: "1973", name: "WABOT-1", text: "Vaseda universiteti: dunyodagi ilk to‘liq o‘lchamli insonsimon robot" },
  { year: "1980", name: "«Robot yili»", text: "Robotlar zavodlarga ommaviy kirib keldi" },
  { year: "2000", name: "ASIMO", text: "Honda: yuradigan va zinadan chiqadigan robot" },
  { year: "2014", name: "Pepper", text: "SoftBank: odam kayfiyatini taniydigan xizmat roboti" },
  { year: "2020+", name: "Parvarish robotlari", text: "Qariyalar uylari, omborlar va restoranlarda" },
]

export const ROBOT_CHAIN = [
  { title: "Aholi qariydi", figure: "29,6%", note: "aholi 65 yoshdan katta (2026)" },
  { title: "Ishchi qo‘l kamayadi", figure: "~11 mln", note: "ishchi 2040-yilgacha yetishmaydi" },
  { title: "Robot joriy etiladi", figure: "446", note: "robot har 10 000 ishchiga" },
  { title: "Unumdorlik o‘sadi", figure: "1 531", note: "robot / 10 000 — avtosanoatda (2023)" },
  { title: "Eksport va o‘sish", figure: "38%", note: "dunyo robotlari Yaponiyadan" },
]

export const ROBOT_WHY = [
  {
    title: "Mehnat taqchilligini yopadi",
    text: "Qurilish, logistika, parvarish — ishchi topilmaydigan sohalarda robot ishni to‘xtatmaydi.",
  },
  {
    title: "O‘zi eksport tarmog‘i",
    text: "Yapon robotlarining to‘rtdan uch qismidan ko‘prog‘i chet elga sotiladi — valyuta tushumi manbai.",
  },
  {
    title: "Sifat va raqobatbardoshlik",
    text: "Avtosanoatda har 10 000 ishchiga 1 531 robot: xato kam, tannarx past, sifat yuqori.",
  },
  {
    title: "Qariyalar parvarishi",
    text: "Hukumat parvarish robotlarini subsidiyalaydi: PARO terapevtik roboti, HAL ekzoskeleti.",
  },
]

/** 65 va undan katta yoshdagilar ulushi, %. Statistika byurosi; 2040/2070 — IPSS prognozi (2023). */
export const AGING = [
  { year: 1950, value: 4.9 },
  { year: 1970, value: 7.1 },
  { year: 1990, value: 12.1 },
  { year: 2010, value: 23.0 },
  { year: 2026, value: 29.6 },
  { year: 2040, value: 34.8, projected: true },
  { year: 2070, value: 38.7, projected: true },
]

/** Davlat yalpi qarzi, YaIMga nisbatan %. XVF WEO 2025-oktabr, 2025 bahosi (yaxlitlangan). */
export const DEBT = [
  { country: "Yaponiya", code: "jp", value: 230, focus: true },
  { country: "Italiya", code: "it", value: 137 },
  { country: "AQSh", code: "us", value: 125 },
  { country: "Fransiya", code: "fr", value: 116 },
  { country: "Buyuk Britaniya", code: "gb", value: 103 },
  { country: "Germaniya", code: "de", value: 64 },
]

export const PROBLEMS = [
  {
    figure: "686 ming",
    title: "Tug‘ilish rekord darajada kam",
    text: "2024-yilda tug‘ilganlar tarixda ilk bor 700 mingdan kam bo‘ldi. Aholi 2008-yildagi 128 mln cho‘qqidan beri kamaymoqda.",
  },
  {
    figure: "~162 ¥",
    title: "Zaif yen",
    text: "2024-yil iyulda 1 dollar ~162 yen turdi — 1986-yildan beri eng zaif. Energiya va oziq-ovqat importi qimmatladi.",
  },
]

export const FUTURE = [
  {
    tag: "Jamiyat 5.0",
    title: "Jamiyat 5.0: inson markazli aqlli jamiyat",
    text: "Sun’iy intellekt, IoT va robotlar kundalik hayotga — hukumatning uzoq muddatli strategiyasi.",
  },
  {
    tag: "Chiplar",
    title: "Yarimo‘tkazgichlarning qaytishi",
    text: "TSMC Kumamoto zavodi (2024) va Rapidus: Hokkaidoda 2 nm chiplar, ommaviy ishlab chiqarish rejasi — 2027.",
  },
  {
    tag: "Turizm",
    title: "Turizm: 42,7 mln mehmon",
    text: "2025-yilda sayyohlar ¥9,5 trln sarfladi — turizm avtomobildan keyingi eng yirik «eksport»lardan biriga aylandi.",
  },
  {
    tag: "GX",
    title: "GX — yashil transformatsiya",
    text: "10 yil ichida ¥150 trln davlat va xususiy investitsiya — vodorod, atom, qayta tiklanuvchi energiya.",
  },
  {
    tag: "Foiz",
    title: "Deflyatsiya ortda qoldi",
    text: "Narxlar va ish haqi o‘smoqda; 2026-yilda Yaponiya Banki stavkasi 1995-yildan beri eng yuqori darajaga chiqdi.",
  },
]

export const CONCLUSIONS = [
  "Tabiiy resursi kam mamlakat bilim, intizom va texnologiya hisobiga dunyoning yetakchi iqtisodiyotlaridan biriga aylandi.",
  "1991-yildan keyingi turg‘unlik — aktiv pufagi va deflyatsiya qanchalik xavfli ekanini ko‘rsatgan saboq.",
  "Qariyotgan jamiyatda robotlar — o‘yinchoq emas, balki o‘sishni saqlab qolishning iqtisodiy zarurati.",
]

export const SOURCES = [
  "XVF (IMF) — World Economic Outlook, 2025-aprel va 2025-oktabr",
  "IFR — World Robotics 2025 (Industrial Robots)",
  "JARA — Yaponiya Robot Assotsiatsiyasi, 2025 choraklik statistikasi",
  "Yaponiya Ichki ishlar va aloqa vazirligi / Statistika byurosi, 2026-sentabr",
  "IPSS — Yaponiya aholisi prognozi, 2023",
  "Kabinet idorasi (Naikakufu) — milliy hisoblar",
  "Moliya vazirligi — savdo statistikasi, 2025",
  "JNTO — xorijiy mehmonlar statistikasi, 2025",
  "Fuji surati — Unsplash (Unsplash litsenziyasi); bayroqlar — circle-flags (MIT)",
  "Recruit Works Institute — «Future Predictions 2040», 2023",
  "Yaponiya Banki; Nikkei",
]
