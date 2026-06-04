import Button from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'

export default function AddCoupon() {
  const navigate = useNavigate()

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden max-w-5xl">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e] flex justify-between items-center">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Add New Coupon</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Coupon Code</label>
              <input 
                type="text" 
                placeholder="Enter Coupon Code"
                className="w-full border border-fuchsia-500 rounded px-3 py-2 text-sm outline-none focus:border-fuchsia-600 bg-[#f6f6ff] dark:bg-[#1f1b2e] shadow-[0_0_0_1px_rgba(217,70,239,0.5)] placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Coupon Title</label>
              <input 
                type="text" 
                placeholder="Enter Coupon Title"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Coupon Type</label>
              <select className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 border-slate-300 dark:border-gray-700">
                <option>Select Type</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Discount Type</label>
              <select className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
                <option>Flat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Coupon Discount</label>
              <input 
                type="text" 
                placeholder="Enter Coupon Discount"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Start Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="mm/dd/yyyy"
                  className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-400">📅</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">End Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="mm/dd/yyyy"
                  className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-400">📅</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-5">
            <div className="lg:col-span-2">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Coupon Details</label>
              <textarea 
                placeholder="Enter Coupon Details"
                rows={4}
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 resize-none placeholder:text-slate-800 dark:text-slate-200"
              ></textarea>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 self-start">
              <div className="sm:col-span-1">
                <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Total No Coupon</label>
                <input 
                  type="text" 
                  placeholder="Total Coupon"
                  className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Coupon Is Visible</label>
                <select className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Coupon Status</label>
                <select className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
                  <option>Active</option>
                  <option>In-Active</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button fullWidth className="py-2">Submit</Button>
            <button 
              onClick={() => navigate('/master/coupons')}
              className="bg-[#d35400] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#b04500] transition-colors flex-1 shadow-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
