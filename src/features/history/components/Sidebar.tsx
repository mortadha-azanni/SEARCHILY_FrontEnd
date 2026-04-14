import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthProvider';
import { useHistory } from '../hooks/useHistory';

interface SidebarProps {
  loadSession?: (id: string) => void;
  removeSession?: (id: string) => void;
  currentSessionId?: string;
  className?: string;
}

export default function Sidebar({ loadSession, removeSession, currentSessionId, className = "" }: SidebarProps) {
  const { user } = useAuth();
  const { getGroupedHistory } = useHistory();
  const groupedHistory = getGroupedHistory();

  const handleNewChat = () => {
    if (loadSession) {
      loadSession(crypto.randomUUID());
    }
  };

  if (!user) return null;

  return (
    <aside className={`flex flex-col bg-mistral-black text-white h-full border-r border-white/5 w-64 md:w-72 shrink-0 transition-colors duration-200 ${className}`}>
      {/* Sidebar Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-white/5 shrink-0">
        <button 
          onClick={handleNewChat}
          className="flex items-center gap-2 text-[12px] font-normal uppercase tracking-widest hover:text-mistral-orange transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Chat
        </button>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {groupedHistory.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[12px] text-white/30 uppercase tracking-widest font-normal">No history yet</p>
          </div>
        ) : (
          <div className="py-4 space-y-8">
            {groupedHistory.map((group) => (
              <div key={group.label} className="px-4">
                <h3 className="text-[10px] font-normal uppercase tracking-[0.2em] text-white/30 mb-4 px-2">{group.label}</h3>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const firstUserMessage = item.state.messages.find(m => m.role === 'user')?.content || 'Untitled Chat';
                    const isActive = item.id === currentSessionId;
                    
                    return (
                      <div key={item.id} className="group relative">
                        <button
                          onClick={() => loadSession?.(item.id)}
                          className={`w-full text-left px-3 py-2 text-[13px] font-normal truncate transition-colors border border-transparent ${
                            isActive 
                              ? 'bg-white/10 text-white border-white/10' 
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {firstUserMessage}
                        </button>
                        {removeSession && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSession(item.id);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 text-white/30 hover:text-red-500 transition-all"
                            aria-label="Delete session"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/5 shrink-0">
        <Link 
          to="/app/profile"
          className="flex items-center gap-3 w-full p-2 hover:bg-white/5 transition-colors group"
        >
          <div className="w-8 h-8 bg-mistral-orange text-white flex items-center justify-center text-[14px] font-normal uppercase shadow-mistral">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 text-left">
            <p className="text-[12px] font-normal uppercase tracking-widest text-white/80 group-hover:text-white">User Settings</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
