import React, { useState } from 'react';
import {
  DETENTION_CASES,
  LAW_WALL_ITEMS,
  EVIDENCE_ROOM_ITEMS,
  CONSEQUENCE_CATEGORIES,
  DILEMMA_SCENARIO,
  DetentionCase,
  LawItem,
  EvidenceItem,
} from '../../data/policeStationData';
import { CharacterAvatar } from '../CharacterAvatar';
import { soundFx } from '../../utils/soundEffects';
import {
  X,
  ShieldAlert,
  Scale,
  FileSearch,
  BookOpen,
  PhoneCall,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  ArrowRight,
  BookmarkCheck,
  Building2,
} from 'lucide-react';

interface PoliceStationModalsProps {
  modalType: 'case' | 'law' | 'evidence' | 'consequence' | 'dilemma' | 'reception' | null;
  activeId: string | null;
  dilemmaOptionId?: 'A' | 'B' | 'C' | null;
  isOpen: boolean;
  onClose: () => void;
  onUnlockMemory?: (memoryId: string) => void;
}

export const PoliceStationModals: React.FC<PoliceStationModalsProps> = ({
  modalType,
  activeId,
  dilemmaOptionId,
  isOpen,
  onClose,
  onUnlockMemory,
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'evidence' | 'verdict' | 'takeaway'>('summary');
  const [hasSavedAlbum, setHasSavedAlbum] = useState<boolean>(false);
  const [selectedConsequenceId, setSelectedConsequenceId] = useState<string>('conseq_legal');

  if (!isOpen || !modalType) return null;

  const handleSaveToAlbum = (caseName: string) => {
    soundFx.playChoiceChime('positive');
    setHasSavedAlbum(true);
    if (onUnlockMemory) {
      onUnlockMemory('mem_police_consequence_centre');
    }
  };

  // Find active items
  const activeCase = DETENTION_CASES.find((c) => c.id === activeId) || DETENTION_CASES[0];
  const activeLaw = LAW_WALL_ITEMS.find((l) => l.id === activeId) || LAW_WALL_ITEMS[0];
  const activeEvidence = EVIDENCE_ROOM_ITEMS.find((e) => e.id === activeId) || EVIDENCE_ROOM_ITEMS[0];
  const activeDilemmaOption = DILEMMA_SCENARIO.options.find((o) => o.podiumId === dilemmaOptionId) || DILEMMA_SCENARIO.options[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-2xl bg-slate-900/95 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col gap-4 text-white max-h-[90vh] overflow-y-auto">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center font-bold text-sm">
              SPF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  Singapore Police Force • Consequence Centre
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {modalType === 'case' && activeCase.caseNumber + ': ' + activeCase.offenceTitle}
                {modalType === 'law' && activeLaw.offence}
                {modalType === 'evidence' && 'OBJECT FOUND — Forensic Analysis'}
                {modalType === 'consequence' && 'Singapore Consequence & Impact Matrix'}
                {modalType === 'dilemma' && 'Decision Evaluation: Walk-up Scenario'}
                {modalType === 'reception' && 'Consequence Centre Reception & Support'}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. CASE FILE SYSTEM (Detention Corridor) */}
        {modalType === 'case' && (
          <div className="flex flex-col gap-4">
            {/* Case Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
              {(
                [
                  { id: 'summary', label: 'Case Summary' },
                  { id: 'evidence', label: `Evidence Locker (${activeCase.evidenceItems.length})` },
                  { id: 'verdict', label: 'Legal Sentence' },
                  { id: 'takeaway', label: 'Key Lesson' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-teal-500 text-slate-950 shadow-sm'
                      : 'bg-slate-800/80 hover:bg-slate-750 text-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Summary */}
            {activeTab === 'summary' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl shrink-0">
                    👤
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{activeCase.characterName}</h3>
                      <span className="text-xs text-slate-400 font-mono">Age: {activeCase.characterAge}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                        Detained
                      </span>
                    </div>
                    <p className="text-xs text-teal-400 font-mono mt-0.5">{activeCase.mdaSection}</p>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{activeCase.fullCaseSummary}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Evidence Items */}
            {activeTab === 'evidence' && (
              <div className="grid grid-cols-1 gap-2.5 animate-fadeIn">
                {activeCase.evidenceItems.map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3"
                  >
                    <span className="text-2xl p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                      {ev.icon}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-teal-300 font-mono uppercase tracking-wide">
                        {ev.name}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{ev.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Verdict & Sentence */}
            {activeTab === 'verdict' && (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-900/60 space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs font-mono uppercase tracking-wide">
                  <Scale className="w-4 h-4" />
                  <span>State Court Conviction & Order</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block font-mono">Official Sentence:</span>
                    <span className="text-white font-bold text-sm text-rose-200">{activeCase.verdict.sentence}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-mono">Financial & Asset Forfeiture:</span>
                    <span className="text-slate-200">{activeCase.verdict.fine}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-mono">Lifelong Record Consequence:</span>
                    <span className="text-rose-300 font-semibold">{activeCase.verdict.recordImpact}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Key Lesson */}
            {activeTab === 'takeaway' && (
              <div className="p-4 rounded-xl bg-teal-950/60 border border-teal-800/80 flex items-start gap-3 animate-fadeIn">
                <ShieldAlert className="w-6 h-6 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-teal-300 uppercase tracking-wide mb-1">
                    Crucial Anti-Drug Awareness Lesson
                  </h4>
                  <p className="text-xs sm:text-sm text-teal-100 leading-relaxed font-medium">
                    {activeCase.keyTakeaway}
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-mono">
                {hasSavedAlbum ? 'Documented in Life Album' : 'Official SPF Case Archive'}
              </span>
              <button
                onClick={() => handleSaveToAlbum(activeCase.caseNumber)}
                disabled={hasSavedAlbum}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  hasSavedAlbum
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md'
                }`}
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>{hasSavedAlbum ? 'Saved to Album' : 'Save to Life Album'}</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. LAW WALL EXHIBIT (Interactive Law Display) */}
        {modalType === 'law' && (
          <div className="flex flex-col gap-4">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
                  {activeLaw.actSection}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{activeLaw.shortSummary}</p>
            </div>

            {/* Penalties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block mb-1">
                  Imprisonment
                </span>
                <p className="text-xs font-bold text-white">{activeLaw.legalConsequences.imprisonment}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                  Financial Fine
                </span>
                <p className="text-xs font-bold text-white">{activeLaw.legalConsequences.fines}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-bold block mb-1">
                  Severe Terms
                </span>
                <p className="text-xs font-bold text-white">{activeLaw.legalConsequences.caningOrMax}</p>
              </div>
            </div>

            {/* Key Facts */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                Critical Legal Facts:
              </span>
              {activeLaw.keyFacts.map((fact, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-teal-900/60 text-teal-300 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-200 leading-snug">{fact}</p>
                </div>
              ))}
            </div>

            {/* Singapore Perspective */}
            <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-900/60 text-xs text-teal-200">
              <span className="font-bold text-teal-300 block mb-0.5">Official Singapore Perspective:</span>
              <p>{activeLaw.singaporePerspective}</p>
            </div>
          </div>
        )}

        {/* 3. FORENSIC EVIDENCE ROOM ("OBJECT FOUND") */}
        {modalType === 'evidence' && (
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/60 flex items-start gap-3">
              <span className="text-3xl p-2 rounded-xl bg-slate-950 border border-cyan-700/60 shrink-0">
                {activeEvidence.icon}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-300 border border-cyan-700">
                    {activeEvidence.category}
                  </span>
                  <span className="text-xs text-cyan-400 font-mono">{activeEvidence.mdaStatute}</span>
                </div>
                <h3 className="text-sm font-bold text-white mt-1">{activeEvidence.name}</h3>
                <p className="text-xs text-slate-300 mt-1">{activeEvidence.shortExplanation}</p>
              </div>
            </div>

            {/* Lab Analysis */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                <FileSearch className="w-3.5 h-3.5" />
                <span>Forensic Science & Chemical Toxicology Findings</span>
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">{activeEvidence.forensicAnalysis}</p>
            </div>

            {/* Legal Consequence */}
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-900/60 text-xs space-y-1">
              <span className="font-mono font-bold text-rose-300 uppercase tracking-wide block">
                Statutory Offence & Legal Penalty:
              </span>
              <p className="text-rose-100">{activeEvidence.legalConsequence}</p>
            </div>
          </div>
        )}

        {/* 4. CONSEQUENCE WALL MATRIX */}
        {modalType === 'consequence' && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 border-b border-slate-800 pb-3">
              {CONSEQUENCE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedConsequenceId(cat.id);
                  }}
                  className={`p-2 rounded-xl text-center text-xs font-bold transition-all border ${
                    selectedConsequenceId === cat.id
                      ? 'bg-slate-800 border-teal-400 text-teal-300 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-base block mb-0.5">{cat.icon}</span>
                  <span className="text-[11px] leading-tight block">{cat.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Category Details */}
            {(() => {
              const currentCat =
                CONSEQUENCE_CATEGORIES.find((c) => c.id === selectedConsequenceId) ||
                CONSEQUENCE_CATEGORIES[0];
              return (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{currentCat.icon}</span>
                    <h3 className="text-sm font-bold text-white">{currentCat.title}</h3>
                  </div>

                  <div className="space-y-2">
                    {currentCat.bulletPoints.map((pt, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-200"
                      >
                        <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                        <p className="leading-relaxed">{pt}</p>
                      </div>
                    ))}
                  </div>

                  {currentCat.helpline && (
                    <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono font-bold text-emerald-300 uppercase block">
                          {currentCat.helpline.name}
                        </span>
                        <p className="text-sm font-bold text-white font-mono mt-0.5">
                          {currentCat.helpline.number}
                        </p>
                        <p className="text-[11px] text-emerald-200">{currentCat.helpline.hours}</p>
                      </div>
                      <a
                        href={`tel:${currentCat.helpline.number.replace(/\D/g, '')}`}
                        className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Call Helpline</span>
                      </a>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* 5. "WHAT WOULD YOU DO?" DILEMMA EVALUATION */}
        {modalType === 'dilemma' && (
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-bold block">
                {DILEMMA_SCENARIO.title}
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {DILEMMA_SCENARIO.situation}
              </p>
            </div>

            {/* Player's chosen option feedback */}
            <div
              className={`p-4 rounded-2xl border space-y-3 ${
                activeDilemmaOption.isRecommended
                  ? 'bg-emerald-950/50 border-emerald-700/70'
                  : 'bg-rose-950/50 border-rose-700/70'
              }`}
            >
              <div className="flex items-center gap-2">
                {activeDilemmaOption.isRecommended ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0" />
                )}
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                    Selected Podium {activeDilemmaOption.podiumId}:
                  </span>
                  <h4 className="text-sm font-bold text-white">{activeDilemmaOption.title}</h4>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <p
                  className={`leading-relaxed font-medium ${
                    activeDilemmaOption.isRecommended ? 'text-emerald-100' : 'text-rose-100'
                  }`}
                >
                  {activeDilemmaOption.consequenceExplanation}
                </p>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2 text-xs text-teal-200">
                  <ShieldAlert className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-teal-300 block mb-0.5">Real-Life Safety Action:</span>
                    <p>{activeDilemmaOption.safetyTakeaway}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. RECEPTIONIST DESK (Duty Inspector Wong) */}
        {modalType === 'reception' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl shrink-0">
                👮‍♂️
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">Duty Inspector Wong</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
                    SPF Community Division
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  "Welcome to the Consequence Centre. Our goal is to empower youths with knowledge. Drug syndicates prey on lack of awareness—promising fast money for holding parcels, or claiming vapes are harmless. Explore our four wings: examine real laws on the Law Wall, review case files in the detention cells, inspect forensic evidence, and test yourself in the Dilemma Lab. If anyone you know is in trouble, remember: seeking help early saves lives."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="font-mono font-bold text-teal-300 uppercase block mb-1">
                  Central Narcotics Bureau Hotline
                </span>
                <p className="text-white font-mono font-bold">1800-2255-520 (24 Hours)</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Toll-free, confidential drug reporting & enquiries</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="font-mono font-bold text-emerald-300 uppercase block mb-1">
                  National Addictions Helpline
                </span>
                <p className="text-white font-mono font-bold">6732 6837</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Free clinical and psychological assistance</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
