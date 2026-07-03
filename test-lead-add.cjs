const axios = require('axios');

const BASE_URL = 'https://api.theiscale.com';
const passwords = ['admin123', '123456', '12345678', 'admin', 'password', 'Iscale@123', 'iscale@123'];
const email = 'admin1@gmail.com';

async function getToken() {
  for (const password of passwords) {
    try {
      const response = await axios.post(`${BASE_URL}/myadmin/auth/login`, {
        email,
        password
      });
      if (response.data && response.data.status) {
        return response.data.token;
      }
    } catch (err) {
      // ignore
    }
  }
  return null;
}

async function run() {
  const token = await getToken();
  if (!token) {
    console.log("No token");
    return;
  }
  
  const payload = {
    m_lg_branch: false,
    m_lg_college: true,
    m_lg_desc: "jnjj",
    m_lg_education: false,
    m_lg_field_of_study: false,
    m_lg_gender: false,
    m_lg_laptop_desktop: false,
    m_lg_passing_year: false,
    m_lg_redirect_link: "https://example.com/java-session",
    m_lg_state: false,
    m_lg_status: 1,
    m_lg_title: "testing unique " + Date.now(),
    m_lg_working_professional: false
  };

  try {
    const res = await axios.post(`${BASE_URL}/myadmin/lead-generate/add`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Response:", res.data);
  } catch (err) {
    console.log("Error status:", err.response ? err.response.status : 'N/A');
    console.log("Error data:", err.response ? JSON.stringify(err.response.data) : err.message);
  }
}

run();
