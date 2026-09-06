import { z } from 'zod';

export const SynthesisOutputSchema = z.object({
  title: z.string().default("Sorsszintézis Elemzés"),
  summary: z.string().default("A jelenlegi energiák fontos belső átalakulásra és a fókusz megtartására ösztönöznek."),
  themes: z.array(z.string()).default(["Megújulás", "Tudatos fókusz", "Belső egyensúly"]),
  tarotPerspective: z.string().default("A kihúzott lapok szimbolikája a belső erők rendeződését mutatja."),
  numerologyPerspective: z.string().default("A személyes számok rezgése a kezdeményezést és a türelmet támogatja."),
  astrologicalAngle: z.string().default("A jegy elemi sajátosságai most a tiszta kommunikációt helyezik előtérbe."),
  interpretation: z.string().default("A különböző szimbólumok összefonódása arra utal, hogy érdemes időt szánnod a csendre és a megfigyelésre."),
  thingsToNotice: z.array(z.string()).default([
    "Figyeld meg a visszatérő gondolatokat",
    "Kerüld a kapkodó reakciókat",
    "Adj teret a pihenésnek és a töltődésnek"
  ]),
  nextSteps: z.array(z.string()).default([
    "Fogalmazd meg a céljaidat írásban",
    "Beszélj nyíltan az érzéseidről",
    "Tarts egy csendes reflexiós estét"
  ]),
  reflectionQuestions: z.array(z.string()).default([
    "Mi az a terület az életedben, ahol leginkább szabadságra vágysz?",
    "Hogyan támogathatod a saját belső békédet ebben a pillanatban?"
  ]),
  disclaimer: z.string().default("Az elemzés szimbolikus és önismereti jellegű, nem kőbe vésett jövőkép.")
});

export type SynthesisOutput = z.infer<typeof SynthesisOutputSchema>;

export const TarotAnalysisSchema = z.object({
  headline: z.string().default("A Kártyák Szimbolikus Üzenete"),
  cardSyntheses: z.array(z.object({
    cardId: z.string(),
    positionName: z.string(),
    coreMessage: z.string(),
  })).default([]),
  interconnection: z.string().default("A lapok egymásra hatása a múltbeli tanulságok jelenbeli integrálását jelzi."),
  advice: z.string().default("Haladj megfontoltan, és bízz a megérzéseidben."),
  reflectionQuestion: z.string().default("Milyen érzést ébreszt benned ez a kirakás?")
});

export type TarotAnalysis = z.infer<typeof TarotAnalysisSchema>;

export const DreamAnalysisSchema = z.object({
  title: z.string().default("Álomelemzés"),
  symbols: z.array(z.object({
    symbol: z.string(),
    meaning: z.string()
  })).default([
    { symbol: "Víz / Óceán", meaning: "A mély érzelmek és a tudattalan rétegek áramlása." }
  ]),
  emotionalTone: z.string().default("Rejtélyes, elgondolkodtató belső utazás."),
  psychologicalMeaning: z.string().default("Az álom a fel nem dolgozott feszültségek rendeződését és az új integráció igényét jelzi."),
  spiritualMeaning: z.string().default("Archetípusos megújulási folyamat a mélyebb lélekrészekkel."),
  lifeConnection: z.string().default("Az ébrenléti döntések előtti belső bizonytalanságot tükrözi vissza."),
  reflectionQuestions: z.array(z.string()).default([
    "Milyen érzéssel ébredtél fel ebből az álomból?",
    "Hol érzel hasonló feszültséget vagy várakozást a mindennapjaidban?"
  ])
});

export type DreamAnalysis = z.infer<typeof DreamAnalysisSchema>;

export const RelationshipAnalysisSchema = z.object({
  harmonyScores: z.object({
    emotional: z.number().min(0).max(100).default(82),
    communication: z.number().min(0).max(100).default(74),
    passion: z.number().min(0).max(100).default(88),
    longTerm: z.number().min(0).max(100).default(79),
  }),
  summary: z.string().default("Két szuverén lélek találkozása, akik kölcsönösen gazdagíthatják egymás látásmódját."),
  strengths: z.array(z.string()).default([
    "Kölcsönös szellemi inspiráció",
    "Erős vonzalom és nyitottság",
    "Közös értékrend a szabadság és az önállóság terén"
  ]),
  growthAreas: z.array(z.string()).default([
    "A kimondatlan elvárások tisztázása",
    "Türelem gyakorlása feszültebb pillanatokban"
  ]),
  spiritualAdvice: z.string().default("A kapcsolat nem birtoklás, hanem közös fejlődési tér. Őrizzétek meg az egyéni autonómiátokat."),
  reflectionQuestion: z.string().default("Hogyan lehetsz még jelenvalóbb a pároddal anélkül, hogy elveszítenéd a saját határaidat?")
});

export type RelationshipAnalysis = z.infer<typeof RelationshipAnalysisSchema>;
