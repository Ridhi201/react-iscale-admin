import { useState } from 'react'
import { Edit2, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { jobUpdatesData } from '../../utils/mockData'

export default function JobUpdatesList() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(50)
  const TOTAL_ENTRIES = 143

  const currentData = jobUpdatesData // Using mock data as it represents what's visible on screen

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden flex flex-col h-full">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 flex justify-between items-center bg-[#f6f6ff] dark:bg-[#1f1b2e]">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Job Update List</h2>
          <button 
            onClick={() => navigate('/job-updates/add')}
            className="bg-[#428bca] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#3071a9] transition-colors flex items-center gap-2"
          >
            <span>+ Add New</span>
          </button>
        </div>

        <div className="p-4 flex-1 flex flex-col">
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
                      S.No.
                      <span className="text-[10px] flex flex-col leading-[0.5]"><span className="text-white/50">▲</span><span>▼</span></span>
                    </div>
                  </th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">
                    <div className="flex items-center justify-between">
                      Title
                      <span className="text-[10px] flex flex-col leading-[0.5]"><span className="text-white/50">▲</span><span>▼</span></span>
                    </div>
                  </th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Image</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Company</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">
                    <div className="flex items-center justify-between">
                      Location
                      <span className="text-[10px] flex flex-col leading-[0.5]"><span className="text-white/50">▲</span><span>▼</span></span>
                    </div>
                  </th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Experience</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Salary</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Order</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 font-bold whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row) => (
                  <tr key={row.id} className="border-b border-slate-200 dark:border-gray-800/50 hover:bg-slate-50 dark:bg-[#1f1b2e]/50 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
                    <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.sno}</td>
                    <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top w-48">{row.title}</td>
                    <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top text-center">
                      <div className={`w-12 h-12 flex items-center justify-center font-bold text-white text-xl rounded
                        ${row.image === 'A' ? 'bg-[#1b9bf0]' : 
                          row.image === 'N' ? 'bg-[#f6f6ff] dark:bg-[#1f1b2e] text-red-500' : 
                          row.image === 'V' ? 'bg-[#f6f6ff] dark:bg-[#1f1b2e] text-[#1a1254]' :
                          row.image === 'G' ? 'bg-[#00c59a]' :
                          row.image === 'D' ? 'bg-[#f6f6ff] dark:bg-[#111827] hover:bg-slate-50 dark:bg-[#1f1b2e]/50 dark:hover:bg-[#1f2937] transition-colors' :
                          row.image === 'M' ? 'bg-[#0b9cdd]' :
                          row.image === 'U' ? 'bg-[#f6f6ff] dark:bg-[#1f1b2e] text-[#00a98f]' : 'bg-slate-300'}`}>
                        {row.image === 'N' ? 'N' : row.image === 'V' ? 'V' : row.image === 'D' ? <div className="flex"><div className="w-3 h-3 rounded-full bg-[#00a98f]"></div><div className="w-3 h-3 bg-red-400"></div></div> : row.image === 'U' ? 'U' : row.image}
                      </div>
                    </td>
                    <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.company}</td>
                    <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top w-32">{row.location}</td>
                    <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top whitespace-nowrap">{row.experience}</td>
                    <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top w-32">{row.salary}</td>
                    <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top">
                      <input 
                        type="text" 
                        defaultValue={row.order} 
                        className="w-24 border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                      />
                    </td>
                    <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top text-center">
                      <button className="bg-green-600 text-white px-4 py-1.5 rounded-full text-xs hover:bg-green-700 transition-colors">
                        {row.status}
                      </button>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="flex gap-2">
                        <button className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800 p-1.5 rounded hover:bg-[#152a4a] transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button className="bg-[#6366f1] text-white p-1.5 rounded hover:bg-[#d87025] transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col md:flex-row justify-between items-center text-sm text-slate-800 dark:text-slate-200">
            <div className="mb-4 md:mb-0">
              Showing 1 to 50 of {TOTAL_ENTRIES} entries
            </div>
            <div className="flex items-center space-x-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-400">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-400">3</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
