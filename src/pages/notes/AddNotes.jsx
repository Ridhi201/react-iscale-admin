import Button from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'

export default function AddNotes() {
  const navigate = useNavigate()

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden max-w-6xl mx-auto">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e] flex justify-between items-center">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Add New Notes</h2>
          <button 
            onClick={() => navigate('/notes/all')}
            className="bg-[#428bca] text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#3071a9] transition-colors flex items-center gap-1"
          >
            <span>↩ Back</span>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Notes Category</label>
              <select className="w-full border border-fuchsia-500 rounded px-3 py-2 text-sm outline-none bg-white dark:bg-[#13111c]">
                <option>- - - Select - - -</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Notes Sub Category</label>
              <select className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
                <option>Select Category First</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Notes Title</label>
              <input 
                type="text" 
                placeholder="Notes Title"
                className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Enter Notes Keyword</label>
              <input 
                type="text" 
                placeholder="Test Notes Keyword"
                className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Notes No Of Ratings</label>
              <input 
                type="text" 
                defaultValue="0"
                className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Notes No Of Student Enrolled</label>
              <input 
                type="text" 
                placeholder="Notes Enrolled"
                className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Notes Status</label>
              <select className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Notes Type</label>
              <select className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
                <option>Select Type</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Notes Image</label>
              <button className="bg-[#428bca] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#3071a9] transition-colors w-full flex items-center justify-center gap-2">
                <span>📷</span> Notes Image
              </button>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Notes Intro</label>
            <textarea 
              placeholder="Enter Notes Intro"
              rows={3}
              className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 resize-none"
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Notes Description</label>
            <textarea 
              placeholder="Enter Notes Description"
              rows={3}
              className="w-full border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 resize-none"
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button className="bg-[#428bca] text-white px-10 py-2 rounded-lg text-sm font-medium hover:bg-[#3071a9] transition-colors flex-1">
              Submit
            </button>
            <button 
              onClick={() => navigate('/notes/all')}
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
