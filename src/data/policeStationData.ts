// Official Singapore Drug Laws (Misuse of Drugs Act Cap 185) & Consequence Centre Data

export interface LawItem {
  id: string;
  offence: string;
  actSection: string;
  shortSummary: string;
  legalConsequences: {
    imprisonment: string;
    fines: string;
    caningOrMax: string;
  };
  keyFacts: string[];
  singaporePerspective: string;
}

export interface DetentionCase {
  id: string;
  caseNumber: string;
  characterName: string;
  characterAge: number;
  characterAvatarSeed: string;
  offenceTitle: string;
  mdaSection: string;
  shortDescription: string;
  fullCaseSummary: string;
  evidenceItems: {
    name: string;
    icon: string;
    description: string;
  }[];
  verdict: {
    sentence: string;
    fine: string;
    recordImpact: string;
  };
  keyTakeaway: string;
}

export interface EvidenceItem {
  id: string;
  name: string;
  category: 'Device' | 'Packaging' | 'Digital Log' | 'Proceeds';
  icon: string;
  relatedOffence: string;
  mdaStatute: string;
  shortExplanation: string;
  forensicAnalysis: string;
  legalConsequence: string;
}

export interface ConsequenceCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  bulletPoints: string[];
  helpline?: {
    name: string;
    number: string;
    hours: string;
  };
}

export interface DilemmaScenario {
  id: string;
  title: string;
  situation: string;
  prompt: string;
  options: {
    podiumId: 'A' | 'B' | 'C';
    title: string;
    actionDescription: string;
    isRecommended: boolean;
    consequenceExplanation: string;
    safetyTakeaway: string;
  }[];
}

// 1. LAW WALL EXHIBITS
export const LAW_WALL_ITEMS: LawItem[] = [
  {
    id: 'law_possession',
    offence: 'Possession of Controlled Drugs',
    actSection: 'Misuse of Drugs Act (MDA) — Section 8(a)',
    shortSummary:
      'Having controlled drugs in your custody, bag, vehicle, or room. Knowledge of possession is presumed under law if drugs are found in your belongings.',
    legalConsequences: {
      imprisonment: 'Up to 10 years imprisonment',
      fines: 'Fine up to $20,000',
      caningOrMax: 'Both imprisonment and fine can be imposed',
    },
    keyFacts: [
      'Ignorance is NOT a legal defence: Under Singapore law, you are presumed to possess what is in your personal bag, locker, or room.',
      'Even minute traces or residues left inside containers or vape cartridges constitute illegal possession.',
      'Possessing drug paraphernalia (pipes, bongs, modified vaping gear) is also punishable under Section 9 with up to 3 years imprisonment or $10,000 fine.',
    ],
    singaporePerspective:
      'In Singapore, zero-tolerance policies ensure that individuals cannot escape liability by claiming they did not know what was inside a package handed to them by acquaintances.',
  },
  {
    id: 'law_consumption',
    offence: 'Consumption of Controlled Drugs',
    actSection: 'Misuse of Drugs Act (MDA) — Section 8(b)',
    shortSummary:
      'Inhaling, smoking, ingesting, or vaping any controlled substance. Applies equally to Singapore citizens and PRs consuming overseas!',
    legalConsequences: {
      imprisonment: 'Up to 10 years imprisonment (first offence) or Drug Rehabilitation Centre (DRC)',
      fines: 'Fine up to $20,000',
      caningOrMax: 'Enhanced imprisonment of up to 13 years for repeat consumption under Section 33A',
    },
    keyFacts: [
      'Extra-territorial jurisdiction (Section 8A): Singapore citizens and Permanent Residents who consume controlled drugs overseas will be treated as if the consumption took place in Singapore.',
      'Routine urine and hair follicle screening at border checkpoints (Changi Airport, Woodlands, Tuas) detect drug metabolites weeks after consumption.',
      'Vaping liquids containing illicit synthetic cannabinoids (e.g. K2, Spice) are treated under drug consumption laws, not merely tobacco offences.',
    ],
    singaporePerspective:
      'Singapore laws hold citizens accountable globally to prevent overseas holiday trips from becoming loopholes for substance abuse.',
  },
  {
    id: 'law_trafficking',
    offence: 'Drug Trafficking & Social Distribution',
    actSection: 'Misuse of Drugs Act (MDA) — Section 5',
    shortSummary:
      'Giving, moving, transporting, or delivering drugs to any person. Under Singapore law, selling for money is NOT required—sharing with friends or holding a bag is trafficking!',
    legalConsequences: {
      imprisonment: 'Mandatory minimum 5 years up to Life Imprisonment',
      fines: 'Heavy court fines',
      caningOrMax: 'Mandatory caning (5 to 15 strokes) or Capital Punishment for specified threshold weights',
    },
    keyFacts: [
      'Social Distribution is Trafficking: Passing an illegal substance or vape pod to a peer at a chalet or party—even for free—constitutes trafficking under Section 5.',
      'Presumption of Trafficking (Section 17): Possessing more than specified threshold quantities (e.g. >2g of pure heroin or >15g of cannabis) triggers a statutory presumption that you possess it for trafficking.',
      'Couriers and "Mules": Delivering an unopened parcel or acting as a drop-off agent for someone else carries identical severe trafficking penalties.',
    ],
    singaporePerspective:
      'Drug syndicates deliberately target vulnerable youths with promises of quick pocket money to act as runners, exposing them to catastrophic legal penalties.',
  },
  {
    id: 'law_import_export',
    offence: 'Importation & Exportation of Controlled Drugs',
    actSection: 'Misuse of Drugs Act (MDA) — Section 7',
    shortSummary:
      'Bringing or arranging to bring controlled substances into Singapore across borders, including through international online mail or freight couriers.',
    legalConsequences: {
      imprisonment: 'Mandatory minimum imprisonment from 20 to 30 years or Life Imprisonment',
      fines: 'Asset seizure and forfeiture of all illicit gains',
      caningOrMax: 'Mandatory 15 strokes of caning; Capital punishment for threshold amounts',
    },
    keyFacts: [
      'All air parcel hubs, sea ports, and land checkpoints employ high-tech multi-angle X-ray scanners, canine units, and spectroscopic chemical analyzers.',
      'Ordering gummies, candies, or e-liquids containing controlled substances from overseas websites constitutes international importation.',
      'Misleading foreign labels stating "legal in country of origin" have zero legal standing under Singapore territorial jurisdiction.',
    ],
    singaporePerspective:
      'Singapore maintains strict border controls to protect the community from cross-border drug proliferation that devastates other regions.',
  },
  {
    id: 'law_vaping_substances',
    offence: 'E-Vaporizers & Synthetic Cannabinoids',
    actSection: 'Tobacco Act Section 16 & Misuse of Drugs Act',
    shortSummary:
      'Possession or use of electronic vaporizers is strictly prohibited. If vape pods contain synthetic drugs, offenders are prosecuted under severe drug laws.',
    legalConsequences: {
      imprisonment: 'Up to 10 years imprisonment under MDA if drugs detected',
      fines: 'Up to $2,000 fine for standard vaping; up to $20,000 under MDA for drug pods',
      caningOrMax: 'Criminal conviction recorded',
    },
    keyFacts: [
      'Unregulated street vape pods frequently contain deadly synthetic cannabinoids, industrial heavy metals, and toxic chemical solvents.',
      'Users often have no knowledge of the lethal cocktail mixed into cheap refill cartridges by clandestine syndicates.',
      'Possession of any e-vaporizer device in Singapore is an offence investigated by HSA, while spiked pods trigger immediate CNB enforcement.',
    ],
    singaporePerspective:
      'Health Sciences Authority (HSA) and Central Narcotics Bureau (CNB) conduct joint operations targeting illicit e-vaporizer distribution networks targeting school-age youths.',
  },
];

// 2. DETENTION CELL CASES
export const DETENTION_CASES: DetentionCase[] = [
  {
    id: 'case_2410',
    caseNumber: 'CASE #2410',
    characterName: 'Leon T.',
    characterAge: 20,
    characterAvatarSeed: 'leon_detention',
    offenceTitle: 'Trafficking by Acting as Courier',
    mdaSection: 'Misuse of Drugs Act Section 5(1)(a)',
    shortDescription: 'Agreed to collect and hold an unlabelled shoe box for an online acquaintance offering $200 fast cash.',
    fullCaseSummary:
      'Leon was a polytechnic student struggling with gaming debt. An acquaintance on an encrypted messaging group promised him $200 simply to receive an unlabelled delivery package at his void deck and store it for 24 hours. Leon suspected something was illegal but told himself "I am not touching whatever is inside, so I am safe." Central Narcotics Bureau officers arrested Leon during a controlled delivery. The package contained Class A controlled substances exceeding statutory trafficking thresholds.',
    evidenceItems: [
      {
        name: 'Seized Unlabelled Delivery Box',
        icon: '📦',
        description: 'Taped cardboard package containing concealed controlled substances with courier tracking label.',
      },
      {
        name: 'Encrypted Chat Log',
        icon: '📱',
        description: 'Messages discussing drop-off point at void deck with promises of $200 pay-per-drop.',
      },
      {
        name: 'Bank Transfer Screenshot',
        icon: '💳',
        description: 'Partial advance transfer confiscated as proceeds of crime.',
      },
    ],
    verdict: {
      sentence: 'Mandatory 10 Years Imprisonment',
      fine: 'Forfeiture of all payment proceeds',
      recordImpact: 'Permanent criminal record, expulsion from tertiary studies, lifetime career barrier',
    },
    keyTakeaway:
      'Never accept, carry, or hold packages for other people. "I didn\'t open it" or "I was just doing a delivery" is NOT a defence under Singapore law.',
  },
  {
    id: 'case_2411',
    caseNumber: 'CASE #2411',
    characterName: 'Sarah K.',
    characterAge: 19,
    characterAvatarSeed: 'sarah_detention',
    offenceTitle: 'Consumption of Controlled Substance Overseas',
    mdaSection: 'Misuse of Drugs Act Section 8(b) read with Section 8A',
    shortDescription: 'Vaped an unlabelled liquid at an overseas graduation trip party thinking Singapore laws would not apply abroad.',
    fullCaseSummary:
      'Sarah traveled to an overseas holiday destination with friends to celebrate graduation. At a nightlife club, peers offered her an electronic vaporizer advertised as "herbal mood relaxer". Sarah assumed that because the country had relaxed regulations, she could try it without repercussions once she returned home. Upon landing at Changi Airport, Sarah was selected for random urine testing by CNB officers. Her sample tested positive for controlled synthetic cannabinoids. Under Section 8A of the MDA, extra-territorial provisions apply to Singapore citizens and PRs abroad.',
    evidenceItems: [
      {
        name: 'Positive Laboratory Hair & Urine Screening',
        icon: '🧪',
        description: 'Forensic toxicology report confirming presence of synthetic cannabinoid metabolites.',
      },
      {
        name: 'Boarding Pass & Customs Declaration',
        icon: '✈️',
        description: 'Changi Airport arrival screening record showing jurisdiction under Section 8A.',
      },
    ],
    verdict: {
      sentence: 'Drug Rehabilitation Centre (DRC) Mandatory Treatment + 2 Years Supervision',
      fine: 'Administrative suspension of passport privileges',
      recordImpact: 'Enforced curfew monitoring, compulsory electronic tagging during vocational training',
    },
    keyTakeaway:
      'Singapore drug laws follow citizens overseas. Holiday destinations with permissive drug laws do not protect you from prosecution when returning home.',
  },
  {
    id: 'case_2412',
    caseNumber: 'CASE #2412',
    characterName: 'Marcus L.',
    characterAge: 22,
    characterAvatarSeed: 'marcus_detention',
    offenceTitle: 'Unlawful Possession of Controlled Prescription Stimulants',
    mdaSection: 'Misuse of Drugs Act Section 8(a)',
    shortDescription: 'Purchased black-market stimulant pills online to cram for final exams without medical prescription.',
    fullCaseSummary:
      'Facing severe academic stress, Marcus saw an online forum recommending "study booster smart pills" to pull multiple all-nighters. He purchased unprescribed amphetamine-based tablets from an unregulated seller. Within two weeks, Marcus developed intense insomnia, severe cardiac palpitations, and paranoia. After collapsing at home, emergency services discovered the remaining illicit pills in his desk drawer. Marcus was prosecuted for illegal possession of Class A controlled substances.',
    evidenceItems: [
      {
        name: 'Blister Pack of Unlabelled Stimulants',
        icon: '💊',
        description: 'Counterfeit prescription tablets containing unverified chemical concentrations.',
      },
      {
        name: 'Emergency Medical Toxicology Report',
        icon: '📋',
        description: 'Hospital records documenting acute tachycardia, panic disorder, and drug toxicity.',
      },
    ],
    verdict: {
      sentence: '18 Months Imprisonment suspended with Mandatory Psychiatric Rehabilitation',
      fine: '$5,000 court fine',
      recordImpact: 'Loss of university scholarship and professional licensing eligibility',
    },
    keyTakeaway:
      'There are no "smart shortcuts". Black-market pills marketed as study enhancers are dangerous, illegal controlled substances that destroy both health and futures.',
  },
  {
    id: 'case_2413',
    caseNumber: 'CASE #2413',
    characterName: 'Chloe W.',
    characterAge: 19,
    characterAvatarSeed: 'chloe_detention',
    offenceTitle: 'Social Distribution & Facilitating Drug Abuse',
    mdaSection: 'Misuse of Drugs Act Section 5(1)(b)',
    shortDescription: 'Passed spiked vape cartridges to classmates at a birthday chalet, claiming it was just "sharing for fun".',
    fullCaseSummary:
      'Chloe obtained disposable vape pods from an online contact and brought them to a classmate\'s birthday celebration at an East Coast chalet. She passed the pods around to three peers to "help them chill out". One classmate suffered acute respiratory distress and vomiting, requiring emergency hospitalization. During investigations, Chloe insisted she was not a "drug dealer" because she did not charge her friends money. Under Section 5 of the MDA, the act of giving or supplying—even for zero profit—is legally classified as trafficking.',
    evidenceItems: [
      {
        name: 'Recovered Spiked Vape Pods',
        icon: '💨',
        description: 'E-vaporizer pods containing high concentrations of synthetic cannabinoid solvents.',
      },
      {
        name: 'Hospital Incident Report',
        icon: '🏥',
        description: 'Emergency admission notes of victim suffering acute substance-induced psychosis.',
      },
    ],
    verdict: {
      sentence: '5 Years Imprisonment and 5 Strokes of the Cane',
      fine: 'Mandatory restitution to victim medical expenses',
      recordImpact: 'Permanent criminal record, immediate institutional expulsion',
    },
    keyTakeaway:
      '"Just sharing with friends" is legally treated as drug trafficking in Singapore. Giving drugs to others carries the same devastating consequences as selling them.',
  },
];

// 3. EVIDENCE ROOM FORENSIC OBJECTS
export const EVIDENCE_ROOM_ITEMS: EvidenceItem[] = [
  {
    id: 'ev_spiked_vape',
    name: 'Seized Unregulated Vape Cartridge',
    category: 'Device',
    icon: '💨',
    relatedOffence: 'Possession & Consumption of Synthetic Cannabinoids',
    mdaStatute: 'Misuse of Drugs Act First Schedule (Class A)',
    shortExplanation: 'A seemingly normal vape pod discovered to be mixed with toxic synthetic cannabinoids (Spice/K2).',
    forensicAnalysis:
      'Lab spectroscopy revealed high-potency synthetic cannabinoids dissolved in unregulated vitamin E acetate and industrial propylene glycol. Synthetic cannabinoids are chemically engineered to hijack brain cannabinoid receptors with up to 100x the affinity of natural compounds, triggering rapid heart failure, seizures, and acute psychosis.',
    legalConsequence: 'Up to 10 years imprisonment and $20,000 fine under Section 8 of the MDA.',
  },
  {
    id: 'ev_courier_parcel',
    name: 'Disguised Online Delivery Package',
    category: 'Packaging',
    icon: '📦',
    relatedOffence: 'Drug Trafficking & Illegal Importation',
    mdaStatute: 'Misuse of Drugs Act Section 5 & Section 7',
    shortExplanation: 'Controlled substances concealed inside innocent hollowed-out consumer goods ordered from overseas.',
    forensicAnalysis:
      'Disguised inside thermal insulation of a sports flask shipped via air express. Singapore Customs and CNB multi-energy X-ray algorithms flagged the abnormal density gradient within seconds of arrival at Changi Airfreight Centre. The package was tracked under controlled delivery to the recipient.',
    legalConsequence: 'Mandatory minimum 5 years imprisonment to capital punishment depending on chemical weight.',
  },
  {
    id: 'ev_burner_phone',
    name: 'Encrypted Syndicate Coordination Phone',
    category: 'Digital Log',
    icon: '📱',
    relatedOffence: 'Abetment of Drug Trafficking & Criminal Conspiracy',
    mdaStatute: 'Misuse of Drugs Act Section 12 & Penal Code',
    shortExplanation: 'Burner smartphone containing encrypted chat channels used to recruit student runners via social media.',
    forensicAnalysis:
      'Forensic extraction recovered auto-deleting chats showing syndicate recruitment tactics: targeting youths in debt with phrases like "guaranteed safe drop", "easy $200 per hour", and "police won\'t check students". Digital traces revealed location logs linking multiple dead-drop coordinates across public housing estates.',
    legalConsequence: 'Conspiring or abetting trafficking attracts the same penalties as primary perpetrators.',
  },
  {
    id: 'ev_forfeited_proceeds',
    name: 'Forfeited Drug Proceeds & Seizure Order',
    category: 'Proceeds',
    icon: '💵',
    relatedOffence: 'Corruption, Drug Trafficking and Other Serious Crimes Act (CDSA)',
    mdaStatute: 'CDSA Chapter 65A (Confiscation of Benefits)',
    shortExplanation: 'Cash, bank accounts, luxury watches, and electronic devices seized as proceeds of illicit activity.',
    forensicAnalysis:
      'Under the CDSA, any asset, bank balance, vehicle, or item bought with proceeds of drug-related activities is permanently confiscated by the State. Offenders and their families lose all financial gains, leaving the perpetrator with massive legal debt, ruined credit, and zero assets upon release.',
    legalConsequence: 'Complete forfeiture of assets plus separate criminal charges for money laundering.',
  },
];

// 4. CONSEQUENCE WALL PILLARS
export const CONSEQUENCE_CATEGORIES: ConsequenceCategory[] = [
  {
    id: 'conseq_legal',
    title: 'Legal & Penal System',
    icon: '⚖️',
    color: '#f87171',
    bulletPoints: [
      'Strict zero-tolerance framework under the Misuse of Drugs Act.',
      'Mandatory imprisonment sentences for trafficking and repeated consumption.',
      'Caning applicable for specified offences to deter syndicates.',
      'Asset confiscation under CDSA leaves offenders financially wiped out.',
    ],
  },
  {
    id: 'conseq_future',
    title: 'Lifelong Career & Travel Bans',
    icon: '🚫',
    color: '#fbbf24',
    bulletPoints: [
      'Permanent criminal record registered with Singapore Police Force.',
      'Automatic disqualification from civil service, teaching, healthcare, and legal professions.',
      'Immediate revocation of government scholarships and tertiary expulsions.',
      'Lifetime travel visa denials to major countries (e.g. USA, UK, Australia, Japan) due to mandatory criminal declaration.',
    ],
  },
  {
    id: 'conseq_health',
    title: 'Neurological & Physical Ruin',
    icon: '🧠',
    color: '#38bdf8',
    bulletPoints: [
      'Irreversible brain remodeling: destroys dopamine pathways, causing permanent severe depression and anhedonia.',
      'Synthetic cannabinoids cause sudden acute cardiovascular failure, lung collapse, and psychosis.',
      'Severe cognitive deterioration: loss of memory, concentration, and emotional control.',
      'Extreme physical withdrawal agony requiring clinical medical intervention.',
    ],
  },
  {
    id: 'conseq_family',
    title: 'Family & Social Devastation',
    icon: '💔',
    color: '#ec4899',
    bulletPoints: [
      'Parents and siblings suffer intense emotional trauma, public shame, and severe anxiety.',
      'Destruction of mutual trust: family members living in fear of unexpected police raids or syndicate debt collectors.',
      'Isolation from friends and peers who distance themselves to avoid legal implication.',
      'Children and younger siblings traumatized by seeing family members arrested and handcuffed.',
    ],
  },
  {
    id: 'conseq_support',
    title: 'Where To Seek Confidential Help',
    icon: '🤝',
    color: '#34d399',
    bulletPoints: [
      'National Addictions Management Service (NAMS) provides confidential medical and psychological counselling.',
      'Early voluntary reporting allows treatment and recovery without criminal stigma before arrest occurs.',
      'Central Narcotics Bureau (CNB) Anti-Drug Hotline operates 24/7 for reporting and safety enquiries.',
      'School counsellors, trusted educators, and social service agencies offer protected guidance for students.',
    ],
    helpline: {
      name: 'NAMS All-Addictions Helpline',
      number: '6732 6837 (24/7)',
      hours: 'Free & Confidential Clinical Advice',
    },
  },
];

// 5. "WHAT WOULD YOU DO?" INTERACTIVE DILEMMA
export const DILEMMA_SCENARIO: DilemmaScenario = {
  id: 'dilemma_track_parcel',
  title: 'SCENARIO: The "Just Hold This For Me" Request',
  situation:
    'You are hanging out at the neighbourhood sports area when an acquaintance whom you know casually approaches you looking nervous. He pulls a taped envelope from his sling bag and says: "Bro, my mom is checking my room today. Can you hold this in your backpack until tomorrow? I will buy you lunch and transfer you $50."',
  prompt: 'What would you do? Walk to the podium that reflects your decision:',
  options: [
    {
      podiumId: 'A',
      title: 'Agree & Take the Envelope',
      actionDescription: 'Take the envelope to be friendly and pocket the $50 reward.',
      isRecommended: false,
      consequenceExplanation:
        'CRITICAL DANGER: If that envelope contains controlled substances, you are now in legal possession under Section 8 of the MDA! In Singapore, the legal presumption of possession means you cannot claim "I didn\'t know what was inside". You now risk up to 10 years imprisonment for someone else\'s crime.',
      safetyTakeaway:
        'Never accept custody of items with unknown contents. Genuine friends do not ask you to take legal risks for them.',
    },
    {
      podiumId: 'B',
      title: 'Firmly Decline & Alert a Trusted Adult',
      actionDescription: 'Refuse firmly: "No, I don\'t hold unknown packages." Then inform a counsellor or parent.',
      isRecommended: true,
      consequenceExplanation:
        'BEST DECISION: By refusing firmly, you immediately protect yourself from criminal entanglement. Alerting a trusted school counsellor, parent, or calling the CNB helpline (1800-2255-520) allows authorities or social workers to intervene and potentially save that person before they destroy their life.',
      safetyTakeaway:
        'Setting firm boundaries is strength, not weakness. Stepping back and speaking to a trusted adult keeps your future safe and breaks the chain of harm.',
    },
    {
      podiumId: 'C',
      title: 'Make an Excuse & Look Away',
      actionDescription: 'Make up an excuse like "My bag has no space", walk away, and say nothing to anyone.',
      isRecommended: false,
      consequenceExplanation:
        'TEMPORARY ESCAPE: While making an excuse protects you from immediate physical possession, staying silent leaves your acquaintance vulnerable to exploitation by syndicates, and they will likely approach another younger student next.',
      safetyTakeaway:
        'Declining keeps you safe, but sharing your concerns with a school counsellor or youth worker can prevent a peer from making an irreversible life mistake.',
    },
  ],
};
