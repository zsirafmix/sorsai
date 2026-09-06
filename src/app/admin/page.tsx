"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  Cpu,
  History,
  Unlock,
  KeyRound,
  Crown,
  UserCheck,
  Trash2,
  Plus,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Activity,
  Layers,
  Globe2,
  LogOut,
  Radio
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { GlowBadge } from '@/components/mystical/GlowBadge';
import { useAuth } from '@/lib/storage/authContext';
import { demoStore, UserProfile, AuditLogItem } from '@/lib/storage/demoStore';
import { useTranslation } from '@/lib/i18n';

type TabKey = 'overview' | 'users' | 'system' | 'logs';

export default function AdminPage() {
  const { user, isAdmin, isDemoMode, setDemoMode, verifyAdminPasscode, revokeAdmin } = useAuth();
  const { t } = useTranslation();

  // Gatekeeper state
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);

  // Admin dashboard state
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState<'all' | 'free' | 'premium'>('all');
  const [activeAiProvider, setActiveAiProvider] = useState<string>('mock');
  const [announcement, setAnnouncement] = useState('');
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  // New user form state
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserTier, setNewUserTier] = useState<'free' | 'premium'>('free');
  const [newUserRole, setNewUserRole] = useState<'user' | 'admin'>('user');

  // Load initial data
  useEffect(() => {
    if (isAdmin) {
      setUsersList(demoStore.getAllUsers());
      setAuditLogs(demoStore.getAuditLogs());
      const savedProvider = localStorage.getItem('sorsai_ai_provider') || 'mock';
      setActiveAiProvider(savedProvider);
      const savedAnnouncement = localStorage.getItem('sorsai_announcement') || '';
      setAnnouncement(savedAnnouncement);
    }
  }, [isAdmin]);

  const showNotice = (msg: string) => {
    setNoticeMessage(msg);
    setTimeout(() => setNoticeMessage(null), 3500);
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setPasscodeError(t.admin.invalidPasscode || "Kérjük add meg az admin jelszót!");
      return;
    }

    const success = verifyAdminPasscode(passcode);
    if (success) {
      setPasscodeError(null);
      setPasscode('');
      setUsersList(demoStore.getAllUsers());
      setAuditLogs(demoStore.getAuditLogs());
      showNotice("✨ Sikeres adminisztrátori hitelesítés!");
    } else {
      setPasscodeError(t.admin.invalidPasscode || "Helytelen adminisztrátori jelkód!");
    }
  };

  const handleToggleTier = (targetUser: UserProfile) => {
    const newTier = targetUser.tier === 'premium' ? 'free' : 'premium';
    const updated = demoStore.updateUser(targetUser.id, { tier: newTier });
    setUsersList(updated);
    demoStore.addAuditLog(
      "Előfizetés Módosítás",
      `Felhasználó: ${targetUser.displayName} (${targetUser.id}) -> Új szint: ${newTier.toUpperCase()}`
    );
    setAuditLogs(demoStore.getAuditLogs());
    showNotice(`${targetUser.displayName} szintje módosítva: ${newTier.toUpperCase()}`);
  };

  const handleToggleRole = (targetUser: UserProfile) => {
    const newRole = targetUser.role === 'admin' ? 'user' : 'admin';
    const updated = demoStore.updateUser(targetUser.id, { role: newRole });
    setUsersList(updated);
    demoStore.addAuditLog(
      "Jogosultság Változtatás",
      `Felhasználó: ${targetUser.displayName} (${targetUser.id}) -> Jogkör: ${newRole.toUpperCase()}`
    );
    setAuditLogs(demoStore.getAuditLogs());
    showNotice(`${targetUser.displayName} jogköre: ${newRole.toUpperCase()}`);
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (confirm(`Biztosan törölni szeretnéd a(z) "${name}" nevű felhasználót?`)) {
      const updated = demoStore.deleteUser(id);
      setUsersList(updated);
      demoStore.addAuditLog("Felhasználó Törlése", `Törölt fiók: ${name} (${id})`);
      setAuditLogs(demoStore.getAuditLogs());
      showNotice(`Felhasználó törölve: ${name}`);
    }
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim()) return;

    const newUser: UserProfile = {
      id: `user_custom_${Date.now()}`,
      displayName: newUserName.trim(),
      birthDate: "1995-05-15",
      birthPlace: "Budapest",
      currentCountry: "Magyarország",
      interests: ["önismeret", "spiritualitás"],
      tier: newUserTier,
      role: newUserRole,
      preferredLanguage: "hu",
      isOnboarded: true,
      createdAt: new Date().toISOString()
    };

    const currentUsers = demoStore.getAllUsers();
    const updated = [...currentUsers, newUser];
    localStorage.setItem('sorsai_all_users', JSON.stringify(updated));
    setUsersList(updated);

    demoStore.addAuditLog("Új Felhasználó Létrehozása", `Manuálisan hozzáadva: ${newUserName} (${newUserRole}, ${newUserTier})`);
    setAuditLogs(demoStore.getAuditLogs());

    setNewUserName('');
    setNewUserEmail('');
    setShowAddUser(false);
    showNotice(`Új felhasználó sikeresen létrehozva: ${newUser.displayName}`);
  };

  const handleSaveAiProvider = (provider: string) => {
    setActiveAiProvider(provider);
    localStorage.setItem('sorsai_ai_provider', provider);
    demoStore.addAuditLog("AI Motor Váltás", `Aktív szolgáltató módosítva: ${provider.toUpperCase()}`);
    setAuditLogs(demoStore.getAuditLogs());
    showNotice(`AI motor beállítva: ${provider.toUpperCase()}`);
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('sorsai_announcement', announcement);
    demoStore.addAuditLog("Közlemény Frissítése", `Globális értesítés: "${announcement}"`);
    setAuditLogs(demoStore.getAuditLogs());
    showNotice("Globális rendszerközlemény elmentve!");
  };

  const handleResetLogs = () => {
    if (confirm("Biztosan törölni szeretnéd a tevékenységnaplót?")) {
      localStorage.setItem('sorsai_audit_logs', JSON.stringify([]));
      setAuditLogs([]);
      showNotice("Tevékenységnapló kiürítve.");
    }
  };

  // Filtered users
  const filteredUsers = useMemo(() => {
    return usersList.filter(u => {
      const matchSearch =
        u.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.currentCountry && u.currentCountry.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchTier = filterTier === 'all' || u.tier === filterTier;
      return matchSearch && matchTier;
    });
  }, [usersList, searchQuery, filterTier]);

  // Derived statistics
  const totalUsersCount = usersList.length;
  const premiumUsersCount = usersList.filter(u => u.tier === 'premium').length;
  const adminCount = usersList.filter(u => u.role === 'admin').length;
  const premiumRate = totalUsersCount > 0 ? Math.round((premiumUsersCount / totalUsersCount) * 100) : 0;

  // Language breakdown
  const langCounts = useMemo(() => {
    const counts: Record<string, number> = { hu: 0, en: 0, de: 0, fr: 0 };
    usersList.forEach(u => {
      const lang = u.preferredLanguage || 'hu';
      counts[lang] = (counts[lang] || 0) + 1;
    });
    return counts;
  }, [usersList]);

  // ==========================================
  // UNLOCKED VIEW (GATEKEEPER) IF NOT ADMIN
  // ==========================================
  if (!isAdmin) {
    return (
      <AppShell>
        <div className="flex min-h-[75vh] items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-gold-500/30 bg-space-900/90 p-6 md:p-8 backdrop-blur-xl shadow-gold-glow"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold-500/40 bg-gold-500/10 shadow-gold-glow">
                <ShieldAlert className="h-8 w-8 text-gold-400" />
              </div>
              <GlowBadge variant="purple" className="mb-3">
                {t.admin.title || "Adminisztrációs Központ"}
              </GlowBadge>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Védett Zóna
              </h1>
              <p className="mt-2 text-sm text-ethereal-300">
                {t.admin.accessDenied || "Ehhez az oldalhoz kizárólag a rendszer tulajdonosa és megbízott adminisztrátorai férhetnek hozzá."}
              </p>
            </div>

            <form onSubmit={handleUnlock} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ethereal-400 mb-1">
                  {t.admin.passcodePrompt || "Adminisztrátori jelkód:"}
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-400/70" />
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      if (passcodeError) setPasscodeError(null);
                    }}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-white/10 bg-space-950/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder-ethereal-500 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                    autoFocus
                  />
                </div>
                {passcodeError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs font-medium text-rose-400 flex items-center gap-1.5"
                  >
                    <AlertCircle className="h-3.5 w-3.5" />
                    {passcodeError}
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-amber-600 py-3 text-sm font-semibold text-space-950 shadow-gold-glow hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <Unlock className="h-4 w-4" />
                <span>{t.admin.unlock || "Admin jogok feloldása"}</span>
              </button>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
                <p className="text-[11px] text-ethereal-400">
                  Biztonsági ellenőrzés aktív. A műveleteket az audit napló rögzíti.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </AppShell>
    );
  }

  // ==========================================
  // FULL ADMIN CONSOLE VIEW (FOR ADMINS ONLY)
  // ==========================================
  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto pb-12">
        {/* Floating Notification */}
        <AnimatePresence>
          {noticeMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-xl border border-gold-500/40 bg-space-900/95 px-4 py-3 text-sm text-gold-300 shadow-gold-glow backdrop-blur-xl"
            >
              <CheckCircle2 className="h-4 w-4 text-gold-400" />
              <span>{noticeMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-gold-500/50 bg-gradient-to-tr from-space-900 via-mystic-950 to-gold-950 text-gold-400 shadow-gold-glow">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  {t.admin.title || "SorsAI Adminisztrációs Központ"}
                </h1>
                <span className="rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-300">
                  FŐADMIN
                </span>
              </div>
              <p className="text-sm text-ethereal-300">
                {t.admin.subtitle || "Felhasználói jogosultságok, AI motorok, statisztikák és biztonsági audit"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Live / Demo Mode Switcher Pill */}
            <button
              onClick={() => {
                setDemoMode(!isDemoMode);
                showNotice(isDemoMode ? "✨ Átkapcsolva ÉLES MÓDBA (Live)!" : "Átkapcsolva Demo Módba.");
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                !isDemoMode
                  ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300 shadow-[0_0_15px_-3px_rgba(52,211,153,0.3)] hover:bg-emerald-500/25'
                  : 'border-purple-500/40 bg-purple-500/15 text-purple-300 hover:bg-purple-500/25'
              }`}
              title="Kattints az Éles / Demo mód közötti azonnali váltáshoz"
            >
              <span className={`h-2 w-2 rounded-full ${!isDemoMode ? 'bg-emerald-400 animate-pulse' : 'bg-purple-400'}`} />
              <span>{!isDemoMode ? 'Éles Mód (Live)' : 'Demo Mód (Szimulált)'}</span>
            </button>

            <button
              onClick={() => {
                revokeAdmin();
                showNotice("Admin jogok lemondva. Visszatérés a felhasználói nézethez.");
              }}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-ethereal-300 hover:bg-white/10 hover:text-white transition-colors"
              title="Kilépés az admin módból normál felhasználói teszteléshez"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Admin mód elhagyása</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === 'overview'
                ? 'border border-gold-500/40 bg-gold-500/10 text-gold-300 shadow-gold-glow'
                : 'border border-transparent text-ethereal-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Activity className="h-4 w-4" />
            <span>{t.admin.tabOverview || "Áttekintés & Statisztikák"}</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === 'users'
                ? 'border border-gold-500/40 bg-gold-500/10 text-gold-300 shadow-gold-glow'
                : 'border border-transparent text-ethereal-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>{t.admin.tabUsers || "Felhasználókezelés"}</span>
            <span className="rounded-full bg-space-800 px-2 py-0.5 text-xs text-gold-400">
              {totalUsersCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === 'system'
                ? 'border border-gold-500/40 bg-gold-500/10 text-gold-300 shadow-gold-glow'
                : 'border border-transparent text-ethereal-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Cpu className="h-4 w-4" />
            <span>{t.admin.tabSystem || "AI & Rendszer"}</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === 'logs'
                ? 'border border-gold-500/40 bg-gold-500/10 text-gold-300 shadow-gold-glow'
                : 'border border-transparent text-ethereal-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <History className="h-4 w-4" />
            <span>{t.admin.tabLogs || "Biztonsági Napló"}</span>
            <span className="rounded-full bg-space-800 px-2 py-0.5 text-xs text-ethereal-300">
              {auditLogs.length}
            </span>
          </button>
        </div>

        {/* ==================== TAB 1: OVERVIEW ==================== */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Live vs Demo Mode Control Banner */}
            <div className={`rounded-2xl border p-5 sm:p-6 backdrop-blur-xl transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              !isDemoMode
                ? 'border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_25px_-5px_rgba(52,211,153,0.2)]'
                : 'border-purple-500/40 bg-purple-950/20 shadow-purple-glow'
            }`}>
              <div>
                <div className="flex items-center gap-2.5">
                  <span className={`h-3 w-3 rounded-full ${!isDemoMode ? 'bg-emerald-400 animate-pulse' : 'bg-purple-400'}`} />
                  <h3 className="text-base font-bold text-white">
                    Rendszer Állapot: {!isDemoMode ? 'ÉLES MÓD (PRODUCTION / LIVE)' : 'DEMO MÓD (SZIMULÁLT)'}
                  </h3>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    !isDemoMode
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {!isDemoMode ? 'Éles' : 'Demo'}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-ethereal-300 max-w-2xl">
                  {!isDemoMode
                    ? "Az alkalmazás éles produkciós módban üzemel. A beállított AI szolgáltatók, felhasználói adatok és rendszerszolgáltatások valós környezetben működnek."
                    : "Az alkalmazás szimulált bemutató módban fut. Az AI szintézisek a beépített offline motoron alapulnak."}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setDemoMode(false);
                    showNotice("✨ Sikeresen átkapcsolva ÉLES MÓDBA!");
                  }}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    !isDemoMode
                      ? 'bg-emerald-500 text-space-950 shadow-[0_0_15px_-2px_rgba(52,211,153,0.5)]'
                      : 'border border-white/10 bg-white/5 text-ethereal-300 hover:bg-white/10'
                  }`}
                >
                  Éles Mód (Live)
                </button>
                <button
                  onClick={() => {
                    setDemoMode(true);
                    showNotice("Átkapcsolva Demo Módba.");
                  }}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    isDemoMode
                      ? 'bg-purple-600 text-white shadow-purple-glow'
                      : 'border border-white/10 bg-white/5 text-ethereal-300 hover:bg-white/10'
                  }`}
                >
                  Demo Mód
                </button>
              </div>
            </div>

            {/* Metric KPI cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-space-900/60 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-ethereal-400">
                    {t.admin.totalUsers || "Összes Felhasználó"}
                  </span>
                  <div className="rounded-xl border border-gold-500/30 bg-gold-500/10 p-2 text-gold-400">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">{totalUsersCount}</span>
                  <span className="text-xs text-emerald-400 font-medium">+{usersList.length} aktív</span>
                </div>
                <p className="mt-1 text-xs text-ethereal-400">Regisztrált lélek a platformon</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-space-900/60 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-ethereal-400">
                    Prémium Beavatottak
                  </span>
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2 text-amber-400">
                    <Crown className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-amber-300">{premiumUsersCount}</span>
                  <span className="text-xs text-amber-400/80 font-medium">({premiumRate}%)</span>
                </div>
                <p className="mt-1 text-xs text-ethereal-400">Korlátlan hozzáférésű tagok</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-space-900/60 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-ethereal-400">
                    {t.admin.activeProvider || "Aktív AI Motor"}
                  </span>
                  <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-2 text-purple-400">
                    <Cpu className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold uppercase text-white">{activeAiProvider}</span>
                  <span className="text-xs text-emerald-400 font-medium">Online</span>
                </div>
                <p className="mt-1 text-xs text-ethereal-400">Sors szintézis & orákulum motor</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-space-900/60 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-ethereal-400">
                    Adminisztrátorok
                  </span>
                  <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-2 text-rose-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-rose-300">{adminCount}</span>
                  <span className="text-xs text-ethereal-400 font-medium">teljes jogosultság</span>
                </div>
                <p className="mt-1 text-xs text-ethereal-400">Konzol hozzáféréssel bíró profilok</p>
              </div>
            </div>

            {/* Platform Health & Architecture Overview */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-space-900/60 p-6 backdrop-blur-xl">
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-gold-400" />
                  Nyelvi Eloszlás (4 Támogatott Nyelv)
                </h3>
                <p className="mt-1 text-xs text-ethereal-400">
                  Felhasználók által kiválasztott elsődleges nyelv
                </p>

                <div className="mt-4 space-y-3">
                  {[
                    { code: 'hu', label: 'Magyar (HU)', count: langCounts.hu, color: 'bg-emerald-500' },
                    { code: 'en', label: 'English (EN)', count: langCounts.en, color: 'bg-blue-500' },
                    { code: 'de', label: 'Deutsch (DE)', count: langCounts.de, color: 'bg-amber-500' },
                    { code: 'fr', label: 'Français (FR)', count: langCounts.fr, color: 'bg-purple-500' },
                  ].map((lang) => {
                    const percent = totalUsersCount > 0 ? Math.round((lang.count / totalUsersCount) * 100) : 0;
                    return (
                      <div key={lang.code}>
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span className="text-white">{lang.label}</span>
                          <span className="text-ethereal-400">{lang.count} fő ({percent}%)</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-space-800 overflow-hidden">
                          <div
                            className={`h-full ${lang.color} rounded-full transition-all duration-500`}
                            style={{ width: `${Math.max(percent, 5)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-space-900/60 p-6 backdrop-blur-xl">
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <Layers className="h-4 w-4 text-purple-400" />
                  Rendszer- & Stack Állapot
                </h3>
                <p className="mt-1 text-xs text-ethereal-400">
                  Technikai infrastruktúra & komponensek
                </p>

                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-white/5 bg-white/[0.02]">
                    <span className="text-ethereal-300">Next.js Framework:</span>
                    <span className="font-semibold text-white">v14.2.33 (App Router)</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-white/5 bg-white/[0.02]">
                    <span className="text-ethereal-300">Docker Konténerizáció:</span>
                    <span className="font-semibold text-emerald-400">node:22-alpine (Render Ready)</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-white/5 bg-white/[0.02]">
                    <span className="text-ethereal-300">Supabase Adatbázis & RLS:</span>
                    <span className="font-semibold text-gold-300">18 tábla + RLS migráció kész</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-white/5 bg-white/[0.02]">
                    <span className="text-ethereal-300">Determinisztikus Motorok:</span>
                    <span className="font-semibold text-emerald-400">Tarot (78 lap) + Pitagoraszi Numerológia</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-white/5 bg-white/[0.02]">
                    <span className="text-ethereal-300">Vitest Tesztlefedettség:</span>
                    <span className="font-semibold text-emerald-400">18 / 18 unit teszt sikeres</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== TAB 2: USERS MANAGEMENT ==================== */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Filters and Add User button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ethereal-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Keresés név, ID vagy ország alapján..."
                    className="w-full rounded-xl border border-white/10 bg-space-900/80 py-2.5 pl-10 pr-4 text-xs text-white placeholder-ethereal-500 focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div className="flex rounded-xl border border-white/10 bg-space-900/80 p-1">
                  {(['all', 'free', 'premium'] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setFilterTier(tier)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                        filterTier === tier
                          ? 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                          : 'text-ethereal-400 hover:text-white'
                      }`}
                    >
                      {tier === 'all' ? 'Mind' : tier}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowAddUser(!showAddUser)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gold-500 px-4 py-2.5 text-xs font-semibold text-space-950 shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>Új Felhasználó</span>
              </button>
            </div>

            {/* Add user form collapse */}
            <AnimatePresence>
              {showAddUser && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleCreateUser}
                  className="rounded-2xl border border-gold-500/30 bg-space-900/90 p-5 backdrop-blur-xl shadow-gold-glow space-y-4 overflow-hidden"
                >
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-gold-400" />
                    Új Felhasználó Regisztrálása a Rendszerbe
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs text-ethereal-400 mb-1">Megjelenített Név *</label>
                      <input
                        type="text"
                        required
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="Pl. Vándor Csilla"
                        className="w-full rounded-xl border border-white/10 bg-space-950/80 p-2 text-xs text-white placeholder-ethereal-500 focus:border-gold-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-ethereal-400 mb-1">Email / Azonosító</label>
                      <input
                        type="text"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="csilla@pelda.hu"
                        className="w-full rounded-xl border border-white/10 bg-space-950/80 p-2 text-xs text-white placeholder-ethereal-500 focus:border-gold-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-ethereal-400 mb-1">Előfizetési Csomag</label>
                      <select
                        value={newUserTier}
                        onChange={(e) => setNewUserTier(e.target.value as 'free' | 'premium')}
                        className="w-full rounded-xl border border-white/10 bg-space-950/80 p-2 text-xs text-white focus:border-gold-400 focus:outline-none"
                      >
                        <option value="free">Ingyenes (Kereső)</option>
                        <option value="premium">Prémium (Beavatott)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-ethereal-400 mb-1">Rendszer Szerepkör</label>
                      <select
                        value={newUserRole}
                        onChange={(e) => setNewUserRole(e.target.value as 'user' | 'admin')}
                        className="w-full rounded-xl border border-white/10 bg-space-950/80 p-2 text-xs text-white focus:border-gold-400 focus:outline-none"
                      >
                        <option value="user">Sima Felhasználó</option>
                        <option value="admin">Adminisztrátor</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddUser(false)}
                      className="rounded-xl border border-white/10 px-3 py-1.5 text-xs text-ethereal-300 hover:bg-white/5"
                    >
                      Mégse
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-gold-500 px-4 py-1.5 text-xs font-semibold text-space-950 hover:brightness-110"
                    >
                      Létrehozás
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Users Table */}
            <div className="rounded-2xl border border-white/10 bg-space-900/60 backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/10 bg-space-950/60 uppercase tracking-wider text-ethereal-400 font-semibold">
                    <tr>
                      <th className="p-4">Felhasználó</th>
                      <th className="p-4">Születési Adat</th>
                      <th className="p-4">Nyelv</th>
                      <th className="p-4">Szint (Tier)</th>
                      <th className="p-4">Szerepkör (Role)</th>
                      <th className="p-4 text-right">Műveletek</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-ethereal-400">
                          Nem található a keresési feltételnek megfelelő felhasználó.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => {
                        const isCurrent = u.id === user?.id;
                        return (
                          <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/30 bg-space-800 text-sm font-bold text-gold-300">
                                  {u.displayName ? u.displayName.charAt(0).toUpperCase() : "U"}
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-white">{u.displayName}</span>
                                    {isCurrent && (
                                      <span className="rounded-full bg-gold-500/20 px-1.5 py-0.2 text-[9px] text-gold-300 font-medium">
                                        TE
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-ethereal-400 font-mono">{u.id}</span>
                                </div>
                              </div>
                            </td>

                            <td className="p-4 text-ethereal-300">
                              <div>{u.birthDate}</div>
                              <div className="text-[10px] text-ethereal-400">{u.birthPlace || u.currentCountry}</div>
                            </td>

                            <td className="p-4">
                              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono uppercase text-[10px] text-white">
                                {u.preferredLanguage || 'hu'}
                              </span>
                            </td>

                            <td className="p-4">
                              <button
                                onClick={() => handleToggleTier(u)}
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${
                                  u.tier === 'premium'
                                    ? 'border border-amber-500/40 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 shadow-sm'
                                    : 'border border-white/10 bg-white/5 text-ethereal-300 hover:bg-white/10'
                                }`}
                                title="Kattints a csomag váltásához"
                              >
                                {u.tier === 'premium' ? (
                                  <>
                                    <Crown className="h-3 w-3 text-amber-400" />
                                    <span>Prémium</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="h-1.5 w-1.5 rounded-full bg-ethereal-400" />
                                    <span>Ingyenes</span>
                                  </>
                                )}
                              </button>
                            </td>

                            <td className="p-4">
                              <button
                                onClick={() => handleToggleRole(u)}
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                                  u.role === 'admin'
                                    ? 'border border-rose-500/40 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 shadow-sm'
                                    : 'border border-blue-500/20 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20'
                                }`}
                                title="Kattints az admin jog ki/be kapcsolásához"
                              >
                                {u.role === 'admin' ? (
                                  <>
                                    <ShieldCheck className="h-3 w-3 text-rose-400" />
                                    <span>ADMIN</span>
                                  </>
                                ) : (
                                  <span>Felhasználó</span>
                                )}
                              </button>
                            </td>

                            <td className="p-4 text-right">
                              <button
                                onClick={() => handleDeleteUser(u.id, u.displayName)}
                                disabled={isCurrent}
                                className="rounded-lg p-1.5 text-ethereal-400 hover:bg-rose-500/20 hover:text-rose-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                title={isCurrent ? "Saját magad nem törölheted" : "Felhasználó törlése"}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== TAB 3: AI & SYSTEM ==================== */}
        {activeTab === 'system' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* AI Engine Routing */}
            <div className="rounded-2xl border border-white/10 bg-space-900/60 p-6 backdrop-blur-xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="h-5 w-5 text-gold-400" />
                AI Motor Választó & Fallback Beállítás
              </h3>
              <p className="mt-1 text-xs text-ethereal-300">
                Válaszd ki a spirituális beszélgetésekhez, tarot szintézisekhez és álomelemzésekhez használandó szolgáltatót.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    id: 'mock',
                    name: 'SorsAI Offline Orákulum',
                    sub: 'Beépített determinisztikus szintézis',
                    badge: 'Alapértelmezett / Ingyenes',
                    desc: 'Azonnali válaszok API kulcs nélkül. Ideális bemutatóhoz és stabil működéshez.'
                  },
                  {
                    id: 'gemini',
                    name: 'Google Gemini 1.5 Pro',
                    sub: 'GEMINI_API_KEY',
                    badge: 'Ajánlott',
                    desc: 'Kiváló magyar nyelvi megértés, mély asszociációk és 1M kontextus ablak.'
                  },
                  {
                    id: 'openai',
                    name: 'OpenAI GPT-4o',
                    sub: 'OPENAI_API_KEY',
                    badge: 'Prémium Modell',
                    desc: 'Fejlett többfordulós beszélgetések, empatikus orákulum tónus.'
                  },
                  {
                    id: 'anthropic',
                    name: 'Anthropic Claude 3.5',
                    sub: 'ANTHROPIC_API_KEY',
                    badge: 'Filozofikus Elemző',
                    desc: 'Részletes, poétikus szövegformálás és pszichológiai mélység.'
                  },
                ].map((item) => {
                  const isSelected = activeAiProvider === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSaveAiProvider(item.id)}
                      className={`cursor-pointer rounded-2xl p-5 border transition-all ${
                        isSelected
                          ? 'border-gold-500/60 bg-gold-500/10 shadow-gold-glow'
                          : 'border-white/10 bg-space-950/60 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{item.name}</span>
                        <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-gold-400 bg-gold-400' : 'border-white/20'}`}>
                          {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-space-950" />}
                        </div>
                      </div>
                      <span className="mt-1 inline-block text-[10px] text-gold-400/90 font-mono">
                        {item.sub}
                      </span>
                      <p className="mt-3 text-xs text-ethereal-400">{item.desc}</p>
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px]">
                        <span className="text-ethereal-400">{item.badge}</span>
                        {isSelected && <span className="text-gold-300 font-semibold">AKTÍV</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Global Announcement & Broadcast */}
            <div className="rounded-2xl border border-white/10 bg-space-900/60 p-6 backdrop-blur-xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Radio className="h-5 w-5 text-amber-400" />
                Globális Rendszerközlemény & Karbantartási Sáv
              </h3>
              <p className="mt-1 text-xs text-ethereal-300">
                Itt megadott üzenet azonnal megjelenik minden látogató és felhasználó képernyőjén.
              </p>

              <form onSubmit={handleSaveAnnouncement} className="mt-4 space-y-3">
                <input
                  type="text"
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  placeholder="Pl. ✨ Ma éjjel Telihold szertartás az orákulummal! Új Tarot lapok elérhetők."
                  className="w-full rounded-xl border border-white/10 bg-space-950/80 p-3 text-xs text-white placeholder-ethereal-500 focus:border-gold-400 focus:outline-none"
                />
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-ethereal-400">
                    Hagyd üresen a sáv kikapcsolásához.
                  </span>
                  <button
                    type="submit"
                    className="rounded-xl bg-gold-500 px-4 py-2 text-xs font-semibold text-space-950 hover:brightness-110"
                  >
                    Közlemény Mentése
                  </button>
                </div>
              </form>
            </div>

            {/* Maintenance & Cache Flush */}
            <div className="rounded-2xl border border-rose-500/20 bg-rose-950/10 p-6 backdrop-blur-xl">
              <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-rose-400" />
                Veszélyes Műveletek & Tesztadat Reset
              </h3>
              <p className="mt-1 text-xs text-ethereal-400">
                Alaphelyzetbe állítja az alkalmazás helyi adatait és újrainicializálja az alapértelmezett profilokat.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    if (confirm("Biztosan visszaállítod a teszt adatbázist az eredeti állapotra?")) {
                      demoStore.clearAllData();
                      showNotice("Adatbázis visszaállítva az alapértelmezett demó értékekre!");
                      setTimeout(() => window.location.reload(), 800);
                    }
                  }}
                  className="flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/20 px-4 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/30 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Minden Tesztadat Törlése & Újratöltés</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== TAB 4: AUDIT LOGS ==================== */}
        {activeTab === 'logs' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <History className="h-5 w-5 text-gold-400" />
                  Biztonsági & Felhasználói Tevékenységnapló
                </h3>
                <p className="text-xs text-ethereal-300">
                  Az adminisztrátori műveletek, belépések és fontos rendszeresemények időrendi nyilvántartása.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
                    const dl = document.createElement('a');
                    dl.setAttribute("href", dataStr);
                    dl.setAttribute("download", `sorsai-audit-logs-${Date.now()}.json`);
                    dl.click();
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-ethereal-300 hover:bg-white/10"
                >
                  Exportálás JSON
                </button>
                <button
                  onClick={handleResetLogs}
                  className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs text-rose-300 hover:bg-rose-500/20"
                >
                  Napló Törlése
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-space-900/60 backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="divide-y divide-white/5">
                {auditLogs.length === 0 ? (
                  <div className="p-8 text-center text-xs text-ethereal-400">
                    A tevékenységnapló üres.
                  </div>
                ) : (
                  auditLogs.map((log) => (
                    <div key={log.id} className="p-4 hover:bg-white/[0.015] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gold-300">{log.action}</span>
                          <span className="text-[10px] text-ethereal-400 font-mono">by {log.userName}</span>
                        </div>
                        <p className="text-ethereal-300 text-xs">{log.details}</p>
                      </div>
                      <div className="text-[11px] text-ethereal-500 font-mono shrink-0">
                        {new Date(log.timestamp).toLocaleString('hu-HU')}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </AppShell>
  );
}
