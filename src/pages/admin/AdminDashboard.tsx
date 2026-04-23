import React, { useMemo } from 'react';
import { mockMetrics, mockChartData } from '../../services/mockAdminData';

export default function AdminDashboard() {
  const metrics = useMemo(() => mockMetrics, []);
  const chartData = useMemo(() => mockChartData, []);

  return (
    <div className="p-6 md:p-8 flex-1 w-full bg-warm-ivory dark:bg-[#111] transition-colors">
      <div className="mb-8">
        <h1 className="text-[32px] font-normal tracking-tight text-mistral-black dark:text-warm-ivory break-words">Admin Dashboard</h1>
        <p className="text-mistral-black/60 dark:text-warm-ivory/60 mt-2">Overview of system metrics and current activity.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-white dark:bg-mistral-black p-6 border border-mistral-black/10 dark:border-warm-ivory/10 rounded-none shadow-mistral dark:shadow-none transition-colors">
            <h3 className="text-[12px] font-normal uppercase tracking-wider text-mistral-black/50 dark:text-warm-ivory/50 mb-2">{metric.title}</h3>
            <div className="flex items-end gap-[12px]">
              <span className="text-[32px] font-normal text-mistral-black dark:text-warm-ivory">{metric.value}</span>
              <span className={`text-[14px] font-normal mb-1 ${metric.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Area */}
      <div className="bg-white dark:bg-mistral-black border border-mistral-black/10 dark:border-warm-ivory/10 rounded-none p-8 shadow-mistral dark:shadow-none mb-10 transition-colors">
        <h2 id="chart-heading" className="text-[14px] font-normal tracking-widest text-mistral-black/50 dark:text-warm-ivory/50 mb-8 uppercase">Search Volume (7 Days)</h2>
        <div className="h-64 flex items-end justify-between gap-4" role="graphics-document" aria-labelledby="chart-heading">
          {chartData.map((data, i) => (
            <div 
              key={i} 
              className="w-full flex flex-col items-center gap-4 group"
              role="graphics-symbol"
              aria-label={`${data.label}: ${data.value}% volume`}
            >
              <div className="w-full relative h-[180px] flex items-end">
                <div 
                  className="w-full bg-mistral-black/20 dark:bg-warm-ivory/20 transition-all group-hover:bg-mistral-orange dark:group-hover:bg-mistral-orange" 
                  style={{ height: `${data.value}%` }} 
                  aria-hidden="true"
                />
              </div>
              <span className="text-[10px] font-normal text-mistral-black/40 dark:text-warm-ivory/40 uppercase tracking-widest" aria-hidden="true">{data.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Activity Log */}
      <div className="bg-white dark:bg-mistral-black border border-mistral-black/10 dark:border-warm-ivory/10 rounded-none p-8 shadow-mistral dark:shadow-none transition-colors">
        <h2 className="text-[14px] font-normal tracking-widest text-mistral-black/50 dark:text-warm-ivory/50 mb-8 uppercase">Recent Activity</h2>
        <div className="space-y-0">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex justify-between items-center py-5 border-b border-mistral-black/10 dark:border-warm-ivory/10 last:border-0 last:pb-0">
              <div>
                <p className="text-[15px] font-normal text-mistral-black dark:text-warm-ivory">ETL Sync Completed</p>
                <p className="text-sm text-mistral-black/50 dark:text-warm-ivory/50 mt-1">System automated routine sync processing 50K records.</p>
              </div>
              <span className="text-xs text-mistral-black/30 dark:text-warm-ivory/30 font-mono uppercase tracking-tighter">10:45 AM</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
