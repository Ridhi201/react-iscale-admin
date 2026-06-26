import * as Icons from 'lucide-react';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config/api';

export default function AddCourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [bannerFile, setBannerFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  // Form state
  const [description, setDescription] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [keyword, setKeyword] = useState('');
  const [order, setOrder] = useState('');
  const [views, setViews] = useState('0');
  const [reviews, setReviews] = useState('0');
  const [ratings, setRatings] = useState('0');
  const [durationApp, setDurationApp] = useState('');
  const [durationWeb, setDurationWeb] = useState('');
  const [appLink, setAppLink] = useState('');
  const [webLink, setWebLink] = useState('');
  const [graphyInstruction, setGraphyInstruction] = useState('');
  const [certificateShow, setCertificateShow] = useState(false);
  const [liveClassShow, setLiveClassShow] = useState(false);
  const courseTypes = ['Self Paced', 'Live', 'Hybrid'];

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/myadmin/course/categories-dropdown`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.status) setCategories(response.data.data);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    const fetchInstructors = async () => {
      try {
        const token = localStorage.getItem('token');
        const resp = await axios.get(`${BASE_URL}/myadmin/instructor/instructors-dropdown`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (resp.data.status) setInstructors(resp.data.data);
      } catch (err) {
        console.error('Failed to load instructors', err);
      }
    };
    fetchCats();
    fetchInstructors();
  }, []);

  const handleSubmit = async () => {
    const titleVal = document.getElementById('course_title')?.value?.trim();
    const categoryVal = document.getElementById('course_category')?.value;
    if (!titleVal) { await window.customAlert('❌ Course Title is required!'); return; }
    if (!categoryVal) { await window.customAlert('❌ Please select a Course Category!'); return; }
    setLoading(true); 
    try {
      const token = localStorage.getItem('token');
      const statusApp = document.getElementById('course_status_app').value;
      const statusWeb = document.getElementById('course_status_web').value;
      
      const payload = new FormData();
      payload.append('m_course_lang', document.getElementById('course_language')?.value || '1');
      payload.append('m_course_title', titleVal);
      payload.append('m_course_category', categoryVal);
      
      // Temporarily hardcoded to 1 (Free) to bypass price requirement for testing
      payload.append('m_course_type', '1');
      
      if (selectedInstructor) {
        payload.append('m_course_instructor', selectedInstructor);
      }
      // Backend expects inconsistent formats
      payload.append('m_course_status', statusApp.toLowerCase() === '1' ? '1' : '0');
      payload.append('m_course_status_web', statusWeb.toLowerCase() === '1' ? '1' : '0');
      
      payload.append('m_course_popular', document.getElementById('course_popular')?.checked ? '1' : '0');
      payload.append('m_course_recomended', document.getElementById('course_recommended')?.checked ? '1' : '0');
      payload.append('m_course_description', description || '');
      payload.append('m_course_keyword', keyword || '');
      payload.append('m_course_code', courseCode || '');
      payload.append('m_course_video_link', document.getElementById('course_video_link')?.value || '');
      payload.append('m_course_duration_app', durationApp || '');
      payload.append('m_course_duration_web', durationWeb || '');
      payload.append('m_course_order', order || '');
      payload.append('m_course_view', views || '0');
      payload.append('m_course_reviews', reviews || '0');
      payload.append('m_course_rating', ratings || '0');
      payload.append('m_course_intro', document.getElementById('course_intro')?.value || '');
      
      // payload.append('m_course_certificate', certificateShow ? 'Yes' : 'No');
      // payload.append('m_course_live_class', liveClassShow ? 'Yes' : 'No');
      
      payload.append('m_course_app_g_link', appLink || '');
      payload.append('m_course_web_g_link', webLink || '');
      payload.append('m_course_graphy_instruction', graphyInstruction || '');

      if (bannerFile) {
        payload.append('m_course_banner', bannerFile);
      }
      if (pdfFile) {
        payload.append('m_course_pdf', pdfFile);
      }

      console.log('=== ADD COURSE PAYLOAD ===');
      for (let pair of payload.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      const response = await axios.post(`${BASE_URL}/myadmin/course/add-course`, payload, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      if (response.data?.status) {
        await window.customAlert(response.data.message || 'Course added successfully');
        navigate('/courses/all');
      } else {
        await window.customAlert(`Failed: ${response.data?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('ADD COURSE ERROR:', error)

      if (error.response) {
        console.log(
          "BACKEND RESPONSE:",
          JSON.stringify(error.response?.data, null, 2)
        )
      }

      const errData = error.response?.data

      const msg =
        errData?.message ||
        errData?.error ||
        JSON.stringify(errData) ||
        error.message

      await window.customAlert(`❌ Error: ${msg}`)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eaf3f8] p-4 font-sans">
      <div className="bg-white rounded shadow-sm border border-slate-200 max-w-7xl mx-auto">
        <div className="bg-[#144f36] rounded-t p-5 flex justify-between items-center shadow-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white dark:bg-[#13111c]/10 rounded-full blur-2xl group-hover:bg-white dark:bg-[#13111c]/20 transition-all duration-700 pointer-events-none"></div>
          <div className="flex items-center relative z-10">
            <div className="w-1.5 h-7 bg-white dark:bg-[#13111c]/90 rounded-full mr-4 shadow-[0_0_12px_rgba(255,255,255,0.9)] hidden sm:block"></div>
            <h2 className="text-white font-bold tracking-wide text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">Add New Course</h2>
          </div>
          <button onClick={() => navigate('/courses/all')} className="bg-white hover:bg-slate-50 text-[#144f36] px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all flex items-center gap-2 relative z-10 hover:shadow hover:-translate-y-0.5">
            <span>↩ Back</span>
          </button>
        </div>
        <div className="p-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Language</label>
              <select id="course_language" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white outline-none">
                <option value="1">English</option>
                <option value="2">Hindi</option>
                <option value="3">Hinglish</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Category</label>
              <select id="course_category" className="w-full border border-slate-300 focus:border-[#144f36] rounded px-3 py-1.5 text-sm bg-white outline-none">
                <option value="">- - - Select - - -</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.m_category_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Title</label>
              <input id="course_title" type="text" placeholder="Course Title" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
            </div>
          </div>
          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Code</label>
              <input id="course_code" type="text" placeholder="Course Code" value={courseCode} onChange={e => setCourseCode(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Demo Video Link</label>
              <input id="course_video_link" type="text" placeholder="https://..." className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Type</label>
              <select id="course_type" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white outline-none focus:border-[#144f36]">
                <option value="">Select Type</option>
                {courseTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Keywords</label>
              <input type="text" placeholder="Course Keyword" value={keyword} onChange={e => setKeyword(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Duration (App)</label>
              <input type="text" placeholder="Course Duration In App" value={durationApp} onChange={e => setDurationApp(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Duration (Web)</label>
              <input type="text" placeholder="Course Duration In Web" value={durationWeb} onChange={e => setDurationWeb(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Status (App)</label>
              <select id="course_status_app" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white outline-none focus:border-[#144f36]">
                <option>1</option>
                <option>0</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Status (Web)</label>
              <select id="course_status_web" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white outline-none focus:border-[#144f36]">
                <option>1</option>
                <option>0</option>  
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Order</label>
              <input type="text" placeholder="Course Order" value={order} onChange={e => setOrder(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
            </div>
          </div>
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Views</label>
              <input type="text" placeholder="0" value={views} onChange={e => setViews(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Reviews</label>
              <input type="text" placeholder="0" value={reviews} onChange={e => setReviews(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Ratings</label>
              <input type="text" placeholder="0" value={ratings} onChange={e => setRatings(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
            </div>
          </div>
          {/* Additional Options */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-2">Add to</label>
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-2 text-xs text-slate-800 font-bold"><input id="course_popular" type="checkbox" className="rounded" /> Add to popular course</label>
                <label className="flex items-center gap-2 text-xs text-slate-800 font-bold"><input id="course_recommended" type="checkbox" className="rounded" /> Add to recommended course</label>
                <label className="flex items-center gap-2 text-xs text-slate-800 font-bold"><input id="course_certificate" type="checkbox" checked={certificateShow} onChange={e => setCertificateShow(e.target.checked)} className="rounded" /> Is Certificate Show</label>
                <label className="flex items-center gap-2 text-xs text-slate-800 font-bold"><input id="course_live_class" type="checkbox" checked={liveClassShow} onChange={e => setLiveClassShow(e.target.checked)} className="rounded" /> Is Live Class Show</label>
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Image (Thumbnail)</label>
              <input type="file" accept="image/*" onChange={e => setBannerFile(e.target.files[0])} className="w-full border border-slate-300 rounded px-3 py-1 text-sm outline-none bg-white focus:border-[#144f36]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course PDF</label>
              <input type="file" accept=".pdf" onChange={e => setPdfFile(e.target.files[0])} className="w-full border border-slate-300 rounded px-3 py-1 text-sm outline-none bg-white focus:border-[#144f36]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Instructor</label>
              <select id="course_instructor" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white outline-none" value={selectedInstructor} onChange={e => setSelectedInstructor(e.target.value)}>
                <option value="">- - - Select - - -</option>
                {instructors.map(ins => (
                  <option key={ins._id} value={ins._id}>{ins.name}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Intro and Description */}
          <div className="mb-4">
            <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Intro</label>
            <textarea rows="3" placeholder="Enter Course Intro" className="w-1/2 border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36]"></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Description</label>
            <textarea id="course_description" rows="6" placeholder="Enter Course Description" className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none" value={description} onChange={e => setDescription(e.target.value)}></textarea>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4 mt-8">
            <button onClick={() => navigate('/courses/all')} className="px-6 py-1.5 border border-slate-300 text-slate-600 rounded text-sm hover:bg-slate-50">Cancel</button>
            <button onClick={handleSubmit} disabled={loading} className="px-6 py-1.5 bg-[#144f36] text-white rounded text-sm hover:bg-[#0f3d2a] disabled:opacity-70">
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

