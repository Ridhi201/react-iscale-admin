import Button from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'

export default function AddBanner() {
  const navigate = useNavigate()

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden max-w-4xl">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Add New Banner</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Banner Title</label>
              <input 
                type="text" 
                placeholder="Enter Banner Title"
                className="w-full border border-fuchsia-500 rounded px-3 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Banner Status</label>
              <select className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
                <option>Pending</option>
                <option>Running</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Banner Image</label>
            <button className="bg-[#428bca] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#3071a9] transition-colors w-full md:w-[48%] text-center">
              Banner Image (520 X 250) (Width X Height)
            </button>
          </div>

          <div className="flex gap-4 pt-4 border-t border-slate-100">
            <Button fullWidth className="py-2">Submit</Button>
            <button 
              onClick={() => navigate('/banners')}
              className="bg-[#d87025] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#c2621f] transition-colors flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
