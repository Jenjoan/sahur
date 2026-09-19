export type CharacterId = 'maya' | 'jay' | 'eli' | 'lina';

export interface CharacterProfile {
  id: CharacterId;
  name: string;
  tagline: string;
  badge: string;
  role: string;
  age: string;
  summary: string;
  keyRelationship: string;
  status: string;
  avatarGlow: string; // Tailwind color class or hex
  accentColor: string;
  avatarSeed: string;
  themeColor: string;
  unlocked: boolean;
  traits: string[];
}

export interface ChoiceOption {
  id: string;
  text: string;
  hint?: string;
  subtext?: string;
  keyGlyph?: string; // '1' | '2' | '3' | '△' | '□' | '○' | '✕'
  consequenceText?: string;
  consequenceType: 'positive' | 'warning' | 'critical' | 'neutral';
  impacts?: {
    relationshipChange?: { character: string; change: number; reason: string };
    stressDelta?: number;
    safetyScoreDelta?: number;
    flagSet?: string;
  };
  statsImpact?: Partial<PlayerStats>;
  nextNodeId: string;
  learningInsight?: string;
  unlockMemoryId?: string;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  speakerRole?: string;
  speakerAvatar?: string;
  characterId: CharacterId;
  text: string;
  emotion?: 'neutral' | 'anxious' | 'firm' | 'conflicted' | 'panicked' | 'relieved' | 'caring';
  location: string;
  timeOfDay: string;
  sceneBackground: 'void_deck' | 'school_track' | 'hdb_dinner' | 'bedroom_night' | 'rooftop_rain' | 'counsellor_office' | 'mrt_underpass';
  ambientMood?: 'calm' | 'tense' | 'distressing' | 'reflective';
  incomingPhoneNotification?: {
    sender: string;
    message: string;
    chatId: string;
  };
  choices?: ChoiceOption[];
  nextNodeId?: string; // For auto-progressing dialogues
  isChapterEnd?: boolean;
}

export interface ChapterData {
  id: string;
  characterId: CharacterId;
  chapterNumber: number;
  title: string;
  subtitle: string;
  initialNodeId: string;
  summaryTakeaway: string;
  officialFactRef: string;
}

export interface StoryFlagState {
  [key: string]: boolean | string | number;
}

export interface PlayerStats {
  peerResistance: number;
  familyConnection: number;
  supportAwareness: number;
  riskAvoidance: number;
  legalLiteracy?: number;
}

export interface LifeAlbumMemory {
  id: string;
  chapterRef: string;
  sceneCode: string; // e.g. "1.1", "1.2", "2.1"
  title: string;
  location: string;
  caption: string;
  unlocked: boolean;
  keyDialogue: string;
  learningNote: string;
  artType: 'bedroom_night' | 'rooftop_rain' | 'party' | 'classroom' | 'dinner' | 'notebook' | 'dawn_rooftop' | 'counsellor';
}

export interface DossierEntry {
  id: string;
  name: string;
  role: string;
  traits: string;
  keyRelationship: string;
  status: string;
  keyDialogue: string;
  keyConflict: string;
  isPlayable: boolean;
  avatarColor: string;
  stamp?: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  isSelf: boolean;
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  contactName: string;
  contactRole: string;
  avatarInitials: string;
  messages: ChatMessage[];
  unreadCount: number;
}

export interface SupportResource {
  name: string;
  organization: string;
  contact: string;
  hours: string;
  description: string;
  category: 'helpline' | 'confidential' | 'youth' | 'medical';
}

// 3D Exploration & Mission Types
export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface WorldEntity {
  id: string;
  name: string;
  role: string;
  type: 'npc' | 'object' | 'waypoint';
  position: Vector3D;
  interactionDistance?: number;
  promptText: string;
  icon?: string;
  characterId?: CharacterId;
  dialogueId?: string;
  inspectionTitle?: string;
  inspectionDetails?: string;
  antiDrugInsight?: string;
  associatedMemoryId?: string;
}

export interface MissionObjective {
  id: string;
  title: string;
  description: string;
  targetEntityId: string;
  targetLocationName: string;
  targetPosition: Vector3D;
  isCompleted: boolean;
  learningFact?: string;
  unlockMemoryId?: string;
}

export interface GameMission {
  id: string;
  chapterNumber: number;
  characterId: CharacterId;
  title: string;
  tagline: string;
  briefing: string;
  objectives: MissionObjective[];
  currentObjectiveIndex: number;
  isCompleted: boolean;
  completionSummary: string;
}

