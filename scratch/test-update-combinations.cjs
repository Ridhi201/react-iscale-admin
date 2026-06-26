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

  const testPayloads = [
    // 1. Try different keys and value formats
    {
      description: "Test 1: status as number 2, cert_no, cert_pdf",
      payload: {
        status: 2,
        certificate_no: "CERT_T1",
        certificate_pdf: "https://example.com/cert1.pdf"
      }
    },
    {
      description: "Test 2: certificate_status as number 2, cert_no, cert_pdf",
      payload: {
        certificate_status: 2,
        certificate_no: "CERT_T2",
        certificate_pdf: "https://example.com/cert2.pdf"
      }
    },
    {
      description: "Test 3: certificate_status as 'approved'",
      payload: {
        certificate_status: "approved",
        certificate_no: "CERT_T3",
        certificate_pdf: "https://example.com/cert3.pdf"
      }
    },
    {
      description: "Test 4: status as 'approved', cert_no, cert_pdf",
      payload: {
        status: "approved",
        certificate_no: "CERT_T4",
        certificate_pdf: "https://example.com/cert4.pdf"
      }
    },
    {
      description: "Test 5: status as 2, certificate_status as 2, cert_no, cert_pdf",
      payload: {
        status: 2,
        certificate_status: 2,
        certificate_no: "CERT_T5",
        certificate_pdf: "https://example.com/cert5.pdf"
      }
    }
  ];

  for (const t of testPayloads) {
    console.log(`\n--- Running ${t.description} ---`);
    try {
      const updateRes = await axios.put(
        `${BASE_URL}/myadmin/certificate/update-status/${enrollment_id}`,
        t.payload,
        {
          headers: { Authorization: `Bearer ${activeToken}` }
        }
      );
      console.log("API Response:", updateRes.data);

      // Fetch status
      const resAfter = await axios.get(`${BASE_URL}/myadmin/certificate/all-requests`, {
        headers: { Authorization: `Bearer ${activeToken}` }
      });
      const target = resAfter.data.data.find(r => r.enrollment_id === enrollment_id);
      console.log("Record in DB after update:", {
        certificate_status: target.certificate_status,
        certificate_no: target.certificate_no,
        certificate_pdf: target.certificate_pdf
      });
    } catch (err) {
      console.error("Error during update:", err.response ? err.response.data : err.message);
    }
  }
}

run();
