# Concept Document: DiverDea v2 (AI Concept Planner & Synthesis Engine)

## 1. Executive Summary
**DiverDea** adalah aplikasi web *AI-assisted concept planner* yang dirancang untuk membantu pengembang, desainer, dan mahasiswa keluar dari kebuntuan kreatif (*creative block*). Menggunakan mesin sintesis multi-mode, aplikasi ini menggabungkan beberapa mekanik fitur, wadah produk, dan variabel opsional untuk menghasilkan konsep proyek yang unik, kompleks, dan siap dieksekusi — lengkap dengan *AI-generated prompt* tingkat `Hyper-Expert` untuk AI code generator.

---

## 2. Masalah & Solusi
- **Masalah:** Banyak pengembang terjebak pada ide proyek yang sederhana dan "satu fitur saja" (misal: To-Do List standar, Weather App biasa), sehingga menghasilkan prototype yang kurang berbobot.
- **Solusi:** DiverDea memaksa mesin untuk mensintesis **2 hingga 5 mekanik fitur sekaligus** ke dalam satu wadah produk, lalu menghasilkan prompt tingkat *principal architect* yang memerintahkan AI code generator untuk mensintesisnya menjadi prototype premium siap pakai.

---

## 3. Synthesis Mode (Mode Utama)
Aplikasi memiliki **5 mode sintesis** yang dapat dipilih via sidebar:

| Mode | Label UI | Deskripsi | Data Source |
|---|---|---|---|
| **General** | Quick Mix | Mekanik fundamental & produk umum per kategori | `generalMechanics[category]`, `generalProducts[category]` |
| **Standard** | Balanced | Mekanik wajar + wadah produk dari kategori yang sama | `conceptsList1[category]`, `conceptsList2[category]` |
| **Lateral** | Wild Ideas | Mekanik ekstrem/psikologis *lintas kategori* secara acak | `conceptsListLateral[random]`, `conceptsList2[category]` |
| **Manual** | Manual | Mengisi mekanik, produk, dan variabel secara manual | User Input |
| **AI** | AI Planner | AI merancang 3 konsep dari masalah/ide/domain pengguna | Gemini / Groq LLM |

---

## 4. Fitur Utama (Core Features)

### 4.1 Collapsible Glassmorphic Sidebar
Kontrol sidebar kiri diorganisasikan ke dalam **5 panel accordion kaca (glassmorphism)** yang dapat diciutkan secara independen:
1. 🔮 **Engine Mode:** Mengatur Synthesis Mode, Primary & Secondary Category (termasuk custom input), dan Target Output (Standard HTML / Master Stack).
2. 🧱 **Composition:** Mengatur jumlah mekanik, gaya visual, target audiens, constraint, dan navigasi halaman via slider (0x–5x).
3. 🚀 **UX Essentials:** Kapabilitas antarmuka (UI Style, SPA Navigation, SVG Logo, Micro-Animations). Dilengkapi counter badge `activeUxEssentialsCount` pada header.
4. 💻 **Tech Integrations:** Kapabilitas teknis (API Integration, Hardware Access, Audio & SFX, Charts, Mock Data, App AI Integration). Dilengkapi counter badge `activeTechIntegrationsCount` pada header.
5. 🎨 **Branding & Vault:** Mengatur 3 slot warna utama, `ColorEngine` (harmony engine), color mode (`dark/light/pastel/vibrant`), signature presets, randomizer, dan akses ke Vault Manager (CRUD).

### 4.2 Live Diagnostic Badges & Swatch Preview
- Header accordion tertutup tetap menampilkan ringkasan status real-time (jumlah opsi aktif).
- Accordion **Branding & Vault** menampilkan **3-dot color swatch preview** secara real-time di sebelah chevron header, memudahkan desainer memantau warna aktif tanpa membuka panel.

### 4.3 Reactive State Dependencies (Smart State)
- **AI ➔ API Auto-On:** Mengaktifkan *App AI Integration* otomatis menyalakan *API Integration*.
- **API ➔ AI Auto-Off:** Mematikan *API Integration* otomatis mematikan *App AI Integration*.
- **Hardware-AI Synergy:** Pilihan Hardware (Camera, Microphone) secara dinamis mengubah generator prompt AI untuk menyuntikkan fitur **Multimodal AI Vision** dan **Web Speech voice-to-text**.

### 4.4 Multi-Feature Synthesis Engine
- Menghasilkan hingga **5 mekanik**, **5 gaya visual**, **5 target audiens**, **5 batasan**, dan **5 label navigasi** sekaligus (dikontrol via slider).
- Setiap mekanik diambil secara acak dan dijamin unik dalam satu sesi roll.
- Prompt AI memerintahkan AI untuk **mensintesis** semua mekanik menjadi satu produk kohesif.
- **Lock Mechanic:** Tombol lock individual di setiap slot agar bisa mengacak hanya sebagian.

### 4.5 AI Prototype Compiler — `SynthesisEngine` (Prompt Generator)
Dua mode output utama:

| Mode | Format Output | Stack Target | Tujuan |
|---|---|---|---|
| **Standard** | `generatePrompt()` | Single-file HTML + CDN | Prototype cepat dalam satu file |
| **Master** | `generateMasterPrompt()` | Next.js / Vite + TypeScript | Produk full-stack production-ready |

Prompt yang dihasilkan mencakup:
- `<project-identity>`: nama app, kategori, konsep, mekanik, navigasi, tipografi, warna 60-30-10.
- `<generation-profile>`: complexity tier, platform, language, business model, typography, background style, onboarding.
- `<technical-spec>`: engine (Vue/Phaser/Babylon), CDN libs, persisten LocalStorage, A11y, tema mode.
- `<directives>`: Synergy Hook Strategy, Anti-Template UX, Category & Secondary directives, Domain Psychology, AI SDK directives.
- `<domain-focus>`: Category-specific directives (dipilih berdasarkan `complexity` profile) + Domain Psychology.

### 4.6 PromptComposer — Adaptive Profile System
Modul `promptComposer.js` mengatur *token budget* dan *verbosity* prompt secara otomatis berdasarkan `complexity`:

| Profile Key | Max Cat Directives | Domain Psychology | Response Sections | Token Hint |
|---|---|---|---|---|
| `simple` | 2 | ❌ | rationale, code | ~4k tokens |
| `medium` | 4 | ✅ | rationale, schema, code, testing | ~6k tokens |
| `advanced` | 6 | ✅ | rationale, schema, code, testing | ~8k tokens |

Modul ini juga menangani:
- **Anti-Generic Navigation:** Membuat label navigasi dari nama mekanik (bukan "Dashboard/Features/Settings").
- **Navigation Position:** Auto-detect posisi navigasi berdasarkan platform & kategori (Game → top, mobile/PWA → bottom, default → left).
- **Anti-Template Block:** Melarang AI membuat shell admin SaaS generik.
- **Layout Pattern:** Menyesuaikan pola layout per platform dan complexity.

### 4.7 AI Concept Planner (Mode "AI Planner")
Fitur interaktif yang menggunakan LLM (Gemini/Groq) untuk merancang konsep:
- **3 Metode Input:**
  - **Problem:** AI memecahkan masalah dunia nyata → 3 konsep solusi digital.
  - **Domain:** AI mengeksplorasi domain ilmu/subyek → 3 konsep berdasarkan domain tersebut.
  - **Evolve:** AI mengevolusi konsep dasar yang sudah ada menjadi 3 variasi lebih lateral.
- **Voice Input:** Integrasi Web Speech API (id-ID) untuk input suara.
- **3 Konsep Cards:** AI mengembalikan 3 konsep berbeda dengan appName, category, mechanics, styles, navigation, dan colors.
- **Concept Preview Panel:** Klik konsep → tampilkan detail lengkap (mekanik dengan synergy, deskripsi, dll).
- **Viability Checker (AI):** Tombol "Cek Kelayakan" → memanggil AI untuk menilai konsep (skor 1-10, verdict, market fit, technical complexity, tweak suggestion).
- **Partial Tweak (AI):** Form untuk meminta AI merevisi bagian tertentu dari konsep yang dipilih sebelum diteruskan ke Synthesis Engine.
- **Import Konsep:** Konsep yang dipilih dapat langsung diimport ke state Synthesis Engine.
- **AI History:** Riwayat 5 pencarian terakhir tersimpan di session.
- **2-Step Prompt Chain:** Opsional — Step 1 menghasilkan *Architecture Blueprint* (JSON planning, tanpa kode), Step 2 menghasilkan full prototype berbekal blueprint tersebut sebagai konteks.

### 4.8 Advanced Configuration Controls
State `data()` dari Vue app mencakup konfigurasi granular berikut (semua berdampak pada prompt yang dihasilkan):

| State | Opsi | Deskripsi |
|---|---|---|
| `appComplexity` | `simple \| medium \| advanced` | Depth fitur & token budget |
| `appPlatform` | `mobile \| desktop \| pwa` | Target platform & layout rules |
| `appLanguage` | `id \| en \| bilingual` | Bahasa seluruh UI app hasil generate |
| `appBusinessModel` | `free \| freemium \| subscription \| onetime` | Model monetisasi yang disuntikkan ke prompt |
| `appDesignStyle` | `very-minimalist \| minimalist \| modern \| playful \| corporate \| brutalist \| glassmorphism` | Gaya visual app |
| `appPrimaryFont` | String (nama Google Font) | Font utama tipografi |
| `appSecondaryFont` | String (nama Google Font) | Font sekunder tipografi |
| `appWritingStyle` | `sangat-singkat \| singkat \| informatif \| deskriptif \| persuasif \| humoris \| formal` | Gaya penulisan copywriting |
| `appColorMode` | `dark \| light \| pastel \| vibrant` | Mode warna untuk `ColorEngine` |
| `appTypographyWeight` | `thin \| balanced \| bold` | Bobot tipografi |
| `appTypographyColor` | `monochrome \| tinted \| colorful` | Warna teks |
| `appImageSource` | `none \| picsum \| unsplash \| dicebear \| svg-inline` | Sumber gambar dalam app |
| `appBackgroundStyle` | `solid \| soft-gradient \| mesh-gradient \| svg-pattern \| image-overlay` | Gaya background |
| `appOnboardingStyle` | `carousel \| bottom-sheet \| tooltip \| chatbot` | Pola UI onboarding |
| `appOnboardingSlides` | `1–5` | Jumlah langkah onboarding |

Semua setting ini dirangkum secara real-time di **`aiConfigSummary`** (computed property) — sebuah kalimat plain-language yang memberikan *feedback loop* visual kepada user tentang apa yang akan dihasilkan AI.

### 4.9 Color Engine — `colorEngine.js`
Modul dedicated untuk manajemen warna:
- **`hexToHsl()` / `hslToHex()`:** Konversi warna yang presisi.
- **`generateHarmony(baseHex, type, mode)`:** Menghasilkan 2 warna harmonis berdasarkan teori warna (Complementary, Analogous, Triadic, Split-Complementary, Monochromatic) dengan dukungan 4 mode rendering (`dark`, `light`, `pastel`, `vibrant`).
- **`getRandomHex(mode)`:** Menghasilkan warna acak yang terkalibrasi per mode (bukan sekadar random hex).

### 4.10 AI Engine — `aiEngine.js`
Unified API layer untuk Groq dan Gemini:
- **`callGroq()`:** Koneksi ke Groq API (OpenAI-compatible) dengan dukungan SSE streaming dan `jsonMode`.
- **`callGemini()`:** Koneksi ke Gemini API dengan konversi format message otomatis, SSE streaming, dan `jsonMode`.
- **`call()`:** Unified router yang memilih provider secara otomatis.
- **`validateKey()`:** Validasi API key dengan request minimal.
- **`AIStorage`:** Wrapper LocalStorage untuk menyimpan API keys, provider, model, dan project AI settings.
- **Domain System Prompts:** 9 domain persona (`general`, `science`, `engineering`, `business`, `law`, `creative`, `education`, `health`, `coding`) untuk AI Chat mode.
- **Provider Definitions:** Daftar model Groq (6 model) dan Gemini (8 model) dengan metadata badge & fast flag.

### 4.11 DiverDea AI SDK — `sdk/diverdea-ai-sdk.js`
SDK multimodal yang diinjeksikan ke dalam prototype hasil generate agar AI tidak menulis boilerplate API fetch:
- **`DiverDeaAI.init({ provider, apiKey, model })`:** Inisialisasi provider & key.
- **`DiverDeaAI.Chat.ask(prompt)`:** Teks-ke-teks generik.
- **`DiverDeaAI.Vision.analyze(canvasElement, prompt)`:** Computer Vision dari canvas (Gemini multimodal).
- **`DiverDeaAI.Audio.listenAndTranscribe(callback, lang)`:** Speech-to-Text via Web Speech API.
- **`DiverDeaAI.Audio.speak(text, lang)`:** Text-to-Speech via native Speech Synthesis.
- **`DiverDeaAI.Data.extract(text, schema)`:** Ekstraksi data tidak terstruktur ke JSON.
- **`DiverDeaAI.Data.analyzeSentiment(text)`:** Analisis sentimen & emosi.
- **`DiverDeaAI.Data.documentQA(docText, question)`:** Document Q&A (RAG sederhana).
- **`DiverDeaAI.predict(jsonData)`:** Predictive analytics dari JSON.

### 4.12 Concept Vault Engine (CRUD)
- Modal manajemen data 3-kolom untuk mengedit langsung daftar mekanik, produk, dan gaya UI.
- *Mode-aware*: tampilan dan target operasi CRUD otomatis berubah sesuai mode aktif.
- Data Injector: Tambahkan mekanik atau produk kustom ke pool.

### 4.13 Fitur Pendukung
- **Library (Saved Ideas):** Simpan, lihat, dan regenerate prompt dari ide-ide sebelumnya.
- **Debug & Trace System:** Toggle debug mode, performance benchmarking, dan trace log.
- **Prototype Palette:** Pilih warna tema (Hero, Neutral, Accent) dengan color harmony engine.
- **Dark Mode:** Didukung penuh via class `dark` (Tailwind).
- **Audio Engine:** `audioEngine.js` — Web Audio API oscillator untuk `playPop`, `playTick`, dan `playMicFeedback`.
- **3D Model Showcase:** Modul terpisah (`3d_category_showcase.html`) untuk visualisasi 3D performa tinggi.

---

## 5. Arsitektur Teknis

### 5.1 Stack Utama
- **Frontend:** Vue.js 3 (Options API), HTML5, Vanilla JS (ESM) dengan arsitektur direktori modul.
- **Styling:** Tailwind CSS (CDN) dengan konfigurasi tema kustom (Matcha, Cream, Oatmeal).
- **Motion:** GSAP untuk animasi orbs background dan transisi elemen dinamis.
- **Audio:** Tone.js / Web Audio API untuk micro-interaction audio feedback.
- **Utilities:** Lodash (`_.sample`, `_.sampleSize`).
- **Icons:** Font Awesome 6.
- **Persistence:** LocalStorage untuk `savedIdeas`, API keys, dan konfigurasi AI.

### 5.2 Struktur Modul (`src/`)

```
src/
├── core/
│   ├── aiEngine.js       — Unified AI API layer (Groq + Gemini, streaming, providers)
│   ├── audioEngine.js    — Web Audio API oscillator feedback
│   ├── colorEngine.js    — HEX↔HSL conversion + harmony generator (4 modes)
│   ├── promptComposer.js — Adaptive prompt assembly (complexity profiles, nav logic)
│   └── synthesisEngine.js— Core prompt builder (generatePrompt, generateMasterPrompt, generatePlanningPrompt)
├── data/
│   ├── config.js         — categories (33), libStacks, categoryPalettes, colorHarmonies, categoryFocusMap
│   ├── mechanics.js      — generalMechanics, conceptsList1, conceptsListLateral
│   ├── products.js       — generalProducts, conceptsList2
│   └── extras.js         — conceptsList3, targetAudiences, constraints, externalAPIs, deviceCapabilities
└── main.js               — Vue 3 app entry point (state, computed, methods)

sdk/
└── diverdea-ai-sdk.js    — Client-side AI SDK (Chat, Vision, Audio, Data modules)
```

---

## 6. Struktur Data (`src/data/`)

| Export | Tipe | Deskripsi |
|---|---|---|
| `categories` | `Array` | **33 kategori** domain, mencakup startup digital dan pasar lokal Indonesia |
| `libStacks` | `Object` | Library stack CDN per kategori untuk prompt |
| `categoryPalettes` | `Object` | Preset warna per kategori (hero, neutral, accent, label) |
| `colorHarmonies` | `Array` | 5 jenis harmoni warna dengan icon & deskripsi |
| `categoryFocusMap` | `Object` | Domain psychology directives per kategori untuk prompt AI |
| `generalMechanics` | `Object (per-category)` | Mekanik fundamental per kategori (Mode General) |
| `generalProducts` | `Object (per-category)` | Wadah produk umum per kategori (Mode General) |
| `conceptsList1` | `Object (per-category)` | Mekanik standar per kategori (Mode Standard) |
| `conceptsListLateral` | `Object (per-category)` | Mekanik ekstrem/psikologis per kategori (Mode Lateral) |
| `conceptsList2` | `Object (per-category)` | Wadah produk per kategori |
| `conceptsList3` | `Array (flat)` | Gaya visual/UI |
| `targetAudiences` | `Array (flat)` | Persona pengguna |
| `constraints` | `Array (flat)` | Batasan kreatif/teknis |
| `externalAPIs` | `Array (flat)` | Opsi integrasi API eksternal |
| `deviceCapabilities` | `Array (flat)` | Opsi akses hardware perangkat |

---

## 7. Target Pengguna
- **Siswa/Mahasiswa:** Mencari ide proyek akhir atau portofolio yang berbeda.
- **Hackathon Participants:** Membutuhkan ide cepat, unik, dan kompleks dalam waktu singkat.
- **Solo Developers:** Mencari inspirasi untuk side project yang berbobot.
- **AI-Assisted Builders:** Developer yang menggunakan AI code generator (Claude, Gemini, ChatGPT) dan membutuhkan prompt berkualitas tinggi.

---

## 8. Roadmap Pengembangan

- [x] **Phase 1 (MVP):** Pengacak dasar, penyimpanan lokal, dan generator prompt. *(Selesai)*
- [x] **Phase 2:** Penambahan lebih banyak kategori (12 total) dan mekanik. *(Selesai)*
- [x] **Phase 3:** Tri-State Synthesis Engine (General / Standard / Lateral). *(Selesai)*
- [x] **Phase 4:** Multi-Feature Synthesis (×2–×5 Mechanics) + Optional Variables (Audience, Constraint, Navigation). *(Selesai)*
- [x] **Phase 4.1:** Deep Game Design Psychology Directives (Fun Loop, Juice, Addiction Engine, Flow State). *(Selesai)*
- [x] **Phase 4.2:** Kategori **Music** dengan Sonic Neon palette, Audio Engine directives, dan Tone.js libStack. *(Selesai)*
- [x] **Phase 5:** Ekspansi ke **33 Kategori** + Integrasi API AI (Gemini/Groq) + **AI Concept Planner**. *(Selesai)*
- [x] **Phase 5.1:** Pembagian Capabilities → **UX Essentials** & **Tech Integrations** + Smart State Dependencies. *(Selesai)*
- [x] **Phase 5.2:** **DiverDea AI SDK** (`sdk/diverdea-ai-sdk.js`) — Multimodal SDK (Chat, Vision, Audio, Data) untuk prototype hasil generate agar bebas boilerplate API. *(Selesai)*
- [x] **Phase 5.3:** **PromptComposer** — Adaptive prompt assembly dengan 3 complexity profiles, anti-generic navigation, anti-template directives, dan layout pattern logic. *(Selesai)*
- [x] **Phase 5.4:** **ColorEngine** — Dedicated color module dengan harmony types (5) × color modes (4) + mode-aware random hex. *(Selesai)*
- [x] **Phase 5.5:** **Advanced Config Controls** — 12 granular state controls (design style, typography, writing style, background, onboarding, image source, etc.) + real-time `aiConfigSummary` feedback loop. *(Selesai)*
- [x] **Phase 5.6:** **AI Concept Planner Enhancements** — 3 input methods (Problem/Domain/Evolve), voice input, Viability Checker, Partial Tweak, 2-Step Prompt Chain, AI History. *(Selesai)*
- [x] **Phase 5.7:** **Master Prompt Mode** — `generateMasterPrompt()` untuk output proyek multi-file Next.js/Vite dengan 4-phase interactive generation protocol. *(Selesai)*
- [ ] **Phase 6:** Modul "3D Category Showcase" dengan WebGL Hyper-Fidelity. *(Sedang Dikerjakan)*
- [ ] **Phase 7:** Fitur "Community Ideas" untuk berbagi sintesis ide secara publik. *(Rencana)*
- [ ] **Phase 8:** Pitch Deck Generator — Output format presentasi startup profesional (PDF/slide) dari konsep yang dipilih. *(Rencana)*

---

*DiverDea — Berhenti meniru, mulai mensintesis.*
