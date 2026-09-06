"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Sparkles,
  BookOpen,
  Check,
  Compass,
  Binary,
  Layers,
  HelpCircle,
  Sun
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { PERSONAS, PersonaId } from '@/prompts';
import { useAuth } from '@/lib/storage/authContext';
import { useTranslation } from '@/lib/i18n';
import { demoStore, ChatMessageItem } from '@/lib/storage/demoStore';
import { TarotCardView } from '@/components/tarot/TarotCardView';
import { MysticalLoader } from '@/components/mystical/MysticalLoader';
import { SynthesisOutput } from '@/lib/ai/schemas';

const SAMPLE_QUESTIONS = [
  "Mit üzen számomra ez az időszak?",
  "Hogyan alakulhat a kapcsolatom az elkövetkező hónapokban?",
  "Érdemes munkahelyet vagy irányt váltanom?",
  "Mire érdemes leginkább figyelnem a belső fejlődésemben?"
];

export default function ChatPage() {
  const { user } = useAuth();
  const { language, t } = useTranslation();

  const [persona, setPersona] = useState<PersonaId>('luna');
  const [mode, setMode] = useState<string>('synthesis');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("A spirituális mintázatok összekapcsolása folyamatban...");
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [savedStatus, setSavedStatus] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const history = demoStore.getChatHistory();
    if (history.length > 0) {
      setMessages(history);
    } else {
      // Welcome initial message
      const initial: ChatMessageItem = {
        id: "msg_welcome",
        role: "assistant",
        content: `Üdvözöllek a szentélyben, ${user?.displayName || "Fénykereső"}! Én Luna vagyok, a személyes intuitív kísérőd. Kérdezz bátran bármilyen életterületről, vagy válaszd a ✨ Teljes Sorszintézist a Tarot, a numerológia és a csillagok együttes bölcsességéért.`,
        mode: "quick",
        persona: "luna",
        createdAt: new Date().toISOString()
      };
      setMessages([initial]);
    }
  }, [user?.displayName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessageItem = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: text,
      mode,
      persona,
      createdAt: new Date().toISOString()
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    if (mode === 'synthesis') {
      setLoadingStatus("Kihúzom a kérdésedhez tartozó Tarot lapot és kiszámítom a numerológiai kódokat...");
    } else {
      setLoadingStatus("A spirituális válasz formálása folyamatban...");
    }

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          persona,
          mode,
          userProfile: user,
          language,
          provider: typeof window !== 'undefined' ? (localStorage.getItem('sorsai_ai_provider') || undefined) : undefined
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Hiba történt a válasz generálásakor.");

      const assistantMsg: ChatMessageItem = {
        id: `ast_${Date.now()}`,
        role: 'assistant',
        content: data.content || (data.data?.summary ?? ""),
        mode,
        persona,
        createdAt: new Date().toISOString(),
        structured: data.type === 'synthesis' ? { ...data.data, activeCard: data.activeCard } : undefined
      };

      const updated = [...newMessages, assistantMsg];
      setMessages(updated);
      demoStore.saveChatHistory(updated);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessageItem = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: `Elnézést, pillanatnyilag kozmikus interferencia merült fel. Kérlek, próbáld újra egy pillanat múlva.`,
        mode,
        persona,
        createdAt: new Date().toISOString()
      };
      setMessages([...newMessages, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToJournal = (msg: ChatMessageItem) => {
    demoStore.addJournalEntry({
      type: 'ai_analysis',
      title: `AI Orákulum: ${msg.content.slice(0, 40)}...`,
      text: msg.structured ? JSON.stringify(msg.structured, null, 2) : msg.content,
      tags: ['ai_elemzés', msg.persona, msg.mode],
      mood: 'Reflektív'
    });
    setSavedStatus((prev) => ({ ...prev, [msg.id]: true }));
  };

  return (
    <AppShell>
      <div className="flex flex-col h-[calc(100vh-140px)] max-w-5xl mx-auto">
        {/* Header: Persona & Mode selection */}
        <div className="relative rounded-3xl mystic-card p-4 backdrop-blur-2xl mb-4 shrink-0 shadow-[0_0_30px_rgba(212,175,55,0.12)]">
          <div className="mystic-corner-tl" />
          <div className="mystic-corner-br" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Personas */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              <span className="font-serif text-xs font-bold text-gold-300 uppercase tracking-wider mr-1 hidden sm:inline">
                ✦ Kísérő:
              </span>
              {Object.values(PERSONAS).map((p) => {
                const isSelected = persona === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPersona(p.id)}
                    className={`flex items-center gap-2 rounded-2xl border px-3.5 py-1.5 text-xs font-serif font-semibold transition-all shrink-0 ${
                      isSelected
                        ? 'border-gold-500/70 bg-gold-500/25 text-gold-200 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                        : 'border-gold-500/15 bg-space-950/70 text-ethereal-400 hover:text-white hover:border-gold-500/30'
                    }`}
                    title={p.title_hu}
                  >
                    <span>{p.avatar}</span>
                    <span>{p.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Analysis Mode */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <span className="font-serif text-xs font-bold text-gold-300 uppercase tracking-wider mr-1 hidden sm:inline">
                Fókusz:
              </span>
              {[
                { id: 'synthesis', label: '✨ Sorszintézis' },
                { id: 'quick', label: 'Gyors AI' },
                { id: 'tarot', label: 'Tarot' },
                { id: 'numerology', label: 'Számok' },
                { id: 'astrology', label: 'Csillagok' },
              ].map((m) => {
                const isSelected = mode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`rounded-2xl border px-3 py-1 text-xs font-serif font-medium transition-all shrink-0 ${
                      isSelected
                        ? 'border-mystic-400/60 bg-mystic-500/25 text-mystic-200 shadow-mystic-glow'
                        : 'border-gold-500/15 bg-space-950/70 text-ethereal-400 hover:text-white'
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-4">
          {messages.map((msg) => {
            const isAssistant = msg.role === 'assistant';
            const activePersona = PERSONAS[msg.persona as PersonaId] || PERSONAS.luna;

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
              >
                {isAssistant && (
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-gold-500/40 bg-[#120a24] text-base shadow-[0_0_15px_rgba(212,175,55,0.25)] shrink-0">
                    {activePersona.avatar}
                    <div className="absolute inset-0 rounded-2xl border border-gold-400/20 animate-pulse pointer-events-none" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-3xl p-6 backdrop-blur-2xl ${
                    isAssistant
                      ? 'relative mystic-card text-white shadow-[0_0_35px_rgba(212,175,55,0.1)]'
                      : 'border-2 border-gold-500/40 bg-gradient-to-r from-gold-500/20 via-amber-500/15 to-gold-500/20 text-white shadow-gold-glow'
                  }`}
                >
                  {isAssistant && <div className="mystic-corner-tl" />}
                  {isAssistant && <div className="mystic-corner-br" />}

                  {/* Assistant name / header */}
                  {isAssistant && (
                    <div className="flex items-center justify-between border-b border-gold-500/20 pb-2.5 mb-4 text-xs">
                      <span className="font-serif font-bold text-gold-300 tracking-wider">
                        ✦ {activePersona.name} ({activePersona.title_hu})
                      </span>
                      <span className="text-[10px] text-ethereal-400 font-serif uppercase tracking-[0.2em]">
                        {msg.mode === 'synthesis' ? '✨ Sorszintézis' : msg.mode}
                      </span>
                    </div>
                  )}

                  {/* Render Structured Synthesis Response */}
                  {msg.structured ? (
                    <div className="space-y-4 text-xs sm:text-sm">
                      {/* Title & Summary */}
                      <div>
                        <h4 className="font-serif text-lg font-bold gold-text-gradient">{msg.structured.title}</h4>
                        <p className="mt-2 text-ethereal-200 leading-relaxed font-light font-serif italic text-sm">
                          „{msg.structured.summary}”
                        </p>
                      </div>

                      {/* Drawn Card if available */}
                      {msg.structured.activeCard && (
                        <div className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl bg-space-950/80 border border-gold-500/30 p-4 shadow-sm">
                          <TarotCardView
                            card={msg.structured.activeCard.card}
                            isReversed={msg.structured.activeCard.isReversed}
                            isFlipped={true}
                            size="sm"
                          />
                          <div className="flex-1 text-left">
                            <span className="font-serif text-[10px] uppercase tracking-[0.2em] font-bold text-gold-400">
                              ✦ Kihúzott Szimbólum
                            </span>
                            <h5 className="font-serif font-bold text-white text-base mt-0.5">
                              {msg.structured.activeCard.card.name_hu} ({msg.structured.activeCard.isReversed ? 'Fordított' : 'Álló'})
                            </h5>
                            <p className="mt-1.5 text-xs text-ethereal-300 font-light leading-relaxed">
                              {msg.structured.tarotPerspective}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Three Pillar Cards: Numerology, Astrology, Synthesis */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="rounded-2xl bg-space-950/70 border border-blue-500/25 p-3.5">
                          <span className="font-serif font-semibold text-blue-300 flex items-center gap-1.5 mb-1.5 text-xs">
                            <Binary className="h-3.5 w-3.5" /> Numerológiai Üzenet
                          </span>
                          <p className="text-ethereal-300 text-xs leading-relaxed font-light">
                            {msg.structured.numerologyPerspective}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-space-950/70 border border-purple-500/25 p-3.5">
                          <span className="font-serif font-semibold text-purple-300 flex items-center gap-1.5 mb-1.5 text-xs">
                            <Compass className="h-3.5 w-3.5" /> Asztrológiai Nézőpont
                          </span>
                          <p className="text-ethereal-300 text-xs leading-relaxed font-light">
                            {msg.structured.astrologicalAngle}
                          </p>
                        </div>
                      </div>

                      {/* Things to notice & next steps */}
                      <div className="rounded-2xl bg-space-950/70 border border-gold-500/20 p-4 space-y-2">
                        <span className="font-serif font-bold text-gold-300 text-xs block uppercase tracking-wider">
                          ✦ Mire Érdemes Figyelni a Mindennapokban?
                        </span>
                        <ul className="list-disc list-inside space-y-1.5 text-ethereal-200 text-xs font-light">
                          {msg.structured.thingsToNotice?.map((item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Reflection question */}
                      <div className="rounded-2xl bg-gradient-to-r from-gold-500/15 via-amber-500/10 to-transparent border border-gold-500/35 p-4 shadow-sm">
                        <span className="font-serif text-[10px] uppercase font-bold tracking-[0.2em] text-gold-400 block mb-1">
                          ✦ Belső Reflexiós Kérdés
                        </span>
                        <p className="font-serif italic text-gold-200 font-medium text-sm">
                          „{msg.structured.reflectionQuestions?.[0] || msg.structured.reflectionQuestions}”
                        </p>
                      </div>

                      <div className="text-[10px] text-ethereal-500 italic pt-1 font-serif">
                        {msg.structured.disclaimer}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs sm:text-sm text-ethereal-200 leading-relaxed whitespace-pre-line font-serif font-light">
                      {msg.content}
                    </div>
                  )}

                  {/* Actions (Save to journal) */}
                  {isAssistant && (
                    <div className="mt-4 pt-3 border-t border-gold-500/15 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-ethereal-500 font-mono">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <button
                        onClick={() => saveToJournal(msg)}
                        disabled={savedStatus[msg.id]}
                        className="inline-flex items-center gap-1.5 font-serif text-[11px] text-gold-400 hover:text-gold-300 transition-colors"
                      >
                        {savedStatus[msg.id] ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Mentve a Sorsnaplóba</span>
                          </>
                        ) : (
                          <>
                            <BookOpen className="h-3.5 w-3.5" />
                            <span>Mentés Sorsnaplóba</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {!isAssistant && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gold-500/40 bg-space-900 text-xs font-serif font-bold text-gold-300 shadow-gold-glow shrink-0">
                    {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
              </motion.div>
            );
          })}

          {isLoading && (
            <div className="rounded-3xl mystic-card p-5 backdrop-blur-2xl shadow-gold-glow max-w-md">
              <MysticalLoader statusText={loadingStatus} />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts pills */}
        {messages.length < 3 && !isLoading && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-2 text-xs">
            <span className="font-serif text-gold-400 shrink-0 font-medium">✦ Javaslatok:</span>
            {SAMPLE_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="rounded-full border border-gold-500/25 bg-space-950/80 px-3.5 py-1.5 font-serif text-xs text-ethereal-300 hover:border-gold-500/50 hover:text-gold-200 transition-all whitespace-nowrap shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="relative rounded-3xl mystic-card p-2 backdrop-blur-2xl shadow-[0_0_30px_rgba(212,175,55,0.15)] shrink-0">
          <div className="mystic-corner-tl" />
          <div className="mystic-corner-br" />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chat.placeholder}
              disabled={isLoading}
              className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-ethereal-500 focus:outline-none font-serif"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 text-space-950 font-bold hover:brightness-110 disabled:opacity-40 transition-all shadow-gold-glow shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
