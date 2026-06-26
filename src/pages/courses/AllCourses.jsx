import { useState, useEffect } from 'react'
import { Eye, Edit2, Trash2, Book } from 'lucide-react'
import * as Icons from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../config/api'
import { getImageUrl } from '../../utils/imageUtils'
import ThemeButton from '../../components/common/ThemeButton'
import CardHeader from '../../components/ui/CardHeader'
export default function AllCourses() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [totalEntries, setTotalEntries] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(50)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [categoriesDropdown, setCategoriesDropdown] = useState([])

  useEffect(() => {
    fetchCategoriesDropdown()
  }, [])

  useEffect(() => {
    fetchCourses()
  }, [currentPage, entriesPerPage, searchTerm, categoryFilter])

const fetchCategoriesDropdown = async () => {
  try {
    const token = localStorage.getItem('token')

    const response = await axios.get(
      `${BASE_URL}/myadmin/category/all-categories?search=&page=1&limit=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (response.data?.status) {
      setCategoriesDropdown(response.data.data || [])
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

  const fetchCourses = async () => {
    try {
      setLoading(true); 
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${BASE_URL}/myadmin/course/all-courses?search=${searchTerm}&limit=${entriesPerPage}&page=${currentPage}&category=${categoryFilter}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      if (response.data && response.data.status) {
        console.log("=== FIRST COURSE RAW DATA ===", response.data.data[0])
        setCourses(response.data.data || [])
        setTotalEntries(response.data.pagination?.total || 0)
        setTotalPages(response.data.pagination?.totalPages || 1)
      } else {
        setCourses([])
        setTotalEntries(0)
        setTotalPages(1)
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
  if (!await window.customConfirm('Are you sure you want to delete this course?')) {
    return
  }

  try {
    const token = localStorage.getItem('token')

    const response = await axios.delete(
      `${BASE_URL}/myadmin/course/delete-course/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    console.log('DELETE COURSE RESPONSE:', response.data)

    if (response.data?.status) {
      await window.customAlert(response.data.message || 'Course deleted successfully')
      fetchCourses()
    } else {
      await window.customAlert('Delete failed')
    }
  } catch (error) {
    console.error('DELETE COURSE ERROR:', error)

    if (error.response) {
      console.log(error.response.data)
      await window.customAlert(error.response.data?.message || 'Delete failed')
    } else {
      await window.customAlert('Network Error')
    }
  }
}

  const TOTAL_ENTRIES = totalEntries
  const TOTAL_PAGES = totalPages
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = Math.min(startIndex + entriesPerPage, TOTAL_ENTRIES)
  const currentData = courses

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
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden flex flex-col h-full">
        <CardHeader title="All Courses List">
          <ThemeButton variant="white-add" onClick={() => navigate('/courses/all/add')}>
            + Add New Course
          </ThemeButton>
        </CardHeader>

        <div className="p-4 flex-1 flex flex-col min-h-0">
          <div className="flex flex-col xl:flex-row justify-between xl:items-center mb-4 shrink-0 gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 bg-white dark:bg-[#1f1b2e] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#1f1b2e] shadow-sm hover:border-indigo-300 transition-colors">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Show</span>
                <select 
                  value={entriesPerPage}
                  onChange={handleEntriesChange}
                  className="bg-transparent text-slate-800 dark:text-slate-200 font-bold text-sm outline-none cursor-pointer focus:text-[#144f36] transition-colors"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Entries</span>
              </div>
              <div className="flex gap-0 border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded overflow-hidden flex-wrap">
                {[
                  { label: 'Copy', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#144f36]"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> },
                  { label: 'Excel', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h2"/><path d="M8 17h2"/><path d="M14 13h2"/><path d="M14 17h2"/></svg> },
                  { label: 'PDF', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg> },
                  { label: 'Print', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg> }
                ].map(btn => (
                  <button 
                    key={btn.label} 
                    title={btn.label} 
                    onClick={async () => {
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
                          await window.customAlert('Table data copied to clipboard!');
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
            <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] w-full sm:w-48"
              >
                <option value="">All Categories</option>
                {categoriesDropdown.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.m_category_name}</option>
                ))}
              </select>
              <input 
                type="text" 
                placeholder="Search anything..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded-full px-5 py-2 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all w-full sm:w-64 flex-1 hover:border-indigo-300"
              />
            </div>
          </div>

          <div className="overflow-auto border border-slate-200 dark:border-[#1f1b2e] flex-1 min-h-0">
            <table className="w-full text-left text-sm text-slate-800 dark:text-slate-200">
              <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800 sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">S.No.</th>
                  <th className="px-3 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap min-w-[150px]">Title</th>
                  <th className="px-3 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Code</th>
                  <th className="px-3 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Category</th>
                  <th className="px-3 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Banner</th>
                  <th className="px-3 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Video</th>
                  <th className="px-3 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Course Type</th>
                  <th className="px-3 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Course Price</th>
                  <th className="px-3 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Offer Price</th>
                  <th className="px-3 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Faq</th>
                  <th className="px-3 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Features</th>
                  <th className="px-3 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Tools</th>
                  <th className="px-3 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Subjects</th>
                  <th className="px-3 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Test Package</th>
                  <th className="px-3 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Training Highlights</th>
                  <th className="px-3 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Status</th>
                  <th className="px-3 py-3 font-bold whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="17" className="text-center py-8">Loading...</td>
                  </tr>
                ) : currentData.map((row, index) => (
                  <tr key={row._id} className="border-b border-slate-200 dark:border-gray-800/50 hover:bg-[#eaf3f8]/60 dark:hover:bg-indigo-900/20 transition-all duration-200 group">
                    <td className="px-3 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{startIndex + index + 1}</td>
                    <td className="px-3 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle text-[#144f36] font-medium">
                      <div className="w-40 break-words">{row.title}</div>
                    </td>
                    <td className="px-3 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.code || 'N/A'}</td>
                    <td className="px-3 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.category || 'N/A'}</td>
                    <td className="px-3 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">
                      {row.banner ? (
                        <img src={getImageUrl(row.banner)} alt="Banner" className="w-10 h-10 object-cover rounded" />
                      ) : (
                        <div className="w-10 h-10 bg-slate-200 border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 flex items-center justify-center text-[10px] text-center overflow-hidden rounded">
                          Img
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      Watch Video
                    </td>
                    <td className="px-3 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.course_type}</td>
                    <td className="px-3 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.price}</td>
                    <td className="px-3 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.offer_price}</td>
                    <td className="px-3 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">
                      <button onClick={() => navigate(`/courses/faq/${row._id}`)} className="bg-[#144f36] text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-[#0f3d2a] transition-colors flex items-center gap-1.5 whitespace-nowrap">
                        <Book size={12} /> Faq
                      </button>
                    </td>
                    <td className="px-3 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">
                      <button onClick={() => navigate(`/courses/features/${row._id}`)} className="bg-[#144f36] text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-[#0f3d2a] transition-colors flex items-center gap-1.5 whitespace-nowrap">
                        <Book size={12} /> Features
                      </button>
                    </td>
                    <td className="px-3 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">
                      <button onClick={() => navigate(`/courses/tools/${row._id}`)} className="bg-[#144f36] text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-[#0f3d2a] transition-colors flex items-center gap-1.5 whitespace-nowrap">
                        <Book size={12} /> Tools
                      </button>
                    </td>
                    <td className="px-3 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">
                      <button onClick={() => navigate(`/courses/subjects/${row._id}`)} className="bg-[#144f36] text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-[#0f3d2a] transition-colors flex items-center gap-1.5 whitespace-nowrap">
                        <Book size={12} /> Subject
                      </button>
                    </td>
                    <td className="px-3 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">
                      <button onClick={() => navigate(`/courses/test-series/${row._id}`, { state: { courseTitle: row.title } })} className="bg-[#144f36] text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-[#0f3d2a] transition-colors flex items-center gap-1.5 whitespace-nowrap">
                        <Book size={12} /> Test Package
                      </button>
                    </td>
                    <td className="px-3 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">
                      <button onClick={() => navigate(`/courses/training-highlights/${row._id}`, { state: { courseTitle: row.m_course_title } })} className="bg-[#144f36] text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-[#0f3d2a] transition-colors flex items-center gap-1.5 whitespace-nowrap">
                        <Book size={12} /> T.H.
                      </button>
                    </td>
                    <td className="px-3 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">
                      {(() => {
                        let s = row.m_course_status ?? row.is_active ?? row.course_status ?? row.isActive ?? row.active;
                        
                        // Default to Active if the backend didn't send a proper status field, ignoring the bugged row.status
                        let isActive = true;
                        if (s !== undefined && s !== null) {
                           isActive = s === 1 || s === '1' || s === true || String(s).toLowerCase() === 'active';
                        }
                        
                        return (
                          <span className={`px-3 py-1 rounded-full text-white text-xs whitespace-nowrap ${isActive ? 'bg-[#144f36]' : 'bg-gray-500'}`}>
                            {isActive ? 'Active' : 'Inactive'}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-3 py-3 align-middle">
                      <div className="flex gap-1.5">
                      <button onClick={() => navigate(`/courses/view/${row._id}`, { state: { courseData: row } })} className="bg-[#144f36] text-white p-1.5 rounded hover:bg-[#0f3d2a] transition-colors">
                        <Eye size={14} />
                      </button>
                        <button onClick={() => navigate(`/courses/all/edit/${row._id || row.id}`, { state: { courseData: row } })} className="bg-[#d87025] text-white p-1.5 rounded hover:bg-[#c2621f] transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => handleDelete(row._id || row.id)} className="bg-red-600 text-white p-1.5 rounded hover:bg-red-700 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {currentData.length === 0 && (
                  <tr>
                    <td colSpan="17" className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                      No Data Available In Table
                    </td>
                  </tr>
                )}
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


