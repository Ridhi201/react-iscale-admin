import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function EditInstructor() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    m_instructor_name: '',
    m_instructor_email: '',
    m_instructor_phone: '',
    m_instructor_skills: '',
    m_instructor_status: '1',
    m_linkedin_profile: ''
  })

  useEffect(() => {
    // Fetch all instructors and find the one we need since get-instructor/:id was not provided
    const fetchInstructor = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(
          `${BASE_URL}/myadmin/instructor/get-all-instructors`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        
        if (response.data && response.data.status) {
          const allInst = response.data.data || []
          const inst = allInst.find(i => i._id === id)
          
          if (inst) {
            setFormData({
              m_instructor_name: inst.m_instructor_name || '',
              m_instructor_email: inst.m_instructor_email || '',
              m_instructor_phone: inst.m_instructor_phone || '',
              m_instructor_skills: Array.isArray(inst.m_instructor_skills) ? inst.m_instructor_skills.join(', ') : '',
              m_instructor_status: inst.m_instructor_status !== undefined ? inst.m_instructor_status.toString() : '1',
              m_linkedin_profile: inst.m_linkedin_profile || ''
            })
          }
        }
      } catch (error) {
        console.error("Failed to fetch instructor:", error)
      }
    }
    fetchInstructor()
  }, [id])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      
      const payload = {
        ...formData,
        m_instructor_skills: formData.m_instructor_skills.split(',').map(s => s.trim()).filter(Boolean)
      }

      const response = await axios.put(
        `${BASE_URL}/myadmin/instructor/update-instructor/${id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.data && response.data.status) {
        navigate('/instructors/all')
      } else {
        alert(response.data.message || 'Failed to update instructor')
      }
    } catch (error) {
      console.error('Submit failed:', error)
      alert('Failed to update instructor. Please check console.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 flex justify-between items-center bg-[#f6f6ff] dark:bg-[#1f1b2e]">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Edit Instructor</h2>
          <button 
            onClick={() => navigate('/instructors/all')}
            className="bg-[#428bca] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#3071a9] transition-colors"
          >
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Name</label>
              <input 
                type="text" 
                name="m_instructor_name"
                value={formData.m_instructor_name}
                onChange={handleChange}
                placeholder="Instructor Name"
                required
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Email</label>
              <input 
                type="email" 
                name="m_instructor_email"
                value={formData.m_instructor_email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Phone</label>
              <input 
                type="text" 
                name="m_instructor_phone"
                value={formData.m_instructor_phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Skills (comma separated)</label>
              <input 
                type="text" 
                name="m_instructor_skills"
                value={formData.m_instructor_skills}
                onChange={handleChange}
                placeholder="e.g. reactjs, nodejs"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Linkedin Url</label>
              <input 
                type="text" 
                name="m_linkedin_profile"
                value={formData.m_linkedin_profile}
                onChange={handleChange}
                placeholder="Linkedin URL"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Status</label>
              <select 
                name="m_instructor_status"
                value={formData.m_instructor_status}
                onChange={handleChange}
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={loading}
              className="bg-[#428bca] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#3071a9] transition-colors w-64 text-center disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Instructor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
