import { useState, useMemo } from 'react'
import { Edit2, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { allLiveClassesData } from '../../utils/mockData'

export default function LiveClasses() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  
  // Data State
  const [tableData, setTableData] = useState(allLiveClassesData)
  
  // Filter States
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [batch, setBatch] = useState('Select Batch')
  const [teacher, setTeacher] = useState('Select Teacher')
  const [searchQuery, setSearchQuery] = useState('')

  // Derived filtered data
  const filteredData = useMemo(() => {
    let data = tableData

    // Batch filter
    if (batch && batch !== 'Select Batch') {
      data = data.filter(item => item.batchName === batch)
    }

    // Teacher filter
    if (teacher && teacher !== 'Select Teacher') {
      data = data.filter(item => item.teacher === teacher)
    }

    // Date filters
    if (fromDate) {
      data = data.filter(item => item.date >= fromDate)
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      data = data.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.teacher.toLowerCase().includes(q) ||
        item.batchName.toLowerCase().includes(q)
      )
    }

    return data
  }, [tableData, batch, teacher, fromDate, toDate, searchQuery])

  // Pagination logic
  const TOTAL_ENTRIES = filteredData.length
  const TOTAL_PAGES = Math.max(1, Math.ceil(TOTAL_ENTRIES / entriesPerPage))
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = Math.min(startIndex + entriesPerPage, TOTAL_ENTRIES)
  const currentData = filteredData.slice(startIndex, endIndex)

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

  const handleReset = () => {
    setFromDate('')
    setToDate('')
    setBatch('Select Batch')
    setTeacher('Select Teacher')
    setSearchQuery('')
    setCurrentPage(1)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setTableData(prev => prev.filter(item => item.id !== id))
    }
  }

  return (
    <div className="h-full animate-fade-in-up">
      {/* Title Card */}
           <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors p-4 mb-5 flex justify-between items-center">
        <h2 className="text-indigo-900 dark:text-indigo-300 font-bold tracking-tight text-xl font-medium">Live Classes</h2>
        <div className="flex gap-2">
          <button className="px-5 py-2 bg-stone-700 text-white border-none hover:bg-stone-800 text-sm rounded-full transition-colors" onClick={() => navigate('/live-classes/add')}>Create Live Class</button>
        </div>
      </div>

      {/* Filters Card */}
           <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors p-5 mb-5">
        <div className="flex flex-wrap items-end gap-5 w-full">
        </div>
      </div>
      
      {/* Table Section */}
           <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] border border-slate-200 dark:border-[#1f1b2e] rounded-xl overflow-hidden p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <span className="text-sm text-slate-800 dark:text-slate-200">Show</span>
            <select 
              value={entriesPerPage}
              onChange={handleEntriesChange}
              className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1 text-sm outline-none focus:border-stone-600 focus:ring-1 focus:ring-stone-600 bg-[#f6f6ff] dark:bg-[#1f1b2e] text-slate-800 dark:text-slate-200"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-slate-800 dark:text-slate-200">entries</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-800 dark:text-slate-200">Search:</span>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-1 text-sm outline-none focus:border-stone-600 focus:ring-1 focus:ring-stone-600"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#1f1b2e]">
            <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">
              <tr>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">S.No.</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Title</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Date</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Duration</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Join Url</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Host Url</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Batch Name</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Teacher</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Send Mail</th>
                <th className="px-3 py-3 font-semibold text-xs whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map((row) => (
                <tr key={row.id} className="border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e] hover:bg-slate-50 dark:bg-[#1f1b2e]/50 transition-colors">
                  <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.sno}</td>
                  <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top">
                    <div className="w-40 break-words text-slate-800 dark:text-slate-200">{row.title}</div>
                  </td>
                  <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.date}</td>
                  <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.duration}</td>
                  <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top">
                    <a href={row.joinUrl} className="text-blue-700 font-bold hover:underline">Click Here To Join The Meeting</a>
                  </td>
                  <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top">
                    <a href={row.hostUrl} className="text-blue-700 font-bold hover:underline">Click Here To Host The Meeting</a>
                  </td>
                  <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top">
                    <div className="w-40 break-words uppercase text-slate-500 dark:text-slate-400 text-xs font-semibold">{row.batchName}</div>
                  </td>
                  <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.teacher}</td>
                  <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top">
                    <button className="bg-[#218838] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm hover:bg-[#1e7e34] transition-colors">
                      Send Mail
                    </button>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <div className="flex flex-row gap-2">
                      <button className="bg-[#28a745] text-white p-2 rounded-lg hover:bg-[#218838] transition-colors w-fit">
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(row.id)}
                        className="btn-glossy-red icon-only"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="10" className="px-4 py-8 text-center text-slate-500 font-medium">No records found matching the filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
           <div className="mt-4 flex justify-end items-center text-sm text-slate-800 dark:text-slate-200">
          <div className="flex items-center space-x-1">
            <button 
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`mr-2 ${currentPage === 1 ? 'text-slate-400 cursor-not-allowed' : 'text-slate-800 dark:text-slate-200 hover:text-stone-700 cursor-pointer'}`}
            >
              Pre
            </button>
            {getPageNumbers().map(pageNum => (
              <button 
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors ${currentPage === pageNum ? 'bg-stone-700 text-white shadow-sm' : 'hover:bg-slate-100 dark:bg-[#1f1b2e]/50 text-slate-600 dark:text-slate-400'}`}
              >
                {pageNum}
              </button>
            ))}
            <button 
              onClick={handleNext}
              disabled={currentPage === TOTAL_PAGES}
              className={`ml-2 ${currentPage === TOTAL_PAGES ? 'text-slate-400 cursor-not-allowed' : 'text-slate-800 dark:text-slate-200 hover:text-stone-700 cursor-pointer'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
