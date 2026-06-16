import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config/api';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getImageUrl } from '../../utils/imageUtils';

export default function PackageView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.packageData) {
      setCourse(location.state.packageData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id, location.state]);

  if (loading) return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-500 font-bold">Loading Package Details...</p>
    </div>
  );

  if (!course) return (
    <div className="p-10 text-center">
      <div className="bg-red-50 text-red-600 p-4 rounded-xl inline-block font-bold border border-red-200">
        Package not found or invalid ID.
      </div>
      <div className="mt-4">
        <button onClick={() => navigate(-1)} className="bg-slate-800 text-white px-6 py-2 rounded-full font-bold hover:bg-slate-700">Go Back</button>
      </div>
    </div>
  );

  const status = course.status ?? course.m_package_status ?? course.isActive ?? course.active ?? 'inactive';
  const isActive = status === 1 || status === '1' || status === true || String(status).toLowerCase() === 'active';

  const title = course.title || course.m_package_title || 'N/A';
  const code = course.m_package_course ? 'Course Linked' : 'No Course Linked';
  const banner = course.banner || course.m_package_image || '';
  const type = course.m_package_type || 'N/A';
  const price = course.m_package_price ?? '0';
  const offerPrice = course.m_package_offer_price ?? '0';
  const description = course.m_package_description || '<p class="text-slate-400 italic">No description provided.</p>';
  
  const language = course.m_package_language || 'N/A';
  const intro = course.m_package_intro || 'N/A';



  return (
    <div className="animate-fade-in-up bg-[#f6f6ff] dark:bg-[#13111c] min-h-screen">
      <div className="bg-[#144f36] rounded-t-2xl p-5 flex justify-between items-center shadow-md relative overflow-hidden">
        <h2 className="text-white font-bold tracking-wide text-2xl relative z-10">Package Details Preview</h2>
        <button onClick={() => navigate(-1)} className="bg-white hover:bg-slate-50 text-[#144f36] px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-all relative z-10">
          ↩ Back
        </button>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-[#1f1b2e] p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800">
              {banner ? (
                <img src={getImageUrl(banner)} alt="Banner" className="w-full h-48 object-cover rounded-xl mb-4 border border-slate-200 dark:border-gray-700" />
              ) : (
                <div className="w-full h-48 bg-slate-100 dark:bg-[#13111c] rounded-xl mb-4 flex items-center justify-center text-slate-400 font-bold border border-slate-200 dark:border-gray-700">No Banner Image</div>
              )}
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{title}</h3>
              <div className="inline-block bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold px-3 py-1 rounded-full text-xs mb-4 border border-indigo-100 dark:border-indigo-800">
                Code: {code}
              </div>
              
              <div className="space-y-3 mt-2">
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-gray-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium text-sm">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${isActive ? 'bg-green-500' : 'bg-slate-500'}`}>
                    {isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-gray-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium text-sm">Package Type</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold text-sm">{type}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-gray-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium text-sm">Price</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold text-sm">₹{price}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-gray-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium text-sm">Offer Price</span>
                  <span className="text-green-600 dark:text-green-400 font-bold text-sm">₹{offerPrice}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-[#1f1b2e] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800">
              <h4 className="text-lg font-bold text-[#144f36] dark:text-green-400 mb-4 border-b border-slate-100 dark:border-gray-800 pb-2">Description</h4>
              <div 
                className="prose dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 min-h-[150px]" 
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </div>

            <div className="bg-white dark:bg-[#1f1b2e] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800">
              <h4 className="text-lg font-bold text-[#144f36] dark:text-green-400 mb-4 border-b border-slate-100 dark:border-gray-800 pb-2">Package Information</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="bg-[#f6f6ff] dark:bg-[#13111c] p-4 rounded-xl border border-slate-100 dark:border-gray-800">
                   <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold uppercase tracking-wider">Language</div>
                   <div className="font-medium text-slate-800 dark:text-slate-200">{language}</div>
                 </div>
                 <div className="bg-[#f6f6ff] dark:bg-[#13111c] p-4 rounded-xl border border-slate-100 dark:border-gray-800">
                   <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold uppercase tracking-wider">Intro</div>
                   <div className="font-medium text-slate-800 dark:text-slate-200">{intro}</div>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
