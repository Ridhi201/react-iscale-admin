import Button from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'

export default function AddClient() {
  const navigate = useNavigate()

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden max-w-5xl">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e] flex justify-between items-center">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Add New Client</h2>
          <button 
            onClick={() => navigate('/our-clients')}
            className="bg-[#428bca] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#3071a9] transition-colors flex items-center gap-1"
          >
            « Back
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Company Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Client Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="Job Title"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Image <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2 mt-1">
                <input type="file" className="text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded file:border file:border-slate-300 dark:border-[#1f1b2e] file:bg-[#f6f6ff] file:text-slate-700 dark:text-slate-300 hover:file:bg-slate-50 dark:bg-[#1f1b2e]/50 cursor-pointer" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Order</label>
              <input 
                type="text" 
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Description</label>
            <textarea 
              rows={12}
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 resize-none bg-slate-50 dark:bg-[#1f1b2e]/50"
            ></textarea>
          </div>

          <div className="flex gap-4">
            <Button fullWidth className="py-2">Submit</Button>
            <button 
              onClick={() => navigate('/our-clients')}
              className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800 px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#152a4a] transition-colors flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
