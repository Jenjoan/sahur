// Voice Speech Engine with Web Speech Synthesis and Procedural Speech Chatter
// Supports realistic voice acting profiles for Inspector Wong, Officer Farhan, Maya, Jay, etc.

export type SpeakerProfileId =
  | 'inspector'
  | 'police_farhan'
  | 'maya'
  | 'jay'
  | 'eli'
  | 'lina'
  | 'coach'
  | 'uncle_meng'
  | 'chloe'
  | 'inmate_leon'
  | 'inmate_sarah'
  | 'inmate_marcus'
  | 'inmate_chloe'
  | 'announcer'
  | 'default';

export interface SpeakerVoiceConfig {
  name: string;
  role: string;
  pitch: number; // 0.5 to 2.0
  rate: number;  // 0.5 to 2.0
  volume: number; // 0 to 1.0
  preferredGender?: 'male' | 'female';
  toneBlipFreq: number; // Hz for procedural speech chatter
}

export const SPEAKER_CONFIGS: Record<SpeakerProfileId, SpeakerVoiceConfig> = {
  inspector: {
    name: 'Duty Inspector Wong',
    role: 'SPF Consequence Centre',
    pitch: 0.9,
    rate: 0.94,
    volume: 1.0,
    preferredGender: 'male',
    toneBlipFreq: 160,
  },
  police_farhan: {
    name: 'Staff Sgt. Farhan',
    role: 'SPF Community Policing Officer',
    pitch: 0.88,
    rate: 0.96,
    volume: 1.0,
    preferredGender: 'male',
    toneBlipFreq: 175,
  },
  coach: {
    name: 'Coach Dave',
    role: 'Basketball Coach',
    pitch: 0.8,
    rate: 0.98,
    volume: 1.0,
    preferredGender: 'male',
    toneBlipFreq: 130,
  },
  uncle_meng: {
    name: 'Uncle Meng',
    role: 'Coffee Stall Vendor',
    pitch: 0.86,
    rate: 0.9,
    volume: 0.95,
    preferredGender: 'male',
    toneBlipFreq: 145,
  },
  maya: {
    name: 'Maya',
    role: 'Student Athlete',
    pitch: 1.16,
    rate: 1.02,
    volume: 1.0,
    preferredGender: 'female',
    toneBlipFreq: 260,
  },
  jay: {
    name: 'Jay',
    role: 'Distressed Friend',
    pitch: 1.02,
    rate: 0.92,
    volume: 0.95,
    preferredGender: 'male',
    toneBlipFreq: 210,
  },
  eli: {
    name: 'Eli',
    role: 'Observant Classmate',
    pitch: 1.08,
    rate: 1.05,
    volume: 1.0,
    preferredGender: 'male',
    toneBlipFreq: 230,
  },
  lina: {
    name: 'Lina',
    role: 'Jay’s Older Sister',
    pitch: 1.14,
    rate: 0.98,
    volume: 1.0,
    preferredGender: 'female',
    toneBlipFreq: 245,
  },
  chloe: {
    name: 'Chloe',
    role: 'Influencer / Acquaintance',
    pitch: 1.2,
    rate: 1.05,
    volume: 1.0,
    preferredGender: 'female',
    toneBlipFreq: 280,
  },
  inmate_leon: {
    name: 'Leon T. (Case #2410)',
    role: 'Sentenced Youth (Trafficking Conviction)',
    pitch: 0.84,
    rate: 0.9,
    volume: 0.95,
    preferredGender: 'male',
    toneBlipFreq: 150,
  },
  inmate_sarah: {
    name: 'Sarah K. (Case #2411)',
    role: 'Sentenced Youth (Overseas Consumption)',
    pitch: 1.05,
    rate: 0.92,
    volume: 0.95,
    preferredGender: 'female',
    toneBlipFreq: 220,
  },
  inmate_marcus: {
    name: 'Marcus L. (Case #2412)',
    role: 'Former JC Student (Pill Dependency)',
    pitch: 0.92,
    rate: 0.9,
    volume: 0.95,
    preferredGender: 'male',
    toneBlipFreq: 170,
  },
  inmate_chloe: {
    name: 'Chloe W. (Case #2413)',
    role: 'Sentenced Youth (Social Vape Supply)',
    pitch: 1.1,
    rate: 0.94,
    volume: 0.95,
    preferredGender: 'female',
    toneBlipFreq: 240,
  },
  announcer: {
    name: 'SPF Consequence Announcer',
    role: 'Automated Exhibition Guide',
    pitch: 1.0,
    rate: 1.0,
    volume: 1.0,
    toneBlipFreq: 200,
  },
  default: {
    name: 'Speaker',
    role: 'Character',
    pitch: 1.0,
    rate: 1.0,
    volume: 1.0,
    toneBlipFreq: 200,
  },
};

type SpeechListener = (state: {
  isSpeaking: boolean;
  speakerId: SpeakerProfileId | null;
  text: string | null;
}) => void;

class VoiceSpeechController {
  private isSpeaking: boolean = false;
  private currentSpeaker: SpeakerProfileId | null = null;
  private currentText: string | null = null;
  private voiceEnabled: boolean = true;
  private autoPlayVoice: boolean = true;
  private audioCtx: AudioContext | null = null;
  private listeners: Set<SpeechListener> = new Set();
  private availableVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const savedVoiceEnabled = localStorage.getItem('omc_voice_enabled');
        if (savedVoiceEnabled !== null) {
          this.voiceEnabled = savedVoiceEnabled === 'true';
        }
        const savedAutoPlay = localStorage.getItem('omc_voice_autoplay');
        if (savedAutoPlay !== null) {
          this.autoPlayVoice = savedAutoPlay === 'true';
        }
      } catch {
        // LocalStorage access may be restricted
      }

      if ('speechSynthesis' in window) {
        this.loadVoices();
        window.speechSynthesis.onvoiceschanged = () => {
          this.loadVoices();
        };
      }
    }
  }

  private loadVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.availableVoices = window.speechSynthesis.getVoices();
    }
  }

  private initAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
  }

  public subscribe(listener: SpeechListener): () => void {
    this.listeners.add(listener);
    listener({
      isSpeaking: this.isSpeaking,
      speakerId: this.currentSpeaker,
      text: this.currentText,
    });
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => {
      listener({
        isSpeaking: this.isSpeaking,
        speakerId: this.currentSpeaker,
        text: this.currentText,
      });
    });
  }

  public isVoiceEnabled(): boolean {
    return this.voiceEnabled;
  }

  public setVoiceEnabled(enabled: boolean) {
    this.voiceEnabled = enabled;
    try {
      localStorage.setItem('omc_voice_enabled', String(enabled));
    } catch {}
    if (!enabled) {
      this.stop();
    }
  }

  public isAutoPlayEnabled(): boolean {
    return this.autoPlayVoice;
  }

  public setAutoPlayEnabled(autoPlay: boolean) {
    this.autoPlayVoice = autoPlay;
    try {
      localStorage.setItem('omc_voice_autoplay', String(autoPlay));
    } catch {}
  }

  // Play subtle speech chatter blips (procedural voice formant sound)
  private playVoiceBlips(speakerConfig: SpeakerVoiceConfig, wordCount: number) {
    if (!this.voiceEnabled) return;
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;

      const baseFreq = speakerConfig.toneBlipFreq;
      const blipCount = Math.min(Math.max(3, wordCount), 12);
      const startTime = this.audioCtx.currentTime;

      for (let i = 0; i < blipCount; i++) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const blipTime = startTime + i * 0.09;

        // Slight frequency variation per syllable
        const freqOffset = (Math.sin(i * 1.5) + Math.random() * 0.4) * 20;
        osc.type = speakerConfig.preferredGender === 'female' ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(baseFreq + freqOffset, blipTime);

        gain.gain.setValueAtTime(0.04 * speakerConfig.volume, blipTime);
        gain.gain.exponentialRampToValueAtTime(0.001, blipTime + 0.06);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(blipTime);
        osc.stop(blipTime + 0.065);
      }
    } catch {
      // Audio context restricted or muted
    }
  }

  // Clean text of quotes and special markers before speaking
  private cleanSpeechText(rawText: string): string {
    return rawText
      .replace(/[“”—"']/g, ' ')
      .replace(/#\d+/g, '') // Case number like #2410
      .replace(/Sec\s+(\d+[a-z]?)/gi, 'Section $1')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Select the best matching voice for character gender / locale
  private pickVoice(preferredGender?: 'male' | 'female'): SpeechSynthesisVoice | null {
    if (!this.availableVoices.length) {
      this.loadVoices();
    }
    if (!this.availableVoices.length) return null;

    // Prefer English voices
    const englishVoices = this.availableVoices.filter((v) =>
      v.lang.toLowerCase().startsWith('en')
    );
    const pool = englishVoices.length > 0 ? englishVoices : this.availableVoices;

    // Try finding gender-matching voices by name cues
    if (preferredGender === 'male') {
      const maleVoice = pool.find((v) =>
        /male|david|daniel|george|james|alex|brian|guy|mark|tom|edward|google\s+uk\s+english\s+male/i.test(
          v.name
        )
      );
      if (maleVoice) return maleVoice;
    } else if (preferredGender === 'female') {
      const femaleVoice = pool.find((v) =>
        /female|victoria|samantha|karen|susan|fiona|zira|catherine|clara|google\s+uk\s+english\s+female/i.test(
          v.name
        )
      );
      if (femaleVoice) return femaleVoice;
    }

    // Default to natural or first English voice
    return pool[0] || null;
  }

  /**
   * Speak a line of text as a specific character with full vocal styling
   */
  public speak(
    rawText: string,
    speakerId: SpeakerProfileId = 'default',
    force: boolean = false
  ): void {
    if (!this.voiceEnabled) return;
    if (!force && !this.autoPlayVoice) return;
    if (!rawText || !rawText.trim()) return;

    this.stop();

    const config = SPEAKER_CONFIGS[speakerId] || SPEAKER_CONFIGS.default;
    const cleanText = this.cleanSpeechText(rawText);

    this.isSpeaking = true;
    this.currentSpeaker = speakerId;
    this.currentText = cleanText;
    this.notify();

    // Procedural voice blip layer
    const words = cleanText.split(' ').length;
    this.playVoiceBlips(config, words);

    // Full Web Speech API SpeechSynthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.pitch = config.pitch;
        utterance.rate = config.rate;
        utterance.volume = config.volume;

        const voice = this.pickVoice(config.preferredGender);
        if (voice) {
          utterance.voice = voice;
        }

        utterance.onend = () => {
          this.isSpeaking = false;
          this.currentSpeaker = null;
          this.currentText = null;
          this.notify();
        };

        utterance.onerror = () => {
          this.isSpeaking = false;
          this.currentSpeaker = null;
          this.currentText = null;
          this.notify();
        };

        window.speechSynthesis.speak(utterance);
      } catch {
        // Fallback gracefully if speech synthesis throws
        setTimeout(() => {
          this.isSpeaking = false;
          this.currentSpeaker = null;
          this.currentText = null;
          this.notify();
        }, Math.min(words * 320, 6000));
      }
    } else {
      // Timer to reset speaking state if no SpeechSynthesis
      setTimeout(() => {
        this.isSpeaking = false;
        this.currentSpeaker = null;
        this.currentText = null;
        this.notify();
      }, Math.min(words * 320, 6000));
    }
  }

  /**
   * Stop any ongoing speech
   */
  public stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    this.isSpeaking = false;
    this.currentSpeaker = null;
    this.currentText = null;
    this.notify();
  }

  public toggleVoice(): boolean {
    const next = !this.voiceEnabled;
    this.setVoiceEnabled(next);
    return next;
  }
}

export const voiceSpeech = new VoiceSpeechController();
