import { useState, useEffect } from 'react'
import { Eye, Edit2, Trash2 } from 'lucide-react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function QuizList() {
  const navigate = useNavigate()
  const { packageId } = useParams()
  const location = useLocation()
  const packageTitle = location.state?.packageTitle || 'Package'

  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(50)

  useEffect(() => {
    fetchQuizzes()
  }, [packageId])

  const fetchQuizzes = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.get(`${BASE_URL}/myadmin/quiz/quiz-by-package/${packageId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data?.status) {
        setQuizzes(response.data.data || [])
      } else {
        setQuizzes([])
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error)
      setQuizzes([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (quizId) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`${BASE_URL}/myadmin/quiz/delete-quiz/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data?.status) {
        alert(response.data.message || 'Quiz deleted successfully')
        fetchQuizzes()
      } else {
        alert(response.data.message || 'Failed to delete')
      }
    } catch (error) {
      console.error('Error deleting quiz:', error)
      alert(error.response?.data?.message || 'Delete failed')
    }
  }

  const TOTAL_ENTRIES = quizzes.length
  const TOTAL_PAGES = Math.ceil(TOTAL_ENTRIES / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = Math.min(startIndex + entriesPerPage, TOTAL_ENTRIES)
  const currentData = quizzes.slice(startIndex, endIndex)

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

  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    } catch {
      return '-'
    }
  }

  return (
    <div className="min-h-screen bg-[#eaf3f8] p-4 font-sans animate-fade-in-up">
      {/* Top Header */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-5 flex justify-between items-center">
        <h2 className="text-slate-800 font-bold text-xl">Quizzes - {packageTitle}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/quiz/add/${packageId}`, { state: { packageTitle } })}
            className="bg-[#144f36] hover:bg-[#0f3d2a] text-white px-4 py-2 rounded text-sm font-semibold shadow-sm transition-colors flex items-center gap-1"
          >
            <span>+ Add New Quiz</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded text-sm font-semibold shadow-sm transition-colors"
          >
            ↩ Back
          </button>
        </div>
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
            <span className="text-sm text-slate-700">Entries</span>
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
                <th className="px-3 py-3 font-semibold text-xs border-r border-[#0f3d2a] whitespace-nowrap">Duration</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-[#0f3d2a] whitespace-nowrap">Marks</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-[#0f3d2a] whitespace-nowrap">-ve Marks</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-[#0f3d2a] whitespace-nowrap">Start Date</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-[#0f3d2a] whitespace-nowrap">End Date</th>
                <th className="px-3 py-3 font-semibold text-xs border-r border-[#0f3d2a] whitespace-nowrap">Status</th>
                <th className="px-3 py-3 font-semibold text-xs whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-8">Loading quizzes...</td>
                </tr>
              ) : currentData.length > 0 ? (
                currentData.map((row, index) => (
                  <tr key={row._id} className="border-b border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 border-r border-slate-200 align-middle text-[#428bca]">{startIndex + index + 1}</td>
                    <td className="px-4 py-3 border-r border-slate-200 align-middle text-slate-700 font-medium">{row.m_quiz_title}</td>
                    <td className="px-4 py-3 border-r border-slate-200 align-middle">{row.m_quiz_duration || '-'} min</td>
                    <td className="px-4 py-3 border-r border-slate-200 align-middle">{row.m_quiz_per_marks ?? '-'}</td>
                    <td className="px-4 py-3 border-r border-slate-200 align-middle">{row.m_quiz_pernegative_marks ?? '-'}</td>
                    <td className="px-4 py-3 border-r border-slate-200 align-middle whitespace-nowrap">{formatDate(row.m_quiz_startdate)}</td>
                    <td className="px-4 py-3 border-r border-slate-200 align-middle whitespace-nowrap">{formatDate(row.m_quiz_enddate)}</td>
                    <td className="px-4 py-3 border-r border-slate-200 align-middle">
                      <span className={`${row.m_quiz_status === 1 ? 'bg-[#144f36]' : 'bg-[#d87025]'} text-white px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap`}>
                        {row.m_quiz_status === 1 ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <div className="flex gap-1.5">
                        <button className="bg-[#144f36] text-white p-1.5 rounded-full hover:bg-[#0f3d2a] transition-colors" title="View">
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => navigate(`/quiz/add/${packageId}`, { state: { editQuiz: row, packageTitle } })}
                          className="bg-[#28a745] text-white p-1.5 rounded-full hover:bg-[#218838] transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(row._id)}
                          className="bg-[#d87025] text-white p-1.5 rounded-full hover:bg-[#b55d1f] transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-8">No quizzes found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {TOTAL_PAGES > 0 && (
          <div className="mt-4 flex justify-between items-center text-sm text-slate-700">
            <div>
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
