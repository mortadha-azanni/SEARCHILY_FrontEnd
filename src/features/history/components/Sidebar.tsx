import React, { useMemo } from 'react';
import { useHistory } from '../hooks/useHistory';
import { Link } from 'react-router-dom';

interface SidebarProps {
  loadSession?: (id: string) => void;
  currentSessionId?: string;
  removeSession?: (id: string) => void;
}

export default function Sidebar({ loadSession, currentSessionId, removeSession, className }: SidebarProps & { className?: string }) {
  const { getGroupedHistory } = useHistory();
  const groups = useMemo(() => getGroupedHistory(), [getGroupedHistory]);

  const handleNewChat = () => {
    if (loadSession) {
      loadSession(crypto.randomUUID());
    }
  };

  const handleLoadSession = (id: string) => {
    if (loadSession) {
      loadSession(id);
    }
  };

  const handleDeleteSession = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (removeSession) {
      removeSession(id);
    }
  };

  return (
    <aside className={`w-80 md:w-64 bg-cream dark:bg-mistral-black border-r border-mistral-black/10 dark:border-warm-ivory/10 flex-col h-full overflow-hidden shrink-0 ${className || 'hidden md:flex'}`}>
      <div className="p-4 border-b border-mistral-black/10 dark:border-warm-ivory/10">
        <button 
          onClick={handleNewChat}
          className="w-full bg-mistral-black dark:bg-warm-ivory text-warm-ivory dark:text-mistral-black py-2 px-4 rounded-none font-normal uppercase tracking-wide hover:bg-mistral-orange dark:hover:bg-mistral-orange flex items-center justify-center transition-colors"
        >
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-mistral-black/10 dark:scrollbar-thumb-warm-ivory/10">
        {groups.length === 0 ? (
          <div className="text-[14px] text-mistral-black/50 dark:text-warm-ivory/50 text-center py-4 px-2 font-normal">
            No history available.
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.label} className="space-y-2">
              <h3 className="text-[12px] font-normal text-mistral-black/40 dark:text-warm-ivory/40 uppercase tracking-wider px-2">
                {group.label}
              </h3>
              <ul className="space-y-1">
                {group.items.map(({ id, state }) => {
                  const firstUserMessage = state.messages.find(m => m.role === 'user')?.content || 'Empty Chat';
                  const title = firstUserMessage.length > 30 ? firstUserMessage.substring(0, 30) + '...' : firstUserMessage;
                  const isActive = currentSessionId === id;

                  return (
                    <li key={id} className="relative group/item flex items-center">
                      <button
                        onClick={() => handleLoadSession(id)}
                        className={`flex-1 text-left px-2 py-2 pr-8 rounded-none text-[14px] font-normal truncate ${
                          isActive 
                            ? 'bg-mistral-black/10 dark:bg-warm-ivory/10 text-mistral-black dark:text-warm-ivory border-l-2 border-mistral-orange' 
                            : 'text-mistral-black/70 dark:text-warm-ivory/70 hover:bg-mistral-black/5 dark:hover:bg-warm-ivory/5 border-l-2 border-transparent hover:border-mistral-black/20 dark:hover:border-warm-ivory/20'
                        }`}
                        title={firstUserMessage}
                      >
                        {title}
                      </button>
                      <button
                        onClick={(e) => handleDeleteSession(e, id)}
                        className="absolute right-2 text-mistral-black/40 dark:text-warm-ivory/40 hover:text-mistral-orange dark:hover:text-mistral-orange opacity-100 md:opacity-0 group-hover/item:opacity-100 p-1 focus:opacity-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-mistral-orange bg-transparent"
                        title="Delete Session"
                        aria-label="Delete Session"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-mistral-black/10 dark:border-warm-ivory/10 mt-auto">
        <Link to="/app/profile" className="flex items-center gap-[12px] w-full p-2 hover:bg-mistral-black/5 dark:hover:bg-warm-ivory/5 rounded-none cursor-pointer block">
            <div className="w-8 h-8 rounded-none bg-mistral-orange text-warm-ivory flex items-center justify-center font-normal text-[14px]">
                U
            </div>
            <div className="flex-1 overflow-hidden">
                <p className="text-[14px] font-normal text-mistral-black dark:text-warm-ivory truncate">User Settings</p>
            </div>
        </Link>
      </div>
    </aside>
  );
}
