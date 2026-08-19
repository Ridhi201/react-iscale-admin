import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

// Grants a student lifetime access to one or more LMS-flagged courses
// (see the "LMS" toggle on Courses > All Courses) - this is the admin-side
// equivalent of a purchase, skipping payment entirely.
export default function AssignCourses() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [student, setStudent] = useState(null)
  const [lmsCourses, setLmsCourses] = useState([])
  const [assignedIds, setAssignedIds] = useState(new Set())
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchAll()
  }, [id])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }

      const [studentRes, lmsRes, assignedRes] = await Promise.all([
        axios.get(`${BASE_URL}/myadmin/app-users/single/${id}`, { headers }),
        axios.get(`${BASE_URL}/myadmin/course/lms-courses`, { headers }),
        axios.get(`${BASE_URL}/myadmin/app-users/${id}/courses`, { headers }),
      ])

      if (studentRes.data?.status) setStudent(studentRes.data.data)
      if (lmsRes.data?.status) setLmsCourses(lmsRes.data.data || [])

      const currentIds = new Set(
        (assignedRes.data?.data || [])
          .filter(e => e.course_id)
          .map(e => e.course_id._id)
      )
      setAssignedIds(currentIds)
      setSelectedIds(new Set(currentIds))
    } catch (err) {
      await window.customAlert('Failed to load courses. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const toggleSelected = (courseId) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(courseId)) next.delete(courseId)
      else next.add(courseId)
      return next
    })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }

      const toAssign = [...selectedIds].filter(cid => !assignedIds.has(cid))
      const toRemove = [...assignedIds].filter(cid => !selectedIds.has(cid))

      if (toAssign.length > 0) {
        await axios.post(`${BASE_URL}/myadmin/app-users/${id}/assign-courses`, {
          course_ids: toAssign
        }, { headers })
      }

      for (const courseId of toRemove) {
        await axios.delete(`${BASE_URL}/myadmin/app-users/${id}/courses/${courseId}`, { headers })
      }

      await window.customAlert('Course access updated successfully')
      fetchAll()
    } catch (err) {
      await window.customAlert(err.response?.data?.message || 'Error updating course access')
    } finally {
      setSaving(false)
    }
  }

  const hasChanges = () => {
    if (selectedIds.size !== assignedIds.size) return true
    for (const id of selectedIds) if (!assignedIds.has(id)) return true
    return false
  }

  const studentName = student
    ? (student.c_display_name || `${student.c_first_name || ''} ${student.c_last_name || ''}`.trim() || 'Student')
    : '...'

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#144f36] rounded-2xl shadow-md border border-white/10 p-5 mb-5 flex justify-between items-center relative overflow-hidden group">
        <div>
          <h2 className="text-white font-bold tracking-wide text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">Assign Courses</h2>
          {student && <p className="text-white/70 text-sm mt-0.5">{studentName} · {student.c_contact}</p>}
        </div>
        <button onClick={() => navigate('/app-users')} className="bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/20 transition-colors flex items-center gap-1 border border-white/30">
          <span>↩ Back</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        <div className="p-6">
          {loading ? (
            <div className="py-16 text-center text-gray-400">Loading...</div>
          ) : lmsCourses.length === 0 ? (
            <div className="py-16 text-center text-gray-400 flex flex-col items-center gap-3">
              <BookOpen size={40} strokeWidth={1} />
              <p>No courses are on the LMS list yet.</p>
              <p className="text-xs">Toggle "On LMS" for a course under Courses &gt; All Courses to make it assignable here.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-500 mb-4">
                Check the courses this student should have lifetime access to. Unchecking a course removes their access to it.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {lmsCourses.map(course => {
                  const checked = selectedIds.has(course._id)
                  return (
                    <label
                      key={course._id}
                      className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-colors ${checked ? 'border-[#144f36] bg-[#144f36]/5' : 'border-slate-200 hover:bg-slate-50'}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSelected(course._id)}
                        className="w-4 h-4 accent-[#144f36]"
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-slate-800 truncate">{course.m_course_title}</div>
                        <div className="text-xs text-slate-500">{course.m_course_type === 2 ? 'Paid' : 'Free'} course</div>
                      </div>
                    </label>
                  )
                })}
              </div>
            </>
          )}

          <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-5">
            <button type="button" onClick={() => navigate('/app-users')} className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm">
              Done
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || loading || !hasChanges()}
              className="px-5 py-2.5 bg-[#144f36] text-white rounded-lg hover:bg-[#0f3d2a] transition-colors font-medium text-sm disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Course Access'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
