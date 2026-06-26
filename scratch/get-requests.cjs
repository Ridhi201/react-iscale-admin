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
    const res = await axios.get(`${BASE_URL}/myadmin/certificate/all-requests?limit=5`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("All requests data sample:", JSON.stringify(res.data.data?.[0], null, 2));
  } catch (err) {
    console.log("Error:", err.response ? err.response.data : err.message);
  }
}
run();
