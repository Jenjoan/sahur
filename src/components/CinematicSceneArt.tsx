import React from 'react';

interface CinematicSceneArtProps {
  sceneType: 'void_deck' | 'school_track' | 'hdb_dinner' | 'bedroom_night' | 'rooftop_rain' | 'counsellor_office' | 'mrt_underpass';
  ambientMood?: 'calm' | 'tense' | 'distressing' | 'reflective';
}

export const CinematicSceneArt: React.FC<CinematicSceneArtProps> = ({ sceneType, ambientMood = 'calm' }) => {
  // Overlay lighting gradient based on mood
  const getMoodOverlay = () => {
    switch (ambientMood) {
      case 'distressing':
        return 'bg-red-950/20 mix-blend-multiply animate-pulse duration-1000';
      case 'tense':
        return 'bg-amber-950/20 mix-blend-multiply';
      case 'reflective':
        return 'bg-indigo-950/25 mix-blend-multiply';
      default:
        return 'bg-slate-900/10';
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      {/* Visual Vector Render per Location */}
      {sceneType === 'void_deck' && (
        <div className="w-full h-full relative bg-gradient-to-b from-[#111927] via-[#1a2333] to-[#0f172a]">
          {/* Distant HDB Blocks with lit windows */}
          <div className="absolute top-0 left-0 right-0 h-2/3 opacity-30 flex justify-around items-end">
            <div className="w-32 h-64 bg-slate-800 rounded-t-sm flex flex-col justify-around p-2">
              <div className="grid grid-cols-4 gap-1">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className={`w-2 h-3 rounded-xs ${i % 3 === 0 ? 'bg-amber-200/60' : 'bg-slate-900/80'}`} />
                ))}
              </div>
            </div>
            <div className="w-48 h-80 bg-slate-800/80 rounded-t-sm flex flex-col justify-around p-3">
              <div className="grid grid-cols-5 gap-1.5">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className={`w-2.5 h-3.5 rounded-xs ${i % 4 === 0 ? 'bg-amber-100/70' : 'bg-slate-900/80'}`} />
                ))}
              </div>
            </div>
            <div className="w-36 h-72 bg-slate-800 rounded-t-sm flex flex-col justify-around p-2">
              <div className="grid grid-cols-4 gap-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className={`w-2 h-3 rounded-xs ${i % 2 === 0 ? 'bg-amber-300/50' : 'bg-slate-900/80'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Void Deck Concrete Floor & Pillars */}
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#1e293b] via-[#334155]/60 to-transparent">
            {/* Tiled Floor Perspective Lines */}
            <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#64748b_1px,transparent_1px),linear-gradient(to_bottom,#64748b_1px,transparent_1px)] bg-[size:4rem_2rem]" />
          </div>

          {/* Void Deck Pillar with mosaic detail */}
          <div className="absolute bottom-0 left-12 w-28 h-5/6 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 rounded-t-md shadow-2xl border-r border-slate-500/20">
            <div className="w-full h-32 mt-16 bg-emerald-950/40 border-y border-emerald-500/20 p-2 flex flex-wrap gap-1 opacity-60">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-4 h-4 bg-teal-600/40 rounded-xs" />
              ))}
            </div>
          </div>

          {/* Stone Table & Round Stools */}
          <div className="absolute bottom-16 right-20 flex items-center justify-center opacity-70">
            {/* Table top */}
            <div className="w-44 h-12 bg-slate-500/70 rounded-full border-b-4 border-slate-700 shadow-xl flex items-center justify-center">
              <div className="w-20 h-8 border border-slate-400/40 rounded-xs grid grid-cols-4 grid-rows-2 gap-0.5 p-0.5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={i % 2 === 0 ? 'bg-slate-700' : 'bg-slate-300'} />
                ))}
              </div>
            </div>
            {/* Stools */}
            <div className="absolute -left-10 bottom-0 w-12 h-10 bg-slate-600/80 rounded-full border-b-2 border-slate-800" />
            <div className="absolute -right-10 bottom-0 w-12 h-10 bg-slate-600/80 rounded-full border-b-2 border-slate-800" />
          </div>

          {/* Ceiling Warm Fluorescent Strip Lamp */}
          <div className="absolute top-4 left-1/3 right-1/3 h-2.5 bg-amber-100 rounded-full shadow-[0_0_35px_rgba(251,191,36,0.85)]" />
        </div>
      )}

      {sceneType === 'school_track' && (
        <div className="w-full h-full relative bg-gradient-to-b from-[#1e1b4b] via-[#312e81]/40 to-[#0f172a]">
          {/* Golden Hour Sunset Sky */}
          <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-orange-500/20 via-amber-600/10 to-transparent" />
          
          {/* School Bleachers / Grandstand Silhouette */}
          <div className="absolute bottom-32 left-0 right-0 h-32 flex items-end justify-between px-12 opacity-30">
            <div className="w-1/3 h-24 bg-slate-700 rounded-t-lg" />
            <div className="w-1/4 h-28 bg-slate-700 rounded-t-lg" />
          </div>

          {/* Red Running Track Tartan Lanes */}
          <div className="absolute bottom-0 w-full h-44 bg-gradient-to-t from-[#881337] via-[#9f1239] to-[#4c0519] border-t-2 border-amber-500/20">
            {/* Curved White Track Lanes */}
            <div className="w-full h-full relative overflow-hidden opacity-80">
              <div className="absolute -bottom-20 -left-1/4 w-[150%] h-64 border-t-2 border-white/60 rounded-full" />
              <div className="absolute -bottom-28 -left-1/4 w-[150%] h-64 border-t-2 border-white/60 rounded-full" />
              <div className="absolute -bottom-36 -left-1/4 w-[150%] h-64 border-t-2 border-white/60 rounded-full" />
              <div className="absolute bottom-4 left-16 text-white/50 text-2xl font-black tracking-widest">
                LANE 1
              </div>
            </div>
          </div>
        </div>
      )}

      {sceneType === 'bedroom_night' && (
        <div className="w-full h-full relative bg-[#090d16]">
          {/* Night Window with Blinds */}
          <div className="absolute top-10 right-20 w-64 h-72 bg-gradient-to-b from-slate-900 to-indigo-950 border-4 border-slate-700 rounded-sm overflow-hidden shadow-2xl">
            {/* Distant street lights through window */}
            <div className="absolute bottom-4 left-6 w-3 h-3 bg-amber-400/80 rounded-full blur-[2px]" />
            <div className="absolute bottom-10 right-12 w-2 h-2 bg-emerald-400/60 rounded-full blur-[1px]" />
            <div className="absolute bottom-16 left-24 w-3 h-3 bg-rose-400/60 rounded-full blur-[2px]" />
            {/* Horizontal window blinds */}
            <div className="w-full h-full flex flex-col justify-between opacity-30">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-full h-1 bg-slate-400" />
              ))}
            </div>
          </div>

          {/* Study Desk & Stacks of Books */}
          <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-[#1b1512] to-[#2e2118] border-t-4 border-[#3f2f22]">
            {/* Book Stacks: Ten-Year-Series Mock Papers */}
            <div className="absolute -top-16 left-28 flex flex-col items-center">
              <div className="w-32 h-4 bg-red-800 rounded-xs shadow-md border-r-2 border-white/20" />
              <div className="w-36 h-5 bg-blue-900 rounded-xs shadow-md border-r-2 border-white/20" />
              <div className="w-34 h-4 bg-emerald-800 rounded-xs shadow-md border-r-2 border-white/20" />
              <div className="w-40 h-6 bg-slate-700 rounded-xs shadow-md border-r-2 border-white/20 flex items-center px-2">
                <span className="text-[9px] text-amber-200/80 font-mono font-bold">O-LEVEL TYS</span>
              </div>
            </div>

            {/* Glowing Study Lamp Cone */}
            <div className="absolute -top-24 left-72 w-16 h-28 flex flex-col items-center">
              <div className="w-12 h-8 bg-slate-600 rounded-t-full shadow-lg" />
              <div className="w-1.5 h-16 bg-slate-400" />
              {/* Light pool */}
              <div className="absolute top-10 -left-20 w-64 h-56 bg-amber-200/15 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Glowing Smartphone on desk */}
            <div className="absolute -top-4 right-44 w-14 h-24 bg-slate-900 border border-slate-600 rounded-lg shadow-xl flex items-center justify-center rotate-6">
              <div className="w-12 h-20 bg-cyan-500/25 rounded-md flex items-center justify-center">
                <div className="w-8 h-1 bg-cyan-300 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      )}

      {sceneType === 'hdb_dinner' && (
        <div className="w-full h-full relative bg-gradient-to-b from-[#1c1917] via-[#292524] to-[#0c0a09]">
          {/* Wall Clock & Kitchen Cabinet Outline */}
          <div className="absolute top-12 left-24 w-20 h-20 rounded-full border-4 border-amber-900/60 bg-amber-950/30 flex items-center justify-center opacity-60">
            <div className="w-1.5 h-7 bg-amber-200/70 -translate-y-2 rounded-full" />
            <div className="w-5 h-1 bg-amber-200/70 translate-x-1.5 rounded-full" />
          </div>

          {/* Dining Ceiling Pendant Light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-1 h-24 bg-amber-700" />
            <div className="w-28 h-14 bg-amber-500/40 rounded-t-full border-b-2 border-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.6)]" />
            {/* Warm table light cone */}
            <div className="w-96 h-80 bg-amber-300/10 rounded-full blur-3xl -mt-6 pointer-events-none" />
          </div>

          {/* Wooden Dining Table */}
          <div className="absolute bottom-0 w-full h-52 bg-gradient-to-t from-[#271c19] via-[#3d2b27] to-[#4a342f] border-t-8 border-[#5c4039] shadow-2xl">
            {/* Ceramic Soup Bowl */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-36 h-20 bg-slate-100 rounded-b-full border-t-4 border-slate-300 shadow-xl flex items-center justify-center overflow-hidden">
              <div className="w-28 h-12 bg-amber-800/60 rounded-full border border-amber-600/40" />
              {/* Chinese Spoon */}
              <div className="absolute top-1 right-3 w-8 h-16 border-l-2 border-slate-300 rounded-bl-full rotate-45" />
            </div>
            {/* Chopsticks and water glass */}
            <div className="absolute -top-4 right-1/3 flex gap-2">
              <div className="w-40 h-1.5 bg-amber-900 rounded-full rotate-12" />
              <div className="w-40 h-1.5 bg-amber-900 rounded-full rotate-12" />
            </div>
          </div>
        </div>
      )}

      {sceneType === 'mrt_underpass' && (
        <div className="w-full h-full relative bg-gradient-to-b from-[#090d16] via-[#0e1726] to-[#020617]">
          {/* Sheltered Walkway Roof Pillars */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-slate-800 to-transparent flex justify-around opacity-40">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-3 h-full bg-slate-600 rounded-b-md" />
            ))}
          </div>

          {/* Glowing Green MRT Linkway Signage */}
          <div className="absolute top-8 left-16 px-4 py-1.5 bg-emerald-950/80 border border-emerald-500/40 rounded-sm shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-300 font-bold tracking-wider">JURONG EAST LINKWAY • BLK 214</span>
          </div>

          {/* Wet Pavement Reflection */}
          <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-slate-900 via-slate-800/80 to-transparent">
            <div className="w-full h-full bg-[linear-gradient(to_right,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:3rem_100%] opacity-60" />
            {/* Neon reflection streak */}
            <div className="absolute bottom-6 left-1/4 w-48 h-6 bg-cyan-500/10 blur-xl rounded-full" />
            <div className="absolute bottom-10 right-1/3 w-36 h-6 bg-amber-500/10 blur-xl rounded-full" />
          </div>
        </div>
      )}

      {sceneType === 'counsellor_office' && (
        <div className="w-full h-full relative bg-gradient-to-b from-[#18181b] via-[#27272a] to-[#09090b]">
          {/* Soft Sunlight Window */}
          <div className="absolute top-8 right-16 w-52 h-64 bg-amber-50/10 border-2 border-stone-600 rounded-md shadow-2xl flex flex-col justify-around p-2 opacity-50">
            <div className="w-full h-0.5 bg-stone-500/60" />
            <div className="w-full h-0.5 bg-stone-500/60" />
            {/* Indoor Plant Silhouette */}
            <div className="absolute bottom-0 left-4 w-12 h-16 bg-emerald-900/60 rounded-t-full" />
          </div>

          {/* Wooden Consultation Desk */}
          <div className="absolute bottom-0 w-full h-40 bg-[#3f3f46]/40 border-t-2 border-stone-500/40">
            {/* Box of Tissues & Notebook */}
            <div className="absolute -top-8 left-32 w-20 h-10 bg-slate-200 rounded-sm shadow-lg flex items-center justify-center">
              <div className="w-8 h-4 bg-white rounded-t-md -translate-y-2" />
            </div>
            <div className="absolute -top-4 right-1/3 w-32 h-16 bg-amber-900/60 rounded-xs border border-amber-700/40 rotate-[-4deg]" />
          </div>
        </div>
      )}

      {sceneType === 'rooftop_rain' && (
        <div className="w-full h-full relative bg-gradient-to-b from-[#030712] via-[#0b1329] to-[#030712]">
          {/* Distant Singapore High-Rise Skyline */}
          <div className="absolute bottom-28 left-0 right-0 h-48 flex items-end justify-center gap-3 opacity-20">
            <div className="w-16 h-40 bg-slate-700" />
            <div className="w-20 h-56 bg-slate-800" />
            <div className="w-14 h-36 bg-slate-700" />
            <div className="w-24 h-48 bg-slate-850" />
            <div className="w-16 h-60 bg-slate-800" />
          </div>

          {/* Rain Streaks Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_90%,rgba(255,255,255,0.1)_92%,transparent_94%)] bg-[size:30px_30px] opacity-40 animate-pulse" />

          {/* Concrete Rooftop Parapet Wall */}
          <div className="absolute bottom-0 w-full h-28 bg-gradient-to-t from-slate-900 to-slate-800 border-t-4 border-slate-600" />
        </div>
      )}

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 cinematic-vignette pointer-events-none" />

      {/* Mood Overlay */}
      <div className={`absolute inset-0 ${getMoodOverlay()} pointer-events-none transition-colors duration-700`} />
    </div>
  );
};
