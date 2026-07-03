const axios = require('axios');

const BASE_URL = 'https://api.theiscale.com';
const passwords = ['admin123', '123456', '12345678', 'admin', 'password', 'Iscale@123', 'iscale@123'];
const email = 'admin1@gmail.com';
const enrollment_id = "6a38e58f9ec4b73a297721bf";

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

async function resetStatus(token) {
  try {
    await axios.put(`${BASE_URL}/myadmin/certificate/update-status/${enrollment_id}`, {
      status: 1,
      certificate_status: 1
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (err) {
    console.error("Failed to reset status:", err.message);
  }
}

async function checkStatus(token) {
  try {
    const res = await axios.get(`${BASE_URL}/myadmin/certificate/all-requests`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const record = res.data.data.find(d => d.enrollment_id === enrollment_id);
    return record;
  } catch (err) {
    console.error("Failed to check status:", err.message);
    return null;
  }
}

async function run() {
  const token = await getToken();
  if (!token) {
    console.log("Failed to get token");
    return;
  }

  // Test 1: Only status: 3
  await resetStatus(token);
  try {
    await axios.put(`${BASE_URL}/myadmin/certificate/update-status/${enrollment_id}`, {
      status: 3,
      declined_reason: "Only status 3"
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const record = await checkStatus(token);
    console.log("Test 1 (only status: 3) DB status:", record ? record.certificate_status : 'unknown');
  } catch (err) {
    console.log("Test 1 failed:", err.message);
  }

  // Test 2: Only certificate_status: 3
  await resetStatus(token);
  try {
    await axios.put(`${BASE_URL}/myadmin/certificate/update-status/${enrollment_id}`, {
      certificate_status: 3,
      declined_reason: "Only certificate_status 3"
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const record = await checkStatus(token);
    console.log("Test 2 (only certificate_status: 3) DB status:", record ? record.certificate_status : 'unknown');
  } catch (err) {
    console.log("Test 2 failed:", err.message);
  }
}

run();
