import { useState, useEffect } from 'react'
import { Edit2, Trash2 } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function LocationState() {
  const [states, setStates] = useState([])
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  
  const [formData, setFormData] = useState({ stateName: '', countryId: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchStates()
    fetchCountries()
  }, [])

  const fetchStates = async () => {
    try {
      setFetching(true)
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/location/state/all`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.data) {
        setStates(res.data.data)
      } else if (Array.isArray(res.data)) {
        setStates(res.data)
      }
    } catch (error) {
      console.error("Failed to fetch states", error)
    } finally {
      setFetching(false)
    }
  }

  const fetchCountries = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/location/country/dropdown`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.data) {
        setCountries(res.data.data)
      } else if (Array.isArray(res.data)) {
        setCountries(res.data)
      }
    } catch (error) {
      console.error("Failed to fetch country dropdown", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.stateName || !formData.countryId) {
      await window.customAlert("Both State Name and Country are required")
      return
    }

    try {
      setLoading(true); setTimeout(() => setLoading(false), 2000)
      const token = localStorage.getItem('token')
      
      const payload = { 
        m_state_name: formData.stateName,
        m_state_country: formData.countryId
      }
      
      let res

      if (editingId) {
        res = await axios.put(`${BASE_URL}/myadmin/location/state/update/${editingId}`, payload, {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        })
      } else {
        res = await axios.post(`${BASE_URL}/myadmin/location/state/add`, payload, {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        })
      }

      if (res.data?.status || res.data?.success || res.status === 200 || res.status === 201) {
        await window.customAlert(`State ${editingId ? 'updated' : 'added'} successfully!`)
        setFormData({ stateName: '', countryId: '' })
        setEditingId(null)
        fetchStates()
      } else {
        await window.customAlert(res.data?.message || 'Failed to save state')
      }
    } catch (error) {
      console.error("Save failed", error)
      await window.customAlert(error.response?.data?.message || 'Error saving state')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (state) => {
    setFormData({ 
      stateName: state.m_state_name || state.state_name || state.stateName || state.name || '',
      countryId: state.m_state_country?._id || state.country_id || state.countryId || state.country?._id || state.country?.id || ''
    })
    setEditingId(state._id || state.id)
  }

  const handleDelete = async (id) => {
    if (!await window.customConfirm("Are you sure you want to delete this state?")) return

    try {
      const token = localStorage.getItem('token')
      const res = await axios.delete(`${BASE_URL}/myadmin/location/state/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status || res.data?.success || res.status === 200) {
        fetchStates()
      } else {
        await window.customAlert(res.data?.message || 'Failed to delete state')
      }
    } catch (error) {
      console.error("Delete failed", error)
      await window.customAlert(error.response?.data?.message || 'Error deleting state')
    }
  }

  return (
    <div className="h-full animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        
        {/* Left Side: Table */}
        <div className="lg:col-span-2 bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 flex flex-col overflow-hidden h-full">
          {/* Header - Success Story Theme */}
          <div className="bg-[#144f36] p-5 flex justify-between items-center shadow-md relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700 pointer-events-none"></div>
            <div className="flex items-center relative z-10">
              <div className="w-1.5 h-7 bg-white/90 rounded-full mr-4 shadow-[0_0_12px_rgba(255,255,255,0.9)] hidden sm:block"></div>
              <h2 className="text-white font-bold tracking-wide text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">State List</h2>
            </div>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            {fetching ? (
              <div className="text-center p-8 text-slate-500 font-medium">Loading states...</div>
            ) : (
              <div className="overflow-auto border border-slate-200 rounded">
                <table className="w-full text-left text-sm text-slate-800">
                  <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 font-bold border-r border-slate-200 w-16">S.No.</th>
                      <th className="px-4 py-3 font-bold border-r border-slate-200">Country</th>
                      <th className="px-4 py-3 font-bold border-r border-slate-200">State Name</th>
                      <th className="px-4 py-3 font-bold w-28 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {states.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-4 py-8 text-center text-slate-500">No states found.</td>
                      </tr>
                    ) : (
                      states.map((row, index) => (
                        <tr key={row._id || row.id || index} className="border-b border-slate-200 hover:bg-slate-50 bg-white">
                          <td className="px-4 py-3 border-r border-slate-200">{index + 1}</td>
                          <td className="px-4 py-3 border-r border-slate-200">{row.m_state_country?.m_country_name || row.country?.country_name || row.country?.countryName || row.country_name || row.countryName || '-'}</td>
                          <td className="px-4 py-3 border-r border-slate-200 font-medium text-slate-800">{row.m_state_name || row.state_name || row.stateName || row.name || ''}</td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex justify-center gap-2">
                              <button onClick={() => handleEdit(row)} className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors" title="Edit">
                                <Edit2 size={16} />
                              </button>
                              <button onClick={() => handleDelete(row._id || row.id)} className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors" title="Delete">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 h-fit overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              {editingId ? 'Edit State' : 'Add New State'}
            </h2>
            {editingId && (
              <button 
                onClick={async () => { setEditingId(null); setFormData({ stateName: '', countryId: '' }) }}
                className="text-xs font-bold text-[#144f36] hover:underline"
              >
                + Add New Instead
              </button>
            )}
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Select Country <span className="text-red-500">*</span></label>
                <select 
                  value={formData.countryId}
                  onChange={(e) => setFormData({ ...formData, countryId: e.target.value })}
                  className="w-full border border-slate-300 bg-white text-slate-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] transition-all"
                >
                  <option value="">-- Select Country --</option>
                  {countries.map(c => (
                    <option key={c._id || c.id} value={c._id || c.id}>
                      {c.m_country_name || c.country_name || c.countryName || c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">State Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={formData.stateName}
                  onChange={(e) => setFormData({ ...formData, stateName: e.target.value })}
                  placeholder="Enter State Name" 
                  autoComplete="off"
                  className="w-full border border-slate-300 bg-white text-slate-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] transition-all"
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="bg-[#144f36] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#0f3d2a] transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? 'Saving...' : editingId ? 'Update State' : 'Submit State'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
