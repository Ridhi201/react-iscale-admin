import Button from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'
import { Camera, Eye } from 'lucide-react'

export default function AddUser() {
  const navigate = useNavigate()

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden max-w-5xl">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e] flex justify-between items-center">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Add New User</h2>
          <button 
            onClick={() => navigate('/user-role')}
            className="bg-[#00a65a] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-[#008d4c] transition-colors shadow-sm"
          >
            <span>👤 View All Users</span>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Name<span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="Enter Name"
                className="w-full border border-fuchsia-500 rounded px-3 py-2 text-sm outline-none focus:border-fuchsia-600 bg-[#f6f6ff] dark:bg-[#1f1b2e] shadow-[0_0_0_1px_rgba(217,70,239,0.5)] placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="Enter Phone Number"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">User Type</label>
              <select className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e] text-slate-800 dark:text-slate-200">
                <option>User</option>
                <option>Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Status</label>
              <select className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e] text-slate-800 dark:text-slate-200">
                <option>Active</option>
                <option>In-Active</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Email Address</label>
              <input 
                type="text" 
                placeholder="Enter Email Address"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Profile Image</label>
              <button className="w-full bg-[#428bca] text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-[#3071a9] transition-colors shadow-sm">
                <Camera size={18} />
                <span>Profile Image (196 X 215)</span>
              </button>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Login Id <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="Enter Login Id"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="Enter Password"
                  className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 pr-10 placeholder:text-slate-800 dark:text-slate-200"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300">
                  <Eye size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button fullWidth className="py-2">Submit</Button>
            <button 
              onClick={() => navigate('/user-role')}
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
