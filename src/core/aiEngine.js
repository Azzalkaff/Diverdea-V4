/**
 * DiverDea — AI Engine
 * Unified API layer for Groq and Gemini providers.
 * Supports streaming responses and multi-domain problem solving.
 */

// ─── PROVIDER DEFINITIONS ────────────────────────────────────────────────────

export const AI_PROVIDERS = {
    groq: {
        id: 'groq',
        label: 'Groq',
        icon: 'fa-bolt',
        color: '#F55036',
        baseUrl: 'https://api.groq.com/openai/v1/chat/completions',
        models: [
            { id: 'llama-3.3-70b-versatile',      label: 'LLaMA 3.3 · 70B',     badge: 'Versatile',  fast: false },
            { id: 'llama-3.1-8b-instant',          label: 'LLaMA 3.1 · 8B',      badge: 'Instant',    fast: true  },
            { id: 'llama3-70b-8192',               label: 'LLaMA 3 · 70B',        badge: 'Classic',    fast: false },
            { id: 'mixtral-8x7b-32768',            label: 'Mixtral · 8x7B',       badge: '32K CTX',    fast: false },
            { id: 'gemma2-9b-it',                  label: 'Gemma 2 · 9B',         badge: 'Google',     fast: true  },
            { id: 'compound-beta',                 label: 'Compound Beta',        badge: 'Agentic',    fast: false },
        ],
        defaultModel: 'llama-3.3-70b-versatile',
        supportsStreaming: true,
    },
    gemini: {
        id: 'gemini',
        label: 'Gemini',
        icon: 'fa-google',
        color: '#4285F4',
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
        models: [
            { id: 'gemini-3-flash',               label: 'Gemini 3 Flash',        badge: 'Latest',     fast: true  },
            { id: 'gemini-3-flash-preview',       label: 'Gemini 3 Flash Preview',badge: 'Preview',    fast: true  },
            { id: 'gemini-3.1-flash-lite',        label: 'Gemini 3.1 Flash Lite', badge: 'Lite',       fast: true  },
            { id: 'gemini-2.0-flash',             label: 'Gemini 2.0 Flash',      badge: 'v2.0',       fast: true  },
            { id: 'gemini-2.0-flash-lite',         label: 'Gemini 2.0 Flash Lite', badge: 'v2.0 Lite',  fast: true  },
            { id: 'gemini-1.5-pro',               label: 'Gemini 1.5 Pro',        badge: '2M CTX',     fast: false },
            { id: 'gemini-1.5-flash',             label: 'Gemini 1.5 Flash',      badge: 'v1.5',       fast: true  },
            { id: 'gemini-1.5-flash-8b',          label: 'Gemini 1.5 Flash 8B',   badge: 'v1.5 Micro', fast: true  },
        ],
        defaultModel: 'gemini-3-flash',
        supportsStreaming: true,
    },
};

// ─── DOMAIN SYSTEM PROMPTS ────────────────────────────────────────────────────

export const DOMAIN_SYSTEM_PROMPTS = {
    general: `You are DiverDea's universal problem-solving assistant. You are a brilliant generalist who can reason across any field — science, engineering, arts, business, philosophy, and beyond.

RESPONSE STYLE:
- Be direct and insightful. Avoid filler phrases like "Certainly!" or "Great question!".
- Use markdown formatting (headers, lists, code blocks) where appropriate.
- When solving technical problems, show your reasoning step by step.
- Tailor your depth to the complexity of the question.`,

    science: `You are a rigorous scientific advisor for DiverDea. You specialize in physics, chemistry, biology, mathematics, and data science.

APPROACH:
- Ground all answers in empirical evidence and established theory.
- Show mathematical derivations when relevant.
- Distinguish between established facts and active research areas.
- Use SI units and standard scientific notation.
- Cite relevant principles, laws, or theorems by name.`,

    engineering: `You are a senior systems engineer for DiverDea, expert in software architecture, electrical engineering, mechanical systems, and civil/structural engineering.

APPROACH:
- Prioritize safety margins, redundancy, and failure modes (FMEA thinking).
- Provide concrete specifications, tolerances, and material choices.
- Consider real-world constraints: cost, manufacturing, regulations.
- Use engineering standards references where applicable (IEEE, ISO, ASTM).`,

    business: `You are a strategic business advisor for DiverDea with deep expertise in market analysis, finance, operations, and organizational design.

APPROACH:
- Structure analysis using frameworks (Porter's 5 Forces, SWOT, Jobs-to-be-Done, etc.) but don't be pedantic about it.
- Always tie recommendations to measurable outcomes (revenue, margin, CAC, LTV).
- Be direct about risks and uncertainties.
- Think in unit economics, not just gross numbers.`,

    law: `You are a legal research assistant for DiverDea. You have expertise in multiple jurisdictions and areas of law.

IMPORTANT DISCLAIMER: Always include that this is for informational/research purposes and does not constitute legal advice.

APPROACH:
- Identify the relevant legal domain (contract law, IP, regulatory, etc.).
- Explain key principles, precedents, and statutes clearly.
- Flag jurisdiction-specific differences when significant.
- Be precise with legal terminology.`,

    creative: `You are DiverDea's creative director — an expert in storytelling, design, music, visual arts, and lateral thinking.

APPROACH:
- Embrace unconventional ideas and unexpected connections.
- Provide concrete, actionable creative directions — not just vague inspiration.
- Reference relevant works, movements, and techniques.
- Balance creative ambition with practical execution.`,

    education: `You are a pedagogical expert for DiverDea, skilled at teaching complex concepts at any level — from beginner to PhD.

APPROACH:
- Gauge the appropriate explanation depth from context clues.
- Use analogies and concrete examples to anchor abstract concepts.
- Structure explanations progressively (simple → complex).
- Ask clarifying questions if the learning goal is unclear.
- Suggest follow-up resources or next learning steps.`,

    health: `You are a health and biomedical information specialist for DiverDea.

IMPORTANT DISCLAIMER: Always clarify this is general health information, not medical advice. For personal health decisions, consult a qualified healthcare provider.

APPROACH:
- Ground answers in peer-reviewed evidence and clinical guidelines.
- Distinguish between correlation and causation in health research.
- Explain mechanisms, not just recommendations.
- Note when evidence is strong vs. preliminary.`,

    coding: `You are DiverDea's senior software architect and code reviewer. You excel at any programming language, system design, debugging, and performance optimization.

APPROACH:
- Write clean, production-quality code with proper error handling.
- Explain architectural decisions, not just implementation.
- Consider edge cases, scalability, and security.
- Prefer idiomatic patterns for each language.
- For debugging: systematically narrow down root causes before proposing fixes.`,
};

// ─── STORAGE HELPERS ─────────────────────────────────────────────────────────

const STORAGE_KEYS = {
    groqKey:    'diverdea_groq_api_key',
    geminiKey:  'diverdea_gemini_api_key',
    provider:   'diverdea_ai_provider',
    groqModel:  'diverdea_groq_model',
    geminiModel:'diverdea_gemini_model',
    projectUseAI: 'diverdea_project_use_ai',
    projectAiApi: 'diverdea_project_ai_api',
};

export const AIStorage = {
    save(key, value) {
        try { localStorage.setItem(STORAGE_KEYS[key], value); } catch (_) {}
    },
    load(key) {
        try { return localStorage.getItem(STORAGE_KEYS[key]) || ''; } catch (_) { return ''; }
    },
    clear(key) {
        try { localStorage.removeItem(STORAGE_KEYS[key]); } catch (_) {}
    },
    clearAll() {
        Object.values(STORAGE_KEYS).forEach(k => {
            try { localStorage.removeItem(k); } catch (_) {}
        });
    },
};

// ─── MAIN ENGINE ─────────────────────────────────────────────────────────────

export const AIEngine = {

    /**
     * Call Groq API (OpenAI-compatible) with optional streaming.
     * @param {object} config
     * @param {string} config.apiKey
     * @param {string} config.model
     * @param {Array}  config.messages   - [{role, content}]
     * @param {number} config.maxTokens
     * @param {number} config.temperature
     * @param {function|null} config.onStream  - callback(chunkText) for streaming
     * @param {AbortSignal} config.signal
     * @returns {Promise<string>} full response text
     */
    async callGroq({ apiKey, model, messages, maxTokens = 2048, temperature = 0.7, onStream = null, signal = null, jsonMode = false }) {
        const stream = typeof onStream === 'function';
        const body = {
            model,
            messages,
            max_tokens: maxTokens,
            temperature,
            stream,
        };

        if (jsonMode) {
            body.response_format = { type: "json_object" };
        }

        const res = await fetch(AI_PROVIDERS.groq.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify(body),
            signal,
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({ error: { message: res.statusText } }));
            throw new Error(`Groq API Error ${res.status}: ${err?.error?.message || res.statusText}`);
        }

        if (!stream) {
            const data = await res.json();
            return data.choices?.[0]?.message?.content || '';
        }

        // Streaming: read SSE chunks
        const reader = res.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let fullText = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter(l => l.startsWith('data: '));

            for (const line of lines) {
                const raw = line.replace('data: ', '').trim();
                if (raw === '[DONE]') break;
                try {
                    const parsed = JSON.parse(raw);
                    const delta = parsed.choices?.[0]?.delta?.content;
                    if (delta) {
                        fullText += delta;
                        onStream(delta);
                    }
                } catch (_) { /* skip malformed */ }
            }
        }
        return fullText;
    },

    /**
     * Call Gemini API with optional streaming.
     * @param {object} config
     * @param {string} config.apiKey
     * @param {string} config.model
     * @param {Array}  config.messages   - [{role, content}]
     * @param {number} config.maxTokens
     * @param {number} config.temperature
     * @param {function|null} config.onStream
     * @param {AbortSignal} config.signal
     * @returns {Promise<string>}
     */
    async callGemini({ apiKey, model, messages, maxTokens = 2048, temperature = 0.7, onStream = null, signal = null, jsonMode = false }) {
        const stream = typeof onStream === 'function';

        // Convert OpenAI-style messages to Gemini format
        const systemMsg = messages.find(m => m.role === 'system');
        const chatMessages = messages.filter(m => m.role !== 'system');

        const geminiContents = chatMessages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
        }));

        const body = {
            contents: geminiContents,
            generationConfig: {
                maxOutputTokens: maxTokens,
                temperature,
                ...(jsonMode ? { responseMimeType: "application/json" } : {}),
            },
            ...(systemMsg ? { systemInstruction: { parts: [{ text: systemMsg.content }] } } : {}),
        };

        const endpoint = stream
            ? `${AI_PROVIDERS.gemini.baseUrl}/${model}:streamGenerateContent?key=${apiKey}&alt=sse`
            : `${AI_PROVIDERS.gemini.baseUrl}/${model}:generateContent?key=${apiKey}`;

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            signal,
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({ error: { message: res.statusText } }));
            throw new Error(`Gemini API Error ${res.status}: ${err?.error?.message || res.statusText}`);
        }

        if (!stream) {
            const data = await res.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        }

        // Streaming: read SSE chunks
        const reader = res.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let fullText = '';
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop(); // keep incomplete line

            for (const line of lines) {
                if (!line.startsWith('data: ')) continue;
                const raw = line.replace('data: ', '').trim();
                if (!raw) continue;
                try {
                    const parsed = JSON.parse(raw);
                    const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (text) {
                        fullText += text;
                        onStream(text);
                    }
                } catch (_) { /* skip */ }
            }
        }
        return fullText;
    },

    /**
     * Unified call — automatically routes to the right provider.
     * @param {object} config
     * @param {'groq'|'gemini'} config.provider
     * @param {string} config.apiKey
     * @param {string} config.model
     * @param {string} config.systemPrompt   - domain system prompt
     * @param {Array}  config.history        - prior [{role,content}] conversation turns
     * @param {string} config.userMessage    - latest user input
     * @param {number} config.maxTokens
     * @param {number} config.temperature
     * @param {function|null} config.onStream
     * @param {AbortSignal} config.signal
     * @returns {Promise<string>}
     */
    async call({ provider, apiKey, model, systemPrompt, history = [], userMessage, maxTokens = 2048, temperature = 0.7, onStream = null, signal = null, jsonMode = false }) {
        if (!apiKey) throw new Error(`API key for ${provider} is not set.`);
        if (!userMessage?.trim()) throw new Error('Message cannot be empty.');

        const messages = [
            { role: 'system', content: systemPrompt || DOMAIN_SYSTEM_PROMPTS.general },
            ...history,
            { role: 'user', content: userMessage.trim() },
        ];

        if (provider === 'groq') {
            return this.callGroq({ apiKey, model, messages, maxTokens, temperature, onStream, signal, jsonMode });
        }
        if (provider === 'gemini') {
            return this.callGemini({ apiKey, model, messages, maxTokens, temperature, onStream, signal, jsonMode });
        }
        throw new Error(`Unknown provider: ${provider}`);
    },

    /**
     * Quick API key validation — sends a minimal request to verify credentials.
     * @param {'groq'|'gemini'} provider
     * @param {string} apiKey
     * @returns {Promise<{valid: boolean, error?: string}>}
     */
    async validateKey(provider, apiKey) {
        try {
            const model = AI_PROVIDERS[provider].defaultModel;
            await this.call({
                provider,
                apiKey,
                model,
                systemPrompt: 'You are a test assistant.',
                userMessage: 'Reply with exactly two words: "Key valid".',
                maxTokens: 10,
                temperature: 0,
            });
            return { valid: true };
        } catch (err) {
            return { valid: false, error: err.message };
        }
    },
};
