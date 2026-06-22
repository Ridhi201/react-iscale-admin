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
    ml_stype: editTopic?.ml_stype || 'Topic',
    ml_video_id: editTopic?.ml_video_id || '',
    ml_status: editTopic?.ml_status !== undefined ? editTopic.ml_status.toString() : '1',
    ml_hours: editTopic?.ml_hours || '00',
    ml_minutes: editTopic?.ml_minutes || '00',
    ml_seconds: editTopic?.ml_seconds || '00',
    ml_video_type: editTopic?.ml_video_type || 'VdoCipher',
    ml_pdffile: null
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
        await window.customAlert("Please select a Topic Subject before submitting")
        setLoading(false)
        return
      }

      const token = localStorage.getItem('token')
      const payload = new FormData()
      
      payload.append('ml_title', formData.ml_title || '')
      payload.append('ml_code', formData.ml_code || '')
      let rawType = formData.ml_type || '';
      const payloadType = (rawType === 'Video' || rawType === '1') ? '1' : '2';
      
      payload.append('ml_type', payloadType);
      payload.append('ml_stype', formData.ml_stype || 'Topic');
      
      if (formData.ml_video_id) {
        payload.append('ml_video_id', formData.ml_video_id);
      }
      
      payload.append('ml_hours', formData.ml_hours || '00')
      payload.append('ml_minutes', formData.ml_minutes || '00')
      payload.append('ml_seconds', formData.ml_seconds || '00')
      payload.append('ml_video_type', formData.ml_video_type || 'VdoCipher')

      if (formData.ml_pdffile) {
        payload.append('ml_pdffile', formData.ml_pdffile);
      }
      payload.append('ml_status', formData.ml_status ? String(formData.ml_status) : '0')
      
      if (!isEditing) {
        payload.append('ml_subject', formData.ml_subject || '')
        if (courseId) {
          payload.append('m_course_id', courseId)
          payload.append('ml_course', courseId)
          payload.append('course_id', courseId)
        }
      }

      console.log("Submitting payload:");
      for (let pair of payload.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      let response
      if (isEditing) {
        response = await axios.put(`${BASE_URL}/myadmin/topics/update-topic/${editTopic._id}`, payload, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
      } else {
        response = await axios.post(`${BASE_URL}/myadmin/topics/add-topic`, payload, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
      }

      if (response.data?.status) {
        await window.customAlert(response.data.message || 'Saved successfully')
        navigate(-1)
      } else {
        await window.customAlert(response.data.message || 'Operation failed')
      }
    } catch (error) {
      console.error('Error saving topic:', error)
      await window.customAlert(error.response?.data?.message || 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#eaf3f8] p-4 sm:p-6 font-sans">
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 max-w-4xl mx-auto overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-white p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200">
          <div>
            <h2 className="text-[#1e293b] font-bold text-2xl">
              {isEditing ? 'Edit Topic' : 'Add New Topic'}
            </h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 mt-3 sm:mt-0 text-sm text-[#475569]">
            <div>
              <span className="font-semibold text-[#1e293b]">Category :</span>{' '}
              <span className="text-[#475569]">{location.state?.categoryTitle || 'Cohort Courses'}</span>
            </div>
            {location.state?.courseTitle && (
              <div>
                <span className="font-semibold text-[#1e293b]">Course :</span>{' '}
                <span className="text-[#475569]">{location.state.courseTitle}</span>
              </div>
            )}
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 bg-white">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Topic Subject */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">Topic Subject</label>
              <select 
                name="ml_subject"
                value={formData.ml_subject}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
                disabled={isEditing}
              >
                <option value="">Select Subject</option>
                {subjects.map(s => (
                  <option key={s._id} value={s._id}>{s.m_subject_title}</option>
                ))}
                {subjects.length === 0 && subjectId && (
                  <option value={subjectId}>Current Subject</option>
                )}
              </select>
            </div>

            {/* Select Type */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">Select Type</label>
              <select 
                name="ml_stype" 
                value={formData.ml_stype} 
                onChange={handleChange} 
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
              >
                <option value="Topic">Topic</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">Duration : HH</label>
                  <input 
                    type="text" 
                    name="ml_hours"
                    value={formData.ml_hours}
                    onChange={handleChange}
                    placeholder="00"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">: MM</label>
                  <input 
                    type="text" 
                    name="ml_minutes"
                    value={formData.ml_minutes}
                    onChange={handleChange}
                    placeholder="00"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">: SS</label>
                  <input 
                    type="text" 
                    name="ml_seconds"
                    value={formData.ml_seconds}
                    onChange={handleChange}
                    placeholder="00"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Topic Title */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">Topic Title</label>
              <input 
                type="text" 
                name="ml_title"
                value={formData.ml_title}
                onChange={handleChange}
                placeholder="Enter Topic Title" 
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white" 
                required 
              />
            </div>

            {/* Topic Code */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">Topic Code</label>
              <input 
                type="text" 
                name="ml_code"
                value={formData.ml_code}
                onChange={handleChange}
                placeholder="Enter Topic Code" 
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white" 
              />
            </div>

            {/* YouTube vs VdoCipher Radio Group */}
            <div className="flex items-center gap-6 py-2">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 text-sm">
                <input 
                  type="radio" 
                  name="ml_video_type" 
                  value="YouTube" 
                  checked={formData.ml_video_type === 'YouTube'} 
                  onChange={handleChange} 
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500" 
                />
                <span>YouTube</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 text-sm">
                <input 
                  type="radio" 
                  name="ml_video_type" 
                  value="VdoCipher" 
                  checked={formData.ml_video_type === 'VdoCipher'} 
                  onChange={handleChange} 
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500" 
                />
                <span>VdoCipher</span>
              </label>
            </div>

            {/* Topic Type */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">Topic Type</label>
              <select 
                name="ml_type" 
                value={formData.ml_type} 
                onChange={handleChange} 
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
              >
                <option value="">Select Topic Type</option>
                <option value="1">Video</option>
                <option value="2">Document</option>
              </select>
            </div>

            {/* Topic Video ID */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">Topic Video ID</label>
              <input 
                type="text" 
                name="ml_video_id"
                value={formData.ml_video_id}
                onChange={handleChange}
                placeholder="Enter Video ID" 
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white" 
              />
            </div>

            {/* PDF Attachment (Select PDF Button) */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">PDF Attachment</label>
              <div className="relative">
                <input
                  type="file"
                  id="pdf-upload"
                  accept=".pdf"
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      ml_pdffile: e.target.files[0]
                    }))
                  }
                  className="hidden"
                />
                <label
                  htmlFor="pdf-upload"
                  className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white text-center py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors cursor-pointer block"
                >
                  {formData.ml_pdffile ? formData.ml_pdffile.name : 'Select PDF'}
                </label>
              </div>
            </div>

            {/* Topic Status */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">Topic Status</label>
              <select 
                name="ml_status" 
                value={formData.ml_status} 
                onChange={handleChange} 
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button 
                type="submit" 
                disabled={loading}
                className="bg-[#3b82f6] hover:bg-blue-600 text-white py-2.5 rounded-lg text-sm font-bold transition-colors flex-1 shadow-sm disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
              <button 
                type="button" 
                onClick={() => navigate(-1)}
                className="bg-[#ea580c] hover:bg-orange-600 text-white py-2.5 rounded-lg text-sm font-bold transition-colors flex-1 shadow-sm"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}


