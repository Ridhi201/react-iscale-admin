import Button from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'

export default function AddNotesCategory() {
  const navigate = useNavigate()

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#eef5fa] p-4 min-h-screen">
        <div className="bg-white dark:bg-[#13111c] rounded-lg p-4 mb-4 shadow-sm border border-slate-100">
          <h2 className="text-xl font-medium text-slate-700 dark:text-slate-300">Add New Category</h2>
        </div>

        <div className="bg-white dark:bg-[#13111c] rounded-lg shadow-sm border border-slate-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Category Name</label>
              <input 
                type="text" 
                placeholder="Enter Category Name"
                className="w-full border border-fuchsia-500 rounded px-3 py-2 text-sm outline-none bg-white dark:bg-[#13111c]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Category Status</label>
              <select className="w-full border border-slate-300 dark:border-[#1f1b2e] rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-white dark:bg-[#13111c]">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Enter Category Keyword</label>
              <input 
                type="text" 
                placeholder="Category Keyword"
                className="w-full border border-slate-300 dark:border-[#1f1b2e] rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-white dark:bg-[#13111c]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Order</label>
              <input 
                type="text" 
                placeholder="Category Order"
                className="w-full border border-slate-300 dark:border-[#1f1b2e] rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-white dark:bg-[#13111c]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Category Icon ( 512px X 512px )</label>
              <button className="bg-[#428bca] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#3071a9] transition-colors w-full flex items-center justify-center gap-2">
                <span>📷</span> Category Icon
              </button>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Category Banner ( 800px X 450px )</label>
              <button className="bg-[#428bca] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#3071a9] transition-colors w-full flex items-center justify-center gap-2">
                <span>📷</span> Category Banner
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Category Description</label>
            <textarea 
              placeholder="Enter Category Description"
              rows={4}
              className="w-full border border-slate-300 dark:border-[#1f1b2e] rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-white dark:bg-[#13111c] resize-none"
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button className="bg-[#428bca] text-white px-10 py-2 rounded-lg text-sm font-medium hover:bg-[#3071a9] transition-colors flex-1">
              Submit
            </button>
            <button 
              onClick={() => navigate('/notes/category')}
              className="bg-[#d87025] text-white px-10 py-2 rounded-lg text-sm font-medium hover:bg-[#c2621f] transition-colors flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
