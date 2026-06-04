import { Edit2, Trash2 } from 'lucide-react'
import Button from '../../components/common/Button'
import IconButton from '../../components/common/IconButton'
import InputField from '../../components/common/InputField'
import SelectField from '../../components/common/SelectField'

export default function LocationCity() {
  const mockData = [
    { id: 1, sno: 1, city: 'Amaravati (C)', state: 'Andhra Pradesh', country: 'India', status: 'Active' },
    { id: 2, sno: 2, city: 'Guntur', state: 'Andhra Pradesh', country: 'India', status: 'Active' },
    { id: 3, sno: 3, city: 'Tirupati', state: 'Andhra Pradesh', country: 'India', status: 'Active' },
    { id: 4, sno: 4, city: 'Vijayawada', state: 'Andhra Pradesh', country: 'India', status: 'Active' },
    { id: 5, sno: 5, city: 'Visakhapatnam', state: 'Andhra Pradesh', country: 'India', status: 'Active' },
    { id: 6, sno: 6, city: 'Itanagar (C)', state: 'Arunachal Pradesh', country: 'India', status: 'Active' },
    { id: 7, sno: 7, city: 'Guwahati (C)', state: 'Assam', country: 'India', status: 'Active' },
    { id: 8, sno: 8, city: 'Dibrugarh', state: 'Assam', country: 'India', status: 'Active' }
  ]

  return (
    <div className="h-full animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        
        {/* Left Side: Table */}
        <div className="lg:col-span-2 bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-gray-800/50">
            <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Location List</h2>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <div className="overflow-x-auto border border-slate-200 dark:border-[#1f1b2e] rounded flex-1">
              <table className="w-full text-left text-sm text-slate-800 dark:text-slate-200">
                <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">
                  <tr>
                    <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 w-16">S.No.</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50">City</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50">State</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50">Country</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50">Status</th>
                    <th className="px-4 py-3 font-bold w-24 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.map((row) => (
                    <tr key={row.id} className="border-b border-slate-200 dark:border-gray-800/50 hover:bg-slate-50 dark:bg-[#1f1b2e]/50">
                      <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50">{row.sno}</td>
                      <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50">{row.city}</td>
                      <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50">{row.state}</td>
                      <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50">{row.country}</td>
                      <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50 text-center">
                        <span className="bg-[#428bca] text-white px-3 py-1 rounded-full text-[11px] font-medium">
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <IconButton icon={Edit2} variant="success" />
                          <IconButton icon={Trash2} variant="danger" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-sm text-slate-800 dark:text-slate-200">
              <div>Showing 1 to 50 of 214 entries</div>
              <div className="flex items-center space-x-1 text-xs">
                 <button className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">1</button>
                 <button className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-400">2</button>
                 <button className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-400">3</button>
                 <span className="px-1 text-slate-600 dark:text-slate-400">...</span>
                 <button className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-400">5</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-1 bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors h-fit">
          <div className="p-6">
            <h2 className="text-xl font-medium text-center text-indigo-900 dark:text-indigo-300 font-bold tracking-tight mb-5 border-b border-slate-100 pb-4">Add New Location</h2>
            <form className="flex flex-col gap-4">
              <SelectField label="Country" options={['- - Select - -', 'India']} />
              <SelectField label="State" options={['- - Select - -', 'Andhra Pradesh']} />
              <InputField label="Location Name" placeholder="Enter Location Name" />
              <Button fullWidth className="mt-2 py-2.5">Submit</Button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
