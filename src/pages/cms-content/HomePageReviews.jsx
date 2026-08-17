import { useState, useEffect } from 'react'
import { Edit2, Trash2, X } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function HomePageReviews() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(50)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  
  // Debug banner toggle
  const [showDebug, setShowDebug] = useState(false)

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    position: '',
    description: '',
    status: '1'
  })
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      setLoading(true); 
      const token = localStorage.getItem('token')
      const response = await axios.get(`${BASE_URL}/myadmin/user-reviews/all`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data && response.data.data) {
        setData(response.data.data)
      } else {
        setData([])
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!await window.customConfirm('Are you sure you want to delete this review?')) return
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${BASE_URL}/myadmin/user-reviews/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchReviews()
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
      await axios.put(`${BASE_URL}/myadmin/user-reviews/status/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchReviews()
    } catch (error) {
      console.error('Status toggle failed:', error)
      await window.customAlert(error.response?.data?.message || 'Failed to update status')
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
    const name = getField(row, ['name', 'reviewer_name', 'm_ur_name', 'user_name']);
    const pos = getField(row, ['position', 'designation', 'm_ur_position', 'role']);
    const des = getField(row, ['description', 'des', 'm_ur_des', 'review', 'message']);
    const statusStr = getField(row, ['status', 'm_ur_status', 'is_active', 'm_status'], 'active');
    
    setFormData({
      id: id,
      name: name,
      position: pos,
      description: des,
      status: (String(statusStr).toLowerCase() === 'active' || String(statusStr).toLowerCase() === 'true' || String(statusStr) === '1') ? '1' : '0'
    })
    setImageFile(null)
    setIsEditing(true)
    
    setTimeout(() => {
      const formElement = document.getElementById('review-form-section')
      if (formElement) formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      position: '',
      description: '',
      status: '1'
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
      
      // Guessing common payload keys based on what we've seen
      payload.append('name', formData.name)
      payload.append('m_ur_name', formData.name) // fallback
      
      payload.append('position', formData.position)
      payload.append('m_ur_position', formData.position) // fallback
      
      payload.append('description', formData.description)
      payload.append('des', formData.description) // fallback
      payload.append('m_ur_des', formData.description) // fallback
      
      payload.append('status', formData.status) 
      payload.append('m_ur_status', formData.status) // fallback
      
      if (imageFile) {
        payload.append('image', imageFile)
        payload.append('profile_image', imageFile)
        payload.append('m_ur_image', imageFile)
      }

      if (isEditing) {
        await axios.put(`${BASE_URL}/myadmin/user-reviews/update/${formData.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.post(`${BASE_URL}/myadmin/user-reviews/add`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      
      resetForm()
      fetchReviews()
    } catch (error) {
      console.error('Submit error:', error)
      const errorMsg = error.response?.data?.message || error.message
      await window.customAlert(`Failed to save review.\n\nBackend Error: ${errorMsg}\n\nNote: If this is an unexpected field error, we may need to adjust the field names. Please look at the debug banner at the top of the page.`)
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

  const indexOfLastEntry = currentPage * entriesPerPage
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
  const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry)
  const TOTAL_ENTRIES = data.length

  return (
    <div className="h-full animate-fade-in-up flex flex-col">
      {/* DEBUG BANNER FOR THE DEVELOPER */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-4 rounded shadow-sm text-sm font-mono flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p><strong>DEBUG DATA (Copy this for AI if backend fails):</strong></p>
          <button onClick={() => setShowDebug(!showDebug)} className="underline font-bold text-blue-600">
            {showDebug ? 'Hide JSON' : 'Show JSON'}
          </button>
        </div>
        {showDebug && data.length > 0 && (
          <pre className="bg-yellow-50 p-2 overflow-auto border border-yellow-200">
            {JSON.stringify(data[0], null, 2)}
          </pre>
        )}
      </div>

      <div className="bg-[#f6f6ff] rounded-2xl shadow-md border border-slate-100 flex flex-col h-full w-full overflow-hidden">
        {/* Header - Success Story Theme */}
        <div className="p-4 flex justify-between items-center bg-gradient-to-r from-[#144f36] to-[#1a6545]">
          <div className="flex items-center">
            <div className="w-1.5 h-6 bg-white rounded-full mr-3"></div>
            <h2 className="text-xl font-bold text-white tracking-tight">Home Page Reviews</h2>
          </div>
          {isEditing && (
            <button 
              onClick={resetForm}
              className="bg-white text-[#144f36] px-5 py-2 rounded-full flex items-center gap-2 text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm"
            >
              <span>+ Add New</span>
            </button>
          )}
        </div>

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
                    <th className="px-4 py-3 font-bold border-r border-slate-600 whitespace-nowrap text-center">Profile</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-600 whitespace-nowrap">Name</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-600 whitespace-nowrap">Position</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-600 whitespace-nowrap">Description</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-600 whitespace-nowrap">Status</th>
                    <th className="px-4 py-3 font-bold whitespace-nowrap text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center py-8">Loading reviews...</td>
                    </tr>
                  ) : data.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-8">No reviews found</td>
                    </tr>
                  ) : (
                    currentEntries.map((row, index) => {
                      const id = row._id || row.id;
                      const sno = indexOfFirstEntry + index + 1;
                      const name = getField(row, ['name', 'reviewer_name', 'm_ur_name', 'user_name']);
                      const pos = getField(row, ['position', 'designation', 'm_ur_position', 'role']);
                      const des = getField(row, ['description', 'des', 'm_ur_des', 'review', 'message']);
                      const statusStr = getField(row, ['status', 'm_ur_status', 'is_active', 'm_status']);
                      const imagePath = getField(row, ['profile', 'image', 'm_ur_image', 'profile_image', 'profile_pic']);
                      
                      const isActive = String(statusStr).toLowerCase() === 'active' || String(statusStr).toLowerCase() === 'true' || String(statusStr) === '1';
                      const imageUrl = getImageUrl(imagePath);

                      return (
                        <tr key={id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-4 border-r border-slate-200 align-middle">{sno}</td>
                          <td className="px-4 py-4 border-r border-slate-200 align-middle text-center">
                            {imageUrl ? (
                              <button 
                                onClick={async () => { setModalContent(imageUrl); setIsModalOpen(true); }}
                                className="bg-[#337ab7] text-white px-4 py-1.5 rounded text-xs font-medium hover:bg-[#286090] transition-colors shadow-sm"
                              >
                                View Image
                              </button>
                            ) : (
                              <span className="text-slate-400 text-xs">-</span>
                            )}
                          </td>
                          <td className="px-4 py-4 border-r border-slate-200 align-middle font-medium max-w-[150px] truncate" title={name}>{name || '-'}</td>
                          <td className="px-4 py-4 border-r border-slate-200 align-middle truncate max-w-[150px]">{pos || '-'}</td>
                          <td className="px-4 py-4 border-r border-slate-200 align-middle text-xs max-w-[200px] truncate" title={des}>
                            {des || '-'}
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
          <div id="review-form-section" className="w-full lg:w-[400px] flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 h-fit">
            <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl">
              <h3 className="font-bold text-slate-800 text-lg">
                {isEditing ? 'Edit Review' : 'Add New'}
              </h3>
            </div>
            <div className="p-5">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                    placeholder="Enter Name"
                    required
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Upload Profile Image *</label>
                  <input 
                    type="file" 
                    id="imageFileInput"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    required={!isEditing}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] bg-slate-50"
                  />
                  {isEditing && !imageFile && (
                    <p className="text-xs text-slate-500 mt-1">Leave blank to keep existing image.</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Position *</label>
                  <input 
                    type="text" 
                    name="position"
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({...prev, position: e.target.value}))}
                    placeholder="e.g. Student, Developer"
                    required
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Description *</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                    placeholder="Enter review description"
                    rows="3"
                    required
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] bg-slate-50 resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({...prev, status: e.target.value}))}
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

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-[999] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-200">
              <h3 className="font-bold text-lg text-slate-800">Image View</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24}/>
              </button>
            </div>
            <div className="p-6 bg-slate-50 flex-1 overflow-auto flex items-center justify-center">
              <img src={modalContent} alt="Preview" className="max-w-full max-h-[60vh] object-contain rounded shadow-sm border border-slate-200" />
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
