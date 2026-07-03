const axios = require('axios');
const BASE_URL = 'https://api.theiscale.com';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjE4ZDlmYzkzZDM0NjY4ZmQ0YzgxZCIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsInJvbGUiOjEsImlhdCI6MTc4MDY1NjM1NCwiZXhwIjoxNzgwNzQyNzU0fQ.RZhAyFUnoj6yk6O85tRLWC_De5eBLfPxoS7VwIw5uAM";

async function getCourses() {
  try {
    const response = await axios.get(`${BASE_URL}/myadmin/course/all-courses?limit=5`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Success getCourses length:", response.data?.data?.length);
    if (response.data?.data?.length > 0) {
      console.log("First course ID:", response.data.data[0]._id);
      console.log("First course Title:", response.data.data[0].m_course_title);
    }
  } catch (err) {
    console.log("Error getCourses:", err.response ? err.response.data : err.message);
  }
}

getCourses();
