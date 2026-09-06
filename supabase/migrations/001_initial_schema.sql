-- SorsAI Supabase Database Schema
-- Run this in your Supabase SQL Editor to initialize all tables, indexes, and RLS policies.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    preferred_language TEXT DEFAULT 'hu' CHECK (preferred_language IN ('hu', 'en', 'de', 'fr')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Birth Profiles Table
CREATE TABLE IF NOT EXISTS public.birth_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    birth_date DATE NOT NULL,
    birth_time TIME,
    birth_place TEXT NOT NULL,
    current_country TEXT NOT NULL,
    relationship_status TEXT,
    interests TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. AI Conversations
CREATE TABLE IF NOT EXISTS public.ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Új beszélgetés',
    persona TEXT NOT NULL DEFAULT 'luna' CHECK (persona IN ('luna', 'orion', 'selene', 'astrea', 'sophia')),
    mode TEXT NOT NULL DEFAULT 'quick' CHECK (mode IN ('quick', 'tarot', 'numerology', 'astrology', 'synthesis')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. AI Messages
CREATE TABLE IF NOT EXISTS public.ai_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tarot Cards (Static dictionary)
CREATE TABLE IF NOT EXISTS public.tarot_cards (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_hu TEXT NOT NULL,
    name_de TEXT NOT NULL,
    name_fr TEXT NOT NULL,
    arcana TEXT NOT NULL CHECK (arcana IN ('major', 'minor')),
    number INTEGER NOT NULL,
    suit TEXT CHECK (suit IN ('wands', 'cups', 'swords', 'pentacles')),
    upright_meaning TEXT NOT NULL,
    reversed_meaning TEXT NOT NULL,
    keywords TEXT[] NOT NULL DEFAULT '{}',
    image_url TEXT
);

-- 6. Tarot Readings
CREATE TABLE IF NOT EXISTS public.tarot_readings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    spread_type TEXT NOT NULL,
    question TEXT,
    ai_interpretation TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Tarot Reading Cards (Join Table)
CREATE TABLE IF NOT EXISTS public.tarot_reading_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reading_id UUID NOT NULL REFERENCES public.tarot_readings(id) ON DELETE CASCADE,
    card_id TEXT NOT NULL REFERENCES public.tarot_cards(id),
    position INTEGER NOT NULL,
    position_name TEXT NOT NULL,
    is_reversed BOOLEAN NOT NULL DEFAULT FALSE
);

-- 8. Numerology Profiles
CREATE TABLE IF NOT EXISTS public.numerology_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    life_path_number INTEGER NOT NULL,
    birthday_number INTEGER NOT NULL,
    personal_year INTEGER NOT NULL,
    personal_month INTEGER NOT NULL,
    expression_number INTEGER NOT NULL,
    soul_urge_number INTEGER NOT NULL,
    personality_number INTEGER NOT NULL,
    calculated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Relationship Profiles
CREATE TABLE IF NOT EXISTS public.relationship_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    partner_name TEXT NOT NULL,
    partner_birth_date DATE NOT NULL,
    partner_birth_time TIME,
    partner_birth_place TEXT,
    relationship_type TEXT DEFAULT 'romantic',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Relationship Readings
CREATE TABLE IF NOT EXISTS public.relationship_readings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    partner_profile_id UUID REFERENCES public.relationship_profiles(id) ON DELETE SET NULL,
    emotional_score INTEGER NOT NULL,
    communication_score INTEGER NOT NULL,
    passion_score INTEGER NOT NULL,
    long_term_score INTEGER NOT NULL,
    synthesis TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Dream Entries
CREATE TABLE IF NOT EXISTS public.dream_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    dream_text TEXT NOT NULL,
    symbols TEXT[] DEFAULT '{}',
    emotional_tone TEXT,
    psychological_interpretation TEXT,
    spiritual_interpretation TEXT,
    reflection_questions TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Journal Entries (Sorsnapló)
CREATE TABLE IF NOT EXISTS public.journal_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('tarot', 'dream', 'relationship', 'career', 'personal', 'ai_analysis')),
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    mood TEXT,
    related_reading_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Daily Readings (Daily Cached Insights)
CREATE TABLE IF NOT EXISTS public.daily_readings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    reading_date DATE NOT NULL,
    energy_score INTEGER NOT NULL,
    sub_scores JSONB NOT NULL DEFAULT '{"love": 80, "career": 75, "finances": 70, "self": 85}'::jsonb,
    tarot_card_id TEXT NOT NULL REFERENCES public.tarot_cards(id),
    message TEXT NOT NULL,
    reflection_question TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, reading_date)
);

-- 14. Subscriptions (Free vs Premium)
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'premium')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due')),
    stripe_customer_id TEXT,
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Usage Events (Audit and Rate Limit tracking)
CREATE TABLE IF NOT EXISTS public.usage_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    feature TEXT NOT NULL,
    event_type TEXT NOT NULL DEFAULT 'generation',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Saved Readings
CREATE TABLE IF NOT EXISTS public.saved_readings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    reading_type TEXT NOT NULL,
    reading_id UUID NOT NULL,
    title TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. AI Memory
CREATE TABLE IF NOT EXISTS public.ai_memory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    current_themes TEXT[] DEFAULT '{}',
    goals TEXT[] DEFAULT '{}',
    important_context TEXT[] DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Notification Preferences
CREATE TABLE IF NOT EXISTS public.notification_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    daily_email BOOLEAN NOT NULL DEFAULT FALSE,
    weekly_digest BOOLEAN NOT NULL DEFAULT FALSE,
    language TEXT DEFAULT 'hu',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_ai_messages_conv ON public.ai_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_journal_user_type ON public.journal_entries(user_id, type);
CREATE INDEX IF NOT EXISTS idx_tarot_readings_user ON public.tarot_readings(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_events_user_feature ON public.usage_events(user_id, feature, created_at);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.birth_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tarot_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tarot_reading_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.numerology_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relationship_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relationship_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dream_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

-- Standard RLS Policies: users can only view and edit their own data
CREATE POLICY "Users can manage own profile" ON public.profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own birth profile" ON public.birth_profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own conversations" ON public.ai_conversations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own messages" ON public.ai_messages FOR ALL USING (EXISTS (SELECT 1 FROM public.ai_conversations WHERE id = ai_messages.conversation_id AND user_id = auth.uid()));
CREATE POLICY "Users can manage own tarot readings" ON public.tarot_readings FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own tarot reading cards" ON public.tarot_reading_cards FOR ALL USING (EXISTS (SELECT 1 FROM public.tarot_readings WHERE id = tarot_reading_cards.reading_id AND user_id = auth.uid()));
CREATE POLICY "Users can manage own numerology" ON public.numerology_profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own relationship profiles" ON public.relationship_profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own relationship readings" ON public.relationship_readings FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own dream entries" ON public.dream_entries FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own journal" ON public.journal_entries FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own daily readings" ON public.daily_readings FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own subscription" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own usage" ON public.usage_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage saved readings" ON public.saved_readings FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own ai memory" ON public.ai_memory FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage notification preferences" ON public.notification_preferences FOR ALL USING (auth.uid() = user_id);

-- Tarot cards table is read-only public
ALTER TABLE public.tarot_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read tarot cards" ON public.tarot_cards FOR SELECT USING (true);
