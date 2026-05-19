# 🔮 DiverDea (Synthesis Engine v2)

> **"Berhenti meniru, mulai mensintesis."** (Stop copying, start synthesizing.)

**DiverDea** adalah sebuah aplikasi web interaktif tingkat lanjut yang dirancang khusus untuk memecahkan *creative block* pada developer, designer, dan peserta hackathon. Alih-alih membuat proyek standar yang membosankan (seperti To-Do List atau aplikasi cuaca biasa), DiverDea menggunakan **mesin sintesis multi-mode** untuk menggabungkan berbagai mekanik fitur unik, wadah produk, gaya visual, audiens target, dan batasan kreatif ke dalam satu konsep proyek yang kaya dan kompleks.

Aplikasi ini juga dilengkapi dengan **AI Concept Planner** terintegrasi yang memanfaatkan LLM (Gemini / Groq) untuk merancang prototipe aplikasi secara mendalam, lengkap dengan kode arsitektur bersih, sistem desain, dan petunjuk kegunaan (UX).

---

## ✨ Fitur Utama (Core Features)

### 1. 🔮 Tri-State Synthesis Engine (5 Mode Utama)
*   **General Mode:** Mensintesis fitur fundamental dan produk umum sesuai domain kategori terpilih.
*   **Standard Mode:** Menggabungkan mekanik wajar dengan produk dari kategori yang sama.
*   **Lateral Mode:** Menggabungkan mekanik psikologis ekstrem *lintas kategori* secara acak untuk menghasilkan inovasi radikal.
*   **Manual Mode:** Memungkinkan Anda memasukkan ide mekanik, produk, dan variabel secara manual.
*   **AI Mode:** Merancang konsep startup secara otomatis menggunakan kecerdasan buatan terintegrasi.

### 2. 🎛️ Collapsible Glassmorphic Sidebar
Kontrol dashboard yang elegan dikelompokkan ke dalam **5 panel akordeon kaca (glassmorphic)** yang responsif:
1.  **🔮 Engine Mode:** Pilihan mode sintesis, kategori utama, dan format target keluaran.
2.  **🧱 Composition:** Pengaturan intensitas mekanik (0x - 5x), gaya visual, audiens, dan batasan kreatif.
3.  **🚀 UX Essentials:** Fitur penunjang UI/UX (*UI Style, Target Audience, Constraints, SPA Navigation, SVG Logo, Micro-Animations*).
4.  **💻 Tech Integrations:** Integrasi teknologi (*API Integration, Hardware Access, Audio & SFX, Charts, Mock Data, App AI Integration*).
5.  **🎨 Branding & Vault:** Palet warna kustom, signature presets, randomizer (dadu), tema (dark/light), dan Vault Manager.

### 3. 🚦 Reactive State Dependencies (Smart State)
*   **AI ➔ API Auto-On:** Mengaktifkan integrasi AI otomatis menyalakan API Integration.
*   **API ➔ AI Auto-Off:** Mematikan API otomatis menonaktifkan fitur AI karena ketergantungan koneksi.
*   **Hardware-AI Synergy:** Akses hardware seperti *Camera* atau *Microphone* akan secara dinamis menyuntikkan instruksi khusus **Multimodal AI Vision** dan **Voice-to-Text** ke dalam prompt AI.

### 4. 🗄️ Concept Vault Engine (CRUD)
*   Sistem manajemen data lokal 3-kolom yang sadar mode (*mode-aware*) untuk menambah, mengubah, dan menghapus mekanik, produk, serta gaya visual langsung dari antarmuka aplikasi.
*   Fitur *individual lock slot* pada mekanik yang dihasilkan untuk mengunci ide bagus selagi mengacak bagian lain.

### 5. 🤖 AI Concept Planner & Compiler
*   Membuat prompt perintah bertingkat tinggi (*Hyper-Expert Prompts*) untuk AI (ChatGPT/Gemini/Claude) yang menginstruksikan pembuatan prototipe lengkap dengan strategi arsitektur, UI responsif, micro-animations, dan skema interaksi audio.

---

## 🛠️ Arsitektur & Teknologi

*   **Core Logic:** Vue.js 3 (Options API, ESM) dengan arsitektur data modular.
*   **Styling & UI:** Vanilla CSS + Tailwind CSS (CDN) dengan kustomisasi palet warna (*Matcha, Cream, Sonic Neon, Oatmeal*).
*   **Animations:** GSAP (GreenSock Animation Platform) untuk efek orbs latar belakang yang halus dan transisi interaktif.
*   **Audio Interaction:** Tone.js untuk efek suara interaksi tombol (*micro-interaction tick*).
*   **Iconography:** Font Awesome 6.
*   **Database:** LocalStorage untuk persistensi `savedIdeas` dan konfigurasi API Key.

---

## 📂 Struktur Direktori

```bash
DiverDea-v2/
├── index.html                  # Halaman Utama aplikasi
├── prompt-app.html             # Antarmuka AI Concept Planner
├── 3d_category_showcase.html   # Eksperimen showcase visualisasi 3D
├── css/                        # Berisi file styling kustom
├── docs/                       # Dokumentasi konsep dan analisis
│   ├── concept-app.md
│   ├── ai_readme_instruction.md
│   └── ai_bottleneck_analysis.md
├── src/
│   ├── core/                   # Logika inti aplikasi (AI engine, synthesis)
│   │   ├── aiEngine.js
│   │   └── synthesisEngine.js
│   └── data/                   # Modul data kategori, mekanik, & produk
│       ├── products.js
│       ├── extras.js
│       └── ...
└── .gitignore                  # Konfigurasi file yang diabaikan Git
```

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini dirancang sebagai aplikasi web berbasis modul ESM yang ringan tanpa perlu proses kompilasi yang rumit:

1.  **Clone Repository:**
    ```bash
    git clone https://github.com/USERNAME/DiverDea-v2.git
    cd DiverDea-v2
    ```
2.  **Jalankan Local Server:**
    Karena menggunakan modul JavaScript lokal (ESM), Anda memerlukan local web server untuk membukanya agar terhindar dari error CORS.
    *   Jika menggunakan **VS Code**, pasang ekstensi **Live Server**, klik kanan pada `index.html` dan pilih **Open with Live Server**.
    *   Atau jalankan server sederhana dengan Python:
        ```bash
        python -m http.server 8000
        ```
        Lalu buka `http://localhost:8000` di peramban web Anda.

---

## 🗺️ Roadmap Pengembangan

*   [x] **Phase 1-4:** Sistem acak dasar, Synthesis Engine, Multi-Feature, & Custom Variables.
*   [x] **Phase 5:** Integrasi AI Concept Planner & 28 Kategori pasar lokal Indonesia.
*   [ ] **Phase 6:** Modul "3D Category Showcase" WebGL performa tinggi. *(Sedang Dikerjakan)*
*   [ ] **Phase 7:** Fitur "Community Sharing Platform" untuk berbagi konsep sintesis secara online.

---

*DiverDea — Berhenti meniru, mulai mensintesis.* 🔮
