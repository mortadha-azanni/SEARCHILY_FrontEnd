import React, { useState, useRef, useEffect } from 'react';
import { initialMockLogs } from '../../services/mockAdminData';

export default function AdminETLPanel() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [logs] = useState(initialMockLogs); // Track logs in state for realistic dependency array
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of logs when syncing changes or logs update
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isSyncing, logs]);

  // Mock a finite sync process
  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (isSyncing) {
      timeout = setTimeout(() => {
        setIsSyncing(false);
      }, 5000); // Stop syncing after 5 seconds
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isSyncing]);

  return (
    <div className="p-6 md:p-8 flex-1 w-full bg-warm-ivory dark:bg-[#111] transition-colors">
      <div className="mb-8">
        <h1 className="text-[32px] font-normal tracking-tight text-mistral-black dark:text-warm-ivory break-words">ETL Management</h1>
        <p className="text-mistral-black/60 dark:text-warm-ivory/60 mt-2">Manage data pipelines, synchronization, and catalog indexing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Status Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-mistral-black border border-mistral-black/10 dark:border-warm-ivory/10 rounded-none p-6 shadow-mistral dark:shadow-none transition-colors">
            <h2 className="text-[14px] font-normal uppercase tracking-widest text-mistral-black/50 dark:text-warm-ivory/50 mb-6">System Status</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-mistral-black/10 dark:border-warm-ivory/10 transition-colors">
                <span className="text-[14px] font-normal text-mistral-black dark:text-warm-ivory">Pipeline State</span>
                <span className="inline-flex items-center gap-2 text-[10px] font-normal uppercase tracking-wider text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded-none transition-colors">
                  <span className="w-1.5 h-1.5 rounded-none bg-green-500 animate-pulse"></span>
                  Healthy
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-mistral-black/10 dark:border-warm-ivory/10 transition-colors">
                <span className="text-[14px] font-normal text-mistral-black dark:text-warm-ivory">Last Sync</span>
                <span className="text-[14px] text-mistral-black/60 dark:text-warm-ivory/60 font-mono">10:45 AM (Today)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-mistral-black/10 dark:border-warm-ivory/10 transition-colors">
                <span className="text-[14px] font-normal text-mistral-black dark:text-warm-ivory">Total Records</span>
                <span className="text-[14px] text-mistral-black/60 dark:text-warm-ivory/60 font-mono text-sm">14.2M</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-[14px] font-normal text-mistral-black dark:text-warm-ivory">Index Latency</span>
                <span className="text-[14px] text-mistral-black/60 dark:text-warm-ivory/60 font-mono">42ms</span>
              </div>
            </div>

            <div className="mt-8">
              <button 
                onClick={() => setIsSyncing(!isSyncing)}
                className={`w-full py-4 font-normal uppercase tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isSyncing 
                    ? 'bg-mistral-orange text-white hover:bg-mistral-orange/90'
                    : 'bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black hover:bg-mistral-black/90'
                }`}
              >
                {isSyncing ? 'Cancel Sync' : 'Force Sync Now'}
              </button>
            </div>
          </div>
        </div>

        {/* Logs Panel */}
        <div className="lg:col-span-2">
          <div className="bg-mistral-black rounded-none shadow-mistral dark:shadow-none flex flex-col h-[500px] max-h-[60vh] overflow-hidden border border-white/5">
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-mistral-black/90">
              <h2 className="text-[14px] font-normal tracking-widest text-white/50 uppercase">Console Output</h2>
              <span className="text-xs text-white/30 font-mono">Live</span>
            </div>
            <div className="flex-1 overflow-y-auto p-6 font-mono text-[14px]">
              {logs.map((log, i) => (
                <div key={i} className="mb-3 flex items-start gap-4">
                  <span className="text-white/40 shrink-0">{log.time}</span>
                  <span className={`shrink-0 font-normal ${
                    log.level === 'INFO' ? 'text-blue-400' : 'text-mistral-orange'
                  }`}>
                    [{log.level}]
                  </span>
                  <span className="text-white/80">{log.message}</span>
                </div>
              ))}
              {isSyncing && (
                <div className="mb-3 flex items-start gap-4 animate-pulse">
                  <span className="text-white/40 shrink-0">Now</span>
                  <span className="shrink-0 font-normal text-mistral-orange">
                    [WORK]
                  </span>
                  <span className="text-white/80">Processing chunk 1 of 4...</span>
                </div>
              )}
              {/* Auto-scroll target anchor */}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
