const axios = require('axios');
const BASE_URL = 'https://api.theiscale.com';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjE4ZDlmYzkzZDM0NjY4ZmQ0YzgxZCIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsInJvbGUiOjEsImlhdCI6MTc4MDY1NjM1NCwiZXhwIjoxNzgwNzQyNzU0fQ.RZhAyFUnoj6yk6O85tRLWC_De5eBLfPxoS7VwIw5uAM";

async function getCourses() {
  try {
    const response = await axios.get(`${BASE_URL}/myadmin/courses/get-courses`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Success getCourses:", response.data);
  } catch (err) {
    console.log("Error getCourses:", err.response ? err.response.data : err.message);
  }
}

getCourses();
