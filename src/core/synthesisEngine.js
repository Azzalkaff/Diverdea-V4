/**
 * Synthesis Engine for DiverDea
 * Core logic for idea generation and AI prompt building.
 */

import { PromptComposer } from './promptComposer.js';

export const SynthesisEngine = {
    generatePrompt(source, libStacks, categoryFocusMap, colors) {
        const categoryConfigs = {
            'Productivity': {
                role: 'Principal Workflow & Systems Architect',
                directives: [
                    'SYSTEM ARCHITECTURE: Implement a centralized state management for task lifecycles (CRUD + Undo/Redo). Use a Command Pattern for all primary actions.',
                    'KEYBOARD-FIRST UX: Mandatory global hotkeys (Ctrl+K for Palette, Esc to blur, Arrow keys for navigation). Implement focus-trap for modals.',
                    'DENSITY & CLARITY: Design a high-density Bento Grid or Eisenhower Matrix. Use clear priority visual cues and subtle micro-labels.',
                    'PERFORMANCE: Use Virtual Scrolling for large lists. Implement optimistic updates for status toggles to ensure zero-latency feel.',
                    'GAMIFICATION: Add a "Productivity Pulse" or streak counter that rewards consecutive task completions with GSAP animations.',
                    'DATA OPERATIONS: Support batch editing, drag-and-drop reordering (SortableJS), and advanced search/filter with Regex support.'
                ]
            },
            'Game 2D': {
                role: 'Principal Game Architect & Creative Technologist',
                directives: [
                    'PHASER ARCHITECTURE: Pisahkan logika ke 3 Class Scene (BootScene, PlayScene, GameOverScene). Gunakan Phaser.Physics.Arcade dan Phaser.Scale.FIT dengan autoCenter: Phaser.Scale.CENTER_BOTH.',
                    'ASSETS MATRIX: WAJIB gunakan metode JS Matrix (2D Array) untuk menciptakan pixel art prosedural berkualitas tinggi dan tajam. Definisikan semua sprite (karakter, musuh, item) sebagai matriks angka dengan "Color Palette Dictionary" warna hex. Di BootScene, gambar matriks pixel art menggunakan Phaser.Graphics (fillRect looping), lalu ubah menjadi tekstur menggunakan `graphics.generateTexture()` untuk digunakan sebagai sprite dinamis di PlayScene agar stabil 60 FPS.',
                    'INPUT & COLLISION: Wajib gunakan `createCursorKeys()` atau `this.input.keyboard.addKeys()` di create() untuk polling input di `update()` (bukan addEventListener). Gunakan `this.physics.add.collider()` untuk tabrakan native.',
                    'ENVIRONMENT DEPTH: Jangan biarkan background kosong/hitam mati. Buat elemen dinamis sederhana seperti "Scrolling Grid" (garis neon) atau "Moving Starfield" menggunakan objek ringan untuk memberikan ilusi kecepatan/parallax.',
                    'SCENE TRANSITION: Wajib lakukan passing data saat berpindah scene (misal: `this.scene.start("GameOverScene", { score: this.score })`) dan tampilkan di GameOverScene secara akurat.',
                    'PROGRESSION & DIFFICULTY: Terapkan kurva kesulitan dinamis (kecepatan/spawn rate musuh naik seiring waktu). Simpan "High Score" ke LocalStorage secara real-time.',
                    'DOPAMINE LOOP (HOOK): Jangan hanya cetak skor. Implementasikan sistem "Combo Multiplier" jika pemain bermain agresif tanpa gagal, dan jatuhkan "Power-Ups" secara acak (misal: perisai, tembakan ganda, pelambat waktu).',
                    'GAME FEEL & PHYSICS: Gunakan Camera Shake, Camera Flash, dan `tweens` untuk animasi. Terapkan "Hit-Stop" (pause singkat ~50ms) saat benturan mematikan. Gunakan Phaser Groups (Object Pooling) untuk peluru/musuh.',
                    'DESKTOP-FIRST CONTROLS: EKSKLUSIF untuk Desktop. Gunakan Keyboard (WASD/Arrows/Space) and Mouse (Pointer/Klik). DILARANG menulis kontrol sentuh (mobile UI).',
                    'PROCEDURAL AUDIO: Gunakan sintesis Web Audio API (OscillatorNode) untuk membuat efek suara "Bleep/Bloop/Ledakan" saat event penting. JANGAN meload file audio eksternal. Pastikan AudioContext di-resume/diaktifkan hanya setelah ada interaksi klik pertama pengguna di layar.'
                ]
            },
            'Social': {
                role: 'Principal Social Architecture & Growth Engineer',
                directives: [  
                    'INTERACTION ARCHITECTURE: Implement an Event-Driven system for all social actions (Likes, Follows, Posts). Ensure optimistic UI updates with immediate visual feedback.',
                    'ENGAGEMENT LOOPS: Use subtle physics-based animations (Animate.css/GSAP) for notifications. Implement "Social Proof" indicators (view counters, activity heatmaps).',
                    'CONTENT FEED: Design a high-performance infinite scroll with media-rich cards. Implement "Lazy Loading" for images and auto-play logic for previews.',
                    'IDENTITY & UX: Focus on profile-centric navigation. Use customizable theme accents and prominent verified status badges.',
                    'TRUST & SAFETY: Add visual cues for E2EE (End-to-End Encryption) and clear reporting/blocking UI flows.',
                    'SOCIAL GRAPH: Visualize connections using a simple node-based view or a "Mutual Friends" grid component.'
                ]
            },
            'Fintech': {
                role: 'Principal Fintech Systems & Security Engineer',
                directives: [
                    'DATA INTEGRITY: Use Dinero.js or other robust libraries for handling currency/decimals with zero floating-point errors. Force absolute formatting rules.',
                    'COMPLIANCE & AUDIT: Build robust transaction ledgers (double-entry bookkeeping simulation) with cryptographic hash markers for each block.',
                    'UX EXCELLENCE: Mask sensitive financial inputs (Cleave.js). Implement micro-copy explanation for interest rates, and automated "Secure Connection" badges.',
                    'DATA OPERATIONS: Auto-generate amortization schedules, dynamic cashflow forecasts (Chart.js), and simulated CSV/PDF reports export.',
                    'RISK MANAGEMENT: Add complex limit alert rules (dynamic threshold triggers) that send real-time toast alerts if transaction volumes violate user limits.',
                    'SECURITY HOOKS: Auto-lock active screen after 60 seconds of zero interaction with an elegant modal overlay for password re-entry.'
                ]
            },
            'Health': {
                role: 'Principal Health Tech & UX Architect',
                directives: [
                    'COMPLIANCE BY DESIGN: Synthesize clinical telemetry views resembling HIPAA-compliant dashboards (encrypted markers and clear practitioner sign-offs).',
                    'INFORMATION HIERARCHY: Display bio-metric states clearly with visual priority. Use green/amber/red color-coding complying with medical design standards.',
                    'ACCESSIBILITY (A11Y): Ensure high contrast ratios, large readable custom typography, screen reader compatibility cues, and text-to-speech toggles.',
                    'GAMIFICATION & REWARDS: Implement a motivational health journey path or "Health Shield" where daily logs keep the avatar active.',
                    'DATA SIMULATION: Track dynamic biometric metrics (Simulated heartrate, calories, sleep) feeding responsive live graphs (Chart.js).',
                    'TELEMEDICINE COLLABORATION: Build a secure mock chat or consultation interface with simulated medical assistant agents responding real-time.'
                ]
            },
            'Education': {
                role: 'Principal EdTech & Cognitive Design Engineer',
                directives: [
                    'COGNITIVE LOAD MINIMIZATION: Design structured wizard patterns for lesson guides, limiting active screens to 1 core question/concept at a time.',
                    'SPACED REPETITION LOGIC: Build dynamic flashcard engines utilizing a simulated SuperMemo-2 algorithm for card recall scheduling.',
                    'GAMIFIED PROGRESSION: Reward user achievements with virtual experience points (XP), dynamic streak counters, and custom SVG certificate builders.',
                    'ASSESSMENTS & TESTING: Create dynamic quizzing engines with instant visual correction, detailed explanation accordions, and weak-point checklists.',
                    'INTERACTION JUICE: Use GSAP for dynamic study timers, interactive question cards flipping animations, and progress bar level-ups.',
                    'KNOWLEDGE VISUALIZATION: Present simulated mastery index charts (radar or line graphs) showing strength across distinct subject subjects.'
                ]
            },
            'E-commerce': {
                role: 'Principal E-commerce & Conversion Architect',
                directives: [
                    'CONVERSION RATE OPTIMIZATION: Design checkout flow as an ultra-fast 1-page form, with live discount code verification and inline validators.',
                    'PRODUCT METADATA: Build dynamic filters (price, category, availability, rating) working client-side (reactive search) with high speed.',
                    'INTERACTIVE SHOWCASE: Implement interactive image zoom capabilities, mock color palette switches, and responsive dynamic reviews lists.',
                    'URGENCY TRIGGER: Inject stock countdown parameters ("Only 3 left in stock!") that fluctuate logically as the customer interacts with items.',
                    'CART LIFECYCLE: Sync all cart changes instantly to LocalStorage. Support smooth quantities increments and dynamic promo discount formulas.',
                    'OPERATIONS: Generate dynamic invoices (printable viewports) showing tax calculations, dynamic delivery speed estimates, and payment tokens.'
                ]
            },
            'Utility': {
                role: 'Principal Systems & Performance Engineer',
                directives: [
                    'OFFLINE-FIRST ARCHITECTURE: Cache all transactions in LocalStorage or IndexedDB. Build status checkers verifying network availability.',
                    'SPEED: Keep the DOM light. Implement asynchronous computations using Web Workers for heavy data processes to keep rendering 60 FPS.',
                    'KEYBOARD ACCESSIBILITY: Build robust hotkey binding for all major functions (Ctrl+N, Esc to blur, arrow keys to navigate rows).',
                    'DATA MOBILITY: Support full JSON/CSV data import and export capabilities. Build drag-and-drop files parsing indicators.',
                    'UX EXCELLENCE: Display detailed execution times for all data queries, dynamic memory markers, and robust query search filters.',
                    'DENSITY & UTILITY: Map essential items inside high-density compact tables with responsive columns and fast sorting indicators.'
                ]
            },
            'Services': {
                role: 'Principal Services & Geolocation Architect',
                directives: [
                    'LOCATION-AWARE UX: Integrate map viewfinders (Leaflet/OpenStreetMap). Plot active providers, user coordinates, and radius bounds.',
                    'BOOKING LIFECYCLE: Build complete appointment booking wizards (date picker, shift slots selector, provider bio-cards).',
                    'REAL-TIME STATES: Build a mock order status pipeline (Pending -> Matching -> Provider en-route -> Arrived -> Complete).',
                    'PAYMENT LEDGER: Synthesize clean digital service tickets (printable receipts) calculating base rates, tips, and taxes dynamically.',
                    'MATCHING ALGORITHMS: Mock distance calculations based on coordinate formulas. Sort providers by dynamic rating + distance metrics.',
                    'COLLABORATION HOOK: Build mock chat viewport with booking provider delivering coordinate-driven status alerts.'
                ]
            },
            'Creative': {
                role: 'Principal Creative & Visual Systems Architect',
                directives: [
                    'GRAPHICS ENGINE: Build responsive Canvas HTML5 viewports or Paper.js wrappers. Support custom mouse drawing brushes.',
                    'LAYER MANAGEMENT: Support dynamic layers structure (add, delete, reorder, visibility toggle) for all canvas objects.',
                    'SVG COMPOSITOR: Build dynamic custom geometrics stamp editors utilizing interactive scale, rotation, and custom color palettes.',
                    'UNDO-REDO STACK: Implement a robust historical command pattern stack to support fully operational Undo & Redo (Ctrl+Z / Ctrl+Y).',
                    'INTERFACING EXTRAS: Map professional color pickers, opacity range controls, line-width adjusters, and canvas clear modals.',
                    'EXPORT PROTOCOL: Render canvas items dynamically to PNG/JPEG downloads directly in-browser using dataURI conversions.'
                ]
            },
            'Game 3D': {
                role: 'Principal 3D Graphics & Simulation Engineer',
                directives: [
                    'BABYLON ARCHITECTURE: Build responsive three-dimensional scenes using BabylonJS CDN. Configure dynamic cameras, point lights, and shadow maps.',
                    'ASSET DESIGN: Build procedural objects (Spheres, Cubes, Ground, dynamic mesh modifiers). DILARANG meload external mesh assets.',
                    'PHYSICS SYNERGY: Integrate standard movement colliders (AABB bounding boxes or simulated gravity). Support keyboard/mouse look bindings.',
                    'ATMOSPHERICS: Design environment skyboxes, fog indicators, procedural terrain structures, and reactive audio contexts.',
                    'HUD INTERFACE: Render elegant overlays (Overlay HUD for speed/score/lives) while keeping the main scene exclusively WebGL canvas.',
                    '3D SCENE TRANSITIONS: Animate camera positions dynamically using lerping scripts during key actions to provide premium feel.'
                ]
            },
            'Green-Tech': {
                role: 'Principal Environmental Analytics Architect',
                directives: [
                    'CARBON CALCULATORS: Synthesize logical carbon offset calculators mapping real-time grid energy telemetry inputs.',
                    'DATA ANALYTICS: Draw clean interactive historical telemetry graphs (Chart.js) detailing consumption optimization indices.',
                    'IMPACT VISUALIZATION: Integrate Chart.js/Recharts beautifully with dynamic data feeding and responsive resizing.',
                    'PERFORMANCE: Write "Green Code"—highly optimized, minimal re-renders to save client device battery/processing power.',
                    'ACCESSIBILITY: Ensure earthy, eco-friendly themes maintain high contrast ratios that comply with accessibility standards.'
                ]
            },
            'Music': {
                role: 'Principal Web-Audio & DSP Engineer',
                directives: [
                    'AUDIO ARCHITECTURE: Manage Tone.js or Web Audio API contexts safely across React/Vue component lifecycles (unmount/cleanup).',
                    'PRECISION TIMING: Handle audio context resumes seamlessly on first user interaction to comply with browser autoplay policies.',
                    'STATE: Serialize and save complex synth/patch parameter states into robust JSON schemas for local storage.'
                ]
            }
        };

        const config = categoryConfigs[source.category] || {
            role: 'Principal Software Architect & Lead Product Designer',
            directives: [
                'ARCHITECTURE: Design a modular, responsive single-file layout.',
                'UX: Keep the interface highly usable, intuitive, and accessible.',
                'PERFORMANCE: Ensure 60 FPS transition states and zero latency interaction feel.'
            ]
        };

        const engineMap = {
            'Productivity': 'Vue.js 3 (Composition API) & Tailwind CSS',
            'Game 2D': 'Phaser 3 (via CDN) + Web Audio API (Oscillator Node Synthesis)',
            'Social': 'Vue.js 3 + Tailwind CSS + Animate.css',
            'Fintech': 'Vue.js 3 + Tailwind CSS + Cleave.js (Input Masking) + Chart.js',
            'Health': 'Vue.js 3 + Tailwind CSS + Chart.js',
            'Education': 'Vue.js 3 + Tailwind CSS + GSAP',
            'E-commerce': 'Vue.js 3 + Tailwind CSS + LocalStorage SDK',
            'Utility': 'Vue.js 3 + Tailwind CSS + Web Workers',
            'Services': 'Vue.js 3 + Leaflet.js (Map CDN) + Tailwind CSS',
            'Creative': 'Canvas API / Paper.js + Vanilla JS (For low-latency drawing & DOM manipulation)',
            'Game 3D': 'Babylon.js (3D Engine via CDN) + Havok Physics + Vanilla JS',
            'Green-Tech': 'Vue.js 3 + Tailwind CSS (Optimized for data-heavy visualizations)',
            'Music': 'Web Audio API / Tone.js Context + Vanilla JS (For precise audio scheduling)'
        };
        const coreEngine = engineMap[source.category] || 'Vue.js 3 (Composition API) & Tailwind CSS';
        
        const hasCamera = source.hardware?.some(hw => hw.toLowerCase().includes('camera'));
        const hasMic = source.hardware?.some(hw => hw.toLowerCase().includes('microphone'));

        const aiIntegrationDirective = source.useAI 
            ? `\n- **DIVERDEA AI SDK (CRITICAL - NO BOILERPLATE)**: Aplikasi prototype ini WAJIB menggunakan SDK multimodal buatan DiverDea. DILARANG KERAS menulis kode \`fetch\` panjang untuk memanggil API Gemini atau Groq secara manual.
- **REAL LIVE AI (STRICTLY NO DUMMY DATA)**: Anda DILARANG KERAS menyimulasikan data dummy (mock) atau respons palsu menggunakan \`setTimeout\`. Aplikasi ini harus benar-benar terintegrasi secara LIVE dengan AI sebagai motor penggerak utama fitur fungsionalnya.
- **Wajib Include SDK**: Tambahkan \`<script src="./sdk/diverdea-ai-sdk.js"></script>\` di bagian \`<head>\`.
- **Inisialisasi**: Di dalam \`setup()\` Vue Anda, minta API Key lewat input dari user lalu inisialisasikan \`DiverDeaAI.init({ provider: '${source.aiApi}', apiKey: 'KEY_DARI_USER' })\`.
- **Multimodal AI Modalities**: ${
    (source.aiModalities && source.aiModalities.length > 0) 
    ? `\n  - Aplikasi ini wajib memprioritaskan fungsi multimodal SDK berikut:\n` + source.aiModalities.map(m => {
        if (m.includes('Vision')) return '    * **Vision**: Gunakan `await DiverDeaAI.Vision.analyze(canvasElement, "prompt")` untuk menganalisis gambar dari kamera.';
        if (m.includes('Voice Input')) return '    * **Speech-to-Text**: Gunakan `await DiverDeaAI.Audio.listenAndTranscribe((text) => {})` untuk merekam suara mikrofon menjadi teks.';
        if (m.includes('Voice Output')) return '    * **Text-to-Speech**: Gunakan `DiverDeaAI.Audio.speak("text")` agar aplikasi merespons menggunakan suara.';
        if (m.includes('Extraction')) return '    * **Data Extraction**: Gunakan `await DiverDeaAI.Data.extract(text, schema)` untuk mem-parsing data acak menjadi JSON terstruktur.';
        if (m.includes('Sentiment')) return '    * **Sentiment Analysis**: Gunakan `await DiverDeaAI.Data.analyzeSentiment(text)` untuk mendeteksi emosi pengguna.';
        if (m.includes('Document Analysis')) return '    * **Document Q&A**: Gunakan `await DiverDeaAI.Data.documentQA(docText, question)` untuk menjawab pertanyaan berdasarkan dokumen.';
        return '    * **Predictive Analytics**: Gunakan `await DiverDeaAI.predict(jsonData)` untuk mencari pola tersembunyi.';
      }).join('\n')
    : `\n  - Gunakan \`await DiverDeaAI.Chat.ask("prompt")\` untuk mendapatkan respons AI yang cerdas.`
}
- **UI State Mutation**: Respons AI (yang sudah otomatis diparsing oleh SDK jika outputnya JSON) harus secara cerdas memicu mutasi fungsi JavaScript internal secara real-time.`
            : '';

        const profile = PromptComposer.getProfile(source);
        const mechanicsList = (source.mechanics || []).map((m, i) => `  ${i + 1}. "${m}"`).join('\n');
        const aesthetics = (source.styles || []).join(', ') || 'Modern Minimalist';

        const formattedCategoryDirectives = PromptComposer.formatDirectives(
            PromptComposer.pickDirectives(config.directives, profile.maxCategoryDirectives)
        );
        const secondaryConfig = source.secondaryCategory && source.secondaryCategory !== 'None'
            ? categoryConfigs[source.secondaryCategory] : null;
        const formattedSecondaryDirectives = secondaryConfig && profile.maxSecondaryDirectives > 0
            ? PromptComposer.formatDirectives(
                PromptComposer.pickDirectives(secondaryConfig.directives, profile.maxSecondaryDirectives)
            )
            : '';

        const adaptiveProfileBlock = PromptComposer.buildAdaptiveProfileBlock(source, profile);
        const navigationSpec = PromptComposer.navigationSpec(source, profile);
        const resolvedRoutes = PromptComposer.resolveNavigationForPrompt(source, profile);
        const antiTemplateBlock = PromptComposer.antiTemplateUxBlock(source);
        const effectiveNavPosition = PromptComposer.suggestNavigationPosition(source);
        const aiBlock = source.useAI
            ? (profile.key === 'simple'
                ? PromptComposer.aiIntegrationBrief(source)
                : aiIntegrationDirective.trim())
            : '';

        const apiDirective = source.apis?.length
            ? `\n- **External APIs (ON)**: ${source.apis.join(', ')} — functional mock UI only.`
            : '\n- **External APIs: OFF** — do not add API integrations or fetch panels.';

        const hardwareDescriptions = {
            'Camera': 'WebRTC viewfinder + permission UI',
            'Microphone': 'waveform indicator + permission UI',
            'Geolocation': 'map/coordinates mock',
            'Gyroscope / Accelerometer': 'tilt/motion reactive UI',
            'NFC / Bluetooth': 'scan/connect status UI'
        };
        const hardwareDirective = source.hardware?.length
            ? `\n- **Hardware (ON)**: ${source.hardware.map(hw => `${hw} (${hardwareDescriptions[hw] || 'permission + status UI'})`).join(', ')}.`
            : '\n- **Hardware: OFF** — do not request device permissions.';

        const isGame = ['Game 2D', 'Game 3D'].includes(source.category);

        return `### SYSTEM ROLE
Berperanlah sebagai **Principal Software Architect & Lead Product Designer [${source.category.toUpperCase()}]**. 
Ciptakan prototype Single-File HTML premium yang "State-of-the-Art", fully-functional, dan zero-bug.

<project-identity>
- **Name:** "${source.appName}"
- **Primary Domain Focus:** ${source.category}
${source.secondaryCategory && source.secondaryCategory !== 'None' ? `- **Secondary Domain Focus:** ${source.secondaryCategory}` : ''}
- **Concept:** "${source.product}"
- **Core Mechanics:**
${mechanicsList}
- **App Routes (use these exact nav labels):** ${resolvedRoutes.map(r => `"${r}"`).join(', ')}
- **Nav position:** ${effectiveNavPosition}
- **Aesthetic/Design Style:** "${source.designStyle || 'minimalist'}" ${aesthetics ? `- ${aesthetics}` : ''}
- **Typography:** Primary Font: "${source.primaryFont || 'Inter'}", Secondary Font: "${source.secondaryFont || 'Inter'}"
- **Writing/Copywriting Style:** "${source.writingStyle || 'informatif'}"
- **Target Audience:** ${(source.audiences || []).join(', ') || 'General Users'}
${colors ? `- **Color Palette (60-30-10):** Primary(${colors.color1}), Surface(${colors.color2}), Accent(${colors.color3})` : ''}
</project-identity>

${adaptiveProfileBlock}

<technical-spec>
- **Core Engine:** ${coreEngine}
- **Extended Libraries:** ${libStacks[source.category] || 'GSAP, Lucide Icons'}${source.secondaryCategory && source.secondaryCategory !== 'None' && libStacks[source.secondaryCategory] ? `, ${libStacks[source.secondaryCategory]}` : ''}
- **Environment:** Single File HTML Prototype (Zero Build Step). WAJIB gunakan tautan CDN valid (unpkg, jsdelivr, cdn.tailwindcss.com) di <head> agar kode langsung jalan di browser tanpa NPM.
- **Data Persistence:** Simpan state interaktif, preferensi, dan riwayat history secara real-time ke **LocalStorage**.
- **A11y & Robustness:** Gunakan semantik HTML5, ARIA roles, rasio kontras warna fintech-safe, serta error handling estetik (graceful failure).
- **No Emojis & Premium Icon Library:** DILARANG KERAS menggunakan emoji visual di seluruh antarmuka aplikasi hasil generate (baik pada tombol, tab, sidebar, modal, toast, navigasi, maupun status). Wajib gunakan pustaka ikon vektor profesional **FontAwesome (v6 via CDN)** atau **Lucide Icons** untuk semua representasi simbol visual.
- ${navigationSpec.replace(/^- /, '')}
- **Theme Mode & Token Optimization**: ${source.themeMode === 'dark' ? 'Eksklusif Dark Mode premium. DILARANG membuat tombol saklar tema/state. Jangan gunakan class "dark:" Tailwind. Tulis warna dasar gelap langsung (bg-zinc-950, text-zinc-100).' : source.themeMode === 'light' ? 'Eksklusif Light Mode premium. DILARANG membuat tombol saklar tema/state. Tulis warna dasar terang langsung.' : 'Dual Theme (Dark/Light mode) dengan tombol saklar interaktif (bulan/matahari) reaktif Vue dan simpan di LocalStorage.'}
- **Branding & Logo**: ${source.createLogo ? 'WAJIB buat logo vektor kustom estetik menggunakan inline SVG langsung di header navigasi. Jangan pakai gambar luar.' : 'Gaya Ultra-Minimalist. DILARANG keras pakai logo SVG/gambar visual. Cukup tipografi teks nama aplikasi yang elegan.'}
- **Audio & Sound Effects**: ${source.createAudio ? 'WAJIB sertakan efek suara SFX klik/sukses interaktif berbasis Web Audio API oscillators kustom. Sediakan tombol Mute/Unmute di header.' : 'SILENT APP (TANPA SUARA). DILARANG keras menulis kode Web Audio API atau memuat file audio.'}
- **Micro-Animations & Transitions**: ${source.useAnimations ? 'WAJIB gunakan GSAP untuk stagger stutters, transisi view, dan mikro-interaksi tombol yang memukau.' : 'DILARANG pakai GSAP/JS animations. Gunakan transisi CSS Tailwind (`transition-all duration-300`) murni.'}
- **Charts & Data Visualization**: ${source.useCharts ? 'WAJIB sertakan Chart.js via CDN untuk membuat grafik visualisasi data reaktif dinamis.' : 'DILARANG pakai Chart.js. Visualisasikan data dengan bar div Tailwind murni (`style="width: val%"`).'}
- **Database & Mock Data Volume**: ${source.minimalMockData ? 'Mock data Tiruan Ultra-Minimalist (hanya 2-3 data item saja per list). Gunakan kalkulasi acak dinamis saat tambah data.' : 'Diperbolehkan menulis database mock data tebal (5-10 item per list).'}
- **Code Output:** Tuliskan KESELURUHAN kode hanya dalam SATU blok markdown \`\`\`html saja (DILARANG keras memotong dengan komentar seperti "// logic nanti").
</technical-spec>

<directives>
#### 1. Synergy Hook Strategy
Buatlah "Synergy Hook" di mana ketiga mekanik di atas saling memengaruhi secara dinamis (Cross-Feature Dependency), bukan sekadar digabung terpisah. Jelaskan analisis sinergi ini pada bagian Rationale.

#### 2. Architecture & Deep Logic
- **SoC (Separation of Concerns):** Pisahkan state management (Logic/Actions) dari rendering view (HTML/CSS) layaknya reactive store.
- **Deep Logic:** Logika mekanik inti harus memiliki algoritma nyata (misal: perhitungan split dinamis menggunakan JavaScript Intl.NumberFormat, input masking Cleave.js, atau game loops nyata), bukan sekadar kosmetik UI.

${isGame ? `#### 3. Game & Canvas Architecture
- **Canvas-First:** Prioritaskan rendering penuh di \`<canvas>\`. DOM/HTML digunakan eksklusif untuk overlay UI (Main Menu, HUD, Settings, Game Over).
- **Asset Generation:** DILARANG menggunakan banyak external URL asset. Gambar visual sprite/texture secara prosedural (Babylon primitives / Phaser graphics / Canvas API).
- **Audio Synthesis:** Sintesis Web Audio API (OscillatorNode) untuk sound effects (bleep/bloop). Aktifkan context hanya setelah interaksi fisik pertama.` 
: `#### 3. UX Clarity, Onboarding & Juice
- **Ultra-Minimalist Layout & No Logo (MANDATORY)**: Desain antarmuka aplikasi hasil generate wajib dibuat **seminimalis mungkin (ultra-minimalist, clean, typographic)**. 
  1. DILARANG menggunakan atau menaruh logo visual/ikon logo apa pun di dalam aplikasi.
  2. Jika ada informasi sekunder, data detail, tabel panjang, riwayat history, atau statistik padat, **SANGAT WAJIB disembunyikan dan disisipkan lewat card/modal/bottom-sheet interaktif yang hanya muncul ketika tombol ditekan** agar layar utama tetap bersih dari kekacauan visual (clutter-free).
- **Onboarding:** Sediakan mini step-by-step onboarding guide (max 4 langkah visual/inline) yang elegan dan dapat di-dismiss.
- **Global Settings Menu:** Sediakan panel pengaturan (icon gear) untuk toggle Dark/Light Mode, Sound, dan Clear Data (Reset).
- **Interactive Feedback:** Tampilkan floating Toast notification (timeout 3 detik) untuk memberi tahu hasil dari setiap aksi (sukses/gagal/info).
- **Micro-interactions (Juice):** CSS transition/keyframes yang halus untuk hover/focus. Batasi GSAP hanya untuk transisi tingkat lanjut (modal/charts).
- **Keyboard & Focus a11y:** Pastikan focus state \`:focus-visible\` kustom sangat jelas.`}
${source.useAI && profile.key !== 'simple' && hasCamera ? `\n- **MULTIMODAL AI VISION (ACTIVE)**: Camera + AI — snapshot canvas → Gemini multimodal inlineData; update app state from result.` : ''}
${source.useAI && profile.key !== 'simple' && hasMic ? `\n- **VOICE INPUT (ACTIVE)**: Mic + AI — Web Speech API (id-ID) → fill input → send to AI agent.` : ''}
${aiBlock ? `\n${aiBlock}` : ''}${apiDirective}${hardwareDirective}
${source.customDirectives ? `\n- **AI Custom Synthesis Directives (CRITICAL - HIGH PRIORITY)**: ${source.customDirectives}` : ''}
${antiTemplateBlock}
</directives>

<domain-focus>
#### Category Directives (${source.category}) — top ${profile.maxCategoryDirectives} only:
${formattedCategoryDirectives}
${formattedSecondaryDirectives ? `\n#### Secondary (${source.secondaryCategory}) — top ${profile.maxSecondaryDirectives}:\n${formattedSecondaryDirectives}` : ''}
${profile.includeDomainPsychology ? `\n#### Domain Psychology (${source.category}):\n${categoryFocusMap[source.category] || ''}${source.secondaryCategory && source.secondaryCategory !== 'None' && categoryFocusMap[source.secondaryCategory] ? `\n#### Domain Psychology (${source.secondaryCategory}):\n${categoryFocusMap[source.secondaryCategory]}` : ''}` : '\n(Skip long domain essays — follow generation-profile scope.)'}
</domain-focus>

---

### RESPONSE FORMAT (MANDATORY)
${profile.responseSections.includes('rationale') ? '1. **Executive Rationale:** (Max 1 short paragraph) Synergy Hook only.\n' : ''}${profile.responseSections.includes('schema') ? '2. **Architecture & State Schema:** Compact JSON state outline.\n' : ''}${profile.responseSections.includes('code') ? '3. **The Prototype (Full Code):** ONE \\`\\`\\`html block — complete, runnable, no truncation comments.\n' : ''}${profile.responseSections.includes('testing') ? '4. **Roadmap & Testing:** 2-3 bullet test steps.\n' : ''}`;
    },

    generateMasterPrompt(source, libStacks, categoryFocusMap, colors) {
        const mechanicsList = (source.mechanics || []).map(m => `  - ${m}`).join('\n');
        const stylesList = (source.styles || []).length ? `- **Styles/Themes**:\n${source.styles.map(s => `  - ${s}`).join('\n')}` : '';
        const audiencesList = (source.audiences || []).length ? `- **Target Audiences**:\n${source.audiences.map(a => `  - ${a}`).join('\n')}` : '';
        const constraintsList = (source.constraints || []).length ? `- **Design Constraints**:\n${source.constraints.map(c => `  - ${c}`).join('\n')}` : '';

        // Category configs khusus untuk Full-Stack Build (Bukan sekedar Prototype HTML)
        const masterCategoryConfigs = {
            'Productivity': {
                role: 'Principal Workflow & Systems Architect',
                directives: [
                    'SYSTEM ARCHITECTURE: Implement a centralized state management (Redux/Zustand) with optimistic updates and robust offline persistence (IndexedDB).',
                    'KEYBOARD-FIRST UX: Map global hotkeys and focus traps for all modals. Implement custom command palette (Ctrl+K).',
                    'DENSITY: Design high-density Bento grids and responsive layout matrices.'
                ]
            },
            'Game 2D': {
                role: 'Principal Game Architect & Creative Technologist',
                directives: [
                    'ENGINE ARCHITECTURE: Leverage Phaser 3 or HTML5 Canvas with custom game loops, separation of scenes, asset optimization, and state management.',
                    'GAME MECHANICS: Build robust collision physics, dynamic difficulty scaling, and high-score persistence.',
                    'GAME FEEL: Build procedural audio effects, screenshakes, hit-stops, and visual combo loops.'
                ]
            },
            'Social': {
                role: 'Principal Social Architecture & Growth Engineer',
                directives: [
                    'INTERACTION ARCHITECTURE: Implement Event-driven real-time feeds, likes, comments, dynamic updates, and robust media asset handling.',
                    'GROWTH LOOPS: Design viral invitation structures, referral tokens, social share mechanisms, and high-impact custom badges.',
                    'TRUST & SAFETY: Secure profiles, simple end-to-end simulated encryption markers, report/block UX, and community moderation boards.'
                ]
            },
            'Fintech': {
                role: 'Principal Fintech Systems & Security Engineer',
                directives: [
                    'DATA INTEGRITY: Use Dinero.js or precise big-number decimal libraries. Ensure absolute rounding precision.',
                    'COMPLIANCE: Build mock PCI-DSS transaction validation sheets, bank-grade ledger views, and audit logging.',
                    'SECURITY: Mock secure inputs, masked inputs, automated MFA alerts, and explicit session timeouts.'
                ]
            },
            'Health': {
                role: 'Principal Health Tech & UX Architect',
                directives: [
                    'UX ACCESSIBILITY: Implement ultra-high readability, WCAG compliance, text-to-speech toggles, and clear health statuses.',
                    'COMPLIANCE: Design HIPAA-compliant mock data sheets, encrypted telemetry views, and clear practitioner sign-offs.',
                    'DATA LOOPS: Create daily health logs, progress charts, dynamic calorie/step tracking, and reward loops.'
                ]
            },
            'Education': {
                role: 'Principal EdTech & Cognitive Design Engineer',
                directives: [
                    'COGNITIVE LOAD: Design clean learning path wizards, modular card components, micro-step navigation, and distraction-free modes.',
                    'RETENTION LOOPS: Build spaced-repetition card decks, dynamic streak rewards, custom certifications, and procedural progress widgets.',
                    'ASSESSMENTS: Create clean dynamic quizzes, scoring heatmaps, detailed progress metrics, and actionable weak-spot tips.'
                ]
            },
            'E-commerce': {
                role: 'Principal E-commerce & Conversion Architect',
                directives: [
                    'CONVERSION LOOP: Design one-page checkouts, persistent shopping carts, dynamic stock counters, and real-time coupon validation.',
                    'DISCOVERY: Build faceted search filters, clean product comparisons, dynamic zoom-in previews, and related-item recommenders.',
                    'OPERATIONS: Mock shipping speed calculators, invoice generators, automated tracking states, and return-label builders.'
                ]
            },
            'Utility': {
                role: 'Principal Systems & Performance Engineer',
                directives: [
                    'SYSTEM ARCHITECTURE: Build offline-first operations with IndexedDB/LocalStorage, running heavy calculations in Web Workers.',
                    'SPEED: Keep the bundle footprint tiny, asset rendering instant, memory leaks zero, and state queries heavily optimized.',
                    'TOOL UX: Keep the tool single-screen, highly dense, keyboard-first, with fast file export/import support.'
                ]
            },
            'Services': {
                role: 'Principal Services & Geolocation Architect',
                directives: [
                    'LOCATION SERVICES: Integrate Leaflet/Map API markers, routing polygons, dynamic distance meters, and mock geofences.',
                    'SCHEDULING: Create calendar datepicker schedulers, provider shift slots, real-time booking statuses, and checkout ledgers.',
                    'SERVICE MATCHING: Design advanced filtering for provider ratings, instant match searchers, and real-time booking confirmation.'
                ]
            },
            'Creative': {
                role: 'Principal Creative & Visual Systems Architect',
                directives: [
                    'GRAPHICS ENGINE: Implement Canvas API, Fabric.js, or SVG-manipulation engines with high-precision layers and undo/redo.',
                    'INTERACTIVITY: Support custom drag-select boxes, anchor scale handles, custom color-picker libraries, and dynamic exports.',
                    'ASSETS: Build procedural asset generators, particle brush generators, custom geometric stamp kits, and high-fidelity filters.'
                ]
            },
            'Game 3D': {
                role: 'Principal 3D Graphics & Simulation Engineer',
                directives: [
                    'RENDER ENGINE: Leverage Three.js/Babylon.js with dynamic shadow mapping, optimized light structures, and responsive aspect scaling.',
                    'PHYSICS ENGINE: Implement Havok or Cannon.js simulated physics, elastic colliders, raycast hit detection, and bounding boxes.',
                    'SCENE DEPTH: Add atmospheric skyboxes, dynamic mist/fog, high-precision particle streams, and automated camera rigs.'
                ]
            },
            'Green-Tech': {
                role: 'Principal Environmental Analytics Architect',
                directives: [
                    'DATA VISUALIZATION: Design detailed environmental telemetry, carbon offset charts, real-time grid energy stats, and sustainability counters.',
                    'PERFORMANCE: Optimize dashboard rendering, data stream caching, and responsive charts.',
                    'ACCESSIBILITY: Ensure leafy/earthy custom palettes strictly satisfy WCAG high-contrast standards.'
                ]
            },
            'Music': {
                role: 'Principal Web-Audio & DSP Engineer',
                directives: [
                    'AUDIO ARCHITECTURE: Manage Tone.js or Web Audio API contexts safely across React/Vue component lifecycles (unmount/cleanup).',
                    'PRECISION TIMING: Handle audio context resumes seamlessly on first user interaction to comply with browser autoplay policies.',
                    'STATE: Serialize and save complex synth/patch parameter states into robust JSON schemas for local storage.'
                ]
            }
        };

        const config = masterCategoryConfigs[source.category] || {
            role: 'Principal Full-Stack Architect & Lead UI/UX Engineer',
            directives: [
                'ARCHITECTURE: Use Clean Architecture or Feature-Sliced Design (FSD).',
                'UX: Focus on "Keyboard-First" workflow and accessible UI.',
                'QUALITY: Strict TypeScript, zero any types, comprehensive error handling.'
            ]
        };

        const masterEngineMap = {
            'Productivity': 'Next.js (App Router) + Tailwind CSS + Zustand',
            'Game 2D': 'Vite + React + Phaser 3 + Tailwind CSS',
            'Social': 'Next.js (App Router) + Tailwind CSS + Supabase (Architecture)',
            'Fintech': 'Next.js (App Router) + Tailwind CSS + Zod + Dinero.js',
            'Health': 'Next.js (App Router) + Tailwind CSS + Zustand',
            'Education': 'Next.js (App Router) + Tailwind CSS + Zustand',
            'E-commerce': 'Next.js (App Router) + Tailwind CSS + Zustand',
            'Utility': 'Vite + React + Tailwind CSS + Web Workers + IndexedDB',
            'Services': 'Next.js (App Router) + Tailwind CSS + Leaflet',
            'Creative': 'Vite + React + Zustand + Canvas API/Fabric.js',
            'Game 3D': 'Vite + React + React Three Fiber (R3F) / Babylon.js',
            'Green-Tech': 'Next.js + Tailwind CSS + Recharts',
            'Music': 'Vite + React + Tailwind CSS + Tone.js + Zustand'
        };
        const coreMasterEngine = masterEngineMap[source.category] || 'Next.js (App Router) + Tailwind CSS + Zustand';

        return `### SYSTEM ROLE & PRIME DIRECTIVE
Act as a **${config.role}** and **DevSecOps Specialist**. 
Your goal is to architect and build a production-ready, highly scalable, and flawless modern web application using **${coreMasterEngine}**. You write clean, modular, heavily commented, and highly performant code.

---

### 1. PROJECT IDENTITY & SCOPE
- **App Name:** ${source.appName || 'Untitled App'}
- **Category Focus:** ${source.category || 'General Software'}
- **Product Vision:** "${source.product || 'Innovative Web App'}"
- **Core Mechanics (Implement Fully):**
${mechanicsList}
${stylesList}
${audiencesList}
${constraintsList}
- **Design & UX Preferences**:
  - **Design Style**: ${source.designStyle || 'minimalist'}
  - **Typography**: Primary: ${source.primaryFont || 'Inter'}, Secondary: ${source.secondaryFont || 'Inter'}
  - **Writing/Copywriting Style**: ${source.writingStyle || 'informatif'}
- **API Integrations (Guided Autonomy)**:
${source.apis?.length ? source.apis.map(api => `  - ${api}`).join('\n') : '  - None specified. You are given guided autonomy to determine, design, and mock other APIs.'}
- **Hardware Access (Guided Autonomy)**:
${source.hardware?.length ? source.hardware.map(hw => `  - ${hw}`).join('\n') : '  - None specified. You are given guided autonomy to simulate other hardware/device access.'}
${source.useAI ? `- **REAL Live Client-Side AI Integration (CRITICAL - NO BOILERPLATE & NO DUMMY DATA)**: The generated application MUST use the DiverDea AI SDK to power its intelligent features. Do not write raw fetch calls to Gemini/Groq. You are STRICTLY FORBIDDEN from simulating data using \`setTimeout\` or hardcoding fake AI responses. The app must fetch real data using the SDK.
- **SDK Inclusion**: Include the SDK via \`<script src="./sdk/diverdea-ai-sdk.js"></script>\` or use it as a global \`window.DiverDeaAI\` object.
- **Client-Input API Provider & Key in Settings**: Provide a dropdown in global Settings for "Gemini" or "Groq", and a text input for API Key. Save securely in LocalStorage. Call \`DiverDeaAI.init({ provider, apiKey })\` on load.
- **AI Modalities (MANDATORY)**: ${
    (source.aiModalities && source.aiModalities.length > 0) 
    ? `\n  - Implement the following modalities using the SDK:\n` + source.aiModalities.map(m => {
        if (m.includes('Vision')) return '    * **Vision**: Use `await DiverDeaAI.Vision.analyze(canvasElement, "prompt")` for computer vision tasks.';
        if (m.includes('Voice Input')) return '    * **Voice Input**: Use `await DiverDeaAI.Audio.listenAndTranscribe((text) => {})` for voice-to-text input.';
        if (m.includes('Voice Output')) return '    * **Voice Output**: Use `DiverDeaAI.Audio.speak("text")` to synthesize speech output.';
        if (m.includes('Extraction')) return '    * **Data Extraction**: Use `await DiverDeaAI.Data.extract(text, schema)` to parse unstructured text to JSON.';
        if (m.includes('Sentiment')) return '    * **Sentiment Analysis**: Use `await DiverDeaAI.Data.analyzeSentiment(text)` to detect user emotions.';
        if (m.includes('Document Analysis')) return '    * **Document Q&A**: Use `await DiverDeaAI.Data.documentQA(docText, question)` for RAG functionality.';
        return '    * **Predictive Analytics**: Use `await DiverDeaAI.predict(jsonData)` for advanced data analysis.';
      }).join('\n')
    : `\n  - Use \`await DiverDeaAI.Chat.ask("prompt")\` for intelligent dynamic responses that mutate the UI state.`
}` : ''}
- **Brand Color Design Tokens:** 
  - Primary/Hero: \`${colors?.color1 || '#3B82F6'}\`
  - Surface/Neutral: \`${colors?.color2 || '#F3F4F6'}\`
  - Accent/Interactive: \`${colors?.color3 || '#10B981'}\`

---

### 2. STRICT ARCHITECTURAL & CODING STANDARDS
1. **Tech Stack:** You MUST use **${coreMasterEngine}**. **TypeScript is MANDATORY.**
2. **Type Safety:** Use strict TypeScript interfaces/types. Absolutely NO \`any\` types.
3. **Architecture Pattern:** Follow Clean Architecture or Feature-Sliced Design (FSD). Strictly separate layers.
4. **Styling:** Use Tailwind CSS. Utilize arbitrary values or extend the config.
5. **UI/UX & STYLING AESTHETICS (MANDATORY)**:
   - **Ultra-Minimalist Layout & No Logo**: Extreme minimalism, typographic layout.
     1. DO NOT include any visual logo or logo icon anywhere.
     2. All secondary information, comprehensive statistics, massive tables, or extensive log histories MUST be hidden and presented inside elegant, interactive drawer cards or modal dialogs.
   - Use the provided Color Palette effectively.
   - Implement micro-interactions (hover states, skeletons, transitions) for a premium feel.
   - **Strict No-Emoji Policy**: DO NOT use emojis for UI icons. Always use professional vector icon libraries like FontAwesome or Lucide instead. Use premium web fonts.
6. **Zero-Tolerance Quality:** 
   - DO NOT leave placeholders. Write the ACTUAL functional code.
   - Implement robust Error Boundaries.
   - Ensure Accessibility (a11y) using ARIA roles.
   - **Realistic Mock Data:** Generate highly realistic and detailed mock data.
   - **Persistence:** Sync to LocalStorage.

---

### 3. DOMAIN EXPERTISE & SPECIFIC DIRECTIVES (${source.category.toUpperCase()} FOCUS)
${config.directives.map((d, i) => `${i + 1}. ${d}`).join('\n')}${
categoryFocusMap && categoryFocusMap[source.category] ? `\n\n**PSYCHOLOGY & DOMAIN FOCUS:**\n${categoryFocusMap[source.category]}` : ''
}${
libStacks && libStacks[source.category] ? `\n\n**RECOMMENDED DOMAIN LIBRARIES:**\n${libStacks[source.category]}` : ''
}
${source.customDirectives ? `\n- **AI Custom Synthesis Directives (HIGH PRIORITY)**: ${source.customDirectives}` : ''}

---

### 4. OUTPUT FORMATTING & BEHAVIOR (CRITICAL FOR AI GENERATION)
- **ZERO YAPPING:** Do not write polite introductions, explanations, or conclusions. Output ONLY the code, CLI commands, and the exact phase completion question at the end.
- **FILE NAMING RULE:** Before EVERY code block, you MUST specify the exact file path inside a markdown header (e.g., \`### File: src/components/ui/Button.tsx\`). 

---

### 5. INTERACTIVE GENERATION PROTOCOL (CRITICAL TO AVOID TOKEN LIMITS)
**PHASE 1: Project Scaffolding & Architecture**
- Output the exact CLI commands to initialize the project for ${coreMasterEngine}.
- List the required NPM dependencies.
- Output a precise ascii tree of the Folder Structure.
- Provide the configuration files.
- *STOP AND ASK: "Phase 1 Complete. Reply 'next' to generate the Global State, Schema & Utility functions."*

**PHASE 2: Core State Management, Data Schema & Services**
- Write the global state stores.
- Write the utility functions, custom hooks, mock API logic.
- *STOP AND ASK: "Phase 2 Complete. Reply 'next' to generate the Master Layout & UI Components."*

**PHASE 3: Reusable UI Components & Master Layout**
- Provide the Master Layout file.
- Provide highly reusable core UI components.
- *STOP AND ASK: "Phase 3 Complete. Reply 'next' to generate the Core Features & Main Application Pages."*

**PHASE 4: Core Mechanics Implementation**
- Write the main application pages.

---
**UNDERSTOOD?** Begin by executing **PHASE 1** immediately. Do not write code for Phase 2 until I say "next".`;
    },
    randomizeGroup(slots, count, pool) {
        if (!pool || !pool.length) return;
        const used = new Set(slots.filter(s => s.locked).map(s => s.value));
        slots.forEach((slot, i) => {
            if (i < count && !slot.locked) {
                let available = pool.filter(p => !used.has(p));
                slot.value = _.sample(available.length ? available : pool);
                used.add(slot.value);
            }
        });
    },

    /**
     * Step 1 of 2-Step Chain: Architecture Planning Prompt.
     * Asks AI ONLY for a structural blueprint (no code).
     * Output is used as context for the full build prompt (Step 2).
     */
    generatePlanningPrompt(source) {
        const profile = PromptComposer.getProfile(source);
        const mechanicsFormatted = (source.mechanics || []).map((m, i) => `${i + 1}. "${m}"`).join('\n');
        const optionals = [
            source.styles?.length    ? `- Visual Styles: ${source.styles.join(', ')}` : null,
            source.audiences?.length ? `- Target Audiences: ${source.audiences.join(', ')}` : null,
            source.constraints?.length ? `- Design Constraints: ${source.constraints.join(', ')}` : null,
            source.apis?.length      ? `- External APIs: ${source.apis.join(', ')}` : '- External APIs: OFF',
            source.hardware?.length  ? `- Hardware: ${source.hardware.join(', ')}` : '- Hardware: OFF',
            source.useAI             ? `- App AI: YES (${source.aiApi === 'gemini' ? 'Gemini' : 'Groq'})` : '- App AI: OFF',
        ].filter(Boolean).join('\n');
        const profileExtras = PromptComposer.buildPlanningExtras(source, profile);

        return `### ARCHITECTURE PLANNING PHASE — Step 1 of 2

You are a Principal Software Architect. Your ONLY task right now is to create a detailed **technical blueprint** for the app below.
**DO NOT write any HTML, CSS, or JavaScript code.** Output ONLY structured JSON.

---

### GENERATION PROFILE:
${profileExtras}

### APP CONCEPT:
- **App Name:** "${source.appName}"
- **Primary Category:** ${source.category}
${source.secondaryCategory && source.secondaryCategory !== 'None' ? `- **Secondary Category:** ${source.secondaryCategory}` : ''}
- **Product Container:** "${source.product}"
- **Core Mechanics (to synthesize):**
${mechanicsFormatted}
${source.customDirectives ? `- **Custom Integration Directives:** ${source.customDirectives}` : ''}
${optionals ? `\n### ACTIVE OPTIONS:\n${optionals}` : ''}

---

### YOUR TASK:
Analyze how these mechanics **interact and depend on each other** (Cross-Feature Dependency). Then produce the blueprint below.

Return ONLY a valid JSON object — no markdown fences, no extra text:
{
  "synergyAnalysis": "<2-3 sentences: how the mechanics connect to form a cohesive product>",
  "layoutStrategy": "<describe the main layout approach: e.g., sidebar+canvas, dashboard grid, single-column wizard>",
  "navigation": ["<SATU label per fitur di mechanics — panjang array = jumlah mechanics + 1 hub. DILARANG: Dashboard, Features, Settings. Contoh untuk fitur 'Pelacak Streak' & 'Leaderboard': ['Beranda', 'Streak Harian', 'Papan Peringkat']>"],
  "navigationPosition": "<'bottom' untuk mobile/PWA, 'left' untuk desktop dashboard, 'top' untuk game HUD — sesuai platform>",
  "themeMode": "<PILIH SALAH SATU: 'dark' (hanya dark mode), 'light' (hanya light mode), atau 'both' (punya toggle dark/light mode) yang paling cocok dengan estetika kategori ini>",
  "createLogo": <true jika aplikasi ini membutuhkan branding visual/logo maskot kustom yang kuat, atau false jika ingin bersih minimalis tanpa logo sama sekali>,
  "createAudio": <true jika aplikasi ini membutuhkan efek suara (sound effects) atau sintesis audio Web Audio API (misal: game, alarm, meditasi, accessibility), atau false jika berupa dasbor/utilitas sunyi biasa>,
  "useAnimations": <true jika aplikasi ini membutuhkan animasi GSAP kompleks / mikro-animasi SVG, atau false jika cukup transisi CSS standar untuk menghemat token>,
  "useCharts": <true jika aplikasi ini wajib menampilkan grafik visualisasi Chart.js, atau false jika cukup bar/tabel CSS biasa untuk menghemat token>,
  "minimalMockData": <true jika sebaiknya membatasi database/dummy data (2-3 item saja) demi efisiensi token, atau false jika butuh database dummy besar>,
  "components": ["<component/section name>: <1-line purpose>"],
  "stateSchema": {
    "<key>": "<type>: <what it stores>"
  },
  "criticalAlgorithms": ["<name>: <1-line description of the core logic>"],
  "potentialPitfalls": ["<brief risk or edge case to watch out for>"],
  "techStack": "<confirm the best tech stack choice and why>"
}`;
    },
};
