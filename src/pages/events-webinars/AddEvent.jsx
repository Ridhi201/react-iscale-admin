import Button from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'
import { Camera } from 'lucide-react'

export default function AddEvent() {
  const navigate = useNavigate()

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden max-w-[1200px]">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e] flex justify-between items-center">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Add New Event</h2>
          <button 
            onClick={() => navigate('/events/list')}
            className="bg-[#428bca] text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-medium hover:bg-[#3071a9] transition-colors"
          >
            📄 List
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Event Category <span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 border-slate-300 dark:border-gray-700">
                <option>--Select Category--</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Event Title <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="Event Title"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
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
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
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
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Start Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="--:-- --"
                  className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 pr-10 placeholder:text-slate-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-400">🕒</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                End Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="--:-- --"
                  className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 pr-10 placeholder:text-slate-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-400">🕒</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Skill Level</label>
              <input 
                type="text" 
                placeholder="Skill Level"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Certificate</label>
              <input 
                type="text" 
                placeholder="Yes/No"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Language</label>
              <input 
                type="text" 
                placeholder="Language"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">No. Of Enrolled</label>
              <input 
                type="text" 
                placeholder="No. Of Enrolled"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
            <div className="md:col-span-3">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Youtube URL</label>
              <input 
                type="text" 
                placeholder="Youtube Url"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Upload File(PDF Only)</label>
              <div className="flex border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded overflow-hidden">
                <button className="bg-slate-100 dark:bg-slate-700 border-r border-slate-300 dark:border-slate-600 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 whitespace-nowrap hover:bg-slate-200">
                  Choose File
                </button>
                <span className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap overflow-hidden text-ellipsis bg-[#f6f6ff] dark:bg-[#1f1b2e] flex-1">
                  No file chosen
                </span>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Meeting Link</label>
            <input 
              type="text" 
              placeholder="Meeting Link"
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Host Name</label>
              <input 
                type="text" 
                placeholder="Host Name"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Contact No.</label>
              <input 
                type="text" 
                placeholder="1234567890"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Whatsapp No.</label>
              <input 
                type="text" 
                placeholder="1234567890"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Order</label>
                <input 
                  type="text" 
                  placeholder="00"
                  className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder:text-slate-800 dark:text-slate-200"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Status</label>
                <select className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-[#f6f6ff] dark:bg-[#1f1b2e] text-slate-800 dark:text-slate-200">
                  <option>Active</option>
                  <option>In-Active</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Category Banner ( 800px X 450px )</label>
              <button className="bg-[#428bca] text-white px-6 py-2 rounded flex items-center justify-center gap-2 hover:bg-[#3071a9] transition-colors">
                <Camera size={18} />
                <span>Banner</span>
              </button>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Description</label>
            <div className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded overflow-hidden">
              <div className="bg-[#f8fafc] dark:bg-[#13111c] border-b border-slate-300 dark:border-slate-600 p-2 flex flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-400">
                <button className="px-2 hover:bg-slate-200 rounded">File</button>
                <button className="px-2 hover:bg-slate-200 rounded">Edit</button>
                <button className="px-2 hover:bg-slate-200 rounded">View</button>
                <button className="px-2 hover:bg-slate-200 rounded">Insert</button>
                <button className="px-2 hover:bg-slate-200 rounded">Format</button>
                <button className="px-2 hover:bg-slate-200 rounded">Tools</button>
                <button className="px-2 hover:bg-slate-200 rounded">Table</button>
                <div className="flex-1"></div>
                <button className="px-2 py-1 bg-[#f6f6ff] dark:bg-[#1f1b2e] border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded text-blue-600 flex items-center gap-1">
                  <span className="text-xs">⚡</span> Upgrade
                </button>
              </div>
              <div className="bg-[#f8fafc] dark:bg-[#13111c] border-b border-slate-300 dark:border-slate-600 p-2 flex flex-wrap gap-2 items-center text-slate-600 dark:text-slate-400 border-t-0">
                <button className="p-1 hover:bg-slate-200 rounded">↶</button>
                <button className="p-1 hover:bg-slate-200 rounded">↷</button>
                <div className="w-px h-4 bg-slate-300 mx-1"></div>
                <select className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1 text-xs bg-[#f6f6ff] dark:bg-[#1f1b2e] w-24">
                  <option>Paragraph</option>
                </select>
                <select className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1 text-xs bg-[#f6f6ff] dark:bg-[#1f1b2e] w-24">
                  <option>System Font</option>
                </select>
                <select className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-2 py-1 text-xs bg-[#f6f6ff] dark:bg-[#1f1b2e] w-16">
                  <option>12pt</option>
                </select>
                <div className="w-px h-4 bg-slate-300 mx-1"></div>
                <button className="p-1 hover:bg-slate-200 rounded font-bold">B</button>
                <button className="p-1 hover:bg-slate-200 rounded italic">I</button>
                <button className="p-1 hover:bg-slate-200 rounded underline">U</button>
                <button className="p-1 hover:bg-slate-200 rounded line-through">S</button>
                <div className="w-px h-4 bg-slate-300 mx-1"></div>
                {/* Random editor icons mock */}
                <button className="p-1 hover:bg-slate-200 rounded">🔗</button>
                <button className="p-1 hover:bg-slate-200 rounded">🖼️</button>
                <button className="p-1 hover:bg-slate-200 rounded">▶️</button>
                <button className="p-1 hover:bg-slate-200 rounded">⊞</button>
              </div>
              <textarea 
                placeholder="Enter Event Description"
                rows={12}
                className="w-full p-4 outline-none resize-none placeholder:text-slate-600 dark:text-slate-400"
              ></textarea>
              <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] border-t border-slate-300 dark:border-slate-600 p-1 px-3 flex justify-between items-center text-xs text-slate-600 dark:text-slate-400">
                <span>p</span>
                <div className="flex items-center gap-2">
                  <span>0 words</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">tiny</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button fullWidth className="py-2">Submit</Button>
            <button 
              onClick={() => navigate('/events/list')}
              className="bg-[#d35400] text-white px-6 py-2.5 rounded text-sm font-medium hover:bg-[#b04500] transition-colors flex-1 shadow-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
