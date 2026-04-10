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
    <div className="p-6 md:p-8 flex-1 w-full bg-warm-ivory">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-normal tracking-tight text-mistral-black break-words">Reports & Exports</h1>
          <p className="text-mistral-black/60 mt-2">Generate and download analytical system reports.</p>
        </div>
        <button className="bg-mistral-black text-white px-6 py-3 font-normal uppercase tracking-wider text-sm hover:bg-mistral-orange transition-colors">
          Generate New Report
        </button>
      </div>

      <div className="bg-white border border-mistral-black/10 rounded-none shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-mistral-black/10 bg-cream">
                <th className="p-4 text-xs font-normal tracking-widest uppercase text-mistral-black/60">Report ID</th>
                <th className="p-4 text-xs font-normal tracking-widest uppercase text-mistral-black/60">Name</th>
                <th className="p-4 text-xs font-normal tracking-widest uppercase text-mistral-black/60">Date</th>
                <th className="p-4 text-xs font-normal tracking-widest uppercase text-mistral-black/60">Status</th>
                <th className="p-4 text-xs font-normal tracking-widest uppercase text-mistral-black/60 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mistral-black/10">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-mistral-black/5 transition-colors">
                  <td className="p-4 font-mono text-sm text-mistral-black/80">{report.id}</td>
                  <td className="p-4 font-normal text-mistral-black">{report.name}</td>
                  <td className="p-4 text-sm text-mistral-black/60">{report.date}</td>
                  <td className="p-4">
                    <span 
                      className={`inline-block px-2 py-1 text-xs font-normal uppercase tracking-wider ${
                        report.status === 'Generated' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
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
        <div className="px-6 py-4 border-t border-mistral-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-mistral-black/60 font-normal uppercase tracking-wider">Showing 1 to 4 of 12 entries</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-mistral-black/5 text-mistral-black/50 text-xs font-normal uppercase tracking-wider rounded-none cursor-not-allowed">Previous</button>
            <button className="px-4 py-2 bg-mistral-black text-white text-xs font-normal uppercase tracking-wider rounded-none hover:bg-mistral-orange transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
