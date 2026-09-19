import React, { useState, useEffect } from 'react';
import { WorldEntity, ChoiceOption, CharacterId } from '../../types';
import { DIALOGUES_3D } from '../../data/dialogues3d';
import { CharacterAvatar } from '../CharacterAvatar';
import { soundFx } from '../../utils/soundEffects';
import { voiceSpeech, SpeakerProfileId } from '../../utils/voiceSpeech';
import { VoiceSpeechWidget } from '../VoiceSpeechWidget';
import {
  X,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  FileText,
  BookmarkCheck,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

interface InteractionDialogModalProps {
  entity: WorldEntity | null;
  activeCharacterId: CharacterId;
  isOpen: boolean;
  onClose: () => void;
  onSelectChoice: (choice: ChoiceOption, entity: WorldEntity) => void;
  onUnlockMemory?: (memoryId: string) => void;
}

export const InteractionDialogModal: React.FC<InteractionDialogModalProps> = ({
  entity,
  activeCharacterId,
  isOpen,
  onClose,
  onSelectChoice,
  onUnlockMemory,
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [hasAddedToAlbum, setHasAddedToAlbum] = useState<boolean>(false);

  // Reset line index and stop speech on entity or open change
  useEffect(() => {
    setCurrentLineIndex(0);
    setHasAddedToAlbum(false);
    return () => {
      voiceSpeech.stop();
    };
  }, [entity?.id, isOpen]);

  if (!isOpen || !entity) return null;

  const isNPC = entity.type === 'npc';
  const dialogue = isNPC && entity.dialogueId ? DIALOGUES_3D[entity.dialogueId] : null;

  const getSpeakerProfileId = (): SpeakerProfileId => {
    if (entity.id === 'officer_farhan' || entity.dialogueId === 'dialogue_officer_farhan' || entity.name.toLowerCase().includes('farhan')) {
      return 'police_farhan';
    }
    if (entity.id === 'reception_inspector' || entity.name.toLowerCase().includes('wong')) {
      return 'inspector';
    }
    if (entity.dialogueId === 'dialogue_coach' || entity.id === 'coach_dave') {
      return 'coach';
    }
    if (entity.dialogueId === 'dialogue_uncle_meng' || entity.id === 'uncle_meng') {
      return 'uncle_meng';
    }
    if (entity.dialogueId === 'dialogue_maya' || entity.id === 'maya') {
      return 'maya';
    }
    if (entity.dialogueId === 'dialogue_jay' || entity.id === 'jay') {
      return 'jay';
    }
    if (entity.dialogueId === 'dialogue_eli' || entity.id === 'eli') {
      return 'eli';
    }
    if (entity.dialogueId === 'dialogue_lina' || entity.id === 'lina') {
      return 'lina';
    }
    if (entity.dialogueId === 'dialogue_chloe' || entity.id === 'chloe') {
      return 'chloe';
    }
    return 'default';
  };

  const speakerId = getSpeakerProfileId();

  const handleNextLine = () => {
    soundFx.playClick();
    if (dialogue && currentLineIndex < dialogue.lines.length - 1) {
      voiceSpeech.stop();
      setCurrentLineIndex((prev) => prev + 1);
    }
  };

  const handleClose = () => {
    voiceSpeech.stop();
    soundFx.playClick();
    onClose();
  };

  const handleChoice = (choice: ChoiceOption) => {
    voiceSpeech.stop();
    soundFx.playChoiceChime(choice.consequenceType);
    onSelectChoice(choice, entity);
    if (entity.associatedMemoryId && onUnlockMemory) {
      onUnlockMemory(entity.associatedMemoryId);
    }
    onClose();
  };

  const handleAddToAlbum = () => {
    soundFx.playChoiceChime('positive');
    setHasAddedToAlbum(true);
    if (entity.associatedMemoryId && onUnlockMemory) {
      onUnlockMemory(entity.associatedMemoryId);
    }
  };
    if (entity.associatedMemoryId && onUnlockMemory) {
      onUnlockMemory(entity.associatedMemoryId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      {/* Container with sleek realism card styling */}
      <div className="relative w-full max-w-2xl bg-slate-900/95 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col gap-4 text-white">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{entity.icon || '📍'}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {entity.name}
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-teal-300 border border-slate-700">
                  {entity.role}
                </span>
              </div>
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

        {/* 1. NPC DIALOGUE MODE */}
        {isNPC && dialogue && (
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <CharacterAvatar
                  characterId={
                    entity.characterId || (activeCharacterId === 'maya' ? 'jay' : 'maya')
                  }
                  emotion={dialogue.mood === 'distressed' ? 'panicked' : dialogue.mood === 'tense' ? 'anxious' : 'neutral'}
                  size="md"
                  showGlow={true}
                />
              </div>

              <div className="flex-1 bg-slate-950/70 border border-slate-800 rounded-2xl p-4 min-h-[100px] flex flex-col justify-between">
                <p className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed">
                  {dialogue.lines[currentLineIndex]}
                </p>

                {currentLineIndex < dialogue.lines.length - 1 && (
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={handleNextLine}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all shadow-md"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Branching Decision Choices (Appears when dialogue lines reach end) */}
            {currentLineIndex >= dialogue.lines.length - 1 && (
              <div className="space-y-2 mt-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400 font-bold block mb-1">
                  Choose Your Response:
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {dialogue.choices.map((choice, i) => (
                    <button
                      key={choice.id}
                      onClick={() => handleChoice(choice)}
                      className="group text-left p-3.5 rounded-xl bg-slate-800/80 hover:bg-teal-950/70 border border-slate-700 hover:border-teal-400/80 transition-all flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-lg bg-slate-900 text-teal-400 border border-slate-700 font-mono text-xs font-bold flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-bold text-white group-hover:text-teal-200">
                          {choice.text}
                        </p>
                        {choice.subtext && (
                          <p className="text-[11px] text-slate-400 group-hover:text-slate-300 mt-0.5">
                            {choice.subtext}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. ENVIRONMENTAL OBJECT INSPECTION MODE */}
        {!isNPC && (
          <div className="flex flex-col gap-4">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>{entity.inspectionTitle || 'Field Investigation'}</span>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed">
                {entity.inspectionDetails}
              </p>

              {entity.antiDrugInsight && (
                <div className="p-3.5 rounded-xl bg-teal-950/60 border border-teal-800/60 flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono font-bold text-teal-300 uppercase tracking-wide block mb-0.5">
                      Singapore Youth Prevention Insight
                    </span>
                    <p className="text-xs text-teal-100 leading-snug">
                      {entity.antiDrugInsight}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions: Save to Life Album / Dismiss */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-400 font-mono">
                {hasAddedToAlbum ? 'Saved to Life Album' : 'Case evidence documented'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddToAlbum}
                  disabled={hasAddedToAlbum}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                    hasAddedToAlbum
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-teal-500 hover:bg-teal-400 text-slate-950'
                  }`}
                >
                  <BookmarkCheck className="w-4 h-4" />
                  <span>{hasAddedToAlbum ? 'Added to Life Album' : 'Add to Life Album'}</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
