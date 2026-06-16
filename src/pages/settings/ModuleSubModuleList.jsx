import { useState } from 'react'
import { moduleData } from '../../utils/mockData'

export default function ModuleSubModuleList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(50)
  const [searchTerm, setSearchTerm] = useState('')

  const currentData = moduleData

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const filteredData = currentData.filter((row) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      String(row.subModule).toLowerCase().includes(searchLower) ||
      String(row.key).toLowerCase().includes(searchLower) ||
      String(row.module).toLowerCase().includes(searchLower) ||
      String(row.moduleKey).toLowerCase().includes(searchLower)
    );
  });

  const TOTAL_ENTRIES = filteredData.length
  const indexOfLastEntry = currentPage * entriesPerPage
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry)
  const totalPages = Math.ceil(TOTAL_ENTRIES / entriesPerPage)

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden flex flex-col h-full">
        <div className="bg-[#144f36] rounded-t p-5 flex justify-between items-center shadow-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white dark:bg-[#13111c]/10 rounded-full blur-2xl group-hover:bg-white dark:bg-[#13111c]/20 transition-all duration-700 pointer-events-none"></div>
          <div className="flex items-center relative z-10">
            <div className="w-1.5 h-7 bg-white dark:bg-[#13111c]/90 rounded-full mr-4 shadow-[0_0_12px_rgba(255,255,255,0.9)] hidden sm:block"></div>
            <h2 className="text-white font-bold tracking-wide text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">Permission</h2>
          </div>
          <button className="bg-white text-[#144f36] px-4 py-2 rounded-full text-sm font-bold hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <span>+ Back</span>
          </button>
        </div>

        <div className="p-4 flex-1 flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-800 dark:text-slate-200">Show</span>
                  <select 
                    value={entriesPerPage}
                    onChange={handleEntriesChange}
                    className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e]"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span className="text-sm text-slate-800 dark:text-slate-200">Entries</span>
                </div>
                <div className="flex gap-0 border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded overflow-hidden flex-wrap">
                {[
                  { label: 'Copy', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> },
                  { label: 'Excel', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h2"/><path d="M8 17h2"/><path d="M14 13h2"/><path d="M14 17h2"/></svg> },
                  { label: 'PDF', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg> },
                  { label: 'Print', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg> }
                ].map(btn => (
                  <button 
                    key={btn.label} 
                    title={btn.label} 
                    onClick={() => {
                      if (btn.label === 'Print') {
                        window.print();
                      } else if (btn.label === 'Excel' || btn.label === 'Copy' || btn.label === 'PDF') {
                        const table = document.querySelector('table');
                        if (!table) return;
                        let csv = '';
                        const rows = table.querySelectorAll('tr');
                        rows.forEach(row => {
                          const cols = row.querySelectorAll('td, th');
                          const rowData = Array.from(cols).map(c => '"' + c.innerText.replace(/"/g, '""') + '"');
                          csv += rowData.join(',') + '\n';
                        });
                        if (btn.label === 'Copy') {
                          navigator.clipboard.writeText(csv);
                          alert('Table data copied to clipboard!');
                        } else {
                          const blob = new Blob([csv], { type: 'text/csv' });
                          const url = window.URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'export.csv';
                          a.click();
                        }
                      }
                    }}
                    className="px-3 py-1.5 bg-[#f6f6ff] dark:bg-[#1f1b2e] hover:bg-slate-50 dark:bg-[#1f1b2e]/50 border-r border-slate-300 dark:border-slate-600 last:border-r-0 flex items-center justify-center">
                    {btn.icon}
                  </button>
                ))}
              </div>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded-full px-4 py-1.5 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 w-64"
                />
              </div>
            </div>

            <div className="overflow-auto border border-slate-200 dark:border-[#1f1b2e] flex-1">
              <table className="w-full text-left text-sm text-slate-800 dark:text-slate-200">
                <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">
                  <tr>
                    <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">
                      <div className="flex items-center justify-between">
                        Sn.
                        <span className="text-[10px] flex flex-col leading-[0.5]"><span className="text-white/50">▲</span><span>▼</span></span>
                      </div>
                    </th>
                    <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Sub Module</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Key</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Module</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Module Key</th>
                    <th className="px-4 py-3 font-bold whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.length === 0 && searchTerm ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8">No matching permissions found</td>
                    </tr>
                  ) : currentEntries.map((row) => (
                    <tr key={row.id} className={`border-b border-slate-200 dark:border-gray-800/50 hover:bg-slate-50 dark:bg-[#1f1b2e]/50 ${row.sno === 2 ? 'bg-[#fdf2e9]' : 'bg-[#f6f6ff] dark:bg-[#111827] hover:bg-slate-50 dark:bg-[#1f1b2e]/50 dark:hover:bg-[#1f2937] transition-colors'}`}>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle">
                        <div className="flex items-center gap-2">
                          <button className="w-4 h-4 rounded-full bg-[#428bca] text-white flex items-center justify-center text-xs pb-0.5">+</button>
                          {row.sno}
                        </div>
                      </td>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle whitespace-nowrap">{row.subModule}</td>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle whitespace-nowrap">{row.key}</td>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle whitespace-nowrap">{row.module}</td>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle whitespace-nowrap">{row.moduleKey}</td>
                      <td className="px-4 py-4 align-middle whitespace-nowrap">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col md:flex-row justify-between items-center text-sm text-slate-800 dark:text-slate-200">
              <div className="mb-4 md:mb-0">
                Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, TOTAL_ENTRIES)} of {TOTAL_ENTRIES} entries
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(Math.min(2, totalPages))].map((_, index) => (
                  <button 
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === index + 1 ? 'bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-400'}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] rounded-lg border border-slate-200 dark:border-[#1f1b2e] p-4 sticky top-4">
              <h3 className="text-sm font-medium text-white mb-4">Add New</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Module<span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter Module"
                    className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Module slug<span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter Module"
                    className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Sub Module<span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter Title"
                    className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Sub Module slug<span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter Title"
                    className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Status</label>
                  <select className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
                    <option>Active</option>
                    <option>In-Active</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800 px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#152a4a] transition-colors shadow-sm">
                    Submit
                  </button>
                  <button className="bg-[#d35400] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#b04500] transition-colors shadow-sm">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
