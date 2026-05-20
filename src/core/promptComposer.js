/**
 * Adaptive prompt assembly — scales verbosity & sections to user toggles.
 * Highest leverage: conditional inclusion + complexity budgets (token efficiency).
 */

const COMPLEXITY_PROFILES = {
    simple: {
        maxCategoryDirectives: 2,
        maxSecondaryDirectives: 0,
        includeDomainPsychology: false,
        maxNavPages: 3,
        responseSections: ['rationale', 'code'],
        tokenBudgetHint: '~4k output tokens — keep prototype minimal: 1 main view + 1 modal max, no extra libraries beyond spec.',
        scopeLine: 'SCOPE: MVP only. One primary user flow. Defer nice-to-haves.'
    },
    medium: {
        maxCategoryDirectives: 4,
        maxSecondaryDirectives: 2,
        includeDomainPsychology: true,
        maxNavPages: 4,
        responseSections: ['rationale', 'schema', 'code', 'testing'],
        tokenBudgetHint: '~6k output tokens — balanced prototype with clear SPA sections.',
        scopeLine: 'SCOPE: Production-ready feel with 3–4 connected features.'
    },
    advanced: {
        maxCategoryDirectives: 6,
        maxSecondaryDirectives: 4,
        includeDomainPsychology: true,
        maxNavPages: 5,
        responseSections: ['rationale', 'schema', 'code', 'testing'],
        tokenBudgetHint: '~8k output tokens — rich interactions OK if still single HTML file.',
        scopeLine: 'SCOPE: Full-featured demo with layered feature synergy.'
    }
};

const PLATFORM_LINES = {
    mobile: 'LAYOUT: Mobile-first (320–428px). Touch targets ≥44px. Bottom nav or compact top bar. No hover-only actions.',
    desktop: 'LAYOUT: Desktop web. Multi-column OK. Keyboard shortcuts for power users.',
    pwa: 'LAYOUT: PWA — offline-first cues, install prompt stub, sync status indicator.'
};

const LANGUAGE_LINES = {
    id: 'COPY: All UI strings & placeholders in Bahasa Indonesia (casual, clear).',
    en: 'COPY: All UI strings & placeholders in English.',
    bilingual: 'COPY: App title in English; labels/descriptions in Bahasa Indonesia.'
};

const BUSINESS_LINES = {
    free: 'MONETIZATION: Free — no paywalls.',
    freemium: 'MONETIZATION: Freemium — mark 1–2 Pro features with upgrade CTA.',
    subscription: 'MONETIZATION: Subscription — show tier/monthly value, trial state.',
    onetime: 'MONETIZATION: One-time purchase — unlock language, no recurring billing UI.'
};

/** Labels that make every generated app look identical */
const GENERIC_NAV = new Set([
    'dashboard', 'features', 'settings', 'home', 'analytics', 'history',
    'profile', 'about', 'notifications', 'messages', 'calendar', 'scanner', 'map', 'character'
]);

function isGenericNav(label) {
    if (!label || typeof label !== 'string') return true;
    return GENERIC_NAV.has(label.trim().toLowerCase());
}

function shortenNavLabel(text, maxLen = 24) {
    if (!text) return '';
    const cleaned = String(text).replace(/[^\w\s\u00C0-\u024F-]/g, ' ').trim();
    const words = cleaned.split(/\s+/).filter(w => w.length > 1 && !/^(dan|atau|the|and|for|with|via)$/i.test(w));
    const label = (words.slice(0, 3).join(' ') || cleaned).slice(0, maxLen).trim();
    if (!label) return '';
    return label.charAt(0).toUpperCase() + label.slice(1);
}

export const PromptComposer = {
    isGenericNav,

    /** Build route names from mechanics / product — not generic admin template */
    deriveNavigationLabels(source, profile) {
        const mechanics = (source.mechanics || []).map(m =>
            typeof m === 'string' ? m : (m?.name || '')
        ).filter(Boolean);

        const custom = (source.navigation || []).filter(n => n && !isGenericNav(n));
        const desiredCount = source.navigationCount
            || Math.min(Math.max(mechanics.length + 1, 2), profile?.maxNavPages ?? 5);
        const max = Math.min(Math.max(desiredCount, 2), profile?.maxNavPages ?? 5);

        if (custom.length >= 2) return custom.slice(0, max);

        const pages = [];
        const hub = shortenNavLabel(source.appName)
            || shortenNavLabel(source.product?.split(/[.!?]/)[0])
            || 'Beranda';
        pages.push(hub);

        for (const m of mechanics) {
            const label = shortenNavLabel(m);
            if (label && !pages.some(p => p.toLowerCase() === label.toLowerCase())) {
                pages.push(label);
            }
        }

        if (pages.length < 2) {
            pages.push(shortenNavLabel(source.category) || 'Eksplorasi');
        }

        return pages.slice(0, max);
    },

    resolveNavigationForPrompt(source, profile) {
        return PromptComposer.deriveNavigationLabels(source, profile);
    },

    suggestNavigationPosition(source) {
        if (['Game 2D', 'Game 3D'].includes(source.category)) return 'top';
        if (source.platform === 'mobile') return 'bottom';
        if (source.platform === 'pwa') return 'bottom';
        return source.navigationPosition || 'left';
    },

    layoutPatternLine(source) {
        const isGame = ['Game 2D', 'Game 3D'].includes(source.category);
        if (isGame) {
            return 'Use full-screen play area + HUD overlay — NOT admin sidebar template.';
        }
        if (!source.useNavigation) {
            return 'Single-screen flow — no boilerplate admin shell.';
        }
        const pos = PromptComposer.suggestNavigationPosition(source);
        if (source.platform === 'mobile' && (pos === 'bottom' || pos === 'top')) {
            return 'Mobile shell: each tab = ONE mechanic with unique UI (not copy-paste card dashboards).';
        }
        if (source.complexity === 'simple') {
            return 'Minimal chrome — avoid Dashboard/Features/Settings trio; one hero + mechanic panels.';
        }
        return 'Each route needs distinct layout tied to a mechanic; no identical grid pages.';
    },

    antiTemplateUxBlock(source) {
        if (['Game 2D', 'Game 3D'].includes(source.category)) return '';
        return `
- **ANTI-TEMPLATE (MANDATORY)**: Do NOT clone a generic SaaS admin (sidebar + 3 identical dashboard cards + Settings gear clone). Visual structure must reflect "${source.product}" and mechanics listed above.
- **Route ↔ Feature map**: Each navigation item implements ONE core mechanic with its own interaction pattern (form, map, chart, camera, timeline, etc.).`;
    },

    getProfile(source) {
        const key = COMPLEXITY_PROFILES[source.complexity] ? source.complexity : 'medium';
        return { key, ...COMPLEXITY_PROFILES[key] };
    },

    pickDirectives(directives, max) {
        if (!directives?.length) return [];
        return directives.slice(0, Math.max(1, max));
    },

    formatDirectives(directives) {
        return directives.map(d => {
            const i = d.indexOf(':');
            return i !== -1 ? `- **${d.slice(0, i)}:**${d.slice(i + 1)}` : `- ${d}`;
        }).join('\n');
    },

    buildAdaptiveProfileBlock(source, profile) {
        const lines = [
            '<generation-profile>',
            `- ${profile.scopeLine}`,
            `- ${profile.tokenBudgetHint}`,
            `- ${PLATFORM_LINES[source.platform] || PLATFORM_LINES.mobile}`,
            `- ${LANGUAGE_LINES[source.language] || LANGUAGE_LINES.id}`,
            `- ${BUSINESS_LINES[source.businessModel] || BUSINESS_LINES.free}`,
            `- Mechanics to implement: ${(source.mechanics || []).length} (do not add extra features beyond this list).`,
            '</generation-profile>'
        ];
        return lines.join('\n');
    },

    /** Short AI-integration block (full block still huge in synthesisEngine when useAI). */
    aiIntegrationBrief(source) {
        if (!source.useAI) return '';
        const provider = source.aiApi === 'groq' ? 'Groq (llama-3.1-8b-instant)' : 'Gemini (gemini-3.1-flash-lite)';
        return `- **Live AI (${provider})**: Settings panel for API key + provider. Real API calls only — no setTimeout mocks. Chat/agent may mutate app state via structured actions.`;
    },

    navigationSpec(source, profile) {
        if (!source.useNavigation && !(source.navigation?.length)) {
            return '- **Layout**: Single-screen app. No SPA tab bar required.';
        }
        const pages = PromptComposer.resolveNavigationForPrompt(source, profile);
        const pos = PromptComposer.suggestNavigationPosition(source);
        const layout = PromptComposer.layoutPatternLine(source);
        return `- **SPA routes (exact labels)**: ${pages.map(p => `"${p}"`).join(', ')}. Position: **${pos}**. ${layout} FORBIDDEN unless user chose them: Dashboard, Features, Settings.`;
    },

    buildPlanningExtras(source, profile) {
        return [
            `- **Complexity tier**: ${profile.key}`,
            `- **Platform**: ${source.platform || 'mobile'}`,
            `- **Output language**: ${source.language || 'id'}`,
            `- **Business model**: ${source.businessModel || 'free'}`,
            profile.key === 'simple'
                ? '- **Blueprint rule**: Nav count = mechanic count; unique labels from mechanics; minimalMockData=true.'
                : '- **Blueprint rule**: navigation[] length MUST equal mechanics count; each label names ONE mechanic (not generic admin words).'
        ].filter(Boolean).join('\n');
    }
};
