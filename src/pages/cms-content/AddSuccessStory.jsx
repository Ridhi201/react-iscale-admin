import Button from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function AddSuccessStory() {
  const navigate = useNavigate()
  const [imageFile, setImageFile] = useState(null)

  const handleSubmit = async () => {
    const name = document.getElementById('ss_name')?.value?.trim()
    const designation = document.getElementById('ss_designation')?.value?.trim()
    const linkedin = document.getElementById('ss_linkedin')?.value?.trim()
    const youtube = document.getElementById('ss_youtube')?.value?.trim()
    const placed = document.getElementById('ss_placed')?.value?.trim()
    const pkg = document.getElementById('ss_package')?.value?.trim()
    const order = document.getElementById('ss_order')?.value?.trim()
    const feedback = document.getElementById('ss_feedback')?.value?.trim()

    if (!name || !designation || !youtube || !placed || !pkg) {
      alert('Please fill all required fields')
      return
    }
    const formData = new FormData()
    formData.append('m_ss_name', name)
    formData.append('m_ss_designation', designation)
    formData.append('m_ss_linkedin', linkedin)
    formData.append('m_ss_youtube_url', youtube)
    formData.append('m_ss_placed', placed)
    formData.append('m_ss_package', pkg)
    formData.append('m_ss_order', order || '0')
    formData.append('m_ss_feedback', feedback || '')
    if (imageFile) formData.append('m_ss_image', imageFile)

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(`${BASE_URL}/myadmin/success-story/add-ss`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.data?.status) {
        alert('Success story added')
        navigate('/success-story')
      } else {
        alert(response.data?.message || 'Failed to add')
      }
    } catch (err) {
      console.error(err)
      alert('Error adding success story')
    }
  }

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden max-w-5xl">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e] flex justify-between items-center">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Add Success Story List</h2>
          <button 
            onClick={() => navigate('/success-story')}
            className="bg-[#428bca] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#3071a9] transition-colors flex items-center gap-1"
          >
            « Back
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            <div className="lg:col-span-1">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Full Name <span className="text-red-500">*</span></label>
              <input 
                id="ss_name"
                type="text" 
                placeholder="Full Name"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div className="lg:col-span-1">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Designation <span className="text-red-500">*</span></label>
              <input 
                id="ss_designation"
                type="text" 
                placeholder="Candidate Designation"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div className="lg:col-span-1">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Image <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2 mt-1">
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded file:border file:border-slate-300 dark:border-[#1f1b2e] file:bg-[#f6f6ff] file:text-slate-700 dark:text-slate-300 hover:file:bg-slate-50 dark:bg-[#1f1b2e]/50 cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">LinkedIn</label>
              <input 
                id="ss_linkedin"
                type="text" 
                placeholder="Candidate LinkedIn"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Youtube Url <span className="text-red-500">*</span></label>
              <input 
                id="ss_youtube"
                type="text" 
                placeholder="Youtube Url"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Placed At <span className="text-red-500">*</span></label>
              <input 
                id="ss_placed"
                type="text" 
                placeholder="Placed Company Name"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Package <span className="text-red-500">*</span></label>
              <input 
                id="ss_package"
                type="text" 
                placeholder="Package"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Order</label>
              <input 
                id="ss_order"
                type="text" 
                placeholder="Order"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Feedback <span className="text-red-500">*</span></label>
            <textarea 
              id="ss_feedback"
              placeholder="Candidate Feedback"
              rows={4}
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 resize-none"
            ></textarea>
          </div>

          <div className="flex gap-4">
            <Button fullWidth className="py-2" onClick={handleSubmit}>Submit</Button>
            <button 
              onClick={() => navigate('/success-story')}
              className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800 px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#152a4a] transition-colors flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
