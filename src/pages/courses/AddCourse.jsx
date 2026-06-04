import * as Icons from 'lucide-react';
import Button from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function AddCourse() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [bannerFile, setBannerFile] = useState(null)

  useEffect(() => {
  const fetchCats = async () => {
    try {
      const token = localStorage.getItem('token')

      const response = await axios.get(
  `${BASE_URL}/myadmin/course/categories-dropdown`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)

      if (response.data.status) {
        setCategories(response.data.data)
      }
    } catch (err) {
      console.error('Failed to load categories', err)
    }
  }

  fetchCats()
}, [])
  const handleSubmit = async () => {
  setLoading(true)

  try {
    const token = localStorage.getItem('token')

    const payload = new FormData()
    payload.append('m_course_lang', 1)
    payload.append('m_course_title', document.getElementById('course_title').value)
    payload.append('m_course_category', document.getElementById('course_category').value)
    payload.append('m_course_status', document.getElementById('course_status_app').value === 'Active' ? 1 : 0)
    payload.append('m_course_status_web', document.getElementById('course_status_web').value === 'Active' ? 1 : 0)
    payload.append('m_course_popular', document.getElementById('course_popular').checked ? 1 : 0)
    payload.append('m_course_recomended', document.getElementById('course_recommended').checked ? 1 : 0)

    if (bannerFile) {
      payload.append('m_course_banner', bannerFile)
    }

    console.log('ADD COURSE PAYLOAD:', payload)

    const response = await axios.post(
      `${BASE_URL}/myadmin/course/add-course`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    console.log('ADD COURSE RESPONSE:', response.data)

    if (response.data?.status) {
      alert(response.data.message || 'Course added successfully')
      navigate('/courses/all')
    } else {
      alert('Failed to add course')
    }
  } catch (error) {
    console.error('ADD COURSE ERROR:', error)

    if (error.response) {
      console.log(error.response.data)
      alert(error.response.data?.message || 'API Error')
    } else {
      alert('Network Error')
    }
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-[#eaf3f8] p-4 font-sans">
      <div className="bg-white rounded shadow-sm border border-slate-200 max-w-7xl mx-auto">
        <div className="p-3 border-b border-slate-200 flex justify-between items-center bg-[#f8fafd]">
          <h2 className="text-slate-700 font-medium">Add New Course</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => navigate('/courses/all')}
              className="bg-[#144f36] text-white px-4 py-1 rounded text-sm hover:bg-[#0f3d2a] transition-colors"
            >
              ↩ Back
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Language</label>
              <select className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white outline-none">
                <option>English</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Category</label>
              <select id="course_category" className="w-full border border-fuchsia-400 rounded px-3 py-1.5 text-sm bg-white outline-none">
                <option value="">- - - Select - - -</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.m_category_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Title</label>
              <input 
                id="course_title"
                type="text" 
                placeholder="Course Title"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Code</label>
              <input 
                type="text" 
                placeholder="Course Code"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Demo Video Link(Youtube Video Main Link/Url)</label>
              <input 
                type="text" 
                placeholder="eg. https://www.youtube.com/watch?v=Edsxf_NBFrw"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Type</label>
              <select className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white outline-none focus:border-[#144f36]">
                <option>Select Type</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Enter Course Keywords</label>
              <input 
                type="text" 
                placeholder="Course Keyword"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Duration - In App (In Days)</label>
              <input 
                type="text" 
                placeholder="Course Duration In App"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Duration - In Web (In Days)</label>
              <input 
                type="text" 
                placeholder="Course Duration In Web"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Status In App</label>
              <select id="course_status_app" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white outline-none focus:border-[#144f36]">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Status In Web</label>
              <select id="course_status_web" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white outline-none focus:border-[#144f36]">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Order</label>
              <input 
                type="text" 
                placeholder="Course Order"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course No Of Views</label>
              <input 
                type="text" 
                defaultValue="0"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course No Of Reviews</label>
              <input 
                type="text" 
                defaultValue="0"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course No Of Ratings</label>
              <input 
                type="text" 
                defaultValue="0"
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-2">Add to</label>
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-2 text-xs text-slate-800 font-bold">
                  <input id="course_popular" type="checkbox" className="rounded" />
                  Add to popular course
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-800 font-bold">
                  <input id="course_recommended" type="checkbox" className="rounded" />
                  Add to recommended course
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-800 font-bold">
                  <input type="checkbox" className="rounded" />
                  Is Certificate Show
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-800 font-bold">
                  <input type="checkbox" className="rounded" />
                  Is Live Class Show
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Image ( Thumbnail)(800px X 450px)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setBannerFile(e.target.files[0])}
                className="w-full border border-slate-300 rounded px-3 py-1 text-sm outline-none bg-white focus:border-[#144f36]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course PDF</label>
              <button className="bg-[#144f36] text-white px-4 py-2 rounded text-sm w-full flex items-center justify-center gap-2 hover:bg-[#0f3d2a]">
                <span>📷</span> Course PDF
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-[13px] font-bold text-slate-800 mb-1">Fee Structure</label>
                <div className="border border-slate-300 p-[1px] rounded bg-white flex items-center w-64">
                  <button className="bg-[#e9ecef] border border-slate-300 text-slate-700 px-3 py-0.5 rounded-sm text-xs mr-2">Choose file</button>
                  <span className="text-xs text-slate-500">No file chosen</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[13px] font-bold text-slate-800 whitespace-nowrap">Course Instructor</label>
                <input type="text" className="border border-slate-300 rounded px-2 py-0.5 text-sm outline-none w-32" />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Intro</label>
            <textarea 
              rows="3"
              placeholder="Enter Course Intro"
              className="w-1/2 border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36]"
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Description</label>
            <div className="border border-slate-300 rounded min-h-[300px] flex flex-col relative">
              <div className="p-3">
                <p className="text-slate-400 text-sm italic">Enter Course Description</p>
              </div>
              <div className="mt-auto border-t border-slate-200 p-2 flex justify-between text-xs text-slate-500 bg-slate-50 rounded-b">
                <div className="flex gap-4">
                  <span>File</span>
                  <span>Edit</span>
                  <span>View</span>
                  <span>Insert</span>
                  <span>Format</span>
                  <span>Tools</span>
                  <span>Table</span>
                </div>
                <div className="text-orange-500 font-semibold flex items-center gap-1">
                  <span>⚡</span> Upgrade
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4 mt-8">
            <button 
              onClick={() => navigate('/courses/all')}
              className="px-6 py-1.5 border border-slate-300 text-slate-600 rounded text-sm hover:bg-slate-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-1.5 bg-[#144f36] text-white rounded text-sm hover:bg-[#0f3d2a] disabled:opacity-70"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
