import { useState } from 'react'
import { studentNewsData } from '../../utils/mockData'

export default function StudentNewsList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(50)
  const TOTAL_ENTRIES = 10

  const currentData = studentNewsData

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const indexOfLastEntry = currentPage * entriesPerPage
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
  const currentEntries = currentData.slice(indexOfFirstEntry, indexOfLastEntry)
  const totalPages = Math.ceil(TOTAL_ENTRIES / entriesPerPage)

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden flex flex-col h-full">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 flex justify-between items-center bg-[#f6f6ff] dark:bg-[#1f1b2e]">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Student News</h2>
          <button className="bg-[#428bca] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#3071a9] transition-colors flex items-center gap-2">
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
                  <button key={btn.label} title={btn.label} className="px-3 py-1.5 bg-[#f6f6ff] dark:bg-[#1f1b2e] hover:bg-slate-50 dark:bg-[#1f1b2e]/50 border-r border-slate-300 dark:border-slate-600 last:border-r-0 flex items-center justify-center">
                    {btn.icon}
                  </button>
                ))}
              </div>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="Search..."
                  className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded-full px-4 py-1.5 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 w-64"
                />
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 dark:border-[#1f1b2e] flex-1">
              <table className="w-full text-left text-sm text-slate-800 dark:text-slate-200">
                <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">
                  <tr>
                    <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">
                      <div className="flex items-center justify-between">
                        Sn.
                        <span className="text-[10px] flex flex-col leading-[0.5]"><span className="text-white/50">▲</span><span>▼</span></span>
                      </div>
                    </th>
                    <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Image</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Description</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Url</th>
                    <th className="px-4 py-3 font-bold whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.map((row) => (
                    <tr key={row.id} className={`border-b border-slate-200 dark:border-gray-800/50 hover:bg-slate-50 dark:bg-[#1f1b2e]/50 ${row.sno === 2 ? 'bg-[#fdf2e9]' : 'bg-[#f6f6ff] dark:bg-[#111827] hover:bg-slate-50 dark:bg-[#1f1b2e]/50 dark:hover:bg-[#1f2937] transition-colors'}`}>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle">
                        <div className="flex items-center gap-2">
                          <button className="w-4 h-4 rounded-full bg-[#428bca] text-white flex items-center justify-center text-xs pb-0.5">+</button>
                          {row.sno}
                        </div>
                      </td>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle text-center">
                        <button className="bg-[#428bca] text-white px-5 py-1.5 rounded-full text-sm hover:bg-[#3071a9] transition-colors">
                          View
                        </button>
                      </td>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle text-center">
                        <button className="bg-[#428bca] text-white px-5 py-1.5 rounded-full text-sm hover:bg-[#3071a9] transition-colors">
                          View
                        </button>
                      </td>
                      <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle text-center">
                        <button className="bg-[#428bca] text-white px-5 py-1.5 rounded-full text-sm hover:bg-[#3071a9] transition-colors">
                          View
                        </button>
                      </td>
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
                {[...Array(Math.min(5, totalPages))].map((_, index) => (
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
                    Image <span className="text-red-500">*</span>
                  </label>
                  <div className="flex border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded overflow-hidden">
                    <button className="bg-slate-100 dark:bg-slate-700 border-r border-slate-300 dark:border-slate-600 px-3 py-1.5 text-sm text-slate-800 dark:text-slate-200 whitespace-nowrap hover:bg-slate-200">
                      Choose File
                    </button>
                    <span className="px-3 py-1.5 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">No file chosen</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Url<span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    placeholder="Enter Url"
                    rows={3}
                    className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 resize-none placeholder:text-slate-800 dark:text-slate-200"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Description<span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    placeholder="Enter Description"
                    rows={3}
                    className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 resize-none placeholder:text-slate-800 dark:text-slate-200"
                  ></textarea>
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
