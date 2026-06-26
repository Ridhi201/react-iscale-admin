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

  // Let's print current state
  try {
    const resBefore = await axios.get(`${BASE_URL}/myadmin/certificate/all-requests`, {
      headers: { Authorization: `Bearer ${activeToken}` }
    });
    const target = resBefore.data.data.find(r => r.enrollment_id === enrollment_id);
    console.log("Before update:", target);
  } catch (err) {
    console.error("Error fetching requests:", err.message);
  }

  // Let's try PUT update-status
  try {
    const payload = {
      status: "approved",
      certificate_no: "CERT12345",
      certificate_pdf: "https://example.com/cert.pdf"
    };
    console.log("Sending PUT request with payload:", payload);
    const updateRes = await axios.put(
      `${BASE_URL}/myadmin/certificate/update-status/${enrollment_id}`,
      payload,
      {
        headers: { Authorization: `Bearer ${activeToken}` }
      }
    );
    console.log("Update response:", updateRes.data);
  } catch (err) {
    console.error("Error during update:", err.response ? err.response.data : err.message);
  }

  // Let's print state after update
  try {
    const resAfter = await axios.get(`${BASE_URL}/myadmin/certificate/all-requests`, {
      headers: { Authorization: `Bearer ${activeToken}` }
    });
    const target = resAfter.data.data.find(r => r.enrollment_id === enrollment_id);
    console.log("After update:", target);
  } catch (err) {
    console.error("Error fetching requests:", err.message);
  }
}

run();
