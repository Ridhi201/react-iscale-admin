import Button from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'

export default function AddOffer() {
  const navigate = useNavigate()

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#eef5fa] p-4 min-h-screen">
        <div className="bg-white dark:bg-[#13111c] rounded-lg p-4 mb-4 shadow-sm border border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-medium text-slate-700 dark:text-slate-300">Add New Offer</h2>
        </div>

        <div className="bg-white dark:bg-[#13111c] rounded-lg shadow-sm border border-slate-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Offer Title</label>
              <input 
                type="text" 
                placeholder="Enter Offer Title"
                className="w-full border border-fuchsia-500 rounded px-3 py-2 text-sm outline-none bg-white dark:bg-[#13111c]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Offer Status</label>
              <select className="w-full border border-slate-300 dark:border-[#1f1b2e] rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-white dark:bg-[#13111c]">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Offer Image ( 1280px X 320px )</label>
              <button className="bg-[#428bca] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#3071a9] transition-colors w-full flex items-center justify-center gap-2">
                <span>📷</span> Offer Image
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Offer Start Date</label>
              <input 
                type="date" 
                className="w-full border border-slate-300 dark:border-[#1f1b2e] rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-white dark:bg-[#13111c] text-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Offer Priority</label>
              <input 
                type="text" 
                placeholder="Enter Offer Priority"
                className="w-full border border-slate-300 dark:border-[#1f1b2e] rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-white dark:bg-[#13111c]"
              />
            </div>
            <div className="row-span-2">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Offer Description<span className="text-red-500">*</span></label>
              <textarea 
                placeholder="Enter Offer Description"
                rows={6}
                className="w-full h-[132px] border border-slate-300 dark:border-[#1f1b2e] rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-white dark:bg-[#13111c] resize-none"
              ></textarea>
            </div>
            <div className="col-span-2 mt-[-60px]">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Offer Url<span className="text-red-500">*</span></label>
              <textarea 
                placeholder="Enter Offer Url"
                rows={3}
                className="w-full border border-slate-300 dark:border-[#1f1b2e] rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-white dark:bg-[#13111c] resize-none"
              ></textarea>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-[#428bca] text-white px-10 py-2 rounded-lg text-sm font-medium hover:bg-[#3071a9] transition-colors flex-1">
              Submit
            </button>
            <button 
              onClick={() => navigate('/offers')}
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
