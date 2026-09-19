import React from 'react';
import { BookOpen, Smartphone, Volume2, VolumeX, RotateCcw, Home, Swords } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface HeaderProps {
  currentChapterNum: number;
  onOpenLifeAlbum: () => void;
  onOpenPhone: () => void;
  onOpenCombatArcade: () => void;
  onGoHome: () => void;
  onToggle3DAdventure?: () => void;
  onResetStory: () => void;
  unlockedMemoryCount: number;
  totalMemories: number;
  unreadPhoneCount: number;
  viewMode: 'character_select' | 'story' | 'summary' | 'adventure_3d';
}

export const Header: React.FC<HeaderProps> = ({
  currentChapterNum,
  onOpenLifeAlbum,
  onOpenPhone,
  onOpenCombatArcade,
  onGoHome,
  onToggle3DAdventure,
  onResetStory,
  unlockedMemoryCount,
  totalMemories,
  unreadPhoneCount,
  viewMode,
}) => {
  const [isMuted, setIsMuted] = React.useState<boolean>(soundFx.getMuted());

  const handleToggleMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="w-full bg-[#080d14]/95 backdrop-blur-md border-b border-slate-800/90 sticky top-0 z-40 px-4 sm:px-8 py-3 flex items-center justify-between">
      {/* Left: Branding & Chapter Tag matching reference image */}
      <div className="flex items-center gap-3 cursor-pointer select-none" onClick={onGoHome}>
        <div className="w-8 h-8 rounded-full bg-teal-400 text-slate-950 font-black flex items-center justify-center text-xs tracking-tighter shadow-md shadow-teal-500/30 shrink-0">
          1MC
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-sm sm:text-base font-extrabold tracking-wider text-white font-sans uppercase">
              ONE MORE CHOICE
            </h1>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#072522] border border-teal-500/50 text-teal-300">
              CHAPTER {currentChapterNum}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block font-normal">
            Four lives in Singapore. One connected drug-related choice.
          </p>
        </div>
      </div>

      {/* Right Navigation & Tools matching reference image */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Home / Character Select Button when inside story */}
        {viewMode === 'story' && (
          <button
            onClick={() => {
              soundFx.playClick();
              onGoHome();
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
            title="Return to Character Selection"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Characters</span>
          </button>
        )}

        {/* Life Album Button (with exact counter matching reference screenshot "Life Album 7/7") */}
        <button
          onClick={() => {
            soundFx.playClick();
            onOpenLifeAlbum();
          }}
          className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#0e1724]/90 hover:bg-[#152336] border border-teal-500/40 text-xs font-semibold text-teal-200 hover:text-white transition-all flex items-center gap-1.5 sm:gap-2 shadow-sm"
        >
          <BookOpen className="w-3.5 h-3.5 text-teal-400" />
          <span className="font-semibold">Life Album</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#062423] text-teal-300 border border-teal-500/30">
            {unlockedMemoryCount}/{totalMemories}
          </span>
        </button>

        {/* 3D Adventure Toggle Button */}
        {onToggle3DAdventure && (
          <button
            onClick={() => {
              soundFx.playClick();
              onToggle3DAdventure();
            }}
            className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 sm:gap-2 shadow-sm ${
              viewMode === 'adventure_3d'
                ? 'bg-teal-500 text-slate-950 font-bold border border-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.4)]'
                : 'bg-[#121c2c]/90 hover:bg-[#19273c] border border-slate-700 text-slate-200'
            }`}
            title="Explore Singapore Neighbourhood in 3D"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">
              {viewMode === 'adventure_3d' ? '3D Active' : 'Explore 3D Estate'}
            </span>
          </button>
        )}

        {/* Combat Arcade Button (matching exact button in reference screenshot) */}
        <button
          onClick={() => {
            soundFx.playClick();
            onOpenCombatArcade();
          }}
          className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#141822]/90 hover:bg-[#1c2230] border border-amber-500/40 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-all flex items-center gap-1.5 sm:gap-2 shadow-sm"
          title="Open Combat Arcade Reflex Challenge"
        >
          <Swords className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold hidden sm:inline">Combat Arcade</span>
        </button>

        {/* Phone Simulator Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onOpenPhone();
          }}
          className="relative p-2 rounded-xl bg-[#0e1724]/90 hover:bg-[#152336] border border-slate-800 text-teal-300 hover:text-teal-200 transition-all flex items-center gap-1.5 text-xs font-medium"
          title="Open Simulated Phone"
        >
          <Smartphone className="w-4 h-4" />
          <span className="hidden xl:inline font-semibold">Phone</span>
          {unreadPhoneCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          )}
        </button>

        {/* Sound Toggle */}
        <button
          onClick={handleToggleMute}
          title={isMuted ? 'Unmute Game Audio' : 'Mute Game Audio'}
          className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-teal-400" />}
        </button>

        {/* Reset Storyline Option */}
        <button
          onClick={() => {
            if (window.confirm('Reset all story choices and replay from Chapter 1?')) {
              soundFx.playClick();
              onResetStory();
            }
          }}
          title="Reset Storyline & Choices"
          className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-500 hover:text-slate-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
