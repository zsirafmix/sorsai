import { ZodiacSign } from './types';

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    id: "aries",
    name: "Aries",
    name_hu: "Kos",
    name_de: "Widder",
    name_fr: "Bélier",
    symbol: "♈",
    element: "fire",
    element_hu: "Tűz",
    modality: "cardinal",
    modality_hu: "Kardinális",
    rulingPlanet: "Mars",
    rulingPlanet_hu: "Mars",
    dateRange: "Mar 21 - Apr 19",
    dateRange_hu: "Március 21. – Április 19.",
    keywords: ["bátorság", "kezdeményezés", "szenvedély", "lendület"],
    description: "Dynamic pioneer, driven by an innate spark to initiate and conquer.",
    description_hu: "Dinamikus úttörő, akit a kezdeményezés és a közvetlen cselekvés tüze fűt."
  },
  {
    id: "taurus",
    name: "Taurus",
    name_hu: "Bika",
    name_de: "Stier",
    name_fr: "Taureau",
    symbol: "♉",
    element: "earth",
    element_hu: "Föld",
    modality: "fixed",
    modality_hu: "Szilárd",
    rulingPlanet: "Venus",
    rulingPlanet_hu: "Vénusz",
    dateRange: "Apr 20 - May 20",
    dateRange_hu: "Április 20. – Május 20.",
    keywords: ["stabilitás", "érzékiség", "kitartás", "bőség"],
    description: "Grounded builder, cultivating beauty, patience, and lasting security.",
    description_hu: "Megbízható építő, aki a természet szépségében és a stabilitásban talál nyugalmat."
  },
  {
    id: "gemini",
    name: "Gemini",
    name_hu: "Ikrek",
    name_de: "Zwillinge",
    name_fr: "Gémeaux",
    symbol: "♊",
    element: "air",
    element_hu: "Levegő",
    modality: "mutable",
    modality_hu: "Változó",
    rulingPlanet: "Mercury",
    rulingPlanet_hu: "Merkúr",
    dateRange: "May 21 - Jun 20",
    dateRange_hu: "Május 21. – Június 20.",
    keywords: ["kíváncsiság", "kommunikáció", "sokoldalúság", "intellektus"],
    description: "Swift messenger, linking ideas, words, and diverse perspectives.",
    description_hu: "Gyors gondolkodású hírvivő, aki az ötletek és a kapcsolódások hálóját szövi."
  },
  {
    id: "cancer",
    name: "Cancer",
    name_hu: "Rák",
    name_de: "Krebs",
    name_fr: "Cancer",
    symbol: "♋",
    element: "water",
    element_hu: "Víz",
    modality: "cardinal",
    modality_hu: "Kardinális",
    rulingPlanet: "Moon",
    rulingPlanet_hu: "Hold",
    dateRange: "Jun 21 - Jul 22",
    dateRange_hu: "Június 21. – Július 22.",
    keywords: ["érzelmi mélység", "gondoskodás", "intuíció", "védelem"],
    description: "Empathetic nurturer, protecting the sacred hearth of feeling and memory.",
    description_hu: "Empatikus gondoskodó, aki a szív legbelső rejtekét és a családi fészket óvja."
  },
  {
    id: "leo",
    name: "Leo",
    name_hu: "Oroszlán",
    name_de: "Löwe",
    name_fr: "Lion",
    symbol: "♌",
    element: "fire",
    element_hu: "Tűz",
    modality: "fixed",
    modality_hu: "Szilárd",
    rulingPlanet: "Sun",
    rulingPlanet_hu: "Nap",
    dateRange: "Jul 23 - Aug 22",
    dateRange_hu: "Július 23. – Augusztus 22.",
    keywords: ["nagylelkűség", "kreativitás", "ragyogás", "méltóság"],
    description: "Radiant sovereign, expressing heart-centered warmth and creative pride.",
    description_hu: "Ragyogó vezető, aki szívbéli melegséget és büszke kreativitást áraszt."
  },
  {
    id: "virgo",
    name: "Virgo",
    name_hu: "Szűz",
    name_de: "Jungfrau",
    name_fr: "Vierge",
    symbol: "♍",
    element: "earth",
    element_hu: "Föld",
    modality: "mutable",
    modality_hu: "Változó",
    rulingPlanet: "Mercury",
    rulingPlanet_hu: "Merkúr",
    dateRange: "Aug 23 - Sep 22",
    dateRange_hu: "Augusztus 23. – Szeptember 22.",
    keywords: ["pontosság", "szolgálat", "gyógyítás", "elemzés"],
    description: "Discerning alchemist, devoted to refinement, healing, and practical order.",
    description_hu: "Gondos elemző és gyógyító, aki a részletek tökéletesítésével szolgál."
  },
  {
    id: "libra",
    name: "Libra",
    name_hu: "Mérleg",
    name_de: "Waage",
    name_fr: "Balance",
    symbol: "♎",
    element: "air",
    element_hu: "Levegő",
    modality: "cardinal",
    modality_hu: "Kardinális",
    rulingPlanet: "Venus",
    rulingPlanet_hu: "Vénusz",
    dateRange: "Sep 23 - Oct 22",
    dateRange_hu: "Szeptember 23. – Október 22.",
    keywords: ["egyensúly", "igazságérzet", "harmónia", "kapcsolódás"],
    description: "Harmonizer of dualities, seeking aesthetic balance and relational truth.",
    description_hu: "Az egyensúly mestere, aki a békét, a szépséget és az igazságos együttműködést keresi."
  },
  {
    id: "scorpio",
    name: "Scorpio",
    name_hu: "Skorpió",
    name_de: "Skorpion",
    name_fr: "Scorpion",
    symbol: "♏",
    element: "water",
    element_hu: "Víz",
    modality: "fixed",
    modality_hu: "Szilárd",
    rulingPlanet: "Pluto / Mars",
    rulingPlanet_hu: "Plútó / Mars",
    dateRange: "Oct 23 - Nov 21",
    dateRange_hu: "Október 23. – November 21.",
    keywords: ["átalakulás", "szenvedély", "mélység", "kitartás"],
    description: "Mystic transformer, diving fearless into emotional shadows to regenerate.",
    description_hu: "Bátor átlényegülő, aki nem fél a lélek legmélyebb vizeibe merülni a megújulásért."
  },
  {
    id: "sagittarius",
    name: "Sagittarius",
    name_hu: "Nyilas",
    name_de: "Schütze",
    name_fr: "Sagittaire",
    symbol: "♐",
    element: "fire",
    element_hu: "Tűz",
    modality: "mutable",
    modality_hu: "Változó",
    rulingPlanet: "Jupiter",
    rulingPlanet_hu: "Jupiter",
    dateRange: "Nov 22 - Dec 21",
    dateRange_hu: "November 22. – December 21.",
    keywords: ["optimizmus", "filozófia", "szabadság", "felfedezés"],
    description: "Philosophical archer, shooting arrows of truth toward distant horizons.",
    description_hu: "Lelkes filozófus és vándor, aki a magasabb szellemi igazságok nyomában jár."
  },
  {
    id: "capricorn",
    name: "Capricorn",
    name_hu: "Bak",
    name_de: "Steinbock",
    name_fr: "Capricorne",
    symbol: "♑",
    element: "earth",
    element_hu: "Föld",
    modality: "cardinal",
    modality_hu: "Kardinális",
    rulingPlanet: "Saturn",
    rulingPlanet_hu: "Szaturnusz",
    dateRange: "Dec 22 - Jan 19",
    dateRange_hu: "December 22. – Január 19.",
    keywords: ["fegyelem", "ambíció", "kitartás", "bölcsesség"],
    description: "Steadfast mountain climber, mastering time through patient endurance.",
    description_hu: "Megingathatatlan hegymászó, aki türelemmel és fegyelemmel éri el a csúcsot."
  },
  {
    id: "aquarius",
    name: "Aquarius",
    name_hu: "Vízöntő",
    name_de: "Wassermann",
    name_fr: "Verseau",
    symbol: "♒",
    element: "air",
    element_hu: "Levegő",
    modality: "fixed",
    modality_hu: "Szilárd",
    rulingPlanet: "Uranus / Saturn",
    rulingPlanet_hu: "Uránusz / Szaturnusz",
    dateRange: "Jan 20 - Feb 18",
    dateRange_hu: "Január 20. – Február 18.",
    keywords: ["egyediség", "jövőbe tekintés", "szabadság", "humanizmus"],
    description: "Visionary rebel, pouring the waters of collective progress for humanity.",
    description_hu: "Eredeti újító és látnok, aki a jövő közösségéért és a szabadságért küzd."
  },
  {
    id: "pisces",
    name: "Pisces",
    name_hu: "Halak",
    name_de: "Fische",
    name_fr: "Poissons",
    symbol: "♓",
    element: "water",
    element_hu: "Víz",
    modality: "mutable",
    modality_hu: "Változó",
    rulingPlanet: "Neptune / Jupiter",
    rulingPlanet_hu: "Neptunusz / Jupiter",
    dateRange: "Feb 19 - Mar 20",
    dateRange_hu: "Február 19. – Március 20.",
    keywords: ["együttérzés", "misztika", "álmok", "határtalanság"],
    description: "Dreaming mystic, dissolving boundaries in the ocean of cosmic empathy.",
    description_hu: "Álmodó misztikus, aki a kozmikus együttérzés és a művészet vizében lebeg."
  }
];

export function getZodiacSign(birthDateString: string): ZodiacSign {
  const parts = birthDateString.split('-').map(Number);
  if (parts.length < 3 || parts.some(isNaN)) {
    return ZODIAC_SIGNS[0];
  }
  const [, month, day] = parts;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return ZODIAC_SIGNS[0]; // Aries
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return ZODIAC_SIGNS[1]; // Taurus
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return ZODIAC_SIGNS[2]; // Gemini
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return ZODIAC_SIGNS[3]; // Cancer
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return ZODIAC_SIGNS[4]; // Leo
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return ZODIAC_SIGNS[5]; // Virgo
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return ZODIAC_SIGNS[6]; // Libra
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return ZODIAC_SIGNS[7]; // Scorpio
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return ZODIAC_SIGNS[8]; // Sagittarius
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return ZODIAC_SIGNS[9]; // Capricorn
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return ZODIAC_SIGNS[10]; // Aquarius
  return ZODIAC_SIGNS[11]; // Pisces
}
