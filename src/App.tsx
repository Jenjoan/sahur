import React, { useState, useEffect } from 'react';
import { CharacterId, ChoiceOption, LifeAlbumMemory, ChatThread } from './types';
import { CHARACTERS } from './data/characters';
import { CHAPTERS, DIALOGUE_NODES } from './data/storylines';
import { INITIAL_MEMORIES } from './data/lifeAlbumData';
import { INITIAL_PHONE_THREADS } from './data/phoneData';
import { Header } from './components/Header';
import { CharacterSelect } from './components/CharacterSelect';
import { StoryScene } from './components/StoryScene';
import { PhoneModal } from './components/PhoneModal';
import { LifeAlbum } from './components/LifeAlbum';
import { ChapterSummary } from './components/ChapterSummary';
import { CombatArcadeModal } from './components/CombatArcadeModal';
import { GameCanvas } from './components/game3d/GameCanvas';

export default function App() {
  const [viewMode, setViewMode] = useState<'adventure_3d' | 'character_select' | 'story' | 'summary'>('adventure_3d');
  const [selectedCharacterId, setSelectedCharacterId] = useState<CharacterId>('maya');
  const [currentNodeId, setCurrentNodeId] = useState<string>('maya_node_1');
  const [storyFlags, setStoryFlags] = useState<Record<string, boolean | string | number>>({});
  const [memories, setMemories] = useState<LifeAlbumMemory[]>(INITIAL_MEMORIES);
  const [phoneThreads, setPhoneThreads] = useState<ChatThread[]>(INITIAL_PHONE_THREADS);
  const [isPhoneOpen, setIsPhoneOpen] = useState<boolean>(false);
  const [phoneInitialChatId, setPhoneInitialChatId] = useState<string | undefined>(undefined);
  const [isLifeAlbumOpen, setIsLifeAlbumOpen] = useState<boolean>(false);
  const [isCombatArcadeOpen, setIsCombatArcadeOpen] = useState<boolean>(false);
  const [lastConsequence, setLastConsequence] = useState<{
    text: string;
    type: 'positive' | 'warning' | 'critical' | 'neutral';
    insight?: string;
  } | null>(null);

  const [unlockedChapters, setUnlockedChapters] = useState<Record<CharacterId, boolean>>({
    maya: true,
    jay: true,
    eli: true,
    lina: true,
  });

  // Find active chapter by character
  const currentChapter =
    CHAPTERS.find((c) => c.characterId === selectedCharacterId) || CHAPTERS[0];

  // Find current dialogue node
  const currentNode = DIALOGUE_NODES[currentNodeId] || DIALOGUE_NODES['maya_node_1'];

  // Calculate unread count
  const unreadPhoneCount = phoneThreads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);
  const unlockedMemoryCount = memories.filter((m) => m.unlocked).length;

  // Handle player choice in story
  const handleMakeChoice = (choice: ChoiceOption) => {
    // 1. Set consequence notification
    setLastConsequence({
      text: choice.consequenceText || choice.text,
      type: choice.consequenceType,
      insight: choice.learningInsight,
    });

    // 2. Set flags
    if (choice.impacts?.flagSet) {
      setStoryFlags((prev) => ({
        ...prev,
        [choice.impacts!.flagSet!]: true,
      }));
    }

    // 3. Unlock memory in Life Album if specified
    if (choice.unlockMemoryId) {
      setMemories((prev) =>
        prev.map((m) => (m.id === choice.unlockMemoryId ? { ...m, unlocked: true } : m))
      );
    }

    // 4. Move to next node
    if (choice.nextNodeId) {
      const next = DIALOGUE_NODES[choice.nextNodeId];
      if (next) {
        setCurrentNodeId(choice.nextNodeId);
      }
    }
  };

  // Start story for a specific character
  const handleStartStory = (charId: CharacterId) => {
    setSelectedCharacterId(charId);
    const chap = CHAPTERS.find((c) => c.characterId === charId) || CHAPTERS[0];
    setCurrentNodeId(chap.initialNodeId);
    setLastConsequence(null);
    setViewMode('adventure_3d');
  };

  const handleUnlockMemory = (memoryId: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === memoryId ? { ...m, unlocked: true } : m))
    );
  };

  // Handle advancing a linear node
  const handleNextNode = (nextNodeId: string) => {
    setCurrentNodeId(nextNodeId);
  };

  // When chapter ends, player can review in summary
  const handleReplayChapter = () => {
    const chap = CHAPTERS.find((c) => c.characterId === selectedCharacterId) || CHAPTERS[0];
    setCurrentNodeId(chap.initialNodeId);
    setLastConsequence(null);
    setViewMode('story');
  };

  // Go to next connected perspective
  const handleContinueNextPerspective = () => {
    const sequence: CharacterId[] = ['maya', 'jay', 'eli', 'lina'];
    const nextIdx = (sequence.indexOf(selectedCharacterId) + 1) % sequence.length;
    const nextCharId = sequence[nextIdx];
    handleStartStory(nextCharId);
  };

  // Send message in simulated phone
  const handleSendMessage = (threadId: string, text: string) => {
    setPhoneThreads((prev) =>
      prev.map((thread) => {
        if (thread.id !== threadId) return thread;
        const newMsg = {
          id: `msg_${Date.now()}`,
          sender: selectedCharacterId.toUpperCase(),
          isSelf: true,
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        return {
          ...thread,
          messages: [...thread.messages, newMsg],
          unreadCount: 0,
        };
      })
    );
  };

  // Reset entire story
  const handleResetStory = () => {
    setStoryFlags({});
    setMemories(INITIAL_MEMORIES);
    setPhoneThreads(INITIAL_PHONE_THREADS);
    setLastConsequence(null);
    setSelectedCharacterId('maya');
    setCurrentNodeId('maya_node_1');
    setViewMode('character_select');
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col justify-between selection:bg-teal-500/30 selection:text-teal-200">
      {/* Top Header */}
      <Header
        currentChapterNum={currentChapter.chapterNumber}
        onOpenLifeAlbum={() => setIsLifeAlbumOpen(true)}
        onOpenPhone={() => {
          setPhoneInitialChatId(undefined);
          setIsPhoneOpen(true);
        }}
        onOpenCombatArcade={() => setIsCombatArcadeOpen(true)}
        onGoHome={() => setViewMode('character_select')}
        onToggle3DAdventure={() =>
          setViewMode(viewMode === 'adventure_3d' ? 'character_select' : 'adventure_3d')
        }
        onResetStory={handleResetStory}
        unlockedMemoryCount={unlockedMemoryCount}
        totalMemories={memories.length}
        unreadPhoneCount={unreadPhoneCount}
        viewMode={viewMode}
      />

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col justify-center">
        {viewMode === 'adventure_3d' && (
          <GameCanvas
            activeCharacterId={selectedCharacterId}
            onOpenPhone={() => {
              setPhoneInitialChatId(undefined);
              setIsPhoneOpen(true);
            }}
            onOpenLifeAlbum={() => setIsLifeAlbumOpen(true)}
            onOpenCharacterSelect={() => setViewMode('character_select')}
            onOpenCombatArcade={() => setIsCombatArcadeOpen(true)}
            onUnlockMemory={handleUnlockMemory}
            unreadPhoneCount={unreadPhoneCount}
            unlockedMemoryCount={unlockedMemoryCount}
            totalMemories={memories.length}
          />
        )}

        {viewMode === 'character_select' && (
          <CharacterSelect
            selectedCharacterId={selectedCharacterId}
            onSelectCharacter={(id) => setSelectedCharacterId(id)}
            onStartStory={handleStartStory}
            onOpenLifeAlbum={() => setIsLifeAlbumOpen(true)}
            unlockedChapters={unlockedChapters}
          />
        )}

        {viewMode === 'story' && (
          <StoryScene
            currentNode={currentNode}
            chapter={currentChapter}
            onMakeChoice={handleMakeChoice}
            onNextNode={handleNextNode}
            onOpenPhone={(initialChatId) => {
              setPhoneInitialChatId(initialChatId);
              setIsPhoneOpen(true);
            }}
            onOpenLifeAlbum={() => setIsLifeAlbumOpen(true)}
            onReplayChapter={handleReplayChapter}
            unreadPhoneCount={unreadPhoneCount}
            lastConsequence={lastConsequence}
            onClearConsequence={() => setLastConsequence(null)}
          />
        )}

        {viewMode === 'summary' && (
          <ChapterSummary
            chapter={currentChapter}
            characterId={selectedCharacterId}
            onReplay={handleReplayChapter}
            onContinueNext={handleContinueNextPerspective}
            onOpenLifeAlbum={() => setIsLifeAlbumOpen(true)}
            onBackToCharacterSelect={() => setViewMode('character_select')}
            flags={storyFlags}
          />
        )}
      </main>

      {/* Simulated Smartphone Overlay */}
      <PhoneModal
        isOpen={isPhoneOpen}
        onClose={() => setIsPhoneOpen(false)}
        threads={phoneThreads}
        initialThreadId={phoneInitialChatId}
        onSendMessage={handleSendMessage}
      />

      {/* Skeuomorphic Life Album / Dossier Overlay */}
      <LifeAlbum
        isOpen={isLifeAlbumOpen}
        onClose={() => setIsLifeAlbumOpen(false)}
        memories={memories}
        unlockedMemoryCount={unlockedMemoryCount}
      />

      {/* Combat Arcade Modal */}
      <CombatArcadeModal
        isOpen={isCombatArcadeOpen}
        onClose={() => setIsCombatArcadeOpen(false)}
      />
    </div>
  );
}
