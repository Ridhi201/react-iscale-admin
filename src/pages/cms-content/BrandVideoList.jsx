import { Edit2 } from 'lucide-react'
import { brandVideoData } from '../../utils/mockData'

export default function BrandVideoList() {
  const currentData = brandVideoData

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden flex flex-col max-w-5xl">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Document</h2>
        </div>

        <div className="p-4 flex-1">
          <div className="overflow-x-auto border border-slate-200 dark:border-[#1f1b2e]">
            <table className="w-full text-left text-sm text-slate-800 dark:text-slate-200">
              <thead className="bg-slate-50 dark:bg-[#13111c] text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-gray-800">
                <tr>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">S.No.</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Name</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">Video ( 1920x1080 )</th>
                  <th className="px-4 py-3 font-bold border-r border-slate-200 dark:border-gray-800/50 whitespace-nowrap">URL</th>
                  <th className="px-4 py-3 font-bold whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row) => (
                  <tr key={row.id} className="border-b border-slate-200 dark:border-gray-800/50 hover:bg-slate-50 dark:bg-[#1f1b2e]/50 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
                    <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top pt-6">{row.sno}</td>
                    <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-top pt-6 whitespace-nowrap">{row.name}</td>
                    <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle">
                      <div className="w-[320px] h-[180px] bg-slate-900 rounded overflow-hidden relative">
                        <img 
                          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&h=180&q=80" 
                          alt="Video thumbnail"
                          className="w-full h-full object-cover opacity-80"
                        />
                        {/* Fake video controls */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 flex items-center gap-2 text-white text-xs">
                          <button className="hover:text-slate-800 dark:text-slate-200">▶</button>
                          <span>0:00 / 0:49</span>
                          <div className="flex-1 bg-[#f6f6ff]/30 h-1 rounded-full overflow-hidden">
                            <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] w-0 h-full"></div>
                          </div>
                          <button className="hover:text-slate-800 dark:text-slate-200">🔊</button>
                          <button className="hover:text-slate-800 dark:text-slate-200">⚙</button>
                          <button className="hover:text-slate-800 dark:text-slate-200">⛶</button>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 border-r border-slate-200 dark:border-gray-800/50 align-middle text-center">
                      <button className="bg-[#428bca] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3071a9] transition-colors">
                        View
                      </button>
                    </td>
                    <td className="px-4 py-4 align-middle text-center">
                      <button className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors inline-flex items-center justify-center">
                        <Edit2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
