/**
 * DiverDea AI SDK
 * A lightweight wrapper to prevent token dilution when LLMs generate client-side apps.
 * Supports Gemini 1.5/3.1 (Text & Vision) and Groq (Llama 3.1 & Whisper).
 */

class DiverDeaAIWrapper {
    constructor() {
        this.provider = 'gemini'; // 'gemini' or 'groq'
        this.apiKey = '';
        this.models = {
            gemini: 'gemini-flash-lite-latest',
            groq: 'llama-3.1-8b-instant',
            whisper: 'whisper-large-v3'
        };
        
        // Modules
        this.Chat = new ChatModule(this);
        this.Vision = new VisionModule(this);
        this.Audio = new AudioModule(this);
        this.Data = new DataModule(this);
    }

    init({ provider, apiKey }) {
        if (provider) this.provider = provider.toLowerCase();
        if (apiKey) this.apiKey = apiKey;
        console.log(`[DiverDea SDK] Initialized with ${this.provider.toUpperCase()}`);
    }

    async _fetchGemini(contents) {
        if (!this.apiKey) throw new Error("API Key required.");
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.models.gemini}:generateContent?key=${this.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        return data.candidates[0].content.parts[0].text;
    }

    async _fetchGroq(messages) {
        if (!this.apiKey) throw new Error("API Key required.");
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: this.models.groq,
                messages
            })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        return data.choices[0].message.content;
    }

    async predict(jsonData, taskDescription = "Analyze the following JSON and output a structured JSON prediction/insight.") {
        const prompt = `${taskDescription}\nJSON Data:\n${JSON.stringify(jsonData)}\n\nRespond ONLY in valid JSON.`;
        const rawResponse = await this.Chat.ask(prompt);
        return this._parseJSON(rawResponse);
    }

    _parseJSON(text) {
        try {
            const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(clean);
        } catch (e) {
            console.warn("[DiverDea SDK] Failed to parse JSON, returning raw text.", e);
            return text;
        }
    }
}

class ChatModule {
    constructor(core) { this.core = core; }
    
    async ask(prompt) {
        if (this.core.provider === 'gemini') {
            return await this.core._fetchGemini([{ parts: [{ text: prompt }] }]);
        } else {
            return await this.core._fetchGroq([{ role: 'user', content: prompt }]);
        }
    }
}

class VisionModule {
    constructor(core) { this.core = core; }

    async analyze(canvasElement, prompt = "Analyze this image and return a JSON description.") {
        if (!canvasElement) throw new Error("Canvas element is required for Vision analysis.");
        
        // Convert canvas to base64
        const dataUrl = canvasElement.toDataURL('image/jpeg', 0.8);
        const base64Data = dataUrl.split(',')[1];

        if (this.core.provider === 'gemini') {
            const contents = [{
                parts: [
                    { text: prompt + " (Respond ONLY in JSON format)" },
                    { inlineData: { mimeType: "image/jpeg", data: base64Data } }
                ]
            }];
            const response = await this.core._fetchGemini(contents);
            return this.core._parseJSON(response);
        } else {
            console.warn("[DiverDea SDK] Groq currently does not support vision natively in this wrapper. Falling back to text prompt.");
            const response = await this.core.Chat.ask(prompt);
            return this.core._parseJSON(response);
        }
    }
}

class AudioModule {
    constructor(core) { 
        this.core = core; 
        this.recognition = null;
    }

    // Web Speech API fallback for continuous listening
    listenAndTranscribe(onResultCallback, lang = 'id-ID') {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error("[DiverDea SDK] Speech Recognition not supported in this browser.");
            return;
        }

        if (this.recognition) {
            this.recognition.stop();
        }

        this.recognition = new SpeechRecognition();
        this.recognition.lang = lang;
        this.recognition.interimResults = false;
        
        this.recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            onResultCallback(text);
        };
        
        this.recognition.onerror = (e) => console.error("[DiverDea SDK] Audio Error:", e.error);
        this.recognition.start();
        return this.recognition;
    }
    
    stopListening() {
        if (this.recognition) {
            this.recognition.stop();
        }
    }

    // Text-to-Speech using native browser API
    speak(text, lang = 'id-ID', pitch = 1, rate = 1) {
        if (!window.speechSynthesis) {
            console.error("[DiverDea SDK] Speech Synthesis not supported in this browser.");
            return;
        }
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.pitch = pitch;
        utterance.rate = rate;
        
        window.speechSynthesis.speak(utterance);
    }
}

class DataModule {
    constructor(core) { this.core = core; }

    async extract(text, schemaDescription = "Extract key entities into JSON format") {
        const prompt = `Task: Data Extraction.\nExtract the following text into a structured JSON format according to this schema/description: "${schemaDescription}".\n\nText:\n"${text}"\n\nRespond ONLY in valid JSON.`;
        const rawResponse = await this.core.Chat.ask(prompt);
        return this.core._parseJSON(rawResponse);
    }

    async analyzeSentiment(text) {
        const prompt = `Task: Sentiment & Emotion Analysis.\nAnalyze the psychological tone and sentiment of the following text. Return a JSON object with keys: "sentiment" (Positive/Negative/Neutral), "emotion" (e.g. Happy, Angry, Sad, Urgent), and "score" (-1.0 to 1.0).\n\nText:\n"${text}"\n\nRespond ONLY in valid JSON.`;
        const rawResponse = await this.core.Chat.ask(prompt);
        return this.core._parseJSON(rawResponse);
    }

    async documentQA(documentText, question) {
        const prompt = `Task: Document Analysis (Q&A).\nBased ONLY on the following document, answer the question accurately.\n\n--- DOCUMENT START ---\n${documentText}\n--- DOCUMENT END ---\n\nQuestion: "${question}"\n\nRespond ONLY in valid JSON with a single key "answer".`;
        const rawResponse = await this.core.Chat.ask(prompt);
        return this.core._parseJSON(rawResponse);
    }
}

// Export globally
window.DiverDeaAI = new DiverDeaAIWrapper();
