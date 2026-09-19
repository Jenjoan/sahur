import React from 'react';
import { ChapterData, CharacterId } from '../types';
import { CHARACTERS } from '../data/characters';
import { CharacterAvatar } from './CharacterAvatar';
import { soundFx } from '../utils/soundEffects';
import {
  RotateCcw,
  ArrowRight,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Heart,
  Scale,
  CheckCircle2,
} from 'lucide-react';

interface ChapterSummaryProps {
  chapter: ChapterData;
  characterId: CharacterId;
  onReplay: () => void;
  onContinueNext: () => void;
  onOpenLifeAlbum: () => void;
  onBackToCharacterSelect: () => void;
  flags: Record<string, boolean | string | number>;
}

export const ChapterSummary: React.FC<ChapterSummaryProps> = ({
  chapter,
  characterId,
  onReplay,
  onContinueNext,
  onOpenLifeAlbum,
  onBackToCharacterSelect,
  flags,
}) => {
  const char = CHARACTERS.find((c) => c.id === characterId) || CHARACTERS[0];

  // Dynamic next character flow: Maya -> Jay -> Eli -> Lina
  const getNextCharacterId = (curr: CharacterId): CharacterId => {
    switch (curr) {
      case 'maya':
        return 'jay';
      case 'jay':
        return 'eli';
      case 'eli':
        return 'lina';
      case 'lina':
        return 'maya';
    }
  };

  const nextCharId = getNextCharacterId(characterId);
  const nextChar = CHARACTERS.find((c) => c.id === nextCharId) || CHARACTERS[0];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fadeIn">
      {/* Summary Card */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Header Badge */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
              CHAPTER {chapter.chapterNumber} CONCLUDED
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Perspective: {char.name}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Story Record Saved</span>
          </div>
        </div>

        {/* Character Title & Portrait */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <CharacterAvatar characterId={characterId} size="xl" showGlow={true} />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 font-display">
              {chapter.title}
            </h2>
            <p className="text-sm text-teal-300 font-mono mb-2">{chapter.subtitle}</p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              {chapter.summaryTakeaway}
            </p>
          </div>
        </div>

        {/* The Reflection Question Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-teal-950/40 via-slate-950 to-indigo-950/40 border border-teal-500/30 mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-teal-400 block mb-1">
              Core Awareness Reflection
            </span>
            <p className="text-base sm:text-lg font-bold text-white font-display">
              "One more choice — what could it change?"
            </p>
            <p className="text-xs text-slate-300 mt-1">
              Every decision you made altered trust, physiological health, and exposure to the law.
            </p>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenLifeAlbum();
            }}
            className="shrink-0 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Review Unlocked Memories</span>
          </button>
        </div>

        {/* Official Singapore Fact Reference */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 mb-8 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-teal-300 block mb-0.5">
              Official Prevention Insight:
            </span>
            <p className="text-slate-400 leading-relaxed">{chapter.officialFactRef}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                soundFx.playClick();
                onReplay();
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Explore Alternate Choices</span>
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                onBackToCharacterSelect();
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              <span>Character Select</span>
            </button>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onContinueNext();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 transition-all transform active:scale-95"
          >
            <span>Step into {nextChar.name}'s Shoes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
