import { useState, useEffect, useRef } from 'react'
import { X, UserPlus, Search, UserCheck } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

// Two-step "Add Student" flow: first choose whether this is an existing
// iScale student (search + pick, no account created) or a brand new one
// (minimal create form, no password needed for the mobile app's OTP login).
// Calls onDone(student) once a student is ready to move on to course
// assignment, or onClose() to dismiss without doing anything.
export default function AddStudentModal({ onClose, onDone }) {
  const [mode, setMode] = useState(null) // null | 'existing' | 'new'

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
        <div className="bg-[#144f36] p-5 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-white font-bold text-xl">Add Student</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {!mode && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setMode('existing')}
                className="flex flex-col items-center gap-3 border-2 border-slate-200 rounded-xl p-6 hover:border-[#144f36] hover:bg-[#144f36]/5 transition-colors text-center"
              >
                <UserCheck size={32} className="text-[#144f36]" />
                <div>
                  <div className="font-bold text-slate-800">Existing iScale Student</div>
                  <div className="text-xs text-slate-500 mt-1">Already enrolled/registered — search and pick their account.</div>
                </div>
              </button>
              <button
                onClick={() => setMode('new')}
                className="flex flex-col items-center gap-3 border-2 border-slate-200 rounded-xl p-6 hover:border-[#144f36] hover:bg-[#144f36]/5 transition-colors text-center"
              >
                <UserPlus size={32} className="text-[#144f36]" />
                <div>
                  <div className="font-bold text-slate-800">New Student</div>
                  <div className="text-xs text-slate-500 mt-1">Not registered yet — create a fresh account for them.</div>
                </div>
              </button>
            </div>
          )}

          {mode === 'existing' && (
            <ExistingStudentPicker onBack={() => setMode(null)} onDone={onDone} />
          )}

          {mode === 'new' && (
            <NewStudentForm onBack={() => setMode(null)} onDone={onDone} />
          )}
        </div>
      </div>
    </div>
  )
}

function ExistingStudentPicker({ onBack, onDone }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    clearTimeout(debounceRef.current)
    if (!query.trim()) {
      setResults([])
      setSearched(false)
      return
    }
    debounceRef.current = setTimeout(() => runSearch(query.trim()), 350)
    return () => clearTimeout(debounceRef.current)
  }, [query])

  const runSearch = async (keyword) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/app-users/all`, {
        params: { search: keyword, page: 1, limit: 20 },
        headers: { Authorization: `Bearer ${token}` }
      })
      setResults(res.data?.status ? (res.data.data || []) : [])
      setSearched(true)
    } catch (err) {
      setResults([])
      setSearched(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={onBack} className="text-xs text-slate-500 hover:text-[#144f36] mb-4">&larr; Back</button>
      <label className="block text-sm font-bold text-slate-700 mb-1">Search by name, mobile, or email</label>
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Start typing to search..."
          autoFocus
          className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]"
        />
      </div>

      <div className="max-h-72 overflow-y-auto border border-slate-200 rounded-lg divide-y divide-slate-100">
        {loading ? (
          <div className="p-4 text-center text-sm text-slate-400">Searching...</div>
        ) : searched && results.length === 0 ? (
          <div className="p-4 text-center text-sm text-slate-400">No matching students found.</div>
        ) : !searched ? (
          <div className="p-4 text-center text-sm text-slate-400">Type to search existing students.</div>
        ) : (
          results.map((row) => {
            const name = (row.c_display_name || `${row.c_first_name || ''} ${row.c_last_name || ''}`).trim() || 'N/A'
            return (
              <button
                key={row._id}
                onClick={() => onDone(row)}
                className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-sm font-bold text-slate-800 truncate">{name}</div>
                  <div className="text-xs text-slate-500">{row.c_contact || 'No phone'} {row.c_email ? `· ${row.c_email}` : ''}</div>
                </div>
                <span className="text-xs font-medium text-[#144f36] shrink-0">Select &rarr;</span>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}

function NewStudentForm({ onBack, onDone }) {
  const [formData, setFormData] = useState({ fname: '', lname: '', mobile: '', email: '', gender: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(`${BASE_URL}/myadmin/app-users/add`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status) {
        onDone(res.data.data)
      } else {
        await window.customAlert(res.data?.message || 'Failed to add student')
      }
    } catch (err) {
      await window.customAlert(err.response?.data?.message || 'Error adding student')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={onBack} className="text-xs text-slate-500 hover:text-[#144f36] mb-4">&larr; Back</button>
      <p className="text-sm text-slate-500 mb-5">
        No password is needed — once added, this student can log into the iScale mobile app with just their mobile number and an OTP.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">First Name <span className="text-red-500">*</span></label>
          <input type="text" name="fname" value={formData.fname} onChange={handleChange} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]" required />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Last Name</label>
          <input type="text" name="lname" value={formData.lname} onChange={handleChange} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Mobile Number <span className="text-red-500">*</span></label>
          <input type="text" name="mobile" maxLength={10} value={formData.mobile} onChange={handleChange} placeholder="10-digit mobile number" className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]" required />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button type="button" onClick={onBack} className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-5 py-2.5 bg-[#144f36] text-white rounded-lg hover:bg-[#0f3d2a] transition-colors font-medium text-sm disabled:opacity-60">
          {loading ? 'Adding...' : 'Add Student'}
        </button>
      </div>
    </form>
  )
}
