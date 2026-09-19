import React, { useEffect, useState } from 'react';
import { voiceSpeech, SpeakerProfileId, SPEAKER_CONFIGS } from '../utils/voiceSpeech';
import { Volume2, VolumeX, Square, Play, Sparkles } from 'lucide-react';

interface VoiceSpeechWidgetProps {
  speakerId: SpeakerProfileId;
  textToSpeak: string;
  variant?: 'compact' | 'badge' | 'full';
  className?: string;
  autoPlayOnMount?: boolean;
}

export const VoiceSpeechWidget: React.FC<VoiceSpeechWidgetProps> = ({
  speakerId,
  textToSpeak,
  variant = 'compact',
  className = '',
  autoPlayOnMount = false,
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [currentSpeaker, setCurrentSpeaker] = useState<SpeakerProfileId | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(voiceSpeech.isVoiceEnabled());
  const [autoPlayEnabled, setAutoPlayEnabled] = useState<boolean>(voiceSpeech.isAutoPlayEnabled());

  useEffect(() => {
    const unsubscribe = voiceSpeech.subscribe((state) => {
      setIsSpeaking(state.isSpeaking);
      setCurrentSpeaker(state.speakerId);
    });

    if (autoPlayOnMount && voiceEnabled && autoPlayEnabled && textToSpeak) {
      // Small timeout so DOM is settled and user doesn't get abrupt start
      const t = setTimeout(() => {
        voiceSpeech.speak(textToSpeak, speakerId, false);
      }, 250);
      return () => {
        clearTimeout(t);
        unsubscribe();
      };
    }

    return () => {
      unsubscribe();
    };
  }, [speakerId, textToSpeak, autoPlayOnMount, voiceEnabled, autoPlayEnabled]);

  const isThisSpeakerActive = isSpeaking && currentSpeaker === speakerId;
  const config = SPEAKER_CONFIGS[speakerId] || SPEAKER_CONFIGS.default;

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isThisSpeakerActive) {
      voiceSpeech.stop();
    } else {
      voiceSpeech.speak(textToSpeak, speakerId, true);
    }
  };

  const handleToggleVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = voiceSpeech.toggleVoice();
    setVoiceEnabled(next);
  };

  const handleToggleAutoPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !autoPlayEnabled;
    voiceSpeech.setAutoPlayEnabled(next);
    setAutoPlayEnabled(next);
  };

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <button
          onClick={handleTogglePlay}
          title={isThisSpeakerActive ? 'Stop Voice' : `Play Voice (${config.name})`}
          className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
            isThisSpeakerActive
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
          }`}
        >
          {isThisSpeakerActive ? (
            <>
              <Square className="w-3 h-3 fill-current" />
              <span>Stop Voice</span>
              <span className="flex items-center gap-0.5 ml-1">
                <span className="w-1 h-3 bg-slate-950 animate-pulse rounded-full" />
                <span className="w-1 h-4 bg-slate-950 animate-bounce rounded-full" />
                <span className="w-1 h-2 bg-slate-950 animate-pulse rounded-full" />
              </span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-teal-400" />
              <span>Voice Acting</span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-between gap-3 p-2.5 px-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs ${className}`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={handleTogglePlay}
          title={isThisSpeakerActive ? 'Stop Speaking' : `Listen to ${config.name}`}
          className={`p-2 rounded-xl flex items-center justify-center transition-all active:scale-90 shrink-0 ${
            isThisSpeakerActive
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/40 ring-2 ring-amber-400/50'
              : 'bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40'
          }`}
        >
          {isThisSpeakerActive ? (
            <Square className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white truncate text-[13px]">
              {isThisSpeakerActive ? 'Speaking...' : `Listen to ${config.name}`}
            </span>
            {isThisSpeakerActive && (
              <span className="flex items-end gap-0.5 h-3.5 px-1 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
                <span className="w-0.5 h-2 bg-amber-400 animate-pulse rounded-full" />
                <span className="w-0.5 h-3 bg-amber-400 animate-bounce rounded-full" />
                <span className="w-0.5 h-1.5 bg-amber-400 animate-pulse rounded-full" />
                <span className="w-0.5 h-2.5 bg-amber-400 animate-bounce rounded-full" />
              </span>
            )}
          </div>
          <span className="text-[11px] font-mono text-slate-400 block truncate">
            {config.role}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={handleToggleAutoPlay}
          title={autoPlayEnabled ? 'Auto-Voice Enabled: Click to turn off' : 'Auto-Voice Off: Click to turn on'}
          className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-colors ${
            autoPlayEnabled
              ? 'bg-teal-950 text-teal-300 border border-teal-800'
              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          Auto {autoPlayEnabled ? 'ON' : 'OFF'}
        </button>

        <button
          onClick={handleToggleVoice}
          title={voiceEnabled ? 'Mute all speech' : 'Unmute speech'}
          className={`p-1.5 rounded-lg border transition-colors ${
            voiceEnabled
              ? 'bg-slate-800 hover:bg-slate-700 text-teal-400 border-slate-700'
              : 'bg-rose-950/40 text-rose-400 border-rose-800'
          }`}
        >
          {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
