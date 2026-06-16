import { useState, useEffect } from 'react'
import { Calendar, Eye, X } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function Registrations() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(50)
  const [totalPages, setTotalPages] = useState(1)
  const [totalEntries, setTotalEntries] = useState(0)

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedReg, setSelectedReg] = useState(null)
  const [loadingModal, setLoadingModal] = useState(false)

  const [searchInput, setSearchInput] = useState('')
  const [fromDateInput, setFromDateInput] = useState('')
  const [toDateInput, setToDateInput] = useState('')
  const [courseInput, setCourseInput] = useState('')
  const [sourceInput, setSourceInput] = useState('')
  const [statusInput, setStatusInput] = useState('')
  const [fetchTrigger, setFetchTrigger] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        
        const queryParams = new URLSearchParams({
          page: currentPage,
          limit: entriesPerPage,
          ...(fromDateInput && { fromDate: fromDateInput }),
          ...(toDateInput && { toDate: toDateInput }),
          ...(courseInput && courseInput !== 'Select Value' && { course: courseInput }),
          ...(sourceInput && sourceInput !== 'Select Value' && { source: sourceInput }),
          ...(statusInput && statusInput !== 'Select Value' && { status: statusInput }),
          ...(searchInput && { search: searchInput }),
        }).toString();

        const response = await axios.get(
          `${BASE_URL}/myadmin/registrations/course-registrations?${queryParams}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        if (response.data.status) {
          setData(response.data.data)
          setTotalPages(response.data.total_pages || 1)
          setTotalEntries(response.data.total_records || 0)
        }
      } catch (err) {
        console.error('Failed to fetch course registrations:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [currentPage, entriesPerPage, fetchTrigger])

  const handleView = async (id) => {
    setIsModalOpen(true)
    setLoadingModal(true)
    setSelectedReg(null)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${BASE_URL}/myadmin/registrations/course-purchase-details/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data.status) {
        setSelectedReg(response.data.data)
      }
    } catch (err) {
      console.error('Error fetching course purchase details:', err)
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
    let startPage = Math.max(1, currentPage - 1)
    let endPage = Math.min(totalPages, startPage + 3)
    if (endPage - startPage < 3) {
      startPage = Math.max(1, endPage - 3)
    }
    
    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  
  const handleSearchClick = () => {
    setCurrentPage(1)
    setFetchTrigger(prev => prev + 1)
  }

  
  const handleReset = () => {
    setSearchInput('')
    setFromDateInput('')
    setToDateInput('')
    setCourseInput('')
    setSourceInput('')
    setStatusInput('')
    setCurrentPage(1)
    setFetchTrigger(prev => prev + 1)
  }

  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }
    
    const headers = ['S.No.', 'Student', 'Phone Number', 'Email', 'Course', 'Regn. Date', 'Amount', 'Payable', 'Discount', 'Coupon', 'App Duration', 'Web Duration'];
    const csvRows = [headers.join(',')];
    
    data.forEach((row, index) => {
      const values = [
        startIndex + index + 1,
        `"${row.student_name || ''}"`,
        `"${row.student_phone || ''}"`,
        `"${row.student_email || ''}"`,
        `"${row.course_name || ''}"`,
        `"${new Date(row.registration_date).toLocaleDateString()}"`,
        row.course_amount || 0,
        row.payable_amount || 0,
        row.discount_amount || 0,
        row.offer_amount || 'N/A',
        `${row.days_left || 0} Days`,
        `${row.days_left || 0} Days`
      ];
      csvRows.push(values.join(','));
    });
    
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "purchased_courses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  return (
    <div className="h-full animate-fade-in-up">
      {/* Title Card */}
      <div className="bg-[#144f36] rounded-t-2xl p-5 flex justify-between items-center shadow-md relative overflow-hidden group mb-5">
        <h2 className="text-white font-bold tracking-tight text-xl relative z-10">Purchased Courses List</h2>
      </div>

      {/* Filters Card */}
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors p-5 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-end w-full">
          {/* From Date */}
          <div className="w-full">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">From Date</label>
            <input type="date" value={fromDateInput} onChange={(e) => setFromDateInput(e.target.value)} className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-slate-500" />
          </div>
          {/* To Date */}
          <div className="w-full">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">To Date</label>
            <input type="date" value={toDateInput} onChange={(e) => setToDateInput(e.target.value)} className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-slate-500" />
          </div>
          {/* Course */}
          <div className="w-full">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Course</label>
            <select value={courseInput} onChange={(e) => setCourseInput(e.target.value)} className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
              <option value="">Select Value</option>
              <option value="data_science">Data Science Course</option>
              <option value="master_data_analytics">Master of Data Analytics</option>
            </select>
          </div>
          {/* Registration From */}
          <div className="w-full">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Registration From</label>
            <select value={sourceInput} onChange={(e) => setSourceInput(e.target.value)} className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
              <option value="">Select Value</option>
              <option value="App">App</option>
              <option value="Web">Web</option>
            </select>
          </div>
          {/* Status */}
          <div className="w-full">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Status</label>
            <select value={statusInput} onChange={(e) => setStatusInput(e.target.value)} className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
              <option value="">Select Value</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          {/* Search */}
          <div className="w-full">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Search</label>
            <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search..." className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" />
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
      <div className="bg-[#f6f6ff] border border-slate-100 rounded-2xl overflow-hidden shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow mb-5 p-4">
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
            <div className="flex gap-0 border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded overflow-hidden flex-wrap">
              {[
                { label: 'Copy', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> },
                { label: 'Excel', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h2"/><path d="M8 17h2"/><path d="M14 13h2"/><path d="M14 17h2"/></svg> },
                { label: 'PDF', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg> },
                { label: 'Print', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg> }
              ]
.map(btn => (
                  <button 
                    key={btn.label} 
                    title={btn.label} 
                    onClick={() => {
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
                          alert('Table data copied to clipboard!');
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
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-4 text-center text-slate-500">Loading...</div>
          ) : (
            <table className="w-full text-left text-sm text-slate-800 dark:text-slate-200">
              <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">
                <tr>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">S.No.</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Student</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Phone Number</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Email</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Course</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top w-20">Regn. Date</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Amount</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Payable</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Discount</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Coupon</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">App Duration</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Web Duration</th>
                  <th className="px-3 py-3 font-semibold text-xs border-r border-slate-200 dark:border-gray-800/50 align-top">Batch Name</th>
                  <th className="px-3 py-3 font-semibold text-xs align-top">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr 
                    key={row.enrollment_id} 
                    className="border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#111827] hover:bg-slate-50 dark:bg-[#1f1b2e]/50 dark:hover:bg-[#1f2937] transition-colors"
                  >
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{startIndex + index + 1}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.student_name}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.student_phone}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                      <div className="max-w-[120px] break-words">{row.student_email}</div>
                    </td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                      <div className="max-w-[100px] break-words">{row.course_name}</div>
                    </td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                      <div className="w-10 break-words">{new Date(row.registration_date).toLocaleDateString()}</div>
                    </td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.course_amount}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.payable_amount}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.discount_amount}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">{row.offer_amount || 'N/A'}</td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                      <div className="max-w-[100px] break-words">{row.days_left} Days</div>
                    </td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">
                      <div className="max-w-[100px] break-words">{row.days_left} Days</div>
                    </td>
                    <td className="px-3 py-3 text-xs border-r border-slate-200 dark:border-gray-800/50">N/A</td>
                    <td className="px-3 py-3 text-xs">
                      <button 
                        onClick={() => handleView(row.enrollment_id)}
                        className="bg-[#144f36] text-white p-1.5 rounded hover:bg-[#0f3d2a] transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan="14" className="px-3 py-4 text-center text-slate-500">
                      No course registrations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-[#f6f6ff] border border-slate-100 rounded-2xl p-4 shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow flex flex-col sm:flex-row justify-between items-center text-sm text-slate-800 dark:text-slate-200">
        <div className="mb-4 sm:mb-0 font-medium">
          Showing {totalEntries > 0 ? startIndex + 1 : 0} to {endIndex} of {totalEntries} entries
        </div>
        <div className="flex bg-[#f6f6ff] dark:bg-[#1f1b2e] border border-slate-300 dark:border-gray-700 text-slate-700 dark:text-slate-300 rounded overflow-hidden">
          <button 
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-3 py-1.5 border-r border-slate-300 dark:border-slate-600 ${currentPage === 1 ? 'text-slate-800 dark:text-slate-200 cursor-not-allowed' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-slate-500 dark:text-slate-400'}`}
          >
            «
          </button>
          
          {getPageNumbers().map(pageNum => (
            <button 
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1.5 border-r border-slate-300 dark:border-slate-600 ${currentPage === pageNum ? 'bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-[#1b365d]'}`}
            >
              {pageNum}
            </button>
          ))}
          
          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-3 py-1.5 border-r border-slate-300 dark:border-slate-600 ${currentPage === totalPages || totalPages === 0 ? 'text-slate-800 dark:text-slate-200 cursor-not-allowed' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-slate-500 dark:text-slate-400'}`}
          >
            »
          </button>
          <button 
            onClick={() => setCurrentPage(totalPages)} 
            disabled={totalPages === 0}
            className="px-3 py-1.5 hover:bg-slate-50 dark:bg-[#1f1b2e]/50 text-[#1b365d]"
          >
            Last
          </button>
        </div>
      </div>

      {/* Modal for View Purchase Details */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-[#13111c] rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center bg-slate-50 dark:bg-[#1f1b2e]">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Course Purchase Details</h3>
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
                  {/* Candidate Info */}
                  <div className="border border-slate-200 dark:border-gray-800 rounded-xl p-4 bg-slate-50 dark:bg-[#1f1b2e]/30">
                    <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-3 uppercase text-xs tracking-wider">Candidate Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Name</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.student.name}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Email</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.student.email}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Mobile</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.student.phone}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Alternate Mobile</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.student.alt_phone}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Address</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.student.address.trim() || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="border border-slate-200 dark:border-gray-800 rounded-xl p-4 bg-slate-50 dark:bg-[#1f1b2e]/30">
                    <h4 className="font-semibold text-teal-700 dark:text-teal-400 mb-3 uppercase text-xs tracking-wider">Course Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Course Title</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.course.title}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Price</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">₹{selectedReg.course.price}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Offer Price</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">₹{selectedReg.course.offer_price}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Description</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200 text-xs">{selectedReg.course.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Registration & Payment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-slate-200 dark:border-gray-800 rounded-xl p-4 bg-slate-50 dark:bg-[#1f1b2e]/30">
                      <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-3 uppercase text-xs tracking-wider">Registration Details</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Registration Date</p>
                          <p className="font-medium text-slate-800 dark:text-slate-200">{new Date(selectedReg.registration.registration_date).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Access Type</p>
                          <p className="font-medium text-slate-800 dark:text-slate-200 capitalize">{selectedReg.registration.access_type}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Progress</p>
                          <p className="font-medium text-slate-800 dark:text-slate-200">{selectedReg.registration.progress}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-slate-200 dark:border-gray-800 rounded-xl p-4 bg-slate-50 dark:bg-[#1f1b2e]/30">
                      <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-3 uppercase text-xs tracking-wider">Payment Details</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Status</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            selectedReg.payment.payment_status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {selectedReg.payment.payment_status}
                          </span>
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Purchased Price</p>
                          <p className="font-medium text-slate-800 dark:text-slate-200">₹{selectedReg.payment.purchased_price}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Payment Mode</p>
                          <p className="font-medium text-slate-800 dark:text-slate-200 capitalize">{selectedReg.payment.payment_mode}</p>
                        </div>
                        {selectedReg.payment.transaction_id && (
                          <div>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Transaction ID</p>
                            <p className="font-medium text-slate-800 dark:text-slate-200 text-xs break-all">{selectedReg.payment.transaction_id}</p>
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
