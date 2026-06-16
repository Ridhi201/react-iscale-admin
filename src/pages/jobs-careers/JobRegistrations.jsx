import { useState, useEffect } from 'react'
import { Calendar, Eye, Trash2, X } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function JobRegistrations() {
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
    search: '',
    job_id: '',
    company_name: ''
  })

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedReg, setSelectedReg] = useState(null)
  const [loadingModal, setLoadingModal] = useState(false)

  const fetchData = async (overrideFilters = null, page = currentPage) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const activeFilters = overrideFilters || filters
      
      const queryParams = new URLSearchParams({
        page: page,
        limit: entriesPerPage,
        search: activeFilters.search,
        job_id: activeFilters.job_id,
        company_name: activeFilters.company_name,
        from_date: activeFilters.from_date,
        to_date: activeFilters.to_date
      }).toString()

      const response = await axios.get(`${BASE_URL}/myadmin/registrations/job-applications?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data.status) {
        setData(response.data.data || [])
        setTotalPages(response.data.total_pages || 1)
        setTotalEntries(response.data.total_records || 0)
      }
    } catch (err) {
      console.error('Error fetching job applications:', err)
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
    const emptyFilters = { from_date: '', to_date: '', search: '', job_id: '', company_name: '' }
    setFilters(emptyFilters)
    setCurrentPage(1)
    fetchData(emptyFilters, 1)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job application?')) return
    
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`${BASE_URL}/myadmin/registrations/delete-job-application/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data.status) {
        alert(response.data.message || 'Deleted successfully')
        fetchData(filters, currentPage)
      } else {
        alert(response.data.message || 'Failed to delete')
      }
    } catch (err) {
      console.error('Error deleting:', err)
      alert(err.response?.data?.message || 'Error deleting application')
    }
  }

  const handleView = async (id) => {
    setIsModalOpen(true)
    setLoadingModal(true)
    setSelectedReg(null)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${BASE_URL}/myadmin/registrations/single-job-application/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data.status) {
        setSelectedReg(response.data.data)
      }
    } catch (err) {
      console.error('Error fetching single job application details:', err)
      alert('Failed to load details')
      setIsModalOpen(false)
    } finally {
      setLoadingModal(false)
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

  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }
    
    const headers = ['S.No.', 'Candidate Name', 'Mobile', 'Email', 'Job Title', 'Company Name', 'Location', 'Salary Range', 'Applied Date'];
    const csvRows = [headers.join(',')];
    
    data.forEach((row, index) => {
      const values = [
        startIndex + index + 1,
        `"${row.user_id?.c_first_name || ''} ${row.user_id?.c_last_name || ''}"`,
        `"${row.user_id?.c_contact || ''}"`,
        `"${row.user_id?.c_email || ''}"`,
        `"${row.job_id?.job_title || ''}"`,
        `"${row.job_id?.company_name || ''}"`,
        `"${row.job_id?.job_locations?.join('; ') || 'N/A'}"`,
        `"${row.job_id?.salary?.min || ''} - ${row.job_id?.salary?.max || ''}"`,
        `"${new Date(row.applied_at).toLocaleDateString()}"`
      ];
      csvRows.push(values.join(','));
    });
    
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "job_applications.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="h-full animate-fade-in-up">
      {/* Title Card */}
      <div className="bg-[#144f36] rounded-t-2xl p-5 flex justify-between items-center shadow-md relative overflow-hidden group mb-5">
        <h2 className="text-white font-bold tracking-tight text-xl relative z-10">Job Applications List</h2>
      </div>

      {/* Filters Card */}
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors p-5 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-end w-full">
          <div className="w-full">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">From Date</label>
            <input 
              type="date" 
              value={filters.from_date}
              onChange={(e) => setFilters({...filters, from_date: e.target.value})}
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-slate-500" 
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">To Date</label>
            <input 
              type="date" 
              value={filters.to_date}
              onChange={(e) => setFilters({...filters, to_date: e.target.value})}
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-slate-500" 
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Job ID / Title</label>
            <input 
              type="text" 
              placeholder="Search by job ID or Title..." 
              value={filters.job_id}
              onChange={(e) => setFilters({...filters, job_id: e.target.value})}
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" 
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Company Name</label>
            <input 
              type="text" 
              placeholder="Search Company..." 
              value={filters.company_name}
              onChange={(e) => setFilters({...filters, company_name: e.target.value})}
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" 
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Search (User)</label>
            <input 
              type="text" 
              placeholder="Search Name/Email..." 
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" 
            />
          </div>
          <div className="flex gap-2 w-full">

            <button onClick={handleSearchClick} className="bg-[#144f36] hover:bg-[#0f3d2a] text-white px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-all">Search / Filter</button>
            <button onClick={handleReset} className="bg-white border border-[#144f36] text-[#144f36] hover:bg-slate-50 px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-all">Reset</button>
            <button onClick={handleExport} className="bg-white border border-[#144f36] text-[#144f36] hover:bg-slate-50 px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-all">Export</button>

          </div>
        </div>
      </div>
      
      {/* Table Section */}
      <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] border border-slate-200 dark:border-[#1f1b2e] rounded-xl overflow-hidden mb-5 p-4 shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow">
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
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Candidate Name</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Mobile</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Email</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Job Title</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Company Name</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Location</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Salary Range</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top w-20">Applied Date</th>
                  <th className="px-3 py-3 font-semibold text-xs align-top">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr 
                    key={row._id} 
                    className={`border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#111827] hover:bg-slate-50 dark:bg-[#1f1b2e]/50 dark:hover:bg-[#1f2937] transition-colors`}
                  >
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{startIndex + index + 1}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                      <div className="break-words">{row.user_id?.c_first_name} {row.user_id?.c_last_name}</div>
                    </td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.user_id?.c_contact}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                      <div className="max-w-[120px] break-words">{row.user_id?.c_email}</div>
                    </td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                      <div className="font-semibold text-indigo-600 dark:text-indigo-400">{row.job_id?.job_title}</div>
                    </td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.job_id?.company_name}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                      {row.job_id?.job_locations?.join(', ') || 'N/A'}
                    </td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                      ₹{row.job_id?.salary?.min} - ₹{row.job_id?.salary?.max}
                    </td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                      <div className="w-10 break-words">{new Date(row.applied_at).toLocaleDateString()}</div>
                    </td>
                    <td className="px-3 py-3 text-xs">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleView(row._id)}
                          className="bg-[#144f36] text-white p-1.5 rounded hover:bg-[#0f3d2a] transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(row._id)}
                          className="bg-red-600 text-white p-1.5 rounded hover:bg-red-700 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan="10" className="px-3 py-4 text-center text-slate-500">
                      No job applications found.
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
          <div className="flex bg-[#f6f6ff] dark:bg-[#1f1b2e] overflow-hidden items-center border border-slate-300 dark:border-gray-700 rounded">
            <button 
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 border-r border-slate-300 dark:border-gray-700 ${currentPage === 1 ? 'text-slate-800 dark:text-slate-200 cursor-not-allowed' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-slate-500 dark:text-slate-400'}`}
            >
              «
            </button>
            
            {getPageNumbers().map(pageNum => (
              <button 
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 flex items-center justify-center text-sm border-r border-slate-300 dark:border-gray-700 ${currentPage === pageNum ? 'bg-slate-200 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 font-bold' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-slate-600 dark:text-slate-400'}`}
              >
                {pageNum}
              </button>
            ))}
            
            <button 
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1.5 ${currentPage === totalPages || totalPages === 0 ? 'text-slate-800 dark:text-slate-200 cursor-not-allowed' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-slate-500 dark:text-slate-400'}`}
            >
              »
            </button>
          </div>
        </div>
      </div>

      {/* Modal for View Application Details */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-[#13111c] rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center bg-slate-50 dark:bg-[#1f1b2e]">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Job Application Details</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              {loadingModal ? (
                <div className="text-center text-slate-500 py-10">Loading details...</div>
              ) : selectedReg ? (
                <div className="space-y-6 text-sm">
                  {/* Applied Info */}
                  <div className="flex justify-between items-center bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800">
                    <div>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 uppercase tracking-wider font-semibold">Applied On</p>
                      <p className="font-bold text-indigo-900 dark:text-indigo-300 text-lg">{new Date(selectedReg.applied_at).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Candidate Info */}
                  <div className="border border-slate-200 dark:border-gray-800 rounded-xl p-4 bg-slate-50 dark:bg-[#1f1b2e]/30">
                    <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-3 uppercase text-xs tracking-wider">Candidate Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Name</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.user_id?.c_first_name} {selectedReg.user_id?.c_last_name}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Email</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.user_id?.c_email}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Contact</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.user_id?.c_contact}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Alternate Contact</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.user_id?.c_alt_contact || 'N/A'}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Address / City</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">
                          {selectedReg.user_id?.c_current_address1} / {selectedReg.user_id?.c_current_city}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Job Info */}
                    <div className="border border-slate-200 dark:border-gray-800 rounded-xl p-4 bg-slate-50 dark:bg-[#1f1b2e]/30">
                      <h4 className="font-semibold text-teal-700 dark:text-teal-400 mb-3 uppercase text-xs tracking-wider">Job Details</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Job Title</p>
                          <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.job_id?.job_title}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Experience Required</p>
                          <p className="font-medium text-slate-800 dark:text-slate-200">
                            {selectedReg.job_id?.experience?.min} - {selectedReg.job_id?.experience?.max} {selectedReg.job_id?.experience?.label}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Salary Range</p>
                          <p className="font-medium text-slate-800 dark:text-slate-200">
                            ₹{selectedReg.job_id?.salary?.min} - ₹{selectedReg.job_id?.salary?.max} <span className="text-xs text-slate-500">({selectedReg.job_id?.salary_type?.replace('_', ' ')})</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Locations</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedReg.job_id?.job_locations?.map((loc, i) => (
                              <span key={i} className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-[10px] uppercase font-bold">
                                {loc}
                              </span>
                            ))}
                          </div>
                        </div>
                        {selectedReg.job_id?.application_link && (
                          <div>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Application Link</p>
                            <a href={selectedReg.job_id?.application_link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all text-xs">
                              {selectedReg.job_id?.application_link}
                            </a>
                          </div>
                        )}
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Description</p>
                          <p className="font-medium text-slate-800 dark:text-slate-200 text-xs italic">
                            "{selectedReg.job_id?.job_description}"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Company Info */}
                    <div className="border border-slate-200 dark:border-gray-800 rounded-xl p-4 bg-slate-50 dark:bg-[#1f1b2e]/30">
                      <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-3 uppercase text-xs tracking-wider">Company Details</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Company Name</p>
                          <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.job_id?.company_name}</p>
                        </div>
                        {selectedReg.job_id?.company_social_links?.linkedin && (
                          <div>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">LinkedIn</p>
                            <a href={selectedReg.job_id?.company_social_links?.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all text-xs">
                              {selectedReg.job_id?.company_social_links?.linkedin}
                            </a>
                          </div>
                        )}
                        {selectedReg.job_id?.company_social_links?.website && (
                          <div>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Website</p>
                            <a href={selectedReg.job_id?.company_social_links?.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all text-xs">
                              {selectedReg.job_id?.company_social_links?.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-red-500 py-10">Failed to load registration details.</div>
              )}
            </div>
            
            <div className="p-4 border-t border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-[#1f1b2e] flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-full text-sm font-medium transition-colors"
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
