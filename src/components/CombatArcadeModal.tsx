import React, { useState, useEffect } from 'react';
import { Swords, X, Shield, Zap, AlertTriangle, Trophy, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface ArcadeQuestion {
  id: number;
  situation: string;
  context: string;
  opponent: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const ARCADE_SCENARIOS: ArcadeQuestion[] = [
  {
    id: 1,
    opponent: "Peer at Chalet Party",
    situation: '"Bro, it\'s just flavoured water vapor with a herbal kick. Everyone is trying it, don\'t be boring!"',
    context: "Void deck / chalet gathering, unmarked vape pod",
    options: [
      {
        text: "Firm refusal: 'No thanks, unmarked pods often contain dangerous synthetic cannabinoids (K2/Spice). I'm keeping my track season clean.'",
        isCorrect: true,
        explanation: "Unmarked vape pods frequently contain deadly synthetic cannabinoids (K2/Spice) causing acute heart arrhythmia, seizures, and severe psychological distress."
      },
      {
        text: "Take a tiny puff to fit in, since it's just fruit flavour.",
        isCorrect: false,
        explanation: "Even a single puff of synthetic cannabinoids can trigger instant tachycardia, panic attacks, and permanent neurological harm."
      }
    ]
  },
  {
    id: 2,
    opponent: "Recruiter 'Dex' on Telegram",
    situation: '"Earn $300 in 20 minutes! Just take this taped shoe box from Block 124 to the void deck riser. Easy money, no questions asked."',
    context: "Encrypted social media recruitment",
    options: [
      {
        text: "Take the job because you really need polytechnic tuition fees.",
        isCorrect: false,
        explanation: "In Singapore, knowingly or unknowingly delivering controlled substances is charged as drug trafficking under the Misuse of Drugs Act, carrying heavy mandatory prison sentences and caning."
      },
      {
        text: "Block, report account, and warn friends about recruitment scams.",
        isCorrect: true,
        explanation: "Traffickers deliberately exploit youths as expendable 'runners'. Refusing and reporting breaks the criminal recruitment pipeline."
      }
    ]
  },
  {
    id: 3,
    opponent: "Stressed Study Group Peer",
    situation: '"Exam is in 6 hours and I haven\'t revised. Take this smart pill from overseas, it lets you focus with zero sleep!"',
    context: "Library late night study session",
    options: [
      {
        text: "Reject firmly: 'Unregulated prescription stimulants trigger severe anxiety, cardiac crash, and addiction.'",
        isCorrect: true,
        explanation: "Misusing prescription stimulants without diagnosis leads to high dependency, severe depressive crashes, cardiovascular strain, and legal violation."
      },
      {
        text: "Split the pill with them to finish the syllabus.",
        isCorrect: false,
        explanation: "Non-prescribed stimulants do not improve cognitive learning and carry severe cardiac risks and legal prosecution."
      }
    ]
  },
  {
    id: 4,
    opponent: "Friend Hiding Symptoms",
    situation: 'Your friend Jay is pale, sweating, clutching his chest at the track, begging you: "Don\'t tell anyone, I\'ll get kicked off the team!"',
    context: "Track grandstand after suspected vape exposure",
    options: [
      {
        text: "Promise to keep it secret and tell him to drink water in the bathroom.",
        isCorrect: false,
        explanation: "Concealing acute physiological distress can result in sudden cardiac arrest or irreversible injury. Medical intervention is urgent."
      },
      {
        text: "Seek immediate medical & adult help: health and life come first before any fear of trouble.",
        isCorrect: true,
        explanation: "Under Singapore's support framework, seeking medical emergency attention for someone suffering acute distress saves lives. Life safety always supersedes silence."
      }
    ]
  },
  {
    id: 5,
    opponent: "Misleading Online Forum Post",
    situation: '"Cannabis and synthetic weed are totally legal in some Western countries, so Singapore is just overreacting!"',
    context: "Social media debate thread",
    options: [
      {
        text: "Counter with scientific fact: THC & synthetic cannabinoids impair developing brains, cause psychosis, and Singapore law applies strictly to citizens anywhere.",
        isCorrect: true,
        explanation: "Scientific research proves THC disrupts adolescent neurodevelopment, and Singapore's CNB enforces zero-tolerance extraterritorially for citizens and PRs abroad."
      },
      {
        text: "Agree that foreign laws mean it must be completely harmless.",
        isCorrect: false,
        explanation: "Global studies show high rates of cannabis use disorder, cannabinoid hyperemesis, and youth hospitalizations regardless of overseas commercial legalization."
      }
    ]
  }
];

interface CombatArcadeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CombatArcadeModal: React.FC<CombatArcadeModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [gameOver, setGameOver] = useState(false);
  const [lastResult, setLastResult] = useState<{ isCorrect: boolean; explanation: string } | null>(null);

  useEffect(() => {
    if (!isOpen || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, gameOver]);

  if (!isOpen) return null;

  const currentQuestion = ARCADE_SCENARIOS[currentIndex % ARCADE_SCENARIOS.length];

  const handleSelectOption = (isCorrect: boolean, explanation: string) => {
    if (isCorrect) {
      soundFx.playChoiceSelect();
      setScore((s) => s + 100 + streak * 25);
      setStreak((st) => st + 1);
      setTimeLeft((t) => Math.min(30, t + 4)); // Time bonus
    } else {
      soundFx.playTimerWarning();
      setStreak(0);
      setTimeLeft((t) => Math.max(0, t - 5)); // Time penalty
    }

    setLastResult({ isCorrect, explanation });

    setTimeout(() => {
      setLastResult(null);
      if (currentIndex + 1 >= ARCADE_SCENARIOS.length) {
        setGameOver(true);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    }, 1800);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(25);
    setGameOver(false);
    setLastResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0d1520] border-2 border-amber-500/40 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.25)] overflow-hidden flex flex-col">
        {/* Top Arcade Banner */}
        <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 px-6 py-4 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide font-display">
                  COMBAT ARCADE
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  REFLEX CHALLENGE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Split-second resistance decisions against coercion and drug myths
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* HUD Stats Bar */}
        <div className="bg-slate-950/80 px-6 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              SCORE: <strong className="text-amber-400 text-sm">{score}</strong>
            </span>
            <span className="text-slate-400">
              COMBO:{' '}
              <strong className={`text-sm ${streak > 1 ? 'text-teal-400 animate-pulse' : 'text-slate-300'}`}>
                {streak}x
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">TIME:</span>
            <div
              className={`px-2.5 py-0.5 rounded-full font-bold text-sm ${
                timeLeft <= 5
                  ? 'bg-rose-950 text-rose-300 border border-rose-500 animate-pulse'
                  : 'bg-teal-950 text-teal-300 border border-teal-500/40'
              }`}
            >
              {timeLeft}s
            </div>
          </div>
        </div>

        {/* Game Body */}
        <div className="p-6">
          {!gameOver ? (
            <div>
              {/* Opponent / Scenario Box */}
              <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 mb-5 shadow-inner">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Incoming Pressure: {currentQuestion.opponent}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Round {currentIndex + 1} of {ARCADE_SCENARIOS.length}
                  </span>
                </div>
                <p className="text-base font-semibold text-slate-100 italic leading-relaxed">
                  {currentQuestion.situation}
                </p>
                <div className="mt-2 text-[11px] text-slate-400">
                  Location context: {currentQuestion.context}
                </div>
              </div>

              {/* Feedback Overlay if answered */}
              {lastResult && (
                <div
                  className={`mb-4 p-3 rounded-xl border flex items-start gap-3 animate-fadeIn ${
                    lastResult.isCorrect
                      ? 'bg-teal-950/80 border-teal-500 text-teal-200'
                      : 'bg-rose-950/80 border-rose-500 text-rose-200'
                  }`}
                >
                  {lastResult.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <strong className="block text-xs font-bold uppercase tracking-wide">
                      {lastResult.isCorrect ? 'Reflex Mastered! +Time Bonus' : 'High Risk Choice! Time Lost'}
                    </strong>
                    <p className="text-xs mt-0.5 leading-relaxed">{lastResult.explanation}</p>
                  </div>
                </div>
              )}

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={lastResult !== null}
                    onClick={() => handleSelectOption(option.isCorrect, option.explanation)}
                    className="w-full text-left p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-amber-500/50 transition-all text-xs sm:text-sm text-slate-200 font-medium group flex items-start gap-3 disabled:opacity-50"
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 text-slate-400 font-mono font-bold flex items-center justify-center shrink-0 text-xs transition-colors">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Game Over / Victory Summary */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                <Trophy className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2 font-display">Challenge Complete!</h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                You demonstrated strong anti-drug refusal instincts and awareness against peer manipulation.
              </p>

              <div className="inline-grid grid-cols-2 gap-4 bg-slate-950/70 border border-slate-800 p-4 rounded-xl mb-6 text-left">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">FINAL SCORE</span>
                  <span className="text-2xl font-black text-amber-400">{score} PTS</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">MAX STREAK</span>
                  <span className="text-2xl font-black text-teal-400">{streak}x REFLEX</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Play Again
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
                >
                  Return to Stories
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
