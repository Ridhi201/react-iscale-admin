import Button from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'
import { Image, Play, Grid, MoreHorizontal } from 'lucide-react'

export default function AddNews() {
  const navigate = useNavigate()

  const renderRichTextEditor = (label) => (
    <div className="mb-5">
      <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{label}</label>
      <div className="border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded overflow-hidden">
        <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] p-4 h-48 border-b border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 text-sm">
          News Description
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
            <span className="cursor-pointer font-bold">↶</span>
            <span className="cursor-pointer font-bold">↷</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer font-bold">...</div>
        </div>
        <div className="bg-slate-50 dark:bg-[#1f1b2e]/50 p-1 flex justify-between text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-[#1f1b2e]">
          <span>p</span>
          <span className="flex items-center gap-1">0 words <strong>tiny</strong></span>
        </div>
      </div>
    </div>
  )

  const renderImageUpload = (label) => (
    <div className="mb-2">
      <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{label} {label === 'Image1' && <span className="text-red-500">*</span>}</label>
      <div className="flex items-center gap-2 mt-1">
        <input type="file" className="text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded file:border file:border-slate-300 dark:border-[#1f1b2e] file:bg-[#f6f6ff] file:text-slate-700 dark:text-slate-300 hover:file:bg-slate-50 dark:bg-[#1f1b2e]/50 cursor-pointer w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded p-1" />
      </div>
    </div>
  )

  return (
    <div className="p-6 h-full bg-[#f8fafc] dark:bg-[#13111c] overflow-y-auto">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden max-w-6xl">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e] flex justify-between items-center">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Add News List</h2>
          <button 
            onClick={() => navigate('/news')}
            className="bg-[#428bca] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#3071a9] transition-colors flex items-center gap-1"
          >
            « Back
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
            <div className="md:col-span-3">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Title <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="News Title"
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Order</label>
              <input 
                type="text" 
                className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Introduction</label>
            <textarea 
              placeholder="News Introduction"
              rows={4}
              className="w-full border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 resize-none"
            ></textarea>
          </div>

          {/* Pair 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {renderImageUpload('Image1')}
              {renderRichTextEditor('Description1')}
            </div>
            <div>
              {renderImageUpload('Image 2')}
              {renderRichTextEditor('Description 2')}
            </div>
          </div>

          {/* Pair 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {renderImageUpload('Image 3')}
              {renderRichTextEditor('Description 3')}
            </div>
            <div>
              {renderImageUpload('Image 4')}
              {renderRichTextEditor('Description 4')}
            </div>
          </div>

          {/* Pair 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {renderImageUpload('Image 5')}
              {renderRichTextEditor('Description 5')}
            </div>
            <div>
              {renderImageUpload('Image 6')}
              {renderRichTextEditor('Description 6')}
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <Button fullWidth className="py-2">Submit</Button>
            <button 
              onClick={() => navigate('/news')}
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
