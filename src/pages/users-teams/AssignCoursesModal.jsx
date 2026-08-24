import { useState, useEffect } from 'react'
import { X, BookOpen } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

const daysUntil = (dateStr) => {
  if (!dateStr) return ''
  const diffMs = new Date(dateStr).getTime() - Date.now()
  const days = Math.ceil(diffMs / (24 * 60 * 60 * 1000))
  return days > 0 ? days : ''
}

// Assigns access to any course toggled "Add to lifetime courses" (Courses >
// All Courses), per-course choosing lifetime access or a fixed number of
// days from today. This is the admin-side equivalent of a purchase.
export default function AssignCoursesModal({ student, onClose }) {
  const [courses, setCourses] = useState([])
  const [assignedMap, setAssignedMap] = useState(new Map()) // courseId -> enrollment
  const [selection, setSelection] = useState(new Map()) // courseId -> { accessType, accessDays }
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchAll()
  }, [student?._id])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }

      const [lmsRes, assignedRes] = await Promise.all([
        axios.get(`${BASE_URL}/myadmin/course/lms-courses`, { headers }),
        axios.get(`${BASE_URL}/myadmin/app-users/${student._id}/courses`, { headers }),
      ])

      const lmsCourses = lmsRes.data?.status ? (lmsRes.data.data || []) : []
      setCourses(lmsCourses)

      const assigned = new Map()
      const sel = new Map()
      ;(assignedRes.data?.data || []).forEach((e) => {
        if (!e.course_id) return
        const cid = e.course_id._id
        assigned.set(cid, e)
        sel.set(cid, {
          accessType: e.access_type === 'limited' ? 'limited' : 'lifetime',
          accessDays: e.access_type === 'limited' ? String(daysUntil(e.expiry_date) || '') : '',
        })
      })
      setAssignedMap(assigned)
      setSelection(sel)
    } catch (err) {
      await window.customAlert('Failed to load courses. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const toggleCourse = (courseId) => {
    setSelection((prev) => {
      const next = new Map(prev)
      if (next.has(courseId)) {
        next.delete(courseId)
      } else {
        next.set(courseId, { accessType: 'lifetime', accessDays: '' })
      }
      return next
    })
  }

  const updateCourseConfig = (courseId, patch) => {
    setSelection((prev) => {
      const next = new Map(prev)
      const current = next.get(courseId) || { accessType: 'lifetime', accessDays: '' }
      next.set(courseId, { ...current, ...patch })
      return next
    })
  }

  const handleSave = async () => {
    for (const [, cfg] of selection) {
      if (cfg.accessType === 'limited' && !(Number(cfg.accessDays) > 0)) {
        await window.customAlert('Enter a valid number of days for every course set to "Time Period".')
        return
      }
    }

    setSaving(true)
    try {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }

      const assignments = [...selection.entries()].map(([courseId, cfg]) => ({
        course_id: courseId,
        access_type: cfg.accessType,
        access_days: cfg.accessType === 'limited' ? Number(cfg.accessDays) : undefined,
      }))

      if (assignments.length > 0) {
        await axios.post(`${BASE_URL}/myadmin/app-users/${student._id}/assign-courses`, { assignments }, { headers })
      }

      const toRemove = [...assignedMap.keys()].filter((cid) => !selection.has(cid))
      for (const courseId of toRemove) {
        await axios.delete(`${BASE_URL}/myadmin/app-users/${student._id}/courses/${courseId}`, { headers })
      }

      await window.customAlert('Course access updated successfully')
      onClose(true)
    } catch (err) {
      await window.customAlert(err.response?.data?.message || 'Error updating course access')
    } finally {
      setSaving(false)
    }
  }

  const studentName = `${student?.c_first_name || ''} ${student?.c_last_name || ''}`.trim() || student?.c_display_name || 'Student'

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto">
        <div className="bg-[#144f36] p-5 flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-white font-bold text-xl">Assign Courses</h2>
            <p className="text-white/70 text-sm mt-0.5">{studentName}{student?.c_contact ? ` · ${student.c_contact}` : ''}</p>
          </div>
          <button onClick={() => onClose(false)} className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="py-16 text-center text-gray-400">Loading...</div>
          ) : courses.length === 0 ? (
            <div className="py-16 text-center text-gray-400 flex flex-col items-center gap-3">
              <BookOpen size={40} strokeWidth={1} />
              <p>No courses are toggled as lifetime courses yet.</p>
              <p className="text-xs">Turn on "Add to lifetime courses" for a course under Courses &gt; All Courses to make it assignable here.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-500 mb-4">
                Check a course to grant access, choose lifetime or a fixed number of days. Unchecking removes their access.
              </p>
              <div className="space-y-2">
                {courses.map((course) => {
                  const cfg = selection.get(course._id)
                  const checked = !!cfg
                  return (
                    <div
                      key={course._id}
                      className={`border rounded-lg px-4 py-3 transition-colors ${checked ? 'border-[#144f36] bg-[#144f36]/5' : 'border-slate-200'}`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCourse(course._id)}
                          className="w-4 h-4 accent-[#144f36] shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-bold text-slate-800 truncate">{course.m_course_title}</div>
                          <div className="text-xs text-slate-500">{course.m_course_type === 2 ? 'Paid' : 'Free'} course</div>
                        </div>

                        {checked && (
                          <div className="flex items-center gap-2 shrink-0">
                            <select
                              value={cfg.accessType}
                              onChange={(e) => updateCourseConfig(course._id, { accessType: e.target.value })}
                              className="border border-slate-300 rounded px-2 py-1.5 text-xs outline-none focus:border-[#144f36]"
                            >
                              <option value="lifetime">Lifetime</option>
                              <option value="limited">Time Period</option>
                            </select>
                            {cfg.accessType === 'limited' && (
                              <input
                                type="number"
                                min="1"
                                placeholder="Days"
                                value={cfg.accessDays}
                                onChange={(e) => updateCourseConfig(course._id, { accessDays: e.target.value })}
                                className="w-20 border border-slate-300 rounded px-2 py-1.5 text-xs outline-none focus:border-[#144f36]"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-5">
            <button type="button" onClick={() => onClose(false)} className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm">
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || loading}
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
