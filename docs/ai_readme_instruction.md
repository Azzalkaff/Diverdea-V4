# AI Instruction Guide — Projek DiverDea

Dokumen ini berisi panduan dan instruksi teknis bagi AI Assistant untuk mengelola, mengembangkan, dan memelihara codebase **DiverDea (Synthesis Engine)**.

---

## 1. Visi & Konsep Proyek
**DiverDea** adalah *Multi-Feature Synthesis Engine* untuk developer yang menghasilkan konsep proyek kompleks dengan menggabungkan **hingga 5 mekanik fitur** ke dalam satu wadah produk, dilengkapi variabel opsional hingga 5 instans (Target Audience, Constraint, UI Style) dan generator prompt AI level *Hyper-Expert*, lengkap dengan **AI Concept Planner** bawaan.

- **Tujuan Utama:** Menghasilkan prompt AI yang sangat detail untuk membangun prototype fungsional dalam satu file HTML, dengan beberapa fitur yang terintegrasi secara kohesif.
- **Filosofi Desain:** *"Serene, Precise, and Organic"*. Palet warna Matcha & Cream, animasi halus, *low cognitive load*.

---

## 2. Stack Teknologi Utama
Setiap modifikasi **harus** mengikuti stack yang sudah ada:
- **Core:** HTML5, Vanilla JavaScript (ESM Modules).
- **Framework:** [Vue.js 3](https://vuejs.org/) (Global Build, Options API via `data/methods`).
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (via CDN, konfigurasi kustom di `script.js`).
- **Animations:** [GSAP](https://greensock.com/gsap/) (animasi UI dinamis & background orbs).
- **Audio:** [Tone.js](https://tonejs.github.io/) (feedback audio — `playPop`, `playHoverTick`).
- **Utilities:** [Lodash](https://lodash.com/) (`_.sample`, `_.sampleSize` untuk sampling data).
- **Icons:** [Font Awesome 6](https://fontawesome.com/).

---

## 3. Sistem Desain (Branding DiverDea)
**Jangan mengubah variabel warna inti tanpa instruksi eksplisit.**

- **Tailwind Custom Colors:**
  - `matcha`: `#9cb48c` — Brand Primary
  - `matcha-dark`: `#1a1c18` — Text & Dark Background
  - `matcha-surface`: `#232620` — Dark Mode Surface
  - `cream`: `#fdfcf9` — Light Background
  - `cream-dark`: `#f4f2e6` — Light Surface
  - `cream-dim`: `#b5bcad` — Muted Text
  - `oatmeal`: `#d5d0c4` — Borders & Dividers
- **Typography:** `Inter`, sans-serif (Google Fonts).
- **Aesthetics:** High whitespace, subtle shadows, `rounded-lg` hingga `rounded-3xl`, glassmorphism pada modal overlay dan collapsible panels.
- **Accent Colors untuk Variabel Opsional & UI State:**
  - Target Audience → `amber-400`
  - Constraint / Twist → `violet-400`
  - Lateral Mode → `red-400`

---

## 4. Struktur File Proyek

```
/Projek DiverDea
├── index.html        — Halaman landing utama dan portal navigasi
├── prompt-app.html   — Halaman utama aplikasi generator ide (Vue template)
├── src/
│   ├── main.js       — Instansiasi Vue app utama
│   ├── core/         — Modul core logic (aiEngine.js, synthesisEngine.js, colorEngine.js, audioEngine.js)
│   └── data/         — Database pool (config.js, mechanics.js, products.js, extras.js)
├── css/style.css     — CSS kustom tambahan
└── docs/             — Dokumen konsep dan AI guide
```

---

## 5. Struktur Data (`src/data/*.js`)

### Export yang tersedia (dibagi dalam beberapa file modul):
| Export | Tipe | Mode | Deskripsi |
|---|---|---|---|
| `categories` | `Array` | — | 28 kategori domain lokal dan internasional |
| `libStacks` | `Object` | — | Library stack per kategori untuk dimasukkan ke prompt |
| `generalMechanics` | `Array (flat)` | General | 37 mekanik fundamental web |
| `generalProducts` | `Array (flat)` | General | 32 wadah produk umum |
| `conceptsList1` | `Object (per-cat)` | Standard | 14 mekanik standar per kategori |
| `conceptsListLateral` | `Object (per-cat)` | Lateral | 14 mekanik ekstrem/psikologis per kategori |
| `conceptsList2` | `Object (per-cat)` | Standard/Lateral | 13 wadah produk per kategori |
| `conceptsList3` | `Array (flat)` | Opsional | 25 gaya visual/UI |
| `targetAudiences` | `Array (flat)` | Opsional | 20 persona pengguna spesifik |
| `constraints` | `Array (flat)` | Opsional | 20 batasan kreatif / design twists |
| `categoryFocusMap` | `Object` | — | Instruksi teknis per kategori (bahasa Inggris) untuk prompt AI |

> **⚠️ Note — Kategori `Game`:** Entry `'Game'` menggunakan **template literal multi-line** (bukan single-line string) karena berisi 5 modul direktif game design psychology yang sangat detail:
> 1. **Core Fun Loop** — Definisi loop 30 detik sebelum menulis kode.
> 2. **Game Feel & Juice** — 6 elemen wajib: screen shake, squash & stretch, particles, sound, camera lerp, hit flash.
> 3. **Psychological Reward Architecture** — 7 hooks (Skinner Box, Loss Aversion, Near-Miss, dll.).
> 4. **Difficulty & Flow State** — Kurva Csikszentmihalyi + Rubber Band mechanic.
> 5. **Feedback Clarity & Technical Engine** — HUD rules, color coding, frame-independent loop, object pooling.
>
> **JANGAN** ubah format `'Game'` menjadi single-line string.

---

## 6. State Utama (`src/main.js`)

### Collapsible Accordion State:
- `sidebarOpenSections`: Object berisi boolean key untuk mengendalikan expand/collapse bagian sidebar:
  - `engine`: Engine Mode panel
  - `composition`: Composition panel
  - `uxEssentials`: UX Essentials panel
  - `techIntegrations`: Tech Integrations panel
  - `branding`: Branding & Vault panel

### Synthesis Engine State:
| State | Tipe | Deskripsi |
|---|---|---|
| `synthesisMode` | `'general' \| 'standard' \| 'lateral' \| 'manual' \| 'ai'` | Mode sintesis aktif |
| `selectedCategory` | `String` | Kategori aktif |
| `productSlot` | `Object` | Wadah produk dengan `value` dan state `locked` |
| `mechanicSlots` | `Array` | Slot mekanik |
| `styleSlots` | `Array` | Gaya UI (opsional) |
| `audienceSlots` | `Array` | Target audience (opsional) |
| `constraintSlots` | `Array` | Batasan kreatif (opsional) |

### Split Capabilities Toggles (UX Essentials & Tech Integrations):
- **UX Essentials toggles:**
  - `useThirdConcept`: Gaya Visual (UI Style)
  - `useAudience`: Target Audience
  - `useConstraint`: Creative Constraints
  - `useNavigation`: SPA Navigation Menu
- **Tech Integrations toggles:**
  - `useAPI`: External API Integration
  - `useHardware`: Hardware/Device Capability Access
  - `createLogo`: Generate SVG Logo
  - `createAudio`: Web Audio / Tone.js SFX
  - `useAnimations`: CSS/GSAP Animation Kit
  - `useCharts`: ChartJS Integration
  - `projectUseAI`: App AI Integration (Gemini/Groq call di generated prototype)

### Computed State:
- `activeUxEssentialsCount`: Menghitung jumlah opsi UX Essentials yang aktif.
- `activeTechIntegrationsCount`: Menghitung jumlah opsi Tech Integrations yang aktif.

---

## 7. Method Utama (`src/main.js`)

### `toggleState(key)`
Mengendalikan toggle status pilihan. Metode ini mengintegrasikan **Smart State Validation Layer**:
```javascript
        toggleState(key) { 
            this[key] = !this[key]; 
            this.playPop(); 
            
            // Logic dependency between API integration and AI features
            if (key === 'projectUseAI' && this.projectUseAI) {
                this.useAPI = true; // Auto-enable API integration if AI is toggled ON
            }
            if (key === 'useAPI' && !this.useAPI) {
                this.projectUseAI = false; // Auto-disable AI if API integration is toggled OFF
            }
            
            if (key === 'projectUseAI' || key === 'useAPI' || key === 'useHardware') {
                this.saveSettings();
            }
        },
```

### `generateAiPrompt(idea?)`
Menghasilkan prompt Markdown bertingkat. Menyinergikan pilihan **useHardware** dan **projectUseAI**:
- Jika `hasCamera` dan `useAI` keduanya aktif, menyuntikkan perintah **MULTIMODAL AI VISION SYNERGY** (HTML5 Canvas frame grab ➔ Base64 ➔ Gemini API).
- Jika `hasMic` dan `useAI` keduanya aktif, menyuntikkan perintah **VOICE COMMAND & AUDIO ACTIONS SYNERGY** (Web Speech API ➔ id-ID transcription ➔ AI agent command processor).

---

## 8. Aturan Pengembangan & UI/UX Sidebar

### Do's ✅
- **Pertahankan Struktur Accordion**: Saat menambahkan fitur baru, letakkan di bawah salah satu dari 5 kategori accordion di sidebar.
- **Visual Diagnostic Badges**: Tambahkan indikator visual (seperti counter, bullet warna, atau teks ringkasan) pada tag header accordion ketika tertutup agar user tetap mendapat informasi.
- **Sinergikan AI dengan Hardware/API**: Pastikan penambahan kapabilitas hardware atau API baru yang relevan dengan AI juga didukung di blok prompt generation `synthesisEngine.js`.
- **GSAP & Audio Feedbacks**: Beri feedback `playPop()` di setiap toggle dan transisi smooth GSAP pada expansion panel.

### Don'ts ❌
- Jangan melanggar smart state dependency: AI prototype tidak boleh aktif tanpa koneksi API (`useAPI = true`).
- Jangan biarkan sidebar melebiaran vertikal (bloated) tanpa accordion fold.
- Jangan menghapus visual palette swatch dot pada header Branding & Vault saat closed.

---
*Last updated: Mei 2026 — v4.1 (Collapsible Sidebar Layout & Smart Validation)*
