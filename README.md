# SorsAI ✨ – Modern, Prémium AI Spirituális és Önismereti Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Passing-green)](https://vitest.dev/)
[![Multilingual](https://img.shields.io/badge/i18n-HU%20|%20EN%20|%20DE%20|%20FR-gold)](#-többnyelvű-támogatás-i18n)

A **SorsAI** egy prémium megjelenésű, modern és felelősségteljes AI-alapú spirituális és önismereti webalkalmazás, amely több ezoterikus és szimbolikus rendszert egyesít egyetlen intelligens profil alatt:

* 🔮 **AI-jós / Spirituális párbeszéd**: ChatGPT-szerű felület 5 választható kísérővel (*Luna, Orion, Selene, Astrea, Sophia*)
* 🃏 **78 Lapos Autentikus Tarot Motor**: Determinisztikus backend keverés és húzás 8 kirakási móddal (1 lapos, 3 lapos, Szerelem, Karrier, Döntési keresztút, 30 nap, 12 hónap, Kelta Kereszt) és kártyaközi kapcsolatok AI értelmezése
* 🔢 **Determinisztikus Pitagoraszi Numerológia**: Életútszám (11, 22, 33 mesterszámok megőrzésével), születésnapi szám, személyes év és hónap, névszám, lélekszám, személyiségszám
* ⭐ **Asztrológiai szintézis**: Valós Napjegy, elem, modalitás és uralkodó bolygó meghatározás, transzparens efemerida jelzéssel
* ❤️ **Párkapcsolati szinasztria**: Két személy összehangolása szimbolikus érzelmi, kommunikációs, szenvedély- és stabilitási harmóniamutatókkal
* 🌙 **Álomelemző**: Carl Jung-i mélylélektani és archetípusos szimbólumfejtés
* 📖 **Sorsnapló**: Személyes belső krónika keresővel és kategóriaszűréssel
* 🧠 **Strukturált AI Memória**: Megtekinthető, szerkeszthető, ki- és bekapcsolható vagy törölhető tömörített kontextus
* ☀️ **Napi Kozmikus Kapcsolat**: Napi Tarot lap, napi energia (0-100) és 2-4 mondatos útmutatás
* ✨ **Teljes Sorszintézis**: Minden rendszer (profil, tarot lap, számok, csillagok) integrált összegzése egyetlen strukturált, 7-részes válaszban

> [!IMPORTANT]
> **Etikai és Biztonsági Alapelv:**
> Az alkalmazás szigorúan spirituális, szimbolikus, szórakoztató és önreflexiós célt szolgál. SOHA nem állítja, hogy megmásíthatatlanul megjósolja a jövőt, nem használ félelemkeltést, és krízishelyzetben professzionális segélyszervezethez irányít. Nem ad orvosi, jogi vagy pénzügyi döntési utasítást.

---

## 🌐 Többnyelvű Támogatás (i18n)

A SorsAI 4 nyelven működik zökkenőmentesen:
- 🇭🇺 **Magyar (`hu`)** – Alapértelmezett
- 🇬🇧 **English (`en`)**
- 🇩🇪 **Deutsch (`de`)**
- 🇫🇷 **Français (`fr`)**

A nyelv a fejlécben található választóval bármikor azonnal átkapcsolható. A teljes felület, a Tarot kártyanevek, a numerológiai archetípusok és az AI orákulum válaszai is alkalmazkodnak a kiválasztott nyelvhez.

---

## 🛠 Technológiai Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript (Strict Mode), Tailwind CSS, Framer Motion, Lucide ikonok
- **Dizájn**: Prémium éjszakai kozmikus látványvilág, mélykék és lila tónusok (`#060811`, `#1a0e33`), arany akcentusok (`#d4af37`), finom glassmorphism és ragyogó glow effektek
- **AI Réteg**: Provider-független architektúra (`AIProvider` absztrakció):
  - **OpenAI-compatible**: OpenAI (GPT-4o, GPT-4o-mini), Groq, Mistral, Together, OpenRouter
  - **Google Gemini**: Gemini 1.5 Flash / Pro
  - **Anthropic**: Claude 3.5 Haiku / Sonnet
  - **Mock / Demo AI Provider**: Gazdag, intelligens többnyelvű szimulált válaszok offline vagy API kulcs hiányában történő azonnali teszteléshez
- **Adatbázis & Auth**: Supabase PostgreSQL séma (18 tábla, Row Level Security, indexes) + automatikus LocalStorage/Memory Demo Store fallback
- **Tesztelés**: Vitest (18 unit teszt a determinisztikus motorokra, kártyapaklira, entitlement rendszerre és Zod sémákra)

---

## 🚀 Helyi Fejlesztés és Indítás

### 1. Klónozás és Függőségek Telepítése
```bash
git clone https://github.com/YOUR_USER/sorsai.git
cd sorsai
npm install
```

### 2. Környezeti Változók Beállítása
Másold le a mellékelt `.env.example` fájlt:
```bash
cp .env.example .env.local
```
*(Ha nem állítasz be API kulcsot, az alkalmazás automatikusan **Demo Módba** lép, és azonnal, 100%-ban használható marad!)*

### 3. Fejlesztői Szerver Indítása
```bash
npm run dev
```
Nyisd meg a böngészőben: `http://localhost:3000`

### 4. Tesztek Futtatása
```bash
npm test
```

---

## 🗄 Adatbázis Beállítás (Supabase)

Ha éles Supabase adatbázist szeretnél csatlakoztatni:
1. Hozz létre egy új projektet a [supabase.com](https://supabase.com) felületén.
2. Nyisd meg az **SQL Editor** fület.
3. Másold be és futtasd a `supabase/migrations/001_initial_schema.sql` teljes tartalmát.
4. Másold ki a `Project URL`-t és az `anon public key`-t a `.env.local` fájlba:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

---

## ☁️ Üzembe helyezés a Renderen (Render.com)

Az alkalmazás tartalmazza az automatikus **Render Blueprint** (`render.yaml`) és **Dockerfile** konfigurációt.

### 1. Lépés: GitHub Feltöltés
1. Hozz létre egy új privát vagy nyilvános adattárat a GitHubon: `sorsai`.
2. Küldd fel a kódot:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial commit of SorsAI"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sorsai.git
   git push -u origin main
   ```

### 2. Lépés: Render Web Service Létrehozása
1. Jelentkezz be a [dashboard.render.com](https://dashboard.render.com) felületre.
2. Kattints a **New +** -> **Web Service** gombra.
3. Csatlakoztasd a `sorsai` GitHub repository-t.
4. Add meg a beállításokat:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free` vagy tetszőleges
5. **Environment Variables**:
   - `NODE_ENV`: `production`
   - `AI_PROVIDER_DEFAULT`: `mock` (vagy `openai`, `gemini`, `anthropic`)
   - *(Opcionálisan az API kulcsaid: `OPENAI_API_KEY`, `GEMINI_API_KEY`, stb.)*
6. Kattints a **Create Web Service** gombra!

---

## 📂 Mappastruktúra

```
sorsai/
├── public/                 # Statikus fájlok, képek
├── src/
│   ├── app/                # Next.js App Router oldalak & API végpontok
│   │   ├── page.tsx        # Nyitó landing page
│   │   ├── (auth)/         # Bejelentkezés & Onboarding
│   │   ├── dashboard/      # Személyes irányítópult
│   │   ├── chat/           # "Kérdezd a Sorsot" AI chat
│   │   ├── tarot/          # 78 lapos Tarot kirakások
│   │   ├── numerology/     # Pitagoraszi numerológiai kalkulátor
│   │   ├── sorsprofil/     # Sorsprofilom áttekintés
│   │   ├── relationships/  # Párkapcsolati szinasztria
│   │   ├── dreams/         # Álomelemző
│   │   ├── journal/        # Sorsnapló keresővel
│   │   ├── memory/         # Strukturált AI memória
│   │   ├── daily/          # Napi orákulum
│   │   ├── pricing/        # Free vs Premium
│   │   ├── settings/       # Beállítások & GDPR adatexport
│   │   └── api/            # Backend API route-ok
│   ├── components/         # Reusable komponensek
│   │   ├── layout/         # Fejléc, oldalsáv, mobil menü, nyelvváltó
│   │   ├── mystical/       # Csillagos égbolt canvas, energia mérő, animált loader
│   │   └── tarot/          # 3D kártyafordítás és lapmegjelenítő
│   ├── lib/
│   │   ├── ai/             # Provider absztrakció & Zod sémák
│   │   ├── tarot/          # 78 kártya adatbázis & determinisztikus motor
│   │   ├── numerology/     # Pitagoraszi matematikai motor (mesterszámokkal)
│   │   ├── astrology/      # Csillagjegy és elemi kalkuláció
│   │   ├── entitlements.ts # Free / Premium jogosultságkezelő
│   │   ├── i18n/           # 4 nyelvű szótárak (hu, en, de, fr)
│   │   ├── storage/        # Helyi és mock perzisztens réteg
│   │   └── supabase/       # Supabase SSR és böngésző kliensek
│   └── prompts/            # Moduláris prompt architektúra & etikai szabályok
├── supabase/migrations/    # Teljes SQL séma és RLS szabályok
├── tests/                  # 18 automatizált unit teszt
├── render.yaml             # Render infrastructure-as-code specifikáció
└── Dockerfile              # Docker konténer definíció
```

---

## 📜 Licenc & Felelősség

Ez a szoftver saját szellemi tulajdon. Minden elemzés önismereti és szimbolikus célra készült.
