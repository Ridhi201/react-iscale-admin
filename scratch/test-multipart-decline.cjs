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

  const enrollment_id = "6a38e58f9ec4b73a297721bf";
  const FormData = require('form-data');
  const form = new FormData();
  form.append('status', 3);
  form.append('certificate_status', 3);
  form.append('declined_reason', 'Test Multipart Decline');

  try {
    const response = await axios.put(`${BASE_URL}/myadmin/certificate/update-status/${enrollment_id}`, form, {
      headers: { 
        Authorization: `Bearer ${token}`,
        ...form.getHeaders()
      }
    });
    console.log("Response:", response.data);

    // Verify database update
    const res = await axios.get(`${BASE_URL}/myadmin/certificate/all-requests`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const record = res.data.data.find(d => d.enrollment_id === enrollment_id);
    console.log("Record details after multipart decline:", JSON.stringify(record, null, 2));

  } catch (err) {
    console.log("Error:", err.response ? err.response.data : err.message);
  }
}

run();
