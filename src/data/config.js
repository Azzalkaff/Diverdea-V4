export const categories = ['Productivity', 'Game 2D', 'Social', 'Fintech', 'Health', 'Education', 'E-commerce', 'Utility', 'Services', 'Creative', 'Game 3D', 'Green-Tech', 'Music', 'AI & Data', 'Astrology', 'Travel & Maps', 'Lifestyle', 'Food & Recipe', 'Web3 & Crypto', 'Real Estate', 'Sports & Fitness', 'Pets & Animals', 'Romance & Dating', 'Agri & Nelayan', 'Warung & UMKM', 'Transport & Ojol', 'Religi & Amal', 'Warga & RT/RW', '3d model', 'Otomotif & Bengkel', 'Seni & Budaya', 'Hukum & Advokasi', 'Politik & Kebijakan', 'Mental Health', 'News & Media', 'Event & Ticketing', 'Job & Career', 'Photography', 'IoT & Smart Home', 'Marketplace', 'Community & Forum', 'Kids & Parenting', 'Language Learning', 'AR & Spatial', 'Cybersecurity', 'Entertainment', 'Personal Finance', 'Fashion & Beauty', 'Volunteer & NGO', 'E-Government'];

/**
 * categoryGroups — Two-level taxonomy for low-cognitive-load category selection.
 * Follows Miller's Law: 9 top-level groups, each with ≤7 subcategories.
 * Ordered by frequency of appearance in hackathons & student projects.
 */
export const categoryGroups = [
    {
        id: 'tech',
        label: 'Tech & Tools',
        icon: 'fa-microchip',
        color: '#22D3EE',
        description: 'Developer tools, AI, security & emerging tech',
        items: ['Productivity', 'Utility', 'AI & Data', 'Cybersecurity', 'IoT & Smart Home', 'AR & Spatial', '3d model']
    },
    {
        id: 'games',
        label: 'Games & XR',
        icon: 'fa-gamepad',
        color: '#A855F7',
        description: 'Games, interactive experiences & spatial computing',
        items: ['Game 2D', 'Game 3D', 'AR & Spatial', 'Creative']
    },
    {
        id: 'finance',
        label: 'Finance & Commerce',
        icon: 'fa-wallet',
        color: '#10B981',
        description: 'Fintech, e-commerce, marketplace & personal budgeting',
        items: ['Fintech', 'E-commerce', 'Marketplace', 'Personal Finance', 'Warung & UMKM', 'Web3 & Crypto']
    },
    {
        id: 'social',
        label: 'Social & Community',
        icon: 'fa-users',
        color: '#F59E0B',
        description: 'Social networks, forums, dating & civic tools',
        items: ['Social', 'Community & Forum', 'Romance & Dating', 'Volunteer & NGO', 'Warga & RT/RW', 'E-Government']
    },
    {
        id: 'education',
        label: 'Education & Growth',
        icon: 'fa-graduation-cap',
        color: '#3B82F6',
        description: 'Learning, language, career & children\'s apps',
        items: ['Education', 'Language Learning', 'Kids & Parenting', 'Job & Career', 'Sports & Fitness']
    },
    {
        id: 'health',
        label: 'Health & Lifestyle',
        icon: 'fa-heart-pulse',
        color: '#EC4899',
        description: 'Healthcare, mental wellness, food & lifestyle',
        items: ['Health', 'Mental Health', 'Food & Recipe', 'Lifestyle', 'Fashion & Beauty', 'Pets & Animals']
    },
    {
        id: 'creative',
        label: 'Creative & Media',
        icon: 'fa-wand-magic-sparkles',
        color: '#F472B6',
        description: 'Art, music, photography, news & entertainment',
        items: ['Creative', 'Music', 'Photography', 'Entertainment', 'News & Media', 'Seni & Budaya', 'Astrology']
    },
    {
        id: 'realworld',
        label: 'Real World & Services',
        icon: 'fa-location-dot',
        color: '#34D399',
        description: 'Maps, travel, real estate, events & on-demand services',
        items: ['Services', 'Travel & Maps', 'Real Estate', 'Event & Ticketing', 'Green-Tech', 'Transport & Ojol']
    },
    {
        id: 'lokal',
        label: 'Lokal Indonesia',
        icon: 'fa-flag',
        color: '#EF4444',
        description: 'Kategori khusus pasar & konteks lokal Indonesia',
        items: ['Agri & Nelayan', 'Warung & UMKM', 'Transport & Ojol', 'Religi & Amal', 'Otomotif & Bengkel', 'Hukum & Advokasi', 'Politik & Kebijakan']
    },
];


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
    'Politik & Kebijakan': 'Chart.js, D3.js, Leaflet.js',
    'Mental Health': 'Tone.js (ambient), GSAP, Chart.js (mood graphs), Lucide Icons',
    'News & Media': 'Marked.js (Markdown), DOMPurify, Swiper.js, Lucide Icons',
    'Event & Ticketing': 'FullCalendar, QRCode.js, Day.js, Lucide Icons',
    'Job & Career': 'Quill (Rich Text Editor), Chart.js, Day.js, Lucide Icons',
    'Photography': 'Fabric.js (Canvas editing), Cropper.js, FileSaver.js, Lucide Icons',
    'IoT & Smart Home': 'Chart.js (real-time), GSAP, Tone.js (alerts), Lucide Icons',
    'Marketplace': 'Swiper.js, PhotoSwipe, Intl.NumberFormat (Native), Lucide Icons',
    'Community & Forum': 'Marked.js, DOMPurify, Prism.js (syntax highlight), Lucide Icons',
    'Kids & Parenting': 'Howler.js (audio), GSAP, Canvas API, Lottie (Animations via CDN)',
    'Language Learning': 'Howler.js (pronunciation), GSAP, Chart.js (progress), Lucide Icons',
    'AR & Spatial': 'Three.js (3D overlay), AR.js (marker-based AR), GSAP, Lucide Icons',
    'Cybersecurity': 'CryptoJS (hashing/encrypt), Zxcvbn (password strength), Chart.js, Lucide Icons',
    'Entertainment': 'Swiper.js, Plyr.js (video player), GSAP, Lucide Icons',
    'Personal Finance': 'Chart.js, Intl.NumberFormat (Native), Day.js, Lucide Icons',
    'Fashion & Beauty': 'Swiper.js, PhotoSwipe, Masonry.js, Lucide Icons',
    'Volunteer & NGO': 'Leaflet.js (Maps), Chart.js (impact), Day.js, Lucide Icons',
    'E-Government': 'jsPDF (PDF export), QRCode.js, Chart.js, Lucide Icons',
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
    'Politik & Kebijakan':{ hero: '#B91C1C', neutral: '#FDF8F6', accent: '#4338CA', label: 'National Flag' },
    'Mental Health':      { hero: '#7C3AED', neutral: '#1E1B2E', accent: '#34D399', label: 'Calm Violet' },
    'News & Media':       { hero: '#18181B', neutral: '#F8FAFC', accent: '#EF4444', label: 'Press Black' },
    'Event & Ticketing':  { hero: '#9D2449', neutral: '#1C0811', accent: '#FB923C', label: 'Stage Glow' },
    'Job & Career':       { hero: '#1D4ED8', neutral: '#0F172A', accent: '#22D3EE', label: 'Career Blue' },
    'Photography':        { hero: '#18181B', neutral: '#09090B', accent: '#F59E0B', label: 'Dark Frame' },
    'IoT & Smart Home':   { hero: '#0891B2', neutral: '#083344', accent: '#67E8F9', label: 'Cyber Teal' },
    'Marketplace':        { hero: '#16A34A', neutral: '#052E16', accent: '#FCD34D', label: 'Market Fresh' },
    'Community & Forum':  { hero: '#FF4500', neutral: '#1A1A1B', accent: '#FF6534', label: 'Forum Fire' },
    'Kids & Parenting':   { hero: '#F59E0B', neutral: '#FFFBEB', accent: '#EC4899', label: 'Playful Sun' },
    'Language Learning':  { hero: '#059669', neutral: '#022C22', accent: '#6EE7B7', label: 'Lingua Green' },
    'AR & Spatial':       { hero: '#8B5CF6', neutral: '#0C0A1E', accent: '#06B6D4', label: 'Hologram Violet' },
    'Cybersecurity':      { hero: '#10B981', neutral: '#0A0F0D', accent: '#F43F5E', label: 'Matrix Green' },
    'Entertainment':      { hero: '#E11D48', neutral: '#0F0A13', accent: '#A855F7', label: 'Screen Red' },
    'Personal Finance':   { hero: '#0284C7', neutral: '#0C4A6E', accent: '#34D399', label: 'Budget Clear' },
    'Fashion & Beauty':   { hero: '#EC4899', neutral: '#1F0A16', accent: '#F9A8D4', label: 'Haute Rose' },
    'Volunteer & NGO':    { hero: '#16A34A', neutral: '#F0FDF4', accent: '#FBBF24', label: 'Impact Green' },
    'E-Government':       { hero: '#1E3A8A', neutral: '#EFF6FF', accent: '#DC2626', label: 'Garuda Blue' },
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
    'Politik & Kebijakan': '- **DATA DRIVEN:** Harus menyajikan data polling atau anggaran dengan chart yang sangat interaktif dan mudah dipahami oleh masyarakat awam.',
    'Mental Health': '- **TRAUMA-INFORMED DESIGN:** Setiap interaksi harus terasa aman dan non-judgmental. Hindari warna merah mencolok dan pola "urgent". Gunakan transisi halus dan micro-copy yang affirming.\n\n- **CRISIS SAFETY (MANDATORY):** Selalu sertakan tombol akses cepat ke hotline (contoh: 119 ext 8) yang dapat dijangkau dalam ≤ 2 tap dari layar mana pun.\n\n- **CBT-INFORMED UX:** Bangun fitur berdasarkan teknik berbasis bukti: Thought Record (situasi → pikiran → perasaan → respons), Mood Journal dengan visualisasi tren, dan Guided Breathing dengan animasi visual.\n\n- **DATA PRIVACY:** Semua data jurnal/mood HARUS tersimpan lokal (LocalStorage/IndexedDB). Tampilkan indikator privasi yang jelas.',
    'News & Media': '- **READING UX:** Optimalkan untuk membaca artikel panjang: pilihan font serif, estimated read time, dan reading progress indicator. Implementasikan "Focus Mode" yang menyembunyikan semua UI chrome.\n\n- **CONTENT ARCHITECTURE:** Bangun skema artikel yang proper (headline, lede, body, tags, tanggal). Implementasikan filter berbasis kategori dan pencarian dengan keyword highlighting.\n\n- **PERSONALIZATION:** Bangun preference tracker sederhana berbasis riwayat baca (LocalStorage) untuk memunculkan rekomendasi "More Like This" via tag-matching.\n\n- **OFFLINE SUPPORT:** Cache 20 artikel terakhir di LocalStorage untuk dibaca offline. Gunakan skeleton loading state untuk setiap card.',
    'Event & Ticketing': '- **BOOKING FLOW:** Proses pembelian tiket harus selesai dalam ≤ 3 langkah. Tampilkan jumlah kursi tersisa secara real-time untuk menciptakan urgensi.\n\n- **QR TICKET:** Gunakan QRCode.js untuk menghasilkan QR unik per tiket berisi event ID + ticket ID + timestamp. Tampilkan receipt modal yang bisa di-print dengan QR dan detail acara.\n\n- **ORGANIZER DASHBOARD:** Buat tampilan organizer dengan grafik penjualan tiket real-time (Chart.js), tabel peserta, dan mode Check-in Scanner menggunakan kamera perangkat + validasi QR.',
    'Job & Career': '- **JOB DISCOVERY UX:** Bangun antarmuka swipeable job card (Tinder-style) sebagai layer discovery. Implementasikan "Quick Apply" dengan template profil yang pre-filled.\n\n- **RESUME BUILDER:** Buat WYSIWYG resume builder dengan template bersih dan real-time PDF preview. Export ke PDF menggunakan jsPDF. Support section: Pengalaman, Pendidikan, Skill, Proyek.\n\n- **ATS OPTIMIZER:** Bangun keyword analyzer yang membandingkan teks resume dengan deskripsi pekerjaan, menyoroti kata kunci yang hilang.\n\n- **CAREER PIPELINE:** Dashboard yang menampilkan pipeline lamaran (Applied → Screening → Interview → Offer) dengan chart response rate.',
    'Photography': '- **CANVAS-FIRST ARCHITECTURE:** Semua operasi editing HARUS berjalan di HTML5 Canvas resolusi tinggi (gunakan devicePixelRatio). Fabric.js adalah layer abstraksi yang direkomendasikan.\n\n- **FILTER PIPELINE:** Implementasikan CSS + Canvas filter pipeline yang non-destructive. Rantai filter: Brightness, Contrast, Saturation, Hue-Rotate, Blur, Sharpen. Tampilkan before/after toggle.\n\n- **PERFORMANCE:** Operasi canvas harus tetap di 60fps. Gunakan OffscreenCanvas atau Web Worker untuk operasi berat. Implement undo/redo stack dengan command pattern.',
    'IoT & Smart Home': '- **REAL-TIME DASHBOARD:** Simulasikan WebSocket feed (setInterval) untuk memperbarui grafik sensor secara live (Chart.js streaming). Warna widget berubah berdasarkan threshold (hijau/kuning/merah).\n\n- **DEVICE CONTROL:** Bangun toggle panel untuk setiap perangkat dengan status visual yang jelas (ON/OFF, aktif/tidak aktif). Implementasikan aturan otomasi sederhana (if X > threshold → trigger Y).\n\n- **ALERT SYSTEM:** Kirim toast notification + sinyal audio (Tone.js) ketika sensor melampaui batas kritis. Tampilkan log alert dengan timestamp.',
    'Marketplace': '- **TRUST & SAFETY:** Tampilkan badge verifikasi penjual, rating, dan jumlah transaksi berhasil secara prominan. Implementasikan sistem escrow sederhana (Uang ditahan → Konfirmasi penerima → Cair).\n\n- **PRODUCT LISTING:** Bangun form upload produk multi-foto (mock). Implementasikan filter cerdas (harga, lokasi, kondisi baru/bekas, kategori).\n\n- **MESSAGING:** Integrasi mock chat antara pembeli dan penjual di dalam halaman produk. Tampilkan "Sedang dilihat oleh X orang" untuk urgency.',
    'Community & Forum': '- **THREAD ARCHITECTURE:** Bangun sistem thread bersarang (parent reply → child replies) dengan pagination. Gunakan Marked.js + DOMPurify untuk rendering markdown yang aman di body post.\n\n- **VOTING SYSTEM:** Implementasikan upvote/downvote dengan perubahan sort order real-time (hot/top/new). Tampilkan karma/reputasi poin per user.\n\n- **CODE HIGHLIGHT:** Gunakan Prism.js untuk syntax highlighting di code block. Implementasikan tombol "Copy code" satu klik.',
    'Kids & Parenting': '- **AGE-APPROPRIATE UX:** Gunakan target sentuh ≥ 56px (lebih besar dari standar), font bulat dan ramah (Nunito, Baloo), warna cerah pastel, dan bahasa yang sangat sederhana.\n\n- **PARENTAL CONTROLS:** Bangun PIN lock untuk area pengaturan orang tua. Implementasikan timer sesi dengan notifikasi lembut saat waktu belajar/bermain habis.\n\n- **GAMIFICATION ANAK:** Gunakan sistem bintang/stiker sebagai reward. Animasikan reward dengan Lottie atau GSAP particles. Hindari mekanisme kompetitif antar anak.',
    'Language Learning': '- **SPACED REPETITION (MANDATORY):** Implementasikan algoritma SuperMemo-2 (atau simplified SM-2) untuk menjadwalkan ulang kartu berdasarkan tingkat ingatan. Ini adalah fitur inti yang membedakan dari flashcard biasa.\n\n- **PRONUNCIATION FEEDBACK:** Gunakan Web Speech API (recognition) untuk menangkap pengucapan pengguna dan membandingkannya dengan target. Tampilkan skor akurasi.\n\n- **GAMIFIED STREAKS:** Hitung streak harian. Animasikan milestone streak (7 hari, 30 hari) dengan confetti. Tampilkan grafik kemajuan per kosakata/topik.',
    'AR & Spatial': '- **MARKER-BASED AR:** Gunakan AR.js dengan marker Hiro atau custom marker untuk memicu overlay 3D. Fallback ke tampilan kamera biasa jika WebXR tidak didukung.\n\n- **3D OVERLAY QUALITY:** Gunakan Three.js untuk objek 3D yang dirender di atas feed kamera. Pastikan objek mengikuti marker dengan smooth tracking. Implementasikan hit-testing sederhana.\n\n- **PERFORMANCE:** AR adalah berat secara komputasi. Batasi polygon count (<5k). Gunakan requestAnimationFrame dengan delta-time. Tampilkan FPS counter di corner.',
    'Cybersecurity': '- **ZERO PLAINTEXT RULE:** DILARANG menyimpan password atau data sensitif dalam plaintext. Gunakan CryptoJS (SHA-256 hashing, AES-256 encryption) untuk semua operasi kriptografi.\n\n- **PASSWORD STRENGTH:** Gunakan Zxcvbn untuk analisis kekuatan password real-time. Tampilkan meter visual (Weak/Fair/Strong/Very Strong) dengan penjelasan spesifik.\n\n- **SECURITY AUDIT UX:** Buat tampilan "Security Dashboard" yang menampilkan skor keamanan keseluruhan, daftar kelemahan teridentifikasi, dan langkah remediasi yang actionable.',
    'Entertainment': '- **CONTENT CATALOG UX:** Bangun grid konten bergaya Netflix dengan hover preview card. Implementasikan infinite scroll dengan virtualized list untuk katalog besar.\n\n- **WATCHLIST & PROGRESS:** Simpan status tontonan (Belum Ditonton/Sedang Ditonton/Selesai) + episode progress di LocalStorage. Tampilkan badge "Continue Watching" di homepage.\n\n- **RECOMMENDATION ENGINE:** Bangun rekomendasi berbasis genre/tag-matching sederhana dari riwayat tontonan. Tampilkan "Karena kamu suka X" section.',
    'Personal Finance': '- **ZERO-ERROR ARITHMETIC:** Gunakan Intl.NumberFormat untuk semua tampilan mata uang. Implementasikan kalkulasi dengan integer cents (bukan float) untuk menghindari floating-point errors.\n\n- **BUDGET VISUALIZATION:** Tampilkan pie chart pengeluaran per kategori (Chart.js) yang update secara real-time saat transaksi ditambahkan. Gunakan warna kategori yang konsisten.\n\n- **SAVINGS GOALS:** Bangun modul savings goal dengan progress bar, proyeksi tanggal pencapaian berdasarkan rata-rata tabungan, dan motivational milestone celebrations.',
    'Fashion & Beauty': '- **VISUAL PRIMACY:** Gambar produk adalah raja. Gunakan rasio aspek konsisten (square 1:1 untuk produk, portrait 4:5 untuk outfit). Implementasikan zoom gambar on-tap dan swipe gallery.\n\n- **OUTFIT PLANNER:** Bangun virtual closet di mana user bisa mengunggah/memilih item pakaian dan mengombinasikannya menjadi outfit. Simpan kombinasi outfit favorit.\n\n- **TREND & INSPIRATION:** Tampilkan mood board berbasis Masonry layout. Implementasikan sistem tag/label (Casual, Formal, Streetwear) untuk filtering cepat.',
    'Volunteer & NGO': '- **IMPACT TRANSPARENCY:** Tampilkan counter dampak secara real-time (orang terbantu, jam volunteer, donasi terkumpul) dengan animasi counter angka yang memotivasi.\n\n- **VOLUNTEER MATCHING:** Bangun sistem pencocokan volunteer dengan kegiatan berdasarkan skill, lokasi (Leaflet), dan ketersediaan jadwal. Tampilkan peta sebaran kegiatan.\n\n- **DONATION TRACKING:** Implementasikan progress bar donasi per kampanye dengan notifikasi milestone (25%, 50%, 75%, 100%). Tampilkan breakdown penggunaan dana secara transparan.',
    'E-Government': '- **AKSESIBILITAS UNIVERSAL:** Harus memenuhi standar aksesibilitas tinggi: rasio kontras ≥ 4.5:1, ukuran font minimum 16px, dukungan keyboard penuh, dan label ARIA yang komprehensif.\n\n- **FORM DIGITIZATION:** Bangun form multi-step dengan validasi real-time, auto-save progress, dan upload dokumen (KTP, KK) dengan kompresi gambar. Generate PDF resmi menggunakan jsPDF.\n\n- **STATUS TRACKING:** Implementasikan sistem pelacakan permohonan (Diajukan → Diverifikasi → Diproses → Selesai) dengan notifikasi status dan estimasi waktu penyelesaian.',
};
