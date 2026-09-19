import { ChoiceOption } from '../types';

export interface Dialogue3DData {
  id: string;
  npcName: string;
  npcRole: string;
  avatarId: 'maya' | 'jay' | 'eli' | 'lina' | 'coach' | 'chloe' | 'police';
  mood: 'neutral' | 'tense' | 'distressed' | 'protective' | 'relieved';
  lines: string[];
  choices: ChoiceOption[];
}

export const DIALOGUES_3D: Record<string, Dialogue3DData> = {
  dialogue_coach: {
    id: 'dialogue_coach',
    npcName: 'Coach Tan',
    npcRole: 'School Track & Field Coach',
    avatarId: 'coach',
    mood: 'protective',
    lines: [
      'Maya! Great warm-up earlier. The National Schools relay finals are coming up in three weeks.',
      'Remember what I told the team: pressure is real, but taking shortcuts or relying on unverified "relaxant" vapes destroys your cardiovascular system and permanently disqualifies you.',
      'Keep your eyes open for your teammates, especially Jay. He seemed uncharacteristically distracted and exhausted during baton passes today.',
    ],
    choices: [
      {
        id: 'coach_c1',
        text: '“I will check on Jay right now, Coach. We run clean.”',
        subtext: 'Demonstrate leadership and protective team vigilance.',
        consequenceType: 'positive',
        nextNodeId: 'done',
        statsImpact: { peerResistance: 15, supportAwareness: 10 },
      },
      {
        id: 'coach_c2',
        text: '“Understood, Coach. What should we do if someone is showing acute physical symptoms?”',
        subtext: 'Ask about emergency protocols.',
        consequenceType: 'positive',
        nextNodeId: 'done',
        statsImpact: { supportAwareness: 20 },
      },
    ],
  },

  dialogue_chloe: {
    id: 'dialogue_chloe',
    npcName: 'Chloe',
    npcRole: 'Sec 4 Peer at Void Deck',
    avatarId: 'chloe',
    mood: 'tense',
    lines: [
      'Maya! Hey, don’t look so serious. Everyone from the study group is taking a break behind the riser.',
      'Look at this new pod I got from an online contact. It smells like mango and makes all the Prelim exam stress disappear in two seconds.',
      'Come on, take one pull. Just one hit won’t hurt anyone, right? Don’t be a killjoy.',
    ],
    choices: [
      {
        id: 'chloe_refuse_firm',
        text: '“No Chloe. Unmarked pods are spiked with synthetic cannabinoids. Put that away.”',
        subtext: 'Use clear, assertive refusal skills and protect the group from chemical exposure.',
        consequenceType: 'positive',
        nextNodeId: 'done',
        statsImpact: { peerResistance: 25, riskAvoidance: 20 },
      },
      {
        id: 'chloe_warn_health',
        text: '“Where did you get that? It has no seal. People have collapsed with heart seizures from those.”',
        subtext: 'Confront the chemical danger with factual health knowledge.',
        consequenceType: 'positive',
        nextNodeId: 'done',
        statsImpact: { supportAwareness: 20, peerResistance: 15 },
      },
      {
        id: 'chloe_deflect',
        text: '“I have a relay race to run. I am leaving, and you shouldn’t touch that either.”',
        subtext: 'Walk away with clear boundary setting.',
        consequenceType: 'neutral',
        nextNodeId: 'done',
        statsImpact: { riskAvoidance: 10 },
      },
    ],
  },

  dialogue_jay: {
    id: 'dialogue_jay',
    npcName: 'Jay',
    npcRole: 'Student Athlete (Acute Distress)',
    avatarId: 'jay',
    mood: 'distressed',
    lines: [
      'Maya...? (Jay is pale, trembling violently, clutching his chest with clammy hands)',
      'My chest... my heart won’t slow down. It’s pounding at 160 bpm... the court is spinning...',
      'I took a hit from that unmarked vape Chloe brought. I was so anxious about failing math and disappointing my parents... I didn’t know it was spiked with Spice...',
      'Please don’t call anyone! If the school finds out, I’ll be kicked off the team and my parents will be devastated... please just let me sleep it off here!',
    ],
    choices: [
      {
        id: 'jay_save_life',
        text: '“No Jay, this is a medical emergency. Your life comes first. I am calling 995 and Coach Tan now!”',
        subtext: 'Immediate medical triage prevents fatal cardiac arrhythmia. Healthcare is confidential.',
        consequenceType: 'positive',
        nextNodeId: 'done',
        statsImpact: { supportAwareness: 30, familyConnection: 20 },
      },
      {
        id: 'jay_call_lina',
        text: '“I am calling your sister Lina and getting water right now. You cannot sleep this off alone.”',
        subtext: 'Mobilize immediate family support and stay by his side.',
        consequenceType: 'positive',
        nextNodeId: 'done',
        statsImpact: { familyConnection: 25, supportAwareness: 15 },
      },
    ],
  },

  dialogue_eli: {
    id: 'dialogue_eli',
    npcName: 'Eli',
    npcRole: 'Polytechnic Youth (Courier Target)',
    avatarId: 'eli',
    mood: 'tense',
    lines: [
      'Maya? What are you doing near the Block 125 riser? Keep your voice down...',
      'An older guy named Mark on Telegram offered me $200 just to drop this taped shoebox inside the riser chute. He told me it’s just harmless vape accessories.',
      'My poly laptop broke down and I need the money for school fees... but my hands won’t stop shaking.',
    ],
    choices: [
      {
        id: 'eli_warn_trafficking',
        text: '“Eli, stop! Under Singapore law, couriers are charged with drug trafficking regardless of what Mark told you!”',
        subtext: 'Inform Eli of strict liability under the Misuse of Drugs Act to prevent severe criminal record.',
        consequenceType: 'positive',
        nextNodeId: 'done',
        statsImpact: { riskAvoidance: 30, supportAwareness: 20 },
      },
      {
        id: 'eli_report_hotline',
        text: '“Drop the box and report the contact to the Anti-Drug Helpline (1800-732-4444). Don’t take the fall for recruiters.”',
        subtext: 'Guide Eli toward official youth protection and confidential reporting.',
        consequenceType: 'positive',
        nextNodeId: 'done',
        statsImpact: { supportAwareness: 25, peerResistance: 20 },
      },
    ],
  },

  dialogue_lina: {
    id: 'dialogue_lina',
    npcName: 'Lina',
    npcRole: 'Jay’s Older Sister',
    avatarId: 'lina',
    mood: 'protective',
    lines: [
      'Maya! Have you seen Jay? He hasn’t come home for dinner and his phone was switched off.',
      'Lately he locks himself in his room, skips meals, and has severe mood swings. I found strange burnt smells on his school bag yesterday.',
      'I don’t want to interrogate him, but I am terrified he is getting pulled into something dangerous.',
    ],
    choices: [
      {
        id: 'lina_honest_support',
        text: '“Lina, Jay is at the basketball court right now in acute distress. He needs our help, not anger.”',
        subtext: 'Lead Lina directly to Jay to provide supportive family intervention.',
        consequenceType: 'positive',
        nextNodeId: 'done',
        statsImpact: { familyConnection: 30, supportAwareness: 20 },
      },
      {
        id: 'lina_counsellor',
        text: '“Let’s go together. We should also connect with the Family Service Centre helpline.”',
        subtext: 'Empower family communication with professional youth support resources.',
        consequenceType: 'positive',
        nextNodeId: 'done',
        statsImpact: { familyConnection: 20, supportAwareness: 25 },
      },
    ],
  },

  dialogue_officer_farhan: {
    id: 'dialogue_officer_farhan',
    npcName: 'Staff Sgt. Farhan',
    npcRole: 'SPF Community Policing Officer',
    avatarId: 'police',
    mood: 'protective',
    lines: [
      'Good evening! You are standing right outside the Divisional Headquarters and Consequence Centre.',
      'Inside, we have built an interactive exhibition showcasing Singapore drug laws, true-to-life case studies in the detention cells, forensic evidence, and a dilemma decision lab.',
      'Too many youths think holding a parcel for an acquaintance or taking a puff of a foreign vape is "no big deal" until they face severe legal and life-changing consequences. Step inside to explore for yourself!',
    ],
    choices: [
      {
        id: 'farhan_enter',
        text: '“Thank you, Sergeant. I want to enter and explore the Consequence Centre.”',
        subtext: 'Walk through the doors into the interactive law and consequences museum.',
        consequenceType: 'positive',
        nextNodeId: 'done',
        statsImpact: { legalLiteracy: 15, supportAwareness: 10 },
      },
      {
        id: 'farhan_ask_help',
        text: '“Sergeant, what should someone do if an acquaintance tries to hand them an unknown package?”',
        subtext: 'Learn official safety and reporting protocols for courier traps.',
        consequenceType: 'positive',
        nextNodeId: 'done',
        statsImpact: { legalLiteracy: 20, peerResistance: 20 },
      },
    ],
  },
};
