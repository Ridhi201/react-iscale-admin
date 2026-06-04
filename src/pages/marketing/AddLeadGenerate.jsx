import Button from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'
import { Type, Image, Play, Grid, MoreHorizontal } from 'lucide-react'

export default function AddLeadGenerate() {
  const navigate = useNavigate()

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden max-w-5xl">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Add New Lead Generate</h2>
        </div>

        <div className="p-6">
          <div className="mb-5">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Title</label>
            <input 
              type="text" 
              placeholder="Title"
              className="w-full border border-fuchsia-500 rounded px-3 py-2 text-sm outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="institute" className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-[#1f1b2e]" />
              <label htmlFor="institute" className="text-sm font-bold text-slate-800 dark:text-slate-200">Field of Institute / College Name*</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="education" className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-[#1f1b2e]" />
              <label htmlFor="education" className="text-sm font-bold text-slate-800 dark:text-slate-200">Field of Education Qualifications*</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="study" className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-[#1f1b2e]" />
              <label htmlFor="study" className="text-sm font-bold text-slate-800 dark:text-slate-200">Field of Study*</label>
            </div>
            
            <div className="flex items-center gap-2">
              <input type="checkbox" id="branch" className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-[#1f1b2e]" />
              <label htmlFor="branch" className="text-sm font-bold text-slate-800 dark:text-slate-200">Branch (select Field of Study first)*</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="passing" className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-[#1f1b2e]" />
              <label htmlFor="passing" className="text-sm font-bold text-slate-800 dark:text-slate-200">Passing Year*</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="state" className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-[#1f1b2e]" />
              <label htmlFor="state" className="text-sm font-bold text-slate-800 dark:text-slate-200">State (Residence)*</label>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="gender" className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-[#1f1b2e]" />
              <label htmlFor="gender" className="text-sm font-bold text-slate-800 dark:text-slate-200">Gender*</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="laptop" className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-[#1f1b2e]" />
              <label htmlFor="laptop" className="text-sm font-bold text-slate-800 dark:text-slate-200">Do you have Laptop or Desktop? (Minimum Specification- i3 or AMD 2500 / 4GB RAM)*</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="fresher" className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-[#1f1b2e]" />
              <label htmlFor="fresher" className="text-sm font-bold text-slate-800 dark:text-slate-200">Are you Fresher or Working Professional?*</label>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Redirect Link*</label>
            <input 
              type="text" 
              placeholder="Redirect Link"
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-slate-50 dark:bg-[#1f1b2e]/50"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Description</label>
            <div className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded overflow-hidden">
              <div className="bg-slate-50 dark:bg-[#1f1b2e]/50 p-2 h-64 border-b border-slate-300 dark:border-slate-600 relative">
                {/* Editor Content Area */}
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

          <div className="flex gap-4 pt-4 border-t border-slate-100">
            <Button fullWidth className="py-2">Submit</Button>
            <button 
              onClick={() => navigate('/leads')}
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
