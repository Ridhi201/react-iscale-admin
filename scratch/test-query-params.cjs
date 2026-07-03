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
      status: 3,
      certificate_status: 3,
      declined_reason: "Reset for testing"
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

  // Test 1: Query params with JSON body
  await resetStatus(token);
  try {
    const res = await axios.put(`${BASE_URL}/myadmin/certificate/update-status/${enrollment_id}?status=2&certificate_status=2`, {
      certificate_no: "TEST-QUERY-1",
      certificate_pdf: "https://example.com/cert.pdf"
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Test 1 response:", res.data);
  } catch (err) {
    console.log("Test 1 failed:", err.response ? err.response.data : err.message);
  }
  let status = await checkStatus(token);
  console.log("Test 1 DB status:", status ? status.certificate_status : 'unknown');

  // Test 2: Query params with Multipart and file
  await resetStatus(token);
  const FormData = require('form-data');
  const form = new FormData();
  form.append('certificate_no', 'TEST-QUERY-2');
  const buffer = Buffer.from("%PDF-1.4 dummy pdf content");
  form.append('certificate_pdf', buffer, {
    filename: 'test.pdf',
    contentType: 'application/pdf'
  });

  try {
    const res = await axios.put(`${BASE_URL}/myadmin/certificate/update-status/${enrollment_id}?status=2&certificate_status=2`, form, {
      headers: { 
        Authorization: `Bearer ${token}`,
        ...form.getHeaders()
      }
    });
    console.log("Test 2 response:", res.data);
  } catch (err) {
    console.log("Test 2 failed:", err.response ? err.response.data : err.message);
  }
  status = await checkStatus(token);
  console.log("Test 2 DB status:", status ? status.certificate_status : 'unknown');
}

run();
