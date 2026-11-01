// Web Audio Romantic Piano & Chimes Synthesizer
// Zero external file dependencies - 100% reliable in every browser

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private gainNode: GainNode | null = null;
  private volume: number = 0.6;
  private noteIndex: number = 0;

  // Romantic progression in F Major / D Minor: Gentle, dreamy, emotional
  // Fmaj7 -> Dm9 -> Bbmaj7 -> C9sus4 -> Am7 -> Dm7 -> Gm7 -> C7
  private melodyProgression: { notes: number[]; duration: number }[] = [
    // Fmaj7 arpeggio
    { notes: [349.23, 440.0, 523.25, 659.25], duration: 1.2 },
    { notes: [523.25, 659.25, 698.46, 880.0], duration: 1.4 },
    // Dm9 warmth
    { notes: [293.66, 349.23, 440.0, 523.25], duration: 1.2 },
    { notes: [440.0, 523.25, 587.33, 659.25], duration: 1.4 },
    // Bbmaj7 emotional lift
    { notes: [233.08, 349.23, 466.16, 523.25], duration: 1.2 },
    { notes: [349.23, 466.16, 587.33, 698.46], duration: 1.4 },
    // C9sus -> C
    { notes: [261.63, 392.0, 523.25, 587.33], duration: 1.2 },
    { notes: [329.63, 392.0, 523.25, 659.25], duration: 1.6 },
    // Am7 intimacy
    { notes: [220.0, 329.63, 440.0, 523.25], duration: 1.2 },
    { notes: [329.63, 440.0, 523.25, 659.25], duration: 1.4 },
    // Dm7 tenderness
    { notes: [293.66, 349.23, 440.0, 587.33], duration: 1.2 },
    { notes: [349.23, 440.0, 587.33, 698.46], duration: 1.4 },
    // Gm7 sweet promise
    { notes: [196.0, 293.66, 349.23, 440.0], duration: 1.2 },
    { notes: [293.66, 349.23, 440.0, 523.25], duration: 1.4 },
    // Resolving C soft bell
    { notes: [261.63, 329.63, 392.0, 523.25], duration: 1.8 },
    { notes: [523.25, 659.25, 783.99, 1046.5], duration: 2.2 },
  ];

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play a soft, warm acoustic-style piano/celesta note with harmonic overtone
  public playPianoTone(freq: number, duration: number = 1.8, delay: number = 0, velocity: number = 0.25) {
    try {
      const ctx = this.getContext();
      const startTime = ctx.currentTime + delay;

      // Master note gain
      const noteGain = ctx.createGain();
      noteGain.gain.setValueAtTime(0.0001, startTime);
      noteGain.gain.exponentialRampToValueAtTime(velocity * this.volume, startTime + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(velocity * this.volume * 0.45, startTime + 0.3);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      // Warm low-pass filter to mimic felt piano
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, startTime);
      filter.frequency.exponentialRampToValueAtTime(600, startTime + duration);

      // Fundamental oscillator (sine)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, startTime);

      // Soft second harmonic for body (triangle)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, startTime);

      const osc2Gain = ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.18, startTime);

      osc1.connect(filter);
      osc2.connect(osc2Gain);
      osc2Gain.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.gainNode || ctx.destination);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + duration + 0.05);
      osc2.stop(startTime + duration + 0.05);
    } catch {
      // AudioContext might be blocked until user gesture
    }
  }

  // Play sparkling chime / magic fairy sound (used on unlock and rose tap)
  public playChime() {
    try {
      const ctx = this.getContext();
      const sparkles = [587.33, 739.99, 880.0, 1046.5, 1174.66, 1318.51, 1567.98];
      sparkles.forEach((freq, i) => {
        const startTime = ctx.currentTime + i * 0.06;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.12 * this.volume, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.6);

        osc.connect(gain);
        gain.connect(this.gainNode || ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.65);
      });
    } catch {
      // AudioContext handling
    }
  }

  // Start the peaceful romantic piano progression
  public startMusic() {
    if (this.isPlaying) return;
    this.getContext();
    this.isPlaying = true;
    this.scheduleNextPhrase();
  }

  private scheduleNextPhrase = () => {
    if (!this.isPlaying) return;

    const phrase = this.melodyProgression[this.noteIndex % this.melodyProgression.length];
    this.noteIndex++;

    // Play chord notes gently rolled (strummed/arpeggiated)
    phrase.notes.forEach((freq, i) => {
      this.playPianoTone(freq, 2.5, i * 0.12, 0.22 - i * 0.02);
    });

    // Schedule next romantic phrase
    const waitMs = (phrase.duration || 1.4) * 1000;
    this.timerId = window.setTimeout(this.scheduleNextPhrase, waitMs);
  };

  public stopMusic() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggleMusic(): boolean {
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioEngine();
