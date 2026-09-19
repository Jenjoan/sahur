import React, { useState } from 'react';
import { ChatThread, ChatMessage } from '../types';
import { REFUSAL_TOOLKIT } from '../data/phoneData';
import { SUPPORT_RESOURCES } from '../data/lifeAlbumData';
import {
  X,
  Send,
  MessageSquare,
  PhoneCall,
  Shield,
  Clock,
  Sparkles,
  PhoneForwarded,
  CheckCheck,
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface PhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  threads: ChatThread[];
  initialThreadId?: string;
  onSendMessage: (threadId: string, text: string) => void;
}

export const PhoneModal: React.FC<PhoneModalProps> = ({
  isOpen,
  onClose,
  threads,
  initialThreadId,
  onSendMessage,
}) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'refusal' | 'hotlines'>('chats');
  const [selectedThreadId, setSelectedThreadId] = useState<string>(
    initialThreadId || threads[0]?.id || 'track_squad'
  );
  const [inputText, setInputText] = useState<string>('');
  const [activeCallName, setActiveCallName] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentThread = threads.find((t) => t.id === selectedThreadId) || threads[0];

  const handleSend = (textToSend?: string) => {
    const message = textToSend || inputText;
    if (!message.trim()) return;
    soundFx.playClick();
    onSendMessage(currentThread.id, message);
    if (!textToSend) setInputText('');
  };

  const handleDialHotline = (name: string) => {
    soundFx.playNotification();
    setActiveCallName(name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      {/* Phone Hardware Shell */}
      <div className="relative w-full max-w-sm sm:max-w-md h-[620px] bg-slate-950 rounded-[40px] border-[6px] border-slate-700 shadow-2xl overflow-hidden flex flex-col">
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-full z-30 flex items-center justify-center">
          <div className="w-12 h-1.5 bg-slate-800 rounded-full" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800 ml-2" />
        </div>

        {/* Phone Top Status Bar */}
        <div className="w-full pt-8 px-6 pb-2 bg-slate-900 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="font-bold text-white">1MC Mobile</span>
          <div className="flex items-center gap-3">
            <span>5G</span>
            <span>SG Tel</span>
            <span>98%</span>
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="w-full bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-around text-xs">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('chats');
            }}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-medium transition-colors ${
              activeTab === 'chats'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Messages</span>
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('refusal');
            }}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-medium transition-colors ${
              activeTab === 'refusal'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Refusal Toolkit</span>
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('hotlines');
            }}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-medium transition-colors ${
              activeTab === 'hotlines'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>SG Help</span>
          </button>
        </div>

        {/* Tab 1: Simulated Messaging */}
        {activeTab === 'chats' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
            {/* Thread Selector Chips */}
            <div className="flex items-center gap-2 p-2.5 overflow-x-auto border-b border-slate-800/80 bg-slate-900/50">
              {threads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedThreadId(thread.id);
                  }}
                  className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${
                    thread.id === selectedThreadId
                      ? 'bg-teal-500 text-slate-950 border-teal-400 font-bold'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <span>{thread.avatarInitials}</span>
                  <span className="truncate max-w-[100px]">{thread.contactName.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Active Thread Header */}
            <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white truncate max-w-[200px]">
                  {currentThread.contactName}
                </h4>
                <p className="text-[10px] text-slate-400">{currentThread.contactRole}</p>
              </div>
              <span className="text-[10px] text-teal-400 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                Online
              </span>
            </div>

            {/* Message Bubble Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {currentThread.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[9px] text-slate-500 mb-0.5 px-1 font-mono">
                    {msg.sender} • {msg.timestamp}
                  </span>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-md ${
                      msg.isSelf
                        ? 'bg-teal-600 text-white rounded-tr-xs'
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.isSelf && (
                    <span className="text-[9px] text-teal-400 mt-0.5 flex items-center gap-0.5">
                      <CheckCheck className="w-3 h-3 inline" /> Read
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Message Input & Refusal Fast-Reply Bar */}
            <div className="p-3 bg-slate-900 border-t border-slate-800">
              {/* Quick Refusal Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-none">
                <button
                  onClick={() => handleSend("I'm heading home for dinner with family.")}
                  className="shrink-0 text-[10px] px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors"
                >
                  🏃 "Heading home for dinner"
                </button>
                <button
                  onClick={() => handleSend("Relay finals in 3 days, lungs need to stay 100% clean.")}
                  className="shrink-0 text-[10px] px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors"
                >
                  🥇 "Relay finals in 3 days"
                </button>
                <button
                  onClick={() => handleSend("Let's just grab iced teh-o instead.")}
                  className="shrink-0 text-[10px] px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors"
                >
                  🧋 "Grab iced teh-o instead"
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a refusal or reply..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                />
                <button
                  onClick={() => handleSend()}
                  className="p-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Youth Refusal Toolkit */}
        {activeTab === 'refusal' && (
          <div className="flex-1 overflow-y-auto p-4 bg-slate-950 space-y-3">
            <div className="mb-2">
              <h4 className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Refusal & Boundary Skills</span>
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Real-life refusal tactics that youths can use in peer gatherings without losing friendships.
              </p>
            </div>

            {REFUSAL_TOOLKIT.map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{item.title}</span>
                  <button
                    onClick={() => {
                      setActiveTab('chats');
                      handleSend(item.phrase);
                    }}
                    className="text-[10px] text-teal-400 hover:underline flex items-center gap-1"
                  >
                    <span>Use as Reply</span>
                  </button>
                </div>
                <p className="text-xs italic text-teal-200/90 font-serif bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 mb-2">
                  {item.phrase}
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  💡 <span className="font-semibold text-slate-300">Why it works:</span> {item.strategy}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Official Singapore Helplines */}
        {activeTab === 'hotlines' && (
          <div className="flex-1 overflow-y-auto p-4 bg-slate-950 space-y-3">
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
                <span>Verified Singapore Hotlines</span>
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Official, confidential contacts for addiction advice, crisis intervention, and anonymous reporting.
              </p>
            </div>

            {/* Active Simulated Call Banner */}
            {activeCallName && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-100 flex items-center justify-between animate-pulse">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                    <PhoneForwarded className="w-3.5 h-3.5" />
                    <span>Connecting to {activeCallName}...</span>
                  </div>
                  <p className="text-[10px] text-emerald-400/80 mt-0.5">
                    Confidential & toll-free guidance available.
                  </p>
                </div>
                <button
                  onClick={() => setActiveCallName(null)}
                  className="text-xs px-2 py-1 rounded bg-rose-600/80 text-white hover:bg-rose-600"
                >
                  End
                </button>
              </div>
            )}

            {SUPPORT_RESOURCES.map((res, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-xs font-bold text-white">{res.name}</h5>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-teal-300 border border-slate-700">
                      {res.contact}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-1">{res.organization}</p>
                  <p className="text-[11px] text-slate-300 leading-snug mb-2">{res.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {res.hours}
                  </span>
                  <button
                    onClick={() => handleDialHotline(res.name)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-colors"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>Simulate Call</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Phone Bottom Home Bar */}
        <div className="w-full py-2 bg-slate-900 flex justify-center items-center">
          <div className="w-32 h-1 bg-slate-600 rounded-full" />
        </div>
      </div>
    </div>
  );
};
