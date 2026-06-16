import { useState, useEffect } from 'react'
import { Eye, Edit2, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function AppUsers() {
  const navigate = useNavigate()
  
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalEntries, setTotalEntries] = useState(0)
  const entriesPerPage = 10

  const [search, setSearch] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [userStatus, setUserStatus] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [currentPage])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const params = new URLSearchParams({
        page: currentPage,
        limit: entriesPerPage,
        search,
        from_date: fromDate,
        to_date: toDate,
        user_status: userStatus
      })
      const res = await axios.get(`${BASE_URL}/myadmin/app-users/all?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (res.data?.status) {
        setData(res.data.data || [])
        setTotalPages(res.data.pagination?.totalPages || 1)
        setTotalEntries(res.data.pagination?.total || 0)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = () => {
    setCurrentPage(1)
    fetchUsers()
  }

  const handleReset = () => {
    setSearch('')
    setFromDate('')
    setToDate('')
    setUserStatus('')
    setCurrentPage(1)
    // Fetch will happen because of state update if we just call it, but let's do it manually or rely on useEffect if page changes.
    // It's safer to call fetch after a small timeout or rely on the state updates. Since multiple states change, it's better to fetch explicitly.
    setTimeout(() => {
      fetchUsers()
    }, 0)
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, startPage + 4)
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4)
    }
    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  const handleDelete = (id) => {
    alert("Delete API not provided for App User. Please provide DELETE API.")
  }

  const handleExport = async () => {
    try {
      const token = localStorage.getItem('token')
      const params = new URLSearchParams({
        page: 1,
        limit: totalEntries > 0 ? totalEntries : 10000,
        search,
        from_date: fromDate,
        to_date: toDate,
        user_status: userStatus
      })
      const res = await axios.get(`${BASE_URL}/myadmin/app-users/all?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (res.data?.status) {
        const exportData = res.data.data || []
        const headers = ['S.No.', 'User Name', 'Contact No.', 'Email', 'Joined On', 'Status']
        const csvRows = [headers.join(',')]
        
        exportData.forEach((row, index) => {
          const userName = (row.c_display_name || `${row.c_first_name || ''} ${row.c_last_name || ''}`).trim()
          const contact = row.c_contact || ''
          const email = row.c_email || ''
          const joinedOn = row.c_register_date ? new Date(row.c_register_date).toLocaleDateString() : 'N/A'
          const status = row.c_user_status === 1 ? 'Verified' : 'Unverified'
          
          csvRows.push([
            index + 1,
            `"${userName}"`,
            `"${contact}"`,
            `"${email}"`,
            `"${joinedOn}"`,
            `"${status}"`
          ].join(','))
        })
        
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'app_users.csv'
        a.click()
        window.URL.revokeObjectURL(url)
      } else {
        alert("Failed to fetch data for export.")
      }
    } catch (err) {
      console.error(err)
      alert("Error exporting data.")
    }
  }

  const startIndex = (currentPage - 1) * entriesPerPage

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#144f36] rounded-2xl shadow-md border border-white/10 p-5 mb-5 flex justify-between items-center relative overflow-hidden group">
        {/* Shiny glow effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white dark:bg-[#13111c]/10 rounded-full blur-2xl group-hover:bg-white dark:bg-[#13111c]/20 transition-all duration-700 pointer-events-none"></div>
        
        <div className="flex items-center relative z-10">
          <div className="w-1.5 h-7 bg-white dark:bg-[#13111c]/90 rounded-full mr-4 shadow-[0_0_12px_rgba(255,255,255,0.9)] hidden sm:block"></div>
          <h2 className="text-white font-bold tracking-wide text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">App Users List</h2>
        </div>
        
        <button onClick={handleExport} className="bg-white hover:bg-slate-50 text-[#144f36] px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all flex items-center gap-2 relative z-10 hover:shadow hover:-translate-y-0.5">
          Export
        </button>
      </div>

      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden flex flex-col">
        {/* Filters */}
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 flex flex-wrap gap-4 items-end bg-[#eef2f6]/50">
          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">From Date</label>
            <div className="relative">
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 w-48" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">To Date</label>
            <div className="relative">
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 w-48" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">User Type</label>
            <select value={userStatus} onChange={(e) => setUserStatus(e.target.value)} className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 w-40">
              <option value="">Select Type</option>
              <option value="1">Verified (Active)</option>
              <option value="0">Unverified (Inactive)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Search</label>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 w-48" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleFilter} className="bg-[#144f36] text-white px-5 py-2 rounded text-sm shadow hover:bg-[#0f3d2a] transition-colors">Filter</button>
            <button onClick={handleReset} className="bg-[#144f36] text-white px-5 py-2 rounded text-sm shadow hover:bg-[#0f3d2a] transition-colors">Reset</button>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="overflow-auto border border-slate-200 dark:border-[#1f1b2e] rounded-t-lg flex-1">
            <table className="w-full text-left text-sm text-slate-800 dark:text-slate-200">
              <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">
                <tr>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">S.No.</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">User Name</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Contact No.</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Email</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Joined On</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 font-bold whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7" className="text-center py-6">Loading data...</td></tr>
                ) : data.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-6">No users found.</td></tr>
                ) : (
                  data.map((row, index) => (
                    <tr key={row._id} className="border-b border-slate-200 dark:border-gray-800/50 hover:bg-slate-50 dark:bg-[#1f1b2e]/50">
                      <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{startIndex + index + 1}</td>
                      <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.c_display_name || `${row.c_first_name} ${row.c_last_name}`}</td>
                      <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.c_contact}</td>
                      <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.c_email}</td>
                      <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">
                        {row.c_register_date ? new Date(row.c_register_date).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">
                        <span className={`px-3 py-1 rounded-full text-white text-xs whitespace-nowrap ${row.c_user_status === 1 ? 'bg-[#144f36]' : 'bg-red-500'}`}>
                          {row.c_user_status === 1 ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <div className="flex gap-1.5">
                          <button onClick={() => navigate(`/app-users/details/${row._id}`)} className="bg-[#428bca] text-white p-1.5 rounded hover:bg-[#3071a9] transition-colors" title="View Details">
                            <Eye size={14} />
                          </button>
                          <button onClick={() => navigate(`/app-users/edit/${row._id}`)} className="bg-green-600 text-white p-1.5 rounded hover:bg-green-700 transition-colors" title="Edit User">
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => handleDelete(row._id)} className="btn-glossy-red icon-only" title="Delete User">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && totalEntries > 0 && (
            <div className="mt-4 flex justify-between items-center text-sm text-slate-800 dark:text-slate-200">
              <div>
                Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, totalEntries)} of {totalEntries} entries
              </div>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 border rounded ${currentPage === 1 ? 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#1f1b2e]' : 'text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:bg-[#1f1b2e]/50'}`}
                >
                  Previous
                </button>
                {getPageNumbers().map(pageNum => (
                  <button 
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === pageNum ? 'bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-slate-600 dark:text-slate-400 border border-transparent hover:border-slate-300 dark:border-[#1f1b2e]'}`}
                  >
                    {pageNum}
                  </button>
                ))}
                {totalPages > 5 && currentPage < totalPages - 2 && <span className="px-2">...</span>}
                <button 
                  onClick={handleNext}
                  disabled={currentPage >= totalPages}
                  className={`px-3 py-1 border rounded ${currentPage >= totalPages ? 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#1f1b2e]' : 'text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:bg-[#1f1b2e]/50'}`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
