import React from 'react';
import { GameMission, WorldEntity, CharacterId } from '../../types';
import {
  Compass,
  MapPin,
  CheckCircle2,
  Circle,
  Smartphone,
  BookOpen,
  Users,
  Swords,
  Volume2,
  VolumeX,
  Footprints,
  Info,
  ChevronRight,
  Crosshair,
} from 'lucide-react';

interface MissionHUDProps {
  mission: GameMission;
  activeCharacterId: CharacterId;
  nearbyEntity: WorldEntity | null;
  distanceToEntity: number;
  playerHeading: number; // In radians
  playerPosition: { x: number; z: number };
  sprintStamina: number;
  isSprinting: boolean;
  isMuted: boolean;
  currentLocation?: 'neighbourhood' | 'consequence_centre';
  onToggleLocation?: (targetLoc: 'neighbourhood' | 'consequence_centre') => void;
  onToggleMute: () => void;
  onInteract: () => void;
  onOpenPhone: () => void;
  onOpenLifeAlbum: () => void;
  onOpenCharacterSelect: () => void;
  onOpenCombatArcade: () => void;
  unreadPhoneCount: number;
  unlockedMemoryCount: number;
  totalMemories: number;
  // Mobile touch controls callbacks
  onVirtualMove?: (vector: { x: number; z: number }) => void;
  onToggleSprint?: () => void;
}

export const MissionHUD: React.FC<MissionHUDProps> = ({
  mission,
  activeCharacterId,
  nearbyEntity,
  distanceToEntity,
  playerHeading,
  playerPosition,
  sprintStamina,
  isSprinting,
  isMuted,
  currentLocation = 'neighbourhood',
  onToggleLocation,
  onToggleMute,
  onInteract,
  onOpenPhone,
  onOpenLifeAlbum,
  onOpenCharacterSelect,
  onOpenCombatArcade,
  unreadPhoneCount,
  unlockedMemoryCount,
  totalMemories,
  onVirtualMove,
  onToggleSprint,
}) => {
  const currentObj = mission.objectives[mission.currentObjectiveIndex] || mission.objectives[mission.objectives.length - 1];

  // Calculate distance to active mission target
  const distToObjective = Math.round(
    Math.hypot(currentObj.targetPosition.x - playerPosition.x, currentObj.targetPosition.z - playerPosition.z)
  );

  // Character metadata for bottom-left HUD
  const charMeta: Record<CharacterId, { name: string; role: string; color: string; border: string }> = {
    maya: { name: 'Maya', role: 'Track Captain', color: 'from-teal-500 to-emerald-600', border: 'border-teal-400' },
    jay: { name: 'Jay', role: 'Student Athlete', color: 'from-indigo-500 to-purple-600', border: 'border-indigo-400' },
    eli: { name: 'Eli', role: 'Polytechnic Youth', color: 'from-slate-500 to-zinc-600', border: 'border-slate-400' },
    lina: { name: 'Lina', role: 'Older Sister', color: 'from-amber-500 to-orange-600', border: 'border-amber-400' },
  };

  const meta = charMeta[activeCharacterId];

  // Compass degrees (0-360)
  const deg = ((playerHeading * 180) / Math.PI + 360) % 360;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-3 sm:p-5 select-none font-sans overflow-hidden">
      {/* 1. TOP BAR: Mission Tracker (Left) & Dynamic Compass / Mini-Map (Right) */}
      <div className="flex items-start justify-between gap-4">
        {/* Top-Left: Fortnite-inspired Mission Tracker Card */}
        <div className="pointer-events-auto max-w-sm sm:max-w-md w-full bg-slate-950/85 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-3.5 sm:p-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-teal-950 border border-teal-500/60 text-[10px] font-mono uppercase tracking-wider text-teal-300 font-bold">
                CHAPTER {mission.chapterNumber} MISSION
              </span>
              <span className="text-xs font-mono text-slate-400">
                Step {mission.currentObjectiveIndex + 1}/{mission.objectives.length}
              </span>
            </div>
            {distToObjective > 0 && (
              <div className="flex items-center gap-1 text-[11px] font-mono text-amber-300 font-bold bg-amber-950/50 px-2 py-0.5 rounded-lg border border-amber-800/60">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>{distToObjective}m</span>
              </div>
            )}
          </div>

          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
            {currentObj.title}
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
            {currentObj.description}
          </p>

          {/* Objective Progress Bar */}
          <div className="mt-3 flex items-center gap-1.5">
            {mission.objectives.map((obj, i) => (
              <div
                key={obj.id}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  obj.isCompleted
                    ? 'bg-teal-400'
                    : i === mission.currentObjectiveIndex
                    ? 'bg-amber-400 animate-pulse'
                    : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Top-Right: Dynamic Compass Bar & Radar Mini-Map */}
        <div className="pointer-events-auto flex flex-col items-end gap-2">
          {/* Compass Bar */}
          <div className="hidden sm:flex items-center justify-center w-52 h-9 rounded-xl bg-slate-950/85 backdrop-blur-xl border border-slate-700/80 px-3 text-xs font-mono text-slate-300 shadow-lg">
            <Compass className="w-4 h-4 text-teal-400 mr-2 shrink-0" />
            <div className="flex items-center gap-3 overflow-hidden text-[11px] font-bold">
              <span className={deg >= 337 || deg < 23 ? 'text-teal-300 font-bold' : 'text-slate-500'}>N</span>
              <span className={deg >= 23 && deg < 68 ? 'text-teal-300 font-bold' : 'text-slate-500'}>NE</span>
              <span className={deg >= 68 && deg < 113 ? 'text-teal-300 font-bold' : 'text-slate-500'}>E</span>
              <span className={deg >= 113 && deg < 158 ? 'text-teal-300 font-bold' : 'text-slate-500'}>SE</span>
              <span className={deg >= 158 && deg < 203 ? 'text-teal-300 font-bold' : 'text-slate-500'}>S</span>
              <span className={deg >= 203 && deg < 248 ? 'text-teal-300 font-bold' : 'text-slate-500'}>SW</span>
              <span className={deg >= 248 && deg < 293 ? 'text-teal-300 font-bold' : 'text-slate-500'}>W</span>
              <span className={deg >= 293 && deg < 337 ? 'text-teal-300 font-bold' : 'text-slate-500'}>NW</span>
            </div>
            <span className="ml-2 text-[10px] text-slate-400 font-mono">{Math.round(deg)}°</span>
          </div>

          {/* Circular Radar Mini-Map */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-slate-700/80 p-1 shadow-2xl overflow-hidden flex items-center justify-center">
            {/* Grid concentric rings */}
            <div className="absolute inset-2 rounded-full border border-slate-800" />
            <div className="absolute inset-6 rounded-full border border-slate-800/60" />
            <div className="absolute w-full h-[1px] bg-slate-800/70" />
            <div className="absolute h-full w-[1px] bg-slate-800/70" />

            {/* Target Waypoint Dot */}
            <div
              className="absolute w-3 h-3 rounded-full bg-amber-400 border border-white shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-ping"
              style={{
                left: `${Math.min(90, Math.max(10, 50 + (currentObj.targetPosition.x - playerPosition.x) * 0.7))}%`,
                top: `${Math.min(90, Math.max(10, 50 + (currentObj.targetPosition.z - playerPosition.z) * 0.7))}%`,
              }}
            />
            <div
              className="absolute w-2.5 h-2.5 rounded-full bg-amber-400 border border-white shadow-md"
              style={{
                left: `${Math.min(90, Math.max(10, 50 + (currentObj.targetPosition.x - playerPosition.x) * 0.7))}%`,
                top: `${Math.min(90, Math.max(10, 50 + (currentObj.targetPosition.z - playerPosition.z) * 0.7))}%`,
              }}
            />

            {/* Player Arrow at Center */}
            <div
              className="w-3 h-3 border-l-4 border-r-4 border-b-[8px] border-l-transparent border-r-transparent border-b-teal-400 drop-shadow-md z-10"
              style={{ transform: `rotate(${deg}deg)` }}
            />

            <span className="absolute bottom-1 right-2 text-[9px] font-mono text-slate-500 uppercase tracking-wider">
              {currentLocation === 'consequence_centre' ? 'SPF RADAR' : 'ESTATE RADAR'}
            </span>
          </div>

          {/* Location Fast Travel Quick Switcher */}
          {onToggleLocation && (
            <button
              onClick={() =>
                onToggleLocation(
                  currentLocation === 'consequence_centre' ? 'neighbourhood' : 'consequence_centre'
                )
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-teal-500/60 text-[11px] font-mono font-bold text-teal-300 shadow-md transition-all active:scale-95"
            >
              <span>
                {currentLocation === 'consequence_centre'
                  ? '🌳 Exit to HDB Estate'
                  : '🏛️ Enter Consequence Centre'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* 2. CENTER: Contextual Action Prompt when near interactable */}
      <div className="flex flex-col items-center justify-center my-auto">
        {nearbyEntity && (
          <div className="pointer-events-auto animate-bounce duration-700">
            <button
              onClick={onInteract}
              className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border-2 border-teal-400 shadow-[0_0_35px_rgba(20,184,166,0.4)] text-white hover:bg-teal-950 transition-all cursor-pointer scale-105 active:scale-95"
            >
              <div className="w-8 h-8 rounded-xl bg-teal-500 text-slate-950 font-mono font-black text-sm flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                E
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-teal-300 block font-bold">
                  {nearbyEntity.type === 'npc' ? 'INTERACT WITH NPC' : 'INSPECT OBJECT'}
                </span>
                <span className="text-sm font-bold tracking-tight text-white group-hover:text-teal-200">
                  {nearbyEntity.promptText}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-teal-300 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* 3. BOTTOM BAR: Player Vitals (Left) & Exploration Action Dock (Right) */}
      <div className="flex items-end justify-between gap-3">
        {/* Bottom-Left: Realism Character Vitals & Stamina HUD */}
        <div className="pointer-events-auto bg-slate-950/85 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-3 sm:p-3.5 shadow-2xl flex items-center gap-3 max-w-xs w-full">
          {/* Avatar Icon */}
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${meta.color} border-2 ${meta.border} shadow-lg flex items-center justify-center text-white font-bold text-lg shrink-0`}
          >
            {meta.name[0]}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-xs font-bold text-white tracking-wide truncate">
                {meta.name}
              </span>
              <span className="text-[10px] font-mono text-teal-400">
                {meta.role}
              </span>
            </div>

            {/* Resolve / Clarity Gauge */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Resolve</span>
                <span className="text-teal-300 font-bold">100%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 w-full" />
              </div>
            </div>

            {/* Stamina Bar */}
            <div className="mt-1.5 space-y-0.5">
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-100 ${
                    sprintStamina < 25 ? 'bg-rose-500' : 'bg-cyan-400'
                  }`}
                  style={{ width: `${sprintStamina}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Center-Bottom: Controls Help Pills (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-800">
          <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">W</kbd><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">A</kbd><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">S</kbd><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">D</kbd> Move</span>
          <span>•</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">Shift</kbd> Sprint</span>
          <span>•</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">E</kbd> Interact</span>
          <span>•</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">Drag</kbd> Rotate View</span>
        </div>

        {/* Bottom-Right: Quick Action Dock */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Audio Mute Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-2.5 rounded-xl bg-slate-950/85 hover:bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white transition-all shadow-xl"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-teal-400" />}
          </button>

          {/* Change Character */}
          <button
            onClick={onOpenCharacterSelect}
            title="Switch Character Perspective"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950/85 hover:bg-slate-900 border border-slate-700/80 text-xs font-medium text-slate-200 hover:text-white transition-all shadow-xl"
          >
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Perspectives</span>
          </button>

          {/* Combat Reflex Challenge */}
          <button
            onClick={onOpenCombatArcade}
            title="Open Combat Reflex Arcade"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950/85 hover:bg-slate-900 border border-slate-700/80 text-xs font-medium text-amber-300 hover:text-amber-200 transition-all shadow-xl"
          >
            <Swords className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Arcade</span>
          </button>

          {/* Life Album Button */}
          <button
            onClick={onOpenLifeAlbum}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950/85 hover:bg-slate-900 border border-slate-700/80 text-xs font-medium text-emerald-300 hover:text-emerald-200 transition-all shadow-xl"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Life Album</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              {unlockedMemoryCount}/{totalMemories}
            </span>
          </button>

          {/* Smartphone Simulator */}
          <button
            onClick={onOpenPhone}
            className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-teal-500/20"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Phone</span>
            {unreadPhoneCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute -top-1 -right-1" />
            )}
          </button>
        </div>
      </div>

      {/* 4. MOBILE ON-SCREEN TOUCH CONTROLS */}
      <div className="pointer-events-auto md:hidden absolute bottom-20 left-4 flex flex-col items-center gap-2">
        <div className="grid grid-cols-3 gap-1.5 p-2 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-slate-800">
          <div />
          <button
            onTouchStart={() => onVirtualMove?.({ x: 0, z: -1 })}
            onTouchEnd={() => onVirtualMove?.({ x: 0, z: 0 })}
            className="w-11 h-11 rounded-xl bg-slate-800 active:bg-teal-500 active:text-slate-950 text-white font-bold text-sm flex items-center justify-center"
          >
            ▲
          </button>
          <div />
          <button
            onTouchStart={() => onVirtualMove?.({ x: -1, z: 0 })}
            onTouchEnd={() => onVirtualMove?.({ x: 0, z: 0 })}
            className="w-11 h-11 rounded-xl bg-slate-800 active:bg-teal-500 active:text-slate-950 text-white font-bold text-sm flex items-center justify-center"
          >
            ◀
          </button>
          <button
            onTouchStart={() => onVirtualMove?.({ x: 0, z: 1 })}
            onTouchEnd={() => onVirtualMove?.({ x: 0, z: 0 })}
            className="w-11 h-11 rounded-xl bg-slate-800 active:bg-teal-500 active:text-slate-950 text-white font-bold text-sm flex items-center justify-center"
          >
            ▼
          </button>
          <button
            onTouchStart={() => onVirtualMove?.({ x: 1, z: 0 })}
            onTouchEnd={() => onVirtualMove?.({ x: 0, z: 0 })}
            className="w-11 h-11 rounded-xl bg-slate-800 active:bg-teal-500 active:text-slate-950 text-white font-bold text-sm flex items-center justify-center"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Mobile Sprint & Action Button on Right */}
      <div className="pointer-events-auto md:hidden absolute bottom-20 right-4 flex flex-col items-center gap-2">
        <button
          onClick={onToggleSprint}
          className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-colors ${
            isSprinting
              ? 'bg-amber-500 text-slate-950 border-amber-400'
              : 'bg-slate-900/90 text-slate-300 border-slate-700'
          }`}
        >
          <Footprints className="w-4 h-4 inline mr-1" />
          {isSprinting ? 'SPRINT ON' : 'WALK'}
        </button>

        {nearbyEntity && (
          <button
            onClick={onInteract}
            className="w-14 h-14 rounded-2xl bg-teal-500 active:bg-teal-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.6)] animate-pulse"
          >
            E
          </button>
        )}
      </div>
    </div>
  );
};
