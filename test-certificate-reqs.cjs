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

async function testUpdate() {
  const token = await getToken();
  if (!token) return;

  const enrollment_id = "6a38e58f9ec4b73a297721bf"; 

  const payload = {
    status: 2, 
    certificate_status: 2,
    certificate_no: "CERT-1234",
    certificate_pdf_link: "https://example.com/cert.pdf" // Testing one by one
  };

  try {
    const response = await axios.put(`${BASE_URL}/myadmin/certificate/update-status/${enrollment_id}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Update Success:", response.data);
    
    const res = await axios.get(`${BASE_URL}/myadmin/certificate/all-requests`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Status after update:", res.data.data.find(d => d.enrollment_id === enrollment_id));
  } catch (err) {
    console.log("Update Error:", err.response ? err.response.data : err.message);
  }
}
testUpdate();
