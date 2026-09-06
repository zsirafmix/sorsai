"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Search,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
  Tag,
  Smile
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { GlowBadge } from '@/components/mystical/GlowBadge';
import { useTranslation } from '@/lib/i18n';
import { demoStore, JournalEntry } from '@/lib/storage/demoStore';

export default function JournalPage() {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<JournalEntry[]>(() => demoStore.getJournal());
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [newType, setNewType] = useState<JournalEntry['type']>('personal');
  const [newMood, setNewMood] = useState('Békés');
  const [newTagInput, setNewTagInput] = useState('');

  const filterOptions = [
    { id: 'all', label: t.journal.filterAll },
    { id: 'tarot', label: t.journal.filterTarot },
    { id: 'dream', label: t.journal.filterDream },
    { id: 'relationship', label: t.journal.filterRelationship },
    { id: 'career', label: t.journal.filterCareer },
    { id: 'personal', label: t.journal.filterPersonal },
    { id: 'ai_analysis', label: t.journal.filterAi },
  ];

  const filteredEntries = useMemo(() => {
    return entries.filter((e) => {
      const matchesFilter = filterType === 'all' || e.type === filterType;
      const matchesSearch =
        !searchQuery.trim() ||
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [entries, filterType, searchQuery]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) return;

    const tags = newTagInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    const created = demoStore.addJournalEntry({
      type: newType,
      title: newTitle,
      text: newText,
      tags,
      mood: newMood
    });

    setEntries(demoStore.getJournal());
    setIsCreating(false);
    setNewTitle('');
    setNewText('');
    setNewTagInput('');
  };

  const handleDelete = (id: string) => {
    demoStore.deleteJournalEntry(id);
    setEntries(demoStore.getJournal());
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GlowBadge variant="gold">
                <BookOpen className="h-3.5 w-3.5" />
                Személyes Belső Krónika
              </GlowBadge>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {t.journal.title}
            </h1>
            <p className="text-xs sm:text-sm text-ethereal-300 mt-1">
              {t.journal.subtitle}
            </p>
          </div>

          <button
            onClick={() => setIsCreating(!isCreating)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 px-5 py-2.5 text-xs font-bold text-space-950 hover:brightness-110 transition-all shadow-gold-glow shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>{isCreating ? t.common.cancel : t.journal.newEntry}</span>
          </button>
        </div>

        {/* New Entry Form if opened */}
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-gold-500/40 bg-card-gradient p-6 sm:p-8 backdrop-blur-xl shadow-glass space-y-4"
          >
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gold-400" />
              <span>Új Sorsnapló bejegyzés készítése</span>
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gold-300 mb-1">Cím</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="pl. Mai felismerés a meditáció után..."
                    className="w-full rounded-xl border border-white/10 bg-space-950/70 px-4 py-2.5 text-sm text-white focus:border-gold-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gold-300 mb-1">Típus</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full rounded-xl border border-white/10 bg-space-950/70 px-4 py-2.5 text-sm text-white focus:border-gold-400 focus:outline-none"
                  >
                    <option value="personal">Személyes gondolat</option>
                    <option value="tarot">Tarot tapasztalat</option>
                    <option value="dream">Álom</option>
                    <option value="relationship">Kapcsolati reflexió</option>
                    <option value="career">Karrier / Munka</option>
                    <option value="ai_analysis">AI Elemzés</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-300 mb-1">Tartalom</label>
                <textarea
                  rows={4}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Írd le a gondolataidat, a megfigyeléseidet vagy a nap tanítását..."
                  className="w-full rounded-xl border border-white/10 bg-space-950/70 p-4 text-sm text-white focus:border-gold-400 focus:outline-none leading-relaxed"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-ethereal-300 mb-1">Hangulat / Érzés</label>
                  <input
                    type="text"
                    value={newMood}
                    onChange={(e) => setNewMood(e.target.value)}
                    placeholder="pl. Nyugodt, Hálás, Kereső"
                    className="w-full rounded-xl border border-white/10 bg-space-950/70 px-4 py-2.5 text-sm text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-ethereal-300 mb-1">Címkék (vesszővel elválasztva)</label>
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    placeholder="pl. hála, fókusz, döntés"
                    className="w-full rounded-xl border border-white/10 bg-space-950/70 px-4 py-2.5 text-sm text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-ethereal-300 hover:bg-white/10"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 px-5 py-2 text-xs font-bold text-space-950 hover:brightness-110 shadow-gold-glow"
                >
                  Bejegyzés mentése
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Search and Filters Bar */}
        <div className="rounded-2xl border border-white/10 bg-card-gradient p-4 backdrop-blur-xl shadow-glass flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ethereal-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.journal.searchPlaceholder}
              className="w-full rounded-xl border border-white/5 bg-space-950/60 pl-10 pr-4 py-2 text-xs text-white placeholder-ethereal-500 focus:border-gold-400 focus:outline-none"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {filterOptions.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`rounded-xl border px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                  filterType === f.id
                    ? 'border-gold-500/50 bg-gold-500/20 text-gold-200 shadow-gold-glow'
                    : 'border-white/5 bg-space-950/60 text-ethereal-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Entries List */}
        <div className="space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="rounded-3xl border border-white/5 bg-card-gradient p-12 text-center text-ethereal-400">
              <BookOpen className="h-10 w-10 mx-auto mb-3 text-ethereal-500 opacity-60" />
              <p className="text-sm font-medium">{t.journal.emptyJournal}</p>
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl shadow-glass space-y-4 hover:border-gold-500/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="rounded-lg bg-gold-500/10 border border-gold-500/30 px-2.5 py-0.5 text-[11px] font-bold text-gold-300 capitalize">
                        {entry.type}
                      </span>
                      {entry.mood && (
                        <span className="flex items-center gap-1 text-[11px] text-ethereal-400">
                          <Smile className="h-3 w-3 text-mystic-400" />
                          <span>{entry.mood}</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white">{entry.title}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-ethereal-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(entry.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-ethereal-500 hover:text-rose-400 transition-colors p-1"
                      title="Bejegyzés törlése"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-ethereal-200 leading-relaxed font-light whitespace-pre-line bg-space-950/50 p-4 rounded-2xl border border-white/5">
                  {entry.text}
                </p>

                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <Tag className="h-3 w-3 text-ethereal-500" />
                    {entry.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-white/5 border border-white/5 px-2 py-0.5 text-[10px] text-ethereal-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
