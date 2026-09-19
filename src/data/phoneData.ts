import { ChatThread } from '../types';

export const INITIAL_PHONE_THREADS: ChatThread[] = [
  {
    id: 'track_squad',
    contactName: 'Track Relay Squad 🏃‍♂️🥇',
    contactRole: 'Maya, Jay, Chloe, Coach Tan',
    avatarInitials: 'TRS',
    unreadCount: 1,
    messages: [
      {
        id: 'ts_1',
        sender: 'Coach Tan',
        isSelf: false,
        text: 'Good job on the 4x100m splits today. Rest up, drink plenty of water. Prelims finals this Friday.',
        timestamp: '17:45'
      },
      {
        id: 'ts_2',
        sender: 'Chloe',
        isSelf: false,
        text: 'Who is hanging out at the Bishan void deck after this? Darren got some new mango flavor pod, super chill.',
        timestamp: '17:58'
      },
      {
        id: 'ts_3',
        sender: 'Maya',
        isSelf: true,
        text: 'I am heading there to stretch, but keeping lungs 100% clean for race day!',
        timestamp: '18:02'
      }
    ]
  },
  {
    id: 'lina_sister',
    contactName: 'Lina (Sis)',
    contactRole: 'Family • Home in Bishan',
    avatarInitials: 'LN',
    unreadCount: 0,
    messages: [
      {
        id: 'ln_1',
        sender: 'Lina',
        isSelf: false,
        text: 'Hey Jay, I put the herbal chicken soup in the thermal pot on the stove. Eat before you study!',
        timestamp: '19:15'
      },
      {
        id: 'ln_2',
        sender: 'Lina',
        isSelf: false,
        text: 'Finishing my evening shift around 10pm. Don\'t stay up past midnight mugging for physics ok?',
        timestamp: '19:16'
      }
    ]
  },
  {
    id: 'mark_recruiter',
    contactName: 'Mark (Dex) ⚠️',
    contactRole: 'Older Acquaintance • Avoidance Advised',
    avatarInitials: 'MK',
    unreadCount: 2,
    messages: [
      {
        id: 'mk_1',
        sender: 'Mark',
        isSelf: false,
        text: 'Yo Eli, check the riser at Blk 214 level 8. $250 waiting for you. Just leave the 3 pods under the bench.',
        timestamp: '20:10'
      },
      {
        id: 'mk_2',
        sender: 'Mark',
        isSelf: false,
        text: 'Reply me fast. Don\'t leave me hanging.',
        timestamp: '20:25'
      }
    ]
  },
  {
    id: 'school_counsellor',
    contactName: 'Mrs. Koh (Wellness Counsellor)',
    contactRole: 'School Wellness Room • Confidential',
    avatarInitials: 'MK',
    unreadCount: 0,
    messages: [
      {
        id: 'sc_1',
        sender: 'Mrs. Koh',
        isSelf: false,
        text: 'Remember students: Exam stress is normal, but you do not need to carry the weight alone. My door is open every recess and after school.',
        timestamp: '14:00'
      }
    ]
  }
];

export const REFUSAL_TOOLKIT = [
  {
    title: 'The Delay & Exit',
    phrase: '"My sister just texted me—dinner is ready at home and I have to run."',
    strategy: 'Removes you immediately from the physical pressure zone without causing awkward friction.'
  },
  {
    title: 'The Clear Alternative',
    phrase: '"I\'m good on that. Who wants to grab an iced lemon tea at the coffeeshop instead?"',
    strategy: 'Offers a safe social alternative, breaking the tension and guiding peers toward harmless fun.'
  },
  {
    title: 'The Personal Boundary',
    phrase: '"I\'ve got track relay finals this Friday. I’ve worked months for this, not risking my lungs."',
    strategy: 'Grounds your refusal in your personal ambitions and values. True friends respect genuine goals.'
  },
  {
    title: 'The Critical Inquiry',
    phrase: '"Where’s that even from? No packaging, no seal. You don’t know what synthetic chemicals are in that."',
    strategy: 'Dispels the myth that unregulated vapes are safe fruit vapor. Makes peers pause and rethink.'
  }
];
