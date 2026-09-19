import { LifeAlbumMemory, SupportResource } from '../types';

export const INITIAL_MEMORIES: LifeAlbumMemory[] = [
  {
    id: 'mem_bedroom_night',
    chapterRef: 'Chapter 2 • Jay',
    sceneCode: '1.1',
    title: 'Bedroom (Night)',
    location: 'Jay’s Study Desk • 23:30 SGT',
    caption: 'Ten-Year-Series exam books piled under the desk lamp. The moment acute palpitations overtook Jay in isolation.',
    unlocked: true,
    keyDialogue: '"My heart won\'t stop racing... I just wanted one hour without exam panic."',
    learningNote: 'Academic burnout can push vulnerable students toward false "quick-fix" relaxation substances.',
    artType: 'bedroom_night'
  },
  {
    id: 'mem_rooftop_rain',
    chapterRef: 'Chapter 3 • Eli',
    sceneCode: '1.2',
    title: 'Rooftop (Rain)',
    location: 'HDB High-Rise Walkway • Jurong',
    caption: 'Standing in the rain watching the city train pass by after refusing Mark’s lucrative delivery offer.',
    unlocked: true,
    keyDialogue: '"They promised $250. But in Singapore, being a courier means facing statutory trafficking laws."',
    learningNote: 'Syndicates intentionally deceive youths into believing delivering packages carries zero personal liability.',
    artType: 'rooftop_rain'
  },
  {
    id: 'mem_party',
    chapterRef: 'Chapter 1 • Maya',
    sceneCode: '1.3',
    title: 'Void Deck Gathering',
    location: 'Bishan Void Deck • Stone Chess Tables',
    caption: 'The after-training gathering where peer pressure was masked as harmless fruity vape vapor.',
    unlocked: true,
    keyDialogue: '"Just one puff to chill, everyone does it before prelims."',
    learningNote: 'Refusal is strongest when paired with a clear, non-awkward alternative like grabbing a drink together.',
    artType: 'party'
  },
  {
    id: 'mem_classroom',
    chapterRef: 'Chapter 1 • Maya',
    sceneCode: '1.4',
    title: 'Classroom & Track',
    location: 'Secondary 4 Form Room & Athletic Track',
    caption: 'Maya holding the captain’s baton. Clean lungs and clear mental focus win races; substances derail them.',
    unlocked: true,
    keyDialogue: '"Relay finals are in 3 days. I worked too hard for this squad to throw it away."',
    learningNote: 'Anchoring yourself to real long-term passions builds natural resilience against temporary peer pressure.',
    artType: 'classroom'
  },
  {
    id: 'mem_dinner',
    chapterRef: 'Chapter 4 • Lina',
    sceneCode: '2.1',
    title: 'Dinner at the Table',
    location: 'HDB 4-Room Flat • Kitchen Table',
    caption: 'The cold bowl of chicken soup. The exact moment Lina noticed Jay’s trembling hands and chose patience over anger.',
    unlocked: true,
    keyDialogue: '"Jay, look at me. I\'m your sister first. Talk to me—no scolding, just truth."',
    learningNote: 'Non-judgmental family environments encourage timely confession before irreversible medical harm.',
    artType: 'dinner'
  },
  {
    id: 'mem_notebook',
    chapterRef: 'All Perspectives',
    sceneCode: '2.2',
    title: 'Playbook & Dossier',
    location: 'Track Strategy & Personal Journal',
    caption: 'Handwritten reflections on youth peer pressure, boundaries, and how four lives crossed paths.',
    unlocked: true,
    keyDialogue: '"One choice to say no ripples forward. One choice to listen saves a brother."',
    learningNote: 'Documenting your feelings and recognizing early warning signs turns private worry into proactive safety.',
    artType: 'notebook'
  },
  {
    id: 'mem_dawn_rooftop',
    chapterRef: 'Chapter 2 • Jay',
    sceneCode: '2.3',
    title: 'Dawn Rooftop',
    location: 'Neighbourhood Roof Garden • Sunrise',
    caption: 'Jay and Maya sharing a bottle of water at dawn after surviving the acute panic episode.',
    unlocked: true,
    keyDialogue: '"Thank you for not leaving me at that void deck yesterday."',
    learningNote: 'True friendship is about speaking the hard truth to keep each other safe, not enabling dangerous habits.',
    artType: 'dawn_rooftop'
  },
  {
    id: 'mem_counsellor',
    chapterRef: 'Chapter 4 • Lina & Jay',
    sceneCode: '2.4',
    title: 'Counsellor’s Office',
    location: 'School Wellness Room • Consultation Desk',
    caption: 'Meeting Mrs. Koh and connecting with the NAMS support system for healthy coping mechanisms.',
    unlocked: true,
    keyDialogue: '"Reaching out isn\'t an admission of weakness. It is the beginning of recovery."',
    learningNote: 'Professional counsellors provide confidential strategies for exam stress and relapse prevention.',
    artType: 'counsellor'
  }
];

export const SUPPORT_RESOURCES: SupportResource[] = [
  {
    name: 'CNB Anti-Drug Hotline',
    organization: 'Central Narcotics Bureau (Singapore)',
    contact: '1800-6-325-6666',
    hours: '24 Hours • Toll-Free & Confidential',
    description: 'Call to report suspected drug activities, syndicates, or to seek general advice on drug abuse prevention and reporting.',
    category: 'confidential'
  },
  {
    name: 'National Addictions Management Service (NAMS)',
    organization: 'Institute of Mental Health (IMH)',
    contact: '6-732-6837 (6-RECOVER)',
    hours: 'Monday – Sunday: 8:00 AM – 11:00 PM',
    description: 'Confidential clinical assessment, counselling, and rehabilitation support for individuals and families dealing with substance dependence.',
    category: 'medical'
  },
  {
    name: 'Samaritans of Singapore (SOS)',
    organization: 'SOS Singapore',
    contact: '1767 (24h Hotline) / CareText via WhatsApp',
    hours: '24 Hours Daily',
    description: 'Immediate emotional support and crisis intervention for individuals experiencing severe distress, panic, or suicidal ideation.',
    category: 'helpline'
  },
  {
    name: 'TOUCHline (Youth Helpline)',
    organization: 'TOUCH Community Services',
    contact: '1800-377-2252',
    hours: 'Monday – Friday: 9:00 AM – 6:00 PM',
    description: 'Youth-centric counselling and guidance for school stress, emotional wellness, peer relationships, and family conflicts.',
    category: 'youth'
  }
];

export const SINGAPORE_LEGAL_FACTS = [
  {
    title: 'Misuse of Drugs Act (MDA) — Zero Tolerance',
    details: 'In Singapore, illicit drugs are classified under strict controlled schedules. Consumption, possession, and trafficking are severe criminal offences regardless of whether substances are consumed locally or by Singapore citizens/PRs overseas.'
  },
  {
    title: 'The Danger of Adulterated Vapes ("K-Pods")',
    details: 'Street vapes and unlabelled pods frequently test positive for synthetic cannabinoids (such as spice, K2) or etomidate. These are dangerous psychoactive controlled compounds that trigger violent seizures, extreme paranoia, psychosis, and cardiac arrhythmia.'
  },
  {
    title: 'No "Casual Courier" Exemption',
    details: 'Under Section 5 of the MDA, anyone who carries, distributes, or transports controlled substances can be charged with trafficking. Claiming "I was just doing a delivery for $200" or "holding it for a friend" offers zero legal immunity.'
  },
  {
    title: 'Confidential Medical Treatment & Early Help',
    details: 'Seeking voluntary medical treatment and psychological counselling at NAMS or through family doctors prior to law enforcement arrest focuses on clinical rehabilitation and healing, safeguarding the youth’s health and future.'
  }
];
