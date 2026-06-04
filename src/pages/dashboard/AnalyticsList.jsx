import IconButton from '../../components/common/IconButton'
import { useState, useMemo } from 'react'
import { Eye, Trash2, Search, Download } from 'lucide-react'

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
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden flex flex-col h-full">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Analytics List</h2>
        </div>

        <div className="p-4 bg-[#f6f6ff] dark:bg-[#1f1b2e] border-b border-slate-200 dark:border-gray-800/50">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">From Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="mm/dd/yyyy"
                  className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 pr-10"
                />
                <div className="absolute right-3 top-2.5 text-slate-600 dark:text-slate-400">📅</div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">To Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="mm/dd/yyyy"
                  className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 pr-10"
                />
                <div className="absolute right-3 top-2.5 text-slate-600 dark:text-slate-400">📅</div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Lead Generate</label>
              <select className="w-full border border-fuchsia-500 rounded px-3 py-2 text-sm outline-none bg-[#f6f6ff] dark:bg-[#1f1b2e]">
                <option>--Select Lead Generate--</option>
                <option>A.I. Full Course (Free) | Master AI Tools & Core Concepts Notes</option>
                <option>Advanced AI Full Course (100% FREE) 2026 | Download PDF</option>
                <option>AI Masterclass | Tools & Prompt Notes</option>
                <option>Antigravity | Claude Code Notes</option>
                <option>Claude Basics | Swati Mam | The IScale</option>
                <option>Data Analyst Course Form</option>
                <option>Full Claude Tutorial for Beginners | Notes Download</option>
                <option>Generative AI & Work Flow automation | Antigravity or Claude</option>
                <option>How To Use Google Antigravity | Prompt Download</option>
                <option>Machine Learning Full Course | Beginner to Advance</option>
                <option>Master AI in 30 Days | Notes</option>
                <option>MS Excel Full Course in Hindi | Basic to Advanced</option>
                <option>Notebook LM - Prompt Book | Pdf Download</option>
                <option>Prompt Engineering Full Course | Beginner To Pro</option>
                <option>Python Full Course with AI | Beginners to Advance Notes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Search By Name</label>
              <input 
                type="text" 
                placeholder="Search By Name"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div className="flex gap-2 pb-0">
              <button className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800 p-2 rounded hover:bg-[#152a4a] transition-colors">
                <Search size={20} />
              </button>
              <button className="btn-glossy-purple">
                Reset
              </button>
              <button className="btn-glossy-royalblue">
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="overflow-x-auto border border-slate-200 dark:border-[#1f1b2e] flex-1">
            <table className="w-full text-left text-sm text-slate-800 dark:text-slate-200">
              <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">
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
                  <tr key={row.id} className={`border-b border-slate-200 dark:border-gray-800/50 ${row.sno === 2 ? 'bg-[#fee2e2]' : 'hover:bg-slate-50 dark:bg-[#1f1b2e]/50 bg-[#f6f6ff] dark:bg-[#1f1b2e]'}`}>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.sno}</td>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.leadName}</td>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.fullName}</td>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.mobile}</td>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.email}</td>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.gender}</td>
                    <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 align-top">{row.createdAt}</td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex gap-2">
                        <button className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800 p-1.5 rounded-full hover:bg-[#152a4a] transition-colors">
                          <Eye size={14} />
                        </button>
                        <IconButton icon={Trash2} variant="danger" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col md:flex-row justify-between items-center text-sm text-slate-800 dark:text-slate-200">
            <div className="mb-4 md:mb-0">
              Showing 1 to 20 of 53547 entries
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setCurrentPage(2675)}
                className="px-3 py-1 bg-[#f6f6ff] dark:bg-[#1f1b2e] text-blue-600 hover:bg-blue-50"
              >
                «
              </button>
              <button 
                onClick={() => setCurrentPage(2676)}
                className="px-3 py-1 bg-[#f6f6ff] dark:bg-[#1f1b2e] text-blue-600 hover:bg-blue-50"
              >
                2676
              </button>
              <button 
                onClick={() => setCurrentPage(2677)}
                className="px-3 py-1 bg-[#f6f6ff] dark:bg-[#1f1b2e] text-blue-600 hover:bg-blue-50"
              >
                2677
              </button>
              <button 
                onClick={() => setCurrentPage(2678)}
                className="px-3 py-1 bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800"
              >
                2678
              </button>
              <button 
                onClick={() => setCurrentPage(1)}
                className="px-3 py-1 bg-[#f6f6ff] dark:bg-[#1f1b2e] text-blue-600 hover:bg-blue-50"
              >
                First
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-[#1f1b2e] pt-4">
            The iScale | Powered by Logixhunt
          </div>
        </div>
      </div>
    </div>
  )
}
