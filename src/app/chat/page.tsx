"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Sparkles,
  Bot,
  User,
  BookOpen,
  Check,
  Compass,
  Binary,
  Layers,
  HelpCircle
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
        content: `Üdvözöllek, ${user?.displayName || "Fénykereső"}! Én Luna vagyok, a személyes intuitív kísérőd. Kérdezz bátran bármilyen életterületről, vagy válaszd a ✨ Teljes Sorszintézist a Tarot, a numerológia és a csillagok együttes bölcsességéért.`,
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
          language
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
        content: `Elnézést, pillanatnyilag kapcsolódási nehézség merült fel. Kérlek, próbáld újra egy pillanat múlva.`,
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
      title: `AI Elemzés: ${msg.content.slice(0, 40)}...`,
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
        <div className="rounded-2xl border border-white/10 bg-card-gradient p-4 backdrop-blur-xl mb-4 shrink-0 shadow-glass">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Personas */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs font-semibold text-ethereal-400 mr-1 hidden sm:inline">Kísérő:</span>
              {Object.values(PERSONAS).map((p) => {
                const isSelected = persona === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPersona(p.id)}
                    className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all shrink-0 ${
                      isSelected
                        ? 'border-gold-500/50 bg-gold-500/20 text-gold-200 shadow-gold-glow'
                        : 'border-white/5 bg-space-900/60 text-ethereal-400 hover:text-white'
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
              <span className="text-xs font-semibold text-ethereal-400 mr-1 hidden sm:inline">Fókusz:</span>
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
                    className={`rounded-xl border px-2.5 py-1 text-xs font-medium transition-all shrink-0 ${
                      isSelected
                        ? 'border-mystic-400/50 bg-mystic-500/20 text-mystic-200 shadow-mystic-glow'
                        : 'border-white/5 bg-space-900/60 text-ethereal-400 hover:text-white'
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
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-gold-500/30 bg-space-900 text-base shadow-gold-glow shrink-0">
                    {activePersona.avatar}
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-5 backdrop-blur-xl ${
                    isAssistant
                      ? 'border border-white/10 bg-card-gradient text-white shadow-glass'
                      : 'border border-gold-500/30 bg-gradient-to-r from-gold-500/20 to-amber-500/10 text-white shadow-gold-glow'
                  }`}
                >
                  {/* Assistant name / header */}
                  {isAssistant && (
                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3 text-xs">
                      <span className="font-bold text-gold-300">
                        {activePersona.name} ({activePersona.title_hu})
                      </span>
                      <span className="text-[10px] text-ethereal-400 uppercase tracking-widest font-semibold">
                        {msg.mode === 'synthesis' ? '✨ Sorszintézis' : msg.mode}
                      </span>
                    </div>
                  )}

                  {/* Render Structured Synthesis Response */}
                  {msg.structured ? (
                    <div className="space-y-4 text-xs sm:text-sm">
                      {/* Title & Summary */}
                      <div>
                        <h4 className="text-base font-bold text-gold-300">{msg.structured.title}</h4>
                        <p className="mt-1.5 text-ethereal-200 leading-relaxed font-light">
                          {msg.structured.summary}
                        </p>
                      </div>

                      {/* Drawn Card if available */}
                      {msg.structured.activeCard && (
                        <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xl bg-space-950/70 border border-gold-500/20 p-3.5">
                          <TarotCardView
                            card={msg.structured.activeCard.card}
                            isReversed={msg.structured.activeCard.isReversed}
                            isFlipped={true}
                            size="sm"
                          />
                          <div className="flex-1 text-left">
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-400">
                              Kihúzott Szimbólum
                            </span>
                            <h5 className="font-bold text-white text-sm">
                              {msg.structured.activeCard.card.name_hu} ({msg.structured.activeCard.isReversed ? 'Fordított' : 'Álló'})
                            </h5>
                            <p className="mt-1 text-xs text-ethereal-300">
                              {msg.structured.tarotPerspective}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Three Pillar Cards: Numerology, Astrology, Synthesis */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        <div className="rounded-xl bg-space-950/50 border border-white/5 p-3">
                          <span className="font-semibold text-blue-300 flex items-center gap-1 mb-1">
                            <Binary className="h-3.5 w-3.5" /> Numerológiai Üzenet
                          </span>
                          <p className="text-ethereal-300 text-xs leading-relaxed">
                            {msg.structured.numerologyPerspective}
                          </p>
                        </div>
                        <div className="rounded-xl bg-space-950/50 border border-white/5 p-3">
                          <span className="font-semibold text-purple-300 flex items-center gap-1 mb-1">
                            <Compass className="h-3.5 w-3.5" /> Asztrológiai Nézőpont
                          </span>
                          <p className="text-ethereal-300 text-xs leading-relaxed">
                            {msg.structured.astrologicalAngle}
                          </p>
                        </div>
                      </div>

                      {/* Things to notice & next steps */}
                      <div className="rounded-xl bg-space-950/60 border border-white/5 p-3.5 space-y-2">
                        <span className="font-semibold text-gold-300 block">Mire érdemes figyelni?</span>
                        <ul className="list-disc list-inside space-y-1 text-ethereal-300">
                          {msg.structured.thingsToNotice?.map((item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Reflection question */}
                      <div className="rounded-xl bg-gold-500/10 border border-gold-500/30 p-3.5">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block mb-1">
                          Reflexiós kérdés
                        </span>
                        <p className="italic text-gold-200 font-medium">
                          „{msg.structured.reflectionQuestions?.[0] || msg.structured.reflectionQuestions}”
                        </p>
                      </div>

                      <div className="text-[10px] text-ethereal-500 italic pt-1">
                        {msg.structured.disclaimer}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs sm:text-sm text-ethereal-200 leading-relaxed whitespace-pre-line font-light">
                      {msg.content}
                    </div>
                  )}

                  {/* Actions (Save to journal) */}
                  {isAssistant && (
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-ethereal-500">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <button
                        onClick={() => saveToJournal(msg)}
                        disabled={savedStatus[msg.id]}
                        className="inline-flex items-center gap-1 text-[11px] text-gold-400 hover:text-gold-300 transition-colors"
                      >
                        {savedStatus[msg.id] ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400">Mentve a Sorsnaplóba</span>
                          </>
                        ) : (
                          <>
                            <BookOpen className="h-3 w-3" />
                            <span>Mentés Sorsnaplóba</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {!isAssistant && (
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-gold-500/40 bg-space-900 text-xs font-bold text-gold-300 shadow-gold-glow shrink-0">
                    {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
              </motion.div>
            );
          })}

          {isLoading && (
            <div className="rounded-2xl border border-gold-500/20 bg-card-gradient p-4 backdrop-blur-xl shadow-gold-glow max-w-md">
              <MysticalLoader statusText={loadingStatus} />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts pills when few messages */}
        {messages.length < 3 && !isLoading && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-2 text-xs">
            <span className="text-ethereal-400 shrink-0 font-medium">Javaslatok:</span>
            {SAMPLE_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-ethereal-300 hover:border-gold-500/40 hover:text-white transition-all whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="relative rounded-2xl border border-white/10 bg-card-gradient p-2 backdrop-blur-2xl shadow-glass shrink-0">
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
              className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder-ethereal-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 text-space-950 font-bold hover:brightness-110 disabled:opacity-40 transition-all shadow-gold-glow shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
