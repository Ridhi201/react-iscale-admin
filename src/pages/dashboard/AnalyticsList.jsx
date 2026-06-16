import IconButton from '../../components/common/IconButton'
import { useState, useMemo } from 'react'
import { Eye, Trash2, Search, Download, Copy, FileSpreadsheet, FileText, Printer } from 'lucide-react'

const TOTAL_ENTRIES = 53547

export default function AnalyticsList() {
  const [currentPage, setCurrentPage] = useState(2678)
  const entriesPerPage = 20

  const TOTAL_PAGES = 2678
  
  // Generating dynamic fake data based on current page to simulate 53k entries without lag
  const currentData = useMemo(() => {
    const templates = [
      { lead: 'Prompt Engineering Full Course | Beginner To Pro', name: 'Muhammad Zain', mobile: '3024856365', email: 'F25-Phar-300013@Rlku.Edu.Pk', gender: 'Other', date: '23-05-2026' },
      { lead: 'Prompt Engineering Full Course | Beginner To Pro', name: 'Armaan Ahmed', mobile: '8448503528', email: 'Armaanahmed205@Gmail.com', gender: 'Other', date: '23-05-2026' },
      { lead: 'Machine Learning Full Course | Beginner To Advance', name: 'Khushi Butani', mobile: '9313492111', email: 'Butanikhushi49@Gmail.Com', gender: 'Other', date: '23-05-2026' },
      { lead: 'Prompt Engineering Full Course | Beginner To Pro', name: 'Yashi', mobile: '9205668860', email: 'Galaxyofsketchesyashi@Email.com', gender: 'Other', date: '23-05-2026' },
      { lead: 'Prompt Engineering Full Course | Beginner To Pro', name: 'Prakriti', mobile: '7531900597', email: 'Ina.Praki@Gmail.Com', gender: 'Other', date: '23-05-2026' },
      { lead: 'Data Analyst Course Form', name: 'Aman Singh', mobile: '9876543210', email: 'Amansingh@Gmail.Com', gender: 'Male', date: '21-11-2023' },
      { lead: 'Data Analyst Course Form', name: 'Kratika', mobile: '7898033009', email: 'Jainkratika027@Gmail.Com', gender: 'Female', date: '21-11-2023' },
      { lead: 'Data Analyst Course Form', name: 'Alok Kumar', mobile: '8577909760', email: 'Alokkushwahaknj@Gmail.Com', gender: 'Male', date: '21-11-2023' },
      { lead: 'Data Analyst Course Form', name: 'Vishal Ashok Jagtap', mobile: '8805683349', email: 'Jagtapvishal262@Gmail.Com', gender: 'Male', date: '21-11-2023' },
      { lead: 'Data Analyst Course Form', name: 'Akanksha', mobile: '9039195377', email: 'Ayushdew@Gmail.Com', gender: 'Female', date: '02-11-2023' },
      { lead: '', name: 'Ashish', mobile: '9329091092', email: 'Ashish1.Contact@Gmail.Com', gender: 'Male', date: '02-11-2023' },
      { lead: '', name: 'Test ABC', mobile: '9926173400', email: 'Sdewa@Yahoo.Com', gender: 'Female', date: '30-10-2023' },
    ]

    return Array.from({ length: 7 }, (_, i) => {
      const template = templates[i]
      return {
        id: i + 1,
        sno: i + 1,
        leadName: template.lead,
        fullName: template.name,
        mobile: template.mobile,
        email: template.email,
        gender: template.gender,
        createdAt: template.date
      }
    })
  }, [currentPage])

  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = Math.min(startIndex + entriesPerPage, TOTAL_ENTRIES)

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(TOTAL_PAGES, startPage + 4)
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4)
    }
    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="h-full animate-fade-in-up flex flex-col gap-4">
      {/* Top Header */}
      <div className="bg-[#144f36] dark:bg-[#0f3d2a] rounded-xl shadow-sm border border-[#144f36] p-4">
        <h2 className="text-lg font-bold text-white tracking-tight">Analytics List</h2>
      </div>

      {/* Filters */}
      <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">From Date</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="dd-mm-yyyy"
                className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] pr-10"
              />
              <div className="absolute right-3 top-2.5 text-slate-600 dark:text-slate-400">📅</div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">To Date</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="dd-mm-yyyy"
                className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] pr-10"
              />
              <div className="absolute right-3 top-2.5 text-slate-600 dark:text-slate-400">📅</div>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Lead Generate</label>
            <select className="w-full border border-slate-300 dark:border-gray-700 rounded px-3 py-2 text-sm outline-none bg-white dark:bg-[#13111c] focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]">
              <option>--Select Lead Generate--</option>
              <option>A.I. Full Course (Free) | Master AI Tools & Core Concepts Notes</option>
              <option>Advanced AI Full Course (100% FREE) 2026 | Download PDF</option>
              <option>AI Masterclass | Tools & Prompt Notes</option>
              <option>Data Analyst Course Form</option>
              <option>Prompt Engineering Full Course | Beginner To Pro</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Search By Name</label>
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]"
            />
          </div>
          <div className="md:col-span-3 flex gap-3 pb-0">
            <button className="bg-[#144f36] text-white px-6 py-2 rounded-full font-bold hover:bg-[#0f3d2a] transition-colors shadow-sm flex items-center justify-center">
              Search / Filter
            </button>
            <button className="bg-white text-[#144f36] border border-[#144f36] px-6 py-2 rounded-full font-bold hover:bg-slate-50 transition-colors shadow-sm">
              Reset
            </button>
            <button className="bg-white text-[#144f36] border border-[#144f36] px-6 py-2 rounded-full font-bold hover:bg-slate-50 transition-colors shadow-sm">
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Table Data Box */}
      <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] rounded-xl shadow-sm border border-slate-200 flex flex-col flex-1 min-h-[300px]">
        <div className="p-4 flex items-center gap-4 border-b border-slate-200 dark:border-gray-800/50">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-700">Show</span>
            <select className="border border-slate-300 rounded px-2 py-1 text-sm outline-none focus:border-[#144f36]">
              <option>50</option>
            </select>
            <span className="text-sm text-slate-700">Entries</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 border border-slate-200 rounded text-blue-600 hover:bg-blue-50 transition-colors"><Copy size={16} /></button>
            <button className="p-1.5 border border-slate-200 rounded text-green-600 hover:bg-green-50 transition-colors"><FileSpreadsheet size={16} /></button>
            <button className="p-1.5 border border-slate-200 rounded text-red-600 hover:bg-red-50 transition-colors"><FileText size={16} /></button>
            <button className="p-1.5 border border-slate-200 rounded text-teal-600 hover:bg-teal-50 transition-colors"><Printer size={16} /></button>
          </div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col min-h-0">
          <div className="overflow-auto border border-slate-200 dark:border-[#1f1b2e] flex-1 rounded-t-lg">
            <table className="w-full text-left text-sm text-slate-800 dark:text-slate-200">
              <thead className="bg-[#1e405a] text-white border-b border-slate-200 dark:border-gray-800">
                <tr>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">S.No.</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Lead Name</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Full Name</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Mobile</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Email</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Gender</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">CreatedAt</th>
                  <th className="px-4 py-3 font-bold whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row) => (
                  <tr key={row.id} className={`border-b border-slate-200 dark:border-gray-800/50 ${row.sno === 4 ? 'bg-[#fee2e2]' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 bg-white dark:bg-[#1f1b2e]'}`}>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.sno}</td>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.leadName}</td>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.fullName}</td>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.mobile}</td>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.email}</td>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.gender}</td>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.createdAt}</td>
                    <td className="px-4 py-3 align-middle">
                      <div className="flex gap-2">
                        <button className="bg-[#144f36] text-white p-1.5 rounded hover:bg-[#0f3d2a] transition-colors shadow-sm" title="View">
                          <Eye size={14} />
                        </button>
                        <button className="bg-red-600 text-white p-1.5 rounded hover:bg-red-700 transition-colors shadow-sm" title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination Box */}
      <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-800 dark:text-slate-200">
          <div className="mb-4 md:mb-0">
            Showing 1 to 20 of 53547 entries
          </div>
          <div className="flex items-center space-x-1">
            <button 
              onClick={() => setCurrentPage(1)}
              className="px-3 py-1 bg-white dark:bg-[#1f1b2e] border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              «
            </button>
            <button 
              className="px-3 py-1 bg-[#144f36] text-white border border-[#144f36]"
            >
              1
            </button>
            <button 
              className="px-3 py-1 bg-white dark:bg-[#1f1b2e] border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              »
            </button>
            <button 
              className="px-3 py-1 bg-white dark:bg-[#1f1b2e] border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
