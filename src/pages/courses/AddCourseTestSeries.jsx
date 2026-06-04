import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function AddCourseTestSeries() {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()

  const editPackage = location.state?.editPackage
  const isEditing = !!editPackage

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    m_package_title: editPackage?.m_package_title || '',
    m_package_language: editPackage?.m_package_language || '',
    m_package_status: editPackage?.m_package_status !== undefined ? editPackage.m_package_status.toString() : '1',
    m_package_order: editPackage?.m_package_order || '',
    m_package_intro: editPackage?.m_package_intro || '',
    m_package_description: editPackage?.m_package_description || '',
  })
  const [imageFile, setImageFile] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')

      const payload = new FormData()
      payload.append('m_package_course', id)
      payload.append('m_package_title', formData.m_package_title)
      payload.append('m_package_language', formData.m_package_language)
      payload.append('m_package_status', formData.m_package_status)
      if (formData.m_package_order) {
        payload.append('m_package_order', formData.m_package_order)
      }
      if (formData.m_package_intro) {
        payload.append('m_package_intro', formData.m_package_intro)
      }
      if (formData.m_package_description) {
        payload.append('m_package_description', formData.m_package_description)
      }
      if (imageFile) {
        payload.append('m_package_image', imageFile)
      }

      let response
      if (isEditing) {
        response = await axios.put(
          `${BASE_URL}/myadmin/test-package/update-package/${editPackage._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      } else {
        response = await axios.post(
          `${BASE_URL}/myadmin/test-package/add-package`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      }

      console.log('API RESPONSE:', response.data)

      if (response.data?.status) {
        alert(response.data.message || (isEditing ? 'Updated successfully!' : 'Package added successfully!'))
        navigate(`/courses/test-series/${id}`)
      } else {
        alert(response.data.message || 'Operation failed')
      }
    } catch (error) {
      console.error('Error saving package:', error)
      if (error.response) {
        console.log('BACKEND ERROR:', JSON.stringify(error.response.data, null, 2))
      }
      alert(error.response?.data?.message || 'Save failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden max-w-6xl mx-auto">
        <div className="p-4 flex justify-between items-center flex-wrap gap-4 bg-[#144f36] text-white rounded-t-2xl">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            {isEditing ? 'Edit Package' : 'Add New Package'} - Course
          </h2>
          <button 
            onClick={() => navigate(`/courses/test-series/${id}`)}
            className="bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/20 transition-colors flex items-center gap-1 border border-white/30"
          >
            <span>↩ Back</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                Package Title<span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="m_package_title"
                value={formData.m_package_title}
                onChange={handleChange}
                placeholder="Package Title"
                className="w-full border border-slate-300 bg-white text-slate-700 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                Language<span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="m_package_language"
                value={formData.m_package_language}
                onChange={handleChange}
                placeholder="Enter Language"
                className="w-full border border-slate-300 bg-white text-slate-700 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Package Status</label>
              <select 
                name="m_package_status"
                value={formData.m_package_status}
                onChange={handleChange}
                className="w-full border border-slate-300 bg-white text-slate-700 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Package Image (512px X 512px)</label>
              <div className="relative">
                <input 
                  type="file" 
                  className="hidden" 
                  id="package-image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label 
                  htmlFor="package-image"
                  className="w-full bg-[#144f36] hover:bg-[#0f3d2a] text-white text-sm font-medium rounded px-3 py-2 text-center cursor-pointer flex items-center justify-center gap-2 transition-colors"
                >
                  📷 {imageFile ? imageFile.name : 'Choose Image'}
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Order</label>
              <input 
                type="number" 
                name="m_package_order"
                value={formData.m_package_order}
                onChange={handleChange}
                placeholder="Enter Package Order"
                className="w-full border border-slate-300 bg-white text-slate-700 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Package Intro</label>
              <textarea 
                name="m_package_intro"
                value={formData.m_package_intro}
                onChange={handleChange}
                placeholder="Enter Package Intro"
                rows={4}
                className="w-full border border-slate-300 bg-white text-slate-700 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] resize-none"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Package Description</label>
              <textarea 
                name="m_package_description"
                value={formData.m_package_description}
                onChange={handleChange}
                placeholder="Enter Package Description"
                rows={4}
                className="w-full border border-slate-300 bg-white text-slate-700 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] resize-none"
              ></textarea>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#144f36] text-white px-8 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0f3d2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : (isEditing ? 'Update Package' : 'Submit')}
            </button>
            <button 
              type="button"
              onClick={() => navigate(`/courses/test-series/${id}`)}
              className="flex-1 bg-[#d87025] text-white px-8 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#b55d1f] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
