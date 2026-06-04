import { useState } from 'react'
import { Eye, Edit2, Trash2 } from 'lucide-react'

const TOTAL_ENTRIES = 110297

export default function AppUsers() {
  const [currentPage, setCurrentPage] = useState(1)
  const entriesPerPage = 100 // Fixed as per normal behavior when not given a selector, or maybe add a selector.

  const TOTAL_PAGES = Math.ceil(TOTAL_ENTRIES / entriesPerPage)

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES) setCurrentPage(currentPage + 1)
  }

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(TOTAL_PAGES, startPage + 4)
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4)
    }
    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  const generateData = (page, perPage) => {
    const data = []
    const startIndex = (page - 1) * perPage
    for (let i = 0; i < perPage; i++) {
      const idx = startIndex + i
      if (idx >= TOTAL_ENTRIES) break
      
      const isVerified = idx % 2 === 0 || idx % 3 === 0
      const isAhmad = idx % 2 !== 0 && idx % 3 !== 0
      const isRohan = idx % 5 === 0
      const isShubhrakanti = idx % 4 === 0
      const isAnam = idx % 7 === 0

      let name = 'Akash Gupta'
      let contact = '9694202909'
      let email = 'ayushgpt4567@gmail.com'
      
      if (isAhmad) {
        name = 'Ahmad'
        contact = '1345264238'
        email = 'ekramulislamm429@gmail.com'
      } else if (isRohan) {
        name = 'Rohan'
        contact = '8767836839'
        email = 'rohthomas2000jm@gmail.com'
      } else if (isShubhrakanti) {
        name = 'Shubhrakanti'
        contact = '8927993804'
        email = 'shubhrakantibag563@gmail.com'
      } else if (isAnam) {
        name = 'Anam'
        contact = '+917340441'
        email = 'anammarianilgar@gmail.com'
      }

      data.push({
        id: idx + 1000,
        sno: idx + 1,
        userName: name,
        contactNo: contact,
        email: email,
        joinedOn: '23-05-2026',
        status: isVerified ? 'Verified' : 'Unverified'
      })
    }
    return data
  }

  const currentData = generateData(currentPage, entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = Math.min(startIndex + entriesPerPage, TOTAL_ENTRIES)

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#144f36] rounded-2xl shadow-md border border-white/10 p-5 mb-5 flex justify-between items-center relative overflow-hidden group">
        {/* Shiny glow effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white dark:bg-[#13111c]/10 rounded-full blur-2xl group-hover:bg-white dark:bg-[#13111c]/20 transition-all duration-700 pointer-events-none"></div>
        
        <div className="flex items-center relative z-10">
          <div className="w-1.5 h-7 bg-white dark:bg-[#13111c]/90 rounded-full mr-4 shadow-[0_0_12px_rgba(255,255,255,0.9)] hidden sm:block"></div>
          <h2 className="text-white font-bold tracking-wide text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">App Users List</h2>
        </div>
        
        <button className="bg-white hover:bg-slate-50 text-[#144f36] px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all flex items-center gap-2 relative z-10 hover:shadow hover:-translate-y-0.5">
          Export
        </button>
      </div>

      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden flex flex-col">
        {/* Filters */}
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 flex flex-wrap gap-4 items-end bg-[#eef2f6]/50">
          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">From Date</label>
            <div className="relative">
              <input type="date" className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 w-48" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">To Date</label>
            <div className="relative">
              <input type="date" className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 w-48" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">User Type</label>
            <select className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 w-40 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
              <option>Select Type</option>
              <option>Verified</option>
              <option>Unverified</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Search</label>
            <input type="text" className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 w-48" />
          </div>
          <div className="flex gap-2">
            <button className="btn-glossy-teal">Filter</button>
            <button className="btn-glossy-purple">Reset</button>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="overflow-x-auto border border-slate-200 dark:border-[#1f1b2e] rounded-t-lg flex-1">
            <table className="w-full text-left text-sm text-slate-800 dark:text-slate-200">
              <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">
                <tr>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">S.No.</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">User Name</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Contact No.</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Email</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Joined On</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 font-bold whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row) => (
                  <tr key={row.id} className="border-b border-slate-200 dark:border-gray-800/50 hover:bg-slate-50 dark:bg-[#1f1b2e]/50">
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.sno}</td>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.userName}</td>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.contactNo}</td>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.email}</td>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.joinedOn}</td>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">
                      <span className={`px-3 py-1 rounded-full text-white text-xs whitespace-nowrap ${row.status === 'Verified' ? 'bg-[#428bca]' : 'bg-[#6366f1]'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <div className="flex gap-1.5">
                        <button className="bg-[#428bca] text-white p-1.5 rounded hover:bg-[#3071a9] transition-colors">
                          <Eye size={14} />
                        </button>
                        <button className="bg-green-600 text-white p-1.5 rounded hover:bg-green-700 transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button className="btn-glossy-red icon-only">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between items-center text-sm text-slate-800 dark:text-slate-200">
            <div>
              Showing {TOTAL_ENTRIES === 0 ? 0 : startIndex + 1} to {endIndex} of {TOTAL_ENTRIES} entries
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${currentPage === 1 ? 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#1f1b2e]' : 'text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:bg-[#1f1b2e]/50'}`}
              >
                Previous
              </button>
              {getPageNumbers().map(pageNum => (
                <button 
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === pageNum ? 'bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-slate-600 dark:text-slate-400 border border-transparent hover:border-slate-300 dark:border-[#1f1b2e]'}`}
                >
                  {pageNum}
                </button>
              ))}
              <span className="px-2">...</span>
              <button 
                onClick={handleNext}
                disabled={currentPage === TOTAL_PAGES}
                className={`px-3 py-1 border rounded ${currentPage === TOTAL_PAGES ? 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#1f1b2e]' : 'text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:bg-[#1f1b2e]/50'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
