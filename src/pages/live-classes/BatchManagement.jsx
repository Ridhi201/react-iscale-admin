import { useState } from 'react'
import { Edit2, Trash2 } from 'lucide-react'
import { allBatchManagementData } from '../../utils/mockData'

const TOTAL_ENTRIES = allBatchManagementData.length

export default function BatchManagement() {
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)

  const TOTAL_PAGES = Math.ceil(TOTAL_ENTRIES / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = Math.min(startIndex + entriesPerPage, TOTAL_ENTRIES)
  const currentData = allBatchManagementData.slice(startIndex, endIndex)

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
    <div className="p-4 md:p-6 h-full bg-[#eef2f6]">
      {/* Title Card - Full Width */}
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors p-4 mb-4">
        <h2 className="text-indigo-900 dark:text-indigo-300 font-bold tracking-tight text-lg font-bold">Add Batch</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          {/* Top Filters Card */}
           <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors p-4">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">From Date</label>
                <input 
                  type="date" 
                  className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">To Date</label>
                <input 
                  type="date" 
                  className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800 text-xs rounded hover:bg-[#152a4a] transition-colors">Submit</button>
                <button className="btn-glossy-purple">Reset</button>
              </div>
            </div>
          </div>

        {/* Table Section */}
           <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] border border-slate-200 dark:border-[#1f1b2e] rounded-xl overflow-hidden p-3 md:p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-3">
            <div className="flex items-center gap-2 mb-3 sm:mb-0">
              <span className="text-xs text-slate-800 dark:text-slate-200">Show</span>
              <select 
                value={entriesPerPage}
                onChange={handleEntriesChange}
                className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-1.5 py-1 text-xs outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e] text-slate-800 dark:text-slate-200"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-xs text-slate-800 dark:text-slate-200">Entries</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-800 dark:text-slate-200">Search:</span>
              <input 
                type="text" 
                className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded-md px-2 py-1 text-xs outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] md:text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#1f1b2e]">
              <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">
                <tr>
                  <th className="px-2 py-2 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">S.No.</th>
                  <th className="px-2 py-2 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Batch Name</th>
                  <th className="px-2 py-2 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Batch Instructor</th>
                  <th className="px-2 py-2 font-bold border-r border-slate-200 dark:border-gray-800/50 min-w-[100px]">Course</th>
                  <th className="px-2 py-2 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Date</th>
                  <th className="px-2 py-2 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Start Time</th>
                  <th className="px-2 py-2 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">End Time</th>
                  <th className="px-2 py-2 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Strength</th>
                  <th className="px-2 py-2 font-bold border-r border-slate-200 dark:border-gray-800/50 min-w-[120px]">Subject</th>
                  <th className="px-2 py-2 font-bold whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row) => (
                  <tr key={row.id} className="border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e] hover:bg-slate-50 dark:bg-[#1f1b2e]/50 transition-colors">
                    <td className="px-2 py-2 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.sno}</td>
                    <td className="px-2 py-2 border-r border-slate-200 dark:border-gray-800/50 align-top text-blue-600 font-medium">
                      <div className="w-28 md:w-36 break-words uppercase">{row.batchName}</div>
                    </td>
                    <td className="px-2 py-2 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.batchInstructor}</td>
                    <td className="px-2 py-2 border-r border-slate-200 dark:border-gray-800/50 align-top">
                      <div className="w-24 md:w-32 break-words">{row.course}</div>
                    </td>
                    <td className="px-2 py-2 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.date}</td>
                    <td className="px-2 py-2 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.startTime}</td>
                    <td className="px-2 py-2 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.endTime}</td>
                    <td className="px-2 py-2 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.strength}</td>
                    <td className="px-2 py-2 border-r border-slate-200 dark:border-gray-800/50 align-top">
                      <div className="w-32 md:w-40 break-words text-[10px] leading-tight">{row.subject}</div>
                    </td>
                    <td className="px-2 py-2 align-top">
                      <div className="flex gap-1.5">
                        <button className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800 p-1.5 rounded hover:bg-[#152a4a] transition-colors w-fit">
                          <Edit2 size={12} />
                        </button>
                        <button className="bg-[#6366f1] text-white p-1.5 rounded hover:bg-[#d87025] transition-colors w-fit">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
           <div className="mt-3 flex justify-end items-center text-xs text-slate-800 dark:text-slate-200">
            <div className="flex items-center space-x-1">
              <button 
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`mr-2 ${currentPage === 1 ? 'text-slate-600 dark:text-slate-400' : 'text-slate-800 dark:text-slate-200 cursor-pointer'}`}
              >
                Pre
              </button>
              {getPageNumbers().map(pageNum => (
                <button 
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${currentPage === pageNum ? 'bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800' : 'hover:bg-slate-100 dark:bg-[#1f1b2e]/50 text-slate-600 dark:text-slate-400'}`}
                >
                  {pageNum}
                </button>
              ))}
              <button 
                onClick={handleNext}
                disabled={currentPage === TOTAL_PAGES}
                className={`ml-2 ${currentPage === TOTAL_PAGES ? 'text-slate-600 dark:text-slate-400' : 'text-slate-800 dark:text-slate-200 cursor-pointer'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
           <div className="w-full lg:w-[280px] xl:w-[320px] bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors p-4 h-fit shrink-0">
        <h2 className="text-indigo-900 dark:text-indigo-300 font-bold tracking-tight text-base font-bold mb-4 text-center">Add New Batch</h2>
        
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Batch Name</label>
            <input type="text" placeholder="Enter Batch Name" className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1.5 text-xs outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Batch Instructor</label>
            <input type="text" placeholder="Enter Batch Instructor" className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1.5 text-xs outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Batch Image</label>
            <div className="flex border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded overflow-hidden">
              <input type="file" className="text-xs w-full file:border-0 file:bg-slate-100 dark:bg-[#1f1b2e]/50 file:px-2 file:py-1.5 file:text-xs file:text-slate-700 dark:text-slate-300 hover:file:bg-slate-200" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Batch Courses</label>
            <select className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1.5 text-xs outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
              <option>Select Course</option>
              <option>Data Science Bootcamp</option>
              <option>The Complete AI Guide Zero To Hero</option>
              <option>Advance Python With AI Tools</option>
              <option>AI Powered Excel Full Course</option>
              <option>Mastering SQL</option>
              <option>Statistics and EDA</option>
              <option>Power BI and Tableau For Data Visualization</option>
              <option>AI Cohort Course</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Date</label>
            <input type="date" className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1.5 text-xs outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Start Time</label>
            <div className="relative">
              <input type="time" className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1.5 text-xs outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">End Time</label>
            <div className="relative">
              <input type="time" className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1.5 text-xs outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Strength</label>
            <input type="text" placeholder="Enter strength" className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1.5 text-xs outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Notice Description</label>
            <textarea placeholder="Notice Description" rows={2} className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1.5 text-xs outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 resize-none"></textarea>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Notice Link</label>
            <input type="text" placeholder="Notice Link" className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1.5 text-xs outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Order</label>
            <input type="text" placeholder="Enter Order" className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1.5 text-xs outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Subject</label>
            <textarea placeholder="Enter Subject" rows={2} className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1.5 text-xs outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 resize-none"></textarea>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Days</label>
            <div className="flex flex-col gap-1.5">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <label key={day} className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200">
                  <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600 w-3 h-3" />
                  {day}
                </label>
              ))}
            </div>
          </div>
          <button className="w-full py-2 bg-[#428bca] text-white text-sm rounded hover:bg-[#3071a9] transition-colors mt-2">
            Submit
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}
