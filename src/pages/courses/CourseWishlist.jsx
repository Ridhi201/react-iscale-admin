import { useState, useEffect } from 'react'
import { Eye, Trash2, Calendar, X } from 'lucide-react'
import * as Icons from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function CourseWishlist() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [totalRecords, setTotalRecords] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  // Filter states
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [search, setSearch] = useState('')
  const [courseId, setCourseId] = useState('')
  const [courses, setCourses] = useState([])

  // Modal state
  const [selectedWishlist, setSelectedWishlist] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const [loading, setLoading] = useState(false)

  const fetchWishlists = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${BASE_URL}/myadmin/user-wishlist/course/admin/all`, {
        params: {
          page: currentPage,
          limit: entriesPerPage,
          search: search || undefined,
          course_id: courseId || undefined,
          from_date: fromDate || undefined,
          to_date: toDate || undefined
        },
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data.status) {
        setData(response.data.data || [])
        setTotalRecords(response.data.total_records || 0)
        setTotalPages(response.data.total_pages || 1)
      } else {
        setData([])
        setTotalRecords(0)
        setTotalPages(1)
      }
    } catch (error) {
      console.error("Error fetching wishlists:", error)
      setData([])
      setTotalRecords(0)
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${BASE_URL}/myadmin/course/all-courses?limit=1000`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data.status && response.data.data) {
        setCourses(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching courses:", error)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    fetchWishlists()
  }, [currentPage, entriesPerPage])

  const handleSearch = () => {
    if (currentPage === 1) {
      fetchWishlists()
    } else {
      setCurrentPage(1)
    }
  }

  const handleReset = () => {
    setSearch('')
    setFromDate('')
    setToDate('')
    setCourseId('')
    if (currentPage === 1) {
      setTimeout(fetchWishlists, 0)
    } else {
      setCurrentPage(1)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this wishlist?')) {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.delete(`${BASE_URL}/myadmin/user-wishlist/course/admin/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (response.data.status) {
          fetchWishlists()
        }
      } catch (error) {
        console.error("Error deleting wishlist:", error)
      }
    }
  }

  const handleView = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${BASE_URL}/myadmin/user-wishlist/course/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data.status) {
        setSelectedWishlist(response.data.data)
        setIsViewModalOpen(true)
      }
    } catch (error) {
      console.error("Error fetching single wishlist:", error)
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, startPage + 4)
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
      <div className="bg-[#144f36] rounded-t-2xl p-5 flex justify-between items-center shadow-md relative overflow-hidden group mb-5">
        <h2 className="text-white font-bold tracking-tight text-xl relative z-10">Course Wishlist List</h2>
      </div>

      {/* Filters Card */}
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors p-5 mb-5">
        <div className="flex flex-wrap items-end gap-5 w-full">
          {/* From Date */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">From Date</label>
            <input 
              type="date" 
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] text-slate-500" 
            />
          </div>
          {/* To Date */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">To Date</label>
            <input 
              type="date" 
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] text-slate-500" 
            />
          </div>
          {/* Course */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Course</label>
            <select 
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]"
            >
              <option value="">Select Value</option>
              {courses.map(c => (
                <option key={c._id} value={c._id}>{c.title || c.m_course_title}</option>
              ))}
            </select>
          </div>
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Search</label>
            <input 
              type="text" 
              placeholder="Search..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]" 
            />
          </div>
          {/* Buttons */}
          <div className="flex gap-2 w-full md:w-auto mt-7">
            <button onClick={handleSearch} className="bg-[#144f36] hover:bg-[#0f3d2a] text-white px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-all">Search / Filter</button>
            <button onClick={handleReset} className="bg-white border border-[#144f36] text-[#144f36] hover:bg-slate-50 px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-all">Reset</button>
          </div>
        </div>
      </div>
      
      {/* Table Section */}
      <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] border border-slate-200 dark:border-[#1f1b2e] rounded-xl overflow-hidden mb-5 p-4">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 w-full">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <span className="text-sm text-slate-800 dark:text-slate-200">Show</span>
            <select 
              value={entriesPerPage}
              onChange={handleEntriesChange}
              className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] bg-[#f6f6ff] dark:bg-[#1f1b2e] text-slate-800 dark:text-slate-200"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-slate-800 dark:text-slate-200 mr-2">Entries</span>
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Search..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded-full px-4 py-1.5 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] placeholder:text-slate-600 dark:text-slate-400 min-w-[200px]"
            />
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm text-slate-800 dark:text-slate-200">
            <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">
              <tr>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">S.No.</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Student Id</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Student</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Contact No.</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">EmailID</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Course</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top w-20">Added. Date</th>
                <th className="px-3 py-3 font-semibold text-xs align-top">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">Loading...</td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">No data found</td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr 
                    key={row.wishlist_id || index} 
                    className="border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e]"
                  >
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                      {(currentPage - 1) * entriesPerPage + index + 1}
                    </td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.student_id}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                      <div className="break-words">{row.student_name}</div>
                    </td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.contact_no}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.email}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50 text-slate-600 dark:text-slate-400">
                      <div className="w-32">{row.course_name}</div>
                    </td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                      <div className="w-20 break-words">{new Date(row.added_date).toLocaleDateString()}</div>
                    </td>
                    <td className="px-3 py-3 text-xs">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleView(row.wishlist_id)}
                          className="bg-[#144f36] text-white p-1.5 rounded-full hover:bg-[#0f3d2a] transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(row.wishlist_id)}
                          className="btn-glossy-red "
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center w-full text-sm text-slate-800 dark:text-slate-200">
          <div className="mb-4 sm:mb-0 font-medium">
            Showing {Math.min((currentPage - 1) * entriesPerPage + 1, totalRecords)} to {Math.min(currentPage * entriesPerPage, totalRecords)} of {totalRecords.toLocaleString()} entries
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
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="text-slate-600 dark:text-slate-400 px-1">...</span>
                  <button 
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-sm hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-slate-600 dark:text-slate-400"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            
            <button 
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1.5 ${currentPage === totalPages || totalPages === 0 ? 'text-slate-800 dark:text-slate-200 cursor-not-allowed' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-slate-500 dark:text-slate-400'}`}
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {isViewModalOpen && selectedWishlist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl relative shadow-xl">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setIsViewModalOpen(false)}
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Wishlist Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
              <div>
                <p className="font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">Student Name</p>
                <p className="text-gray-800 dark:text-gray-200">{selectedWishlist.user_id?.c_first_name} {selectedWishlist.user_id?.c_last_name}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">Email</p>
                <p className="text-gray-800 dark:text-gray-200">{selectedWishlist.user_id?.c_email}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">Contact</p>
                <p className="text-gray-800 dark:text-gray-200">{selectedWishlist.user_id?.c_contact}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">Course Name</p>
                <p className="text-gray-800 dark:text-gray-200">{selectedWishlist.course_id?.m_course_title}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">Course Price</p>
                <p className="text-gray-800 dark:text-gray-200">₹{selectedWishlist.course_id?.m_course_price || 0}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">Added On</p>
                <p className="text-gray-800 dark:text-gray-200">{new Date(selectedWishlist.added_on || selectedWishlist.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


