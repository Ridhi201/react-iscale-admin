import { useState, useEffect } from 'react'
import { Trash2, X } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'
import { hireWithUsData } from '../../utils/mockData'
import ThemeButton from '../../components/common/ThemeButton'
import CardHeader from '../../components/ui/CardHeader'

export default function HireWithUsList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(50)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalEntries, setTotalEntries] = useState(0)

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [fromDateInput, setFromDateInput] = useState('')
  const [toDateInput, setToDateInput] = useState('')
  const [orgTypeInput, setOrgTypeInput] = useState('--Select Type--')
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    orgType: ''
  })

  // Modal states
  const [selectedForm, setSelectedForm] = useState(null)
  const [modalType, setModalType] = useState(null) // 'org' or 'description'

  const handleApplyFilter = () => {
    setFilters({
      fromDate: fromDateInput,
      toDate: toDateInput,
      orgType: orgTypeInput
    })
    setCurrentPage(1)
  }

  const handleResetFilter = () => {
    setFromDateInput('')
    setToDateInput('')
    setOrgTypeInput('--Select Type--')
    setFilters({
      fromDate: '',
      toDate: '',
      orgType: ''
    })
    setSearchQuery('')
    setCurrentPage(1)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true); setTimeout(() => setLoading(false), 2000)
      const token = localStorage.getItem('token')
      const response = await axios.get(`${BASE_URL}/myadmin/hiring-form/all`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data?.status || response.data?.success || response.data?.data) {
        const fetchedData = response.data.data || []
        if (fetchedData.length > 0) {
          setData(fetchedData)
          setTotalEntries(fetchedData.length)
        } else {
          setData(hireWithUsData || [])
          setTotalEntries(hireWithUsData?.length || 0)
        }
      } else {
        setData(hireWithUsData || [])
        setTotalEntries(hireWithUsData?.length || 0)
      }
    } catch (error) {
      console.error('Error fetching hiring forms:', error)
      setData(hireWithUsData || [])
      setTotalEntries(hireWithUsData?.length || 0)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!await window.customConfirm('Are you sure you want to delete this form entry?')) return
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`${BASE_URL}/myadmin/hiring-form/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data?.status || response.data?.success || response.data?.msg === 'Form deleted successfully') {
        await window.customAlert(response.data.msg || response.data.message || 'Deleted successfully')
        fetchData()
      } else {
        await window.customAlert(response.data.message || response.data.msg || 'Delete failed')
      }
    } catch (error) {
      console.error('Error deleting form:', error)
      await window.customAlert(error.response?.data?.message || error.response?.data?.msg || 'Delete failed')
    }
  }

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const filteredData = data.filter(row => {
    // 1. Search Query filter
    const getFieldStr = (fields) => {
      for (const field of fields) {
        if (row[field] !== undefined && row[field] !== null && row[field] !== '') return String(row[field]);
      }
      return '';
    };

    const orgType = getFieldStr(['organization_type', 'orgType', 'organizationType', 'm_hf_orgType', 'type', 'm_type']).toLowerCase();
    const orgName = getFieldStr(['organization_name', 'orgName', 'organizationName', 'm_hf_orgName', 'companyName', 'company', 'name', 'm_name']).toLowerCase();
    const hrEmail = row.hr_email_1 ? [row.hr_email_1, row.hr_email_2].filter(Boolean).join(' ').toLowerCase() : getFieldStr(['hrEmail', 'email', 'm_hf_email', 'm_email']).toLowerCase();
    const contactNo = getFieldStr(['hr_contact_no', 'contactNo', 'contact', 'phone', 'mobile', 'mobileNo', 'm_hf_contact', 'm_phone', 'm_mobile']).toLowerCase();
    const whatsappNo = getFieldStr(['whatsapp_no', 'whatsappNo', 'altContactNo', 'whatsapp', 'alternateContact', 'm_hf_whatsapp', 'm_whatsapp']).toLowerCase();
    const description = getFieldStr(['description', 'desc', 'message', 'm_hf_description']).toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch = searchQuery === '' || (
      orgType.includes(q) ||
      orgName.includes(q) ||
      hrEmail.includes(q) ||
      contactNo.includes(q) ||
      whatsappNo.includes(q) ||
      description.includes(q)
    );

    if (!matchesSearch) return false;

    // 2. Org Type filter
    if (filters.orgType && filters.orgType !== '--Select Type--') {
      if (orgType !== filters.orgType.toLowerCase()) return false;
    }

    // 3. Date filters
    let rowDateVal = null;
    if (row.createdAt) {
      rowDateVal = new Date(row.createdAt);
    } else if (row.date && row.date !== '-') {
      const parts = row.date.split(/[-/]/);
      if (parts.length === 3) {
        rowDateVal = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      } else {
        rowDateVal = new Date(row.date);
      }
    }

    if (rowDateVal && !isNaN(rowDateVal.getTime())) {
      if (filters.fromDate) {
        const from = new Date(filters.fromDate);
        from.setHours(0,0,0,0);
        const rowDatePart = new Date(rowDateVal);
        rowDatePart.setHours(0,0,0,0);
        if (rowDatePart < from) return false;
      }
      if (filters.toDate) {
        const to = new Date(filters.toDate);
        to.setHours(23,59,59,999);
        const rowDatePart = new Date(rowDateVal);
        rowDatePart.setHours(0,0,0,0);
        if (rowDatePart > to) return false;
      }
    }

    return true;
  });

  const indexOfLastEntry = currentPage * entriesPerPage
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry)
  const totalPages = Math.ceil(filteredData.length / entriesPerPage) || 1

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden flex flex-col h-full">
        <CardHeader title="Hire With Us" />

        {/* Filter Section */}
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">From Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={fromDateInput}
                  onChange={(e) => setFromDateInput(e.target.value)}
                  className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]"
                />
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">To Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={toDateInput}
                  onChange={(e) => setToDateInput(e.target.value)}
                  className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]"
                />
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Organization Type</label>
              <select 
                value={orgTypeInput}
                onChange={(e) => setOrgTypeInput(e.target.value)}
                className="w-full border border-slate-300 dark:border-gray-700 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] bg-[#f6f6ff] dark:bg-[#1f1b2e]"
              >
                <option>--Select Type--</option>
                <option>Proprietorship Firm</option>
                <option>Partnership Firm</option>
                <option>Private Limited Company</option>
                <option>One Person Company</option>
                <option>Limited Liability Company</option>
              </select>
            </div>
            <div className="flex gap-2">
              <ThemeButton onClick={handleApplyFilter} variant="solid-green">
                Filter
              </ThemeButton>
              <ThemeButton onClick={handleResetFilter} variant="outline-green">
                Reset
              </ThemeButton>
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
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded-full px-4 py-1.5 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] w-64"
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
                ) : filteredData.length === 0 ? (
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

                    const orgType = getField(['organization_type', 'orgType', 'organizationType', 'm_hf_orgType', 'type', 'm_type']);
                    const orgName = getField(['organization_name', 'orgName', 'organizationName', 'm_hf_orgName', 'companyName', 'company', 'name', 'm_name']);
                    const hrEmail = row.hr_email_1 ? [row.hr_email_1, row.hr_email_2].filter(Boolean).join(' ') : getField(['hrEmail', 'email', 'm_hf_email', 'm_email']);
                    const contactNo = getField(['hr_contact_no', 'contactNo', 'contact', 'phone', 'mobile', 'mobileNo', 'm_hf_contact', 'm_phone', 'm_mobile']);
                    const whatsappNo = getField(['whatsapp_no', 'whatsappNo', 'altContactNo', 'whatsapp', 'alternateContact', 'm_hf_whatsapp', 'm_whatsapp']);
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
                          <ThemeButton 
                            onClick={() => {
                              setSelectedForm(row);
                              setModalType('org');
                            }}
                            variant="pill-green"
                          >
                            {orgName}
                          </ThemeButton>
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
                          <ThemeButton 
                            onClick={() => {
                              setSelectedForm(row);
                              setModalType('description');
                            }}
                            variant="pill-green"
                          >
                            View
                          </ThemeButton>
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
              Showing {filteredData.length > 0 ? indexOfFirstEntry + 1 : 0} to {Math.min(indexOfLastEntry, filteredData.length)} of {filteredData.length} entries
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

      {/* Org Details Modal */}
      {modalType === 'org' && selectedForm && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in text-left">
          <div className="bg-white dark:bg-[#13111c] rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col border border-slate-200 dark:border-gray-800">
            <div className="p-4 bg-[#144f36] text-white flex justify-between items-center">
              <h3 className="font-bold text-lg">
                {selectedForm.orgName || selectedForm.organizationName || selectedForm.m_hf_orgName || selectedForm.companyName || 'Organization Details'}
              </h3>
              <button 
                onClick={() => {
                  setModalType(null);
                  setSelectedForm(null);
                }}
                className="p-1 hover:bg-[#0f3d2a] rounded-full transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-bold">Organization Name</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedForm.orgName || selectedForm.organizationName || selectedForm.m_hf_orgName || selectedForm.companyName || '-'}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-bold">Organization Type</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedForm.orgType || selectedForm.organizationType || selectedForm.m_hf_orgType || selectedForm.type || '-'}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-bold">HR Email</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 break-all">
                    {selectedForm.hrEmail || selectedForm.email || selectedForm.m_hf_email || '-'}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-bold">Contact No.</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedForm.contactNo || selectedForm.contact || selectedForm.phone || selectedForm.mobile || '-'}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-bold">Whatsapp No.</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedForm.whatsappNo || selectedForm.altContactNo || selectedForm.whatsapp || '-'}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-bold">Submission Date</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedForm.createdAt ? new Date(selectedForm.createdAt).toLocaleDateString() : selectedForm.date || '-'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 dark:border-gray-800 flex justify-end bg-slate-50 dark:bg-[#1f1b2e]/30">
              <ThemeButton 
                onClick={() => {
                  setModalType(null);
                  setSelectedForm(null);
                }}
                variant="solid-green"
              >
                Close
              </ThemeButton>
            </div>
          </div>
        </div>
      )}

      {/* Description View Modal */}
      {modalType === 'description' && selectedForm && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in text-left">
          <div className="bg-white dark:bg-[#13111c] rounded-lg shadow-xl w-full max-w-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-gray-800">
            <div className="p-4 bg-[#144f36] text-white flex justify-between items-center">
              <h3 className="font-bold text-lg">
                {selectedForm.orgName || selectedForm.organizationName || selectedForm.m_hf_orgName || selectedForm.companyName || 'Description'}
              </h3>
              <button 
                onClick={() => {
                  setModalType(null);
                  setSelectedForm(null);
                }}
                className="p-1 hover:bg-[#0f3d2a] rounded-full transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="font-bold text-slate-800 dark:text-slate-200 mb-2">Description / Requirements:</div>
              <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap text-sm leading-relaxed bg-slate-50 dark:bg-[#1f1b2e]/30 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                {selectedForm.description || selectedForm.desc || selectedForm.message || selectedForm.m_hf_description || 'No description provided.'}
              </p>
            </div>
            
            <div className="p-4 border-t border-slate-100 dark:border-gray-800 flex justify-end bg-slate-50 dark:bg-[#1f1b2e]/30">
              <ThemeButton 
                onClick={() => {
                  setModalType(null);
                  setSelectedForm(null);
                }}
                variant="solid-green"
              >
                Close
              </ThemeButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
