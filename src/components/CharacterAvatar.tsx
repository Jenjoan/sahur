import React from 'react';
import { CharacterId } from '../types';

interface CharacterAvatarProps {
  characterId: CharacterId | 'chloe' | 'mark' | 'counsellor';
  emotion?: 'neutral' | 'anxious' | 'firm' | 'conflicted' | 'panicked' | 'relieved' | 'caring';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showGlow?: boolean;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  characterId,
  emotion = 'neutral',
  size = 'md',
  showGlow = true,
}) => {
  const sizeClasses = {
    sm: 'w-11 h-11',
    md: 'w-16 h-16',
    lg: 'w-24 h-24 sm:w-28 sm:h-28',
    xl: 'w-36 h-36',
  }[size];

  // Exact glow & ring matching the theme image
  const getAvatarStyles = () => {
    switch (characterId) {
      case 'maya':
        return {
          glow: 'ring-4 ring-teal-400 shadow-[0_0_26px_rgba(45,212,191,0.6)]',
          bg: 'from-[#0d2a2a] via-[#091e20] to-[#040e10]',
          accent: '#2dd4bf',
        };
      case 'jay':
        return {
          glow: 'ring-4 ring-purple-400 shadow-[0_0_26px_rgba(192,132,252,0.5)]',
          bg: 'from-[#231238] via-[#160c24] to-[#0a0512]',
          accent: '#c084fc',
        };
      case 'eli':
        return {
          glow: 'ring-[3px] ring-slate-400/80 shadow-[0_0_18px_rgba(148,163,184,0.35)]',
          bg: 'from-[#192231] via-[#111822] to-[#080d14]',
          accent: '#94a3b8',
        };
      case 'lina':
        return {
          glow: 'ring-4 ring-amber-500 shadow-[0_0_26px_rgba(245,158,11,0.55)]',
          bg: 'from-[#331c0a] via-[#211105] to-[#0f0701]',
          accent: '#f59e0b',
        };
      case 'mark':
        return {
          glow: 'ring-4 ring-red-500 shadow-[0_0_24px_rgba(239,68,68,0.45)]',
          bg: 'from-[#2b0c0c] via-[#1a0606] to-[#0a0202]',
          accent: '#ef4444',
        };
      default:
        return {
          glow: 'ring-2 ring-slate-400 shadow-md',
          bg: 'from-slate-800 via-slate-900 to-slate-950',
          accent: '#94a3b8',
        };
    }
  };

  const style = getAvatarStyles();

  return (
    <div
      className={`relative rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-b ${style.bg} ${
        showGlow ? style.glow : 'border border-slate-700'
      } ${sizeClasses} transition-all duration-300 select-none`}
    >
      {/* 3D-Look Stylized Vector Portrait */}
      <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Radial light spotlight behind head */}
          <radialGradient id={`halo_${characterId}`} cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={style.accent} stopOpacity="0.25" />
            <stop offset="100%" stopColor={style.accent} stopOpacity="0" />
          </radialGradient>

          {/* Skin tones */}
          <linearGradient id={`skin_${characterId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8d6b8" />
            <stop offset="55%" stopColor="#ebb78e" />
            <stop offset="100%" stopColor="#d19567" />
          </linearGradient>

          <linearGradient id={`skin_shadow_${characterId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d19567" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#a3633a" stopOpacity="0.9" />
          </linearGradient>

          {/* Hair gradients */}
          <linearGradient id={`hair_${characterId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2c2725" />
            <stop offset="40%" stopColor="#1a1715" />
            <stop offset="100%" stopColor="#0d0b0a" />
          </linearGradient>
        </defs>

        {/* Halo Glow */}
        <circle cx="60" cy="55" r="45" fill={`url(#halo_${characterId})`} />

        {/* CLOTHING & SHOULDERS */}
        {characterId === 'maya' && (
          // Athletic Track Jacket (Deep Navy & Teal with clean white collar and stripes)
          <g>
            {/* Neck */}
            <path d="M 46 72 L 74 72 L 78 92 L 42 92 Z" fill={`url(#skin_${characterId})`} />
            <path d="M 46 75 Q 60 84 74 75 L 74 80 Q 60 89 46 80 Z" fill={`url(#skin_shadow_${characterId})`} opacity="0.4" />
            
            {/* Navy Body & Teal Shoulders */}
            <path d="M 22 92 C 34 85 86 85 98 92 L 108 120 L 12 120 Z" fill="#0f172a" />
            {/* Teal Shoulder Accents */}
            <path d="M 22 92 C 35 86 48 88 50 98 L 30 120 L 12 120 Z" fill="#0d9488" />
            <path d="M 98 92 C 85 86 72 88 70 98 L 90 120 L 108 120 Z" fill="#0d9488" />
            {/* White Collar Trim */}
            <path d="M 44 88 L 60 102 L 76 88 L 72 83 L 60 94 L 48 83 Z" fill="#ffffff" />
            {/* Zip Line */}
            <line x1="60" y1="102" x2="60" y2="120" stroke="#f1f5f9" strokeWidth="2.5" />
            {/* Track emblem */}
            <circle cx="38" cy="106" r="3" fill="#facc15" />
          </g>
        )}

        {characterId === 'jay' && (
          // School Zip Hoodie (Midnight Navy with grey inner lining)
          <g>
            <path d="M 46 72 L 74 72 L 78 92 L 42 92 Z" fill={`url(#skin_${characterId})`} />
            <path d="M 46 75 Q 60 84 74 75 L 74 80 Q 60 89 46 80 Z" fill={`url(#skin_shadow_${characterId})`} opacity="0.5" />
            {/* Hoodie outer */}
            <path d="M 22 92 C 34 86 86 86 98 92 L 108 120 L 12 120 Z" fill="#1e1e2d" />
            {/* Grey inner hood rim */}
            <path d="M 40 88 Q 60 100 80 88 L 84 96 Q 60 108 36 96 Z" fill="#334155" />
            {/* Slumped posture / dark crew */}
            <path d="M 46 95 L 60 120 L 74 95 Z" fill="#0f172a" />
          </g>
        )}

        {characterId === 'eli' && (
          // Polytechnic youth dark olive / charcoal streetwear crewneck
          <g>
            <path d="M 46 72 L 74 72 L 78 92 L 42 92 Z" fill={`url(#skin_${characterId})`} />
            <path d="M 20 92 C 32 85 88 85 100 92 L 110 120 L 10 120 Z" fill="#292d32" />
            {/* Ribbed crewneck ring */}
            <path d="M 42 88 Q 60 100 78 88 L 76 93 Q 60 104 44 93 Z" fill="#181a1d" />
          </g>
        )}

        {characterId === 'lina' && (
          // Warm amber / burnt orange knitted winter/fall crew sweater
          <g>
            <path d="M 46 72 L 74 72 L 78 92 L 42 92 Z" fill={`url(#skin_${characterId})`} />
            <path d="M 20 92 C 34 85 86 85 100 92 L 110 120 L 10 120 Z" fill="#c2410c" />
            <path d="M 40 88 Q 60 98 80 88 L 78 94 Q 60 103 42 94 Z" fill="#ea580c" />
            <path d="M 45 96 L 75 96" stroke="#fdba74" strokeWidth="1.5" strokeDasharray="2 2" />
          </g>
        )}

        {characterId === 'mark' && (
          <g>
            <path d="M 46 72 L 74 72 L 78 92 L 42 92 Z" fill={`url(#skin_${characterId})`} />
            <path d="M 18 92 C 34 84 86 84 102 92 L 112 120 L 8 120 Z" fill="#09090b" />
            <path d="M 44 86 L 60 110 L 76 86 Z" fill="#991b1b" />
          </g>
        )}

        {/* HEAD BASE */}
        <ellipse cx="60" cy="56" rx="24" ry="29" fill={`url(#skin_${characterId})`} />

        {/* EARS */}
        <ellipse cx="36" cy="58" rx="4" ry="7" fill={`url(#skin_${characterId})`} />
        <ellipse cx="84" cy="58" rx="4" ry="7" fill={`url(#skin_${characterId})`} />

        {/* HAIRSTYLES */}
        {characterId === 'maya' && (
          // Sleek high ponytail with sporty parted bangs
          <g>
            {/* Ponytail behind */}
            <path d="M 76 42 Q 95 38 98 56 Q 96 74 88 82 Q 92 68 84 56 Z" fill="#171514" />
            {/* Hairband */}
            <circle cx="82" cy="46" r="5" fill="#2dd4bf" />
            {/* Front hair */}
            <path d="M 36 50 C 36 26 84 26 84 50 C 80 34 40 34 36 50 Z" fill={`url(#hair_${characterId})`} />
            {/* Athletic parted locks */}
            <path d="M 37 42 C 45 42 52 35 60 35 C 68 35 75 42 83 42 C 78 30 42 30 37 42 Z" fill="#262220" />
          </g>
        )}

        {characterId === 'jay' && (
          // Modern textured fringe bangs
          <g>
            <path d="M 34 52 C 34 22 86 22 86 52 C 78 36 68 40 60 34 C 52 42 42 36 34 52 Z" fill={`url(#hair_${characterId})`} />
            {/* Front strands */}
            <path d="M 42 42 Q 48 49 52 44 Q 58 50 64 43" stroke="#262220" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {characterId === 'eli' && (
          // Clean poly haircut with textured crop
          <g>
            <path d="M 35 52 C 34 24 86 24 85 52 C 80 30 68 28 60 28 C 52 28 40 30 35 52 Z" fill={`url(#hair_${characterId})`} />
            <path d="M 40 34 C 50 30 70 30 80 34" stroke="#37312e" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {characterId === 'lina' && (
          // Soft layered hair framing shoulders and face
          <g>
            <path d="M 33 58 C 33 24 87 24 87 58 C 82 38 68 35 60 35 C 52 35 38 38 33 58 Z" fill={`url(#hair_${characterId})`} />
            {/* Side tresses framing cheeks */}
            <path d="M 33 52 C 30 68 32 80 37 86 C 34 76 34 64 36 52 Z" fill="#1c1917" />
            <path d="M 87 52 C 90 68 88 80 83 86 C 86 76 86 64 84 52 Z" fill="#1c1917" />
          </g>
        )}

        {/* EYEBROWS */}
        <g stroke="#2d2825" strokeWidth="2.2" strokeLinecap="round">
          {emotion === 'anxious' || emotion === 'panicked' || characterId === 'jay' ? (
            <>
              {/* Worried / distressed angled brows */}
              <line x1="44" y1="47" x2="55" y2="49" />
              <line x1="76" y1="47" x2="65" y2="49" />
            </>
          ) : emotion === 'firm' || characterId === 'maya' ? (
            <>
              {/* Confident / focused brows */}
              <line x1="44" y1="48" x2="56" y2="48" />
              <line x1="76" y1="48" x2="64" y2="48" />
            </>
          ) : (
            <>
              <line x1="44" y1="48" x2="55" y2="48" />
              <line x1="76" y1="48" x2="65" y2="48" />
            </>
          )}
        </g>

        {/* EYES */}
        {/* Sclera & Iris */}
        <g>
          {/* Left Eye */}
          <ellipse cx="50" cy="55" rx="5" ry={emotion === 'panicked' ? 6 : 4.5} fill="#ffffff" />
          <circle cx="50" cy="55" r="3.2" fill="#2d1e18" />
          <circle cx="50" cy="55" r="1.8" fill="#120c0a" />
          <circle cx="51" cy="54" r="1" fill="#ffffff" />
          {/* Eye crease / upper eyelid */}
          <path d="M 44 52 Q 50 49 56 52" stroke="#2c2725" strokeWidth="1.8" fill="none" strokeLinecap="round" />

          {/* Right Eye */}
          <ellipse cx="70" cy="55" rx="5" ry={emotion === 'panicked' ? 6 : 4.5} fill="#ffffff" />
          <circle cx="70" cy="55" r="3.2" fill="#2d1e18" />
          <circle cx="70" cy="55" r="1.8" fill="#120c0a" />
          <circle cx="71" cy="54" r="1" fill="#ffffff" />
          {/* Eye crease / upper eyelid */}
          <path d="M 64 52 Q 70 49 76 52" stroke="#2c2725" strokeWidth="1.8" fill="none" strokeLinecap="round" />

          {/* Dark fatigue shadows under Jay's eyes */}
          {characterId === 'jay' && (
            <g stroke="#935f48" strokeWidth="1.2" opacity="0.65">
              <path d="M 45 61 Q 50 63 55 61" fill="none" />
              <path d="M 65 61 Q 70 63 75 61" fill="none" />
            </g>
          )}
        </g>

        {/* NOSE */}
        <g stroke="#b8784d" strokeWidth="1.6" strokeLinecap="round" fill="none">
          <path d="M 60 55 L 58 64 L 62 64" />
        </g>

        {/* MOUTH & EXPRESSION */}
        <g stroke="#9a4d38" strokeWidth="1.8" strokeLinecap="round" fill="none">
          {emotion === 'panicked' ? (
            <ellipse cx="60" cy="72" rx="4" ry="5" fill="#450a0a" stroke="#7f1d1d" />
          ) : emotion === 'anxious' || characterId === 'jay' ? (
            // Trembling/tense line
            <path d="M 54 72 Q 58 74 62 71 Q 66 73 68 71" />
          ) : emotion === 'caring' || characterId === 'lina' ? (
            // Warm subtle smile
            <path d="M 53 71 Q 60 76 67 71" />
          ) : emotion === 'firm' || characterId === 'maya' ? (
            // Resolute straight line
            <line x1="54" y1="72" x2="66" y2="72" />
          ) : (
            <line x1="54" y1="72" x2="66" y2="72" />
          )}
        </g>

        {/* Sweat drop for anxiety */}
        {(emotion === 'panicked' || emotion === 'anxious' || characterId === 'jay') && (
          <path d="M 78 48 Q 81 53 78 55 Q 75 53 78 48 Z" fill="#38bdf8" opacity="0.9" />
        )}
      </svg>
    </div>
  );
};
