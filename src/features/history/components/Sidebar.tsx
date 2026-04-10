import React, { useMemo } from 'react';
import { useHistory } from '../hooks/useHistory';

interface SidebarProps {
  loadSession?: (id: string) => void;
  currentSessionId?: string;
}

export default function Sidebar({ loadSession, currentSessionId }: SidebarProps) {
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

  return (
    <aside className="w-64 bg-cream border-r border-mistral-black/10 flex flex-col h-full overflow-hidden shrink-0">
      <div className="p-4 border-b border-mistral-black/10">
        <button 
          onClick={handleNewChat}
          className="w-full bg-mistral-orange text-warm-ivory py-2 px-4 rounded-none font-normal hover:bg-mistral-orange/90 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
        {groups.length === 0 ? (
          <div className="text-[14px] text-mistral-black/50 text-center py-4 px-2 font-normal">
            No history available.
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.label} className="space-y-2">
              <h3 className="text-[12px] font-normal text-mistral-black/40 uppercase tracking-wider px-2">
                {group.label}
              </h3>
              <ul className="space-y-1">
                {group.items.map(({ id, state }) => {
                  const firstUserMessage = state.messages.find(m => m.role === 'user')?.content || 'Empty Chat';
                  const title = firstUserMessage.length > 30 ? firstUserMessage.substring(0, 30) + '...' : firstUserMessage;
                  const isActive = currentSessionId === id;

                  return (
                    <li key={id}>
                      <button
                        onClick={() => handleLoadSession(id)}
                        className={`w-full text-left px-2 py-2 rounded-none transition-colors text-[14px] font-normal truncate ${
                          isActive 
                            ? 'bg-mistral-black/10 text-mistral-black' 
                            : 'text-mistral-black/70 hover:bg-mistral-black/5'
                        }`}
                        title={firstUserMessage}
                      >
                        {title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-mistral-black/10 mt-auto">
        <div className="flex items-center gap-3 w-full p-2 hover:bg-mistral-black/5 rounded-none cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-none bg-mistral-orange text-warm-ivory flex items-center justify-center font-normal text-[14px]">
                U
            </div>
            <div className="flex-1 overflow-hidden">
                <p className="text-[14px] font-normal text-mistral-black truncate">User Settings</p>
            </div>
        </div>
      </div>
    </aside>
  );
}
