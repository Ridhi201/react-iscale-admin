import { useState, useEffect } from 'react'
import { BookOpen } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'
import ThemeButton from '../../components/common/ThemeButton'
import CardHeader from '../../components/ui/CardHeader'
import AddStudentModal from './AddStudentModal'
import AssignCoursesModal from './AssignCoursesModal'

const entriesPerPage = 10

export default function LMSStudents() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalEntries, setTotalEntries] = useState(0)

  const [showAddModal, setShowAddModal] = useState(false)
  const [assignTarget, setAssignTarget] = useState(null) // student row, or null

  const fetchStudents = async (page = currentPage, currentSearch = search) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/app-users/all`, {
        params: { page, limit: entriesPerPage, search: currentSearch },
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status) {
        setData(res.data.data || [])
        setTotalPages(res.data.pagination?.totalPages || 1)
        setTotalEntries(res.data.pagination?.total || 0)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents(currentPage, search)
  }, [currentPage])

  const handleSearch = () => {
    setCurrentPage(1)
    fetchStudents(1, search)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleAddStudentDone = (student) => {
    setShowAddModal(false)
    fetchStudents()
    setAssignTarget(student)
  }

  const handleAssignClose = (didSave) => {
    setAssignTarget(null)
    if (didSave) fetchStudents()
  }

  const startIndex = (currentPage - 1) * entriesPerPage

  return (
    <div className="h-full animate-fade-in-up">
      <CardHeader title="LMS — Students" className="rounded-2xl mb-5">
        <ThemeButton variant="white-add" onClick={() => setShowAddModal(true)}>
          + Add Student
        </ThemeButton>
      </CardHeader>

      <div className="bg-[#f6f6ff] rounded-2xl shadow-md border border-slate-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-end bg-[#eef2f6]/50">
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Name, mobile, or email"
              className="border border-slate-300 bg-[#f6f6ff] text-slate-700 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 w-64"
            />
          </div>
          <div className="flex gap-2">
            <ThemeButton onClick={handleSearch} variant="solid-green">Search</ThemeButton>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="overflow-auto border border-slate-200 rounded-t-lg flex-1">
            <table className="w-full text-left text-sm text-slate-800">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 whitespace-nowrap">S.No.</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 whitespace-nowrap">Student Name</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 whitespace-nowrap">Contact No.</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 whitespace-nowrap">Email</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 whitespace-nowrap">Joined On</th>
                  <th className="px-4 py-3 font-bold whitespace-nowrap">Assign Courses</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" className="text-center py-6">Loading data...</td></tr>
                ) : data.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-6">No students found.</td></tr>
                ) : (
                  data.map((row, index) => (
                    <tr key={row._id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-4 py-3 border-r border-slate-200 align-middle">{startIndex + index + 1}</td>
                      <td className="px-4 py-3 border-r border-slate-200 align-middle">
                        {(row.c_display_name || `${row.c_first_name || ''} ${row.c_last_name || ''}`).trim() || 'N/A'}
                      </td>
                      <td className="px-4 py-3 border-r border-slate-200 align-middle">{row.c_contact || 'N/A'}</td>
                      <td className="px-4 py-3 border-r border-slate-200 align-middle">{row.c_email || 'N/A'}</td>
                      <td className="px-4 py-3 border-r border-slate-200 align-middle">
                        {row.c_register_date ? new Date(row.c_register_date).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <button
                          onClick={() => setAssignTarget(row)}
                          className="bg-[#6366f1] text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-[#4f46e5] transition-colors inline-flex items-center gap-1.5"
                        >
                          <BookOpen size={14} /> Assign Courses
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && totalEntries > 0 && (
            <div className="mt-4 flex justify-between items-center text-sm text-slate-800">
              <div>
                Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, totalEntries)} of {totalEntries} entries
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 border rounded ${currentPage === 1 ? 'text-slate-400 border-slate-200' : 'text-slate-800 border-slate-300 hover:bg-slate-50'}`}
                >
                  Previous
                </button>
                <span className="px-3">{currentPage} / {totalPages}</span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className={`px-3 py-1 border rounded ${currentPage >= totalPages ? 'text-slate-400 border-slate-200' : 'text-slate-800 border-slate-300 hover:bg-slate-50'}`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <AddStudentModal onClose={() => setShowAddModal(false)} onDone={handleAddStudentDone} />
      )}
      {assignTarget && (
        <AssignCoursesModal student={assignTarget} onClose={handleAssignClose} />
      )}
    </div>
  )
}
