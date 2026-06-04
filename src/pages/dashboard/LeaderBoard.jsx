import { useState } from 'react'
import { allLeaderBoardData } from '../../utils/mockData'
import { Calendar, Trash2 } from 'lucide-react'

const ENTRIES_PER_PAGE = 10
const TOTAL_ENTRIES = allLeaderBoardData.length
const TOTAL_PAGES = Math.ceil(TOTAL_ENTRIES / ENTRIES_PER_PAGE)

export default function LeaderBoard() {
  const [currentPage, setCurrentPage] = useState(2) // Defaulting to 2 as per screenshot
  
  // Calculate indices for data slicing
  const startIndex = (currentPage - 1) * ENTRIES_PER_PAGE
  const endIndex = Math.min(startIndex + ENTRIES_PER_PAGE, TOTAL_ENTRIES)
  
  const currentData = allLeaderBoardData.slice(startIndex, endIndex)

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES) setCurrentPage(currentPage + 1)
  }

  // Generate pagination numbers (show 4 numbers max around current page)
  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - 1)
    let endPage = Math.min(TOTAL_PAGES, startPage + 3)
    if (endPage - startPage < 3) {
      startPage = Math.max(1, endPage - 3)
    }
    
    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="h-full animate-fade-in-up">
      {/* Title Card */}
           <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors p-4 mb-5">
        <h2 className="text-indigo-900 dark:text-indigo-300 font-bold tracking-tight text-xl font-medium">Test Series Leader Board</h2>
      </div>

      {/* Filters Card */}
           <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors p-5 mb-5">
        <div className="flex flex-wrap items-end gap-5 w-full">
          {/* Course */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Course</label>
            <select className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
              <option>Select Value</option>
            </select>
          </div>
          {/* Packages */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Packages</label>
            <select className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
              <option>Select Value</option>
            </select>
          </div>
          {/* Quiz */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Quiz</label>
            <select className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
              <option>Select Value</option>
            </select>
          </div>
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Search</label>
            <input type="text" placeholder="Search..." className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" />
          </div>
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
          {/* Buttons */}
          <div className="flex-none flex gap-2 h-[38px] w-full md:w-auto mt-7">
            <button className="btn-glossy-blue">Search</button>
            <button className="btn-glossy-teal">Filter</button>
            <button className="btn-glossy-purple">Reset</button>
            <button className="btn-glossy-royalblue">Export</button>
          </div>
          {/* Export Button */}
          </div>
      </div>
      
      {/* Table Section */}
           <div className="bg-[#f6f6ff] border border-slate-100 rounded-2xl overflow-hidden shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow mb-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-800 dark:text-slate-200">
            <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">
              <tr>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Quiz Name</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Student Name</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Contact No.</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Email</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top w-20">Total Questions</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top w-20">Attempt Questions</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top w-20">Correct Answers</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top w-20">Wrong Answers</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top w-20">Total Obtained Marks</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top w-24">Test Duration</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top w-20">Test Date</th>
                <th className="px-3 py-3 font-semibold text-xs align-top text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row) => (
                <tr 
                  key={row.id} 
                  className={`border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#111827] hover:bg-slate-50 dark:bg-[#1f1b2e]/50 dark:hover:bg-[#1f2937] transition-colors`}
                >
                  <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50">{row.quiz}</td>
                  <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50">
                    <div className="max-w-[80px] break-words">{row.student}</div>
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50">{row.phone}</td>
                  <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50">{row.email}</td>
                  <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50">{row.totalQ}</td>
                  <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50">{row.attemptQ}</td>
                  <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50">{row.correct}</td>
                  <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50">{row.wrong}</td>
                  <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50">{row.marks}</td>
                  <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50">{row.duration}</td>
                  <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50">
                    <div className="w-10 break-words">{row.date}</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="w-7 h-7 bg-red-600 rounded flex items-center justify-center text-white mx-auto hover:bg-red-700 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
           <div className="bg-[#f6f6ff] border border-slate-100 rounded-2xl p-4 shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow flex flex-col sm:flex-row justify-between items-center text-sm text-slate-800 dark:text-slate-200">
        <div className="mb-4 sm:mb-0 font-medium">
          Showing {startIndex + 1} to {endIndex} of {TOTAL_ENTRIES} entries
        </div>
        <div className="flex bg-[#f6f6ff] dark:bg-[#1f1b2e] border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded overflow-hidden">
          <button 
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-3 py-1.5 border-r border-slate-300 dark:border-slate-600 ${currentPage === 1 ? 'text-slate-800 dark:text-slate-200 cursor-not-allowed' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-slate-500 dark:text-slate-400'}`}
          >
            «
          </button>
          
          {getPageNumbers().map(pageNum => (
            <button 
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1.5 border-r border-slate-300 dark:border-slate-600 ${currentPage === pageNum ? 'bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-[#1b365d]'}`}
            >
              {pageNum}
            </button>
          ))}
          
          <button 
            onClick={handleNext}
            disabled={currentPage === TOTAL_PAGES}
            className={`px-3 py-1.5 border-r border-slate-300 dark:border-slate-600 ${currentPage === TOTAL_PAGES ? 'text-slate-800 dark:text-slate-200 cursor-not-allowed' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-slate-500 dark:text-slate-400'}`}
          >
            »
          </button>
          <button 
            onClick={() => setCurrentPage(TOTAL_PAGES)} 
            className="px-3 py-1.5 hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-[#1b365d]"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  )
}
