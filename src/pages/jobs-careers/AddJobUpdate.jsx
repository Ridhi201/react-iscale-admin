import Button from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'
import { Image, Play, Grid, MoreHorizontal } from 'lucide-react'

export default function AddJobUpdate() {
  const navigate = useNavigate()

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden max-w-6xl">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e] flex justify-between items-center">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Add Job Update List</h2>
          <button 
            onClick={() => navigate('/job-updates')}
            className="bg-[#428bca] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#3071a9] transition-colors flex items-center gap-1"
          >
            « Back
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
            <div className="md:col-span-3">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Title <span className="text-red-500">*</span></label>
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
          </div>

          <div className="mb-5">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Job Description</label>
            <div className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded overflow-hidden">
              <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] p-4 h-64 border-b border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 text-sm">
                Write the job description that outlines the main duties involved in a job.
              </div>
              <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] p-2 border-t border-slate-300 dark:border-slate-600 flex items-center justify-between text-slate-600 dark:text-slate-400 text-sm">
                <div className="flex items-center gap-4">
                  <span className="hover:text-slate-800 dark:text-slate-200 cursor-pointer">File</span>
                  <span className="hover:text-slate-800 dark:text-slate-200 cursor-pointer">Edit</span>
                  <span className="hover:text-slate-800 dark:text-slate-200 cursor-pointer">View</span>
                  <span className="hover:text-slate-800 dark:text-slate-200 cursor-pointer">Insert</span>
                  <span className="hover:text-slate-800 dark:text-slate-200 cursor-pointer">Format</span>
                  <span className="hover:text-slate-800 dark:text-slate-200 cursor-pointer">Tools</span>
                  <span className="hover:text-slate-800 dark:text-slate-200 cursor-pointer">Table</span>
                </div>
                <div>
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium px-2 py-1 bg-blue-50 rounded">
                    <span className="text-blue-600">⚡</span> Upgrade
                  </button>
                </div>
              </div>
              <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] p-2 border-t border-slate-200 dark:border-[#1f1b2e] flex items-center gap-4 text-slate-600 dark:text-slate-400 text-sm">
                <div className="flex gap-2 text-slate-600 dark:text-slate-400">
                  <span className="cursor-pointer">↩</span>
                  <span className="cursor-pointer">↪</span>
                </div>
                <div className="h-4 w-px bg-slate-300"></div>
                <div className="flex items-center gap-1 cursor-pointer">
                  Paragraph <span className="text-xs">▼</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer">
                  System Font <span className="text-xs">▼</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer">
                  12pt <span className="text-xs">▼</span>
                </div>
                <div className="h-4 w-px bg-slate-300"></div>
                <div className="flex gap-3">
                  <span className="font-bold cursor-pointer">B</span>
                  <span className="italic cursor-pointer">I</span>
                  <span className="underline cursor-pointer">U</span>
                  <span className="line-through cursor-pointer">S</span>
                </div>
                <div className="h-4 w-px bg-slate-300"></div>
                <div className="flex gap-3 items-center">
                  <span className="cursor-pointer rotate-45">🔗</span>
                  <Image size={16} className="cursor-pointer" />
                  <Play size={16} className="cursor-pointer" />
                  <Grid size={16} className="cursor-pointer" />
                  <MoreHorizontal size={16} className="cursor-pointer" />
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-[#1f1b2e]/50 p-1 flex justify-between text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-[#1f1b2e]">
                <span>p</span>
                <span className="flex items-center gap-1">0 words <strong>tiny</strong></span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Company <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Experience <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="Experience"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Location <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="Location"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Order</label>
              <input 
                type="text" 
                placeholder="Order"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Salary <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input 
                type="text" 
                placeholder="Salary From"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
              <input 
                type="text" 
                placeholder="Salary To"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
              <select className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
                <option>PM (Per Month)</option>
                <option>PA (Per Annum)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Recruit Mobile No.</label>
              <input 
                type="text" 
                placeholder="Recruit Mobile No."
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Recruit Whatsapp No.</label>
              <div className="relative">
                <input 
                  type="number" 
                  placeholder="Recruit Whatsapp No."
                  className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Recruit Date<span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="mm/dd/yyyy"
                  className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 pr-10"
                />
                <div className="absolute right-3 top-2.5 text-slate-600 dark:text-slate-400">📅</div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Recruit Expire Date <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="mm/dd/yyyy"
                  className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 pr-10"
                />
                <div className="absolute right-3 top-2.5 text-slate-600 dark:text-slate-400">📅</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button fullWidth className="py-2">Submit</Button>
            <button 
              onClick={() => navigate('/job-updates')}
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
