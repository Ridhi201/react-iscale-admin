import { useState } from 'react'
import { Eye, Trash2, Calendar } from 'lucide-react'
import { allWebinarWishlistData } from '../../utils/mockData'

const TOTAL_ENTRIES = allWebinarWishlistData.length

export default function WebinarWishlist() {
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)

  const TOTAL_PAGES = Math.ceil(TOTAL_ENTRIES / entriesPerPage)

  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = Math.min(startIndex + entriesPerPage, TOTAL_ENTRIES)
  const currentData = allWebinarWishlistData.slice(startIndex, endIndex)

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

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  return (
    <div className="h-full animate-fade-in-up">
      {/* Title Card */}
           <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors p-4 mb-5">
        <h2 className="text-indigo-900 dark:text-indigo-300 font-bold tracking-tight text-xl font-medium">Webinar Wishlist List</h2>
      </div>

      {/* Filters Card */}
           <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors p-5 mb-5">
        <div className="flex flex-wrap items-end gap-5 w-full">
          {/* From Date */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">From Date</label>
            <input type="date" className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-slate-500" />
          </div>
          {/* To Date */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">To Date</label>
            <input type="date" className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-slate-500" />
          </div>
          {/* Course */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Course</label>
            <select className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
              <option>Select Value</option>
            </select>
          </div>
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Search</label>
            <input type="text" placeholder="Search..." className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" />
          </div>
          {/* Buttons */}
          <div className="flex-none flex gap-2 h-[38px] w-full md:w-auto mt-7">
            <button className="btn-glossy-blue">Search</button>
            <button className="btn-glossy-teal">Filter</button>
            <button className="btn-glossy-purple">Reset</button>
            <button className="btn-glossy-royalblue">Export</button>
          </div>
          </div>
      </div>
      
      {/* Table Section */}
           <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] border border-slate-200 dark:border-[#1f1b2e] rounded-xl overflow-hidden mb-5 p-4">
        {/* Top Controls */}
           <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <span className="text-sm text-slate-800 dark:text-slate-200">Show</span>
            <select 
              value={entriesPerPage}
              onChange={handleEntriesChange}
              className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e] text-slate-800 dark:text-slate-200"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-slate-800 dark:text-slate-200 mr-2">Entries</span>
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
          <div>
            <input 
              type="text" 
              placeholder="Search..." 
              className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded-full px-4 py-1.5 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-600 dark:text-slate-400 min-w-[200px]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-800 dark:text-slate-200">
            <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">
              <tr>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">S.No.</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Student Id</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Student</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Webinar</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top w-20">Added. Date</th>
                <th className="px-3 py-3 font-semibold text-xs align-top">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row) => (
                <tr 
                  key={row.id} 
                  className="border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e]"
                >
                  <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.sno}</td>
                  <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.studentId}</td>
                  <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                    <div className="break-words">{row.student}</div>
                  </td>
                  <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50 text-slate-600 dark:text-slate-400">
                    {row.webinar}
                  </td>
                  <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                    <div className="w-20 break-words">{row.date}</div>
                  </td>
                  <td className="px-3 py-3 text-xs">
                    <div className="flex gap-2">
                      <button className="bg-[#428bca] text-white p-1.5 rounded-full hover:bg-[#3071a9] transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="btn-glossy-red ">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
           <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-800 dark:text-slate-200">
          <div className="mb-4 sm:mb-0 font-medium">
            Showing {startIndex + 1} to {endIndex} of {TOTAL_ENTRIES.toLocaleString()} entries
          </div>
          <div className="flex bg-[#f6f6ff] dark:bg-[#1f1b2e] overflow-hidden items-center">
            <button 
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 ${currentPage === 1 ? 'text-slate-800 dark:text-slate-200 cursor-not-allowed' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-slate-500 dark:text-slate-400'}`}
            >
              ◀
            </button>
            
            <div className="flex items-center space-x-1 mx-1">
              {getPageNumbers().map(pageNum => (
                <button 
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${currentPage === pageNum ? 'bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-slate-600 dark:text-slate-400'}`}
                >
                  {pageNum}
                </button>
              ))}
              {TOTAL_PAGES > 5 && currentPage < TOTAL_PAGES - 2 && (
                <>
                  <span className="text-slate-600 dark:text-slate-400 px-1">...</span>
                  <button 
                    onClick={() => setCurrentPage(TOTAL_PAGES)}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-sm hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-slate-600 dark:text-slate-400"
                  >
                    {TOTAL_PAGES}
                  </button>
                </>
              )}
            </div>
            
            <button 
              onClick={handleNext}
              disabled={currentPage === TOTAL_PAGES}
              className={`px-3 py-1.5 ${currentPage === TOTAL_PAGES ? 'text-slate-800 dark:text-slate-200 cursor-not-allowed' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-slate-500 dark:text-slate-400'}`}
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
