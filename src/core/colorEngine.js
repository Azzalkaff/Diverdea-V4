/**
 * Color Engine for DiverDea
 * Handles color conversions and harmony principles.
 */

export const ColorEngine = {
    hexToHsl(hex) {
        let r = parseInt(hex.slice(1,3),16)/255, 
            g = parseInt(hex.slice(3,5),16)/255, 
            b = parseInt(hex.slice(5,7),16)/255;
        const max = Math.max(r,g,b), min = Math.min(r,g,b);
        let h, s, l = (max+min)/2;
        if (max === min) { h = s = 0; }
        else {
            const d = max - min;
            s = l > 0.5 ? d/(2-max-min) : d/(max+min);
            switch(max) {
                case r: h = (g-b)/d + (g < b ? 6 : 0); break;
                case g: h = (b-r)/d + 2; break;
                case b: h = (r-g)/d + 4; break;
            }
            h /= 6;
        }
        return [h*360, s*100, l*100];
    },

    hslToHex(h, s, l) {
        h /= 360; s /= 100; l /= 100;
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1; if (t > 1) t -= 1;
            if (t < 1/6) return p + (q-p)*6*t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q-p)*(2/3-t)*6;
            return p;
        };
        const q = l < 0.5 ? l*(1+s) : l+s-l*s, p = 2*l - q;
        const toHex = x => Math.round(x*255).toString(16).padStart(2, '0');
        return `#${toHex(hue2rgb(p,q,h+1/3))}${toHex(hue2rgb(p,q,h))}${toHex(hue2rgb(p,q,h-1/3))}`;
    },

    generateHarmony(baseHex, type, mode = 'dark') {
        const [h, s, l] = this.hexToHsl(baseHex);
        const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
        
        let color2, color3;

        // Mode Configuration
        let surfaceL, surfaceS_mult;
        let accentL, accentS_mult;

        switch (mode) {
            case 'light':
                surfaceL = 96; surfaceS_mult = 0.1; // Very light, low saturation
                accentL = clamp(l * 0.6, 20, 45); accentS_mult = 1.2; // Darker accent for contrast
                break;
            case 'pastel':
                surfaceL = 92; surfaceS_mult = 0.4; // Soft light surface
                accentL = 75; accentS_mult = 0.7; // Soft pastel accent
                break;
            case 'vibrant':
                surfaceL = 8; surfaceS_mult = 0.6; // Deep dark but saturated
                accentL = 60; accentS_mult = 1.5; // Extreme neon accent
                break;
            case 'dark':
            default:
                surfaceL = 12; surfaceS_mult = 0.3; // Standard premium dark
                accentL = 75; accentS_mult = 1.2; // Bright accent
                break;
        }

        switch(type) {
            case 'complementary':
                color2 = this.hslToHex((h + 180) % 360, clamp(s * surfaceS_mult, 5, 40), surfaceL);
                color3 = this.hslToHex((h + 180) % 360, clamp(s * accentS_mult, 50, 100), accentL);
                break;
            case 'analogous':
                color2 = this.hslToHex((h + 30) % 360, clamp(s * surfaceS_mult, 5, 40), surfaceL);
                color3 = this.hslToHex((h - 30 + 360) % 360, clamp(s * accentS_mult, 50, 100), mode === 'light' ? 30 : 90);
                break;
            case 'triadic':
                color2 = this.hslToHex((h + 120) % 360, clamp(s * surfaceS_mult, 5, 40), surfaceL);
                color3 = this.hslToHex((h + 240) % 360, clamp(s * accentS_mult, 50, 100), accentL);
                break;
            case 'split-complementary':
                color2 = this.hslToHex((h + 150) % 360, clamp(s * surfaceS_mult, 5, 40), surfaceL);
                color3 = this.hslToHex((h + 210) % 360, clamp(s * accentS_mult, 50, 100), accentL);
                break;
            case 'monochromatic':
                color2 = this.hslToHex(h, clamp(s * surfaceS_mult * 1.5, 10, 40), mode === 'light' ? 95 : 10);
                color3 = this.hslToHex(h, clamp(s * accentS_mult, 40, 100), mode === 'light' ? 20 : 90);
                break;
            default:
                color2 = this.hslToHex(h, clamp(s * surfaceS_mult, 5, 40), surfaceL);
                color3 = this.hslToHex((h + 180) % 360, clamp(s * accentS_mult, 50, 100), accentL);
        }
        return { color2, color3 };
    },

    getRandomHex(mode = 'dark') { 
        const h = Math.floor(Math.random() * 360);
        let s, l;
        switch (mode) {
            case 'light':
                s = Math.floor(Math.random() * 30) + 50; // 50-80
                l = Math.floor(Math.random() * 20) + 40; // 40-60 (darker base for light mode contrast)
                break;
            case 'pastel':
                s = Math.floor(Math.random() * 20) + 40; // 40-60
                l = Math.floor(Math.random() * 15) + 75; // 75-90
                break;
            case 'vibrant':
                s = Math.floor(Math.random() * 15) + 85; // 85-100
                l = Math.floor(Math.random() * 10) + 50; // 50-60
                break;
            case 'dark':
            default:
                s = Math.floor(Math.random() * 25) + 65; // 65-90
                l = Math.floor(Math.random() * 15) + 55; // 55-70
                break;
        }
        return this.hslToHex(h, s, l);
    }
};
