import { SpreadDefinition, SpreadType } from './types';

export const SPREADS: Record<SpreadType, SpreadDefinition> = {
  single: {
    id: "single",
    title: "1-Card Focus",
    title_hu: "1 Lapos Fókusz (Napi tanács)",
    title_de: "1-Karten-Fokus",
    title_fr: "Focus 1 Carte",
    cardCount: 1,
    positions: [
      {
        index: 0,
        name: "Core Focus",
        name_hu: "Központi téma & Napi tanács",
        name_de: "Hauptfokus & Tagesimpuls",
        name_fr: "Thème central & Conseil du jour",
        description: "The primary energy and advice for your current moment.",
        description_hu: "A jelen pillanatod legfontosabb energiája és tanácsa."
      }
    ]
  },
  threeCard: {
    id: "threeCard",
    title: "Past, Present, Future",
    title_hu: "3 Lapos Kirakás (Múlt / Jelen / Jövő)",
    title_de: "Vergangenheit, Gegenwart, Zukunft",
    title_fr: "Passé, Présent, Avenir",
    cardCount: 3,
    positions: [
      {
        index: 0,
        name: "The Past",
        name_hu: "A Múlt gyökerei",
        name_de: "Die Vergangenheit",
        name_fr: "Le Passé",
        description: "Foundational events or patterns shaping the present.",
        description_hu: "A jelenlegi helyzetedet formáló múltbéli események és tapasztalatok."
      },
      {
        index: 1,
        name: "The Present",
        name_hu: "A Jelen állapota",
        name_de: "Die Gegenwart",
        name_fr: "Le Présent",
        description: "Current active energies and awareness.",
        description_hu: "A jelen pillanatban ható energiák és tudatállapot."
      },
      {
        index: 2,
        name: "The Future Potential",
        name_hu: "A Jövő kibontakozása",
        name_de: "Die Zukunft",
        name_fr: "L'Avenir",
        description: "The likely direction if present patterns continue.",
        description_hu: "A lehetséges kimenetel, ha a jelenlegi energiák ezen az úton haladnak tovább."
      }
    ]
  },
  love: {
    id: "love",
    title: "Love & Partnership",
    title_hu: "Szerelem és Kapcsolatok",
    title_de: "Liebe & Partnerschaft",
    title_fr: "Amour & Relations",
    cardCount: 3,
    positions: [
      {
        index: 0,
        name: "You & Your Desires",
        name_hu: "Te és a te érzelmi állapotod",
        name_de: "Du & deine Gefühle",
        name_fr: "Vous & vos désirs",
        description: "Your subconscious desires and emotional stance in the dynamic.",
        description_hu: "A saját érzelmi hozzáállásod, elvárásaid és vágyaid a kapcsolatban."
      },
      {
        index: 1,
        name: "Partner / The Other",
        name_hu: "A Másik fél energiája",
        name_de: "Der Partner / Das Gegenüber",
        name_fr: "L'Autre / Le Partenaire",
        description: "The energy and emotional perspective of the other person.",
        description_hu: "A partner vagy a másik fél jelenlegi belső állapota és rezgése."
      },
      {
        index: 2,
        name: "Relationship Destiny",
        name_hu: "A Kapcsolat fejlődési iránya",
        name_de: "Zukunft der Beziehung",
        name_fr: "Évolution de la relation",
        description: "The spiritual lesson and potential harmony between you.",
        description_hu: "A közös tanítás, a fejlődési lehetőség és a kapcsolat várható iránya."
      }
    ]
  },
  career: {
    id: "career",
    title: "Career & Purpose",
    title_hu: "Karrier és Hivatás",
    title_de: "Beruf & Berufung",
    title_fr: "Carrière & Vocation",
    cardCount: 4,
    positions: [
      {
        index: 0,
        name: "Current Standing",
        name_hu: "Jelenlegi szakmai helyzet",
        name_de: "Aktueller Stand",
        name_fr: "Situation actuelle",
        description: "Where you currently stand in your career or project.",
        description_hu: "A szakmai életed jelenlegi állapota és kihívásai."
      },
      {
        index: 1,
        name: "The Challenge",
        name_hu: "Rejtett kihívás vagy akadály",
        name_de: "Die Herausforderung",
        name_fr: "L'Obstacle",
        description: "What requires your careful attention or resolution.",
        description_hu: "Amire különösen ügyelned kell a munkahelyeden vagy céljaidban."
      },
      {
        index: 2,
        name: "Hidden Opportunity",
        name_hu: "Felismerhető lehetőség",
        name_de: "Verborgene Chance",
        name_fr: "Opportunité cachée",
        description: "Unseen potential waiting to be activated.",
        description_hu: "Olyan lehetőség, ami lendületet adhat a hivatásodnak."
      },
      {
        index: 3,
        name: "Higher Advice",
        name_hu: "Magasabb szintű tanács",
        name_de: "Höherer Rat",
        name_fr: "Conseil supérieur",
        description: "Best attitude and course of action to thrive.",
        description_hu: "A legbölcsebb hozzáállás és következő lépés a sikerhez."
      }
    ]
  },
  decision: {
    id: "decision",
    title: "Decision Crossroads",
    title_hu: "Döntési Keresztút",
    title_de: "Entscheidungs-Kreuzung",
    title_fr: "Carrefour Décisionnel",
    cardCount: 3,
    positions: [
      {
        index: 0,
        name: "Path A",
        name_hu: "Első lehetőség ('A' út)",
        name_de: "Weg A",
        name_fr: "Voie A",
        description: "Outcomes and lessons of choosing Option A.",
        description_hu: "Az 'A' döntési irány energiái és várható hatásai."
      },
      {
        index: 1,
        name: "Path B",
        name_hu: "Második lehetőség ('B' út)",
        name_de: "Weg B",
        name_fr: "Voie B",
        description: "Outcomes and lessons of choosing Option B.",
        description_hu: "A 'B' döntési irány energiái és várható hatásai."
      },
      {
        index: 2,
        name: "Harmonizing Factor",
        name_hu: "Összehangoló szempont",
        name_de: "Harmonisierender Faktor",
        name_fr: "Facteur d'harmonisation",
        description: "What your higher self truly seeks beneath the dilemma.",
        description_hu: "Ami a választás mögött valójában a lelked legfőbb javát szolgálja."
      }
    ]
  },
  thirtyDays: {
    id: "thirtyDays",
    title: "Next 30 Days",
    title_hu: "A következő 30 nap",
    title_de: "Die nächsten 30 Tage",
    title_fr: "Les 30 Prochains Jours",
    cardCount: 3,
    positions: [
      {
        index: 0,
        name: "Days 1-10",
        name_hu: "1-10. nap: Kezdeti energiák",
        name_de: "Tag 1-10",
        name_fr: "Jours 1-10",
        description: "Themes for the first third of the month.",
        description_hu: "A hónap elejét meghatározó lendület és témák."
      },
      {
        index: 1,
        name: "Days 11-20",
        name_hu: "11-20. nap: Folyamatok és fordulatok",
        name_de: "Tag 11-20",
        name_fr: "Jours 11-20",
        description: "Themes for the middle period.",
        description_hu: "A hónap közepének belső folyamatai és feladatai."
      },
      {
        index: 2,
        name: "Days 21-30",
        name_hu: "21-30. nap: Eredmények és lezárás",
        name_de: "Tag 21-30",
        name_fr: "Jours 21-30",
        description: "Themes for the closing period.",
        description_hu: "A hónap zárásának tanításai és összegzése."
      }
    ]
  },
  twelveMonths: {
    id: "twelveMonths",
    title: "12 Months Wheel",
    title_hu: "12 Hónap Kerék",
    title_de: "12-Monate-Jahreskreis",
    title_fr: "Roue de l'Année 12 Mois",
    cardCount: 12,
    positions: Array.from({ length: 12 }, (_, i) => ({
      index: i,
      name: `Month ${i + 1}`,
      name_hu: `${i + 1}. Hónap témája`,
      name_de: `Monat ${i + 1}`,
      name_fr: `Mois ${i + 1}`,
      description: `Energetic focus for Month ${i + 1}.`,
      description_hu: `A(z) ${i + 1}. hónap legfőbb szellemi témája.`
    }))
  },
  celticCross: {
    id: "celticCross",
    title: "Celtic Cross",
    title_hu: "Kelta Kereszt (Mélyelemzés)",
    title_de: "Keltisches Kreuz",
    title_fr: "Croix Celtique",
    cardCount: 10,
    positions: [
      { index: 0, name: "The Present", name_hu: "1. Jelenlegi helyzet", name_de: "1. Gegenwart", name_fr: "1. Présent", description: "The core query and atmosphere.", description_hu: "A kérdés magja és a jelenlegi belső állapotod." },
      { index: 1, name: "The Cross (Challenge)", name_hu: "2. Keresztező kihívás", name_de: "2. Die Herausforderung", name_fr: "2. Le Défi", description: "Obstacle or cross-current.", description_hu: "Ami közvetlenül keresztezi utadat vagy nehezíti a helyzetet." },
      { index: 2, name: "The Foundation", name_hu: "3. Alapok / Múltbéli ok", name_de: "3. Die Wurzeln", name_fr: "3. Les Racines", description: "Distant origin or core belief.", description_hu: "A helyzet mély, tudattalan vagy múltbéli gyökerei." },
      { index: 3, name: "Recent Past", name_hu: "4. Közelmúlt", name_de: "4. Jüngste Vergangenheit", name_fr: "4. Passé récent", description: "Events just passing away.", description_hu: "Események, amelyek épp most távolodnak az életedből." },
      { index: 4, name: "Crown (Best Potential)", name_hu: "5. Korona / Legmagasabb cél", name_de: "5. Die Krone", name_fr: "5. La Couronne", description: "Best possible attainment.", description_hu: "A legmagasabb rendű cél és lehetséges kibontakozás." },
      { index: 5, name: "Near Future", name_hu: "6. Közeli jövő", name_de: "6. Nahe Zukunft", name_fr: "6. Avenir proche", description: "Incoming events in the near term.", description_hu: "A közvetlenül előtted álló hetek meghatározó energiái." },
      { index: 6, name: "Self Perception", name_hu: "7. Önmagadhoz való viszony", name_de: "7. Eigenes Befinden", name_fr: "7. Image de soi", description: "How you see yourself.", description_hu: "Saját szereped, félelmeid és hozzáállásod a helyzethez." },
      { index: 7, name: "Environment", name_hu: "8. Környezeti hatások", name_de: "8. Das Umfeld", name_fr: "8. L'Environnement", description: "External opinions and environment.", description_hu: "A körülötted lévő emberek és külső körülmények hatása." },
      { index: 8, name: "Hopes & Fears", name_hu: "9. Remények és félelmek", name_de: "9. Hoffnungen & Ängste", name_fr: "9. Espoirs & Craintes", description: "Subconscious desires and anxieties.", description_hu: "Rejtett vágyaid és legmélyebb aggodalmaid." },
      { index: 9, name: "Final Outcome", name_hu: "10. Végső kimenetel", name_de: "10. Das Ergebnis", name_fr: "10. Issue finale", description: "Culmination and synthesis.", description_hu: "A folyamat szimbolikus betetőzése és összegző tanítása." }
    ]
  }
};
