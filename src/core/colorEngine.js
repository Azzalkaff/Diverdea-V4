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

    generateHarmony(baseHex, type) {
        const [h, s, l] = this.hexToHsl(baseHex);
        const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
        
        let color2, color3;

        switch(type) {
            case 'complementary':
                color2 = this.hslToHex((h+180)%360, clamp(s*0.2, 5, 20), clamp(l*0.2, 10, 30));
                color3 = this.hslToHex((h+180)%360, clamp(s*1.2, 50, 100), clamp(l*1.2, 50, 90));
                break;
            case 'analogous':
                color2 = this.hslToHex((h+30)%360, clamp(s*0.25, 5, 25), clamp(l*0.25, 10, 35));
                color3 = this.hslToHex((h-30+360)%360, clamp(s*1.1, 40, 100), clamp(l*1.2, 55, 90));
                break;
            case 'triadic':
                color2 = this.hslToHex((h+120)%360, clamp(s*0.2, 5, 20), clamp(l*0.2, 10, 30));
                color3 = this.hslToHex((h+240)%360, clamp(s*1.1, 45, 100), clamp(l*1.1, 50, 90));
                break;
            case 'split-complementary':
                color2 = this.hslToHex((h+150)%360, clamp(s*0.2, 5, 20), clamp(l*0.2, 10, 30));
                color3 = this.hslToHex((h+210)%360, clamp(s*1.1, 45, 100), clamp(l*1.1, 50, 90));
                break;
            case 'monochromatic':
                color2 = this.hslToHex(h, clamp(s*0.6, 5, 100), clamp(l*0.4, 8, 35));
                color3 = this.hslToHex(h, clamp(s*0.3, 5, 100), clamp(l*1.5, 70, 95));
                break;
            default:
                color2 = baseHex; color3 = baseHex;
        }
        return { color2, color3 };
    },

    getRandomHex() { 
        const h = Math.floor(Math.random() * 360);
        const s = Math.floor(Math.random() * 20) + 65;
        const l = Math.floor(Math.random() * 15) + 45;
        return this.hslToHex(h, s, l);
    }
};
