import { useState, useEffect } from 'react'
import { Eye, Edit2, Trash2 } from 'lucide-react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../config/api'
import { getImageUrl } from '../../utils/imageUtils'
export default function CourseTestSeries() {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const courseTitle = location.state?.courseTitle || location.state?.course_title || 'Course'
  
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(50)

  useEffect(() => {
    fetchPackages()
  }, [id])

  const fetchPackages = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.get(`${BASE_URL}/myadmin/test-package/get-packages/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data?.status) {
        setPackages(response.data.data || [])
      } else {
        setPackages([])
      }
    } catch (error) {
      console.error('Error fetching packages:', error)
      setPackages([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (packageId) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`${BASE_URL}/myadmin/test-package/delete-package/${packageId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data?.status) {
        alert(response.data.message || 'Deleted successfully')
        fetchPackages()
      } else {
        alert(response.data.message || 'Failed to delete')
      }
    } catch (error) {
      console.error('Error deleting package:', error)
      alert(error.response?.data?.message || 'Delete failed')
    }
  }

  const TOTAL_ENTRIES = packages.length
  const TOTAL_PAGES = Math.ceil(TOTAL_ENTRIES / entriesPerPage)

  const currentData = packages.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  )

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

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

  return (
    <div className="min-h-screen bg-[#eaf3f8] p-4 font-sans animate-fade-in-up">
      {/* Top Header */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-5 flex justify-between items-center">
        <h2 className="text-slate-800 font-bold text-xl">Packages - {courseTitle}</h2>
        <button onClick={() => navigate(`/courses/test-series/add/${id}`)} className="bg-[#144f36] hover:bg-[#0f3d2a] text-white px-4 py-2 rounded text-sm font-semibold shadow-sm transition-colors flex items-center gap-1">
          <span>+ Add New Package</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <span className="text-sm text-slate-700">Show</span>
            <select 
              value={entriesPerPage}
              onChange={handleEntriesChange}
              className="border border-slate-300 bg-white text-slate-700 rounded px-2 py-1 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-slate-700 mr-2">Entries</span>
            <div className="flex gap-0 border border-slate-300 bg-white rounded overflow-hidden flex-wrap">
              {['Copy', 'Excel', 'PDF', 'Print'].map(label => (
                <button key={label} className="px-3 py-1.5 bg-white hover:bg-slate-50 border-r border-slate-300 last:border-r-0 text-xs font-medium text-slate-600">
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <input 
              type="text" 
              placeholder="Search..."
              className="border border-slate-300 bg-white text-slate-700 rounded px-4 py-1.5 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] min-w-[200px]"
            />
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-[#144f36] text-white">
              <tr>
                <th className="px-3 py-3 font-semibold text-xs border-r border-[#0f3d2a] whitespace-nowrap">S.No.</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-[#0f3d2a] whitespace-nowrap">Title</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-[#0f3d2a] whitespace-nowrap">Banner</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-[#0f3d2a] whitespace-nowrap">Quiz</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-[#0f3d2a] whitespace-nowrap">Training Highlights</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-[#0f3d2a] whitespace-nowrap">Status</th>
                <th className="px-3 py-3 font-semibold text-xs whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-8">Loading packages...</td>
                </tr>
              ) : currentData.length > 0 ? (
                currentData.map((row, index) => (
                  <tr key={row._id} className="border-b border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 border-r border-slate-200 align-middle text-[#428bca]">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                    <td className="px-4 py-3 border-r border-slate-200 align-middle text-slate-700">{row.m_package_title}</td>
                    <td className="px-4 py-3 border-r border-slate-200 align-middle">
                      {row.m_package_image ? (
                        <div className="w-12 h-8 bg-[#144f36] rounded flex items-center justify-center overflow-hidden">
                          <img src={getImageUrl(row.m_package_image)} alt="banner" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/48x32/144f36/ffffff?text=IMG'} />
                        </div>
                      ) : (
                        <div className="w-12 h-8 bg-[#144f36] flex items-center justify-center text-[10px] text-white font-bold rounded">
                          IMG
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 border-r border-slate-200 align-middle">
                      <button onClick={() => navigate(`/quiz/list/${row._id}`, { state: { packageTitle: row.m_package_title } })} className="bg-[#28a745] text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-[#218838] transition-colors">
                        Quiz
                      </button>
                    </td>
                    <td className="px-4 py-3 border-r border-slate-200 align-middle">
                      <button className="bg-[#144f36] text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-[#0f3d2a] transition-colors">
                        Training & Highlights
                      </button>
                    </td>
                    <td className="px-4 py-3 border-r border-slate-200 align-middle">
                      <button className={`${row.m_package_status === 1 ? 'bg-[#144f36]' : 'bg-[#d87025]'} text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap`}>
                        {row.m_package_status === 1 ? 'Active' : 'In-Active'}
                      </button>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <div className="flex gap-1.5">
                        <button className="bg-[#144f36] text-white p-1.5 rounded-full hover:bg-[#0f3d2a] transition-colors">
                          <Eye size={14} />
                        </button>
                        <button onClick={() => navigate(`/courses/test-series/add/${id}`, { state: { editPackage: row } })} className="bg-[#28a745] text-white p-1.5 rounded-full hover:bg-[#218838] transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => handleDelete(row._id)} className="bg-[#d87025] text-white p-1.5 rounded-full hover:bg-[#b55d1f] transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8">No packages found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {TOTAL_PAGES > 0 && (
          <div className="mt-4 flex justify-between items-center text-sm text-slate-700">
            <div className="mb-4 sm:mb-0">
              Showing {(currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, TOTAL_ENTRIES)} of {TOTAL_ENTRIES} entries
            </div>
            <div className="flex overflow-hidden items-center border border-slate-300 rounded">
              <button 
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-3 py-1 ${currentPage === 1 ? 'text-slate-400 cursor-not-allowed' : 'hover:bg-slate-50 text-slate-600 border-r border-slate-300'}`}
              >
                Previous
              </button>
              
              {getPageNumbers().map(pageNum => (
                <button 
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 text-sm border-r border-slate-300 ${currentPage === pageNum ? 'bg-[#144f36] font-bold text-white' : 'hover:bg-slate-50 text-slate-600'}`}
                >
                  {pageNum}
                </button>
              ))}
              
              <button 
                onClick={handleNext}
                disabled={currentPage === TOTAL_PAGES}
                className={`px-3 py-1 ${currentPage === TOTAL_PAGES ? 'text-slate-400 cursor-not-allowed' : 'hover:bg-slate-50 text-slate-600'}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
