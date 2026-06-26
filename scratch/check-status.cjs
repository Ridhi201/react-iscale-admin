const axios = require('axios');

const BASE_URL = 'https://iscale-backend.onrender.com';
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
    }
  }
  return null;
}

async function run() {
  const token = await getToken();
  if (!token) {
    console.log("Failed to get token");
    return;
  }

  try {
    const res = await axios.get(`${BASE_URL}/myadmin/certificate/all-requests`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const record = res.data.data.find(d => d.enrollment_id === "6a38e58f9ec4b73a297721bf");
    console.log("Record details:", JSON.stringify(record, null, 2));
  } catch (err) {
    console.log("Error:", err.response ? err.response.data : err.message);
  }
}

run();
