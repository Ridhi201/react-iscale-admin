const axios = require('axios');

const BASE_URL = 'https://iscale-backend.onrender.com';

async function run() {
  const passwords = ['admin123', '123456', '12345678', 'admin', 'password', 'Iscale@123', 'iscale@123'];
  const email = 'admin1@gmail.com';
  let activeToken = '';
  for (const password of passwords) {
    try {
      const response = await axios.post(`${BASE_URL}/myadmin/auth/login`, {
        email,
        password
      });
      if (response.data && response.data.status) {
        activeToken = response.data.token;
        break;
      }
    } catch (err) {}
  }

  if (!activeToken) {
    console.log("No token found");
    return;
  }

  try {
    const res = await axios.get(`${BASE_URL}/myadmin/certificate/all-requests?limit=5`, {
      headers: { Authorization: `Bearer ${activeToken}` }
    });
    console.log("Certificate requests response status:", res.data.status);
    console.log("Certificate requests data sample:", JSON.stringify(res.data.data ? res.data.data.slice(0, 2) : res.data, null, 2));
  } catch (err) {
    console.error("Error fetching certificate requests:", err.response ? err.response.data : err.message);
  }
}

run();
