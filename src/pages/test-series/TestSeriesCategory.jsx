import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Edit2, Trash2 } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'
import { getImageUrl } from '../../utils/imageUtils'

export default function TestSeriesCategory() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(50)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.get(`${BASE_URL}/myadmin/test-category/all?limit=1000`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data?.status) {
        setCategories(response.data.data || [])
      } else {
        setCategories([])
      }
    } catch (error) {
      console.error('Error fetching test categories:', error)
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`${BASE_URL}/myadmin/test-category/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data?.status) {
        alert(response.data.message || 'Deleted successfully')
        fetchCategories()
      } else {
        alert(response.data.message || 'Failed to delete')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert(error.response?.data?.message || 'Delete failed')
    }
  }

  const TOTAL_ENTRIES = categories.length
  const TOTAL_PAGES = Math.ceil(TOTAL_ENTRIES / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = Math.min(startIndex + entriesPerPage, TOTAL_ENTRIES)
  const currentData = categories.slice(startIndex, endIndex)

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
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md border border-slate-100 p-4 mb-5 flex justify-between items-center">
        <h2 className="text-indigo-900 font-bold tracking-tight text-xl">Test Series Category List</h2>
        <button onClick={() => navigate('/test-series/category/add')} className="px-4 py-2 bg-[#144f36] text-white text-sm font-medium rounded-md hover:bg-[#0f3d2a] transition-colors flex items-center gap-2">
          <span>+ Add New</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <span className="text-sm text-slate-800">Show</span>
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
            <span className="text-sm text-slate-800 mr-2">Entries</span>
            <div className="flex gap-0 border border-slate-300 rounded overflow-hidden flex-wrap">
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
              className="border border-slate-300 bg-white text-slate-700 rounded-full px-4 py-1.5 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] min-w-[200px]"
            />
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-sm text-slate-800">
            <thead className="bg-[#144f36] text-white border-b border-slate-200">
              <tr>
                <th className="px-3 py-3 font-semibold text-xs border-r border-[#0f3d2a] whitespace-nowrap">S.No.</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-[#0f3d2a] whitespace-nowrap">Category Name</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-[#0f3d2a] whitespace-nowrap">Icon</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-[#0f3d2a] whitespace-nowrap">Banner</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-[#0f3d2a] whitespace-nowrap">Description</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-[#0f3d2a] whitespace-nowrap">Status</th>
                <th className="px-3 py-3 font-semibold text-xs whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-8">Loading categories...</td>
                </tr>
              ) : currentData.length > 0 ? (
                currentData.map((row, index) => (
                  <tr key={row._id} className="border-b border-slate-200 bg-white hover:bg-slate-50">
                    <td className="px-4 py-3 border-r border-slate-200 align-middle text-[#428bca]">{startIndex + index + 1}</td>
                    <td className="px-4 py-3 border-r border-slate-200 align-middle">{row.test_categoryName}</td>
                    <td className="px-4 py-3 border-r border-slate-200 align-middle">
                      {row.test_category_icon ? (
                        <div className="w-8 h-8 rounded flex items-center justify-center overflow-hidden bg-slate-100">
                          <img src={getImageUrl(row.test_category_icon)} alt="icon" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/32x32/f1f5f9/94a3b8?text=ICN'} />
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-4 py-3 border-r border-slate-200 align-middle">
                      {row.test_category_banner ? (
                        <div className="w-16 h-8 rounded flex items-center justify-center overflow-hidden bg-slate-100">
                          <img src={getImageUrl(row.test_category_banner)} alt="banner" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/64x32/f1f5f9/94a3b8?text=BNR'} />
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-4 py-3 border-r border-slate-200 align-middle max-w-xs truncate" title={row.test_category_description}>
                      {row.test_category_description}
                    </td>
                    <td className="px-4 py-3 border-r border-slate-200 align-middle">
                      <button className={`${row.test_category_status === 1 ? 'bg-[#144f36]' : 'bg-[#d87025]'} text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm whitespace-nowrap`}>
                        {row.test_category_status === 1 ? 'Active' : 'In-Active'}
                      </button>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <div className="flex gap-1.5">
                        <button onClick={() => navigate(`/test-series/category/add`, { state: { editCategory: row } })} className="bg-[#28a745] text-white p-1.5 rounded-full hover:bg-[#218838] transition-colors">
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
                  <td colSpan="7" className="text-center py-8">No categories found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {TOTAL_PAGES > 0 && (
          <div className="mt-4 flex justify-between items-center text-sm text-slate-700">
            <div className="mb-4 sm:mb-0">
              Showing {startIndex + 1} to {endIndex} of {TOTAL_ENTRIES} entries
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
