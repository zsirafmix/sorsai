import { TarotCard } from './types';

export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: "major_0_fool",
    name: "The Fool",
    name_hu: "A Bolond",
    name_de: "Der Narr",
    name_fr: "Le Mat / Le Fou",
    arcana: "major",
    number: 0,
    element: "air",
    astrology: "Uranus",
    keywords: ["új kezdet", "spontaneitás", "ártatlanság", "szabadság", "hit"],
    uprightMeaning: "Új korszak küszöbén állsz. Lépj bízva az ismeretlenbe, hallgass a megérzéseidre, és engedd el a görcsös kontrollt.",
    reversedMeaning: "Megfontolatlanság, felelőtlen kockázatvállalás vagy a bizonytalanságtól való bénító félelem. Nézz a lábad elé, mielőtt ugranál."
  },
  {
    id: "major_1_magician",
    name: "The Magician",
    name_hu: "A Mágus",
    name_de: "Der Magier",
    name_fr: "Le Bateleur",
    arcana: "major",
    number: 1,
    element: "air",
    astrology: "Merkúr",
    keywords: ["teremtőerő", "akaraterő", "manifesztáció", "ügyesség", "erőforrások"],
    uprightMeaning: "Minden eszköz és képesség a rendelkezésedre áll céljaid megvalósításához. Fókuszáld a figyelmed, és cselekedj határozottan.",
    reversedMeaning: "Szétszórt figyelem, kihasználatlan tehetség vagy manipuláció veszélye. Tisztázd valódi szándékaidat."
  },
  {
    id: "major_2_high_priestess",
    name: "The High Priestess",
    name_hu: "A Főpapnő",
    name_de: "Die Hohepriesterin",
    name_fr: "La Papesse",
    arcana: "major",
    number: 2,
    element: "water",
    astrology: "Hold",
    keywords: ["intuíció", "tudattalan", "belső bölcsesség", "titkok", "misztérium"],
    uprightMeaning: "A válaszok nem a külvilág zajában, hanem a belső csendben rejlenek. Bízz a megérzéseidben és az álmaid üzenetében.",
    reversedMeaning: "Elnyomott belső hang, pletykák vagy a látszatok mögötti valóság eltagadása. Fordulj befelé, mielőtt döntenél."
  },
  {
    id: "major_3_empress",
    name: "The Empress",
    name_hu: "A Császárnő",
    name_de: "Die Herrscherin",
    name_fr: "L'Impératrice",
    arcana: "major",
    number: 3,
    element: "earth",
    astrology: "Vénusz",
    keywords: ["termékenység", "bőség", "gondoskodás", "kreativitás", "természet"],
    uprightMeaning: "A növekedés, az érzékiség és a teremtő bőség időszaka. Tápláld a kapcsolataidat és engedd kibontakozni kreatív energiáidat.",
    reversedMeaning: "Kreatív blokk, túlzott függőség vagy önmagad elhanyagolása mások javára. Találd meg újra az egyensúlyt."
  },
  {
    id: "major_4_emperor",
    name: "The Emperor",
    name_hu: "A Császár",
    name_de: "Der Herrscher",
    name_fr: "L'Empereur",
    arcana: "major",
    number: 4,
    element: "fire",
    astrology: "Kos",
    keywords: ["struktúra", "stabilitás", "tekintély", "fegyelem", "védelem"],
    uprightMeaning: "Itt az ideje a rendteremtésnek és a határok világos kijelölésének. Alakíts ki szilárd alapokat és vállalj felelősséget.",
    reversedMeaning: "Túlzott merevség, kontrollkényszer vagy épp a rend hiánya miatti káosz. Engedj a rugalmasságnak."
  },
  {
    id: "major_5_hierophant",
    name: "The Hierophant",
    name_hu: "A Főpap",
    name_de: "Der Hierophant",
    name_fr: "Le Pape",
    arcana: "major",
    number: 5,
    element: "earth",
    astrology: "Bika",
    keywords: ["hagyomány", "szellemi tanítás", "értékek", "hit", "közösség"],
    uprightMeaning: "Értékek tisztázása, megbízható tanács keresése vagy egy magasabb szellemi rendszerhez való kapcsolódás. Tanulj a tapasztaltaktól.",
    reversedMeaning: "Dogmatizmus, elavult szabályokhoz való merev ragaszkodás vagy lázadás a konvenciók ellen. Alakítsd ki saját igazságodat."
  },
  {
    id: "major_6_lovers",
    name: "The Lovers",
    name_hu: "A Szeretők",
    name_de: "Die Liebenden",
    name_fr: "L'Amoureux",
    arcana: "major",
    number: 6,
    element: "air",
    astrology: "Ikrek",
    keywords: ["szerelem", "döntés", "harmónia", "értékrend", "kapcsolódás"],
    uprightMeaning: "Mély érzelmi vagy szellemi összefonódás; fontos értékrendi döntés a szíved és az elveid összhangjában.",
    reversedMeaning: "Belső meghasonlottság, félrecsúszott kommunikáció vagy elhamarkodott kapcsolati döntések. Figyelj a hosszú távú következményekre."
  },
  {
    id: "major_7_chariot",
    name: "The Chariot",
    name_hu: "A Diadalszekér",
    name_de: "Der Wagen",
    name_fr: "Le Chariot",
    arcana: "major",
    number: 7,
    element: "water",
    astrology: "Rák",
    keywords: ["győzelem", "lendület", "önkontroll", "elszántság", "haladás"],
    uprightMeaning: "Egymásnak feszülő erők összehangolása. Koncentrált akarattal és kitartással leküzdheted az akadályokat és célba érsz.",
    reversedMeaning: "Irányvesztés, agresszió vagy az akadályok miatti tehetetlenség. Állj meg és hangold újra a fókuszodat."
  },
  {
    id: "major_8_strength",
    name: "Strength",
    name_hu: "Az Erő",
    name_de: "Die Kraft",
    name_fr: "La Force",
    arcana: "major",
    number: 8,
    element: "fire",
    astrology: "Oroszlán",
    keywords: ["belső erő", "együttérzés", "bátorság", "türelem", "szelídség"],
    uprightMeaning: "Az igazi erő nem az erőszakban, hanem a szelíd kitartásban és az ösztönök megértő elfogadásában nyilvánul meg.",
    reversedMeaning: "Kishitűség, dühkitörések vagy önbizalomhiány. Ismerd fel, hogy a lágyságod a legnagyobb fegyvered."
  },
  {
    id: "major_9_hermit",
    name: "The Hermit",
    name_hu: "A Remete",
    name_de: "Der Eremit",
    name_fr: "L'Hermite",
    arcana: "major",
    number: 9,
    element: "earth",
    astrology: "Szűz",
    keywords: ["belső utazás", "magány", "bölcsesség", "önreflexió", "irányfény"],
    uprightMeaning: "Ideje visszavonulni a világ zajától. A belső csendben gyújtott mécses fénye mutatja meg a helyes utat.",
    reversedMeaning: "Elszigetelődés, elmagányosodás vagy a külvilágtól való félelem. Ne zárkózz el teljesen azoktól, akik segíteni akarnak."
  },
  {
    id: "major_10_wheel_of_fortune",
    name: "Wheel of Fortune",
    name_hu: "A Szerencsekerék",
    name_de: "Das Rad des Schicksals",
    name_fr: "La Roue de Fortune",
    arcana: "major",
    number: 10,
    element: "fire",
    astrology: "Jupiter",
    keywords: ["sorsfordulat", "ciklusok", "változás", "karma", "lehetőség"],
    uprightMeaning: "A sors kereke fordul. Elkerülhetetlen, pozitív változások kezdődnek; ragadd meg a felbukkanó új lehetőségeket.",
    reversedMeaning: "Váratlan nehézségek, visszaesés vagy a változásokkal szembeni görcsös ellenállás. Fogadd el, hogy minden ciklikus."
  },
  {
    id: "major_11_justice",
    name: "Justice",
    name_hu: "Az Igazságosság",
    name_de: "Die Gerechtigkeit",
    name_fr: "La Justice",
    arcana: "major",
    number: 11,
    element: "air",
    astrology: "Mérleg",
    keywords: ["igazság", "egyensúly", "ok és okozat", "tisztesség", "felelősség"],
    uprightMeaning: "Minden tettnek következménye van. Hozz tiszta, objektív döntéseket, és vállalj felelősséget korábbi lépéseidért.",
    reversedMeaning: "Részrehajlás, igazságtalanság érzete vagy a következmények elől való kitérés. Nézz szembe a tényekkel őszintén."
  },
  {
    id: "major_12_hanged_man",
    name: "The Hanged Man",
    name_hu: "Az Akasztott",
    name_de: "Der Gehängte",
    name_fr: "Le Pendu",
    arcana: "major",
    number: 12,
    element: "water",
    astrology: "Neptunusz",
    keywords: ["új nézőpont", "megadás", "türelem", "elengedés", "szünet"],
    uprightMeaning: "A dolgok megtorpantak, de ez az önkéntes megadás és az új szemléletmód megtalálásának szent ideje. Engedd el az akarást.",
    reversedMeaning: "Hiábavaló áldozathozatal, makacsság vagy stagnálás a változástól való félelem miatt. Ideje kimozdulni a holtpontról."
  },
  {
    id: "major_13_death",
    name: "Death",
    name_hu: "A Halál",
    name_de: "Der Tod",
    name_fr: "La Mort",
    arcana: "major",
    number: 13,
    element: "water",
    astrology: "Skorpió",
    keywords: ["átalakulás", "lezárás", "megújulás", "elengedés", "újjászületés"],
    uprightMeaning: "Egy korszak véglegesen lezárul, hogy helyet adjon az újnak. Ne kapaszkodj a múltba; az elengedés felszabadít.",
    reversedMeaning: "Félelem a lezárástól, mérgező helyzetekhez való ragaszkodás. A megújulás csak akkor érkezhet el, ha elengeded a régit."
  },
  {
    id: "major_14_temperance",
    name: "Temperance",
    name_hu: "A Mértékletesség",
    name_de: "Die Mäßigkeit",
    name_fr: "Tempérance",
    arcana: "major",
    number: 14,
    element: "fire",
    astrology: "Nyilas",
    keywords: ["egyensúly", "harmónia", "alkímia", "türelem", "gyógyulás"],
    uprightMeaning: "Ellentétes erők finom összeolvasztása, lelki gyógyulás és mértéktartás. Találd meg az arany középutat.",
    reversedMeaning: "Túlzások, szélsőségek vagy belső nyugtalanság. Helyezd vissza a fókuszt a belső békédre."
  },
  {
    id: "major_15_devil",
    name: "The Devil",
    name_hu: "Az Ördög",
    name_de: "Der Teufel",
    name_fr: "Le Diable",
    arcana: "major",
    number: 15,
    element: "earth",
    astrology: "Bak",
    keywords: ["kötöttségek", "illúziók", "árnyék én", "kísértés", "ragaszkodás"],
    uprightMeaning: "Felismerése annak, ami korlátoz: függőségek, félelmek, anyagi kötelékek. A láncok lazák, bármikor levetheted őket.",
    reversedMeaning: "Felszabadulás egy mérgező helyzetből, a félelmek tudatosítása és a láncok lehullása. Új szabadság kezdete."
  },
  {
    id: "major_16_tower",
    name: "The Tower",
    name_hu: "A Torony",
    name_de: "Der Turm",
    name_fr: "La Maison Dieu",
    arcana: "major",
    number: 16,
    element: "fire",
    astrology: "Mars",
    keywords: ["megrázkódtatás", "hirtelen felismerés", "omlás", "felszabadulás", "tisztulás"],
    uprightMeaning: "Hamis illúziókra épült falak leomlása. Bár hirtelen és viharos lehet, a tisztulás elengedhetetlen a valódi alapokhoz.",
    reversedMeaning: "Katasztrófa elkerülése, elhúzódó belső válság vagy az elkerülhetetlen összeomlás halogatása. Ne félj az igazságtól."
  },
  {
    id: "major_17_star",
    name: "The Star",
    name_hu: "A Csillag",
    name_de: "Der Stern",
    name_fr: "L'Étoile",
    arcana: "major",
    number: 17,
    element: "air",
    astrology: "Vízöntő",
    keywords: ["remény", "ihlet", "hit", "lelki béke", "gyógyulás"],
    uprightMeaning: "A vihar elült, a csillagok fénye megvilágítja a jövőt. Hit, optimizmus és áldott inspiráció kíséri lépteidet.",
    reversedMeaning: "Csüggedés, kétségek vagy a jövőbe vetett hit megingása. Emlékeztesd magad a belső fényedre."
  },
  {
    id: "major_18_moon",
    name: "The Moon",
    name_hu: "A Hold",
    name_de: "Der Mond",
    name_fr: "La Lune",
    arcana: "major",
    number: 18,
    element: "water",
    astrology: "Halak",
    keywords: ["illúzió", "tudatalatti", "félelmek", "álmok", "bizonytalanság"],
    uprightMeaning: "A dolgok nem azok, aminek látszanak. Hallgass a finom jelzésekre, de várj a fontos döntésekkel, amíg a köd feloszlik.",
    reversedMeaning: "Illúziók eloszlása, a félelmek legyőzése és a tisztánlátás visszatérése. Az igazság a felszínre kerül."
  },
  {
    id: "major_19_sun",
    name: "The Sun",
    name_hu: "A Nap",
    name_de: "Die Sonne",
    name_fr: "Le Soleil",
    arcana: "major",
    number: 19,
    element: "fire",
    astrology: "Nap",
    keywords: ["öröm", "siker", "életerő", "tisztaság", "optimizmus"],
    uprightMeaning: "Ragyogás, életöröm és teljes tisztánlátás. Siker és melegség kíséri terveidet; sugározd szét a benned élő energiát.",
    reversedMeaning: "Ideiglenes felhők a nap előtt, túlzott büszkeség vagy enyhe pesszimizmus. A napfény hamarosan visszatér."
  },
  {
    id: "major_20_judgement",
    name: "Judgement",
    name_hu: "A Végítélet",
    name_de: "Das Gericht",
    name_fr: "Le Jugement",
    arcana: "major",
    number: 20,
    element: "fire",
    astrology: "Plútó",
    keywords: ["újjászületés", "hivatás", "megtisztulás", "felébredés", "megbocsátás"],
    uprightMeaning: "A harsona megszólalt: eljött az ideje, hogy felébredj és elindulj valódi küldetésed felé. Bocsáss meg a múltnak.",
    reversedMeaning: "Önkritika, kételyek, a hívó szó figyelmen kívül hagyása a kényelem vagy félelem miatt. Bízz az újrakezdésben."
  },
  {
    id: "major_21_world",
    name: "The World",
    name_hu: "A Világ",
    name_de: "Die Welt",
    name_fr: "Le Monde",
    arcana: "major",
    number: 21,
    element: "earth",
    astrology: "Szaturnusz",
    keywords: ["kiteljesedés", "lezárás", "egység", "siker", "utazás"],
    uprightMeaning: "Egy nagy életciklus sikeres befejezése, teljes integráció és harmónia. Érezd az egész univerzummal való összhangot.",
    reversedMeaning: "Befejezetlen ügyek, az utolsó lépés előtti megtorpanás vagy hiányérzet. Zárd le a nyitott szálakat a teljességhez."
  }
];

// Helper to build 56 Minor Arcana
const SUITS: Array<{ suit: 'wands' | 'cups' | 'swords' | 'pentacles'; element: 'fire' | 'water' | 'air' | 'earth'; huName: string; deName: string; frName: string }> = [
  { suit: 'wands', element: 'fire', huName: 'Botok', deName: 'Stäbe', frName: 'Bâtons' },
  { suit: 'cups', element: 'water', huName: 'Kelyhek', deName: 'Kelche', frName: 'Coupes' },
  { suit: 'swords', element: 'air', huName: 'Kardok', deName: 'Schwerter', frName: 'Épées' },
  { suit: 'pentacles', element: 'earth', huName: 'Érmék', deName: 'Münzen', frName: 'Deniers' }
];

const NUMBER_NAMES: Record<number, { en: string; hu: string; de: string; fr: string }> = {
  1: { en: "Ace", hu: "Ász", de: "As", fr: "As" },
  2: { en: "Two", hu: "Kettes", de: "Zwei", fr: "Deux" },
  3: { en: "Three", hu: "Hármas", de: "Drei", fr: "Trois" },
  4: { en: "Four", hu: "Négyes", de: "Vier", fr: "Quatre" },
  5: { en: "Five", hu: "Ötös", de: "Fünf", fr: "Cinq" },
  6: { en: "Six", hu: "Hatos", de: "Sechs", fr: "Six" },
  7: { en: "Seven", hu: "Hetes", de: "Sieben", fr: "Sept" },
  8: { en: "Eight", hu: "Nyolcas", de: "Acht", fr: "Huit" },
  9: { en: "Nine", hu: "Kilences", de: "Neun", fr: "Neuf" },
  10: { en: "Ten", hu: "Tízes", de: "Zehn", fr: "Dix" },
  11: { en: "Page", hu: "Apród", de: "Bube", fr: "Valet" },
  12: { en: "Knight", hu: "Lovag", de: "Ritter", fr: "Cavalier" },
  13: { en: "Queen", hu: "Királynő", de: "Königin", fr: "Reine" },
  14: { en: "King", hu: "Király", de: "König", fr: "Roi" }
};

export const MINOR_ARCANA: TarotCard[] = [];

for (const s of SUITS) {
  for (let n = 1; n <= 14; n++) {
    const numMeta = NUMBER_NAMES[n];
    const isCourt = n >= 11;
    const cardId = `${s.suit}_${n}`;
    const enName = `${numMeta.en} of ${s.suit.charAt(0).toUpperCase() + s.suit.slice(1)}`;
    const huName = `${s.huName} ${numMeta.hu}`;
    const deName = `${numMeta.de} der ${s.deName}`;
    const frName = `${numMeta.fr} de ${s.frName}`;

    let upright = "";
    let reversed = "";
    let keywords: string[] = [];

    if (s.suit === 'wands') {
      keywords = ["tűz", "szenvedély", "akció", "kreativitás"];
      upright = `${huName}: Új inspiráció, dinamikus lendület, alkotóerő és célratörő kezdeményezés.`;
      reversed = `${huName}: Kimerültség, halogatás, türelmetlenség vagy elhamarkodott cselekvés.`;
    } else if (s.suit === 'cups') {
      keywords = ["víz", "érzelmek", "kapcsolódás", "intuíció"];
      upright = `${huName}: Mély érzelmi megnyílás, szeretet, empátia és lelki harmónia kibontakozása.`;
      reversed = `${huName}: Érzelmi bizonytalanság, csalódás, elfojtott érzések vagy túlérzékenység.`;
    } else if (s.suit === 'swords') {
      keywords = ["levegő", "értelem", "igazság", "kommunikáció"];
      upright = `${huName}: Éles elme, tiszta megértés, intellektuális kihívás és határozott igazságkeresés.`;
      reversed = `${huName}: Szorongás, félreértések, belső vívódások vagy túlgondolás.`;
    } else {
      keywords = ["föld", "anyagiak", "stabilitás", "munka"];
      upright = `${huName}: Kézzelfogható eredmények, anyagi biztonság, kitartó munka és bőség.`;
      reversed = `${huName}: Anyagi aggodalmak, elpazarolt források, kapkodás vagy bizonytalan alapok.`;
    }

    MINOR_ARCANA.push({
      id: cardId,
      name: enName,
      name_hu: huName,
      name_de: deName,
      name_fr: frName,
      arcana: 'minor',
      number: n,
      suit: s.suit,
      element: s.element,
      keywords,
      uprightMeaning: upright,
      reversedMeaning: reversed
    });
  }
}

export const TAROT_DECK: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];
