import React, { useState } from 'react';
import { LifeAlbumMemory, DossierEntry } from '../types';
import { DOSSIER_ENTRIES } from '../data/characters';
import { SINGAPORE_LEGAL_FACTS, SUPPORT_RESOURCES } from '../data/lifeAlbumData';
import {
  X,
  BookOpen,
  Pin,
  Paperclip,
  CheckCircle2,
  Sparkles,
  MapPin,
  Search,
  Scale,
  ShieldCheck,
  Phone,
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface LifeAlbumProps {
  isOpen: boolean;
  onClose: () => void;
  memories: LifeAlbumMemory[];
  unlockedMemoryCount: number;
}

export const LifeAlbum: React.FC<LifeAlbumProps> = ({
  isOpen,
  onClose,
  memories,
  unlockedMemoryCount,
}) => {
  const [activeTab, setActiveTab] = useState<'dossier' | 'locations' | 'casenotes' | 'legal'>('dossier');
  const [inspectedMemory, setInspectedMemory] = useState<LifeAlbumMemory | null>(null);
  const [inspectedDossier, setInspectedDossier] = useState<DossierEntry | null>(null);

  if (!isOpen) return null;

  // Mini Polaroid SVG Thumbnail Renderer
  const renderPolaroidArt = (artType: string) => {
    switch (artType) {
      case 'bedroom_night':
        return (
          <div className="w-full h-24 bg-slate-900 flex items-center justify-center relative overflow-hidden rounded-xs">
            <div className="absolute top-2 right-4 w-6 h-6 bg-amber-300/30 rounded-full blur-xs" />
            <div className="w-16 h-8 bg-amber-900/60 rounded-xs border-t-2 border-amber-500/40" />
            <div className="absolute bottom-2 left-3 text-[9px] font-mono text-cyan-300">Jay's Desk</div>
          </div>
        );
      case 'rooftop_rain':
        return (
          <div className="w-full h-24 bg-slate-950 flex items-center justify-center relative overflow-hidden rounded-xs">
            <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_70%,rgba(255,255,255,0.15)_80%,transparent_90%)] bg-[size:15px_15px]" />
            <div className="w-20 h-10 bg-slate-800 rounded-t-xs" />
            <div className="absolute bottom-2 left-3 text-[9px] font-mono text-indigo-300">Jurong Overpass</div>
          </div>
        );
      case 'party':
        return (
          <div className="w-full h-24 bg-[#141b2b] flex items-center justify-center relative overflow-hidden rounded-xs">
            <div className="w-12 h-12 rounded-full border border-teal-500/40 bg-teal-950/40 flex items-center justify-center">
              <div className="w-6 h-6 bg-teal-400/30 rounded-full" />
            </div>
            <div className="absolute bottom-2 left-3 text-[9px] font-mono text-teal-300">Void Deck 18:15</div>
          </div>
        );
      case 'classroom':
        return (
          <div className="w-full h-24 bg-[#2b1717] flex items-center justify-center relative overflow-hidden rounded-xs">
            <div className="w-20 h-3 bg-red-800 rounded-xs" />
            <div className="w-16 h-3 bg-amber-800 rounded-xs mt-1" />
            <div className="absolute bottom-2 left-3 text-[9px] font-mono text-rose-300">Track Finals</div>
          </div>
        );
      case 'dinner':
        return (
          <div className="w-full h-24 bg-[#211a14] flex items-center justify-center relative overflow-hidden rounded-xs">
            <div className="w-10 h-6 bg-amber-100 rounded-b-full border-t border-amber-300" />
            <div className="absolute bottom-2 left-3 text-[9px] font-mono text-amber-300">Family Table</div>
          </div>
        );
      case 'notebook':
        return (
          <div className="w-full h-24 bg-[#1f2937] flex items-center justify-center relative overflow-hidden rounded-xs">
            <div className="w-14 h-18 bg-amber-100/90 rounded-xs p-1 border border-slate-400 flex flex-col justify-around">
              <div className="w-10 h-0.5 bg-slate-600" />
              <div className="w-8 h-0.5 bg-slate-600" />
              <div className="w-10 h-0.5 bg-slate-600" />
            </div>
            <div className="absolute bottom-2 left-3 text-[9px] font-mono text-emerald-300">Playbook</div>
          </div>
        );
      case 'dawn_rooftop':
        return (
          <div className="w-full h-24 bg-gradient-to-t from-orange-950 to-indigo-950 flex items-center justify-center relative overflow-hidden rounded-xs">
            <div className="w-8 h-8 rounded-full bg-amber-400/40 blur-xs" />
            <div className="absolute bottom-2 left-3 text-[9px] font-mono text-amber-200">Dawn Horizon</div>
          </div>
        );
      case 'counsellor':
      default:
        return (
          <div className="w-full h-24 bg-[#1e293b] flex items-center justify-center relative overflow-hidden rounded-xs">
            <div className="w-14 h-10 bg-stone-400/30 rounded-xs border border-stone-500/40" />
            <div className="absolute bottom-2 left-3 text-[9px] font-mono text-cyan-300">Wellness Room</div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      {/* Skeuomorphic Leather Binder / Dossier Container */}
      <div className="relative w-full max-w-5xl h-[88vh] bg-[#3a271d] rounded-2xl sm:rounded-3xl border-4 border-[#241710] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col md:flex-row overflow-hidden">
        {/* Leather Stitching Top & Left Border Accents */}
        <div className="absolute top-1 left-2 right-2 h-1 border-t-2 border-dashed border-amber-900/60 pointer-events-none" />
        <div className="absolute bottom-1 left-2 right-2 h-1 border-b-2 border-dashed border-amber-900/60 pointer-events-none" />

        {/* Central Spine with Red String Stitching & Rings */}
        <div className="hidden md:flex flex-col items-center justify-around w-10 bg-[#2d1e16] border-x border-[#1a110c] py-8 z-20 shrink-0">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-800 border-2 border-slate-600 shadow-inner" />
              <div className="w-0.5 h-6 bg-red-700 shadow-xs my-0.5" />
            </div>
          ))}
        </div>

        {/* Main Paper Content Area (Notebook Texture) */}
        <div className="flex-1 notebook-paper text-slate-800 flex flex-col overflow-hidden relative">
          {/* Paper Top Navigation Bar */}
          <div className="px-6 py-4 border-b border-stone-300/80 bg-[#f9f5ec]/90 backdrop-blur-xs flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-800/10 border border-amber-800/30 flex items-center justify-center text-amber-900">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-wide font-display">
                  PERSONNEL DOSSIER & INCIDENT LOG
                </h3>
                <p className="text-xs text-stone-600 font-mono">
                  Singapore Prevention Network • Memories Unlocked: {unlockedMemoryCount}/{memories.length}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1.5 rounded-full bg-stone-300/80 hover:bg-stone-400 text-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Document Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* TAB 1: Character Dossier Files (matching reference screenshot) */}
            {activeTab === 'dossier' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-stone-300 pb-2">
                  <span className="text-xs font-mono font-bold tracking-wider text-stone-600 uppercase">
                    Subject Profile Cards • Click Card for In-Depth File
                  </span>
                  <span className="text-xs font-handwriting text-red-700 text-base">
                    * Confirmed field observations
                  </span>
                </div>

                {/* 4 Top Dossier Subject Cards with Paperclips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {DOSSIER_ENTRIES.map((entry) => (
                    <div
                      key={entry.id}
                      onClick={() => {
                        soundFx.playClick();
                        setInspectedDossier(entry);
                      }}
                      className="group cursor-pointer bg-white/95 rounded-md border border-stone-300 shadow-md hover:shadow-xl p-3.5 flex flex-col justify-between transition-all transform hover:-translate-y-1 relative"
                    >
                      {/* Skeuomorphic Paperclip */}
                      <div className="absolute -top-2.5 left-4 text-stone-500">
                        <Paperclip className="w-5 h-5 drop-shadow-xs" />
                      </div>

                      <div>
                        {/* Stamp */}
                        {entry.stamp && (
                          <div className="mb-2 text-right">
                            <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded border border-red-500 text-red-600 tracking-wider rotate-[-2deg] inline-block">
                              {entry.stamp}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="w-10 h-10 rounded-sm bg-stone-200 border border-stone-400 flex items-center justify-center font-mono font-bold text-stone-700 text-sm">
                            {entry.name.split(' ')[0][0]}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-stone-900 group-hover:text-teal-700 transition-colors">
                              {entry.name}
                            </h4>
                            <p className="text-[10px] text-stone-500 font-mono truncate max-w-[120px]">
                              {entry.role.split('•')[0]}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-1 text-[11px] text-stone-600 font-sans border-t border-stone-200 pt-2">
                          <p>
                            <span className="font-bold text-stone-800">Traits:</span> {entry.traits}
                          </p>
                          <p>
                            <span className="font-bold text-stone-800">Status:</span> {entry.status}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-stone-200/80 text-[10px] italic text-stone-500 line-clamp-2 font-serif">
                        {entry.keyDialogue}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Lower Row: All 8 Scene Polaroids (as seen in Gemini reference image) */}
                <div className="mt-8">
                  <div className="flex items-center justify-between border-b border-stone-300 pb-2 mb-4">
                    <h4 className="text-sm font-bold text-stone-800 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-700" />
                      <span>Incident Log & Scene Polaroids</span>
                    </h4>
                    <span className="text-xs font-handwriting text-stone-600 text-base">
                      8 Recorded Moments in Singapore
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {memories.map((mem) => (
                      <div
                        key={mem.id}
                        onClick={() => {
                          soundFx.playClick();
                          setInspectedMemory(mem);
                        }}
                        className="group cursor-pointer bg-white rounded-sm border border-stone-300 shadow-md hover:shadow-xl p-2 pb-3 transition-all hover:scale-[1.03] rotate-[-1deg] hover:rotate-0"
                      >
                        {/* Tape strip at top */}
                        <div className="w-10 h-2.5 bg-amber-100/80 mx-auto -mt-3.5 mb-1.5 border border-amber-300/60 rounded-xs shadow-xs" />

                        {/* Photo Box */}
                        {renderPolaroidArt(mem.artType)}

                        {/* Polaroid Caption Label */}
                        <div className="mt-2 text-center">
                          <span className="text-xs font-bold text-stone-800 block truncate">
                            {mem.sceneCode} {mem.title}
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono block truncate">
                            {mem.chapterRef.split('•')[0]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Locations & Field Notes */}
            {activeTab === 'locations' && (
              <div className="space-y-4">
                <div className="border-b border-stone-300 pb-2">
                  <h4 className="text-sm font-bold text-stone-800">
                    Singapore Neighbourhood Settings & Field Geography
                  </h4>
                  <p className="text-xs text-stone-600">
                    Grounded locations across Bishan, Jurong East, high-rise estates, and secondary schools.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {memories.map((mem) => (
                    <div
                      key={mem.id}
                      className="p-4 rounded-md bg-white border border-stone-300 shadow-sm flex gap-3"
                    >
                      <div className="w-24 shrink-0">{renderPolaroidArt(mem.artType)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="text-xs font-bold text-stone-900">
                            {mem.sceneCode} • {mem.title}
                          </h5>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                            Verified
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 font-mono mb-1">{mem.location}</p>
                        <p className="text-xs text-stone-700 leading-snug mb-2">{mem.caption}</p>
                        <p className="text-[11px] text-amber-900 font-handwriting text-base">
                          💡 Note: {mem.learningNote}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Case Notes & Evidence Log */}
            {activeTab === 'casenotes' && (
              <div className="space-y-4">
                <div className="border-b border-stone-300 pb-2 flex items-center justify-between">
                  <h4 className="text-sm font-bold text-stone-800">
                    Case Notes & Warning Sign Checklist
                  </h4>
                  <span className="text-xs font-handwriting text-red-600 text-base">
                    * Critical prevention indicators
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-md bg-white border border-stone-300 shadow-sm">
                    <h5 className="text-xs font-bold text-stone-900 mb-2 flex items-center gap-1.5">
                      <Pin className="w-3.5 h-3.5 text-red-600" />
                      <span>Physical & Behavioural Warning Signs</span>
                    </h5>
                    <ul className="text-xs text-stone-700 space-y-2 list-disc pl-4">
                      <li>
                        <span className="font-semibold">Unexplained Tachycardia & Tremors:</span> Heart palpitations, shaking hands, and sweating not linked to physical exertion.
                      </li>
                      <li>
                        <span className="font-semibold">Sudden Secrecy:</span> Locking bedroom doors, shielding smartphone screens, evasion when asked about friends.
                      </li>
                      <li>
                        <span className="font-semibold">Academic & Athletic Drop:</span> Uncharacteristic exhaustion, skipped track practices, and difficulty concentrating.
                      </li>
                      <li>
                        <span className="font-semibold">Unmarked Devices:</span> Pungent sweet-smelling pods lacking commercial health labels or standard branding.
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-md bg-white border border-stone-300 shadow-sm">
                    <h5 className="text-xs font-bold text-stone-900 mb-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                      <span>The Chain of Influence & Breaking Points</span>
                    </h5>
                    <p className="text-xs text-stone-700 leading-relaxed mb-3">
                      Drug distribution does not happen in a vacuum. Older syndicates exploit young couriers like Eli with promises of fast cash ($250). In turn, these pods reach students like Jay seeking exam relief, and are passed in social settings where peers like Maya face pressure to conform.
                    </p>
                    <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-xs font-handwriting text-amber-900 text-base">
                      "If one person breaks the chain—by refusing, by reporting, or by listening across the dinner table—the disaster is stopped."
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Singapore Law & Health Guide */}
            {activeTab === 'legal' && (
              <div className="space-y-4">
                <div className="border-b border-stone-300 pb-2">
                  <h4 className="text-sm font-bold text-stone-800 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-stone-800" />
                    <span>Singapore Anti-Drug Legal Framework & Official Facts</span>
                  </h4>
                  <p className="text-xs text-stone-600">
                    Fact-checked provisions from the Central Narcotics Bureau (CNB) and Misuse of Drugs Act (MDA).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SINGAPORE_LEGAL_FACTS.map((fact, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-md bg-white border border-stone-300 shadow-sm"
                    >
                      <h5 className="text-xs font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        <span>{fact.title}</span>
                      </h5>
                      <p className="text-xs text-stone-700 leading-relaxed">{fact.details}</p>
                    </div>
                  ))}
                </div>

                {/* Helplines Summary Box */}
                <div className="p-4 rounded-md bg-stone-100 border border-stone-300">
                  <h5 className="text-xs font-bold text-stone-800 mb-2 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-teal-700" />
                    <span>Emergency Contacts & Helplines (Singapore)</span>
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {SUPPORT_RESOURCES.map((r, i) => (
                      <div key={i} className="p-2 bg-white rounded border border-stone-200">
                        <span className="font-bold text-stone-900 block">{r.name}</span>
                        <span className="text-teal-700 font-mono font-semibold">{r.contact}</span>
                        <span className="text-[10px] text-stone-500 block">{r.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Bookmark Tabs (Authentic Journal Tabs from reference screenshot) */}
        <div className="flex md:flex-col justify-around md:justify-start gap-1 p-2 bg-[#2d1e16] border-t md:border-t-0 md:border-l border-[#1a110c] shrink-0">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('dossier');
            }}
            className={`px-3 py-2 md:py-3 rounded-lg md:rounded-r-lg text-xs font-bold font-mono tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'dossier'
                ? 'bg-[#f6f1e5] text-stone-900 shadow-md md:translate-x-1'
                : 'bg-[#432d21] text-amber-200/70 hover:bg-[#523728] hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Character Files</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('locations');
            }}
            className={`px-3 py-2 md:py-3 rounded-lg md:rounded-r-lg text-xs font-bold font-mono tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'locations'
                ? 'bg-[#f6f1e5] text-stone-900 shadow-md md:translate-x-1'
                : 'bg-[#432d21] text-amber-200/70 hover:bg-[#523728] hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Locations</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('casenotes');
            }}
            className={`px-3 py-2 md:py-3 rounded-lg md:rounded-r-lg text-xs font-bold font-mono tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'casenotes'
                ? 'bg-[#f6f1e5] text-stone-900 shadow-md md:translate-x-1'
                : 'bg-[#432d21] text-amber-200/70 hover:bg-[#523728] hover:text-white'
            }`}
          >
            <Pin className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Case Notes</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('legal');
            }}
            className={`px-3 py-2 md:py-3 rounded-lg md:rounded-r-lg text-xs font-bold font-mono tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'legal'
                ? 'bg-[#f6f1e5] text-stone-900 shadow-md md:translate-x-1'
                : 'bg-[#432d21] text-amber-200/70 hover:bg-[#523728] hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">SG Law & Help</span>
          </button>
        </div>
      </div>

      {/* Inspect Memory Modal */}
      {inspectedMemory && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl border-4 border-stone-300 relative text-stone-900">
            <button
              onClick={() => setInspectedMemory(null)}
              className="absolute top-3 right-3 text-stone-500 hover:text-stone-800 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full h-44 mb-4 rounded-sm overflow-hidden border border-stone-300">
              {renderPolaroidArt(inspectedMemory.artType)}
            </div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-base font-bold text-stone-900">
                {inspectedMemory.sceneCode} • {inspectedMemory.title}
              </h4>
              <span className="text-xs font-mono text-stone-500">{inspectedMemory.chapterRef}</span>
            </div>
            <p className="text-xs text-stone-600 font-mono mb-3">{inspectedMemory.location}</p>
            <p className="text-sm text-stone-700 leading-relaxed mb-4">{inspectedMemory.caption}</p>
            <div className="p-3 bg-amber-50 rounded border border-amber-200 text-xs text-amber-900 font-serif italic mb-3">
              {inspectedMemory.keyDialogue}
            </div>
            <div className="p-3 bg-teal-50 rounded border border-teal-200 text-xs text-teal-900">
              <span className="font-bold">Prevention Takeaway:</span> {inspectedMemory.learningNote}
            </div>
          </div>
        </div>
      )}

      {/* Inspect Dossier Modal */}
      {inspectedDossier && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl border-4 border-stone-300 relative text-stone-900">
            <button
              onClick={() => setInspectedDossier(null)}
              className="absolute top-3 right-3 text-stone-500 hover:text-stone-800 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            {inspectedDossier.stamp && (
              <span className="inline-block text-xs font-mono font-black text-red-600 border border-red-500 px-2 py-0.5 rounded mb-3">
                {inspectedDossier.stamp}
              </span>
            )}
            <h4 className="text-lg font-bold text-stone-900">{inspectedDossier.name}</h4>
            <p className="text-xs text-stone-500 font-mono mb-4">{inspectedDossier.role}</p>
            <div className="space-y-2 text-xs text-stone-700 mb-4">
              <p>
                <span className="font-bold text-stone-900">Character Traits:</span> {inspectedDossier.traits}
              </p>
              <p>
                <span className="font-bold text-stone-900">Key Relationship:</span> {inspectedDossier.keyRelationship}
              </p>
              <p>
                <span className="font-bold text-stone-900">Current Status:</span> {inspectedDossier.status}
              </p>
              <p>
                <span className="font-bold text-stone-900">Central Conflict:</span> {inspectedDossier.keyConflict}
              </p>
            </div>
            <div className="p-3 bg-stone-100 rounded border border-stone-200 text-xs italic text-stone-800 font-serif">
              {inspectedDossier.keyDialogue}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
