import * as Icons from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function AddCourseTopic() {
  const navigate = useNavigate()
  const { subjectId } = useParams()
  const location = useLocation()
  
  const editTopic = location.state?.editTopic
  const isEditing = !!editTopic
  const courseId = location.state?.courseId || localStorage.getItem('currentCourseId')

  console.log("COURSE ID RECEIVED:", courseId)

  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    ml_subject: editTopic?.ml_subject || subjectId || '',
    ml_title: editTopic?.ml_title || '',
    ml_code: editTopic?.ml_code || '',
    ml_type: editTopic?.ml_type || '',
    ml_stype: editTopic?.ml_stype || '',
    ml_video_id: editTopic?.ml_video_id || '',
    ml_status: editTopic?.ml_status !== undefined ? editTopic.ml_status.toString() : '1'
  })

 useEffect(() => {
  console.log("COURSE ID FOR SUBJECT API:", courseId)

  if (courseId) {
    fetchSubjects()
  }
}, [courseId])
  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem('token')
      console.log(
  "SUBJECT API URL:",
  
  `${BASE_URL}/myadmin/subject/subject-dropdown?m_course_id=${courseId}`
)
      const response = await axios.get(`${BASE_URL}/myadmin/subject/subject-dropdown?m_course_id=${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log("SUBJECT API RESPONSE:", response.data)

      if (response.data?.status) {
        setSubjects(response.data.data || [])
        console.log("SUBJECTS LOADED:", response.data.data)
      }
    } catch (error) {
      console.error('Error fetching subjects:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!isEditing && !formData.ml_subject) {
        alert("Please select a Topic Subject before submitting")
        setLoading(false)
        return
      }

      const token = localStorage.getItem('token')
      
      const payload = new FormData()
      
      payload.append('ml_title', formData.ml_title || '')
      payload.append('ml_code', formData.ml_code || '')
      payload.append('ml_type', formData.ml_type || '')
      payload.append('ml_stype', formData.ml_stype || '')
      payload.append('ml_video_id', formData.ml_video_id || '')
      if (formData.ml_file) {
        payload.append('ml_file', formData.ml_file)
      }
      if (formData.ml_pdffile) {
        payload.append('ml_pdffile', formData.ml_pdffile)
      }
      payload.append('ml_status', formData.ml_status ? String(formData.ml_status) : '0')
      
      if (!isEditing) {
        payload.append('ml_subject', formData.ml_subject || '')
      }

      console.log("Submitting payload:");
      for (let pair of payload.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      console.log('FORM DATA:', formData)
      console.log("SUBJECT VALUE:", formData.ml_subject)
      console.log("SUBJECTS ARRAY:", subjects)
      let response
      if (isEditing) {
        response = await axios.put(`${BASE_URL}/myadmin/topics/update-topic/${editTopic._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        response = await axios.post(`${BASE_URL}/myadmin/topics/add-topic`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }

      console.log('TOPIC RESPONSE:', response.data)

      if (response.data?.status) {
        alert(response.data.message || 'Saved successfully')
        navigate(-1)
      } else {
        alert(response.data.message || 'Operation failed')
      }
    } catch (error) {
      console.error('Error saving topic:', error)
      if (error.response) {
        console.log("BACKEND ERROR:", JSON.stringify(error.response.data, null, 2))
      }
      alert(error.response?.data?.message || 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full animate-fade-in-up flex flex-col">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] border border-slate-100 flex-1 overflow-hidden flex flex-col transition-shadow">
        
        {/* Header */}
        <div className="bg-[#144f36] rounded-t-2xl p-5 flex justify-between items-center shadow-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white dark:bg-[#13111c]/10 rounded-full blur-2xl group-hover:bg-white dark:bg-[#13111c]/20 transition-all duration-700 pointer-events-none"></div>
          
          <div className="flex items-center relative z-10">
            <div className="w-1.5 h-7 bg-white dark:bg-[#13111c]/90 rounded-full mr-4 shadow-[0_0_12px_rgba(255,255,255,0.9)] hidden sm:block"></div>
            <h2 className="text-white font-bold tracking-wide text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
              {isEditing ? 'Edit Topic' : 'Add New Topic'}
            </h2>
          </div>

          <div className="relative z-10">
            <button onClick={() => navigate(-1)} className="bg-white hover:bg-slate-50 text-[#144f36] px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5">
              Back To Topics
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50 dark:bg-[#1f1b2e]/50">
          <div className="w-full bg-white dark:bg-[#13111c] p-8 rounded-xl border border-slate-200 dark:border-[#1f1b2e] shadow-sm">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <div className="lg:col-span-2">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b pb-2 mb-4">Topic Details</h3>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Topic Subject</label>
                <select 
                  name="ml_subject"
                  value={formData.ml_subject}
                  onChange={handleChange}
                  className="w-full border border-slate-300 dark:border-[#1f1b2e] rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 bg-slate-50 dark:bg-[#1f1b2e]/50 shadow-sm transition-colors"
                  disabled={isEditing}
                >
                  <option value="">Select Subject</option>
                  {subjects.map(s => (
                    <option key={s._id} value={s._id}>{s.m_subject_title}</option>
                  ))}
                  {/* Fallback if subjects not loaded but we have subjectId */}
                  {subjects.length === 0 && subjectId && (
                    <option value={subjectId}>Current Subject</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Select Type</label>
                <select name="ml_stype" value={formData.ml_stype} onChange={handleChange} className="w-full border border-slate-300 dark:border-[#1f1b2e] rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 bg-slate-50 dark:bg-[#1f1b2e]/50 shadow-sm transition-colors">
                  <option value="">Select</option>
                  <option value="Topic">Topic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Topic Title</label>
                <input 
                  type="text" 
                  name="ml_title"
                  value={formData.ml_title}
                  onChange={handleChange}
                  placeholder="Enter Topic Title" 
                  className="w-full border-2 border-fuchsia-400 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-fuchsia-200 bg-white dark:bg-[#13111c] shadow-sm transition-all" 
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Topic Code</label>
                <input 
                  type="text" 
                  name="ml_code"
                  value={formData.ml_code}
                  onChange={handleChange}
                  placeholder="Enter Topic Code" 
                  className="w-full border border-slate-300 dark:border-[#1f1b2e] rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 bg-white dark:bg-[#13111c] shadow-sm transition-colors" 
                />
              </div>

              <div className="flex flex-col justify-center gap-2">
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">Status</label>
                <div className="flex items-center gap-6 bg-slate-50 dark:bg-[#1f1b2e]/50 p-3 rounded-lg border border-slate-200 dark:border-[#1f1b2e] w-fit">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="ml_status" value="1" checked={formData.ml_status === '1'} onChange={handleChange} className="w-4 h-4 text-[#428bca] focus:ring-[#428bca]" />
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="ml_status" value="0" checked={formData.ml_status === '0'} onChange={handleChange} className="w-4 h-4 text-[#428bca] focus:ring-[#428bca]" />
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Inactive</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Topic Type</label>
                <select name="ml_type" value={formData.ml_type} onChange={handleChange} className="w-full border border-slate-300 dark:border-[#1f1b2e] rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 bg-slate-50 dark:bg-[#1f1b2e]/50 shadow-sm transition-colors">
                  <option value="">Select Topic Type</option>
                  <option value="1">Video</option>
                  <option value="2">Document</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Topic Video ID (if Video)</label>
                <input 
                  type="text" 
                  name="ml_video_id"
                  value={formData.ml_video_id}
                  onChange={handleChange}
                  placeholder="Enter Video ID" 
                  className="w-full border border-slate-300 dark:border-[#1f1b2e] rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 bg-white dark:bg-[#13111c] shadow-sm transition-colors" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Topic File
                </label>

                <input
                  type="file"
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      ml_file: e.target.files[0]
                    }))
                  }
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Topic PDF
                </label>

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      ml_pdffile: e.target.files[0]
                    }))
                  }
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5"
                />
              </div>

              <div className="lg:col-span-2 pt-6 mt-4 border-t border-slate-200 dark:border-[#1f1b2e] flex justify-end gap-4">
                <button type="button" onClick={() => navigate(-1)} className="bg-white dark:bg-[#13111c] border border-slate-300 dark:border-[#1f1b2e] text-slate-700 dark:text-slate-300 px-8 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-50 dark:bg-[#1f1b2e]/50 transition-colors shadow-sm">
                  Cancel
                </button>
                
                <button type="submit" disabled={loading} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-2.5 rounded-lg text-sm font-bold hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70">
                  {loading ? 'Submitting...' : 'Submit Topic'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
