export interface UserProfile {
  id: string;
  displayName: string;
  birthDate: string;
  birthTime?: string;
  birthPlace: string;
  currentCountry: string;
  relationshipStatus?: string;
  interests: string[];
  tier: 'free' | 'premium';
  preferredLanguage: 'hu' | 'en' | 'de' | 'fr';
  isOnboarded: boolean;
}

export interface JournalEntry {
  id: string;
  type: 'tarot' | 'dream' | 'relationship' | 'career' | 'personal' | 'ai_analysis';
  title: string;
  text: string;
  tags: string[];
  mood?: string;
  createdAt: string;
}

export interface AIMemoryData {
  isEnabled: boolean;
  currentThemes: string[];
  goals: string[];
  importantContext: string[];
}

export interface ChatMessageItem {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  mode: string;
  persona: string;
  createdAt: string;
  structured?: any;
}

const DEFAULT_PROFILE: UserProfile = {
  id: "user_demo_1",
  displayName: "Fénykereső Vándor",
  birthDate: "1994-07-14",
  birthTime: "11:42",
  birthPlace: "Budapest, Magyarország",
  currentCountry: "Magyarország",
  relationshipStatus: "Kapcsolatban",
  interests: ["önismeret", "spiritualitás", "szerelem", "karrier"],
  tier: "free",
  preferredLanguage: "hu",
  isOnboarded: true,
};

const DEFAULT_MEMORY: AIMemoryData = {
  isEnabled: true,
  currentThemes: ["Munkahelyi megújulás", "Érzelmi határok tisztázása"],
  goals: ["Belső stabilitás megteremtése", "Kreatív önkifejezés"],
  importantContext: ["Tudatos önfejlesztési időszakban jár"]
};

const DEFAULT_JOURNAL: JournalEntry[] = [
  {
    id: "journal_1",
    type: "tarot",
    title: "A Csillag lap üzenete",
    text: "A mai 1 lapos húzásom A Csillag volt. Úgy érzem, a hosszú bizonytalanság után végre megérkezik a remény és a tiszta inspiráció.",
    tags: ["remény", "tarot", "inspiráció"],
    mood: "Békés",
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  },
  {
    id: "journal_2",
    type: "dream",
    title: "Repülés a tiszta éjszakában",
    text: "A csillagos égbolt felett repültem, és lent meleg arany fények világítottak. Nem volt bennem félelem, csak teljes szabadságérzet.",
    tags: ["álom", "repülés", "szabadság"],
    mood: "Felemelő",
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
  }
];

export const demoStore = {
  getProfile(): UserProfile {
    if (typeof window === 'undefined') return DEFAULT_PROFILE;
    try {
      const saved = localStorage.getItem('sorsai_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  saveProfile(profile: Partial<UserProfile>): UserProfile {
    const current = this.getProfile();
    const updated = { ...current, ...profile };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sorsai_profile', JSON.stringify(updated));
      } catch {
        // Ignore storage error
      }
    }
    return updated;
  },

  getMemory(): AIMemoryData {
    if (typeof window === 'undefined') return DEFAULT_MEMORY;
    try {
      const saved = localStorage.getItem('sorsai_memory');
      return saved ? JSON.parse(saved) : DEFAULT_MEMORY;
    } catch {
      return DEFAULT_MEMORY;
    }
  },

  saveMemory(data: Partial<AIMemoryData>): AIMemoryData {
    const current = this.getMemory();
    const updated = { ...current, ...data };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sorsai_memory', JSON.stringify(updated));
      } catch {
        // Ignore
      }
    }
    return updated;
  },

  clearMemory(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sorsai_memory', JSON.stringify({
          isEnabled: true,
          currentThemes: [],
          goals: [],
          importantContext: []
        }));
      } catch {
        // Ignore
      }
    }
  },

  getJournal(): JournalEntry[] {
    if (typeof window === 'undefined') return DEFAULT_JOURNAL;
    try {
      const saved = localStorage.getItem('sorsai_journal');
      return saved ? JSON.parse(saved) : DEFAULT_JOURNAL;
    } catch {
      return DEFAULT_JOURNAL;
    }
  },

  addJournalEntry(entry: Omit<JournalEntry, 'id' | 'createdAt'>): JournalEntry {
    const current = this.getJournal();
    const newEntry: JournalEntry = {
      ...entry,
      id: `journal_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newEntry, ...current];
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sorsai_journal', JSON.stringify(updated));
      } catch {
        // Ignore
      }
    }
    return newEntry;
  },

  deleteJournalEntry(id: string): void {
    const current = this.getJournal();
    const updated = current.filter(e => e.id !== id);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sorsai_journal', JSON.stringify(updated));
      } catch {
        // Ignore
      }
    }
  },

  getChatHistory(): ChatMessageItem[] {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('sorsai_chat_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  saveChatHistory(messages: ChatMessageItem[]): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sorsai_chat_history', JSON.stringify(messages));
      } catch {
        // Ignore
      }
    }
  },

  clearAllData(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('sorsai_profile');
        localStorage.removeItem('sorsai_memory');
        localStorage.removeItem('sorsai_journal');
        localStorage.removeItem('sorsai_chat_history');
      } catch {
        // Ignore
      }
    }
  }
};
