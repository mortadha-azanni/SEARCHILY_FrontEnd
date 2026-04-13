import React, { useMemo } from 'react';
import { getMockDate, mockReportsData } from '../../services/mockAdminData';

export default function AdminReports() {
  // Map mock data and resolve dates immediately inside component to prevent SSR hydration mismatches
  const reports = useMemo(() => 
    mockReportsData.map(report => ({
      id: report.id,
      name: report.name,
      date: getMockDate(report.dateAgo),
      status: report.status
    })), 
  []);

  return (
    <div className="flex-1 w-full min-w-0 bg-transparent text-mistral-black dark:text-warm-ivory transition-colors">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[clamp(24px,6vw,32px)] font-normal tracking-tight text-mistral-black dark:text-warm-ivory break-words">Reports & Exports</h1>
          <p className="text-mistral-black/60 dark:text-warm-ivory/60 mt-2">Generate and download analytical system reports.</p>
        </div>
        <button className="bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black px-6 py-3 font-normal uppercase tracking-wider text-[14px] hover:bg-mistral-orange dark:hover:bg-mistral-orange transition-colors whitespace-nowrap">
          Generate New Report
        </button>
      </div>

      <div className="bg-white dark:bg-mistral-black border border-mistral-black/10 dark:border-warm-ivory/10 rounded-none shadow-[0_8px_30px_rgba(250,82,15,0.05)] dark:shadow-mistral overflow-hidden w-full min-w-0 transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-mistral-black/10 dark:border-warm-ivory/10 bg-cream dark:bg-[#111] transition-colors">
                <th className="p-4 text-xs font-normal tracking-widest uppercase text-mistral-black/60 dark:text-warm-ivory/60 whitespace-nowrap">Report ID</th>
                <th className="p-4 text-xs font-normal tracking-widest uppercase text-mistral-black/60 dark:text-warm-ivory/60 whitespace-nowrap">Name</th>
                <th className="p-4 text-xs font-normal tracking-widest uppercase text-mistral-black/60 dark:text-warm-ivory/60 whitespace-nowrap">Date</th>
                <th className="p-4 text-xs font-normal tracking-widest uppercase text-mistral-black/60 dark:text-warm-ivory/60 whitespace-nowrap">Status</th>
                <th className="p-4 text-xs font-normal tracking-widest uppercase text-mistral-black/60 dark:text-warm-ivory/60 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mistral-black/10 dark:divide-warm-ivory/10">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-mistral-black/5 dark:hover:bg-warm-ivory/5 transition-colors border-b border-mistral-black/5 dark:border-warm-ivory/5 last:border-0">
                  <td className="p-4 font-mono text-[14px] text-mistral-black/80 dark:text-warm-ivory/80 whitespace-nowrap">{report.id}</td>
                  <td className="p-4 font-normal text-mistral-black dark:text-warm-ivory whitespace-nowrap">{report.name}</td>
                  <td className="p-4 text-[14px] text-mistral-black/60 dark:text-warm-ivory/60 whitespace-nowrap">{report.date}</td>
                  <td className="p-4">
                    <span 
                      className={`inline-block px-2 py-1 text-xs font-normal uppercase tracking-wider ${
                        report.status === 'Generated' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <button 
                      className="text-xs font-normal uppercase tracking-widest text-mistral-black/50 hover:text-mistral-orange transition-colors"
                      disabled={report.status === 'Failed'}
                      style={{ opacity: report.status === 'Failed' ? 0.5 : 1, cursor: report.status === 'Failed' ? 'not-allowed' : 'pointer' }}
                    >
                      Download CSV
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Mockup */}
        <div className="px-6 py-4 border-t border-mistral-black/10 dark:border-warm-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
          <p className="text-[14px] text-mistral-black/60 dark:text-warm-ivory/60 font-normal uppercase tracking-wider text-center sm:text-left">Showing 1 to 4 of 12 entries</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-mistral-black/5 dark:bg-warm-ivory/5 text-mistral-black/50 dark:text-warm-ivory/50 text-xs font-normal uppercase tracking-wider rounded-none cursor-not-allowed transition-colors">Previous</button>
            <button className="px-4 py-2 bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black text-xs font-normal uppercase tracking-wider rounded-none hover:bg-mistral-orange dark:hover:bg-mistral-orange transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
