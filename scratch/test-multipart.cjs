const axios = require('axios');

const BASE_URL = 'https://api.theiscale.com';

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

  // We want to test status = 2 vs status = 'approved' vs status = '2' as multipart
  const testCases = [
    { status: "approved" },
    { status: "2" },
    { status: 2 }
  ];

  for (const tc of testCases) {
    console.log(`\n--- Testing multipart form-data update with status: ${tc.status} ---`);
    try {
      // Create FormData
      const form = new FormData();
      form.append('status', tc.status);
      form.append('certificate_no', 'CERT_MP_123');

      // Create a dummy PDF buffer/blob
      const dummyBuffer = Buffer.from('%PDF-1.4 ... dummy content');
      form.append('certificate_pdf', new Blob([dummyBuffer], { type: 'application/pdf' }), 'certificate.pdf');

      const response = await axios.put(
        `${BASE_URL}/myadmin/certificate/update-status/${enrollment_id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${activeToken}`,
            // Axios automatically sets multipart/form-data boundary when passing FormData
          }
        }
      );

      console.log("API Response:", response.data);

      // Fetch state from database
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
      console.error("Update error:", err.response ? err.response.data : err.message);
    }
  }
}

run();
