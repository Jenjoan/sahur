import { ChapterData, DialogueNode } from '../types';

export const CHAPTERS: ChapterData[] = [
  {
    id: 'chap-maya-1',
    characterId: 'maya',
    chapterNumber: 1,
    title: 'The Void Deck Invitation',
    subtitle: 'Maya’s Perspective • Setting Boundaries Under Peer Pressure',
    initialNodeId: 'maya_node_1',
    summaryTakeaway: 'Recognising how peer pressure is disguised as "relaxation" and using clear refusal tactics protects personal goals and friends.',
    officialFactRef: 'CNB Singapore: Synthetic cannabinoids are increasingly disguised in sleek pods, causing rapid addiction, cardiac distress, and mental hallucinations.'
  },
  {
    id: 'chap-jay-1',
    characterId: 'jay',
    chapterNumber: 2,
    title: 'Hiding in Plain Sight',
    subtitle: 'Jay’s Perspective • The Physical Reality and Breaking the Silence',
    initialNodeId: 'jay_node_1',
    summaryTakeaway: 'Concealing drug consumption out of fear escalates medical risk. Honest communication with family and counsellors opens the path to safety.',
    officialFactRef: 'NAMS Singapore: Early intervention during acute substance distress prevents long-term neurochemical and physical trauma.'
  },
  {
    id: 'chap-eli-1',
    characterId: 'eli',
    chapterNumber: 3,
    title: 'The Cost of Quick Money',
    subtitle: 'Eli’s Perspective • Exploitation, Legal Reality, and Moral Courage',
    initialNodeId: 'eli_node_1',
    summaryTakeaway: 'Youths are often groomed into courier roles under false claims of low risk. In Singapore law, drug trafficking carries severe statutory penalties regardless of age.',
    officialFactRef: 'Singapore Misuse of Drugs Act: Section 5 imposes strict liability and severe penalties for any unauthorised distribution, trafficking, or delivery of controlled substances.'
  },
  {
    id: 'chap-lina-1',
    characterId: 'lina',
    chapterNumber: 4,
    title: 'Across the Dining Table',
    subtitle: 'Lina’s Perspective • Spotting Warning Signs and Providing Support',
    initialNodeId: 'lina_node_1',
    summaryTakeaway: 'Approaching a loved one with calm empathy rather than accusations allows them to step out of hiding and access confidential medical assistance.',
    officialFactRef: 'National Addictions Management Service (NAMS): Helpline 6-732-6837 provides confidential clinical, psychological, and family support services.'
  }
];

export const DIALOGUE_NODES: Record<string, DialogueNode> = {
  // ==========================================
  // MAYA'S STORYLINE
  // ==========================================
  maya_node_1: {
    id: 'maya_node_1',
    characterId: 'maya',
    speaker: 'Chloe (Teammate)',
    speakerRole: 'Classmate & Relay Member',
    text: 'Maya, good run today! Seriously, prelims are next week and my brain is completely fried. Look what Darren got from an older poly guy—mango bubblegum scent. Just one puff clears your head instantly.',
    emotion: 'neutral',
    location: 'Bishan Void Deck • Stone Chess Tables',
    timeOfDay: '18:15 SGT',
    sceneBackground: 'void_deck',
    ambientMood: 'calm',
    incomingPhoneNotification: {
      sender: 'Coach Tan',
      message: 'Relay squad: Rest well tonight. Random health & fitness screening on Friday.',
      chatId: 'coach_tan'
    },
    choices: [
      {
        id: 'maya_c1_refuse_firm',
        keyGlyph: '△',
        text: 'Firm Refusal with Alternative',
        subtext: '"I\'m good, Chloe. Relay finals are in 3 days—I need my lungs clear. Let\'s grab iced barley at the coffeeshop instead."',
        consequenceText: 'Maya stood firm without insulting her friend, offering an immediate safe alternative.',
        consequenceType: 'positive',
        impacts: {
          relationshipChange: { character: 'Chloe', change: 1, reason: 'Respected your clear, non-judgmental stance' },
          safetyScoreDelta: 20,
          flagSet: 'maya_firm_refusal'
        },
        nextNodeId: 'maya_node_2_firm',
        learningInsight: 'Clear refusal combined with a fun alternative is one of the most effective ways to decline without awkwardness.',
        unlockMemoryId: 'mem_classroom'
      },
      {
        id: 'maya_c1_hesitate_inquire',
        keyGlyph: '□',
        text: 'Inquire with Skepticism',
        subtext: '"Wait, where did Darren even get that? It has no brand packaging or health label. You have no clue what chemicals are inside."',
        consequenceText: 'Maya questioned the origin. Chloe stopped smiling and looked down at the unmarked device.',
        consequenceType: 'neutral',
        impacts: {
          safetyScoreDelta: 10,
          flagSet: 'maya_questioned_origin'
        },
        nextNodeId: 'maya_node_2_question',
        learningInsight: 'Asking critical questions breaks the illusion that unregulated street vapes are "harmless fruit vapor".'
      },
      {
        id: 'maya_c1_look_at_jay',
        keyGlyph: '○',
        text: 'Notice Jay’s Unusual Silence',
        subtext: 'Turn to Jay on the concrete bench: "Jay, you\'re unusually quiet. Are you feeling alright?"',
        consequenceText: 'Maya noticed Jay’s pale face and trembling hands before anyone else.',
        consequenceType: 'positive',
        impacts: {
          relationshipChange: { character: 'Jay', change: 2, reason: 'Felt seen and protected by your observation' },
          safetyScoreDelta: 15,
          flagSet: 'maya_checked_jay'
        },
        nextNodeId: 'maya_node_2_jay',
        learningInsight: 'Being observant of friends who appear withdrawn is the first step in spotting substance distress.'
      }
    ]
  },

  maya_node_2_firm: {
    id: 'maya_node_2_firm',
    characterId: 'maya',
    speaker: 'Jay',
    speakerRole: 'Running Partner & Sec 4 Student',
    text: 'Jay flinches slightly as Chloe pockets the device. His forehead is beaded with sweat despite the evening breeze. "I... I think I should head back too. My chest feels kind of tight from the 400m sprint."',
    emotion: 'anxious',
    location: 'Bishan Void Deck • Mosaic Pillar',
    timeOfDay: '18:20 SGT',
    sceneBackground: 'void_deck',
    ambientMood: 'tense',
    choices: [
      {
        id: 'maya_c2_walk_jay_home',
        keyGlyph: '△',
        text: 'Walk Jay Home Safely',
        subtext: '"I\'ll walk with you, Jay. Let\'s cut across the park connector. You don\'t look like yourself today."',
        consequenceText: 'You accompanied Jay, preventing him from collapsing alone on the commute.',
        consequenceType: 'positive',
        impacts: {
          relationshipChange: { character: 'Jay', change: 3, reason: 'You stayed by his side during his secret panic' },
          safetyScoreDelta: 25,
          flagSet: 'maya_walked_jay'
        },
        nextNodeId: 'maya_node_3_conclusion',
        learningInsight: 'Offering a graceful exit route allows friends under physical or social pressure to leave safely.',
        unlockMemoryId: 'mem_party'
      },
      {
        id: 'maya_c2_tell_coach',
        keyGlyph: '✕',
        text: 'Check His Breathing Directly',
        subtext: '"Jay, sit down. Your breathing is shallow and rapid. Have you taken anything today?"',
        consequenceText: 'Jay gripped his collar, terrified of being exposed, but relieved someone noticed.',
        consequenceType: 'warning',
        impacts: {
          safetyScoreDelta: 20,
          flagSet: 'maya_confronted_jay_health'
        },
        nextNodeId: 'maya_node_3_conclusion',
        learningInsight: 'Recognising rapid breathing and agitation as potential signs of adulterated substances can save a life.'
      }
    ]
  },

  maya_node_2_question: {
    id: 'maya_node_2_question',
    characterId: 'maya',
    speaker: 'Chloe',
    speakerRole: 'Classmate & Relay Member',
    text: 'Chloe shrugs defensively: "Darren says everyone in poly uses it for focus. But... actually, when Jay took a drag just before you arrived, he went completely silent and turned white as paper."',
    emotion: 'conflicted',
    location: 'Bishan Void Deck • Stone Chess Tables',
    timeOfDay: '18:22 SGT',
    sceneBackground: 'void_deck',
    ambientMood: 'tense',
    choices: [
      {
        id: 'maya_c2_warn_group',
        keyGlyph: '△',
        text: 'Issue a Clear Warning to the Squad',
        subtext: '"Throw that away right now. Street pods often have synthetic drugs mixed in. Look at Jay—that isn\'t relaxation, that\'s a medical reaction."',
        consequenceText: 'Chloe threw the pod into the council bin immediately, alarmed by Jay\'s condition.',
        consequenceType: 'positive',
        impacts: {
          safetyScoreDelta: 30,
          flagSet: 'maya_squad_warned'
        },
        nextNodeId: 'maya_node_3_conclusion',
        learningInsight: 'Speaking up with factual health knowledge breaks false peer confidence and protects the group.'
      }
    ]
  },

  maya_node_2_jay: {
    id: 'maya_node_2_jay',
    characterId: 'maya',
    speaker: 'Jay',
    speakerRole: 'Running Partner & Sec 4 Student',
    text: 'Jay looks up at Maya with eyes full of terror. "Maya... my heart feels like it\'s beating at 180 bpm. Everything sounds distant. Please don\'t tell Coach Tan, but I think whatever was in that pod wasn\'t just vape."',
    emotion: 'panicked',
    location: 'Bishan Void Deck • Mosaic Pillar',
    timeOfDay: '18:24 SGT',
    sceneBackground: 'void_deck',
    ambientMood: 'distressing',
    choices: [
      {
        id: 'maya_c2_calm_and_water',
        keyGlyph: '△',
        text: 'Keep Him Grounded & Alert Lina',
        subtext: '"Breathe with me, Jay. Four seconds in, four seconds out. I am texting your sister Lina right now. You\'re going to be okay."',
        consequenceText: 'Maya kept Jay conscious and triggered the family support network early.',
        consequenceType: 'positive',
        impacts: {
          relationshipChange: { character: 'Lina', change: 3, reason: 'Informed family before medical crisis escalated' },
          safetyScoreDelta: 35,
          flagSet: 'maya_alerted_lina'
        },
        nextNodeId: 'maya_node_3_conclusion',
        learningInsight: 'In an acute substance reaction, calm grounding and immediate contact with a trusted adult or family member is vital.'
      }
    ]
  },

  maya_node_3_conclusion: {
    id: 'maya_node_3_conclusion',
    characterId: 'maya',
    speaker: 'Maya Chen',
    speakerRole: 'Track Captain',
    text: 'As the streetlights of Bishan buzz to life, the gravity of what could have happened settles over us. One small choice to say "no" kept my track season alive—and one observant glance ensured Jay wasn’t left to suffer alone in silence.',
    emotion: 'relieved',
    location: 'Bishan Neighbourhood Park Connector',
    timeOfDay: '18:50 SGT',
    sceneBackground: 'school_track',
    ambientMood: 'reflective',
    isChapterEnd: true
  },

  // ==========================================
  // JAY'S STORYLINE
  // ==========================================
  jay_node_1: {
    id: 'jay_node_1',
    characterId: 'jay',
    speaker: 'Jay Walker',
    speakerRole: 'Student Athlete',
    text: 'My bedroom walls feel like they’re closing in. It’s 11:30 PM. The mock exam papers are piled on my desk, but I can’t read the formulas. My chest is throbbing like an engine running on empty. Ever since I took that puff at the void deck, my vision has had this weird vibrating lag.',
    emotion: 'panicked',
    location: 'HDB 4-Room Flat • Jay’s Bedroom',
    timeOfDay: '23:30 SGT',
    sceneBackground: 'bedroom_night',
    ambientMood: 'distressing',
    incomingPhoneNotification: {
      sender: 'Lina',
      message: 'Just reached the lift lobby. Did you finish the herbal soup I left on the stove?',
      chatId: 'lina_sister'
    },
    choices: [
      {
        id: 'jay_c1_confess_to_lina',
        keyGlyph: '△',
        text: 'Unlock the Door and Confess to Lina',
        subtext: 'Walk out to the living room: "Lina... I need help. My heart won\'t slow down and I took something I shouldn\'t have."',
        consequenceText: 'Jay chose honesty over shame. Lina immediately sat him down and monitored his vitals.',
        consequenceType: 'positive',
        impacts: {
          relationshipChange: { character: 'Lina', change: 3, reason: 'You trusted her with your life at your most vulnerable' },
          safetyScoreDelta: 40,
          flagSet: 'jay_confessed_to_lina'
        },
        nextNodeId: 'jay_node_2_confession',
        learningInsight: 'Seeking medical or family help during severe heart palpitations caused by synthetic drugs can prevent cardiac arrest.',
        unlockMemoryId: 'mem_bedroom_night'
      },
      {
        id: 'jay_c1_text_counsellor',
        keyGlyph: '□',
        text: 'Text the Confidential Youth Support Line',
        subtext: 'Open the NAMS All Addictions helpline (6-732-6837) or youth support chat for confidential advice.',
        consequenceText: 'Jay connected to a professional counsellor who walked him through emergency triage.',
        consequenceType: 'positive',
        impacts: {
          safetyScoreDelta: 30,
          flagSet: 'jay_contacted_helpline'
        },
        nextNodeId: 'jay_node_2_helpline',
        learningInsight: 'Singapore national helplines provide strictly confidential clinical and psychological guidance without police dispatch for medical questions.'
      },
      {
        id: 'jay_c1_conceal_and_isolate',
        keyGlyph: '✕',
        text: 'Try to Hide It & Pretend to Sleep',
        subtext: 'Turn off the desk lamp, bury your face in the pillow, and hope the palpitations pass by morning.',
        consequenceText: 'Jay isolated himself. The panic attacks intensified, causing extreme hyperventilation.',
        consequenceType: 'critical',
        impacts: {
          safetyScoreDelta: -30,
          flagSet: 'jay_concealed_symptoms'
        },
        nextNodeId: 'jay_node_2_isolate',
        learningInsight: 'Concealing drug-induced cardiac distress out of fear of getting in trouble is the leading cause of emergency hospitalization.'
      }
    ]
  },

  jay_node_2_confession: {
    id: 'jay_node_2_confession',
    characterId: 'jay',
    speaker: 'Lina',
    speakerRole: 'Older Sister',
    text: 'Lina’s keys drop onto the shoe rack. Seeing my chalk-white face, she drops her tote bag and grips both my shoulders. "Jay! Your pulse is racing. Drink this warm water slowly. Tell me exactly what it was—did someone sell you a pod? We are going to the polyclinic or hospital right now if it doesn\'t stabilise."',
    emotion: 'caring',
    location: 'HDB Flat • Kitchen Counter',
    timeOfDay: '23:38 SGT',
    sceneBackground: 'hdb_dinner',
    ambientMood: 'tense',
    choices: [
      {
        id: 'jay_c2_give_up_pod',
        keyGlyph: '△',
        text: 'Hand Over the Pod & Explain Eli’s Role',
        subtext: '"It was a pod Eli passed me at the void deck. He said it was just relaxation. I\'m so sorry, Lina. I felt so overwhelmed by the exams."',
        consequenceText: 'Lina wrapped him in a blanket. The burden of secrecy lifted, easing his acute panic.',
        consequenceType: 'positive',
        impacts: {
          relationshipChange: { character: 'Lina', change: 2, reason: 'Understood your academic vulnerability and protected you' },
          safetyScoreDelta: 30,
          flagSet: 'jay_handed_over_evidence'
        },
        nextNodeId: 'jay_node_3_conclusion',
        learningInsight: 'Identifying underlying stressors (like exam panic) allows families to address the real roots of substance vulnerability.',
        unlockMemoryId: 'mem_dinner'
      }
    ]
  },

  jay_node_2_helpline: {
    id: 'jay_node_2_helpline',
    characterId: 'jay',
    speaker: 'Counsellor (NAMS Youth Support)',
    speakerRole: 'Clinical Counsellor',
    text: '"Jay, I hear how terrified you are right now. Take slow sips of water. Synthetic cannabinoids in adulterated pods stimulate acute adrenaline release. You are safe with me right now. Can you check if an adult or family member is nearby to sit with you?"',
    emotion: 'neutral',
    location: 'HDB Flat • Bedroom',
    timeOfDay: '23:40 SGT',
    sceneBackground: 'bedroom_night',
    ambientMood: 'reflective',
    choices: [
      {
        id: 'jay_c2_call_lina_in',
        keyGlyph: '△',
        text: 'Call Lina into the Room with the Counsellor',
        subtext: '"My sister Lina just got home. The counsellor said it\'s best she knows so she can watch my heart rate."',
        consequenceText: 'Jay bridge-connected his sister with professional guidance.',
        consequenceType: 'positive',
        impacts: {
          safetyScoreDelta: 35,
          flagSet: 'jay_triaged_safely'
        },
        nextNodeId: 'jay_node_3_conclusion',
        learningInsight: 'Helplines bridge the scary gap between an isolated youth and their supportive family members.'
      }
    ]
  },

  jay_node_2_isolate: {
    id: 'jay_node_2_isolate',
    characterId: 'jay',
    speaker: 'Jay Walker',
    speakerRole: 'Student Athlete',
    text: 'Lying in the dark, my chest constricts so violently that I stumble off the bed, knocking over a stack of textbooks. The loud thump brings Lina rushing in. She switches on the lights and gasps at my blue lips and cold sweats.',
    emotion: 'panicked',
    location: 'HDB Flat • Bedroom Floor',
    timeOfDay: '23:55 SGT',
    sceneBackground: 'bedroom_night',
    ambientMood: 'distressing',
    choices: [
      {
        id: 'jay_c2_let_lina_call_995',
        keyGlyph: '△',
        text: 'Nod as Lina Calls Emergency Services',
        subtext: 'Realize that pride is nothing compared to staying alive.',
        consequenceText: 'Emergency paramedics stabilized Jay. The physician confirmed synthetic cannabinoid poisoning.',
        consequenceType: 'warning',
        impacts: {
          safetyScoreDelta: 10,
          flagSet: 'jay_paramedic_intervention'
        },
        nextNodeId: 'jay_node_3_conclusion',
        learningInsight: 'In severe synthetic poisonings, emergency medical treatment takes immediate precedence over everything else.'
      }
    ]
  },

  jay_node_3_conclusion: {
    id: 'jay_node_3_conclusion',
    characterId: 'jay',
    speaker: 'Jay Walker',
    speakerRole: 'Student Athlete',
    text: 'The dawn light peeks through my window blinds. The palpitations have slowed to a dull thud. My sister is asleep in the chair beside my bed, holding my hand. If I had stayed silent to protect my pride, I might not have woken up today. One honest confession saved my life.',
    emotion: 'relieved',
    location: 'HDB Flat • Jay’s Bedroom at Dawn',
    timeOfDay: '06:15 SGT',
    sceneBackground: 'bedroom_night',
    ambientMood: 'reflective',
    isChapterEnd: true
  },

  // ==========================================
  // ELI'S STORYLINE
  // ==========================================
  eli_node_1: {
    id: 'eli_node_1',
    characterId: 'eli',
    speaker: 'Mark ("Dex")',
    speakerRole: 'Older Acquaintance / Syndicate Recruiter',
    text: 'Telegram Audio Note: "Eli, the package is in the electrical riser at Block 214, 8th floor. You grab it, drop three pods at the void deck behind the badminton court, and keep $250. Easy work, bro. No risks. Just don’t be late."',
    emotion: 'anxious',
    location: 'Jurong East Void Deck • Stairwell Riser',
    timeOfDay: '20:45 SGT',
    sceneBackground: 'mrt_underpass',
    ambientMood: 'tense',
    incomingPhoneNotification: {
      sender: 'School Chat',
      message: 'Police advisory: Youths warned against recruitment as drug couriers on Telegram/Instagram.',
      chatId: 'school_advisory'
    },
    choices: [
      {
        id: 'eli_c1_refuse_and_cut',
        keyGlyph: '△',
        text: 'Refuse the Drop & Cut Ties with Mark',
        subtext: 'Reply to Mark: "I\'m not touching that package. Delete my contact. I know what was in the pod Jay took and I\'m done."',
        consequenceText: 'Eli refused to be an expendable pawn in drug trafficking.',
        consequenceType: 'positive',
        impacts: {
          safetyScoreDelta: 40,
          flagSet: 'eli_refused_trafficking'
        },
        nextNodeId: 'eli_node_2_refuse',
        learningInsight: 'Syndicates recruit youths with false promises of "easy money", but youths bear the full legal burden under Singapore law.',
        unlockMemoryId: 'mem_rooftop_rain'
      },
      {
        id: 'eli_c1_anonymous_tip',
        keyGlyph: '□',
        text: 'Report the Riser to CNB Anti-Drug Hotline',
        subtext: 'Call 1800-6-325-6666 anonymously to report the drop location without implicating yourself.',
        consequenceText: 'Eli provided actionable intel that prevented dangerous pods from circulating.',
        consequenceType: 'positive',
        impacts: {
          safetyScoreDelta: 50,
          flagSet: 'eli_reported_to_cnb'
        },
        nextNodeId: 'eli_node_2_cnb',
        learningInsight: 'CNB guarantees strict confidentiality for citizens reporting drug trafficking activities.',
        unlockMemoryId: 'mem_counsellor'
      },
      {
        id: 'eli_c1_hesitate_temptation',
        keyGlyph: '✕',
        text: 'Look at the $250 Cash Offer',
        subtext: 'Think about your tuition arrears: "Maybe just this once to clear my poly fees, then I stop forever..."',
        consequenceText: 'Eli felt the trap closing. He remembered Jay’s pale face at the void deck.',
        consequenceType: 'critical',
        impacts: {
          safetyScoreDelta: -20,
          flagSet: 'eli_tempted'
        },
        nextNodeId: 'eli_node_2_hesitate',
        learningInsight: '"Just this once" is the most common rationalization that leads youths into irreversible criminal syndicates.'
      }
    ]
  },

  eli_node_2_refuse: {
    id: 'eli_node_2_refuse',
    characterId: 'eli',
    speaker: 'Mark ("Dex")',
    speakerRole: 'Syndicate Recruiter',
    text: 'Mark’s voice turns cold on Telegram: "You think you can just back out? You already delivered one pod to that secondary school kid." Eli’s stomach twists with nausea. He realizes Mark was never a mentor—he was setting him up as a scapegoat.',
    emotion: 'conflicted',
    location: 'Sheltered Walkway • Jurong East',
    timeOfDay: '20:52 SGT',
    sceneBackground: 'mrt_underpass',
    ambientMood: 'tense',
    choices: [
      {
        id: 'eli_c2_block_and_confess_jay',
        keyGlyph: '△',
        text: 'Block Mark & Text Warning to Jay Immediately',
        subtext: '"Jay, if you still have that pod, do not touch it. Throw it away or bring it to your sister. I was being used by an older dealer."',
        consequenceText: 'Eli took responsibility and warned Jay before another toxic hit occurred.',
        consequenceType: 'positive',
        impacts: {
          relationshipChange: { character: 'Jay', change: 2, reason: 'Warned him about the contaminated pod' },
          safetyScoreDelta: 30,
          flagSet: 'eli_warned_jay'
        },
        nextNodeId: 'eli_node_3_conclusion',
        learningInsight: 'Breaking ties with toxic contacts and warning vulnerable friends stops the chain of drug contamination.'
      }
    ]
  },

  eli_node_2_cnb: {
    id: 'eli_node_2_cnb',
    characterId: 'eli',
    speaker: 'Duty Officer (CNB Hotline)',
    speakerRole: 'Central Narcotics Bureau Officer',
    text: '"Thank you for doing the right thing, young man. You provided the exact block and riser location. Our enforcement team will secure the package. You have protected other teenagers tonight."',
    emotion: 'neutral',
    location: 'Phone Call • Jurong East MRT',
    timeOfDay: '21:05 SGT',
    sceneBackground: 'mrt_underpass',
    ambientMood: 'reflective',
    choices: [
      {
        id: 'eli_c2_commit_clean',
        keyGlyph: '△',
        text: 'Breathe a Sigh of Relief and Delete the App',
        subtext: 'Wipe all encrypted recruiter chats and focus on your polytechnic exams.',
        consequenceText: 'Eli broke the cycle before he crossed the threshold into criminal trafficking.',
        consequenceType: 'positive',
        impacts: {
          safetyScoreDelta: 30,
          flagSet: 'eli_clean_path'
        },
        nextNodeId: 'eli_node_3_conclusion',
        learningInsight: 'Standing up to exploitation requires courage, but it permanently secures your freedom and future.'
      }
    ]
  },

  eli_node_2_hesitate: {
    id: 'eli_node_2_hesitate',
    characterId: 'eli',
    speaker: 'Eli Tan',
    speakerRole: 'Polytechnic Student',
    text: 'I stare at the riser door. My hands are shaking. In Singapore, drug trafficking carries mandatory caning and minimum imprisonment of several years under the Misuse of Drugs Act. Is $250 worth my entire adult life and my family’s name? Absolutely not.',
    emotion: 'panicked',
    location: 'Jurong East Void Deck • 8th Floor Riser',
    timeOfDay: '21:00 SGT',
    sceneBackground: 'mrt_underpass',
    ambientMood: 'tense',
    choices: [
      {
        id: 'eli_c2_step_back',
        keyGlyph: '△',
        text: 'Step Back and Walk Down the Stairs',
        subtext: 'Never touch the door. Take the stairwell down and head straight home to your parents.',
        consequenceText: 'Eli resisted the financial bait at the decisive moment.',
        consequenceType: 'positive',
        impacts: {
          safetyScoreDelta: 35,
          flagSet: 'eli_stepped_back'
        },
        nextNodeId: 'eli_node_3_conclusion',
        learningInsight: 'Recognising that the legal and human cost of drug delivery dwarfs any momentary cash promise saves lives.'
      }
    ]
  },

  eli_node_3_conclusion: {
    id: 'eli_node_3_conclusion',
    characterId: 'eli',
    speaker: 'Eli Tan',
    speakerRole: 'Polytechnic Student',
    text: 'Standing on the pedestrian overpass as the MRT train hums beneath me, I watch the city lights. Mark blocked me when he realised I wouldn\'t be his mule. I still have bills to pay, but I can work a legitimate part-time shift at a café. Tonight, I chose to walk away with my clean record and my soul intact.',
    emotion: 'relieved',
    location: 'Jurong East Pedestrian Overpass',
    timeOfDay: '21:40 SGT',
    sceneBackground: 'rooftop_rain',
    ambientMood: 'reflective',
    isChapterEnd: true
  },

  // ==========================================
  // LINA'S STORYLINE
  // ==========================================
  lina_node_1: {
    id: 'lina_node_1',
    characterId: 'lina',
    speaker: 'Lina Walker',
    speakerRole: 'Jay’s Older Sister',
    text: 'I unlock our flat’s metal gate. It’s 10:15 PM after a six-hour retail shift. The living room is dark except for the kitchen pendant light. Jay is sitting at the dining table. His bowl of soup is stone cold. His hands are buried in his hoodie pockets, and he didn’t even look up when the keys clattered.',
    emotion: 'caring',
    location: 'HDB 4-Room Flat • Living & Dining Room',
    timeOfDay: '22:15 SGT',
    sceneBackground: 'hdb_dinner',
    ambientMood: 'tense',
    incomingPhoneNotification: {
      sender: 'Maya',
      message: 'Lina, is Jay okay? He seemed really off and dizzy after practice today.',
      chatId: 'maya_chat'
    },
    choices: [
      {
        id: 'lina_c1_gentle_curiosity',
        keyGlyph: '△',
        text: 'Sit Down Gently with Empathy',
        subtext: 'Pull up a wooden stool: "Jay, you haven\'t touched dinner. You look exhausted. What happened today? I\'m here to listen, not to yell."',
        consequenceText: 'Lina avoided anger, creating a psychologically safe space for Jay.',
        consequenceType: 'positive',
        impacts: {
          relationshipChange: { character: 'Jay', change: 3, reason: 'Felt accepted and safe to speak without fear of punishment' },
          safetyScoreDelta: 30,
          flagSet: 'lina_empathetic_approach'
        },
        nextNodeId: 'lina_node_2_gentle',
        learningInsight: 'Youths who feel supported rather than interrogated are 4x more likely to disclose drug exposure before harm escalates.',
        unlockMemoryId: 'mem_dawn_rooftop'
      },
      {
        id: 'lina_c1_show_maya_text',
        keyGlyph: '□',
        text: 'Address the Warning Signs Directly',
        subtext: '"Jay, Maya just texted me. She said your hands were shaking at the void deck. Look at me—what is going on?"',
        consequenceText: 'Lina brought up specific observable facts gently without accusations.',
        consequenceType: 'neutral',
        impacts: {
          relationshipChange: { character: 'Jay', change: 1, reason: 'Realised you already knew something was wrong' },
          safetyScoreDelta: 20,
          flagSet: 'lina_direct_facts'
        },
        nextNodeId: 'lina_node_2_direct',
        learningInsight: 'Stating objective physical observations ("your hands are trembling", "you skipped meals") helps circumvent defensive denial.'
      },
      {
        id: 'lina_c1_scold_aggressively',
        keyGlyph: '✕',
        text: 'Express Frustration Over Secretive Behaviour',
        subtext: '"Why are you always hiding things? O-Levels are next month and you\'re acting completely irresponsible!"',
        consequenceText: 'Jay stood up abruptly, slammed his bedroom door, and locked himself inside.',
        consequenceType: 'critical',
        impacts: {
          relationshipChange: { character: 'Jay', change: -3, reason: 'Felt attacked and closed down completely' },
          safetyScoreDelta: -25,
          flagSet: 'lina_confrontational'
        },
        nextNodeId: 'lina_node_2_door_shut',
        learningInsight: 'Aggressive emotional confrontation often triggers avoidance, driving teenagers deeper into secret substance use.'
      }
    ]
  },

  lina_node_2_gentle: {
    id: 'lina_node_2_gentle',
    characterId: 'lina',
    speaker: 'Jay',
    speakerRole: 'Younger Brother',
    text: 'A tear rolls down Jay’s cheek. He pulls his trembling hand out of his pocket and puts a small plastic cartridge on the table. "Someone passed it to me at the void deck. They said it was just relaxation for the exams. But Lina... my heart started pounding so hard I thought I was having a stroke. I was so ashamed to tell you."',
    emotion: 'panicked',
    location: 'HDB Flat • Kitchen Table',
    timeOfDay: '22:25 SGT',
    sceneBackground: 'hdb_dinner',
    ambientMood: 'reflective',
    choices: [
      {
        id: 'lina_c2_support_and_counselling',
        keyGlyph: '△',
        text: 'Reassure Him & Plan Support with NAMS / Counsellor',
        subtext: '"Thank you for telling me, Jay. You are safe. Tomorrow morning, we\'ll talk to Mrs. Koh at school and call NAMS for advice. We will fix this together."',
        consequenceText: 'Lina provided unconditional family support paired with structured professional care.',
        consequenceType: 'positive',
        impacts: {
          relationshipChange: { character: 'Jay', change: 4, reason: 'Anchored him with protective love and medical solutions' },
          safetyScoreDelta: 40,
          flagSet: 'lina_family_recovery_plan'
        },
        nextNodeId: 'lina_node_3_conclusion',
        learningInsight: 'Family love is the single strongest protective factor in preventing recurring drug vulnerability.'
      }
    ]
  },

  lina_node_2_direct: {
    id: 'lina_node_2_direct',
    characterId: 'lina',
    speaker: 'Jay',
    speakerRole: 'Younger Brother',
    text: 'Jay flinches when Maya’s name is mentioned, but seeing that Lina isn’t screaming, his shoulders drop. "Maya saw me almost collapse. I didn\'t know what was in that vape, Lina. I swear I didn\'t know it had synthetic stuff."',
    emotion: 'conflicted',
    location: 'HDB Flat • Kitchen Table',
    timeOfDay: '22:28 SGT',
    sceneBackground: 'hdb_dinner',
    ambientMood: 'reflective',
    choices: [
      {
        id: 'lina_c2_focus_on_health',
        keyGlyph: '△',
        text: 'Focus Purely on His Health and Safety',
        subtext: '"The grades don\'t matter if you\'re in a hospital bed, Jay. Let\'s check your vitals now and dispose of that pod safely."',
        consequenceText: 'Lina reprioritized Jay’s life and mental health over academic pressure.',
        consequenceType: 'positive',
        impacts: {
          safetyScoreDelta: 35,
          flagSet: 'lina_health_first'
        },
        nextNodeId: 'lina_node_3_conclusion',
        learningInsight: 'Relieving toxic academic expectations removes the primary trigger for teenage substance experimentation.'
      }
    ]
  },

  lina_node_2_door_shut: {
    id: 'lina_node_2_door_shut',
    characterId: 'lina',
    speaker: 'Lina Walker',
    speakerRole: 'Older Sister',
    text: 'The slam of Jay\'s door rings in the quiet flat. I stare at the wood, my hands shaking. Frustration won\'t save him. If I let my anger control this moment, I might lose my brother.',
    emotion: 'conflicted',
    location: 'HDB Flat • Corridor Outside Jay\'s Room',
    timeOfDay: '22:35 SGT',
    sceneBackground: 'hdb_dinner',
    ambientMood: 'tense',
    choices: [
      {
        id: 'lina_c2_knock_and_apologize',
        keyGlyph: '△',
        text: 'Knock Softly and Apologize for Shouting',
        subtext: '"Jay, I\'m sorry for yelling. I was scared because I love you. Please open the door—we will get through this."',
        consequenceText: 'Lina repaired the rupture. Jay slowly unlocked the door and let her in.',
        consequenceType: 'positive',
        impacts: {
          relationshipChange: { character: 'Jay', change: 2, reason: 'Repaired the conversation through humble de-escalation' },
          safetyScoreDelta: 20,
          flagSet: 'lina_deescalated'
        },
        nextNodeId: 'lina_node_3_conclusion',
        learningInsight: 'De-escalating conflict through genuine humility restores trust when emotional tensions run high.'
      }
    ]
  },

  lina_node_3_conclusion: {
    id: 'lina_node_3_conclusion',
    characterId: 'lina',
    speaker: 'Lina Walker',
    speakerRole: 'Older Sister',
    text: 'We sit side by side on the living room sofa until midnight, the TV playing low in the background. Jay is resting his head on my shoulder, breathing evenly at last. One patient conversation prevented a disaster. In our family, no one fights alone.',
    emotion: 'caring',
    location: 'HDB Flat • Living Room Sofa',
    timeOfDay: '00:15 SGT',
    sceneBackground: 'counsellor_office',
    ambientMood: 'calm',
    isChapterEnd: true
  }
};
