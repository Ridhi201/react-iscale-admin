import { useNavigate } from 'react-router-dom'

export default function AddPartner() {
  const navigate = useNavigate()

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 flex justify-between items-center bg-[#f6f6ff] dark:bg-[#1f1b2e]">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Add New Partners</h2>
          <button 
            onClick={() => navigate('/partners/all')}
            className="bg-[#428bca] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#3071a9] transition-colors flex items-center gap-2"
          >
            <span>Back</span>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Partner Name</label>
              <input 
                type="text" 
                placeholder="Partner Name"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Partner URL</label>
              <input 
                type="text" 
                placeholder="Partner url..."
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Partner Image</label>
            <button className="bg-[#428bca] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#3071a9] transition-colors w-full md:w-[48%] text-center">
              Partner Image
            </button>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-[#1f1b2e]">
            <button className="bg-[#428bca] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#3071a9] transition-colors w-full md:w-[48%] text-center mt-4">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
