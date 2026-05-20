import { categories, libStacks, categoryPalettes, colorHarmonies, categoryFocusMap, categoryGroups } from './data/config.js';
import { generalMechanics, conceptsList1, conceptsListLateral } from './data/mechanics.js';
import { generalProducts, conceptsList2 } from './data/products.js';
import { conceptsList3, targetAudiences, constraints, externalAPIs, deviceCapabilities } from './data/extras.js';
import { AudioEngine } from './core/audioEngine.js';
import { ColorEngine } from './core/colorEngine.js';
import { SynthesisEngine } from './core/synthesisEngine.js';
import { PromptComposer } from './core/promptComposer.js';
import { AIEngine, AIStorage, AI_PROVIDERS, DOMAIN_SYSTEM_PROMPTS } from './core/aiEngine.js';

// --- TAILWIND CONFIGURATION ---
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            colors: {
                'matcha': '#9cb48c',
                'matcha-dark': '#1a1c18',
                'matcha-surface': '#232620',
                'cream': '#fdfcf9',
                'cream-dark': '#f4f2e6',
                'cream-dim': '#b5bcad',
                'oatmeal': '#d5d0c4',
            }
        }
    }
};

const { createApp } = Vue;

createApp({
    data() {
        return {
            // Sidebar UI Accordions
            sidebarOpenSections: {
                engine: true,
                composition: false,
                uxEssentials: false,
                techIntegrations: false,
                branding: false
            },

            // App State
            synthesisMode: 'standard',
            generatedIdea: true,
            savedIdeas: [],
            isFocusMode: false,
            isDarkMode: false,
            appName: 'NeoZen',
            selectedCategory: 'Productivity',
            secondaryCategory: 'None',
            customDirectives: '',
            lateralCategory: 'Game 2D',
            isCustomPrimary: false,
            customPrimaryCategory: '',
            isCustomSecondary: false,
            customSecondaryCategory: '',
            promptMode: 'standard',
            generatedPrompt: '',
            audioInitialized: false,
            
            // Debug & Trace System
            isDebugMode: false,
            lastPerf: 0,
            errorLog: [],
            traceLog: [],
            
            // AI Settings
            showSettingsModal: false,
            aiProvider: AIStorage.load('provider') || 'groq',
            aiGroqKey: AIStorage.load('groqKey'),
            aiGeminiKey: AIStorage.load('geminiKey'),
            aiModel: '',
            aiDomain: 'general',
            aiResponse: '',
            aiLoading: false,
            aiError: '',
            aiAbortCtrl: null,
            AI_PROVIDERS,

            // AI Idea Validator
            validationResult: null,
            isValidating: false,

            // 2-Step Prompt Chain
            aiCurrentStep: 0,
            aiPlanResult: null,
            
            // Generated Project AI Settings
            projectUseAI: AIStorage.load('projectUseAI') === 'true',
            projectAiApi: AIStorage.load('projectAiApi') || 'gemini',
            projectAiModalities: JSON.parse(AIStorage.load('projectAiModalities') || '[]'),
            
            // AI Planner State
            aiProblemInput: '',
            aiSolving: false,
            aiStatusText: '',
            aiProgressInterval: null,
            aiSuggestedConcepts: [],
            aiPreviewConcept: null,
            aiHistory: [],
            aiSelectedMethod: 'problem',

            // High-impact output controls (AI feedback loop)
            appComplexity: 'medium',   // 'simple' | 'medium' | 'advanced'
            appPlatform: 'mobile',     // 'mobile' | 'desktop' | 'pwa'
            appLanguage: 'id',         // 'id' | 'en' | 'bilingual'
            appBusinessModel: 'free',  // 'free' | 'freemium' | 'subscription' | 'onetime'
            appDesignStyle: 'minimalist',
            appPrimaryFont: 'Inter',
            appSecondaryFont: 'Inter',
            appWritingStyle: 'informatif',
            appColorMode: 'dark', // 'dark' | 'light' | 'pastel' | 'vibrant'
            
            // New Advanced Settings
            appTypographyWeight: 'balanced', // 'thin' | 'balanced' | 'bold'
            appTypographyColor: 'tinted',    // 'monochrome' | 'tinted' | 'colorful'
            appImageSource: 'unsplash',      // 'none' | 'picsum' | 'unsplash' | 'dicebear' | 'svg-inline'
            appBackgroundStyle: 'solid',     // 'solid' | 'soft-gradient' | 'mesh-gradient' | 'svg-pattern' | 'image-overlay'
            appOnboardingStyle: 'carousel',  // 'carousel' | 'bottom-sheet' | 'tooltip' | 'chatbot'
            appOnboardingSlides: 3,          // 1 to 5

            synthesisModes: [
                { id: 'general', label: 'Quick Mix', title: 'Acak cepat tanpa aturan khusus' },
                { id: 'standard', label: 'Balanced', title: 'Kombinasi seimbang dari domain yang dipilih' },
                { id: 'lateral', label: 'Wild Ideas', title: 'Ide silang domain yang lebih berani' },
                { id: 'manual', label: 'Manual', title: 'Anda mengisi setiap slot sendiri' },
                { id: 'ai', label: 'AI Planner', title: 'AI merancang 3 konsep dari masalah/ide Anda' }
            ],
            aiTweakInput: '',
            aiTweaking: false,
            isRecordingProblem: false,
            isRecordingTweak: false,
            activeSpeechRecognition: null,
            
            // Unified State
            productSlot: { value: '', locked: false },
            mechanicSlots: Array.from({ length: 5 }, () => ({ value: '', locked: false })),
            styleSlots: Array.from({ length: 5 }, () => ({ value: '', locked: false })),
            audienceSlots: Array.from({ length: 5 }, () => ({ value: '', locked: false })),
            constraintSlots: Array.from({ length: 5 }, () => ({ value: '', locked: false })),
            navigationSlots: Array.from({ length: 5 }, () => ({ value: '', locked: false })),

            // Configuration
            mechanicCount: 2,
            styleCount: 1,
            audienceCount: 1,
            constraintCount: 1,
            navigationCount: 3,
            useNavigation: true,
            navigationPosition: 'left',
            useThirdConcept: false,
            useAudience: false,
            useConstraint: false,
            useAPI: false,
            useHardware: false,
            selectedAPIs: [],
            selectedHardware: [],
            customAPI: '',
            customHardware: '',
            projectThemeMode: 'both',
            createLogo: false,
            createAudio: false,
            useAnimations: true,
            useCharts: false,
            minimalMockData: true,

            // CRUD & Navigation
            showCrudModal: false,
            modalCategory: 'Productivity',
            targetListForCustom: 'conceptsList1',
            newCustomConcept: '',
            editingSlot: null,
            editingValue: '',
            currentFocus: { type: 'product', index: 0 },
            
            // UI State
            color1: '#9cb48c',
            color2: '#3a3c39',
            color3: '#f0efe9',
            activeHarmony: '',
            orbAnimations: [],

            // Data Pools
            categories, libStacks, generalMechanics, generalProducts, 
            conceptsList1, conceptsListLateral, conceptsList2, conceptsList3, 
            targetAudiences, constraints, externalAPIs, deviceCapabilities,
            categoryPalettes, colorHarmonies, categoryFocusMap,

            // Category Group Picker
            categoryGroups,
            selectedCategoryGroup: null,

            // Layout State
            isLeftSidebarOpen: true,
            leftSidebarWidth: 280,        // px, clamp: 200–480
            isLibrarySidebarOpen: true,
        };
    },
    computed: {
        activeUxEssentialsCount() {
            let count = 0;
            if (this.useThirdConcept) count++;
            if (this.useAudience) count++;
            if (this.useConstraint) count++;
            if (this.useNavigation) count++;
            if (this.createLogo) count++;
            if (this.useAnimations) count++;
            return count;
        },
        activeTechIntegrationsCount() {
            let count = 0;
            if (this.useAPI) count++;
            if (this.useHardware) count++;
            if (this.createAudio) count++;
            if (this.useCharts) count++;
            if (this.minimalMockData) count++;
            if (this.projectUseAI) count++;
            return count;
        },
        pools() {
            return {
                mechanic: this.getMechanicPool(),
                product: this.getProductPool(),
                style: this.conceptsList3,
                audience: this.targetAudiences,
                constraint: this.constraints,
                navigation: ['Dashboard', 'Analytics', 'History', 'Scanner', 'Settings', 'Profile', 'Map', 'Character', 'About', 'Calendar', 'Notifications', 'Messages']
            };
        },
        aiPlaceholder() {
            if (this.aiSelectedMethod === 'problem') {
                return "Ceritakan masalah Anda di sini secara detail (contoh: 'Saya sering kelupaan jadwal minum obat harian karena padatnya pekerjaan kantor, butuh sesuatu yang memaksa/mengingatkan saya dengan cara yang menyenangkan')...";
            } else if (this.aiSelectedMethod === 'domain') {
                return "Ketik domain ilmu atau subyek spesifik di sini (contoh: 'Astronomi/Fisika Angkasa', 'Psikologi Behavioral', 'Sejarah Kuno')...";
            } else if (this.aiSelectedMethod === 'evolve') {
                return "Ketik konsep dasar aplikasi/game Anda di sini (contoh: 'Aplikasi pencatatan keuangan sederhana', 'Game 2D platformer melompati rintangan')...";
            }
            return "Ketik di sini...";
        },

        // === REAL-TIME CONFIG SUMMARY ===
        // Generates a plain-language sentence reflecting the current AI settings.
        // This is the "feedback loop" that tells users what their toggles actually do.
        aiConfigSummary() {
            const platformLabels = { mobile: 'Mobile-First', desktop: 'Desktop', pwa: 'PWA' };
            const complexityLabels = { simple: '1-2 fitur fokus', medium: '3-4 fitur', advanced: '4-5 fitur kaya' };
            const langLabels = { id: 'Bahasa Indonesia', en: 'Bahasa Inggris', bilingual: 'bilingual ID & EN' };
            const businessLabels = { free: 'gratis', freemium: 'freemium', subscription: 'berlangganan', onetime: 'beli sekali' };
            const themeLabels = { dark: 'tema gelap saja', light: 'tema terang saja', both: 'tema gelap & terang' };
            const outputLabels = { standard: 'satu file HTML', master: 'proyek multi-file' };
            const designLabels = { 'very-minimalist': 'sangat minimalis', minimalist: 'minimalis', modern: 'modern', playful: 'playful', corporate: 'korporat', brutalist: 'brutalis', glassmorphism: 'glassmorphism' };
            const writingLabels = { 'sangat-singkat': 'sangat singkat', singkat: 'singkat', informatif: 'informatif', deskriptif: 'deskriptif', persuasif: 'persuasif', humoris: 'humoris', formal: 'formal' };

            const domain = this.isCustomPrimary && this.customPrimaryCategory
                ? this.customPrimaryCategory
                : this.selectedCategory;

            const secondary = (this.isCustomSecondary && this.customSecondaryCategory)
                ? ` + ${this.customSecondaryCategory}`
                : (this.secondaryCategory && this.secondaryCategory !== 'None' ? ` + ${this.secondaryCategory}` : '');

            const traits = [];
            traits.push(`<strong>${platformLabels[this.appPlatform]}</strong>`);
            traits.push(`model <strong>${businessLabels[this.appBusinessModel]}</strong>`);
            traits.push(`<strong>${this.mechanicCount} fitur</strong>`);
            traits.push(`kompleksitas <strong>${complexityLabels[this.appComplexity]}</strong>`);
            traits.push(`<strong>${themeLabels[this.projectThemeMode]}</strong>`);
            traits.push(`output <strong>${outputLabels[this.promptMode]}</strong>`);
            traits.push(`bahasa <strong>${langLabels[this.appLanguage]}</strong>`);
            traits.push(`gaya desain <strong>${designLabels[this.appDesignStyle] || this.appDesignStyle}</strong>`);
            traits.push(`font <strong>${this.appPrimaryFont}/${this.appSecondaryFont}</strong>`);
            traits.push(`copywriting <strong>${writingLabels[this.appWritingStyle] || this.appWritingStyle}</strong>`);

            const extras = [];
            if (this.useNavigation) extras.push(`${this.navigationCount} halaman`);
            if (this.useAudience) extras.push('audiens khusus');
            if (this.useConstraint) extras.push('batasan desain');
            if (this.useThirdConcept) extras.push('gaya visual');
            if (this.useAPI && this.selectedAPIs.length) extras.push(this.selectedAPIs.slice(0, 2).join(', '));
            if (this.useHardware && this.selectedHardware.length) extras.push(this.selectedHardware[0]);
            if (this.useCharts) extras.push('grafik data');
            if (this.projectUseAI) extras.push(`AI bawaan (${this.projectAiApi})`);
            if (this.createAudio) extras.push('efek suara');
            if (this.minimalMockData) extras.push('data contoh cepat');
            extras.push(`bg ${this.appBackgroundStyle.replace('-', ' ')}`);

            let summary = `AI akan merancang aplikasi <strong>${domain}${secondary}</strong> — ${traits.join(', ')}`;
            if (extras.length) summary += `, plus <strong>${extras.join(', ')}</strong>`;
            summary += `. (Gambar: ${this.appImageSource}, Onboarding: ${this.appOnboardingSlides} slide ${this.appOnboardingStyle})`;
            return summary;
        }
    },
    methods: {
        // --- LAYOUT ---
        startSidebarResize(e) {
            e.preventDefault();
            const startX = e.clientX;
            const startWidth = this.leftSidebarWidth;
            const onMove = (e) => {
                const delta = e.clientX - startX;
                this.leftSidebarWidth = Math.min(480, Math.max(200, startWidth + delta));
            };
            const onUp = () => {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
            };
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        },

        // --- DELEGATED ENGINES ---
        initAudioContext() { 
            AudioEngine.init(); 
            this.audioInitialized = true;
        },
        toggleAudio() {
            const isMuted = AudioEngine.toggleMute();
            this.audioInitialized = !isMuted;
            if (!isMuted) this.playPop();
        },
        playPop() { AudioEngine.playPop(); },
        playHoverTick() { AudioEngine.playTick(); },

        // --- TRACE & DEBUG ---
        trace(msg, type = 'info') {
            const entry = { time: new Date().toLocaleTimeString(), msg, type };
            this.traceLog.unshift(entry);
            if (this.traceLog.length > 50) this.traceLog.pop();
            if (this.isDebugMode) console[type === 'error' ? 'error' : 'log'](`[DiverDea ${type.toUpperCase()}] ${msg}`);
        },
        measurePerf(label, fn) {
            const start = performance.now();
            fn();
            const end = performance.now();
            this.lastPerf = (end - start).toFixed(2);
            this.trace(`Perf: ${label} took ${this.lastPerf}ms`, 'info');
        },
        toggleDebug() { this.isDebugMode = !this.isDebugMode; this.trace(`Debug Mode: ${this.isDebugMode ? 'ON' : 'OFF'}`); },
        clearLogs() { this.errorLog = []; this.traceLog = []; },
        checkDataHealth() {
            this.trace('Checking Data Integrity...');
            let issues = 0;
            this.categories.forEach(cat => {
                if (!this.conceptsList1[cat]) { this.trace(`Missing conceptsList1 for ${cat}`, 'error'); issues++; }
                if (!this.conceptsList2[cat]) { this.trace(`Missing conceptsList2 for ${cat}`, 'error'); issues++; }
            });
            this.trace(`Health Check Complete. Issues found: ${issues}`, issues > 0 ? 'error' : 'info');
        },

        // --- THEME & COLORS ---
        toggleTheme() {
            this.playPop();
            this.isDarkMode = !this.isDarkMode;
            document.documentElement.classList.toggle('dark', this.isDarkMode);
        },
        randomizeColors() {
            // Apply mode to random colors
            this.color1 = ColorEngine.getRandomHex(this.appColorMode); 
            // If they just randomize completely, we'll re-apply a random harmony based on mode
            const harmonies = ['complementary', 'analogous', 'triadic', 'split-complementary', 'monochromatic'];
            const randomHarmony = harmonies[Math.floor(Math.random() * harmonies.length)];
            const { color2, color3 } = ColorEngine.generateHarmony(this.color1, randomHarmony, this.appColorMode);
            this.color2 = color2;
            this.color3 = color3;
            this.activeHarmony = randomHarmony;
            this.playHoverTick();
        },
        applyCategoryPalette() {
            const p = this.categoryPalettes[this.selectedCategory];
            if (p) { this.color1 = p.hero; this.color2 = p.neutral; this.color3 = p.accent; this.activeHarmony = ''; this.playPop(); }
        },
        applyColorHarmony(type) {
            this.playPop();
            const { color2, color3 } = ColorEngine.generateHarmony(this.color1, type, this.appColorMode);
            this.color2 = color2;
            this.color3 = color3;
            this.activeHarmony = type;
        },
        resetToSignature() {
            this.color1 = '#9cb48c'; this.color2 = '#1a1c18'; this.color3 = '#fdfcf9';
            this.activeHarmony = 'signature'; this.playPop();
        },

        // --- POOL LOGIC ---
        getGlobalPool(sourceName) {
            return Object.values(this[sourceName]).flat();
        },
        getMechanicPool() {
            if (this.synthesisMode === 'general') return this.generalMechanics[this.selectedCategory] || [];
            if (this.synthesisMode === 'lateral') return this.getGlobalPool('conceptsListLateral');
            return this.conceptsList1[this.selectedCategory] || [];
        },
        getProductPool() {
            if (this.synthesisMode === 'general') return this.generalProducts[this.selectedCategory] || [];
            if (this.synthesisMode === 'lateral') return this.getGlobalPool('conceptsList2');
            return this.conceptsList2[this.selectedCategory] || [];
        },

        // --- CORE SYNTHESIS ---
        generateLateralIdea(skipAnim = false) {
            this.measurePerf('Idea Synthesis', () => {
                this.playPop(); this.generatedPrompt = '';
                
                if (!this.productSlot.locked) {
                    const prodPool = this.getProductPool();
                    if (prodPool?.length) this.productSlot.value = _.sample(prodPool);
                }

                SynthesisEngine.randomizeGroup(this.mechanicSlots, this.mechanicCount, this.pools.mechanic);
                if (this.useThirdConcept) SynthesisEngine.randomizeGroup(this.styleSlots, this.styleCount, this.pools.style);
                if (this.useAudience) SynthesisEngine.randomizeGroup(this.audienceSlots, this.audienceCount, this.pools.audience);
                if (this.useConstraint) SynthesisEngine.randomizeGroup(this.constraintSlots, this.constraintCount, this.pools.constraint);
                if (this.useNavigation) this.syncNavigationToMechanics(true);

                this.generatedIdea = true;
            });

            if (!skipAnim) {
                this.$nextTick(() => {
                    gsap.fromTo(".framework-item", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 });
                });
            }
        },
        updateSlot(type, index, direction) {
            const slot = type === 'product' ? this.productSlot : this[type + 'Slots'][index];
            if (slot.locked) return;
            const pool = this.pools[type];
            if (!pool?.length) return;
            const currentIdx = pool.indexOf(slot.value);
            const nextIdx = (currentIdx + direction + pool.length) % pool.length;
            slot.value = pool[nextIdx];
            this.playHoverTick();
        },

        // --- NAVIGATION ---
        handleKeyDown(e) {
            if (this.showCrudModal || e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

            const activeGroups = [
                { type: 'product', count: 1 },
                { type: 'mechanic', count: this.mechanicCount },
                { type: 'style', count: this.useThirdConcept ? this.styleCount : 0 },
                { type: 'audience', count: this.useAudience ? this.audienceCount : 0 },
                { type: 'constraint', count: this.useConstraint ? this.constraintCount : 0 },
                { type: 'navigation', count: this.useNavigation ? this.navigationCount : 0 }
            ].filter(g => g.count > 0);

            const flat = activeGroups.flatMap(g => Array.from({ length: g.count }, (_, i) => ({ type: g.type, index: i })));
            const currentIdx = flat.findIndex(f => f.type === this.currentFocus.type && f.index === this.currentFocus.index);

            if (e.key === 'ArrowUp') {
                this.currentFocus = flat[(currentIdx - 1 + flat.length) % flat.length];
                this.playHoverTick();
            } else if (e.key === 'ArrowDown') {
                this.currentFocus = flat[(currentIdx + 1) % flat.length];
                this.playHoverTick();
            } else if (e.key === 'ArrowRight') {
                this.updateSlot(this.currentFocus.type, this.currentFocus.index, 1);
            } else if (e.key === 'ArrowLeft') {
                this.updateSlot(this.currentFocus.type, this.currentFocus.index, -1);
            } else if (e.key === ' ' || e.key === 'Enter') {
                this.generateLateralIdea();
            }
        },

        // --- CUSTOM DOMAIN METHODS ---
        toggleCustomPrimary() {
            this.isCustomPrimary = !this.isCustomPrimary;
            if (this.isCustomPrimary) {
                this.customPrimaryCategory = this.selectedCategory;
            } else {
                this.selectedCategory = this.categories.includes(this.customPrimaryCategory) ? this.customPrimaryCategory : this.categories[0];
            }
            this.generateLateralIdea();
        },
        updateCustomPrimary() {
            this.selectedCategory = this.customPrimaryCategory;
            this.generateLateralIdea();
        },
        toggleCustomSecondary() {
            this.isCustomSecondary = !this.isCustomSecondary;
            if (this.isCustomSecondary) {
                this.customSecondaryCategory = this.secondaryCategory === 'None' ? '' : this.secondaryCategory;
            } else {
                this.secondaryCategory = 'None';
            }
        },
        updateCustomSecondary() {
            this.secondaryCategory = this.customSecondaryCategory || 'None';
        },

        // --- AI IDEA VALIDATOR ---
        async checkConceptViability() {
            if (this.isValidating || !this.aiPreviewConcept) return;
            const key = this.aiProvider === 'groq' ? this.aiGroqKey : this.aiGeminiKey;
            if (!key) {
                this.aiError = `Silakan konfigurasi API Key ${this.aiProvider === 'groq' ? 'Groq' : 'Gemini'} di settings untuk menggunakan fitur Cek Kelayakan.`;
                this.showSettingsModal = true;
                return;
            }

            this.isValidating = true;
            this.validationResult = null;
            this.aiError = '';

            const concept = this.aiPreviewConcept;

            const systemPrompt = `You are a ruthlessly honest Startup Advisor and Technical Architect for DiverDea.
Your role: Evaluate digital product concepts to see if they are highly viable, realistic, and commercially sound for a solo developer or student to build in 1-2 weeks.
You MUST respond ONLY with a valid JSON object. No markdown wrapping, no extra commentary.`;

            const userMessage = `Evaluate this digital product concept:
- Name: "${concept.appName}"
- Category: "${concept.category}"
- Value Proposition: "${concept.product}"
- Description: "${concept.description}"
- Core Features: ${JSON.stringify(concept.mechanics)}
- Target Audience: ${JSON.stringify(concept.audiences || [])}
- Constraints: ${JSON.stringify(concept.constraints || [])}

Return ONLY this JSON schema:
{
  "score": <integer 1-10>,
  "verdict": "<Excellent | Good | Risky | Poor>",
  "marketFit": "<1 clear sentence in Bahasa Indonesia evaluating target market demand and utility>",
  "technicalComplexity": "<Low | Medium | High>",
  "reason": "<1 concise sentence in Bahasa Indonesia explaining the core risk or technical bottleneck>",
  "tweak": "<1 actionable, concrete recommendation in Bahasa Indonesia to improve viability>"
}`;

            try {
                const response = await AIEngine.call({
                    provider: this.aiProvider,
                    apiKey: key,
                    model: this.aiModel,
                    systemPrompt,
                    history: [],
                    userMessage,
                    maxTokens: 500,
                    temperature: 0.3,
                    jsonMode: true,
                });

                let cleanJson = response.trim();
                const firstBrace = cleanJson.indexOf('{');
                const lastBrace = cleanJson.lastIndexOf('}');
                if (firstBrace !== -1 && lastBrace !== -1) {
                    cleanJson = cleanJson.slice(firstBrace, lastBrace + 1);
                    const data = JSON.parse(cleanJson);
                    if (data && typeof data.score === 'number') {
                        this.validationResult = data;
                        this.trace(`Viability Check: Score ${data.score}/10 — ${data.verdict}`, 'info');
                    }
                } else {
                    throw new Error("Format JSON respons tidak valid");
                }
            } catch (err) {
                this.aiError = "Gagal memvalidasi konsep: " + err.message;
                this.trace(`Viability Check failed: ${err.message}`, 'error');
            } finally {
                this.isValidating = false;
            }
        },

        // --- AI EXECUTION ---
        saveSettings() {
            AIStorage.save('provider', this.aiProvider);
            AIStorage.save('groqKey', this.aiGroqKey);
            AIStorage.save('geminiKey', this.aiGeminiKey);
            AIStorage.save(this.aiProvider === 'groq' ? 'groqModel' : 'geminiModel', this.aiModel);
            AIStorage.save('projectUseAI', this.projectUseAI);
            AIStorage.save('projectAiApi', this.projectAiApi);
            AIStorage.save('projectAiModalities', JSON.stringify(this.projectAiModalities));
            this.playPop();
        },
        toggleSpeechRecognition(targetField) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                this.aiError = "Speech Recognition tidak didukung di browser ini. Harap gunakan Chrome atau Edge.";
                return;
            }

            if (this.activeSpeechRecognition) {
                this.activeSpeechRecognition.stop();
                this.activeSpeechRecognition = null;
                this.isRecordingProblem = false;
                this.isRecordingTweak = false;
                AudioEngine.playMicFeedback(false);
                return;
            }

            this.playPop();
            const recognition = new SpeechRecognition();
            recognition.lang = 'id-ID';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => {
                this.activeSpeechRecognition = recognition;
                this.isRecordingProblem = targetField === 'problem';
                this.isRecordingTweak = targetField === 'tweak';
                AudioEngine.playMicFeedback(true);
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                if (targetField === 'problem') {
                    this.aiProblemInput = (this.aiProblemInput + ' ' + transcript).trim();
                } else if (targetField === 'tweak') {
                    this.aiTweakInput = (this.aiTweakInput + ' ' + transcript).trim();
                }
            };

            recognition.onerror = (event) => {
                this.aiError = "Error perekaman suara: " + event.error;
                this.trace("Speech Recognition Error: " + event.error, "error");
                this.isRecordingProblem = false;
                this.isRecordingTweak = false;
                this.activeSpeechRecognition = null;
                AudioEngine.playMicFeedback(false);
            };

            recognition.onend = () => {
                this.isRecordingProblem = false;
                this.isRecordingTweak = false;
                this.activeSpeechRecognition = null;
                AudioEngine.playMicFeedback(false);
            };

            recognition.start();
        },
        async solveWithAI() {
            if (this.aiSolving) return;
            if (!this.aiProblemInput.trim()) {
                this.aiError = "Silakan ketik masalah atau ide Anda di kotak teks terlebih dahulu!";
                return;
            }
            
            const key = this.aiProvider === 'groq' ? this.aiGroqKey : this.aiGeminiKey;
            if (!key) {
                this.aiError = `Please configure your ${this.aiProvider} API key in settings.`;
                this.showSettingsModal = true;
                return;
            }

            this.playPop();
            this.aiSolving = true;
            this.aiSuggestedConcepts = [];
            this.aiPreviewConcept = null;

            let taskPrompt = "";
            if (this.aiSelectedMethod === 'problem') {
                taskPrompt = "Pengguna memiliki sebuah masalah dunia nyata. Buatkan 3 konsep startup/solusi digital kreatif (aplikasi, platform, atau game) berbeda yang memecahkan masalah ini dengan cara yang sangat lateral dan unik.";
            } else if (this.aiSelectedMethod === 'domain') {
                taskPrompt = "Pengguna ingin mengeksplorasi domain ilmu atau subyek tertentu. Buatkan 3 konsep startup/solusi digital kreatif (aplikasi, platform, atau game) berbeda yang memanfaatkan, mengintegrasikan, atau meng-gamifikasi ilmu ini secara mendalam.";
            } else if (this.aiSelectedMethod === 'evolve') {
                taskPrompt = "Pengguna memiliki sebuah ide dasar. Buatkan 3 variasi konsep startup/solusi digital kreatif (aplikasi, platform, atau game) yang berevolusi secara lateral, lebih gila, unik, dan jauh lebih menarik.";
            }

            let allowedPrimary = this.categories.slice();
            if (this.isCustomPrimary && this.customPrimaryCategory) {
                allowedPrimary.push(this.customPrimaryCategory);
            }
            let allowedSecondary = this.categories.slice();
            if (this.isCustomSecondary && this.customSecondaryCategory) {
                allowedSecondary.push(this.customSecondaryCategory);
            }
            const availablePrimaryCategories = allowedPrimary.join(', ');
            const availableSecondaryCategories = allowedSecondary.join(', ');

            const isSingleDomain = !this.isCustomSecondary && this.secondaryCategory === 'None';

            // Build new parameter context strings
            const complexityInstructions = {
                simple:   'KOMPLEKSITAS: SEDERHANA. Batasi setiap konsep menjadi maksimal 2 fitur utama yang sangat fokus dan mudah dibangun dalam < 1 minggu.',
                medium:   'KOMPLEKSITAS: SEDANG. Setiap konsep boleh memiliki 3-4 fitur yang saling terhubung dengan alur yang jelas.',
                advanced: 'KOMPLEKSITAS: TINGGI. Setiap konsep harus memiliki 4-5 fitur berlapis, saling berinteraksi, dan mencerminkan arsitektur produk yang matang.'
            };
            const platformInstructions = {
                mobile:  'PLATFORM TARGET: MOBILE-FIRST. Semua fitur dan UX flow harus dioptimalkan untuk layar sentuh smartphone. Prioritaskan gesture, notifikasi push, dan antarmuka yang minimalis.',
                desktop: 'PLATFORM TARGET: DESKTOP WEB. Fitur boleh lebih kaya data, mendukung multi-panel layout, shortcut keyboard, dan dashboard yang detail.',
                pwa:     'PLATFORM TARGET: PWA (Progressive Web App). Konsep harus mendukung offline-first, installable ke home screen, dan sinkronisasi data latar belakang.'
            };
            const langInstructions = {
                id:       'BAHASA OUTPUT: Gunakan BAHASA INDONESIA yang sederhana dan kasual di semua field teks (product, description, mechanics).',
                en:       'LANGUAGE OUTPUT: Use clear, simple ENGLISH for all text fields (product, description, mechanics).',
                bilingual: 'LANGUAGE OUTPUT: Use BILINGUAL format — write the appName in English, but all descriptive fields (product, description, mechanics) in Bahasa Indonesia.'
            };
            const businessInstructions = {
                free:         'MODEL BISNIS: GRATIS. Tidak ada paywall; fokus pada adopsi dan retensi pengguna.',
                freemium:     'MODEL BISNIS: FREEMIUM. Rancang fitur inti gratis + 1-2 fitur premium yang jelas nilainya (badge Pro, upgrade CTA).',
                subscription: 'MODEL BISNIS: BERLANGGANAN. Sarankan tier bulanan/tahunan, trial, dan manfaat berkelanjutan yang membenarkan langganan.',
                onetime:      'MODEL BISNIS: BELI SEKALI. Fokus pada nilai sekali bayar, lisensi, atau unlock permanen — bukan langganan.'
            };
            const designStyleInstructions = {
                'very-minimalist': 'GAYA DESAIN: SANGAT MINIMALIS. Fokus pada fungsi absolut dengan ruang kosong ekstrim.',
                'minimalist': 'GAYA DESAIN: MINIMALIS. Bersih, rapi, dengan elemen esensial.',
                'modern': 'GAYA DESAIN: MODERN. Estetika kekinian dengan lekukan halus dan visual dinamis.',
                'playful': 'GAYA DESAIN: PLAYFUL. Menyenangkan, penuh warna ceria, dan bentuk membulat.',
                'corporate': 'GAYA DESAIN: CORPORATE. Profesional, terstruktur, aman, dan elegan.',
                'brutalist': 'GAYA DESAIN: BRUTALIST. Kasar, berani, tipografi raksasa, dan kontras tinggi.',
                'glassmorphism': 'GAYA DESAIN: GLASSMORPHISM. Efek kaca buram transparan dan berlapis.'
            };
            const writingStyleInstructions = {
                'sangat-singkat': 'GAYA PENULISAN: SANGAT SINGKAT. Langsung ke intinya (to the point), maksimal 3-5 kata per kalimat.',
                'singkat': 'GAYA PENULISAN: SINGKAT. Padat dan jelas tanpa basa-basi.',
                'informatif': 'GAYA PENULISAN: INFORMATIF. Fokus pada fakta, panduan, dan kejelasan data.',
                'deskriptif': 'GAYA PENULISAN: DESKRIPTIF. Menggambarkan fitur dan manfaat secara rinci dan imajinatif.',
                'persuasif': 'GAYA PENULISAN: PERSUASIF. Mengajak, memotivasi, dan meyakinkan pengguna (copywriting sales).',
                'humoris': 'GAYA PENULISAN: HUMORIS. Santai, lucu, dan menyelipkan lelucon ringan.',
                'formal': 'GAYA PENULISAN: FORMAL. Sopan, baku, dan sangat profesional.'
            };

            const systemPrompt = `You are DiverDea's AI Concept Planner. ${taskPrompt}
PENTING:
1. ${langInstructions[this.appLanguage]}
2. 'appName' WAJIB menggunakan nama ala startup modern (singkat 1-2 kata, unik, catchy, mudah diingat. Contoh: Halodoc, Gojek, Ruangguru, Zenius, KitaBisa).
3. DILARANG KERAS menyertakan emoji visual apa pun dalam seluruh respons JSON Anda.
4. ${complexityInstructions[this.appComplexity]}
5. ${platformInstructions[this.appPlatform]}
6. ${businessInstructions[this.appBusinessModel]}
7. ${designStyleInstructions[this.appDesignStyle]}
8. ${writingStyleInstructions[this.appWritingStyle]}
9. TIPOGRAFI: Utama (${this.appPrimaryFont}), Sekunder (${this.appSecondaryFont}).
${isSingleDomain ? `10. USER MEMILIH MODE DOMAIN TUNGGAL: Anda DILARANG keras menyertakan kategori pendukung apa pun. Nilai kolom "secondaryCategory" WAJIB berupa teks "None" secara mutlak.\n` : `10. DIVERSIFIKASI DOMAIN PENDUKUNG (secondaryCategory): Jangan terlalu sering/selalu menggunakan 'Game 2D' atau 'Game 3D' sebagai kategori pendukung. Cobalah melakukan perkawinan silang lateral dengan kategori non-game lainnya secara berani (misal: Fintech + Health, Productivity + Green-Tech, Education + Social) untuk menciptakan inovasi non-game yang luar biasa. Pilih 'None' jika tidak ada kategori pendukung yang benar-benar relevan.\n`}
${!this.useAPI ? `11. USER MEMATIKAN API INTEGRATION: Anda DILARANG keras menyertakan rekomendasi API eksternal apa pun dalam respons JSON. Nilai kolom "apis" WAJIB berupa array kosong [].\n` : ''}${!this.useHardware ? `12. USER MEMATIKAN HARDWARE ACCESS: Anda DILARANG keras menyertakan rekomendasi hardware/capability akses perangkat apa pun dalam respons JSON. Nilai kolom "hardware" WAJIB berupa array kosong [].\n` : ''}
You MUST respond ONLY with a valid JSON object. Do NOT wrap it in markdown code blocks.
JSON Schema:
{
  "concepts": [
    {
      "appName": "Nama startup singkat",
      "category": "PILIH HANYA SATU SEBAGAI KATEGORI UTAMA DARI DAFTAR INI PERSIS (atau gunakan kategori kustom: '${this.isCustomPrimary ? this.customPrimaryCategory : ''}'): ${availablePrimaryCategories}",
      "secondaryCategory": "PILIH HANYA SATU SEBAGAI KATEGORI PENDUKUNG DARI DAFTAR INI PERSIS. HINDARI selalu memilih 'Game 2D' atau 'Game 3D' jika tidak benar-benar diperlukan. Lebih baik kawinkan dengan domain non-game lain (seperti Fintech, Health, Green-Tech) untuk inovasi lateral murni, atau pilih 'None' atau gunakan kategori kustom: '${this.isCustomSecondary ? this.customSecondaryCategory : ''}': ${availableSecondaryCategories}",
      "customDirectives": "Tuliskan 2-3 kalimat instruksi arsitektur khusus untuk menyinergikan kategori utama dan pendukung secara konkret tanpa emoji (misal: bagaimana data mengalir antara sensor, API, dan visualisasi).",
      "product": "Pitch solusi utama (contoh: 'Aplikasi gamifikasi pelacak tidur')",
      "description": "2-3 kalimat penjelasan mengapa konsep ini berhasil dan menyenangkan digunakan.",
      "mechanics": [
        {
          "name": "Nama fitur utama (singkat, max 4 kata)",
          "description": "Deskripsi alur kerja konkret & bagaimana user mengoperasikannya secara riil (1-2 kalimat)",
          "synergy": "Bagaimana fitur ini saling terhubung & memengaruhi fitur lainnya (1 kalimat)"
        }
      ],
      "styles": ["Gaya Visual 1", "Gaya Visual 2"],
      "audiences": ["Target Audiens"],
      "constraints": ["Batasan Teknis atau UX"],
      "navigation": ["<Label menu UNIK per fitur — jumlah item = mechanics + 1. DILARANG Dashboard/Features/Settings>"],
      "navigationPosition": "<bottom|top|left|right — mobile: bottom, desktop: left>",
      "apis": ${this.useAPI ? `["PILIH MAKSIMAL 3 DARI: ${this.externalAPIs.join(', ')}"]` : `[]`},
      "hardware": ${this.useHardware ? `["PILIH MAKSIMAL 3 DARI: ${this.deviceCapabilities.join(', ')}"]` : `[]`},
      "colors": { "hero": "#HEX1", "neutral": "#HEX2", "accent": "#HEX3" }
    }
  ]
}
Note: You must return exactly 3 concepts in the array.`;

            const statuses = ["Menganalisis masalah...", "Mendesain arsitektur ide...", "Mencari referensi mekanik...", "Menentukan target audiens...", "Memilih harmoni warna...", "Menulis struktur JSON..."];
            let step = 0;
            this.aiStatusText = statuses[step];
            this.aiProgressInterval = setInterval(() => {
                step = (step + 1) % statuses.length;
                this.aiStatusText = statuses[step];
            }, 1800);

            let attempts = 0;
            let success = false;

            while (attempts < 2 && !success) {
                try {
                    attempts++;
                    const response = await AIEngine.call({
                        provider: this.aiProvider,
                        apiKey: key,
                        model: this.aiModel,
                        systemPrompt: systemPrompt,
                        history: [],
                        userMessage: this.aiProblemInput,
                        maxTokens: 2000,
                        temperature: 0.8,
                        jsonMode: true,
                    });

                    // Clean response just in case AI adds markdown
                    let cleanJson = response.trim();
                    const firstBrace = cleanJson.indexOf('{');
                    const lastBrace = cleanJson.lastIndexOf('}');
                    
                    if (firstBrace !== -1 && lastBrace !== -1) {
                        cleanJson = cleanJson.slice(firstBrace, lastBrace + 1);
                    } else {
                        throw new Error("AI tidak mereturn format JSON yang valid.");
                    }

                    const data = JSON.parse(cleanJson);
                    if (data && data.concepts && data.concepts.length > 0) {
                        this.aiSuggestedConcepts = data.concepts;
                        
                        // Save to History
                        this.aiHistory.unshift({
                            prompt: this.aiProblemInput,
                            method: this.aiSelectedMethod,
                            concepts: data.concepts,
                            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                        });
                        if (this.aiHistory.length > 5) this.aiHistory.pop(); // Keep last 5

                        success = true;
                        this.playPop();
                    } else {
                        throw new Error("Format konsep kosong.");
                    }

                } catch (err) {
                    if (attempts >= 2) {
                        this.aiError = "Gagal memproses JSON dari AI. Coba lagi. (" + err.message + ")";
                    } else {
                        this.aiStatusText = "Format rusak, mengulang proses...";
                        await new Promise(r => setTimeout(r, 1000));
                    }
                }
            }
            
            clearInterval(this.aiProgressInterval);
            this.aiSolving = false;
        },

        restoreHistory(hist) {
            this.aiProblemInput = hist.prompt;
            this.aiSelectedMethod = hist.method;
            this.aiSuggestedConcepts = hist.concepts;
            this.aiPreviewConcept = null;
            this.playPop();
        },
        
        applyAiConcept() {
            if (!this.aiPreviewConcept) return;
            this.playPop();
            const data = this.aiPreviewConcept;

            // Dynamically register new custom categories in memory to prevent dropdown breakage
            if (data.category && !this.categories.includes(data.category)) {
                this.categories.push(data.category);
            }
            if (data.secondaryCategory && data.secondaryCategory !== 'None' && !this.categories.includes(data.secondaryCategory)) {
                this.categories.push(data.secondaryCategory);
            }
            
            // Populate Slots
            this.appName = data.appName || this.appName;
            if (this.categories.includes(data.category)) {
                this.selectedCategory = data.category;
            }
            if (data.secondaryCategory && (this.categories.includes(data.secondaryCategory) || data.secondaryCategory === 'None')) {
                this.secondaryCategory = data.secondaryCategory;
            } else {
                this.secondaryCategory = 'None';
            }
            this.customDirectives = data.customDirectives || '';
            
            this.productSlot.value = data.product;
            this.productSlot.locked = true;

            // Mechanics
            data.mechanics = data.mechanics || [];
            this.mechanicCount = Math.min(Math.max(data.mechanics.length, 1), 5);
            if (this.mechanicCount <= 2) this.appComplexity = 'simple';
            else if (this.mechanicCount <= 4) this.appComplexity = 'medium';
            else this.appComplexity = 'advanced';
            for(let i=0; i<this.mechanicCount; i++) {
                const m = data.mechanics[i];
                this.mechanicSlots[i].value = (m && typeof m === 'object') ? m.name : (m || 'Extra Feature');
                this.mechanicSlots[i].locked = true;
            }

            // Styles
            if (data.styles && data.styles.length > 0) {
                this.useThirdConcept = true;
                this.styleCount = Math.min(data.styles.length, 5);
                for(let i=0; i<this.styleCount; i++) {
                    this.styleSlots[i].value = data.styles[i];
                    this.styleSlots[i].locked = true;
                }
            }

            // Audiences
            if (data.audiences && data.audiences.length > 0) {
                this.useAudience = true;
                this.audienceCount = Math.min(data.audiences.length, 5);
                for(let i=0; i<this.audienceCount; i++) {
                    this.audienceSlots[i].value = data.audiences[i];
                    this.audienceSlots[i].locked = true;
                }
            }

            // Constraints
            if (data.constraints && data.constraints.length > 0) {
                this.useConstraint = true;
                this.constraintCount = Math.min(data.constraints.length, 5);
                for(let i=0; i<this.constraintCount; i++) {
                    this.constraintSlots[i].value = data.constraints[i];
                    this.constraintSlots[i].locked = true;
                }
            }

            // App pages — from AI concept or derived from mechanics (never generic trio)
            this.useNavigation = true;
            if (data.navigation?.length && data.navigation.some(n => !PromptComposer.isGenericNav(n))) {
                this.navigationCount = Math.min(data.navigation.length, 5);
                for (let i = 0; i < this.navigationCount; i++) {
                    this.navigationSlots[i].value = data.navigation[i];
                    this.navigationSlots[i].locked = true;
                }
                this.navigationPosition = data.navigationPosition || PromptComposer.suggestNavigationPosition(this.buildSynthesisSource());
            } else {
                for (let i = 0; i < this.navigationSlots.length; i++) {
                    this.navigationSlots[i].locked = false;
                }
                this.syncNavigationToMechanics(true);
            }

            // APIs
            if (data.apis && data.apis.length > 0) {
                this.useAPI = true;
                this.selectedAPIs = data.apis.filter(api => this.externalAPIs.includes(api));
                const custom = data.apis.find(api => !this.externalAPIs.includes(api));
                if (custom) this.customAPI = custom;
            }

            // Hardware
            if (data.hardware && data.hardware.length > 0) {
                this.useHardware = true;
                this.selectedHardware = data.hardware.filter(hw => this.deviceCapabilities.includes(hw));
                const customHw = data.hardware.find(hw => !this.deviceCapabilities.includes(hw));
                if (customHw) this.customHardware = customHw;
            }

            // Colors & Theme Mode
            if (data.colors) {
                this.color1 = data.colors.hero || this.color1;
                this.color2 = data.colors.neutral || this.color2;
                this.color3 = data.colors.accent || this.color3;
            }
            this.projectThemeMode = data.themeMode || 'both';
            this.createLogo = data.createLogo !== undefined ? data.createLogo : false;
            this.createAudio = data.createAudio !== undefined ? data.createAudio : false;
            this.useAnimations = data.useAnimations !== undefined ? data.useAnimations : true;
            this.useCharts = data.useCharts !== undefined ? data.useCharts : false;
            this.minimalMockData = data.minimalMockData !== undefined ? data.minimalMockData : true;

            // Hide suggestions and animate slots appearing
            this.aiPreviewConcept = null;
            this.aiSuggestedConcepts = [];
            this.synthesisMode = 'manual'; // Auto-minimize AI panel and switch to manual edit mode
            this.$nextTick(() => {
                gsap.fromTo(".framework-item", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" });
                // scroll down slightly
                document.querySelector('.framework-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        },

        async tweakAiConcept() {
            if (this.aiTweaking || !this.aiTweakInput.trim() || !this.aiPreviewConcept) return;

            const key = this.aiProvider === 'groq' ? this.aiGroqKey : this.aiGeminiKey;
            if (!key) return;

            this.playPop();
            this.aiTweaking = true;
            this.aiError = '';

            const systemPrompt = `You are an AI UI/UX Refiner. You will receive an existing app concept in JSON format, and a user request to tweak/modify specific parts of it.
Modify the JSON strictly according to the user's request. Leave other fields intact unless the tweak logically requires changing them.
Gunakan BAHASA INDONESIA YANG SEDERHANA.
${!this.useAPI ? `PENTING: Jangan tambahkan API apa pun ke kolom "apis". Kolom "apis" wajib tetap berupa array kosong [].\n` : ''}${!this.useHardware ? `PENTING: Jangan tambahkan hardware apa pun ke kolom "hardware". Kolom "hardware" wajib tetap berupa array kosong [].\n` : ''}
You MUST respond ONLY with a valid JSON object containing the exact same keys as the provided schema. Do NOT wrap it in markdown code blocks.`;

            const userMessage = `CURRENT CONCEPT JSON:\n${JSON.stringify(this.aiPreviewConcept, null, 2)}\n\nUSER TWEAK REQUEST:\n"${this.aiTweakInput}"\n\nReturn the updated JSON object.`;

            let attempts = 0;
            let success = false;

            while (attempts < 2 && !success) {
                try {
                    attempts++;
                    const response = await AIEngine.call({
                        provider: this.aiProvider,
                        apiKey: key,
                        model: this.aiModel,
                        systemPrompt: systemPrompt,
                        history: [],
                        userMessage: userMessage,
                        maxTokens: 1500,
                        temperature: 0.7,
                        jsonMode: true,
                    });

                    let cleanJson = response.trim();
                    const firstBrace = cleanJson.indexOf('{');
                    const lastBrace = cleanJson.lastIndexOf('}');
                    if (firstBrace !== -1 && lastBrace !== -1) {
                        cleanJson = cleanJson.slice(firstBrace, lastBrace + 1);
                    } else throw new Error("Format JSON rusak");

                    const data = JSON.parse(cleanJson);
                    if (data && data.appName && data.colors) {
                        this.aiPreviewConcept = data;
                        this.aiTweakInput = '';
                        success = true;
                        this.playPop();
                    } else throw new Error("Data JSON tidak lengkap");

                } catch (err) {
                    if (attempts >= 2) {
                        this.aiError = "Gagal merevisi konsep: " + err.message;
                    }
                    await new Promise(r => setTimeout(r, 1000));
                }
            }
            this.aiTweaking = false;
        },

        async applyViabilityTweak() {
            if (this.aiTweaking || !this.validationResult || !this.validationResult.tweak || !this.aiPreviewConcept) return;

            const key = this.aiProvider === 'groq' ? this.aiGroqKey : this.aiGeminiKey;
            if (!key) return;

            this.playPop();
            this.aiTweaking = true;
            this.aiError = '';

            const tweakSuggestion = this.validationResult.tweak;
            this.trace(`Auto-optimizing concept using: "${tweakSuggestion}"`, 'info');

            const systemPrompt = `You are DiverDea's AI Code and UX Architect. You will receive an existing app concept in JSON format, and a recommendation to improve its viability/UX/development speed.
Modify the JSON strictly according to the recommendation to make the concept more polished, simpler to develop, and highly focused.
Do NOT change key names. Keep all fields like appName, product, description, mechanics, styles, audiences, constraints, apis, hardware, colors intact but optimize their values.
Gunakan BAHASA INDONESIA YANG SEDERHANA.
${!this.useAPI ? `PENTING: Jangan tambahkan API apa pun ke kolom "apis". Kolom "apis" wajib tetap berupa array kosong [].\n` : ''}${!this.useHardware ? `PENTING: Jangan tambahkan hardware apa pun ke kolom "hardware". Kolom "hardware" wajib tetap berupa array kosong [].\n` : ''}
You MUST respond ONLY with a valid JSON object. Do NOT wrap it in markdown code blocks.`;

            const userMessage = `CURRENT CONCEPT JSON:\n${JSON.stringify(this.aiPreviewConcept, null, 2)}\n\nRECOMMENDATION TO APPLY:\n"${tweakSuggestion}"\n\nReturn the fully updated JSON object.`;

            let attempts = 0;
            let success = false;

            while (attempts < 2 && !success) {
                try {
                    attempts++;
                    const response = await AIEngine.call({
                        provider: this.aiProvider,
                        apiKey: key,
                        model: this.aiModel,
                        systemPrompt: systemPrompt,
                        history: [],
                        userMessage: userMessage,
                        maxTokens: 1500,
                        temperature: 0.5,
                        jsonMode: true,
                    });

                    let cleanJson = response.trim();
                    const firstBrace = cleanJson.indexOf('{');
                    const lastBrace = cleanJson.lastIndexOf('}');
                    if (firstBrace !== -1 && lastBrace !== -1) {
                        cleanJson = cleanJson.slice(firstBrace, lastBrace + 1);
                    } else throw new Error("Format JSON rusak");

                    const data = JSON.parse(cleanJson);
                    if (data && data.appName && data.colors) {
                        this.aiPreviewConcept = data;
                        success = true;
                        this.playPop();
                    } else throw new Error("Data JSON tidak lengkap");

                } catch (err) {
                    if (attempts >= 2) {
                        this.aiError = "Gagal mengoptimasi konsep secara otomatis: " + err.message;
                    }
                    await new Promise(r => setTimeout(r, 1000));
                }
            }
            
            this.aiTweaking = false;

            // Trigger recheck automatically so the user sees the score increase!
            if (success) {
                this.$nextTick(() => {
                    this.checkConceptViability();
                });
            }
        },

        async planArchitecture() {
            if (this.aiLoading || !this.generatedPrompt) return;
            this.playPop();
            this.aiLoading = true;
            this.aiError = '';
            this.aiResponse = '';
            this.aiPlanResult = null;
            this.aiCurrentStep = 1;
            this.aiAbortCtrl = new AbortController();

            const key = this.aiProvider === 'groq' ? this.aiGroqKey : this.aiGeminiKey;

            if (!key) {
                this.aiError = `Please configure your ${this.aiProvider === 'groq' ? 'Groq' : 'Gemini'} API key in settings.`;
                this.aiLoading = false;
                this.aiCurrentStep = 0;
                this.showSettingsModal = true;
                return;
            }

            const source = this.buildSynthesisSource();

            const architectSystemPrompt = `You are a Principal Software Architect. You produce precise, structured JSON blueprints for web applications. You NEVER write code in this phase. Respond ONLY with valid JSON — no markdown fences, no extra commentary.`;

            try {
                this.trace('Chain Step 1: Architecture Planning started', 'info');

                const planningPrompt = SynthesisEngine.generatePlanningPrompt(source);
                const planRaw = await AIEngine.call({
                    provider:     this.aiProvider,
                    apiKey:       key,
                    model:        this.aiModel,
                    systemPrompt: architectSystemPrompt,
                    history:      [],
                    userMessage:  planningPrompt,
                    maxTokens:    900,
                    temperature:  0.3,
                    onStream:     null,
                    signal:       this.aiAbortCtrl.signal,
                    jsonMode:     true,
                });

                let planJson = planRaw.trim();
                const fb = planJson.indexOf('{');
                const lb = planJson.lastIndexOf('}');
                if (fb !== -1 && lb !== -1) planJson = planJson.slice(fb, lb + 1);
                this.aiPlanResult = JSON.parse(planJson);
                this.trace('Chain Step 1 done: Blueprint received', 'info');
            } catch (err) {
                if (err.name !== 'AbortError') {
                    this.aiError = `[Step 1 Planning] ${err.message}`;
                    this.trace(`Planning error: ${err.message}`, 'error');
                }
            } finally {
                this.aiLoading = false;
                this.aiCurrentStep = 0;
            }
        },

        async buildPrototype() {
            if (this.aiLoading || !this.aiPlanResult) return;
            this.playPop();
            this.aiLoading = true;
            this.aiError = '';
            this.aiResponse = '';
            this.aiCurrentStep = 2;
            this.aiAbortCtrl = new AbortController();

            const key = this.aiProvider === 'groq' ? this.aiGroqKey : this.aiGeminiKey;

            if (!key) {
                this.aiError = `Please configure your ${this.aiProvider === 'groq' ? 'Groq' : 'Gemini'} API key in settings.`;
                this.aiLoading = false;
                this.aiCurrentStep = 0;
                this.showSettingsModal = true;
                return;
            }

            try {
                this.trace('Chain Step 2: Build Phase started', 'info');

                const planContext = `### ARCHITECTURE BLUEPRINT (Step 1 output — follow this STRICTLY):\n\`\`\`json\n${JSON.stringify(this.aiPlanResult, null, 2)}\n\`\`\`\n\nImplement this blueprint fully. Every component, state key, and algorithm listed above MUST appear in the output.\n\n---\n\n`;
                const buildPrompt = planContext + this.generatedPrompt;

                await AIEngine.call({
                    provider:     this.aiProvider,
                    apiKey:       key,
                    model:        this.aiModel,
                    systemPrompt: DOMAIN_SYSTEM_PROMPTS[this.aiDomain] || DOMAIN_SYSTEM_PROMPTS.general,
                    history:      [],
                    userMessage:  buildPrompt,
                    maxTokens:    8192,
                    temperature:  0.7,
                    onStream:     (chunk) => { this.aiResponse += chunk; },
                    signal:       this.aiAbortCtrl.signal,
                });

                this.trace('Chain Step 2 complete.', 'info');
            } catch (err) {
                if (err.name !== 'AbortError') {
                    this.aiError = `[Step 2 Build] ${err.message}`;
                    this.trace(`Build error: ${err.message}`, 'error');
                }
            } finally {
                this.aiLoading = false;
                this.aiCurrentStep = 0;
            }
        },
        cancelAI() {
            this.aiAbortCtrl?.abort();
            this.aiLoading = false;
            this.aiCurrentStep = 0;
            this.aiPlanResult = null;
        },
        formatMarkdown(text) {
            // Simple markdown formatter
            let html = text
                .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2 text-matcha">$1</h3>')
                .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-5 mb-3 text-matcha">$1</h2>')
                .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-black mt-6 mb-4 text-matcha">$1</h1>')
                .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                .replace(/\*(.*)\*/gim, '<em>$1</em>')
                .replace(/`(.*?)`/gim, '<code class="bg-black/20 px-1 rounded text-matcha/90">$1</code>')
                .replace(/\n$/gim, '<br />');
                
            return html;
        },

        /** Derive nav labels from mechanics; count tracks mechanicCount (+ hub) */
        syncNavigationToMechanics(resetCount = true) {
            if (!this.useNavigation) return;

            if (resetCount) {
                let count = Math.min(Math.max(this.mechanicCount + 1, 2), 5);
                if (this.appComplexity === 'simple') count = Math.min(count, 3);
                this.navigationCount = count;
            }

            const suggestedPos = PromptComposer.suggestNavigationPosition(this.buildSynthesisSource());
            if (this.appPlatform === 'mobile' || this.appPlatform === 'pwa') {
                this.navigationPosition = suggestedPos;
            }

            const source = this.buildSynthesisSource();
            const profile = PromptComposer.getProfile(source);
            const labels = PromptComposer.deriveNavigationLabels(
                { ...source, navigationCount: this.navigationCount },
                profile
            );

            for (let i = 0; i < this.navigationCount; i++) {
                if (!this.navigationSlots[i].locked) {
                    this.navigationSlots[i].value = labels[i] || labels[labels.length - 1] || `Halaman ${i + 1}`;
                }
            }
        },

        /** Unified synthesis payload — sidebar toggles → prompt composer */
        buildSynthesisSource(idea = null) {
            const base = {
                appName: this.appName,
                category: this.selectedCategory,
                secondaryCategory: this.secondaryCategory,
                customDirectives: this.customDirectives,
                product: this.productSlot.value,
                mechanics: this.mechanicSlots.slice(0, this.mechanicCount).map(s => s.value),
                styles: this.useThirdConcept ? this.styleSlots.slice(0, this.styleCount).map(s => s.value) : [],
                audiences: this.useAudience ? this.audienceSlots.slice(0, this.audienceCount).map(s => s.value) : [],
                constraints: this.useConstraint ? this.constraintSlots.slice(0, this.constraintCount).map(s => s.value) : [],
                navigation: this.useNavigation ? this.navigationSlots.slice(0, this.navigationCount).map(s => s.value) : [],
                navigationCount: this.navigationCount,
                navigationPosition: this.useNavigation ? this.navigationPosition : 'left',
                useNavigation: this.useNavigation,
                apis: this.useAPI ? [...this.selectedAPIs, ...(this.customAPI ? [`Custom API: ${this.customAPI}`] : [])] : [],
                hardware: this.useHardware ? [...this.selectedHardware, ...(this.customHardware ? [this.customHardware] : [])] : [],
                useAI: this.projectUseAI,
                aiApi: this.projectAiApi,
                aiModalities: this.projectAiModalities,
                themeMode: this.projectThemeMode,
                createLogo: this.createLogo,
                createAudio: this.createAudio,
                useAnimations: this.useAnimations,
                useCharts: this.useCharts,
                minimalMockData: this.minimalMockData,
                complexity: this.appComplexity,
                platform: this.appPlatform,
                language: this.appLanguage,
                businessModel: this.appBusinessModel,
                designStyle: this.appDesignStyle,
                primaryFont: this.appPrimaryFont,
                secondaryFont: this.appSecondaryFont,
                typographyWeight: this.appTypographyWeight,
                typographyColor: this.appTypographyColor,
                imageSource: this.appImageSource,
                backgroundStyle: this.appBackgroundStyle,
                onboardingStyle: this.appOnboardingStyle,
                onboardingSlides: this.appOnboardingSlides,
                writingStyle: this.appWritingStyle
            };
            if (!idea) return base;
            return {
                ...base,
                ...idea,
                useAI: idea.useAI !== undefined ? idea.useAI : base.useAI,
                aiApi: idea.aiApi || base.aiApi,
                complexity: idea.complexity || base.complexity,
                platform: idea.platform || base.platform,
                language: idea.language || base.language,
                businessModel: idea.businessModel || base.businessModel,
                designStyle: idea.designStyle || base.designStyle,
                primaryFont: idea.primaryFont || base.primaryFont,
                secondaryFont: idea.secondaryFont || base.secondaryFont,
                typographyWeight: idea.typographyWeight || base.typographyWeight,
                typographyColor: idea.typographyColor || base.typographyColor,
                imageSource: idea.imageSource || base.imageSource,
                backgroundStyle: idea.backgroundStyle || base.backgroundStyle,
                onboardingStyle: idea.onboardingStyle || base.onboardingStyle,
                onboardingSlides: idea.onboardingSlides || base.onboardingSlides,
                writingStyle: idea.writingStyle || base.writingStyle,
                useNavigation: idea.useNavigation !== undefined ? idea.useNavigation : base.useNavigation
            };
        },

        // --- PROMPT GENERATION ---
        generateAiPrompt(idea = null) {
            this.playPop();
            if (this.useNavigation) this.syncNavigationToMechanics(true);
            const source = this.buildSynthesisSource(idea);

            if (this.promptMode === 'master') {
                this.generatedPrompt = SynthesisEngine.generateMasterPrompt(
                    source,
                    { color1: this.color1, color2: this.color2, color3: this.color3 }
                );
            } else {
                this.generatedPrompt = SynthesisEngine.generatePrompt(
                    source, 
                    this.libStacks, 
                    this.categoryFocusMap, 
                    { color1: this.color1, color2: this.color2, color3: this.color3 }
                );
            }
        },

        // --- STORAGE & CRUD ---
        saveCurrentIdea() {
            this.playPop();
            const idea = { id: Date.now(), ...this.buildSynthesisSource() };
            this.savedIdeas.unshift(idea);
            localStorage.setItem('diverdeaIdeas', JSON.stringify(this.savedIdeas));
        },
        loadIdeas() {
            const saved = localStorage.getItem('diverdeaIdeas');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.savedIdeas = parsed.map(idea => ({
                    ...idea,
                    mechanics: idea.mechanics || (idea.currentConcept1 ? [idea.currentConcept1] : [])
                }));
            }
        },
        deleteIdea(id) {
            this.savedIdeas = this.savedIdeas.filter(i => i.id !== id);
            localStorage.setItem('diverdeaIdeas', JSON.stringify(this.savedIdeas));
        },
        
        openCrudManager() {
            this.playPop(); this.modalCategory = this.selectedCategory; this.showCrudModal = true;
        },
        isFlatList(list) { return ['conceptsList3', 'targetAudiences', 'constraints'].includes(list); },
        addCrudItemDirect(list, event) {
            const val = event.target.value.trim();
            if (val) {
                const target = this.isFlatList(list) ? this[list] : this[list][this.modalCategory];
                target.unshift(val);
                event.target.value = ''; this.playPop();
            }
        },
        startCrudEdit(list, index) {
            this.editingSlot = { list, index };
            const target = this.isFlatList(list) ? this[list] : this[list][this.modalCategory];
            this.editingValue = target[index];
        },
        saveCrudEdit() {
            const target = this.isFlatList(this.editingSlot.list) ? this[this.editingSlot.list] : this[this.editingSlot.list][this.modalCategory];
            target[this.editingSlot.index] = this.editingValue.trim();
            this.editingSlot = null; this.playPop();
        },
        deleteCrudItem(list, index) {
            const target = this.isFlatList(list) ? this[list] : this[list][this.modalCategory];
            target.splice(index, 1); this.playHoverTick();
        },

        // --- UTILS ---
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
        setCount(key, val) {
            this[key] = val;
            if ((key === 'mechanicCount' || key === 'navigationCount') && this.useNavigation) {
                this.syncNavigationToMechanics(key === 'mechanicCount');
            }
            this.playPop();
        },
        getData(list) { 
            if (this.isFlatList(list)) return this[list];
            return this[list][this.modalCategory] || [];
        },
        copyToClipboard(event) {
            navigator.clipboard.writeText(this.generatedPrompt);
            const btn = event.currentTarget;
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            this.playPop();
            setTimeout(() => { btn.innerHTML = original; this.generatedPrompt = ''; }, 1500);
        },
        initOrbs() {
            gsap.utils.toArray('.orb').forEach(orb => {
                const anim = gsap.to(orb, {
                    x: () => gsap.utils.random(-100, 100), y: () => gsap.utils.random(-100, 100),
                    duration: () => gsap.utils.random(8, 15), ease: "sine.inOut", repeat: -1, yoyo: true
                });
                this.orbAnimations.push(anim);
            });
        }
    },
    watch: {
        synthesisMode(newVal) {
            if (newVal === 'lateral') this.lateralCategory = _.sample(this.categories.filter(c => c !== this.selectedCategory));
            if (newVal === 'ai') this.sidebarOpenSections.engine = true;
            this.generateLateralIdea(true);
            this.trace(`Mode changed to: ${newVal}`);
        },
        selectedCategory() { 
            this.generateLateralIdea(true); 
            this.applyCategoryPalette();
        },
        aiPreviewConcept() {
            this.validationResult = null;
        },
        appPlatform() {
            if (this.useNavigation) this.syncNavigationToMechanics(false);
        },
        appComplexity() {
            if (this.useNavigation) this.syncNavigationToMechanics(true);
        }
    },
    mounted() {
        window.onerror = (msg, url, line, col, error) => {
            this.trace(`${msg} at ${line}:${col}`, 'error');
            this.errorLog.push({ msg, line, col, time: new Date().toLocaleTimeString() });
            return false;
        };

        this.loadIdeas();
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keydown', (e) => {
            if (e.shiftKey && e.key === 'D') this.toggleDebug();
        });

        this.appName = _.sample(['Neo','Zen','Omni','Flux','Aura']) + _.sample(['Flow','Grid','Mind','Sync','Hub']);
        this.randomizeColors();
        this.checkDataHealth();
        if (this.useNavigation) this.syncNavigationToMechanics(true);
        
        // Init AI settings
        const savedModelKey = this.aiProvider === 'groq' ? 'groqModel' : 'geminiModel';
        this.aiModel = AIStorage.load(savedModelKey) || AI_PROVIDERS[this.aiProvider].defaultModel;
        
        this.generateLateralIdea(true);
        this.$nextTick(this.initOrbs);
        this.trace('DiverDea src/main.js Loaded');
    }
}).mount('#app');
