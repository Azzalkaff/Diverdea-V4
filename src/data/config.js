export const categories = ['Productivity', 'Game 2D', 'Social', 'Fintech', 'Health', 'Education', 'E-commerce', 'Utility', 'Services', 'Creative', 'Game 3D', 'Green-Tech', 'Music', 'AI & Data', 'Astrology', 'Travel & Maps', 'Lifestyle', 'Food & Recipe', 'Web3 & Crypto', 'Real Estate', 'Sports & Fitness', 'Pets & Animals', 'Romance & Dating', 'Agri & Nelayan', 'Warung & UMKM', 'Transport & Ojol', 'Religi & Amal', 'Warga & RT/RW', '3d model', 'Otomotif & Bengkel', 'Seni & Budaya', 'Hukum & Advokasi', 'Politik & Kebijakan'];

export const libStacks = {
    'Game 2D': 'Phaser.js, Tone.js, GSAP',
    'Productivity': 'SortableJS, Lucide Icons, Day.js',
    'Fintech': 'Chart.js, Cleave.js (Input Masking), Intl.NumberFormat (Native Currency)',
    'Social': 'Animate.css, Canvas-confetti, Lucide Icons',
    'Health': 'Chart.js, Rough.js (Sketchy Style), GSAP',
    'Education': 'KaTeX (Math), Howler.js (Feedback), Lucide',
    'E-commerce': 'Swiper.js, PhotoSwipe, Lucide Icons',
    'Utility': 'JSZip, FileSaver.js, Web Worker API, Prism.js',
    'Services': 'Leaflet.js (Maps), FullCalendar, Stripe, Day.js',
    'Creative': 'Paper.js (Vector), Howler.js (Audio), Rough.js (Sketchy), GSAP',
    'Game 3D': 'Babylon.js (Engine), GSAP, Lucide (Use native collisions, avoid Havok WASM CDN)',
    'Green-Tech': 'Chart.js, Leaflet.js, GSAP, Lucide',
    'Music': 'Tone.js (Synthesis), Howler.js (Playback), WaveSurfer.js (Waveform), Web Audio API',
    'AI & Data': 'Chart.js, Highlight.js, GSAP (Data Visualization), Lucide',
    'Astrology': 'Three.js (Starmaps), GSAP, Lucide Icons, Anime.js',
    'Travel & Maps': 'Leaflet.js, PhotoSwipe, Day.js, Lucide Icons',
    'Lifestyle': 'Swiper.js, GSAP, Masonry.js, Lucide Icons',
    'Food & Recipe': 'PhotoSwipe, SortableJS, Lucide Icons, GSAP',
    'Web3 & Crypto': 'Ethers.js, Chart.js, GSAP, Lucide Icons',
    'Real Estate': 'Leaflet.js, Swiper.js, PhotoSwipe, Day.js',
    'Sports & Fitness': 'Chart.js, GSAP, Anime.js, Tone.js (Timers)',
    'Pets & Animals': 'Masonry.js, Lottie (Animations), Swiper.js, Lucide Icons',
    'Romance & Dating': 'TinderCards.js / Interact.js, GSAP, Canvas-confetti',
    'Agri & Nelayan': 'Leaflet.js, Chart.js (Cuaca), Workbox (Offline-first), Lucide',
    'Warung & UMKM': 'Intl.NumberFormat (Native Currency), SortableJS, Print.js (Struk), PWA/Offline Support',
    'Transport & Ojol': 'Leaflet.js/Google Maps, Socket.io (Realtime), Turf.js, GSAP',
    'Religi & Amal': 'Day.js (Hijriah/Waktu), AudioContext (Adzan), Swiper.js, Lottie',
    'Warga & RT/RW': 'FullCalendar, Dropzone (Upload KTP), Chart.js (Kas RT), PWA',
    '3d model': 'Three.js, WebGL, GSAP',
    'Otomotif & Bengkel': 'Leaflet.js, FullCalendar, GSAP',
    'Seni & Budaya': 'A-Frame (VR/AR), Three.js, GSAP',
    'Hukum & Advokasi': 'Highlight.js, PDF.js, Quill (Editor)',
    'Politik & Kebijakan': 'Chart.js, D3.js, Leaflet.js'
};

export const categoryPalettes = {
    'Productivity': { hero: '#5B8C5A', neutral: '#2C3E50', accent: '#F0C040', label: 'Forest Focus' },
    'Game 2D':         { hero: '#7B2FBE', neutral: '#0D0D1A', accent: '#00F5FF', label: 'Neon Arcade' },
    'Social':       { hero: '#FF6B6B', neutral: '#2D2D2D', accent: '#FFD93D', label: 'Warm Vibrant' },
    'Fintech':      { hero: '#1A3A6B', neutral: '#0F2027', accent: '#00C896', label: 'Trust & Precision' },
    'Health':       { hero: '#3DBFA0', neutral: '#1A3130', accent: '#B8F2E6', label: 'Calm Wellness' },
    'Education':    { hero: '#3B82F6', neutral: '#1E3A5F', accent: '#F59E0B', label: 'Clarity Blue' },
    'E-commerce':   { hero: '#E53E3E', neutral: '#1A1A2E', accent: '#FF8C42', label: 'Conversion Red' },
    'Utility':      { hero: '#475569', neutral: '#0F172A', accent: '#22D3EE', label: 'Technical Slate' },
    'Services':     { hero: '#4F46E5', neutral: '#1E1B4B', accent: '#06B6D4', label: 'Reliable Indigo' },
    'Creative':     { hero: '#D946EF', neutral: '#2D1B69', accent: '#FBBF24', label: 'Bold Expression' },
    'Game 3D':           { hero: '#3B82F6', neutral: '#020617', accent: '#94A3B8', label: 'Spatial Deep' },
    'Green-Tech':   { hero: '#22C55E', neutral: '#14532D', accent: '#84CC16', label: 'Eco Natural' },
    'Music':        { hero: '#A855F7', neutral: '#1A0533', accent: '#F472B6', label: 'Sonic Neon' },
    'AI & Data':    { hero: '#00D1FF', neutral: '#0B132B', accent: '#FF007A', label: 'Cyber Synth' },
    'Astrology':    { hero: '#6B21A8', neutral: '#020617', accent: '#FDE047', label: 'Mystic Night' },
    'Travel & Maps':{ hero: '#F59E0B', neutral: '#1C1917', accent: '#14B8A6', label: 'Sunset Horizon' },
    'Lifestyle':    { hero: '#E879F9', neutral: '#171717', accent: '#34D399', label: 'Chic Minimal' },
    'Food & Recipe':{ hero: '#EF4444', neutral: '#292524', accent: '#FBBF24', label: 'Spicy Warm' },
    'Web3 & Crypto':    { hero: '#F59E0B', neutral: '#0F172A', accent: '#3B82F6', label: 'Gold Matrix' },
    'Real Estate':      { hero: '#1E40AF', neutral: '#F3F4F6', accent: '#D97706', label: 'Classic Trust' },
    'Sports & Fitness': { hero: '#E11D48', neutral: '#18181B', accent: '#10B981', label: 'Adrenaline Rush' },
    'Pets & Animals':   { hero: '#F472B6', neutral: '#FFFBEB', accent: '#FBBF24', label: 'Soft Paws' },
    'Romance & Dating': { hero: '#BE123C', neutral: '#1C1917', accent: '#FDA4AF', label: 'Passionate Crimson' },
    'Agri & Nelayan':   { hero: '#15803D', neutral: '#1F2937', accent: '#F59E0B', label: 'Bumi Pertiwi' },
    'Warung & UMKM':    { hero: '#D97706', neutral: '#FAFAF9', accent: '#DC2626', label: 'Pasar Rakyat' },
    'Transport & Ojol': { hero: '#16A34A', neutral: '#171717', accent: '#2563EB', label: 'Aspal Jalanan' },
    'Religi & Amal':    { hero: '#059669', neutral: '#064E3B', accent: '#FDE047', label: 'Kubah Emas' },
    'Warga & RT/RW':    { hero: '#0284C7', neutral: '#F1F5F9', accent: '#E11D48', label: 'Birokrasi Cepat' },
    '3d model':         { hero: '#6366F1', neutral: '#0F172A', accent: '#14B8A6', label: 'Cyber 3D' },
    'Otomotif & Bengkel':{ hero: '#EA580C', neutral: '#1C1917', accent: '#EAB308', label: 'Chrome & Oil' },
    'Seni & Budaya':    { hero: '#9D174D', neutral: '#FAF5FF', accent: '#D97706', label: 'Batik Classic' },
    'Hukum & Advokasi': { hero: '#0F172A', neutral: '#F8FAFC', accent: '#3B82F6', label: 'Justice Scale' },
    'Politik & Kebijakan':{ hero: '#B91C1C', neutral: '#FDF8F6', accent: '#4338CA', label: 'National Flag' }
};

export const colorHarmonies = [
    { key: 'complementary',      label: 'Complementary',     icon: 'fa-circle-half-stroke', desc: 'Kontras maksimal — warna berlawanan di color wheel (+180°)' },
    { key: 'analogous',          label: 'Analogous',         icon: 'fa-palette',            desc: 'Harmonis & tenang — warna berdekatan di color wheel (±30°)' },
    { key: 'triadic',            label: 'Triadic',           icon: 'fa-triangle-exclamation',desc: 'Dinamis & seimbang — 3 warna berjarak sama (±120°)' },
    { key: 'split-complementary',label: 'Split Comp',        icon: 'fa-code-fork',          desc: 'Kontras lembut — satu warna + dua di sisi komplementernya (±150°)' },
    { key: 'monochromatic',      label: 'Monochromatic',     icon: 'fa-droplet',            desc: 'Elegan & bersih — variasi brightness & saturation dari satu warna' },
];

export const categoryFocusMap = {
    'Productivity': '- **WORKFLOW ARCHITECTURE:** Focus on "Keyboard-First UX" and Command Palette (Ctrl+K). Implement dynamic priority systems and motivating progress visualization. Use SortableJS for intuitive task management.',
    'Game 2D': `- **THE CORE FUN LOOP (MANDATORY):** Before writing a single line of code, define the 30-second loop: "Player does X → Game responds with Y → Player is motivated to do X again." Every feature must serve this loop. A game that is not fun in 30 seconds will never be fun.

- **PHASER 3 ARCHITECTURAL PATTERNS:**
  - **Arcade Physics Engine:** ALWAYS use \`this.physics.add.sprite\` or \`this.physics.add.group\`. NEVER write custom gravity or collision math. Use \`this.physics.add.collider()\` for boundaries and overlaps.
  - **Input Polling over Events:** Do not use \`window.addEventListener('keydown')\`. ALWAYS use \`this.input.keyboard.addKeys()\` to bind both Arrows and WASD keys. Check key states inside the \`update()\` loop for responsive, delay-free controls. Do not use createCursorKeys() exclusively as it lacks WASD mapping.
  - **Strict Scene Management:** Separate game logic into specific Phaser Scenes: \`BootScene\` (init/UI), \`PlayScene\` (Core Loop), and \`GameOverScene\`. Do not cram everything into one scene object.
  - **Primitive Graphics Only:** Do NOT use \`this.load.image\`. Draw all game objects dynamically using \`Phaser.GameObjects.Graphics\` or \`generateTexture()\` to avoid CORS and missing asset errors.

- **GAME FEEL & ADVANCED JUICE (The "Soul" of the Game):**
  - **Hit-Stop (Impact Freeze):** Pause the game for 2-5 frames (50-100ms) when a heavy hit occurs. This gives a massive sense of power.
  - **Chromatic Aberration & Glitch:** Use post-processing filters during explosions or damage to simulate "reality breaking."
  - **Screen Shake (Contextual):** Not all shakes are equal. Horizontal for hits, vertical for falls, rotational for explosions.
  - **Squash & Stretch (Physics-Based):** Don't just animate it; link it to velocity. A faster-moving object should stretch more.
  - **Ghosting/Motion Blur:** Use alpha-trailing sprites for high-speed characters or projectiles.

- **PSYCHOLOGICAL RETENTION & REWARDS:**
  - **Variable Reward Schedule:** Use "Weighted Randomness" for loot. Not all items have equal chances; rare drops create high dopamine peaks.
  - **The "Near-Miss" Mechanic:** Subtly increase the chance of surviving with 1 HP (invisible health) to create "clutch" moments.
  - **Combo Escalation:** Reward skillful play with escalating visual/audio intensity. At a 10x combo, the music should change or more particles should appear.
  - **Endowed Progress:** Always start the player with a "small win" or a partially completed goal to reduce the barrier to entry.

- **TECHNICAL PERFORMANCE & OPTIMIZATION:**
  - **Object Pooling:** Mandatory for bullets and particles. Reuse memory, don't allocate/deallocate during the loop.
  - **Texture Atlas:** Pack your sprites into a single sheet to reduce draw calls.
  - **Delta-Time (dt):** All movement logic must be \`position += velocity * dt\` to ensure consistent speed across 60Hz and 144Hz monitors.
  - **Audio Manager:** Implement a global volume control and sound priority system (e.g., background music ducks when a loud explosion occurs).

- **PLAYTEST STANDARD:** The game must be playable with one hand (if possible) and explainable in one sentence. Visual clarity is king: gameplay elements must pop against the background.`,
    'Social': '- **SOCIAL DYNAMICS:** Focus on "Optimistic UI" and real-time feedback. Simulate smart notification systems and dynamic social interaction indicators (likes/shares) to create a "Social Proof" effect.',
    'Fintech': '- **FINANCIAL PRECISION:** Prioritize data accuracy and strict input validation. Implement responsive real-time calculators and trend visualization using Chart.js. Use Cleave.js for professional currency masking.',
    'Health': '- **WELLBEING UX:** Use "Calm Design" principles with smooth color transitions. Focus on data privacy, meaningful habit tracking, and easily interpretable health metric visualizations.',
    'Education': '- **COGNITIVE LOAD MGMT:** Focus on information hierarchy to facilitate understanding. Implement Active Recall systems (Quiz/Flashcards) with instant feedback and an achievement system (Gamification) for learning retention.',
    'E-commerce': '- **CONVERSION ENGINE:** Optimize the flow from catalog to checkout. Implement instant product filters, "Trust Signals" in the UI, and transparent transaction process simulation until the receipt appears.',
    'Utility': '- **TECHNICAL EFFICIENCY:** Focus on execution speed and client-side data transformation. Use Web Workers for heavy processes to keep the UI responsive. Provide robust file error handling and accurate progress bars.',
    'Services': '- **SERVICE RELIABILITY:** Focus on a seamless Booking Flow. Integrate interactive maps (Leaflet.js) and a synchronous schedule management system. Ensure service status communication is clearly visible to the user.',
    'Creative': '- **INTERACTIVE CANVAS:** Focus on freedom of expression and low latency in interactions. Implement simple "Non-destructive Editing" features and artwork export. Use Paper.js or Rough.js for artistic aesthetics.',
    'Game 3D': `- **THE CORE 3D LOOP (MANDATORY):** Before writing any code, define the core 3D interaction loop: "Player moves/clicks in 3D space → Physics engine resolves → WebGL renders feedback → Player feels rewarded." Every scene must serve this loop.

- **BABYLON.JS ARCHITECTURAL PATTERNS:**
  - **Native Game Engine Features:** Do not reinvent the wheel. Use Babylon's built-in \`UniversalCamera\` with \`applyGravity = true\` and \`checkCollisions = true\` for immediate FPS controls.
  - **Physics & Collisions:** Use Babylon's native bounding box intersections (\`mesh.intersectsMesh\`), Raycasting, or custom distance math. Avoid Havok WASM CDN due to CORS and async loading instability in single-file prototypes.
  - **Scene Graph Management:** Keep the scene graph flat where possible. Deeply nested parents hurt performance. Use \`scene.onBeforeRenderObservable\` for game logic updates.

- **SPATIAL GAME FEEL & JUICE:**
  - **Camera Shake & Tweening:** Use \`BABYLON.Animation\` or GSAP to animate the camera's FOV on speed boosts or shake the camera position on impact.
  - **Particle Systems:** Use \`BABYLON.ParticleSystem\` for explosions, sparks, or dust trails. Limit the particle count to maintain 60FPS.
  - **Hit-Stop (Time Dilation):** Briefly pause or slow down the 3D game loop (\`scene.animationTimeScale\`) upon a critical hit or explosion.

- **TECHNICAL PERFORMANCE (STRICT 60FPS):**
  - **Object Pooling & Instances:** Never create/destroy meshes during gameplay. Pre-allocate projectiles and enemies. Hide them (\`isVisible = false\`) or use \`InstancedMesh\` if there are dozens of identical objects.
  - **Shadows & Lighting:** Limit \`ShadowGenerator\` to exactly ONE directional light. Bake ambient occlusion if possible, or use a cheap hemisphere light for base illumination.

- **PSYCHOLOGICAL RETENTION & FEEDBACK:**
  - **Spatial Audio:** Implement positional 3D audio (\`BABYLON.Sound\` with \`spatialSound = true\`) so the player can hear where enemies or events are happening before they see them.
  - **Visual Affordance:** Interactive objects MUST stand out from the background via \`EmissiveColor\`, slight pulsing animations, or floating indicators.`,
    'Green-Tech': '- **ECOLOGICAL IMPACT:** Focus on visualizing environmental data clearly and positively. Gamify eco-friendly actions to encourage retention. Use earthy color palettes and emphasize the measurable impact of the user\'s choices.',
    'Music': `- **AUDIO ENGINE FIRST:** The Web Audio API / Tone.js context must be initialized only after a user gesture (click/tap). Always handle the "AudioContext suspended" state gracefully with a visible "Tap to Activate Sound" prompt before any audio feature is rendered.\n\n- **LOW-LATENCY INTERACTION:** Music apps live and die by latency. All real-time interactions (pads, keys, sequencer steps) must use the Web Audio API's internal clock (\`AudioContext.currentTime\`) for scheduling — NEVER use \`setTimeout\` or \`setInterval\` for audio timing, as they are imprecise and will cause timing drift.\n\n- **AUDIO VISUALIZATION (Mandatory):** Every music app must have at least one reactive visual element. Implement an AnalyserNode connected to the audio graph and draw to a \`<canvas>\` using \`requestAnimationFrame\`. Choose one: oscilloscope waveform, frequency bar chart (FFT), or circular spectrum ring.\n\n- **MUSICAL UX PRINCIPLES:**\n  - Color-code notes by pitch class (C=red, D=orange... standard chromatic wheel).\n  - Animate pads/keys on trigger: scale down on press (squash), snap back (stretch). This tactile feedback is critical.\n  - Display BPM prominently with a visual metronome pulse (blinking dot or border flash on every beat).\n  - All playback controls (Play, Stop, Record) must be accessible via keyboard shortcuts (Space = Play/Stop, R = Record).\n\n- **SOUND DESIGN QUALITY:** Use Tone.js synthesizers with polished presets instead of raw oscillators. Apply a Reverb (\`Tone.Reverb\`) and a Limiter (\`Tone.Limiter\`) on the master chain to prevent clipping and give sounds depth. The default sound must feel professional, not like a beep.\n\n- **MUSIC THEORY INTEGRATION:** Where applicable, constrain the UI to a musical scale (e.g., C Major pentatonic for a pad) so that any note the user hits sounds musical. Implement a key/scale selector that remaps the active notes accordingly — this is the single feature that makes a music app feel smart.\n\n- **STATE & PERFORMANCE:** Implement Object Pooling for AudioBufferSourceNodes — never reuse a played node, always create a new one from the pool. Use a \`Worker\` for any heavy DSP computation (e.g., BPM detection, waveform decoding) to keep the main thread free for rendering.`,
    'AI & Data': '- **DATA INTELLIGENCE:** Focus on visualizing complex data simply. Use Chat UI paradigms for interaction and clear markdown rendering for outputs.',
    'Astrology': '- **MYSTICAL EXPERIENCE:** Focus on cosmic, ethereal visuals. Use slow, fluid animations and deep, dark color palettes to convey a sense of mystery and space.',
    'Travel & Maps': '- **EXPLORATION UX:** Focus on location-based interactivity. Rely heavily on map integrations, immersive image galleries, and clear itinerary scheduling.',
    'Lifestyle': '- **AESTHETIC & CURATION:** Prioritize high-quality typography, whitespace, and a masonry layout. The UI should feel like a premium digital magazine.',
    'Food & Recipe': '- **CULINARY INSPIRATION:** Focus on large, appetizing imagery. Implement step-by-step cooking modes with timers and dynamic ingredient measurement adjustments.',
    'Web3 & Crypto': '- **TRUST & VERIFICATION:** Focus on clear transaction states and unchangeable histories. Emphasize security indicators and complex market charts.',
    'Real Estate': '- **VISUAL PRIMACY:** Property images are king. Use large carousels and immersive map integrations. Ensure search filters are extremely detailed.',
    'Sports & Fitness': '- **DYNAMIC ENERGY:** Use high-contrast colors and bold typography. Implement large timers, big numbers, and aggressive gamification to drive motivation.',
    'Pets & Animals': '- **EMOTIONAL CONNECTION:** Use rounded corners, soft colors, and playful micro-animations. The UI should feel friendly and inviting.',
    'Romance & Dating': '- **SWIPE DYNAMICS:** Focus on the card stack UI. Interactions must be fast and heavily rely on gestural swiping. Visuals should be flattering and image-centric.',
    'Agri & Nelayan': '- **KONEKTIVITAS RENDAH:** Harus "Offline-first". Prioritaskan ikon besar, bahasa daerah jika perlu, dan fungsionalitas di area minim sinyal.',
    'Warung & UMKM': '- **KECEPATAN KASIR:** Fokus pada UI Kasir yang bisa di-tap tanpa melihat. Warna kontras tinggi untuk membedakan hutang dan lunas.',
    'Transport & Ojol': '- **PELACAKAN REAL-TIME:** Fokus pada peta (Leaflet) dan status pemesanan. Komunikasi driver-penumpang harus jelas dan satu ketukan.',
    'Religi & Amal': '- **KETENANGAN & PRIVASI:** Desain antarmuka yang bersih, tipografi Arab/lokal yang mudah dibaca, dan gamifikasi ibadah/donasi yang tidak memaksa.',
    'Warga & RT/RW': '- **TRANSPARANSI KAS:** Tampilkan grafik keuangan warga secara terbuka. Form laporan harus instan, dukung unggah foto bukti dengan kompresi.',
    '3d model': '- **INTERAKTIVITAS 3D:** Fokus pada navigasi ruang 3D yang mulus. Gunakan pencahayaan yang dramatis dan feedback visual saat objek di-klik.',
    'Otomotif & Bengkel': '- **FOKUS UTILITAS:** Tampilan harus jelas dan terbaca di bawah sinar matahari (high contrast). Gunakan ikon suku cadang dan mobil yang familiar.',
    'Seni & Budaya': '- **ESTETIKA TRADISIONAL MODERN:** Gunakan ornamen motif lokal sebagai aksen, dengan tipografi yang elegan. Harus terasa seperti galeri seni.',
    'Hukum & Advokasi': '- **PROFESIONAL & TERPERCAYA:** Desain harus bersih, minimalis, dan sangat aman. Gunakan warna navy atau abu-abu untuk memberi kesan serius dan rahasia.',
    'Politik & Kebijakan': '- **DATA DRIVEN:** Harus menyajikan data polling atau anggaran dengan chart yang sangat interaktif dan mudah dipahami oleh masyarakat awam.'
};
