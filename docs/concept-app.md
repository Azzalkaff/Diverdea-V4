# Concept Document: DiverDea (Synthesis Engine)

## 1. Executive Summary
**DiverDea** adalah aplikasi web yang dirancang untuk membantu pengembang dan desainer keluar dari kebuntuan kreatif (*creative block*). Menggunakan mesin sintesis tiga-mode, aplikasi ini menggabungkan beberapa mekanik fitur, wadah produk, dan variabel opsional untuk menghasilkan konsep proyek yang unik, kompleks, dan siap untuk eksekusi AI.

## 2. Masalah & Solusi
- **Masalah:** Banyak pengembang terjebak pada ide proyek yang sederhana dan "satu fitur saja" (misal: To-Do List standar, Weather App biasa), sehingga menghasilkan prototype yang kurang berbobot.
- **Solusi:** DiverDea memaksa mesin untuk mensintesis **2 hingga 3 mekanik fitur sekaligus** ke dalam satu wadah produk, menciptakan konsep yang jauh lebih kaya dan kompleks. Mode operasi bisa dipilih sesuai tingkat kreativitas yang diinginkan.

## 3. Synthesis Mode (Mode Utama)
Aplikasi memiliki **5 mode sintesis** yang dapat dipilih via sidebar:

| Mode | Deskripsi | Data Source |
|---|---|---|
| **General** | Fitur fundamental & produk umum, disesuaikan per kategori | `generalMechanics[category]`, `generalProducts[category]` |
| **Standard** | Mekanik wajar + wadah produk dari kategori yang sama | `conceptsList1[category]`, `conceptsList2[category]` |
| **Lateral** | Mekanik ekstrem/psikologis *lintas kategori* secara acak | `conceptsListLateral[random]`, `conceptsList2[category]` |
| **Manual** | Mengisi mekanik, produk, dan variabel secara manual | User Input |
| **AI** | Menggunakan AI Concept Planner untuk merencanakan ide | Gemini / Groq LLM |

## 4. Fitur Utama (Core Features)

### 4.1 Collapsible Glassmorphic Sidebar (Layout Baru)
Untuk mengatasi kepadatan visual, kontrol sidebar kiri diorganisasikan ke dalam **5 panel accordion kaca (glassmorphism)** yang dapat diciutkan secara independen:
1. 🔮 **Engine Mode:** Mengatur Synthesis Mode (General, Standard, Lateral, Manual, AI), Primary Category, dan Target Output (Single HTML / Modern Stack).
2. 🧱 **Composition:** Mengatur jumlah mekanik, visual style, target audience, constraint, dan tab views (0x - 5x) via slider ringkas.
3. 🚀 **UX Essentials:** Kapabilitas antarmuka pengguna seperti *UI Style, Target Audience, Constraints, SPA Navigation, SVG Logo, dan Micro-Animations*. Dilengkapi counter badge `activeUxEssentialsCount` pada header.
4. 💻 **Tech Integrations:** Kapabilitas teknis seperti *API Integration, Hardware Access, Audio & SFX, Charts, Mock Data, dan App AI Integration*. Dilengkapi counter badge `activeTechIntegrationsCount` pada header.
5. 🎨 **Branding & Vault:** Mengatur 3 slot warna utama, signature presets, randomizer (dice), theme mode (dark/light/both), dan akses ke Vault Manager.

### 4.2 Live Diagnostic Badges & Swatch Preview
- Saat accordion ditutup, header accordion tetap menampilkan ringkasan status real-time (misal: jumlah opsi aktif).
- Accordion **Branding & Vault** menampilkan **visualisasi 3 dot warna palette** secara real-time langsung di sebelah chevron header tertutupnya, memudahkan desainer memantau warna aktif tanpa membuka panel.

### 4.3 Reactive State Dependencies (Smart State)
Sistem menghentikan konflik pilihan antarmuka secara pintar:
- **AI ➔ API Auto-On:** Mengaktifkan **App AI Integration** otomatis menyalakan **API Integration** karena AI memerlukan panggilan HTTP eksternal.
- **API ➔ AI Auto-Off:** Mematikan **API Integration** otomatis mematikan **App AI Integration** karena LLM tidak dapat dikontak offline.
- **Hardware-AI Synergy:** Pilihan pada **Hardware Access** (seperti *Camera* dan *Microphone*) secara dinamis mengubah generator prompt AI untuk menyuntikkan fitur **Multimodal AI Vision** dan **Web Speech voice-to-text** asli.

### 4.4 Multi-Feature Synthesis Engine
- Menghasilkan **hingga 5 mekanik unik**, **5 gaya visual**, **5 target audiens**, dan **5 batasan** sekaligus (dikontrol via slider **0x - 5x**).
- Setiap mekanik diambil secara acak dan dijamin unik (tidak duplikat) dalam satu sesi roll.
- Prompt AI yang dihasilkan memerintahkan AI untuk **mensintesis** semua mekanik menjadi satu produk yang kohesif, bukan hanya menggabungkan.

### 4.5 AI Prototype Compiler (Prompt Generator)
- Menghasilkan prompt bertingkat level **Hyper-Expert** yang mencakup:
  - Multi-feature synthesis strategy
  - Clean Architecture & reactive state management
  - UX Clarity & Low Cognitive Load (dengan mandatory "How It Works" section)
  - Design system (8pt grid, palette, micro-animations)
  - Category-specific technical focus (`categoryFocusMap`)
  - Optional: audience adaptation & creative constraint directives

### 4.6 Concept Vault Engine (CRUD)
- Modal manajemen data 3-kolom untuk mengedit langsung daftar mekanik, produk, dan gaya UI.
- Sadar mode (*Mode-aware*): tampilan dan target operasi CRUD otomatis berubah sesuai mode aktif (General / Standard / Lateral).
- Tombol *lock* individual di setiap slot mekanik agar bisa mengacak hanya sebagian.

### 4.7 Fitur Pendukung
- **Data Injector:** Tambahkan mekanik atau produk kustom langsung ke pool data.
- **Library (Saved Ideas):** Simpan, lihat, dan regenerate prompt dari ide-ide sebelumnya.
- **Prototype Palette:** Pilih warna tema (Hero, Neutral, Accent) yang disuntikkan ke dalam prompt AI.
- **Zen/Focus Mode:** Mematikan animasi background orb untuk fokus penuh.
- **Dark Mode:** Didukung penuh via class `dark`.
- **3D Model Showcase:** Modul terpisah untuk mengeksplorasi visualisasi 3D performa tinggi.

### 4.8 AI Concept Planner
- Fitur interaktif yang menggunakan LLM (Gemini/Groq) untuk memikirkan ide berdasarkan masalah, domain, atau evolusi konsep.
- Fitur riwayat pencarian ide dan *revisi parsial* konsep sebelum diteruskan ke *Synthesis Engine*.
- Membantu konfigurasi AI langsung ke aplikasi hasil generate (`projectUseAI`).

## 5. Arsitektur Teknis
- **Frontend:** Vue.js 3 (Options API via `data/methods`), HTML5, Vanilla JS (ESM) dengan arsitektur direktori modul (`src/core/`, `src/data/`).
- **Styling:** Tailwind CSS (CDN) dengan konfigurasi tema kustom (Matcha, Cream, Oatmeal).
- **Motion:** GSAP untuk animasi orbs background dan transisi elemen dinamis.
- **Audio:** Tone.js untuk micro-interaction audio feedback (`playPop`, `playHoverTick`).
- **Utilities:** Lodash (`_.sample`, `_.sampleSize`).
- **Icons:** Font Awesome 6.
- **Persistence:** LocalStorage untuk `savedIdeas` dan konfigurasi API key AI.

## 6. Struktur Data (`src/data/`)

Data dibagi ke beberapa file modul untuk organisasi yang lebih baik (`config.js`, `mechanics.js`, `products.js`, `extras.js`):

| Export | Tipe | Deskripsi |
|---|---|---|
| `categories` | `Array` | Daftar **28 kategori** domain berfokus pada pasar lokal Indonesia dan startup digital |
| `libStacks` | `Object` | Library stack per kategori untuk prompt |
| `generalMechanics` | `Object (per-category)` | 14 mekanik fundamental per kategori (Mode General) |
| `generalProducts` | `Object (per-category)` | 13 wadah produk umum per kategori (Mode General) |
| `conceptsList1` | `Object (per-category)` | 14 mekanik standar per kategori (Mode Standard) |
| `conceptsListLateral` | `Object (per-category)` | 14 mekanik ekstrem/psikologis per kategori (Mode Lateral) |
| `conceptsList2` | `Object (per-category)` | 13 wadah produk per kategori |
| `conceptsList3` | `Array (flat)` | 25 gaya visual/UI |
| `targetAudiences` | `Array (flat)` | 20 persona pengguna (Opsional) |
| `constraints` | `Array (flat)` | 20 batasan kreatif (Opsional) |
| `categoryFocusMap` | `Object` | Instruksi teknis spesifik per kategori untuk prompt AI |

## 7. Target Pengguna
- **Siswa/Mahasiswa:** Mencari ide proyek akhir atau portofolio yang berbeda.
- **Hackathon Participants:** Membutuhkan ide cepat, unik, dan kompleks dalam waktu singkat.
- **Solo Developers:** Mencari inspirasi untuk proyek sampingan (*side project*) yang berbobot.

## 8. Roadmap Pengembangan
- [x] **Phase 1 (MVP):** Pengacak dasar, penyimpanan lokal, dan generator prompt. *(Selesai)*
- [x] **Phase 2:** Penambahan lebih banyak kategori (12 total) dan mekanik. *(Selesai)*
- [x] **Phase 3:** Tri-State Synthesis Engine (General / Standard / Lateral). *(Selesai)*
- [x] **Phase 4:** Multi-Feature Synthesis (×2 / ×3 Mechanics) + Optional Variables (Audience, Constraint). *(Selesai)*
- [x] **Phase 4.1:** Deep Game Design Psychology Directives untuk kategori Game (Fun Loop, Juice, Addiction Engine, Flow State, Rubber Band). *(Selesai)*
- [x] **Phase 4.2:** Penambahan kategori **Music** (ke-13) dengan 14 Standard Mechanics, 14 Lateral Mechanics, 13 Product Containers, dedicated `libStacks`, `categoryPalettes` (Sonic Neon), dan `categoryFocusMap` (Audio Engine directives). *(Selesai)*
- [x] **Phase 5:** Ekspansi skala besar menjadi **28 Kategori** terfokus pasar lokal (Agri, UMKM, Warga, Religi, dll) dan Integrasi API (Gemini/Groq) dengan fitur **AI Concept Planner**. *(Selesai)*
- [x] **Phase 5.1:** Pembagian Capabilities menjadi **UX Essentials** dan **Tech Integrations** untuk tata letak sidebar yang elegan, lengkap dengan inisialisasi state reaktif pintar. *(Selesai)*
- [ ] **Phase 6:** Modul "3D Category Showcase" dengan WebGL tinggi/Hyper-Fidelity. *(Sedang Dikerjakan)*
- [ ] **Phase 7:** Fitur "Community Ideas" untuk berbagi sintesis ide secara publik. *(Rencana)*

---
*DiverDea — Berhenti meniru, mulai mensintesis.*
