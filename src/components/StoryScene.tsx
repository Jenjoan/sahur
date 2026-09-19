import React, { useState, useEffect } from 'react';
import { CharacterId, ChoiceOption, DialogueNode, ChapterData } from '../types';
import { CinematicSceneArt } from './CinematicSceneArt';
import { CharacterAvatar } from './CharacterAvatar';
import { soundFx } from '../utils/soundEffects';
import {
  Smartphone,
  BookOpen,
  ArrowRight,
  Clock,
  MapPin,
  Sparkles,
  AlertCircle,
  ShieldCheck,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface StorySceneProps {
  currentNode: DialogueNode;
  chapter: ChapterData;
  onMakeChoice: (choice: ChoiceOption) => void;
  onNextNode: (nextNodeId: string) => void;
  onOpenPhone: (initialChatId?: string) => void;
  onOpenLifeAlbum: () => void;
  onReplayChapter: () => void;
  unreadPhoneCount: number;
  lastConsequence: { text: string; type: 'positive' | 'warning' | 'critical' | 'neutral'; insight?: string } | null;
  onClearConsequence: () => void;
}

export const StoryScene: React.FC<StorySceneProps> = ({
  currentNode,
  chapter,
  onMakeChoice,
  onNextNode,
  onOpenPhone,
  onOpenLifeAlbum,
  onReplayChapter,
  unreadPhoneCount,
  lastConsequence,
  onClearConsequence,
}) => {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(20);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getMuted());

  // Reset timer on new node
  useEffect(() => {
    setTimerSeconds(25);
    setSelectedChoiceId(null);
  }, [currentNode.id]);

  // Decision timer countdown
  useEffect(() => {
    if (!isTimerActive || !currentNode.choices || currentNode.choices.length === 0) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          // Timer expired - don't crash, pause timer and play heartbeat
          soundFx.playHeartbeat();
          return 0;
        }
        if (prev <= 5) {
          soundFx.playHeartbeat();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerActive, currentNode.choices]);

  // Keyboard shortcut listeners for choices [1, 2, 3, 4]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentNode.choices || currentNode.choices.length === 0) return;
      const keyIndex = parseInt(e.key, 10) - 1;
      if (keyIndex >= 0 && keyIndex < currentNode.choices.length) {
        handleChoiceClick(currentNode.choices[keyIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentNode.choices]);

  const handleChoiceClick = (choice: ChoiceOption) => {
    setSelectedChoiceId(choice.id);
    soundFx.playChoiceChime(choice.consequenceType);
    onMakeChoice(choice);
  };

  const toggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden bg-slate-950 select-none">
      {/* Cinematic Environmental Vector Backdrop */}
      <CinematicSceneArt sceneType={currentNode.sceneBackground} ambientMood={currentNode.ambientMood} />

      {/* Top Scene HUD Header */}
      <div className="relative z-20 w-full px-4 sm:px-8 pt-4 pb-2 flex items-center justify-between bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent">
        {/* Left: Location & Time Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-slate-300 shadow-md">
            <MapPin className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-semibold text-white">{currentNode.location}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/60 backdrop-blur-md border border-slate-800 text-xs font-mono text-slate-400">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{currentNode.timeOfDay}</span>
          </div>
        </div>

        {/* Right: Quick In-Game Controls */}
        <div className="flex items-center gap-2">
          {/* Sound Mute Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-teal-400" />}
          </button>

          {/* Life Album Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenLifeAlbum();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-amber-300 hover:text-amber-200 transition-colors shadow-md"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Life Album</span>
          </button>

          {/* Smartphone Simulator Button with Notification Pill */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenPhone();
            }}
            className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-teal-300 hover:text-teal-200 transition-colors shadow-md"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Phone</span>
            {unreadPhoneCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute -top-1 -right-1" />
            )}
          </button>
        </div>
      </div>

      {/* In-Scene Incoming Notification Banner (if any) */}
      {currentNode.incomingPhoneNotification && (
        <div className="relative z-30 mx-auto mt-2 max-w-md w-full px-4 animate-bounce duration-1000">
          <div
            onClick={() => {
              soundFx.playNotification();
              onOpenPhone(currentNode.incomingPhoneNotification?.chatId);
            }}
            className="cursor-pointer bg-slate-900/95 backdrop-blur-xl border border-teal-500/50 rounded-xl p-3 shadow-[0_0_25px_rgba(20,184,166,0.3)] flex items-center justify-between gap-3 hover:border-teal-400 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-teal-300">
                    {currentNode.incomingPhoneNotification.sender}
                  </span>
                  <span className="text-[10px] text-slate-500">just now</span>
                </div>
                <p className="text-xs text-slate-200 truncate max-w-xs">
                  {currentNode.incomingPhoneNotification.message}
                </p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-teal-400 bg-teal-950/60 px-2 py-1 rounded border border-teal-800/60">
              Open
            </span>
          </div>
        </div>
      )}

      {/* Consequence Ripple Notification Banner */}
      {lastConsequence && (
        <div className="relative z-30 mx-auto max-w-2xl w-full px-4 my-2">
          <div
            className={`p-3.5 rounded-xl backdrop-blur-xl border shadow-xl flex items-start justify-between gap-3 ${
              lastConsequence.type === 'positive'
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100'
                : lastConsequence.type === 'critical'
                ? 'bg-rose-950/90 border-rose-500/50 text-rose-100'
                : 'bg-amber-950/90 border-amber-500/50 text-amber-100'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {lastConsequence.type === 'positive' ? (
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="text-xs font-mono font-bold tracking-wide uppercase opacity-80 block mb-0.5">
                  Consequence Registered
                </span>
                <p className="text-xs sm:text-sm font-medium leading-snug">
                  {lastConsequence.text}
                </p>
                {lastConsequence.insight && (
                  <p className="text-[11px] mt-1.5 opacity-90 italic border-t border-current/20 pt-1">
                    💡 <span className="font-semibold">Insight:</span> {lastConsequence.insight}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClearConsequence}
              className="text-xs font-bold px-2 py-1 rounded bg-black/30 hover:bg-black/50 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Middle Stage: Character Focus */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        {/* Subtle emotional pulse halo */}
        <div className="relative">
          <CharacterAvatar
            characterId={currentNode.characterId}
            emotion={currentNode.emotion}
            size="xl"
            showGlow={true}
          />
          {/* Emotion Badge Pill */}
          {currentNode.emotion && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-[11px] font-mono uppercase tracking-wider text-teal-300 shadow-md">
              {currentNode.emotion}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Area: Cinematic Dialogue & Detroit/Life is Strange Choice Controls */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 pb-6">
        {/* Dialogue Box */}
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl mb-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-wide text-teal-400 uppercase">
                {currentNode.speaker}
              </span>
              {currentNode.speakerRole && (
                <span className="text-xs text-slate-500 font-mono">
                  • {currentNode.speakerRole}
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              {chapter.title}
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans font-normal">
            {currentNode.text}
          </p>

          {/* Non-choice progression button if dialogue is linear */}
          {!currentNode.choices && currentNode.nextNodeId && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  soundFx.playClick();
                  onNextNode(currentNode.nextNodeId!);
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-teal-500/20"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Chapter End Summary trigger */}
          {currentNode.isChapterEnd && (
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 text-xs text-amber-300">
                <Sparkles className="w-4 h-4" />
                <span>Chapter Reflection Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onReplayChapter();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Chapter</span>
                </button>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onOpenLifeAlbum();
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Review in Life Album</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Detroit / Life is Strange Floating Choices Grid */}
        {currentNode.choices && currentNode.choices.length > 0 && (
          <div className="space-y-2.5">
            {/* Decision Countdown Timer Bar */}
            <div className="flex items-center justify-between gap-3 text-xs text-slate-400 px-1 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span>Decision Point — What will you do?</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTimerActive(!isTimerActive)}
                  className="text-[10px] text-slate-500 hover:text-slate-300 underline cursor-pointer"
                >
                  {isTimerActive ? 'Pause Timer' : 'Resume Timer'}
                </button>
                <span className={`font-bold ${timerSeconds <= 5 ? 'text-rose-400' : 'text-slate-300'}`}>
                  {timerSeconds}s
                </span>
              </div>
            </div>

            {/* Decision Timer Progress Bar */}
            {isTimerActive && (
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ease-linear ${
                    timerSeconds <= 5 ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]' : 'bg-teal-400'
                  }`}
                  style={{ width: `${(timerSeconds / 25) * 100}%` }}
                />
              </div>
            )}

            {/* Floating Choice Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {currentNode.choices.map((choice, index) => {
                const isSelected = selectedChoiceId === choice.id;
                const glyph = choice.keyGlyph || (index + 1).toString();

                return (
                  <button
                    key={choice.id}
                    onClick={() => handleChoiceClick(choice)}
                    className={`group text-left p-3.5 rounded-xl border transition-all duration-200 relative overflow-hidden backdrop-blur-md flex items-start gap-3 ${
                      isSelected
                        ? 'bg-teal-950/80 border-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.3)] scale-[0.99]'
                        : 'bg-slate-900/80 hover:bg-slate-800/90 border-slate-700/80 hover:border-teal-500/50 shadow-lg'
                    }`}
                  >
                    {/* Controller / Key Glyph Badge */}
                    <div className="w-7 h-7 rounded-lg bg-slate-800 group-hover:bg-teal-500 group-hover:text-slate-950 text-teal-400 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors shadow-inner">
                      {glyph}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-xs sm:text-sm font-bold text-white group-hover:text-teal-200 transition-colors">
                          {choice.text}
                        </span>
                      </div>
                      {choice.subtext && (
                        <p className="text-[11px] text-slate-400 group-hover:text-slate-300 leading-snug">
                          {choice.subtext}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
