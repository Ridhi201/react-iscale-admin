import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function HireWithUsList() {
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
      const response = await axios.get(`${BASE_URL}/myadmin/hiring-form/all`, {
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
      console.error('Error fetching hiring forms:', error)
      setData([])
      setTotalEntries(0)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this form entry?')) return
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`${BASE_URL}/myadmin/hiring-form/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data?.status || response.data?.success || response.data?.msg === 'Form deleted successfully') {
        alert(response.data.msg || response.data.message || 'Deleted successfully')
        fetchData()
      } else {
        alert(response.data.message || response.data.msg || 'Delete failed')
      }
    } catch (error) {
      console.error('Error deleting form:', error)
      alert(error.response?.data?.message || error.response?.data?.msg || 'Delete failed')
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
        {/* Filter Section */}
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">From Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="mm/dd/yyyy"
                  className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-400">📅</span>
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">To Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="mm/dd/yyyy"
                  className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-400">📅</span>
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Organization Type</label>
              <select className="w-full border border-fuchsia-500 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e] shadow-[0_0_0_1px_rgba(217,70,239,0.5)]">
                <option>--Select Type--</option>
                <option>Proprietorship Firm</option>
                <option>Partnership Firm</option>
                <option>Private Limited Company</option>
                <option>One Person Company</option>
                <option>Limited Liability Company</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="btn-glossy-teal">
                Filter
              </button>
              <button className="btn-glossy-purple">
                Reset
              </button>
            </div>
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
                  <button key={btn.label} title={btn.label} className="px-3 py-1.5 bg-[#f6f6ff] dark:bg-[#1f1b2e] hover:bg-slate-50 dark:bg-[#1f1b2e]/50 border-r border-slate-300 dark:border-slate-600 last:border-r-0 flex items-center justify-center">
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

          <div className="overflow-x-auto border border-slate-200 dark:border-[#1f1b2e] flex-1">
            <table className="w-full text-left text-sm text-slate-800 dark:text-slate-200">
              <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">
                <tr>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">
                    <div className="flex items-center justify-between">
                      S.No.
                      <span className="text-[10px] flex flex-col leading-[0.5]"><span className="text-white/50">▲</span><span>▼</span></span>
                    </div>
                  </th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Org Type</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Org Name</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">HR Email</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Contact No.</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Whatsapp No.</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap text-center">Description</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Date</th>
                  <th className="px-4 py-3 font-bold whitespace-nowrap text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-8">Loading...</td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-8">No forms found</td>
                  </tr>
                ) : (
                  currentEntries.map((row, index) => {
                    const getField = (fields) => {
                      for (const field of fields) {
                        if (row[field] !== undefined && row[field] !== null && row[field] !== '') return row[field];
                      }
                      return '-';
                    };

                    const orgType = getField(['orgType', 'organizationType', 'm_hf_orgType', 'type', 'm_type']);
                    const orgName = getField(['orgName', 'organizationName', 'm_hf_orgName', 'companyName', 'company', 'name', 'm_name']);
                    const hrEmail = getField(['hrEmail', 'email', 'm_hf_email', 'm_email']);
                    const contactNo = getField(['contactNo', 'contact', 'phone', 'mobile', 'mobileNo', 'm_hf_contact', 'm_phone', 'm_mobile']);
                    const whatsappNo = getField(['whatsappNo', 'altContactNo', 'whatsapp', 'alternateContact', 'm_hf_whatsapp', 'm_whatsapp']);
                    const dateStr = row.createdAt ? new Date(row.createdAt).toLocaleDateString() : row.date || '-';

                    return (
                      <tr key={row._id || index} className="border-b border-slate-200 dark:border-gray-800/50 hover:bg-slate-50 dark:bg-[#1f1b2e]/50 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
                        <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle">
                          {(currentPage - 1) * entriesPerPage + index + 1}
                        </td>
                        <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle w-40">
                          <div className="whitespace-pre-wrap">{orgType}</div>
                        </td>
                        <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle">
                          <span className="bg-[#144f36] text-white border border-transparent px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shadow-sm">
                            {orgName}
                          </span>
                        </td>
                        <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle break-all max-w-[150px]">
                          {hrEmail}
                        </td>
                        <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle whitespace-nowrap">
                          {contactNo}
                        </td>
                        <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle whitespace-nowrap max-w-[150px] overflow-hidden">
                          <div className="break-words whitespace-pre-wrap">
                            {whatsappNo}
                          </div>
                        </td>
                        <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle text-center">
                          <button className="bg-white text-slate-700 border border-slate-300 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-slate-50 transition-colors shadow-sm">
                            View
                          </button>
                        </td>
                        <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle whitespace-nowrap">
                          <div className="w-20">{dateStr}</div>
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
