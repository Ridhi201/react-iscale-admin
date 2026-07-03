import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config/api';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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
    instructor: '',
    m_course_price: '',
    m_course_offer_price: ''
  });

  const [bannerFile, setBannerFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

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
    const loadData = async () => {
      let loadedCategories = [];
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/myadmin/course/categories-dropdown`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.status) {
          setCategories(res.data.data);
          loadedCategories = res.data.data;
        }
      } catch (err) {
        console.error('Failed to load categories', err);
      }

      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/myadmin/instructor/instructors-dropdown`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.status) setInstructors(res.data.data);
      } catch (err) {
        console.error('Failed to load instructors', err);
      }

      let course = null;
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/myadmin/course/course/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data?.data) {
          course = res.data.data;
        }
      } catch (err) {
        console.error('Failed to fetch course details', err);
      }

      if (!course && location.state?.courseData) {
        course = location.state.courseData;
      }

      if (course) {
        populateForm(course, loadedCategories);
      }
    };

    const populateForm = (course, categoriesList) => {
      const normStatus = (val) => {
        if (val === 0 || val === "0" || val === "inactive" || val === false || val === "false") {
          return "0";
        }
        return "1";
      };

      const isTruthy = (val) => {
        if (val === 1 || val === "1" || val === true || val === "true" || String(val).toLowerCase() === "yes" || String(val).toLowerCase() === "active") {
          return 1;
        }
        return 0;
      };

      let categoryId = course.category ?? course.m_course_category ?? '';
      if (categoryId && !categoriesList.find(c => c._id === categoryId)) {
        const found = categoriesList.find(c => c.m_category_name === categoryId);
        if (found) categoryId = found._id;
      }

      let typeVal = course.course_type ?? course.type ?? course.m_course_type ?? '';
      if (typeVal === 'Paid') typeVal = '2';
      if (typeVal === 'Free') typeVal = '1';

      setCourseData({
        m_course_lang: course.lang ?? course.m_course_lang ?? 1,
        m_course_title: course.title ?? course.m_course_title ?? '',
        m_course_category: categoryId,
        m_course_type: typeVal,
        m_course_status: normStatus(course.status ?? course.m_course_status),
        m_course_status_web: normStatus(course.status_web ?? course.m_course_status_web),
        m_course_popular: isTruthy(course.popular ?? course.m_course_popular),
        m_course_recomended: isTruthy(course.recomended ?? course.recommended ?? course.m_course_recomended),
        m_course_description: course.description ?? course.m_course_description ?? '',
        m_course_keyword: course.keyword ?? course.m_course_keyword ?? '',
        m_course_code: course.code ?? course.m_course_code ?? '',
        m_course_video_link: course.video_link ?? course.m_course_video_link ?? '',
        m_course_duration_app: course.duration_app ?? course.m_course_duration_app ?? '',
        m_course_duration_web: course.duration_web ?? course.m_course_duration_web ?? '',
        m_course_order: course.order ?? course.m_course_order ?? '',
        m_course_view: course.view ?? course.m_course_view ?? '0',
        m_course_reviews: course.reviews ?? course.m_course_reviews ?? '0',
        m_course_rating: course.rating ?? course.m_course_rating ?? '0',
        m_course_intro: course.intro ?? course.m_course_intro ?? '',
        m_course_certificate: isTruthy(course.certificate ?? course.m_course_certificate),
        m_course_live_class: isTruthy(course.live_class ?? course.m_course_live_class),
        m_course_app_g_link: course.app_g_link ?? course.m_course_app_g_link ?? '',
        m_course_web_g_link: course.web_g_link ?? course.m_course_web_g_link ?? '',
        m_course_graphy_instruction: course.graphy_instruction ?? course.m_course_graphy_instruction ?? '',
        instructor: course.instructor ?? course.m_course_instructor ?? '',
        m_course_price: course.price ?? course.m_course_price ?? '',
        m_course_offer_price: course.offer_price ?? course.m_course_offer_price ?? ''
      });
    };

    loadData();
  }, [id, location.state]);

  const handleSubmit = async () => {
    setLoading(true); 
    try {
      const token = localStorage.getItem('token');
      const payload = new FormData();
      Object.entries(courseData).forEach(([key, val]) => {
        if (key === "m_course_status" || key === "m_course_status_web") {
          const statusVal = (val === "1" || val === 1 || val === true || String(val) === "true") ? "1" : "0";
          payload.append(key, statusVal);
          // Also append flat version to be safe
          if (key === "m_course_status") payload.append("status", statusVal);
          if (key === "m_course_status_web") payload.append("status_web", statusVal);
        } else if (
          [
            "m_course_popular",
            "m_course_recomended",
            "m_course_certificate",
            "m_course_live_class"
          ].includes(key)
        ) {
          const boolVal = (val === "1" || val === 1 || val === true || String(val) === "true") ? "1" : "0";
          payload.append(key, boolVal);
          // Also append flat version to be safe
          if (key === "m_course_popular") payload.append("popular", boolVal);
          if (key === "m_course_recomended") payload.append("recomended", boolVal);
          if (key === "m_course_certificate") payload.append("certificate", boolVal);
          if (key === "m_course_live_class") payload.append("live_class", boolVal);
        } else if (
          [
            "m_course_price",
            "m_course_offer_price",
            "m_course_lang",
            "m_course_type",
            "m_course_order"
          ].includes(key)
        ) {
          const num = Number(val);
          if (val === "" || val === null || val === undefined) {
            payload.append(key, 0);
          } else if (isNaN(num)) {
            if (key === "m_course_type" && ["Self Paced", "Live", "Hybrid"].includes(val)) {
              payload.append(key, val);
            } else {
              payload.append(key, 0);
            }
          } else {
            payload.append(key, num);
          }
        } else {
          payload.append(key, val ?? "");
        }
      });
      if (bannerFile) payload.append('m_course_banner', bannerFile);
      if (pdfFile) payload.append('m_course_pdf', pdfFile);
      for (let pair of payload.entries()) {
        console.log(pair[0], pair[1]);
      }
      const response = await axios.put(`${BASE_URL}/myadmin/course/update-course/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data?.status) {
        await window.customAlert(response.data.message || 'Course updated successfully');
        navigate('/courses/all');
      } else {
        await window.customAlert('Failed to update course');
      }
    } catch (error) {
      console.error('UPDATE COURSE ERROR:', error);
      const msg = error.response?.data?.message || error.message || 'Unknown error';
      await window.customAlert(`❌ Error: ${msg}`);
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
            <h2 className="text-white font-bold tracking-wide text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">Edit Course</h2>
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
              <select id="m_course_lang" value={courseData.m_course_lang} onChange={handleChange} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white outline-none">
                <option value="1">English</option>
                <option value="2">Hindi</option>
                <option value="3">Hinglish</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Category</label>
              <select id="m_course_category" value={courseData.m_course_category} onChange={handleChange} className="w-full border border-slate-300 focus:border-[#144f36] rounded px-3 py-1.5 text-sm bg-white outline-none">
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
                <option value="1">Free</option>
                <option value="2">Paid</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Price</label>
              <input id="m_course_price" type="number" value={courseData.m_course_price} onChange={handleChange} placeholder="Course Price" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Offer Price</label>
              <input id="m_course_offer_price" type="number" value={courseData.m_course_offer_price} onChange={handleChange} placeholder="Offer Price" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36]" />
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
                <option value= "1">Active</option>
                <option value= "0">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Status (Web)</label>
              <select id="m_course_status_web" value={courseData.m_course_status_web} onChange={handleChange} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white outline-none focus:border-[#144f36]">
                <option value= "1">Active</option>
                <option value="0">Inactive</option>
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
              <input id="m_course_view" type="text" value={courseData.m_course_view} onChange={handleChange} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Reviews</label>
              <input id="m_course_reviews" type="text" value={courseData.m_course_reviews} onChange={handleChange} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Ratings</label>
              <input id="m_course_rating" type="text" value={courseData.m_course_rating} onChange={handleChange} className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]" />
            </div>
          </div>

          {/* Additional Options */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-2">Add to</label>
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-2 text-xs text-slate-800 font-bold">
                  <input id="m_course_popular" type="checkbox" checked={courseData.m_course_popular === 1} onChange={handleChange} className="rounded text-[#144f36] focus:ring-[#144f36]" /> Add to popular course
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-800 font-bold">
                  <input id="m_course_recomended" type="checkbox" checked={courseData.m_course_recomended === 1} onChange={handleChange} className="rounded text-[#144f36] focus:ring-[#144f36]" /> Add to recommended course
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-800 font-bold">
                  <input id="m_course_certificate" type="checkbox" checked={courseData.m_course_certificate === 1} onChange={handleChange} className="rounded text-[#144f36] focus:ring-[#144f36]" /> Certificate Show
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-800 font-bold">
                  <input id="m_course_live_class" type="checkbox" checked={courseData.m_course_live_class === 1} onChange={handleChange} className="rounded text-[#144f36] focus:ring-[#144f36]" /> Live Class Show
                </label>
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Image (Thumbnail)</label>
              <input type="file" accept="image/*" onChange={(e) => setBannerFile(e.target.files[0])} className="w-full border border-slate-300 rounded px-3 py-1 text-sm outline-none bg-white focus:border-[#144f36]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Course PDF</label>
              <input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files[0])} className="w-full border border-slate-300 rounded px-3 py-1 text-sm outline-none bg-white focus:border-[#144f36]" />
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
            <textarea rows="3" id="m_course_intro" value={courseData.m_course_intro} onChange={handleChange} placeholder="Enter Course Intro" className="w-1/2 border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]"></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">App GLink</label>
              <input id="m_course_app_g_link" type="text" value={courseData.m_course_app_g_link} onChange={handleChange} placeholder="App GLink" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Web GLink</label>
              <input id="m_course_web_g_link" type="text" value={courseData.m_course_web_g_link} onChange={handleChange} placeholder="Web GLink" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[13px] font-bold text-slate-800 mb-1">Graphy Instruction</label>
              <textarea id="m_course_graphy_instruction" rows="2" value={courseData.m_course_graphy_instruction} onChange={handleChange} placeholder="Graphy Instruction" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]"></textarea>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[13px] font-bold text-slate-800 mb-1">Course Description</label>
            <textarea id="m_course_description" rows="6" value={courseData.m_course_description} onChange={handleChange} placeholder="Enter Course Description" className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]"></textarea>
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

