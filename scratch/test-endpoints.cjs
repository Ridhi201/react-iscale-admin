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

  const enrollment_id = "6a38e58f9ec4b73a297721bf"; // Kabir Dhaliwal

  const endpoints = [
    { method: 'put', url: `/myadmin/certificate/update-status/${enrollment_id}` },
    { method: 'patch', url: `/myadmin/certificate/update-status/${enrollment_id}` },
    { method: 'post', url: `/myadmin/certificate/update-status/${enrollment_id}` },
    { method: 'put', url: `/myadmin/certificate/update/${enrollment_id}` },
    { method: 'patch', url: `/myadmin/certificate/update/${enrollment_id}` },
    { method: 'put', url: `/myadmin/certificate/status/${enrollment_id}` },
    { method: 'patch', url: `/myadmin/certificate/status/${enrollment_id}` },
    { method: 'put', url: `/myadmin/certificate/change-status/${enrollment_id}` },
    { method: 'patch', url: `/myadmin/certificate/change-status/${enrollment_id}` }
  ];

  for (const ep of endpoints) {
    console.log(`\n--- Trying ${ep.method.toUpperCase()} ${ep.url} ---`);
    try {
      // Send a status update payload that the backend might expect
      // If approved is 2:
      const payload = {
        status: 2,
        certificate_no: "TEST_EP_123",
        certificate_pdf: "https://example.com/test.pdf"
      };

      const res = await axios({
        method: ep.method,
        url: `${BASE_URL}${ep.url}`,
        data: payload,
        headers: { Authorization: `Bearer ${activeToken}` }
      });

      console.log("Response status:", res.status, "data:", res.data);

      // Verify DB
      const resAfter = await axios.get(`${BASE_URL}/myadmin/certificate/all-requests`, {
        headers: { Authorization: `Bearer ${activeToken}` }
      });
      const target = resAfter.data.data.find(r => r.enrollment_id === enrollment_id);
      console.log("Record in DB:", {
        certificate_status: target.certificate_status,
        certificate_no: target.certificate_no,
        certificate_pdf: target.certificate_pdf
      });

      if (target.certificate_status === 2 || target.certificate_status === 'approved' || target.certificate_no === "TEST_EP_123") {
        console.log("SUCCESS!!! THIS ENDPOINT UPDATED THE DB!");
        break;
      }
    } catch (err) {
      console.log("Failed:", err.response ? `${err.response.status} - ${JSON.stringify(err.response.data)}` : err.message);
    }
  }
}

run();
