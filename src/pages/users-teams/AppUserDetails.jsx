import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Trash2, Edit2, Eye } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function AppUserDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [activeTab, setActiveTab] = useState('enrollments') // 'enrollments', 'wishlists'
  const [activeSubTab, setActiveSubTab] = useState('courses') // 'courses', 'test-series', 'notes'

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#144f36] rounded-2xl shadow-md border border-white/10 p-5 mb-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-white font-bold tracking-wide text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">User Details</h2>
          <button 
            onClick={() => navigate('/app-users')}
            className="bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/20 transition-colors flex items-center gap-1 border border-white/30"
          >
            <span>↩ Back</span>
          </button>
        </div>
        
        <div className="flex gap-4 border-b border-white/20 pb-2">
          <button 
            className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors ${activeTab === 'enrollments' ? 'bg-white text-[#144f36]' : 'text-white hover:bg-white/10'}`}
            onClick={() => { setActiveTab('enrollments'); setActiveSubTab('courses'); }}
          >
            Enrollments
          </button>
          <button 
            className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors ${activeTab === 'wishlists' ? 'bg-white text-[#144f36]' : 'text-white hover:bg-white/10'}`}
            onClick={() => { setActiveTab('wishlists'); setActiveSubTab('courses'); }}
          >
            Wishlists
          </button>
        </div>

        <div className="flex gap-2">
          <button 
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${activeSubTab === 'courses' ? 'bg-[#d87025] text-white shadow' : 'bg-white/20 text-white hover:bg-white/30'}`}
            onClick={() => setActiveSubTab('courses')}
          >
            Courses
          </button>
          <button 
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${activeSubTab === 'test-series' ? 'bg-[#d87025] text-white shadow' : 'bg-white/20 text-white hover:bg-white/30'}`}
            onClick={() => setActiveSubTab('test-series')}
          >
            Test Series
          </button>
          <button 
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${activeSubTab === 'notes' ? 'bg-[#d87025] text-white shadow' : 'bg-white/20 text-white hover:bg-white/30'}`}
            onClick={() => setActiveSubTab('notes')}
          >
            Notes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden min-h-[400px]">
        {activeTab === 'enrollments' && activeSubTab === 'courses' && <EnrollmentCourses candidateId={id} />}
        {activeTab === 'enrollments' && activeSubTab === 'test-series' && <EnrollmentTestSeries candidateId={id} />}
        {activeTab === 'enrollments' && activeSubTab === 'notes' && <EnrollmentNotes candidateId={id} />}
        
        {activeTab === 'wishlists' && activeSubTab === 'courses' && <WishlistCourses candidateId={id} />}
        {activeTab === 'wishlists' && activeSubTab === 'test-series' && <WishlistTestSeries candidateId={id} />}
        {activeTab === 'wishlists' && activeSubTab === 'notes' && <WishlistNotes candidateId={id} />}
      </div>
    </div>
  )
}

function EnrollmentCourses({ candidateId }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalData, setModalData] = useState(null)

  const handleView = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/app-users-enrollments-details/course/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status) {
        setModalData(res.data.data)
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to fetch details')
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/app-users-enrollments-details/course/all/${candidateId}?limit=100`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setData(res.data?.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [candidateId])

  const handleDelete = async (id) => {
    if(!window.confirm('Delete this purchased course?')) return
    try {
      const token = localStorage.getItem('token')
      const res = await axios.delete(`${BASE_URL}/myadmin/app-users-enrollments-details/course/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status) {
        alert(res.data.message || 'Deleted successfully')
        fetchData()
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed')
    }
  }

  const handleUpdateDuration = async (id, currentDays) => {
    const days = prompt('Enter new remaining days:', currentDays)
    if (days === null || days === '') return
    
    try {
      const token = localStorage.getItem('token')
      const res = await axios.put(`${BASE_URL}/myadmin/app-users-enrollments-details/course/duration/${id}`, { remaining_days: days }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status) {
        alert(res.data.message || 'Duration updated')
        fetchData()
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed')
    }
  }

  if (loading) return <div className="p-8 text-center">Loading courses...</div>

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full text-left text-sm text-slate-800">
        <thead className="bg-[#144f36] text-white">
          <tr>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Course Name</th>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Registration Date</th>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Amount</th>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Access Type</th>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Remaining Days</th>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Status</th>
            <th className="px-4 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? <tr><td colSpan="7" className="text-center py-6">No records found.</td></tr> : data.map(row => (
            <tr key={row._id} className="border-b border-slate-200 hover:bg-slate-50">
              <td className="px-4 py-3 border-r border-slate-200">{row.course_name}</td>
              <td className="px-4 py-3 border-r border-slate-200">{new Date(row.registration_date).toLocaleDateString()}</td>
              <td className="px-4 py-3 border-r border-slate-200">₹{row.amount}</td>
              <td className="px-4 py-3 border-r border-slate-200 capitalize">{row.access_type}</td>
              <td className="px-4 py-3 border-r border-slate-200">
                {row.access_type === 'lifetime' ? 'Lifetime' : `${row.remaining_days} Days`}
                {row.access_type !== 'lifetime' && (
                  <button onClick={() => handleUpdateDuration(row._id, row.remaining_days)} className="ml-2 text-blue-600 hover:underline text-xs">
                    (Edit)
                  </button>
                )}
              </td>
              <td className="px-4 py-3 border-r border-slate-200 capitalize">{row.enrollment_data?.status}</td>
              <td className="px-4 py-3 flex gap-2">
                <button onClick={() => handleView(row._id)} className="bg-blue-600 text-white p-1.5 rounded hover:bg-blue-700" title="View Details"><Eye size={14} /></button>
                <button onClick={() => handleDelete(row._id)} className="bg-[#d87025] text-white p-1.5 rounded hover:bg-[#b55d1f]" title="Delete"><Trash2 size={14} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DetailsModal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} type="Course" />
    </div>
  )
}

function EnrollmentTestSeries({ candidateId }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalData, setModalData] = useState(null)

  const handleView = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/app-users-enrollments-details/test-series/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status) {
        setModalData(res.data.data)
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to fetch details')
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/app-users-enrollments-details/test-series/all/${candidateId}?limit=100`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setData(res.data?.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [candidateId])

  const handleDelete = async (id) => {
    if(!window.confirm('Delete this purchased test series?')) return
    try {
      const token = localStorage.getItem('token')
      const res = await axios.delete(`${BASE_URL}/myadmin/app-users-enrollments-details/test-series/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status) {
        alert(res.data.message || 'Deleted successfully')
        fetchData()
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed')
    }
  }

  const handleToggleStatus = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.patch(`${BASE_URL}/myadmin/app-users-enrollments-details/test-series/status/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status) fetchData()
    } catch (err) {
      alert(err.response?.data?.message || 'Status update failed')
    }
  }

  if (loading) return <div className="p-8 text-center">Loading test series...</div>

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full text-left text-sm text-slate-800">
        <thead className="bg-[#144f36] text-white">
          <tr>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Test Series Name</th>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Registration Date</th>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Amount</th>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Payment Mode</th>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Status</th>
            <th className="px-4 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? <tr><td colSpan="6" className="text-center py-6">No records found.</td></tr> : data.map(row => (
            <tr key={row._id} className="border-b border-slate-200 hover:bg-slate-50">
              <td className="px-4 py-3 border-r border-slate-200">{row.test_series_name}</td>
              <td className="px-4 py-3 border-r border-slate-200">{new Date(row.registration_date).toLocaleDateString()}</td>
              <td className="px-4 py-3 border-r border-slate-200">₹{row.payable_amount}</td>
              <td className="px-4 py-3 border-r border-slate-200 uppercase">{row.payment_mode}</td>
              <td className="px-4 py-3 border-r border-slate-200">
                <button onClick={() => handleToggleStatus(row._id)} className={`px-2 py-1 text-xs text-white rounded ${row.enrollment_data?.access_status === 'active' ? 'bg-[#144f36]' : 'bg-[#d87025]'}`}>
                  {row.enrollment_data?.access_status}
                </button>
              </td>
              <td className="px-4 py-3 flex gap-2">
                <button onClick={() => handleView(row._id)} className="bg-blue-600 text-white p-1.5 rounded hover:bg-blue-700" title="View Details"><Eye size={14} /></button>
                <button onClick={() => handleDelete(row._id)} className="bg-[#d87025] text-white p-1.5 rounded hover:bg-[#b55d1f]" title="Delete"><Trash2 size={14} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DetailsModal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} type="Test Series" />
    </div>
  )
}

function EnrollmentNotes({ candidateId }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalData, setModalData] = useState(null)

  const handleView = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/app-users-enrollments-details/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status) {
        setModalData(res.data.data)
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to fetch details')
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/app-users-enrollments-details/notes/all/${candidateId}?limit=100`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setData(res.data?.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [candidateId])

  const handleDelete = async (id) => {
    if(!window.confirm('Delete this purchased note?')) return
    try {
      const token = localStorage.getItem('token')
      const res = await axios.delete(`${BASE_URL}/myadmin/app-users-enrollments-details/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status) {
        alert(res.data.message || 'Deleted successfully')
        fetchData()
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed')
    }
  }

  const handleToggleStatus = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.patch(`${BASE_URL}/myadmin/app-users-enrollments-details/notes/status/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status) fetchData()
    } catch (err) {
      alert(err.response?.data?.message || 'Status update failed')
    }
  }

  if (loading) return <div className="p-8 text-center">Loading notes...</div>

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full text-left text-sm text-slate-800">
        <thead className="bg-[#144f36] text-white">
          <tr>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Notes Name</th>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Registration Date</th>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Status</th>
            <th className="px-4 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? <tr><td colSpan="4" className="text-center py-6">No records found.</td></tr> : data.map(row => (
            <tr key={row._id} className="border-b border-slate-200 hover:bg-slate-50">
              <td className="px-4 py-3 border-r border-slate-200">{row.notes_name || 'Notes Name Unavailable'}</td>
              <td className="px-4 py-3 border-r border-slate-200">{new Date(row.registration_date).toLocaleDateString()}</td>
              <td className="px-4 py-3 border-r border-slate-200">
                <button onClick={() => handleToggleStatus(row._id)} className={`px-2 py-1 text-xs text-white rounded ${row.enrollment_data?.enrollment_status === 'active' ? 'bg-[#144f36]' : 'bg-[#d87025]'}`}>
                  {row.enrollment_data?.enrollment_status}
                </button>
              </td>
              <td className="px-4 py-3 flex gap-2">
                <button onClick={() => handleView(row._id)} className="bg-blue-600 text-white p-1.5 rounded hover:bg-blue-700" title="View Details"><Eye size={14} /></button>
                <button onClick={() => handleDelete(row._id)} className="bg-[#d87025] text-white p-1.5 rounded hover:bg-[#b55d1f]" title="Delete"><Trash2 size={14} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DetailsModal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} type="Notes" />
    </div>
  )
}

function WishlistCourses({ candidateId }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalData, setModalData] = useState(null)

  const handleView = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/app-users-wishlist-details/course/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status) {
        setModalData(res.data.data)
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to fetch details')
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/app-users-wishlist-details/course/all/${candidateId}?limit=100`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setData(res.data?.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [candidateId])

  const handleDelete = async (id) => {
    if(!window.confirm('Remove course from wishlist?')) return
    try {
      const token = localStorage.getItem('token')
      const res = await axios.delete(`${BASE_URL}/myadmin/app-users-wishlist-details/course/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status) {
        alert(res.data.message || 'Deleted successfully')
        fetchData()
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed')
    }
  }

  if (loading) return <div className="p-8 text-center">Loading wishlist...</div>

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full text-left text-sm text-slate-800">
        <thead className="bg-[#144f36] text-white">
          <tr>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Course Name</th>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Added On</th>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Price</th>
            <th className="px-4 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? <tr><td colSpan="4" className="text-center py-6">No records found.</td></tr> : data.map(row => (
            <tr key={row._id} className="border-b border-slate-200 hover:bg-slate-50">
              <td className="px-4 py-3 border-r border-slate-200">{row.course_id?.m_course_title}</td>
              <td className="px-4 py-3 border-r border-slate-200">{new Date(row.added_on).toLocaleDateString()}</td>
              <td className="px-4 py-3 border-r border-slate-200">₹{row.course_id?.m_course_price}</td>
              <td className="px-4 py-3 flex gap-2">
                <button onClick={() => handleView(row._id)} className="bg-blue-600 text-white p-1.5 rounded hover:bg-blue-700" title="View Details"><Eye size={14} /></button>
                <button onClick={() => handleDelete(row._id)} className="bg-[#d87025] text-white p-1.5 rounded hover:bg-[#b55d1f]"><Trash2 size={14} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DetailsModal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} type="Wishlist Course" />
    </div>
  )
}

function WishlistTestSeries({ candidateId }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalData, setModalData] = useState(null)

  const handleView = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/app-users-wishlist-details/test/series/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status) {
        setModalData(res.data.data)
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to fetch details')
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/app-users-wishlist-details/test/series/all/${candidateId}?limit=100`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setData(res.data?.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [candidateId])

  const handleDelete = async (id) => {
    if(!window.confirm('Remove test series from wishlist?')) return
    try {
      const token = localStorage.getItem('token')
      const res = await axios.delete(`${BASE_URL}/myadmin/app-users-wishlist-details/test/series/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status) {
        alert(res.data.message || 'Deleted successfully')
        fetchData()
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed')
    }
  }

  if (loading) return <div className="p-8 text-center">Loading wishlist...</div>

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full text-left text-sm text-slate-800">
        <thead className="bg-[#144f36] text-white">
          <tr>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Package Name</th>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Added On</th>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Price</th>
            <th className="px-4 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? <tr><td colSpan="4" className="text-center py-6">No records found.</td></tr> : data.map(row => (
            <tr key={row._id} className="border-b border-slate-200 hover:bg-slate-50">
              <td className="px-4 py-3 border-r border-slate-200">{row.package_id?.m_package_title}</td>
              <td className="px-4 py-3 border-r border-slate-200">{new Date(row.added_on).toLocaleDateString()}</td>
              <td className="px-4 py-3 border-r border-slate-200">₹{row.package_id?.m_package_price}</td>
              <td className="px-4 py-3 flex gap-2">
                <button onClick={() => handleView(row._id)} className="bg-blue-600 text-white p-1.5 rounded hover:bg-blue-700" title="View Details"><Eye size={14} /></button>
                <button onClick={() => handleDelete(row._id)} className="bg-[#d87025] text-white p-1.5 rounded hover:bg-[#b55d1f]"><Trash2 size={14} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DetailsModal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} type="Wishlist Test Series" />
    </div>
  )
}

function WishlistNotes({ candidateId }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalData, setModalData] = useState(null)

  const handleView = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/app-users-wishlist-details/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status) {
        setModalData(res.data.data)
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to fetch details')
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/app-users-wishlist-details/notes/all/${candidateId}?limit=100`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setData(res.data?.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [candidateId])

  const handleDelete = async (id) => {
    if(!window.confirm('Remove notes from wishlist?')) return
    try {
      const token = localStorage.getItem('token')
      const res = await axios.delete(`${BASE_URL}/myadmin/app-users-wishlist-details/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status) {
        alert(res.data.message || 'Deleted successfully')
        fetchData()
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed')
    }
  }

  if (loading) return <div className="p-8 text-center">Loading wishlist...</div>

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full text-left text-sm text-slate-800">
        <thead className="bg-[#144f36] text-white">
          <tr>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Notes Name</th>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Added On</th>
            <th className="px-4 py-3 font-semibold border-r border-[#0f3d2a]">Status</th>
            <th className="px-4 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? <tr><td colSpan="4" className="text-center py-6">No records found.</td></tr> : data.map(row => (
            <tr key={row._id} className="border-b border-slate-200 hover:bg-slate-50">
              <td className="px-4 py-3 border-r border-slate-200">{row.notes_id?.notes_name || 'Notes Unavailable'}</td>
              <td className="px-4 py-3 border-r border-slate-200">{new Date(row.added_on).toLocaleDateString()}</td>
              <td className="px-4 py-3 border-r border-slate-200 capitalize">{row.notes_id?.notes_status || 'N/A'}</td>
              <td className="px-4 py-3 flex gap-2">
                <button onClick={() => handleView(row._id)} className="bg-blue-600 text-white p-1.5 rounded hover:bg-blue-700" title="View Details"><Eye size={14} /></button>
                <button onClick={() => handleDelete(row._id)} className="bg-[#d87025] text-white p-1.5 rounded hover:bg-[#b55d1f]"><Trash2 size={14} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DetailsModal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} type="Wishlist Notes" />
    </div>
  )
}

function DetailsModal({ isOpen, onClose, data, type }) {
  if (!isOpen || !data) return null;

  const renderValue = (val) => {
    if (val === null || val === undefined) return 'N/A';
    if (typeof val === 'object') return JSON.stringify(val);
    return String(val);
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 font-bold">
          ✕
        </button>
        <h3 className="text-xl font-bold text-[#144f36] mb-6 capitalize">{type} Enrollment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(data).map(([key, value]) => {
            if (key === '_id' || key === '__v') return null;
            return (
              <div key={key} className="bg-slate-50 p-3 rounded border border-slate-100">
                <div className="text-xs text-slate-500 font-semibold uppercase mb-1">{key.replace(/_/g, ' ')}</div>
                <div className="text-sm text-slate-800 font-medium break-words">
                  {renderValue(value)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
