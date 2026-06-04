import { Edit2, Trash2 } from 'lucide-react'
import Button from '../../components/common/Button'
import IconButton from '../../components/common/IconButton'
import InputField from '../../components/common/InputField'

export default function LocationCountry() {
  const mockData = [
    { id: 1, sno: 1, countryName: 'India' }
  ]

  return (
    <div className="h-full animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        
        {/* Left Side: Table */}
        <div className="lg:col-span-2 bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-gray-800/50">
            <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Country List</h2>
          </div>
          <div className="p-4 flex-1">
            <div className="overflow-x-auto border border-slate-200 dark:border-[#1f1b2e] rounded">
              <table className="w-full text-left text-sm text-slate-800 dark:text-slate-200">
                <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">
                  <tr>
                    <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 w-16">S.No.</th>
                    <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50">Country Name</th>
                    <th className="px-4 py-3 font-bold w-24 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.map((row) => (
                    <tr key={row.id} className="border-b border-slate-200 dark:border-gray-800/50 hover:bg-slate-50 dark:bg-[#1f1b2e]/50">
                      <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50">{row.sno}</td>
                      <td className="px-4 py-3 border-r border-slate-200 dark:border-gray-800/50">{row.countryName}</td>
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
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-1 bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors h-fit">
          <div className="p-6">
            <h2 className="text-xl font-medium text-center text-indigo-900 dark:text-indigo-300 font-bold tracking-tight mb-5 border-b border-slate-100 pb-4">Add New Country</h2>
            <form className="flex flex-col gap-4">
              <InputField label="Country Name" placeholder="Enter Country Name" />
              <Button fullWidth className="mt-2 py-2.5">Submit</Button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
