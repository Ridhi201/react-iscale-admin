import * as Icons from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function EditCourse() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  
  const [formData, setFormData] = useState({
    m_course_lang: 1,
    m_course_title: '',
    m_course_category: '',
    m_course_type: 2,
    m_course_price: '',
    m_course_offer_price: '',
    m_course_status: 1,
    m_course_status_web: 1,
    m_course_popular: 0,
    m_course_recomended: 0,
    m_course_description: ''
  })

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${BASE_URL}/myadmin/course/categories-dropdown`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (response.data.status) {
          setCategories(response.data.data)
        }
      } catch (err) {
        console.error("Failed to load categories", err)
      }
    }
    fetchCats()
  }, [])

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('token')
        // We will fetch from all-courses and find the ID as a fallback
        const response = await axios.get(
          `${BASE_URL}/myadmin/course/all-courses?search=&limit=500&page=1&category=`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (response.data && response.data.status) {
          const courses = response.data.data || []
          const course = courses.find(c => c._id === id)
          
          if (course) {
            setFormData({
              m_course_lang: course.m_course_lang || 1,
              m_course_title: course.title || '',
              m_course_category: course.categoryId || '', // categoryId might need to be resolved
              m_course_type: course.m_course_type || 2,
              m_course_price: course.price || 0,
              m_course_offer_price: course.offer_price || 0,
              m_course_status: course.status === 'Active' ? 1 : 0,
              m_course_status_web: 1, // default 
              m_course_popular: 0,
              m_course_recomended: 0,
              m_course_description: ''
            })
          }
        }
      } catch (error) {
        console.error("Failed to fetch course details:", error)
      }
    }
    fetchCourse()
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const token = localStorage.getItem('token')
    
    try {
      const payload = {
  m_course_lang: Number(formData.m_course_lang),
  m_course_title: formData.m_course_title,
  m_course_status: Number(formData.m_course_status),
  m_course_status_web: Number(formData.m_course_status_web),
  m_course_popular: Number(formData.m_course_popular),
  m_course_category: formData.m_course_category,
  m_course_description: formData.m_course_description,
  m_course_type: Number(formData.m_course_type),
  m_course_price: Number(formData.m_course_price),
  m_course_offer_price: Number(formData.m_course_offer_price),
  m_course_recomended: Number(formData.m_course_recomended),
}

console.log("UPDATE COURSE PAYLOAD:", payload)
      
     const res = await axios.put(
  `${BASE_URL}/myadmin/course/update-course/${id}`,
  payload,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)

console.log("UPDATE COURSE RESPONSE:", res.data)

if (res.data?.status) {
  alert(res.data.message || "Course updated successfully")
  navigate('/courses/all')
}
    } catch (error) {
      console.error("Failed to update course:", error)
      alert("Failed to update course")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden max-w-6xl mx-auto">
        <div className="p-4 flex justify-between items-center flex-wrap gap-4 bg-[#144f36] text-white rounded-t-2xl">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">Edit Course</h2>
          <button 
            onClick={() => navigate('/courses/all')}
            className="bg-[#144f36] text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#0f3d2a] transition-colors flex items-center gap-1"
          >
            <span>↩ Back</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Course Language</label>
              <select name="m_course_lang" value={formData.m_course_lang} onChange={handleChange} className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
                <option value={1}>English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Course Category</label>
              <select name="m_course_category" value={formData.m_course_category} onChange={handleChange} className="w-full border border-fuchsia-500 rounded px-3 py-2 text-sm outline-none bg-white dark:bg-[#13111c]">
                <option value="">- - - Select - - -</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.m_category_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Course Title</label>
              <input 
                name="m_course_title"
                value={formData.m_course_title}
                onChange={handleChange}
                type="text" 
                placeholder="Course Title"
                className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Course Price</label>
              <input 
                name="m_course_price"
                value={formData.m_course_price}
                onChange={handleChange}
                type="number" 
                placeholder="Course Price"
                className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Course Offer Price</label>
              <input 
                name="m_course_offer_price"
                value={formData.m_course_offer_price}
                onChange={handleChange}
                type="number" 
                placeholder="Offer Price"
                className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Course Type</label>
              <select name="m_course_type" value={formData.m_course_type} onChange={handleChange} className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
                <option value={2}>Paid</option>
                <option value={1}>Free</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Course Status In App</label>
              <select name="m_course_status" value={formData.m_course_status} onChange={handleChange} className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Course Status In Web</label>
              <select name="m_course_status_web" value={formData.m_course_status_web} onChange={handleChange} className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Add to</label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <input name="m_course_popular" checked={formData.m_course_popular === 1} onChange={handleChange} type="checkbox" className="rounded border-slate-300 dark:border-[#1f1b2e]" />
                  Add to popular course
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <input name="m_course_recomended" checked={formData.m_course_recomended === 1} onChange={handleChange} type="checkbox" className="rounded border-slate-300 dark:border-[#1f1b2e]" />
                  Add to recomended course
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              type="submit"
              disabled={loading}
              className="bg-[#144f36] text-white px-8 py-2 rounded-lg text-sm font-medium hover:bg-[#0f3d2a] transition-colors disabled:opacity-70"
            >
              {loading ? 'Submitting...' : 'Update Course'}
            </button>
            <button 
              type="button"
              onClick={() => navigate('/courses/all')}
              className="bg-[#144f36] text-white px-8 py-2 rounded-lg text-sm font-medium hover:bg-[#0f3d2a] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
