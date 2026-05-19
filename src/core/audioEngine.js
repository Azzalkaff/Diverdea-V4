/**
 * Audio Engine for DiverDea
 * Handles Tone.js initialization and sound triggers.
 */

export const AudioEngine = {
    popSynth: null,
    tickSynth: null,
    initialized: false,

    init() {
        if (this.initialized) return;
        
        Tone.start();
        this.popSynth = new Tone.MembraneSynth({
            pitchDecay: 0.05, octaves: 4, oscillator: { type: "sine" },
            envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.1 }
        }).toDestination();
        this.popSynth.volume.value = -10;

        this.tickSynth = new Tone.NoiseSynth({
            noise: { type: "white" }, 
            envelope: { attack: 0.005, decay: 0.05, sustain: 0 }
        }).toDestination();
        this.tickSynth.volume.value = -25;
        
        this.initialized = true;
    },

    playPop() {
        this.popSynth?.triggerAttackRelease(_.sample(["C5", "E5", "G5", "C6"]), "32n");
    },

    playTick() {
        this.tickSynth?.triggerAttackRelease("64n");
    },

    playMicFeedback(start) {
        if (!this.initialized) this.init();
        if (this.popSynth) {
            if (start) {
                // Retro chime up
                this.popSynth.triggerAttackRelease("G5", "32n");
                setTimeout(() => this.popSynth.triggerAttackRelease("C6", "32n"), 80);
            } else {
                // Retro chime down
                this.popSynth.triggerAttackRelease("C5", "16n");
            }
        }
    },

    toggleMute() {
        if (!this.initialized) this.init();
        Tone.Destination.mute = !Tone.Destination.mute;
        return Tone.Destination.mute;
    }
};
