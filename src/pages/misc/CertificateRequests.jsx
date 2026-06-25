import { useState, useEffect } from 'react'
import { Calendar, X } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function CertificateRequests() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalEntries, setTotalEntries] = useState(0)

  // Filters
  const [filters, setFilters] = useState({
    from_date: '',
    to_date: '',
    status: '',
    search: ''
  })

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedReg, setSelectedReg] = useState(null)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [updateForm, setUpdateForm] = useState({
    status: 'approved',
    certificate_no: '',
    certificate_pdf: ''
  })

  const fetchData = async (overrideFilters = null, page = currentPage) => {
    setLoading(true); setTimeout(() => setLoading(false), 2000)
    try {
      const token = localStorage.getItem('token')
      const activeFilters = overrideFilters || filters
      
      const queryParams = new URLSearchParams({
        page: page,
        limit: entriesPerPage,
        status: activeFilters.status,
        search: activeFilters.search,
        from_date: activeFilters.from_date,
        to_date: activeFilters.to_date
      }).toString()

      const response = await axios.get(`${BASE_URL}/myadmin/certificate/all-requests?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data.status) {
        setData(response.data.data || [])
        setTotalPages(response.data.total_pages || 1)
        setTotalEntries(response.data.total_records || 0)
      }
    } catch (err) {
      console.error('Error fetching certificate requests:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(null, currentPage)
  }, [currentPage, entriesPerPage])

  const handleSearchClick = () => {
    setCurrentPage(1)
    fetchData(filters, 1)
  }

  const handleReset = () => {
    const emptyFilters = { from_date: '', to_date: '', status: '', search: '' }
    setFilters(emptyFilters)
    setCurrentPage(1)
    fetchData(emptyFilters, 1)
  }

  const openUpdateModal = (row) => {
    setSelectedReg(row)
    setUpdateForm({
      status: row.certificate_status || 'approved',
      certificate_no: row.certificate_no || '',
      certificate_pdf: row.certificate_pdf || ''
    })
    setIsModalOpen(true)
  }

  const handleUpdateStatus = async (e) => {
    e.preventDefault()
    setUpdateLoading(true)
    try {
      const token = localStorage.getItem('token')
      const payload = {
        status: updateForm.status,
        certificate_no: updateForm.certificate_no,
        certificate_pdf: updateForm.certificate_pdf
      }

      const response = await axios.put(
        `${BASE_URL}/myadmin/certificate/update-status/${selectedReg.enrollment_id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      if (response.data.status) {
        await window.customAlert(response.data.message || 'Status updated successfully')
        setIsModalOpen(false)
        fetchData(filters, currentPage)
      } else {
        await window.customAlert(response.data.message || 'Failed to update status')
      }
    } catch (err) {
      console.error('Error updating status:', err)
      await window.customAlert(err.response?.data?.message || 'Error updating status')
    } finally {
      setUpdateLoading(false)
    }
  }

  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = Math.min(startIndex + data.length, totalEntries)

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

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const handleExport = async () => {
    if (!data || data.length === 0) {
      await window.customAlert("No data to export");
      return;
    }
    
    const headers = ['S.No.', 'Student Name', 'Email', 'Course', 'Reg Date', 'Progress', 'Certificate No', 'Certificate PDF', 'Status'];
    const csvRows = [headers.join(',')];
    
    data.forEach((row, index) => {
      const values = [
        startIndex + index + 1,
        `"${row.student_name || ''}"`,
        `"${row.student_email || ''}"`,
        `"${row.course_name || ''}"`,
        `"${new Date(row.registration_date).toLocaleDateString()}"`,
        `${row.course_progress || 0}%`,
        `"${row.certificate_no || 'N/A'}"`,
        `"${row.certificate_pdf || 'N/A'}"`,
        `"${row.certificate_status || ''}"`
      ];
      csvRows.push(values.join(','));
    });
    
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "certificate_requests.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="h-full animate-fade-in-up">
      {/* Title Card */}
      <div className="bg-[#144f36] rounded-t-2xl p-5 flex justify-between items-center shadow-md relative overflow-hidden group mb-5">
        <h2 className="text-white font-bold tracking-tight text-xl relative z-10">Course Request</h2>
      </div>

      {/* Filters Card */}
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors p-5 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 items-end w-full">
          {/* From Date */}
          <div className="w-full">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">From Date</label>
            <input 
              type="date" 
              value={filters.from_date}
              onChange={(e) => setFilters({...filters, from_date: e.target.value})}
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-slate-500" 
            />
          </div>
          {/* To Date */}
          <div className="w-full">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">To Date</label>
            <input 
              type="date" 
              value={filters.to_date}
              onChange={(e) => setFilters({...filters, to_date: e.target.value})}
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-slate-500" 
            />
          </div>
          {/* Status */}
          <div className="w-full">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Status</label>
            <select 
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="declined">Declined</option>
            </select>
          </div>
          {/* Search */}
          <div className="w-full">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Search</label>
            <input 
              type="text" 
              placeholder="Search..." 
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" 
            />
          </div>
          {/* Buttons */}
          <div className="flex gap-2 w-full">

            <button onClick={handleSearchClick} className="bg-[#144f36] hover:bg-[#0f3d2a] text-white px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-all">Search / Filter</button>
            <button onClick={handleReset} className="bg-white border border-[#144f36] text-[#144f36] hover:bg-slate-50 px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-all">Reset</button>
            <button onClick={handleExport} className="bg-white border border-[#144f36] text-[#144f36] hover:bg-slate-50 px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-all">Export</button>

          </div>
        </div>
      </div>
      
      {/* Table Section */}
      <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] border border-slate-200 dark:border-[#1f1b2e] rounded-xl overflow-hidden mb-5 p-4">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <span className="text-sm text-slate-800 dark:text-slate-200">Show</span>
            <select 
              value={entriesPerPage}
              onChange={handleEntriesChange}
              className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e] text-slate-800 dark:text-slate-200"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-slate-800 dark:text-slate-200 mr-2">Entries</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
             <div className="p-4 text-center text-slate-500">Loading...</div>
          ) : (
            <table className="w-full text-left text-sm text-slate-800 dark:text-slate-200">
              <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">
                <tr>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">S.No.</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Student Name</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Email</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Course</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top w-20">Reg Date</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Progress</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Certificate No</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Certificate PDF</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Status</th>
                  <th className="px-3 py-3 font-semibold text-xs align-top">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr 
                    key={row.enrollment_id} 
                    className="border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e]"
                  >
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{startIndex + index + 1}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.student_name}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.student_email}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.course_name}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                      <div className="w-10 break-words">{new Date(row.registration_date).toLocaleDateString()}</div>
                    </td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.course_progress}%</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.certificate_no || 'N/A'}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.certificate_pdf || 'N/A'}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        row.certificate_status === 'approved' ? 'bg-green-100 text-green-700' : 
                        row.certificate_status === 'declined' ? 'bg-red-100 text-red-700' : 
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {row.certificate_status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs">
                      <button 
                        onClick={() => openUpdateModal(row)}
                        className="bg-[#144f36] text-white px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap hover:bg-[#0f3d2a] transition-colors"
                      >
                        Change Status
                      </button>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan="10" className="px-3 py-4 text-center text-slate-500">
                      No certificate requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-800 dark:text-slate-200">
          <div className="mb-4 sm:mb-0 font-medium">
            Showing {totalEntries > 0 ? startIndex + 1 : 0} to {endIndex} of {totalEntries} entries
          </div>
          <div className="flex bg-[#f6f6ff] dark:bg-[#1f1b2e] overflow-hidden items-center">
            <button 
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 ${currentPage === 1 ? 'text-slate-800 dark:text-slate-200 cursor-not-allowed' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-slate-500 dark:text-slate-400'}`}
            >
              ◀
            </button>
            
            <div className="flex items-center space-x-1 mx-1">
              {getPageNumbers().map(pageNum => (
                <button 
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${currentPage === pageNum ? 'bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-gray-800' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-slate-600 dark:text-slate-400'}`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1.5 ${currentPage === totalPages || totalPages === 0 ? 'text-slate-800 dark:text-slate-200 cursor-not-allowed' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-slate-500 dark:text-slate-400'}`}
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Changing Status */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-[#13111c] rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center bg-slate-50 dark:bg-[#1f1b2e]">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Update Certificate Status</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateStatus} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Status</label>
                  <select 
                    value={updateForm.status}
                    onChange={(e) => setUpdateForm({...updateForm, status: e.target.value})}
                    className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    required
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Certificate Number</label>
                  <input 
                    type="text" 
                    value={updateForm.certificate_no}
                    onChange={(e) => setUpdateForm({...updateForm, certificate_no: e.target.value})}
                    placeholder="Enter Certificate Number"
                    className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Certificate PDF URL/Path</label>
                  <input 
                    type="text" 
                    value={updateForm.certificate_pdf}
                    onChange={(e) => setUpdateForm({...updateForm, certificate_pdf: e.target.value})}
                    placeholder="Enter PDF Link or Path"
                    className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 border border-slate-300 dark:border-gray-700 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={updateLoading}
                  className="px-5 py-2 bg-[#144f36] hover:bg-[#0f3d2a] text-white rounded-full text-sm font-bold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {updateLoading ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
