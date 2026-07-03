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

  const FormData = require('form-data');
  const form = new FormData();
  form.append('status', 2);
  form.append('certificate_status', 2);
  form.append('certificate_no', 'CERT-MULTIPART-STR');
  form.append('certificate_pdf', 'https://www.vecteezy.com/free-vector/certificate'); // Sending URL string

  try {
    const response = await axios.put(`${BASE_URL}/myadmin/certificate/update-status/6a38e58f9ec4b73a297721bf`, form, {
      headers: { 
        Authorization: `Bearer ${token}`,
        ...form.getHeaders()
      }
    });
    console.log("Success with multipart string:", response.data);
  } catch (err) {
    console.log("Error with multipart string:", err.response ? err.response.data : err.message);
  }
}

run();
