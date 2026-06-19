import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function ContactQueriesList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(50)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalEntries, setTotalEntries] = useState(0)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.get(`${BASE_URL}/myadmin/contact-us/all`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data?.status || response.data?.success || response.data?.data) {
        setData(response.data.data || [])
        setTotalEntries(response.data.data?.length || 0)
      } else {
        setData([])
        setTotalEntries(0)
      }
    } catch (error) {
      console.error('Error fetching contact queries:', error)
      setData([])
      setTotalEntries(0)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!await window.customConfirm('Are you sure you want to delete this query?')) return
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`${BASE_URL}/myadmin/contact-us/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data?.status || response.data?.success || response.data?.msg === 'Query deleted successfully') {
        await window.customAlert(response.data.msg || response.data.message || 'Deleted successfully')
        fetchData()
      } else {
        await window.customAlert(response.data.message || response.data.msg || 'Delete failed')
      }
    } catch (error) {
      console.error('Error deleting contact query:', error)
      await window.customAlert(error.response?.data?.message || error.response?.data?.msg || 'Delete failed')
    }
  }

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token')
      
      const isCurrentlyNew = currentStatus?.toLowerCase() === 'new' || currentStatus?.toLowerCase() === 'active' || String(currentStatus) === '1';
      
      // Possible values the backend enum might accept
      const possibleStatuses = isCurrentlyNew 
        ? ['viewed', 'Viewed', 'Inactive', 'inactive', '0', 0] 
        : ['new', 'New', 'Active', 'active', '1', 1];

      let response;
      let lastError;

      // Try patching with each possible status format until one succeeds (doesn't return 400 Bad Request)
      for (const attemptStatus of possibleStatuses) {
        try {
          response = await axios.patch(`${BASE_URL}/myadmin/contact-us/status/${id}`, { status: attemptStatus }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          // If it didn't throw an error, we found the right format!
          lastError = null;
          break;
        } catch (err) {
          lastError = err;
          // If it's 400, it's likely a validation error ("status invalid"). Continue to next possibility.
          if (err.response && err.response.status === 400) {
            continue;
          } else {
            // If it's a 401, 500, etc., break out and throw
            break;
          }
        }
      }

      if (lastError) {
        throw lastError;
      }

      if (response && (response.data?.status || response.data?.success || response.data?.msg || response.status === 200)) {
        fetchData()
      } else {
        await window.customAlert(response?.data?.message || response?.data?.msg || 'Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      const errorMsg = error.response?.data?.message || error.response?.data?.msg || error.response?.data?.error || error.message;
      await window.customAlert('Error updating status: ' + (typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg))
    }
  }

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const indexOfLastEntry = currentPage * entriesPerPage
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
  const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry)
  const totalPages = Math.ceil(data.length / entriesPerPage) || 1

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden flex flex-col h-full">
        <div className="bg-[#144f36] rounded-t p-5 flex justify-between items-center shadow-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white dark:bg-[#13111c]/10 rounded-full blur-2xl group-hover:bg-white dark:bg-[#13111c]/20 transition-all duration-700 pointer-events-none"></div>
          <div className="flex items-center relative z-10">
            <div className="w-1.5 h-7 bg-white dark:bg-[#13111c]/90 rounded-full mr-4 shadow-[0_0_12px_rgba(255,255,255,0.9)] hidden sm:block"></div>
            <h2 className="text-white font-bold tracking-wide text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">Contact Queries</h2>
          </div>
          
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-800 dark:text-slate-200">Show</span>
                <select 
                  value={entriesPerPage}
                  onChange={handleEntriesChange}
                  className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e]"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className="text-sm text-slate-800 dark:text-slate-200">Entries</span>
              </div>
              <div className="flex gap-0 border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded overflow-hidden flex-wrap">
                {[
                  { label: 'Copy', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> },
                  { label: 'Excel', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h2"/><path d="M8 17h2"/><path d="M14 13h2"/><path d="M14 17h2"/></svg> },
                  { label: 'PDF', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg> },
                  { label: 'Print', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg> }
                ].map(btn => (
                  <button 
                    key={btn.label} 
                    title={btn.label} 
                    onClick={async () => {
                      if (btn.label === 'Print') {
                        window.print();
                      } else if (btn.label === 'Excel' || btn.label === 'Copy' || btn.label === 'PDF') {
                        const table = document.querySelector('table');
                        if (!table) return;
                        let csv = '';
                        const rows = table.querySelectorAll('tr');
                        rows.forEach(row => {
                          const cols = row.querySelectorAll('td, th');
                          const rowData = Array.from(cols).map(c => '"' + c.innerText.replace(/"/g, '""') + '"');
                          csv += rowData.join(',') + '\n';
                        });
                        if (btn.label === 'Copy') {
                          navigator.clipboard.writeText(csv);
                          await window.customAlert('Table data copied to clipboard!');
                        } else {
                          const blob = new Blob([csv], { type: 'text/csv' });
                          const url = window.URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'export.csv';
                          a.click();
                        }
                      }
                    }}
                    className="px-3 py-1.5 bg-[#f6f6ff] dark:bg-[#1f1b2e] hover:bg-slate-50 dark:bg-[#1f1b2e]/50 border-r border-slate-300 dark:border-slate-600 last:border-r-0 flex items-center justify-center">
                    {btn.icon}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Search..."
                className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded-full px-4 py-1.5 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 w-64"
              />
            </div>
          </div>

          <div className="overflow-auto border border-slate-200 dark:border-[#1f1b2e] flex-1">
            <table className="w-full text-left text-sm text-slate-800 dark:text-slate-200">
              <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">
                <tr>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">
                    <div className="flex items-center justify-between">
                      S.No.
                      <span className="text-[10px] flex flex-col leading-[0.5]"><span className="text-white/50">▲</span><span>▼</span></span>
                    </div>
                  </th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Full Name</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Mobile</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Email</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Subject</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Message</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Date</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 font-bold whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-8">Loading...</td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-8">No contact queries found</td>
                  </tr>
                ) : (
                  currentEntries.map((row, index) => {
                    const getField = (fields) => {
                      for (const field of fields) {
                        if (row[field] !== undefined && row[field] !== null && row[field] !== '') return row[field];
                      }
                      return '-';
                    };

                    const name = getField(['name', 'fullName', 'm_cq_name', 'm_name']);
                    const mobile = getField(['mobile', 'phone', 'contact', 'mobileNumber', 'phoneNumber', 'm_cq_mobile', 'm_mobile', 'm_phone']);
                    const email = getField(['email', 'm_cq_email', 'm_email']);
                    const subject = getField(['subject', 'm_cq_subject', 'm_subject']);
                    const statusStr = getField(['status', 'm_cq_status', 'm_status']);
                    const status = statusStr !== '-' ? String(statusStr) : 'New';
                    const dateStr = row.createdAt ? new Date(row.createdAt).toLocaleDateString() : row.date || '-';

                    return (
                      <tr key={row._id || index} className="border-b border-slate-200 dark:border-gray-800/50 hover:bg-slate-50 dark:bg-[#1f1b2e]/50 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
                        <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle">
                          {(currentPage - 1) * entriesPerPage + index + 1}
                        </td>
                        <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle whitespace-nowrap">{name}</td>
                        <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle whitespace-nowrap">{mobile}</td>
                        <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle whitespace-nowrap">{email}</td>
                        <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle whitespace-nowrap max-w-[200px] truncate">{subject}</td>
                        <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle text-center">
                          <button className="bg-white text-slate-700 border border-slate-300 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-slate-50 transition-colors shadow-sm">
                            View
                          </button>
                        </td>
                        <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle whitespace-nowrap">
                          {dateStr}
                        </td>
                        <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle text-center">
                          <button 
                            onClick={() => handleToggleStatus(row._id || row.id, status)}
                            className={`text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm ${status.toLowerCase() === 'active' || status === '1' || status.toLowerCase() === 'new' ? 'bg-[#144f36] hover:bg-[#0f3d2a]' : 'bg-red-500 hover:bg-red-600'}`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        </td>
                        <td className="px-4 py-4 align-middle text-center">
                          <button 
                            onClick={() => handleDelete(row._id || row.id)}
                            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors shadow-sm inline-flex items-center justify-center"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col md:flex-row justify-between items-center text-sm text-slate-800 dark:text-slate-200">
            <div className="mb-4 md:mb-0">
              Showing {data.length > 0 ? indexOfFirstEntry + 1 : 0} to {Math.min(indexOfLastEntry, data.length)} of {data.length} entries
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-slate-50 dark:bg-[#13111c] disabled:opacity-50 border border-slate-200 dark:border-slate-700"
              >
                Prev
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-[#144f36] text-white shadow-sm">
                {currentPage}
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-slate-50 dark:bg-[#13111c] disabled:opacity-50 border border-slate-200 dark:border-slate-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
