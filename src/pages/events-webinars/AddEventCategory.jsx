import Button from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'
import { Camera } from 'lucide-react'

export default function AddEventCategory() {
  const navigate = useNavigate()

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden max-w-5xl">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e] flex justify-between items-center">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Add New Event Category</h2>
          <button 
            onClick={() => navigate('/events/category')}
            className="bg-[#428bca] text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-medium hover:bg-[#3071a9] transition-colors"
          >
            📄 List
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Category Name</label>
              <input 
                type="text" 
                placeholder="Enter Category Name"
                className="w-full border border-fuchsia-500 rounded px-3 py-2 text-sm outline-none focus:border-fuchsia-600 bg-[#f6f6ff] dark:bg-[#1f1b2e] shadow-[0_0_0_1px_rgba(217,70,239,0.5)] placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Category Status</label>
              <select className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e] text-slate-800 dark:text-slate-200">
                <option>Active</option>
                <option>In-Active</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Enter Category Keyword</label>
              <input 
                type="text" 
                placeholder="Category Keyword"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Order</label>
              <input 
                type="text" 
                placeholder="Category Order"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Category Icon ( 512px X 512px )</label>
              <button className="w-full bg-[#428bca] text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-[#3071a9] transition-colors">
                <Camera size={18} />
                <span>Category Icon</span>
              </button>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Category Banner ( 800px X 450px )</label>
              <button className="w-full bg-[#428bca] text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-[#3071a9] transition-colors">
                <Camera size={18} />
                <span>Category Banner</span>
              </button>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Category Description</label>
            <textarea 
              placeholder="Enter Category Description"
              rows={6}
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 resize-none placeholder:text-slate-800 dark:text-slate-200"
            ></textarea>
          </div>

          <div className="flex gap-4">
            <Button fullWidth className="py-2">Submit</Button>
            <button 
              onClick={() => navigate('/events/category')}
              className="bg-[#d35400] text-white px-6 py-2.5 rounded text-sm font-medium hover:bg-[#b04500] transition-colors flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
