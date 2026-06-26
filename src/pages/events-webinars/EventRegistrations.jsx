import { useState, useEffect } from 'react'
import { Eye, Trash2, X } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function EventRegistrations() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalEntries, setTotalEntries] = useState(0)

  const [filters, setFilters] = useState({
    search: '',
    event_id: '',
    from_date: '',
    to_date: ''
  })
  
  const [eventsDropdown, setEventsDropdown] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedReg, setSelectedReg] = useState(null)
  const [loadingModal, setLoadingModal] = useState(false)

  const fetchDropdown = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${BASE_URL}/myadmin/event/get-events-dropdown`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data.status) {
        setEventsDropdown(response.data.data)
      }
    } catch (err) {
      console.error('Error fetching dropdown:', err)
    }
  }

  const fetchData = async (overrideFilters = null, page = currentPage) => {
    setLoading(true); 
    try {
      const token = localStorage.getItem('token')
      const activeFilters = overrideFilters || filters
      const queryParams = new URLSearchParams({
        page: page,
        limit: entriesPerPage,
        search: activeFilters.search,
        event_id: activeFilters.event_id,
        from_date: activeFilters.from_date,
        to_date: activeFilters.to_date
      }).toString()

      const response = await axios.get(`${BASE_URL}/myadmin/registrations/all-events?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data.status) {
        setData(response.data.data || [])
        setTotalPages(response.data.total_pages || 1)
        setTotalEntries(response.data.total_records || 0)
      }
    } catch (err) {
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDropdown()
  }, [])

  useEffect(() => {
    fetchData(null, currentPage)
  }, [currentPage, entriesPerPage])

  const handleSearchClick = () => {
    setCurrentPage(1)
    fetchData(filters, 1)
  }

  const handleReset = () => {
    const emptyFilters = { search: '', event_id: '', from_date: '', to_date: '' }
    setFilters(emptyFilters)
    setCurrentPage(1)
    fetchData(emptyFilters, 1)
  }

  const handleDelete = async (id) => {
    if (!await window.customConfirm('Are you sure you want to delete this event registration?')) return
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`${BASE_URL}/myadmin/registrations/delete-event/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data.status) {
        await window.customAlert(response.data.message || 'Deleted successfully')
        fetchData()
      }
    } catch (err) {
      console.error('Error deleting:', err)
      await window.customAlert('Failed to delete registration')
    }
  }

  const handleView = async (id) => {
    setIsModalOpen(true)
    setLoadingModal(true)
    setSelectedReg(null)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${BASE_URL}/myadmin/registrations/single-event/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data.status) {
        setSelectedReg(response.data.data)
      }
    } catch (err) {
      console.error('Error fetching single registration:', err)
      await window.customAlert('Failed to load details')
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

  const handleExport = async () => {
    if (!data || data.length === 0) {
      await window.customAlert("No data to export");
      return;
    }
    
    const headers = ['S.No.', 'Candidate Name', 'Mobile No.', 'EmailID', 'Event Title', 'Reg Date'];
    const csvRows = [headers.join(',')];
    
    data.forEach((row, index) => {
      const values = [
        startIndex + index + 1,
        `"${row.user?.full_name || ''}"`,
        `"${row.user?.mobile || ''}"`,
        `"${row.user?.email || ''}"`,
        `"${row.event?.title || ''}"`,
        `"${new Date(row.enrollment_date).toLocaleDateString()}"`
      ];
      csvRows.push(values.join(','));
    });
    
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "event_registrations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="h-full animate-fade-in-up">
      {/* Title Card */}
      <div className="bg-[#144f36] rounded-t-2xl p-5 flex justify-between items-center shadow-md relative overflow-hidden group mb-5">
        <h2 className="text-white font-bold tracking-tight text-xl relative z-10">Event Enrollment List</h2>
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
          {/* Event Title */}
          <div className="w-full">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Event Title</label>
            <select 
              value={filters.event_id}
              onChange={(e) => setFilters({...filters, event_id: e.target.value})}
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            >
              <option value="">All Events</option>
              {eventsDropdown.map(ev => (
                <option key={ev._id} value={ev._id}>{ev.m_event_title}</option>
              ))}
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
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Candidate Name</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Mobile No.</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">EmailID</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Event Title</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top w-20">Reg Date</th>
                  <th className="px-3 py-3 font-semibold text-xs align-top">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr 
                    key={row.registration_id} 
                    className="border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e] hover:bg-slate-50 dark:bg-[#1f1b2e]/50 transition-colors"
                  >
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{startIndex + index + 1}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                      <div className="break-words">{row.user?.full_name}</div>
                    </td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.user?.mobile}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.user?.email}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50 text-slate-600 dark:text-slate-400">{row.event?.title}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                      <div className="w-10 break-words">{new Date(row.enrollment_date).toLocaleDateString()}</div>
                    </td>
                    <td className="px-3 py-3 text-xs">
                      <div className="flex gap-2">
                        <button onClick={() => handleView(row.registration_id)} className="bg-[#144f36] text-white p-1.5 rounded hover:bg-[#0f3d2a] transition-colors">
                          <Eye size={16} />
                        </button>
                        <button onClick={() => handleDelete(row.registration_id)} className="bg-red-600 text-white p-1.5 rounded hover:bg-red-700 transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-3 py-4 text-center text-slate-500">
                      No event registrations found.
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

      {/* Modal for View Details */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-[#13111c] rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center bg-slate-50 dark:bg-[#1f1b2e]">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Registration Details</h3>
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
                  {/* User Info */}
                  <div className="border border-slate-200 dark:border-gray-800 rounded-xl p-4 bg-slate-50 dark:bg-[#1f1b2e]/30">
                    <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-3 uppercase text-xs tracking-wider">Candidate Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Full Name</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.user.full_name}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Email</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.user.email}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Mobile</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.user.mobile}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Alternate Mobile</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.user.alternate_mobile}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Address</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.user.address.trim()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Event Info */}
                  <div className="border border-slate-200 dark:border-gray-800 rounded-xl p-4 bg-slate-50 dark:bg-[#1f1b2e]/30">
                    <h4 className="font-semibold text-teal-700 dark:text-teal-400 mb-3 uppercase text-xs tracking-wider">Event Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Event Title</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.event.m_event_title}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Start Date</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{new Date(selectedReg.event.m_event_date_start).toLocaleDateString()} {selectedReg.event.m_event_time_start}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">End Date</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{new Date(selectedReg.event.m_event_date_end).toLocaleDateString()} {selectedReg.event.m_event_time_end}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Host</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.event.m_event_host}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Skill Level</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.event.m_event_skill_level}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Enrollment Date</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{new Date(selectedReg.enrolled_on).toLocaleString()}</p>
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
