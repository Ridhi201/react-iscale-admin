import { useState, useEffect } from 'react'
import { Edit2, Trash2, X } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'
import ThemeButton from '../../components/common/ThemeButton'
import CardHeader from '../../components/ui/CardHeader'

export default function StudentTestimonialList() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(50)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState('')
  const [currentVideoType, setCurrentVideoType] = useState('url') // 'url' or 'local'

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    id: null,
    m_st_url: '',
    m_st_status: '1'
  })
  const [videoFile, setVideoFile] = useState(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      setLoading(true); 
      const token = localStorage.getItem('token')
      const response = await axios.get(`${BASE_URL}/myadmin/stdtestimonial/all-stdtestimonials`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data && response.data.data) {
        setData(response.data.data)
      } else {
        setData([])
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!await window.customConfirm('Are you sure you want to delete this testimonial?')) return
    try {
      const token = localStorage.getItem('token')
      let url = `${BASE_URL}/myadmin/stdtestimonial/delete-stdtestimonial/${id}`
      const config = { headers: { Authorization: `Bearer ${token}` } }
      try {
        await axios.delete(url, config)
      } catch(e) {
        if (e.response?.status === 404) {
          await axios.delete(`${BASE_URL}/myadmin/stdtestimonial/${id}`, config)
        } else throw e
      }
      fetchTestimonials()
      if (isEditing && formData.id === id) {
        resetForm()
      }
    } catch (error) {
      console.error('Delete failed:', error)
      await window.customAlert(error.response?.data?.message || 'Failed to delete')
    }
  }

  const getField = (row, fieldNames, defaultVal = '') => {
    for (const name of fieldNames) {
      if (row[name] !== undefined && row[name] !== null) return row[name]
    }
    return defaultVal
  }

  const handleEditClick = (row) => {
    const id = row._id || row.id;
    const url = getField(row, ['url', 'm_st_url', 'video_url', 'link']);
    const statusStr = getField(row, ['status', 'm_st_status', 'is_active'], 'active');
    
    setFormData({
      id: id,
      m_st_url: url,
      m_st_status: (String(statusStr).toLowerCase() === 'active' || statusStr === 1 || String(statusStr).toLowerCase() === 'true') ? '1' : '0'
    })
    setVideoFile(null)
    setIsEditing(true)
    
    setTimeout(() => {
      const formElement = document.getElementById('testimonial-form-section')
      if (formElement) formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const resetForm = () => {
    setFormData({
      id: null,
      m_st_url: '',
      m_st_status: '1'
    })
    setVideoFile(null)
    setIsEditing(false)
    
    // Reset file input via DOM if possible, or just rely on state
    const fileInput = document.getElementById('videoFileInput')
    if (fileInput) fileInput.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem('token')
      const payload = new FormData()
      payload.append('m_st_url', formData.m_st_url)
      payload.append('m_st_status', formData.m_st_status)
      
      if (videoFile) {
        payload.append('m_st_video', videoFile)
      }

      if (isEditing) {
        await axios.put(`${BASE_URL}/myadmin/stdtestimonial/update-stdtestimonial/${formData.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.post(`${BASE_URL}/myadmin/stdtestimonial/add-stdtestimonial`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      
      resetForm()
      fetchTestimonials()
    } catch (error) {
      console.error('Submit error:', error)
      const errorMsg = error.response?.data?.message || error.message
      await window.customAlert(`Failed to save testimonial.\n\nBackend Error: ${errorMsg}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getYouTubeId = (url) => {
    if (!url || typeof url !== 'string') return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getVimeoId = (url) => {
    if (!url || typeof url !== 'string') return null;
    const match = url.match(/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i);
    return match ? match[1] : null;
  };

  const getLocalVideoUrl = (videoFile) => {
    if (!videoFile) return null;
    let normalized = videoFile.replace(/\\/g, '/');
    if (normalized.startsWith('src/')) {
      normalized = normalized.substring(4);
    }
    const baseUrlStripped = BASE_URL.replace(/\/api$/, '');
    return `${baseUrlStripped}/${normalized}`;
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const indexOfLastEntry = currentPage * entriesPerPage
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
  const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry)
  const TOTAL_ENTRIES = data.length

  const handleViewClick = (url, type = 'url') => {
    setCurrentVideoUrl(url)
    setCurrentVideoType(type)
    setIsModalOpen(true)
  }

  return (
    <div className="h-full animate-fade-in-up flex flex-col">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md border border-slate-100 flex flex-col h-full w-full overflow-hidden">
        <CardHeader title="Student Testimonials">
          {isEditing && (
            <ThemeButton variant="white-add" onClick={resetForm}>
              + Add New
            </ThemeButton>
          )}
        </CardHeader>

        <div className="p-4 flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
          
          {/* LEFT PANEL: TABLE */}
          <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Show</span>
                <select 
                  value={entriesPerPage}
                  onChange={handleEntriesChange}
                  className="border border-slate-300 bg-white text-slate-700 rounded px-2 py-1.5 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className="text-sm font-medium text-slate-700">Entries</span>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="Search..."
                  className="border border-slate-300 bg-white text-slate-700 rounded-full px-4 py-1.5 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] w-full sm:w-64 shadow-inner"
                />
              </div>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm text-slate-800">
                <thead className="bg-[#1b3d58] text-white">
                  <tr>
                    <th className="px-4 py-3 font-bold border-r border-slate-600 whitespace-nowrap">Sn.</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-600 whitespace-nowrap">Cover Video</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-600 whitespace-nowrap text-center">Url</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-600 whitespace-nowrap">Status</th>
                    <th className="px-4 py-3 font-bold whitespace-nowrap text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-8">Loading student testimonials...</td>
                    </tr>
                  ) : data.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-8">No student testimonials found</td>
                    </tr>
                  ) : (
                    currentEntries.map((row, index) => {
                      const id = row._id || row.id;
                      const sno = indexOfFirstEntry + index + 1;
                      const url = getField(row, ['url', 'm_st_url', 'video_url', 'link']);
                      const statusStr = getField(row, ['status', 'm_st_status', 'is_active']);
                      const videoFile = row.m_st_video || row.video_file || row.cover_video || null;
                      
                      const isActive = String(statusStr).toLowerCase() === 'active' || String(statusStr).toLowerCase() === 'true' || statusStr === 1;
                      const localVideo = getLocalVideoUrl(videoFile);

                      return (
                        <tr key={id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-4 border-r border-slate-200 align-middle">{sno}</td>
                          <td className="px-4 py-4 border-r border-slate-200 align-middle text-center">
                            {localVideo ? (
                              <button 
                                onClick={() => handleViewClick(localVideo, 'local')}
                                className="bg-[#337ab7] text-white px-5 py-1.5 rounded font-medium hover:bg-[#286090] transition-colors shadow-sm"
                              >
                                View
                              </button>
                            ) : (
                              <span className="text-slate-400 text-xs">-</span>
                            )}
                          </td>
                          <td className="px-4 py-4 border-r border-slate-200 align-middle text-center">
                            {url && url !== '-' ? (
                              <button 
                                onClick={() => handleViewClick(url, 'url')}
                                className="bg-[#337ab7] text-white px-5 py-1.5 rounded font-medium hover:bg-[#286090] transition-colors shadow-sm"
                              >
                                View
                              </button>
                            ) : (
                              <span className="text-slate-400 text-xs">-</span>
                            )}
                          </td>
                          <td className="px-4 py-4 border-r border-slate-200 align-middle">
                            {isActive ? 'Active' : 'Inactive'}
                          </td>
                          <td className="px-4 py-4 align-middle">
                            <div className="flex gap-2 justify-center">
                              <button 
                                onClick={() => handleEditClick(row)}
                                className="bg-[#5cb85c] text-white p-1.5 rounded hover:bg-[#4cae4c] transition-colors shadow-sm"
                                title="Edit"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete(id)}
                                className="bg-[#d9534f] text-white p-1.5 rounded hover:bg-[#c9302c] transition-colors shadow-sm"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-600 bg-slate-50">
              <div>Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, TOTAL_ENTRIES)} of {TOTAL_ENTRIES} entries</div>
              <div className="flex space-x-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 shadow-sm">1</button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: ADD/EDIT FORM */}
          <div id="testimonial-form-section" className="w-full lg:w-[400px] flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 h-fit">
            <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl">
              <h3 className="font-bold text-slate-800 text-lg">
                {isEditing ? 'Edit Testimonial' : 'Add New'}
              </h3>
            </div>
            <div className="p-5">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Cover Video * (1920x1080)
                  </label>
                  <input 
                    type="file" 
                    id="videoFileInput"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] bg-slate-50"
                  />
                  {isEditing && !videoFile && (
                    <p className="text-xs text-slate-500 mt-1">Leave blank to keep existing video.</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-red-600 mb-1">
                    Url (Youtube Embed Link)*
                  </label>
                  <textarea 
                    name="m_st_url"
                    value={formData.m_st_url}
                    onChange={(e) => setFormData(prev => ({...prev, m_st_url: e.target.value}))}
                    placeholder="Enter Url (Youtube Embed Link)"
                    rows="3"
                    required
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] bg-slate-50 resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                  <select 
                    name="m_st_status"
                    value={formData.m_st_status}
                    onChange={(e) => setFormData(prev => ({...prev, m_st_status: e.target.value}))}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] bg-slate-50"
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-[#1b3d58] text-white px-6 py-2 rounded font-medium hover:bg-[#132c40] transition-colors disabled:opacity-50 shadow-sm"
                  >
                    {isSubmitting ? 'Saving...' : 'Submit'}
                  </button>
                  <button 
                    type="button" 
                    onClick={resetForm}
                    className="bg-[#e96b35] text-white px-6 py-2 rounded font-medium hover:bg-[#d05726] transition-colors shadow-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Video View Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-[999] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-slate-200">
              <h3 className="font-bold text-lg text-slate-800">
                {currentVideoType === 'local' ? 'Cover Video' : 'URL'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24}/>
              </button>
            </div>
            <div className="p-6 bg-slate-50 flex-1">
              <p className="text-sm font-bold text-slate-700 mb-4 break-all">{currentVideoUrl}</p>
              <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
                {(() => {
                  if (currentVideoType === 'local') {
                    return <video src={currentVideoUrl} className="w-full h-full object-contain" controls autoPlay />
                  } else {
                    const ytId = getYouTubeId(currentVideoUrl);
                    const vimId = getVimeoId(currentVideoUrl);
                    if (ytId) {
                      return <iframe src={`https://www.youtube.com/embed/${ytId}?autoplay=1`} className="w-full h-full" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                    } else if (vimId) {
                      return <iframe src={`https://player.vimeo.com/video/${vimId}?autoplay=1`} className="w-full h-full" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
                    } else {
                      return <div className="text-white flex items-center justify-center h-full text-sm">Unsupported Video URL Format</div>
                    }
                  }
                })()}
              </div>
            </div>
            <div className="p-4 border-t border-slate-200 flex justify-end bg-white">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="bg-slate-200 text-slate-700 px-6 py-2 rounded-lg font-bold hover:bg-slate-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
