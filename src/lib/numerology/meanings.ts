export interface ArchetypeData {
  title: string;
  title_hu: string;
  title_de: string;
  title_fr: string;
  archetype: string;
  archetype_hu: string;
  keywords: string[];
  summary: string;
  summary_hu: string;
}

export const NUMBER_ARCHETYPES: Record<number, ArchetypeData> = {
  1: {
    title: "The Pioneer",
    title_hu: "Az Úttörő és Vezető",
    title_de: "Der Pionier",
    title_fr: "Le Pionnier",
    archetype: "Leader, Innovator, Independent",
    archetype_hu: "Vezető, Újító, Független",
    keywords: ["kezdeményezés", "önállóság", "akaraterő", "bátorság"],
    summary: "Energy of original creation, direct leadership, and independent thought.",
    summary_hu: "Az új kezdetek, a független teremtőerő és az önálló vezetés archetípusa."
  },
  2: {
    title: "The Peacemaker",
    title_hu: "A Béketeremtő és Társkereső",
    title_de: "Der Friedensstifter",
    title_fr: "Le Médiateur",
    archetype: "Diplomat, Intuitive, Sensitive",
    archetype_hu: "Diplomata, Intuitív, Érzékeny",
    keywords: ["harmónia", "együttműködés", "empátia", "türelem"],
    summary: "Gentle diplomacy, relational depth, and intuitive balance.",
    summary_hu: "A finom diplomácia, a kapcsolatok harmóniája és a mély empátia száma."
  },
  3: {
    title: "The Creator",
    title_hu: "A Teremtő és Művész",
    title_de: "Der Schöpfer",
    title_fr: "Le Créateur",
    archetype: "Communicator, Artist, Optimist",
    archetype_hu: "Kommunikátor, Művész, Optimista",
    keywords: ["önkifejezés", "öröm", "kreativitás", "társasági élet"],
    summary: "Expressive joy, imaginative flow, and social inspiration.",
    summary_hu: "A szóbeli és művészi önkifejezés, az öröm és a társas ragyogás rezgése."
  },
  4: {
    title: "The Builder",
    title_hu: "Az Építő és Rendszerező",
    title_de: "Der Baumeister",
    title_fr: "Le Bâtisseur",
    archetype: "Anchor, Practical, Diligent",
    archetype_hu: "Alapozó, Gyakorlatias, Megbízható",
    keywords: ["stabilitás", "rend", "kitartás", "megbízhatóság"],
    summary: "Solid foundation, grounded discipline, and tangible realization.",
    summary_hu: "A biztos alapok megteremtése, a rend, a kitartó munka és a biztonság."
  },
  5: {
    title: "The Adventurer",
    title_hu: "A Szabad Felfedező",
    title_de: "Der Abenteurer",
    title_fr: "L'Aventurier",
    archetype: "Seeker of Freedom, Dynamic, Adaptable",
    archetype_hu: "Szabadságkereső, Dinamikus, Sokoldalú",
    keywords: ["változás", "szabadság", "kíváncsiság", "sokoldalúság"],
    summary: "Dynamic change, sensory expansion, and boundary-pushing freedom.",
    summary_hu: "A változás, a sokszínű élmények és a korlátok nélküli szabadságvágy."
  },
  6: {
    title: "The Nurturer",
    title_hu: "A Gondoskodó és Gyógyító",
    title_de: "Der Fürsorger",
    title_fr: "Le Bienfaiteur",
    archetype: "Caretaker, Harmonizer, Loving",
    archetype_hu: "Családközpontú, Harmóniateremtő, Felelősségteljes",
    keywords: ["szeretet", "család", "szolgálat", "otthon"],
    summary: "Loving care, domestic warmth, and healing responsibility.",
    summary_hu: "A gondoskodó szeretet, a családi béke és az önzetlen szolgálat száma."
  },
  7: {
    title: "The Mystic",
    title_hu: "A Misztikus és Bölcselő",
    title_de: "Der Mystiker",
    title_fr: "Le Mystique",
    archetype: "Truth Seeker, Philosopher, Analytical",
    archetype_hu: "Igazságkereső, Filozófus, Elemző",
    keywords: ["belső bölcsesség", "elemzés", "spiritualitás", "magány"],
    summary: "Inner contemplation, metaphysical quest, and deep analytical clarity.",
    summary_hu: "A mély igazságkeresés, a csendes meditáció és a szellemi kutatás rezgése."
  },
  8: {
    title: "The Sovereign",
    title_hu: "Az Erő és Anyagi Bőség Ura",
    title_de: "Der Souverän",
    title_fr: "Le Souverain",
    archetype: "Master of Manifestation, Authority, Wealth",
    archetype_hu: "Megvalósító, Tekintély, Bőségteremtő",
    keywords: ["siker", "bőség", "hatalom", "szervezőkészség"],
    summary: "Karmic balance of power, material success, and strategic command.",
    summary_hu: "A látható eredmények, a stratégiai tekintély és a karmikus egyensúly ereje."
  },
  9: {
    title: "The Sage",
    title_hu: "A Bölcs és Humanitárius",
    title_de: "Der Weise",
    title_fr: "Le Sage",
    archetype: "Universal Compassion, Philanthropist, Completed",
    archetype_hu: "Egyetemes Szeretet, Humanitárius, Lezáró",
    keywords: ["együttérzés", "megbocsátás", "lezárás", "önzetlenség"],
    summary: "Universal compassion, global perspective, and soulful completion.",
    summary_hu: "Az egyetemes szeretet, a világméretű együttérzés és a ciklusok lezárása."
  },
  11: {
    title: "The Illuminator (Master 11)",
    title_hu: "A Fényhozó (11-es Mester szám)",
    title_de: "Der Erleuchtete (Meisterzahl 11)",
    title_fr: "L'Illuminateur (Nombre Maître 11)",
    archetype: "Spiritual Catalyst, Intuitive visionary",
    archetype_hu: "Spirituális Katalizátor, Intuitív Látnok",
    keywords: ["magas intuíció", "fényadás", "tisztánérzékelés", "tanítás"],
    summary: "High vibrational intuitive portal; inspires and illuminates others.",
    summary_hu: "Kiemelkedő spirituális intuíció, ihletett látásmód és tanítói küldetés."
  },
  22: {
    title: "The Master Builder (Master 22)",
    title_hu: "A Mester Építő (22-es Mester szám)",
    title_de: "Der Meister-Baumeister (Meisterzahl 22)",
    title_fr: "Le Maître Bâtisseur (Nombre Maître 22)",
    archetype: "Practical Visionary, World Transformer",
    archetype_hu: "Gyakorlati Látnok, Világformáló",
    keywords: ["monumentális teremtés", "világjobbítás", "rendszerek"],
    summary: "Transforms visionary ideals into lasting tangible global structures.",
    summary_hu: "A legmagasabb eszmék kézzelfogható, tartós valósággá építése a közjóért."
  },
  33: {
    title: "The Master Teacher (Master 33)",
    title_hu: "A Gyógyító Tanító (33-as Mester szám)",
    title_de: "Der Meister-Lehrer (Meisterzahl 33)",
    title_fr: "Le Maître Enseignant (Nombre Maître 33)",
    archetype: "Christ Consciousness, Cosmic Healer",
    archetype_hu: "Kozmikus Gyógyító, Önzetlen Vezető",
    keywords: ["feltétel nélküli szeretet", "gyógyítás", "áldozatkészség"],
    summary: "The ultimate vibration of selfless compassion and spiritual service.",
    summary_hu: "A feltétel nélküli szeretet, a lelki gyógyítás és az önzetlen szolgálat csúcsa."
  }
};
