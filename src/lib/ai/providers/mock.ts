import { z } from 'zod';
import { AIProvider } from '../types';

export class MockAIProvider implements AIProvider {
  name = 'mock';

  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    // Detect language from prompt or systemPrompt
    const isEn = prompt.includes('English') || prompt.includes('in English') || (systemPrompt && systemPrompt.includes('English'));
    const isDe = prompt.includes('German') || prompt.includes('auf Deutsch') || (systemPrompt && systemPrompt.includes('German'));
    const isFr = prompt.includes('French') || prompt.includes('en français') || (systemPrompt && systemPrompt.includes('French'));

    if (isEn) {
      return `✨ **A Reflection from the Spheres**

The symbols active in your current field indicate a threshold of subtle transformation. Whatever questions weigh upon your heart, remember that clarity rarely arrives through force—it emerges when you create sacred stillness within.

* **Key Observation:** Notice the persistent instincts arising beneath mental chatter; they are signposts of your authentic path.
* **Suggested Attitude:** Approach this cycle with openness rather than rigid expectation.

*Reflection Question:* What truth are you ready to acknowledge that your conscious mind has kept in the shadows?`;
    }

    if (isDe) {
      return `✨ **Ein Impuls aus den Sphären**

Die Symbole deines aktuellen Lebensabschnitts deuten auf eine Schwelle innerer Reifung hin. Welche Fragen dich auch beschäftigen: Wahre Klarheit entsteht nicht durch Druck, sondern durch achtsame Stille.

* **Beobachtung:** Achte auf die leisen Impulse deines Herzens jenseits des lauten Gedankenstroms.
* **Haltung:** Begegne den kommenden Tagen mit sanfter Neugier statt starren Erwartungen.

*Reflexionsfrage:* Welche innere Wahrheit wartet darauf, von dir anerkannt zu werden?`;
    }

    if (isFr) {
      return `✨ **Un Reflet des Sphères**

Les symboles actifs dans votre champ actuel révèlent un seuil de transformation subtile. Quelle que soit l'interrogation qui vous habite, rappelez-vous que la clarté ne naît pas de la force, mais du calme intérieur.

* **Observation clé :** Écoutez les intuitions discrètes qui émergent sous le tumulte de vos pensées.
* **Attitude conseillée :** Accueillez ce cycle avec réceptivité plutôt qu'avec une attente rigide.

*Question de réflexion :* Quelle vérité profonde êtes-vous prêt(e) à accueillir en cet instant ?`;
    }

    // Default: Hungarian
    return `✨ **A Sors szimbolikus tükre**

A jelenlegi helyzeted szimbólumai azt jelzik, hogy a belső átalakulás és a szándékaid letisztulásának kapujában állsz. Bármilyen kérdés foglalkoztat most a leginkább, a valódi tisztánlátás nem a külvilág sürgetéséből fakad, hanem abból, ha megengeded magadnak a belső csendet.

* **Kulcsfontosságú megfigyelés:** Érdemes felfigyelned azokra a finom megérzésekre, amelyek a racionális aggodalmak mögött csendesen jelen vannak.
* **Javasolt hozzáállás:** Ne siettesd a válaszokat; a dolgok természetes ritmusuk szerint érnek be.

*Reflexiós kérdés:* Mi az a belső bizonyosság, amelyet már régóta érzel, de eddig halogattad a tudatosítását?`;
  }

  async generateStructured<T>(prompt: string, schema: z.ZodSchema<T>, systemPrompt?: string): Promise<T> {
    const isEn = prompt.includes('English') || prompt.includes('in English') || (systemPrompt && systemPrompt.includes('English'));
    const isDe = prompt.includes('German') || prompt.includes('auf Deutsch') || (systemPrompt && systemPrompt.includes('German'));
    const isFr = prompt.includes('French') || prompt.includes('en français') || (systemPrompt && systemPrompt.includes('French'));

    // If it's a Tarot analysis
    if (prompt.includes('Tarot') || (systemPrompt && systemPrompt.includes('Tarot'))) {
      const mockTarot = {
        headline: isEn ? "Synchronicity in the Arcana" : isDe ? "Synchronizität der Arkana" : isFr ? "Synchronicité des Arcanes" : "A Lapok Szimbolikus Összecsengése",
        cardSyntheses: [
          {
            cardId: "pos_1",
            positionName: isEn ? "Current Foundation" : isDe ? "Aktuelle Basis" : isFr ? "Base actuelle" : "Jelenlegi alapok",
            coreMessage: isEn ? "Awakening of self-trust and inner clarity." : "Az önbizalom és a belső tisztánlátás ébredése."
          }
        ],
        interconnection: isEn
          ? "The cards reveal a bridge between past lessons and emerging creative courage."
          : isDe
          ? "Die Karten zeigen eine Brücke zwischen alten Lektionen und neuem Lebensmut."
          : isFr
          ? "Les arcanes révèlent une passerelle féconde entre les leçons passées et l'élan créateur."
          : "A kihúzott lapok szoros párbeszédet folytatnak: a múltbéli tapasztalatok most szilárd támaszt nyújtanak az új kezdeményezéshez.",
        advice: isEn
          ? "Proceed with measured steps, honoring both your intellect and intuition."
          : "Haladj megfontolt léptekkel, egyaránt tisztelve az eszedet és a szíved hangját.",
        reflectionQuestion: isEn
          ? "How does this spread invite you to reclaim your sovereign power?"
          : "Miben hív ez a kirakás arra, hogy visszavedd a saját sorsod feletti szelíd irányítást?"
      };
      return schema.parse(mockTarot);
    }

    // If it's a Dream analysis
    if (prompt.includes('álom') || prompt.includes('dream') || prompt.includes('Traum') || prompt.includes('rêve')) {
      const mockDream = {
        title: isEn ? "Archetypal Dream Mirror" : isDe ? "Archetypischer Traumspiegel" : isFr ? "Miroir Onirique Archétypal" : "Archetípusos Álomtükör",
        symbols: [
          {
            symbol: isEn ? "Water / Threshold" : "Víz / Küszöb",
            meaning: isEn ? "Fluidity of subconscious feelings and impending emotional renewal." : "A tudattalan érzelmek szabad áramlása és a lelki megújulás."
          },
          {
            symbol: isEn ? "Labyrinth / Passage" : "Fény a távolban",
            meaning: isEn ? "Navigation through complexity toward inner resolution." : "A megoldás és a remény felé vezető belső vezérfonal."
          }
        ],
        emotionalTone: isEn ? "Introspective, searching, transformative." : "Mélyen elgondolkodtató, kutató és átlényegítő.",
        psychologicalMeaning: isEn
          ? "The dream expresses an inner readiness to release obsolete expectations and integrate neglected aspects of the self."
          : "Az álom a felnőtt énrész azon szándékát tükrözi, hogy elengedje a túlhaladott védekezési mechanizmusokat.",
        spiritualMeaning: isEn
          ? "A sacred invitation from the deep soul to step onto a higher tier of self-acceptance."
          : "A lélek mélyéből érkező meghívás az önelfogadás és a belső szabadság magasabb szintjére.",
        lifeConnection: isEn
          ? "Directly echoes the dilemma currently faced regarding priorities and personal boundaries."
          : "Közvetlen összefüggésben áll az ébrenléti határok kijelölésével és a prioritások tisztázásával.",
        reflectionQuestions: isEn
          ? ["What feeling in the dream felt most urgent or alive?", "Where in your waking hours are you resisting flow?"]
          : ["Melyik érzés volt a legintenzívebb az álomban?", "Hol állsz ellen a mindennapjaidban a természetes áramlásnak?"]
      };
      return schema.parse(mockDream);
    }

    // If it's Relationship analysis
    if (prompt.includes('kapcsolat') || prompt.includes('relationship') || prompt.includes('Beziehung') || prompt.includes('relation')) {
      const mockRel = {
        harmonyScores: {
          emotional: 84,
          communication: 76,
          passion: 89,
          longTerm: 78
        },
        summary: isEn
          ? "A vibrant union characterized by intense mental spark, magnetic attraction, and rich opportunities for mutual growth."
          : "Élénk, inspiráló találkozás, amely erős szellemi és érzelmi rezonanciát hordoz, bőséges teret adva a kölcsönös fejlődésnek.",
        strengths: isEn
          ? ["Genuine intellectual admiration", "Spontaneous warmth and laughter", "Complementary perspectives"]
          : ["Őszinte szellemi elismerés", "Közös humor és természetes vonzalom", "Egymást kiegészítő látásmódok"],
        growthAreas: isEn
          ? ["Giving space during emotional intensity", "Clear voicing of individual expectations"]
          : ["Tér hagyása az érzelmi hullámzások idején", "Az elvárások korai és nyílt kifejezése"],
        spiritualAdvice: isEn
          ? "View conflicts not as threats, but as sacred portals through which deeper intimacy can be forged."
          : "A nézeteltérésekre ne akadályként, hanem a mélyebb közelséget megnyitó tanulási lehetőségként tekintsetek.",
        reflectionQuestion: isEn
          ? "What gift does this relationship awaken in your soul that you have yet to fully honor?"
          : "Milyen rejtett erősségedet vagy képességedet hozza felszínre ez a kapcsolat?"
      };
      return schema.parse(mockRel);
    }

    // Default: Full Destiny Synthesis
    const mockSynthesis = {
      title: isEn ? "Full Destiny Synthesis" : isDe ? "Ganzheitliche Schicksalssynthese" : isFr ? "Synthèse Intégrale du Destin" : "Teljes Sorszintézis Elemzés",
      summary: isEn
        ? "The converging patterns of your numbers, cards, and astrological rhythm signal a fruitful phase of alignment and grounded clarity."
        : "A számaid, a kihúzott tarot szimbólumok és a csillagjegyed összhangja egy gyümölcsöző, rendeződési szakaszt jeleznek az életedben.",
      themes: isEn
        ? ["Inner Authority", "Creative Manifestation", "Harmonious Boundaries"]
        : ["Belső Tekintély", "Alkotó Erő", "Tudatos Határok"],
      tarotPerspective: isEn
        ? "The archetype drawn illuminates the balance between active endeavor and receptive stillness."
        : "A kihúzott lap a cselekvő lendület és a megfontolt csend közötti arany középutat világítja meg.",
      numerologyPerspective: isEn
        ? "Your vibrational frequencies emphasize building lasting security through authentic choices."
        : "A numerológiai rezgések a tartós stabilitás kiépítését és az őszinte önkifejezést támogatják.",
      astrologicalAngle: isEn
        ? "The elemental quality of your sign highlights direct expression and heart-led courage."
        : "A csillagjegyed elemi tüze és intuíciója a szívbéli bátorságot helyezi a középpontba.",
      interpretation: isEn
        ? "When multiple intuitive streams converge in this manner, it signifies that doubt is simply the mind catching up with the soul's decision."
        : "Amikor a szimbólumok így összecsengenek, az arra utal, hogy a bizonytalanság csupán az elme kísérlete a lélek már meghozott döntésének feldolgozására.",
      thingsToNotice: isEn
        ? ["Small synchronicities in daily interactions", "When fatigue asks you to pause rather than push", "New inspirations appearing unexpectedly"]
        : ["Apró egybeesések a mindennapi beszélgetésekben", "A test jelzései, amikor a pihenés a legfontosabb", "Váratlanul felbukkanó új ötletek és lehetőségek"],
      nextSteps: isEn
        ? ["Carve out 15 minutes of uninterrupted reflection daily", "Express your boundary with loving firmness", "Trust the gradual unfolding"]
        : ["Szánj napi 15 percet a zavartalan belső csendre", "Fogalmazd meg a határaidat szelíd határozottsággal", "Bízz a folyamat szerves, természetes kibontakozásában"],
      reflectionQuestions: isEn
        ? ["What would you choose today if you knew your authentic truth could not fail?"]
        : ["Mit választanál ma, ha tudnád, hogy a szíved mély igazsága nem tévedhet?"],
      disclaimer: isEn
        ? "This reading offers symbolic reflection for your journey, honoring your sovereign free will."
        : "Az elemzés szimbolikus és önismereti jellegű, tiszteletben tartva a szabad akaratodat."
    };

    return schema.parse(mockSynthesis);
  }
}
