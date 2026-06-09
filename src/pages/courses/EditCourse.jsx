import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config/api';

export default function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);

  // Consolidated form state
  const [courseData, setCourseData] = useState({
    m_course_lang: 1,
    m_course_title: '',
    m_course_category: '',
    m_course_type: '',
    m_course_status: 1,
    m_course_status_web: 1,
    m_course_popular: 0,
    m_course_recomended: 0,
    m_course_description: '',
    m_course_keyword: '',
    m_course_code: '',
    m_course_video_link: '',
    m_course_duration_app: '',
    m_course_duration_web: '',
    m_course_order: '',
    m_course_view: '0',
    m_course_reviews: '0',
    m_course_rating: '0',
    m_course_intro: '',
    m_course_certificate: 0,
    m_course_live_class: 0,
    m_course_app_g_link: '',
    m_course_web_g_link: '',
    m_course_graphy_instruction: '',
    instructor: ''
  });

  const [bannerFile, setBannerFile] = useState(null);

  // Generic change handler for text/number inputs
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const numeric = checked ? 1 : 0;
      setCourseData((prev) => ({ ...prev, [id]: numeric }));
    } else {
      setCourseData((prev) => ({ ...prev, [id]: value }));
    }
  };

  useEffect(() => {
    // Load dropdown data
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/myadmin/course/categories-dropdown`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.status) setCategories(res.data.data);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };

    const fetchInstructors = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/myadmin/instructors-dropdown`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.status) setInstructors(res.data.data);
      } catch (err) {
        console.error('Failed to load instructors', err);
      }
    };

    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/myadmin/course/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const course = res.data?.data || {};
        setCourseData({
          m_course_lang: course.m_course_lang || 1,
          m_course_title: course.m_course_title || '',
          m_course_category: course.m_course_category || '',
          m_course_type: course.m_course_type || '',
          m_course_status: course.m_course_status ?? 1,
          m_course_status_web: course.m_course_status_web ?? 1,
          m_course_popular: course.m_course_popular ?? 0,
          m_course_recomended: course.m_course_recomended ?? 0,
          m_course_description: course.m_course_description || '',
          m_course_keyword: course.m_course_keyword || '',
          m_course_code: course.m_course_code || '',
          m_course_video_link: course.m_course_video_link || '',
          m_course_duration_app: course.m_course_duration_app || '',
          m_course_duration_web: course.m_course_duration_web || '',
          m_course_order: course.m_course_order || '',
          m_course_view: course.m_course_view ?? '0',
          m_course_reviews: course.m_course_reviews ?? '0',
          m_course_rating: course.m_course_rating ?? '0',
          m_course_intro: course.m_course_intro || '',
          m_course_certificate: course.m_course_certificate ?? 0,
          m_course_live_class: course.m_course_live_class ?? 0,
          m_course_app_g_link: course.m_course_app_g_link || '',
          m_course_web_g_link: course.m_course_web_g_link || '',
          m_course_graphy_instruction: course.m_course_graphy_instruction || '',
          instructor: course.m_course_instructor || ''
        });
      } catch (err) {
        console.error('Failed to fetch course details', err);
      }
    };

    fetchCategories();
    fetchInstructors();
    fetchCourse();
  }, [id]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const payload = new FormData();
      Object.entries(courseData).forEach(([key, val]) => {
        payload.append(key, val);
      });
      if (bannerFile) payload.append('m_course_banner', bannerFile);
      const response = await axios.put(`${BASE_URL}/myadmin/course/update-course/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data?.status) {
        alert(response.data.message || 'Course updated successfully');
        navigate('/courses/all');
      } else {
        alert('Failed to update course');
      }
    } catch (error) {
      console.error('UPDATE COURSE ERROR:', error);
      const msg = error.response?.data?.message || error.message || 'Unknown error';
      alert(`❌ Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eaf3f8] p-4 font-sans">
      <div className="bg-white rounded shadow-sm border border-slate-200 max-w-7xl mx-auto">
        <div className="p-3 border-b border-slate-200 flex justify-between items-center bg-[#f8fafd]">
          <h2 className="text-slate-700 font-medium">Edit Course</h2>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/courses/all')}
              className="bg-[#144f36] text-white px-4 py-1 rounded text-sm hover:bg-[#0f3d2a] transition-colors"
            >
              ↩ Back
            </button>
          </div>
        </div>
        <div className="p-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Language</label>
              <select id="m_course_lang" value={courseData.m_course_lang} onChange={handleChange} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white outline-none">
                <option value="1">English</option>
                <option value="2">Hindi</option>
                <option value="3">Hinglish</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Category</label>
              <select id="m_course_category" value={courseData.m_course_category} onChange={handleChange} className="w-full border border-fuchsia-400 rounded px-3 py-1.5 text-sm bg-white outline-none">
                <option value="">- - - Select - - -</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.m_category_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Title</label>
              <input id="m_course_title" type="text" value={courseData.m_course_title} onChange={handleChange} placeholder="Course Title" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Code</label>
              <input id="m_course_code" type="text" value={courseData.m_course_code} onChange={handleChange} placeholder="Course Code" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Demo Video Link</label>
              <input id="m_course_video_link" type="text" value={courseData.m_course_video_link} onChange={handleChange} placeholder="https://..." className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Type</label>
              <select id="m_course_type" value={courseData.m_course_type} onChange={handleChange} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white outline-none focus:border-[#144f36]">
                <option value="">Select Type</option>
                <option value="Self Paced">Self Paced</option>
                <option value="Live">Live</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Keywords</label>
              <input id="m_course_keyword" type="text" value={courseData.m_course_keyword} onChange={handleChange} placeholder="Course Keyword" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Duration (App)</label>
              <input id="m_course_duration_app" type="text" value={courseData.m_course_duration_app} onChange={handleChange} placeholder="Course Duration In App" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Duration (Web)</label>
              <input id="m_course_duration_web" type="text" value={courseData.m_course_duration_web} onChange={handleChange} placeholder="Course Duration In Web" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Status (App)</label>
              <select id="m_course_status" value={courseData.m_course_status} onChange={handleChange} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white outline-none focus:border-[#144f36]">
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Status (Web)</label>
              <select id="m_course_status_web" value={courseData.m_course_status_web} onChange={handleChange} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white outline-none focus:border-[#144f36]">
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Order</label>
              <input id="m_course_order" type="text" value={courseData.m_course_order} onChange={handleChange} placeholder="Course Order" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Views</label>
              <input id="m_course_view" type="text" value={courseData.m_course_view} onChange={handleChange} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Reviews</label>
              <input id="m_course_reviews" type="text" value={courseData.m_course_reviews} onChange={handleChange} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Ratings</label>
              <input id="m_course_rating" type="text" value={courseData.m_course_rating} onChange={handleChange} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none" />
            </div>
          </div>

          {/* Additional Options */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-2">Add to</label>
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-2 text-xs text-slate-800 font-bold">
                  <input id="m_course_popular" type="checkbox" checked={courseData.m_course_popular === 1} onChange={handleChange} className="rounded" /> Add to popular course
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-800 font-bold">
                  <input id="m_course_recomended" type="checkbox" checked={courseData.m_course_recomended === 1} onChange={handleChange} className="rounded" /> Add to recommended course
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-800 font-bold">
                  <input id="m_course_certificate" type="checkbox" checked={courseData.m_course_certificate === 1} onChange={handleChange} className="rounded" /> Certificate Show
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-800 font-bold">
                  <input id="m_course_live_class" type="checkbox" checked={courseData.m_course_live_class === 1} onChange={handleChange} className="rounded" /> Live Class Show
                </label>
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Image (Thumbnail)</label>
              <input type="file" accept="image/*" onChange={(e) => setBannerFile(e.target.files[0])} className="w-full border border-slate-300 rounded px-3 py-1 text-sm outline-none bg-white focus:border-[#144f36]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course PDF</label>
              <button className="bg-[#144f36] text-white px-4 py-2 rounded text-sm w-full flex items-center justify-center gap-2 hover:bg-[#0f3d2a]">📷 Course PDF</button>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Instructor</label>
              <select id="instructor" value={courseData.instructor} onChange={handleChange} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white outline-none">
                <option value="">- - - Select - - -</option>
                {instructors.map((ins) => (
                  <option key={ins._id} value={ins._id}>{ins.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Intro and Description */}
          <div className="mb-4">
            <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Intro</label>
            <textarea rows="3" id="m_course_intro" value={courseData.m_course_intro} onChange={handleChange} placeholder="Enter Course Intro" className="w-1/2 border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36]"></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">App GLink</label>
              <input id="m_course_app_g_link" type="text" value={courseData.m_course_app_g_link} onChange={handleChange} placeholder="App GLink" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Web GLink</label>
              <input id="m_course_web_g_link" type="text" value={courseData.m_course_web_g_link} onChange={handleChange} placeholder="Web GLink" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Graphy Instruction</label>
              <textarea id="m_course_graphy_instruction" rows="2" value={courseData.m_course_graphy_instruction} onChange={handleChange} placeholder="Graphy Instruction" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none"></textarea>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Description</label>
            <textarea id="m_course_description" rows="6" value={courseData.m_course_description} onChange={handleChange} placeholder="Enter Course Description" className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none"></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4 mt-8">
            <button onClick={() => navigate('/courses/all')} className="px-6 py-1.5 border border-slate-300 text-slate-600 rounded text-sm hover:bg-slate-50">Cancel</button>
            <button onClick={handleSubmit} disabled={loading} className="px-6 py-1.5 bg-[#144f36] text-white rounded text-sm hover:bg-[#0f3d2a] disabled:opacity-70">
              {loading ? 'Updating...' : 'Update Course'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
