import { useState, useCallback, useEffect } from 'react';
import { ChatState } from '../../../types';

const MAX_HISTORY_SESSIONS = 50;

export interface HistoryGroup {
  label: string;
  items: { id: string; state: ChatState }[];
}

export function useHistory() {
  const [history, setHistory] = useState<Record<string, ChatState>>({});

  useEffect(() => {
    const stored = localStorage.getItem('searchily_history');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Record<string, ChatState>;
        const migrated = Object.entries(parsed).reduce((acc, [id, state], index) => {
          const updatedAt = state.updatedAt ?? Date.now() - (index * 100000);
          acc[id] = { ...state, updatedAt };
          return acc;
        }, {} as Record<string, ChatState>);

        setHistory(migrated);
      } catch (err) {
        console.error('[useHistory] Failed to parse history:', err);
        localStorage.removeItem('searchily_history');
      }
    }
  }, []);

  const saveToHistory = useCallback((sessionId: string, state: ChatState) => {
    // Only save non-empty chats to avoid populating sidebar with random navigation loads
    if (!state.messages || state.messages.length === 0) return;

    setHistory(prev => {
      const stateWithDate = {
        ...state,
        updatedAt: Date.now()
      };
      
      const next = { ...prev, [sessionId]: stateWithDate };
      
      const keys = Object.entries(next)
        .sort((a, b) => (a[1].updatedAt || 0) - (b[1].updatedAt || 0))
        .map(([k]) => k);
        
      if (keys.length > MAX_HISTORY_SESSIONS) {
        const keysToRemove = keys.slice(0, keys.length - MAX_HISTORY_SESSIONS);
        keysToRemove.forEach(k => delete next[k]);
      }

      localStorage.setItem('searchily_history', JSON.stringify(next));
      return next;
    });
  }, []);

  const loadFromHistory = useCallback((sessionId: string): ChatState | null => {
    return history[sessionId] || null;
  }, [history]);

  const getGroupedHistory = useCallback((): HistoryGroup[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Sort array descending to get correct recency
    const sorted = Object.entries(history)
      .filter(([, state]) => state.messages && state.messages.length > 0)
      .sort((a, b) => (b[1].updatedAt || 0) - (a[1].updatedAt || 0));

    const grouped: Record<string, { id: string; state: ChatState }[]> = {
      Today: [],
      Yesterday: [],
      Older: []
    };

    sorted.forEach(([id, state]) => {
      const date = new Date(state.updatedAt || 0);
      if (date >= today) {
        grouped.Today.push({ id, state });
      } else if (date >= yesterday) {
        grouped.Yesterday.push({ id, state });
      } else {
        grouped.Older.push({ id, state });
      }
    });

    return [
      { label: 'Today', items: grouped.Today },
      { label: 'Yesterday', items: grouped.Yesterday },
      { label: 'Older', items: grouped.Older }
    ].filter(g => g.items.length > 0);
  }, [history]);

  const deleteHistorySession = useCallback((sessionId: string) => {
    setHistory(prev => {
      const next = { ...prev };
      delete next[sessionId];
      localStorage.setItem('searchily_history', JSON.stringify(next));
      return next;
    });
  }, []);

  const getLatestSessionId = useCallback((): string | null => {
    const sessions = Object.entries(history)
      .filter(([, state]) => state.messages && state.messages.length > 0)
      .sort((a, b) => (b[1].updatedAt || 0) - (a[1].updatedAt || 0));
    
    return sessions.length > 0 ? sessions[0][0] : null;
  }, [history]);

  return { history, saveToHistory, loadFromHistory, getGroupedHistory, getLatestSessionId, deleteHistorySession };
}
