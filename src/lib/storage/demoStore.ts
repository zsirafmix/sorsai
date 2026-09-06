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
  role: 'user' | 'admin';
  preferredLanguage: 'hu' | 'en' | 'de' | 'fr';
  isOnboarded: boolean;
  createdAt?: string;
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

export interface AuditLogItem {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}

const DEFAULT_PROFILE: UserProfile = {
  id: "user_owner_1",
  displayName: "Fénykereső Vándor",
  birthDate: "1994-07-14",
  birthTime: "11:42",
  birthPlace: "Budapest, Magyarország",
  currentCountry: "Magyarország",
  relationshipStatus: "Kapcsolatban",
  interests: ["önismeret", "spiritualitás", "szerelem", "karrier"],
  tier: "premium",
  role: "admin", // Owner gets admin by default
  preferredLanguage: "hu",
  isOnboarded: true,
  createdAt: "2026-09-01T10:00:00Z"
};

const INITIAL_USERS: UserProfile[] = [
  DEFAULT_PROFILE,
  {
    id: "user_demo_2",
    displayName: "Kovács Anna",
    birthDate: "1996-03-22",
    birthPlace: "Szeged, Magyarország",
    currentCountry: "Magyarország",
    relationshipStatus: "Házas",
    interests: ["tarot", "álomfejtés"],
    tier: "premium",
    role: "user",
    preferredLanguage: "hu",
    isOnboarded: true,
    createdAt: "2026-09-02T14:30:00Z"
  },
  {
    id: "user_demo_3",
    displayName: "Sophie Martin",
    birthDate: "1991-11-05",
    birthPlace: "Lyon, France",
    currentCountry: "France",
    relationshipStatus: "Egyedülálló",
    interests: ["spiritualitás", "karrier"],
    tier: "free",
    role: "user",
    preferredLanguage: "fr",
    isOnboarded: true,
    createdAt: "2026-09-03T09:15:00Z"
  },
  {
    id: "user_demo_4",
    displayName: "Maximilian Weber",
    birthDate: "1988-08-19",
    birthPlace: "München, Germany",
    currentCountry: "Germany",
    relationshipStatus: "Kapcsolatban",
    interests: ["numerológia", "önismeret"],
    tier: "free",
    role: "user",
    preferredLanguage: "de",
    isOnboarded: true,
    createdAt: "2026-09-04T16:45:00Z"
  },
  {
    id: "user_demo_5",
    displayName: "David Miller",
    birthDate: "1995-01-30",
    birthPlace: "London, UK",
    currentCountry: "United Kingdom",
    relationshipStatus: "Egyedülálló",
    interests: ["tarot", "jövő"],
    tier: "premium",
    role: "user",
    preferredLanguage: "en",
    isOnboarded: true,
    createdAt: "2026-09-05T11:20:00Z"
  }
];

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

const INITIAL_LOGS: AuditLogItem[] = [
  {
    id: "log_1",
    userId: "user_owner_1",
    userName: "Fénykereső Vándor",
    action: "Sorszintézis Generálás",
    details: "✨ Teljes Sorszintézis: 1 lapos Tarot + Életút (7) integráció",
    timestamp: "2026-09-06T14:15:00Z"
  },
  {
    id: "log_2",
    userId: "user_demo_2",
    userName: "Kovács Anna",
    action: "Tarot Kirakás",
    details: "Kelta Kereszt mélyelemzés sikeresen elmentve",
    timestamp: "2026-09-06T13:42:10Z"
  },
  {
    id: "log_3",
    userId: "user_demo_5",
    userName: "David Miller",
    action: "Szinasztria Számítás",
    details: "Kapcsolati kompatibilitás ellenőrzés (84% harmónia)",
    timestamp: "2026-09-06T12:05:45Z"
  },
  {
    id: "log_4",
    userId: "user_demo_3",
    userName: "Sophie Martin",
    action: "Álomelemzés",
    details: "Szimbólumfejtés: Óceán és Küszöb archetípusok",
    timestamp: "2026-09-06T10:19:22Z"
  }
];

export const demoStore = {
  getProfile(): UserProfile {
    if (typeof window === 'undefined') return DEFAULT_PROFILE;
    try {
      const saved = localStorage.getItem('sorsai_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure role exists
        if (!parsed.role) parsed.role = 'admin';
        return parsed;
      }
      return DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  saveProfile(profile: Partial<UserProfile>): UserProfile {
    const current = this.getProfile();
    const updated: UserProfile = { ...current, ...profile };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sorsai_profile', JSON.stringify(updated));
      } catch {
        // Ignore storage error
      }
    }
    return updated;
  },

  getAllUsers(): UserProfile[] {
    if (typeof window === 'undefined') return INITIAL_USERS;
    try {
      const saved = localStorage.getItem('sorsai_all_users');
      if (saved) return JSON.parse(saved);
      // Initialize with current profile included
      const current = this.getProfile();
      const list = [current, ...INITIAL_USERS.filter(u => u.id !== current.id)];
      localStorage.setItem('sorsai_all_users', JSON.stringify(list));
      return list;
    } catch {
      return INITIAL_USERS;
    }
  },

  updateUser(id: string, updates: Partial<UserProfile>): UserProfile[] {
    const users = this.getAllUsers();
    const updated = users.map(u => (u.id === id ? { ...u, ...updates } : u));
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sorsai_all_users', JSON.stringify(updated));
      } catch {}
    }
    // Also update current profile if self
    const current = this.getProfile();
    if (current.id === id) {
      this.saveProfile(updates);
    }
    return updated;
  },

  deleteUser(id: string): UserProfile[] {
    const users = this.getAllUsers();
    const updated = users.filter(u => u.id !== id);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sorsai_all_users', JSON.stringify(updated));
      } catch {}
    }
    return updated;
  },

  getAuditLogs(): AuditLogItem[] {
    if (typeof window === 'undefined') return INITIAL_LOGS;
    try {
      const saved = localStorage.getItem('sorsai_audit_logs');
      return saved ? JSON.parse(saved) : INITIAL_LOGS;
    } catch {
      return INITIAL_LOGS;
    }
  },

  addAuditLog(action: string, details: string): void {
    const current = this.getProfile();
    const logs = this.getAuditLogs();
    const newLog: AuditLogItem = {
      id: `log_${Date.now()}`,
      userId: current.id,
      userName: current.displayName,
      action,
      details,
      timestamp: new Date().toISOString()
    };
    const updated = [newLog, ...logs].slice(0, 50);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sorsai_audit_logs', JSON.stringify(updated));
      } catch {}
    }
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
      } catch {}
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
      } catch {}
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
      } catch {}
    }
    this.addAuditLog("Naplóbejegyzés létrehozása", `Típus: ${entry.type}, Cím: ${entry.title}`);
    return newEntry;
  },

  deleteJournalEntry(id: string): void {
    const current = this.getJournal();
    const updated = current.filter(e => e.id !== id);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sorsai_journal', JSON.stringify(updated));
      } catch {}
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
      } catch {}
    }
  },

  clearAllData(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('sorsai_profile');
        localStorage.removeItem('sorsai_memory');
        localStorage.removeItem('sorsai_journal');
        localStorage.removeItem('sorsai_chat_history');
        localStorage.removeItem('sorsai_all_users');
        localStorage.removeItem('sorsai_audit_logs');
      } catch {}
    }
  }
};
