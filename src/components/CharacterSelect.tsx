import React from 'react';
import { CharacterId, CharacterProfile } from '../types';
import { CHARACTERS } from '../data/characters';
import { CharacterAvatar } from './CharacterAvatar';
import { Play, Sparkles, ChevronRight, Clock } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface CharacterSelectProps {
  selectedCharacterId: CharacterId;
  onSelectCharacter: (id: CharacterId) => void;
  onStartStory: (id: CharacterId) => void;
  onOpenLifeAlbum: () => void;
  unlockedChapters: Record<CharacterId, boolean>;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({
  selectedCharacterId,
  onSelectCharacter,
  onStartStory,
  onOpenLifeAlbum,
  unlockedChapters,
}) => {
  const activeChar = CHARACTERS.find((c) => c.id === selectedCharacterId) || CHARACTERS[0];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'THE INVITATION':
        return 'bg-[#062423]/80 text-teal-300 border-teal-500/40';
      case 'ALREADY INVOLVED':
        return 'bg-[#1e1333]/80 text-teal-300 border-teal-500/40';
      case 'SELLING DRUGS':
        return 'bg-[#221c16]/80 text-slate-300 border-slate-700/60';
      case 'SOMEONE YOU LOVE':
        return 'bg-[#2b170a]/80 text-amber-300 border-amber-500/40';
      default:
        return 'bg-slate-800/60 text-slate-300 border-slate-700/50';
    }
  };

  const getRoleTextColor = (id: CharacterId) => {
    switch (id) {
      case 'maya':
        return 'text-teal-400';
      case 'jay':
        return 'text-purple-400';
      case 'eli':
        return 'text-slate-300';
      case 'lina':
        return 'text-orange-400';
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col justify-between min-h-[calc(100vh-5rem)] select-none">
      {/* Background Soft Neon Light Ambience matching reference image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft emerald blur behind Maya column */}
        <div className="absolute top-1/4 left-[8%] w-72 h-96 bg-teal-500/8 blur-[100px] rounded-full" />
        {/* Soft purple blur behind Jay column */}
        <div className="absolute top-1/3 left-[34%] w-72 h-96 bg-purple-500/10 blur-[100px] rounded-full" />
        {/* Soft slate/cyan blur behind Eli column */}
        <div className="absolute top-1/3 left-[60%] w-72 h-96 bg-blue-500/6 blur-[100px] rounded-full" />
        {/* Soft warm amber blur behind Lina column */}
        <div className="absolute top-1/4 right-[5%] w-72 h-96 bg-amber-500/9 blur-[100px] rounded-full" />
      </div>

      {/* Header Banner matching reference image */}
      <div className="relative z-10 mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d1624]/90 border border-teal-500/40 text-xs font-semibold text-teal-300 mb-3 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>Character Selection • Four Connected Perspectives</span>
        </div>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-normal">
          Meet the young people facing pressure, concealed use, supply, and family worry. Step into Maya’s shoes to begin Chapter 1.
        </p>
      </div>

      {/* 4 Connected Character Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        {CHARACTERS.map((char) => {
          const isSelected = char.id === selectedCharacterId;

          return (
            <div
              key={char.id}
              onClick={() => {
                soundFx.playClick();
                onSelectCharacter(char.id);
              }}
              className={`group relative rounded-2xl cursor-pointer p-5 transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#0e1726]/95 border-2 border-teal-400 shadow-[0_0_35px_rgba(45,212,191,0.25),inset_0_0_15px_rgba(45,212,191,0.05)] scale-[1.015]'
                  : 'bg-[#0c1320]/85 hover:bg-[#101a2b]/90 border border-slate-800/90 hover:border-slate-700/90 shadow-xl'
              }`}
            >
              {/* Card Top Badges */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded border ${getBadgeColor(
                      char.badge
                    )}`}
                  >
                    {char.badge}
                  </span>

                  {char.id === 'maya' && (
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-teal-400 text-slate-950 shadow-sm shadow-teal-400/40 uppercase tracking-wide">
                      PLAY NOW
                    </span>
                  )}

                  {char.id === 'lina' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40">
                      UNLOCKED
                    </span>
                  )}
                </div>

                {/* Circular Portrait with Exact Glow from reference */}
                <div className="flex justify-center my-4 sm:my-5">
                  <div className="transition-transform duration-300 group-hover:scale-105">
                    <CharacterAvatar characterId={char.id} size="lg" showGlow={true} />
                  </div>
                </div>

                {/* Character Name & Role on the same line, matching screenshot */}
                <div className="flex items-baseline justify-between mb-1.5">
                  <h3 className="text-xl font-black text-white tracking-wide font-sans">{char.name}</h3>
                  <span className={`text-xs font-semibold ${getRoleTextColor(char.id)}`}>
                    {char.role}
                  </span>
                </div>

                {/* Tagline Quote in Warm Amber Serif Italic */}
                <p className="text-xs italic text-amber-300/90 mb-2.5 font-serif">
                  “{char.tagline}”
                </p>

                {/* Summary */}
                <p className="text-xs text-slate-300/85 leading-relaxed mb-4 line-clamp-3 font-normal">
                  {char.summary}
                </p>
              </div>

              {/* Footer Relationship link with round button matching screenshot */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate max-w-[82%] font-normal">{char.keyRelationship}</span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-teal-400 text-slate-950 font-bold shadow-md shadow-teal-400/30'
                      : 'bg-slate-800/90 text-slate-400 border border-slate-700/80'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Selected Character Detail Panel matching reference image */}
      <div className="relative z-10 w-full bg-[#0a111b]/95 backdrop-blur-md rounded-2xl border border-slate-800/90 p-5 sm:p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
        <div className="flex items-center gap-4">
          {/* Miniature Square Avatar with Dark Border */}
          <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shrink-0 p-0.5 flex items-center justify-center shadow-md">
            <CharacterAvatar characterId={activeChar.id} size="sm" showGlow={false} />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold tracking-wider text-teal-400 uppercase">
                {activeChar.badge}
              </span>
              <span className="text-slate-500 font-bold">·</span>
              <span className="text-xs italic text-amber-300/90 font-serif">
                “{activeChar.tagline}”
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white tracking-wide font-sans">
              {activeChar.name}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed font-normal">
              {activeChar.summary}
            </p>
          </div>
        </div>

        {/* Action Controls matching reference screenshot */}
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={() => {
              soundFx.playClick();
              onStartStory(activeChar.id);
            }}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-teal-500/40 text-slate-100 font-bold text-xs shadow-lg shadow-teal-500/10 transition-all cursor-pointer active:scale-95"
          >
            {activeChar.id === 'maya' ? (
              <>
                <Play className="w-3.5 h-3.5 fill-current text-teal-400" />
                <span>Play Chapter 1 as Maya</span>
              </>
            ) : (
              <>
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                <span>Play Chapter 1 to unlock other perspectives</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom-Right Controller HUD matching reference screenshot: (X) 2  (Y) 14  ^ */}
      <div className="relative z-10 flex justify-end mt-4 pt-1">
        <div className="inline-flex items-center gap-3 text-slate-500 text-xs font-mono tracking-widest select-none">
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-400 font-bold">
              X
            </span>
            <span className="text-slate-400 font-semibold">2</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-400 font-bold">
              Y
            </span>
            <span className="text-slate-400 font-semibold">14</span>
          </span>
          <span className="text-slate-500 font-bold">^</span>
        </div>
      </div>
    </div>
  );
};
