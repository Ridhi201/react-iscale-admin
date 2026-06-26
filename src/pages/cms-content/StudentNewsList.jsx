import { useState, useEffect } from 'react'
import { Edit2, Trash2, X } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'
import ThemeButton from '../../components/common/ThemeButton'
import CardHeader from '../../components/ui/CardHeader'

export default function StudentNewsList() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(50)
  const [searchTerm, setSearchTerm] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [modalType, setModalType] = useState('image') // 'image' or 'url'

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    id: null,
    m_snews_title: '',
    m_snews_des: '',
    m_snews_url: '',
    m_snews_status: '1'
  })
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true); 
      const token = localStorage.getItem('token')
      const response = await axios.get(`${BASE_URL}/myadmin/news/all-news`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data && response.data.data) {
        setData(response.data.data)
      } else {
        setData([])
      }
    } catch (error) {
      console.error('Failed to fetch news:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!await window.customConfirm('Are you sure you want to delete this news item?')) return
    try {
      const token = localStorage.getItem('token')
      let url = `${BASE_URL}/myadmin/news/delete-news/${id}`
      const config = { headers: { Authorization: `Bearer ${token}` } }
      try {
        await axios.delete(url, config)
      } catch(e) {
        if (e.response?.status === 404) {
          await axios.delete(`${BASE_URL}/myadmin/news/${id}`, config)
        } else throw e
      }
      fetchNews()
      if (isEditing && formData.id === id) {
        resetForm()
      }
    } catch (error) {
      console.error('Delete failed:', error)
      await window.customAlert(error.response?.data?.message || 'Failed to delete')
    }
  }

  const handleToggleStatus = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const config = { headers: { Authorization: `Bearer ${token}` } }
      let url = `${BASE_URL}/myadmin/news/status/${id}`
      try { await axios.put(url, {}, config) } catch (err) {
        if (err.response?.status === 404) {
          try { await axios.put(`${BASE_URL}/myadmin/news/update-status/${id}`, {}, config) } catch (err2) {
            if (err2.response?.status === 404) {
              await axios.get(url, config)
            } else throw err2;
          }
        } else throw err;
      }
      fetchNews()
    } catch (error) {
      console.error('Status toggle failed:', error)
      if (error.response?.status === 404) {
        await window.customAlert("Status API Endpoint Not Found (404). Please ask your backend developer to verify the route for toggling status.")
      } else {
        await window.customAlert(error.response?.data?.message || 'Failed to update status')
      }
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
    const title = getField(row, ['m_snews_title', 'title', 'news_title']);
    const des = getField(row, ['m_snews_des', 'description', 'des']);
    const url = getField(row, ['m_snews_url', 'url', 'link']);
    const statusStr = getField(row, ['m_snews_status', 'status', 'is_active'], 'active');
    
    setFormData({
      id: id,
      m_snews_title: title,
      m_snews_des: des,
      m_snews_url: url,
      m_snews_status: (String(statusStr).toLowerCase() === 'active' || statusStr === 1 || String(statusStr).toLowerCase() === 'true') ? '1' : '0'
    })
    setImageFile(null)
    setIsEditing(true)
    
    setTimeout(() => {
      const formElement = document.getElementById('news-form-section')
      if (formElement) formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const resetForm = () => {
    setFormData({
      id: null,
      m_snews_title: '',
      m_snews_des: '',
      m_snews_url: '',
      m_snews_status: '1'
    })
    setImageFile(null)
    setIsEditing(false)
    
    const fileInput = document.getElementById('imageFileInput')
    if (fileInput) fileInput.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem('token')
      const payload = new FormData()
      payload.append('m_snews_title', formData.m_snews_title)
      payload.append('m_snews_des', formData.m_snews_des)
      payload.append('m_snews_url', formData.m_snews_url)
      payload.append('m_snews_status', formData.m_snews_status) // Sending exact number '1' or '0'
      
      if (imageFile) {
        payload.append('m_snews_image', imageFile)
        // Fallbacks in case the backend uses different fields for upload
        payload.append('image_file', imageFile)
        payload.append('image', imageFile)
      }

      if (isEditing) {
        await axios.put(`${BASE_URL}/myadmin/news/update-news/${formData.id}`, payload, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        })
      } else {
        await axios.post(`${BASE_URL}/myadmin/news/add-news`, payload, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        })
      }
      
      resetForm()
      fetchNews()
    } catch (error) {
      console.error('Submit error:', error)
      const errorMsg = error.response?.data?.message || error.message
      await window.customAlert(`Failed to save news.\n\nBackend Error: ${errorMsg}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    let normalized = imagePath.replace(/\\/g, '/');
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

  const filteredData = data.filter((row) => {
    if (!searchTerm) return true;
    const title = getField(row, ['m_snews_title', 'title', 'news_title']);
    const des = getField(row, ['m_snews_des', 'description', 'des']);
    const url = getField(row, ['m_snews_url', 'url', 'link']);
    
    const searchLower = searchTerm.toLowerCase();
    
    return (
      String(title).toLowerCase().includes(searchLower) ||
      String(des).toLowerCase().includes(searchLower) ||
      String(url).toLowerCase().includes(searchLower)
    );
  });

  const indexOfLastEntry = currentPage * entriesPerPage
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry)
  const TOTAL_ENTRIES = filteredData.length

  const handleViewClick = (content, type) => {
    setModalContent(content)
    setModalType(type)
    setIsModalOpen(true)
  }

  return (
    <div className="h-full animate-fade-in-up flex flex-col">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md border border-slate-100 flex flex-col h-full w-full overflow-hidden">
        <CardHeader title="Student News">
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
                  value={searchTerm}
                  onChange={async (e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-slate-300 bg-white text-slate-700 rounded-full px-4 py-1.5 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] w-full sm:w-64 shadow-inner"
                />
              </div>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm text-slate-800">
                <thead className="bg-[#1b3d58] text-white">
                  <tr>
                    <th className="px-4 py-3 font-bold border-r border-slate-600 whitespace-nowrap">Sn.</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-600 whitespace-nowrap">Title</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-600 whitespace-nowrap text-center">Image</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-600 whitespace-nowrap">Description</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-600 whitespace-nowrap text-center">Url</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-600 whitespace-nowrap">Status</th>
                    <th className="px-4 py-3 font-bold whitespace-nowrap text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center py-8">Loading student news...</td>
                    </tr>
                  ) : data.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-8">No student news found</td>
                    </tr>
                  ) : currentEntries.length === 0 && searchTerm ? (
                    <tr>
                      <td colSpan="7" className="text-center py-8">No matching student news found</td>
                    </tr>
                  ) : (
                    currentEntries.map((row, index) => {
                      const id = row._id || row.id;
                      const sno = indexOfFirstEntry + index + 1;
                      const title = getField(row, ['m_snews_title', 'title', 'news_title']);
                      const des = getField(row, ['m_snews_des', 'description', 'des']);
                      const url = getField(row, ['m_snews_url', 'url', 'link']);
                      const statusStr = getField(row, ['m_snews_status', 'status', 'is_active']);
                      const imagePath = row.m_snews_image || row.image || null;
                      const isActive = String(statusStr).toLowerCase() === 'active' || String(statusStr).toLowerCase() === 'true' || String(statusStr) === '1';
                      const imageUrl = getImageUrl(imagePath);

                      return (
                        <tr key={id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-4 border-r border-slate-200 align-middle">{sno}</td>
                          <td className="px-4 py-4 border-r border-slate-200 align-middle font-medium max-w-[150px] truncate" title={title}>{title || '-'}</td>
                          <td className="px-4 py-4 border-r border-slate-200 align-middle text-center">
                            {imageUrl ? (
                              <button 
                                onClick={() => handleViewClick(imageUrl, 'image')}
                                className="bg-[#337ab7] text-white px-4 py-1.5 rounded text-xs font-medium hover:bg-[#286090] transition-colors shadow-sm"
                              >
                                View Image
                              </button>
                            ) : (
                              <span className="text-slate-400 text-xs">-</span>
                            )}
                          </td>
                          <td className="px-4 py-4 border-r border-slate-200 align-middle text-xs max-w-[200px] truncate" title={des}>
                            {des || '-'}
                          </td>
                          <td className="px-4 py-4 border-r border-slate-200 align-middle text-center">
                            {url && url !== '-' ? (
                              <button 
                                onClick={() => handleViewClick(url, 'url')}
                                className="bg-[#337ab7] text-white px-4 py-1.5 rounded text-xs font-medium hover:bg-[#286090] transition-colors shadow-sm"
                              >
                                View URL
                              </button>
                            ) : (
                              <span className="text-slate-400 text-xs">-</span>
                            )}
                          </td>
                          <td className="px-4 py-4 border-r border-slate-200 align-middle">
                            <button 
                              onClick={() => handleToggleStatus(id)}
                              className={`text-white px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors ${isActive ? 'bg-[#144f36] hover:bg-[#0f3d2a]' : 'bg-red-500 hover:bg-red-600'}`}
                            >
                              {isActive ? 'Active' : 'Inactive'}
                            </button>
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
          <div id="news-form-section" className="w-full lg:w-[400px] flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 h-fit">
            <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl">
              <h3 className="font-bold text-slate-800 text-lg">
                {isEditing ? 'Edit News' : 'Add New'}
              </h3>
            </div>
            <div className="p-5">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Title *</label>
                  <input 
                    type="text" 
                    name="m_snews_title"
                    value={formData.m_snews_title}
                    onChange={(e) => setFormData(prev => ({...prev, m_snews_title: e.target.value}))}
                    placeholder="Enter Title"
                    required
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Upload Image</label>
                  <input 
                    type="file" 
                    id="imageFileInput"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] bg-slate-50"
                  />
                  {isEditing && !imageFile && (
                    <p className="text-xs text-slate-500 mt-1">Leave blank to keep existing image.</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Description *</label>
                  <textarea 
                    name="m_snews_des"
                    value={formData.m_snews_des}
                    onChange={(e) => setFormData(prev => ({...prev, m_snews_des: e.target.value}))}
                    placeholder="Enter Description"
                    rows="3"
                    required
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] bg-slate-50 resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">URL</label>
                  <input 
                    type="url" 
                    name="m_snews_url"
                    value={formData.m_snews_url}
                    onChange={(e) => setFormData(prev => ({...prev, m_snews_url: e.target.value}))}
                    placeholder="https://..."
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                  <select 
                    name="m_snews_status"
                    value={formData.m_snews_status}
                    onChange={(e) => setFormData(prev => ({...prev, m_snews_status: e.target.value}))}
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

      {/* View Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-[999] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-200">
              <h3 className="font-bold text-lg text-slate-800">
                {modalType === 'image' ? 'Image View' : 'URL Link'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24}/>
              </button>
            </div>
            <div className="p-6 bg-slate-50 flex-1 overflow-auto">
              <p className="text-sm font-bold text-slate-700 mb-4 break-all">{modalContent}</p>
              <div className="w-full bg-slate-100 rounded-lg overflow-hidden shadow-inner flex items-center justify-center min-h-[200px]">
                {modalType === 'image' ? (
                  <img src={modalContent} alt="Preview" className="max-w-full max-h-[60vh] object-contain" />
                ) : (
                  <a href={modalContent} target="_blank" rel="noopener noreferrer" className="text-[#1b3d58] hover:underline font-medium text-lg flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                    Click to open link in new tab
                  </a>
                )}
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
