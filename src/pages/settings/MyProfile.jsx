import { Camera, User, Mail, Lock, Phone } from 'lucide-react'

export default function MyProfile() {
  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 transition-colors overflow-hidden mb-5">
        <div className="p-4 border-b border-slate-200 dark:border-gray-800/50 bg-[#f6f6ff] dark:bg-[#1f1b2e]">
          <h2 className="text-xl font-medium text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">Profile</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] border border-slate-200 dark:border-[#1f1b2e] rounded-lg overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 dark:border-gray-800/50">
                <h3 className="text-lg font-medium text-white">Details</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm font-bold text-slate-800 dark:text-slate-200">Name :</label>
                  <div className="flex-1 flex border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded overflow-hidden shadow-sm">
                    <div className="bg-slate-50 dark:bg-[#1f1b2e]/50 px-3 flex items-center justify-center border-r border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400">
                      <User size={16} />
                    </div>
                    <input 
                      type="text" 
                      defaultValue="The iScale LMS"
                      className="flex-1 px-3 py-2 text-sm outline-none bg-[#f6f6ff] dark:bg-[#1f1b2e]"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm font-bold text-slate-800 dark:text-slate-200">Email :</label>
                  <div className="flex-1 flex border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded overflow-hidden shadow-sm">
                    <div className="bg-slate-50 dark:bg-[#1f1b2e]/50 px-3 flex items-center justify-center border-r border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400">
                      <Mail size={16} />
                    </div>
                    <input 
                      type="email" 
                      defaultValue="yoadmin@gmail.com"
                      className="flex-1 px-3 py-2 text-sm outline-none bg-[#f6f6ff] dark:bg-[#1f1b2e]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm font-bold text-slate-800 dark:text-slate-200">Log ID :</label>
                  <div className="flex-1 flex border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded overflow-hidden shadow-sm">
                    <div className="bg-slate-50 dark:bg-[#1f1b2e]/50 px-3 flex items-center justify-center border-r border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400">
                      <Lock size={16} />
                    </div>
                    <input 
                      type="text" 
                      defaultValue="yoadmin@gmail.com"
                      className="flex-1 px-3 py-2 text-sm outline-none bg-[#f6f6ff] dark:bg-[#1f1b2e]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm font-bold text-slate-800 dark:text-slate-200">Password :</label>
                  <div className="flex-1 flex border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded overflow-hidden shadow-sm">
                    <div className="bg-slate-50 dark:bg-[#1f1b2e]/50 px-3 flex items-center justify-center border-r border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400">
                      <Lock size={16} />
                    </div>
                    <input 
                      type="text" 
                      defaultValue="9078scale@@"
                      className="flex-1 px-3 py-2 text-sm outline-none bg-[#f6f6ff] dark:bg-[#1f1b2e]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm font-bold text-slate-800 dark:text-slate-200">Contact Number :</label>
                  <div className="flex-1 flex border border-slate-300 dark:border-gray-700 bg-[#f6f6ff] dark:bg-[#13111c] text-slate-700 dark:text-slate-300 rounded overflow-hidden shadow-sm">
                    <div className="bg-slate-50 dark:bg-[#1f1b2e]/50 px-3 flex items-center justify-center border-r border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400">
                      <Phone size={16} />
                    </div>
                    <input 
                      type="text" 
                      defaultValue="7898204022"
                      className="flex-1 px-3 py-2 text-sm outline-none bg-[#f6f6ff] dark:bg-[#1f1b2e]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <button className="bg-[#428bca] text-white px-8 py-2 rounded-lg text-sm font-medium hover:bg-[#3071a9] transition-colors shadow-sm">
                    Update
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#f6f6ff] dark:bg-[#1f1b2e] border border-slate-200 dark:border-[#1f1b2e] rounded-lg overflow-hidden shadow-sm h-fit">
              <div className="p-8 flex flex-col items-center">
                <div className="flex items-center gap-8 mb-8">
                  <div className="w-32 h-32 rounded-full border border-slate-200 dark:border-[#1f1b2e] p-2 shadow-sm flex items-center justify-center bg-[#f6f6ff] dark:bg-[#1f1b2e] overflow-hidden">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-red-600 text-white rounded-t-full rounded-b-full flex items-center justify-center text-3xl font-bold font-serif mb-1 relative overflow-hidden">
                        I
                        <span className="absolute bottom-0 bg-[#f6f6ff] dark:bg-[#1f1b2e] text-red-600 text-[8px] w-full pt-[2px] pb-[1px] font-sans rounded-b-full">ISCALE</span>
                      </div>
                      <div className="text-[10px] text-red-600 font-bold whitespace-nowrap mt-1 uppercase">The ISCALE</div>
                    </div>
                  </div>
                  
                  <span className="text-slate-600 dark:text-slate-400 text-xl">→</span>
                  
                  <div className="w-32 h-32 rounded-full border-4 border-red-600 shadow-sm flex items-center justify-center bg-[#f6f6ff] dark:bg-[#1f1b2e] overflow-hidden p-1">
                    <div className="text-center w-full h-full rounded-full border border-red-600 flex flex-col justify-center relative bg-red-50 overflow-hidden">
                      <div className="w-16 h-16 mx-auto bg-red-600 text-white rounded-t-full rounded-b-full flex items-center justify-center text-4xl font-bold font-serif mb-1 z-10 relative">
                        I
                        <span className="absolute bottom-0 bg-[#f6f6ff] dark:bg-[#1f1b2e] text-red-600 text-[10px] w-full pt-[2px] pb-[1px] font-sans rounded-b-full font-bold">iSCALE</span>
                      </div>
                      <div className="absolute top-2 left-0 right-0 text-[10px] text-red-600 font-bold whitespace-nowrap z-0 uppercase">The</div>
                    </div>
                  </div>
                </div>
                
                <button className="w-full max-w-sm bg-[#428bca] text-white px-4 py-2.5 rounded flex items-center justify-center gap-2 hover:bg-[#3071a9] transition-colors shadow-sm text-sm">
                  <Camera size={18} />
                  <span>Change Profile Picture (250 X 250) (1 : 1 Ratio) (Width X Height)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
