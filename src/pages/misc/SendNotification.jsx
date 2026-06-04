import { useState } from 'react'
import { Trash2, Calendar as CalendarIcon, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import IconButton from '../../components/common/IconButton'
import InputField from '../../components/common/InputField'
import SelectField from '../../components/common/SelectField'

export default function SendNotification() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(50)
  
  const mockData = [
    {
      id: 1, sno: 1, date: '25-05-2026', userName: 'Pradeep Sahani', userMobile: '+918115026', userEmail: 'Pradeepsahani81406210@Gmail.com',
      notificationTitle: 'Welcome The IScale', notificationMessage: 'Welcome "Pradeep Sahani", Kindly Fill Your Profile Details Completely.'
    },
    {
      id: 2, sno: 2, date: '25-05-2026', userName: 'Rahul', userMobile: '9711067692', userEmail: 'Kr.Rahul.Bdn@Gmail.Com',
      notificationTitle: 'Your Payment Pending', notificationMessage: 'Your Payment For AI For Everyone : Complete Guide Is Pending.'
    },
    {
      id: 3, sno: 3, date: '25-05-2026', userName: 'Rahul', userMobile: '9711067692', userEmail: 'Kr.Rahul.Bdn@Gmail.Com',
      notificationTitle: 'Your Payment Pending', notificationMessage: 'Your Payment For AI For Everyone : Complete Guide Is Pending.'
    }
  ]

  const currentData = mockData
  const TOTAL_ENTRIES = 30691

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 flex justify-between items-center bg-[#f6f6ff] dark:bg-[#1f1b2e]">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Notification List</h2>
          <Button icon={<Plus size={16} />} className="px-4 rounded-full">Add New</Button>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-5">
            <InputField label="From Date" placeholder="mm/dd/yyyy" icon={CalendarIcon} />
            <InputField label="TO Date" placeholder="mm/dd/yyyy" icon={CalendarIcon} />
            <SelectField label="Select Type" options={['All User']} />
            <SelectField label="Select User" options={['']} />
            <div className="flex items-end gap-2">
              <Button variant="success">Search</Button>
              <button className="btn-glossy-purple">Reset</button>
              <Button variant="danger">Delete All</Button>
            </div>
          </div>

          {/* Table Controls */}
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

          {/* Table */}
          <div className="overflow-x-auto border border-slate-200 dark:border-[#1f1b2e] flex-1 rounded">
            <table className="w-full text-left text-xs text-slate-800 dark:text-slate-200">
              <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">
                <tr>
                  <th className="px-3 py-2 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">
                    <div className="flex items-center justify-between">
                      S.No.
                      <span className="text-[10px] flex flex-col leading-[0.5]"><span className="text-white/50">▲</span><span>▼</span></span>
                    </div>
                  </th>
                  <th className="px-3 py-2 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Date</th>
                  <th className="px-3 py-2 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">User Name</th>
                  <th className="px-3 py-2 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">User Mobile</th>
                  <th className="px-3 py-2 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">User Email</th>
                  <th className="px-3 py-2 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Notification Title</th>
                  <th className="px-3 py-2 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Notification Message</th>
                  <th className="px-3 py-2 font-bold whitespace-nowrap text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row) => (
                  <tr key={row.id} className="border-b border-slate-200 dark:border-gray-800/50 hover:bg-slate-50 dark:bg-[#1f1b2e]/50 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
                    <td className="px-3 py-2 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.sno}</td>
                    <td className="px-3 py-2 border-r border-slate-200 dark:border-gray-800/50 align-middle whitespace-nowrap">{row.date}</td>
                    <td className="px-3 py-2 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.userName}</td>
                    <td className="px-3 py-2 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.userMobile}</td>
                    <td className="px-3 py-2 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.userEmail}</td>
                    <td className="px-3 py-2 border-r border-slate-200 dark:border-gray-800/50 align-middle">{row.notificationTitle}</td>
                    <td className="px-3 py-2 border-r border-slate-200 dark:border-gray-800/50 align-middle leading-relaxed">{row.notificationMessage}</td>
                    <td className="px-3 py-2 align-middle text-center">
                      <IconButton icon={Trash2} variant="danger" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex flex-col md:flex-row justify-between items-center text-sm text-slate-800 dark:text-slate-200">
            <div className="mb-4 md:mb-0">
              Showing 1 to 50 of 30,691 entries
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">1</button>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-400">2</button>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-400">3</button>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-400">4</button>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-400">5</button>
              <span className="px-1 text-slate-600 dark:text-slate-400">...</span>
              <button className="w-8 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-400">614</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
