import React, { useMemo } from 'react';
import { mockMetrics, mockChartData } from '../../services/mockAdminData';

export default function AdminDashboard() {
  const metrics = useMemo(() => mockMetrics, []);

  const chartData = useMemo(() => mockChartData, []);

  return (
    <div className="p-6 md:p-8 flex-1 w-full bg-warm-ivory">
      <div className="mb-8">
        <h1 className="text-[32px] font-normal tracking-tight text-mistral-black break-words">Admin Dashboard</h1>
        <p className="text-mistral-black/60 mt-2">Overview of system metrics and current activity.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-white p-6 border border-mistral-black/10 rounded-none shadow-[0_8px_30px_rgba(250,82,15,0.05)]">
            <h3 className="text-[14px] font-normal uppercase tracking-wider text-mistral-black/50 mb-2">{metric.title}</h3>
            <div className="flex items-end gap-[12px]">
              <span className="text-[32px] font-normal text-mistral-black">{metric.value}</span>
              <span className={`text-[14px] font-normal mb-1 ${metric.isPositive ? 'text-green-600' : 'text-red-500'}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Area */}
      <div className="bg-white border border-mistral-black/10 rounded-none p-6 shadow-[0_8px_30px_rgba(250,82,15,0.05)] mb-10">
        <h2 id="chart-heading" className="text-[18px] font-normal tracking-wide text-mistral-black mb-6 uppercase">Search Volume (7 Days)</h2>
        <div className="h-64 flex items-end justify-between gap-4" role="graphics-document" aria-labelledby="chart-heading">
          {chartData.map((data, i) => (
            <div 
              key={i} 
              className="w-full flex flex-col items-center gap-2 group"
              role="graphics-symbol"
              aria-label={`${data.label}: ${data.value}% volume`}
            >
              <div className="w-full relative h-[200px] flex items-end">
                <div 
                  className="w-full bg-mistral-black/10 transition-colors group-hover:bg-mistral-orange" 
                  style={{ height: `${data.value}%` }} 
                  aria-hidden="true"
                />
              </div>
              <span className="text-xs font-normal text-mistral-black/60 uppercase" aria-hidden="true">{data.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Activity Log (Mock) */}
      <div className="bg-white border border-mistral-black/10 rounded-none p-6 shadow-[0_8px_30px_rgba(250,82,15,0.05)]">
        <h2 className="text-[18px] font-normal tracking-wide text-mistral-black mb-6 uppercase">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b border-mistral-black/10 last:border-0 last:pb-0">
              <div>
                <p className="text-[14px] font-normal text-mistral-black">ETL Sync Completed</p>
                <p className="text-xs text-mistral-black/50 mt-1">System automated routine sync processing 50K records.</p>
              </div>
              <span className="text-xs text-mistral-black/40 font-mono">10:45 AM</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
