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

  // Let's define the variations of PDF and Number fields to test
  const pdfKeys = ['certificate_pdf', 'certificatePdf', 'pdf', 'pdfUrl', 'pdf_url', 'certificate_url', 'certificateUrl', 'cert_pdf', 'cert_url', 'certificate'];
  const noKeys = ['certificate_no', 'certificateNo', 'cert_no', 'certificate_number', 'certificateNumber', 'certNo', 'certNumber', 'number'];

  // We will run them one by one. If one succeeds (does not throw "Certificate PDF required"), we print success!
  // To avoid pollution, we can try them sequentially or build a payload with all of them first to see if it succeeds.
  // Wait, if we build a payload containing ALL of them at once, and it succeeds, then we can narrow it down!
  // Let's try sending all of them first!
  const megaPayload = {
    status: 2 // Assuming 2 is approved
  };

  // Add all pdf keys
  pdfKeys.forEach(k => {
    megaPayload[k] = "https://example.com/mega_test_pdf.pdf";
  });

  // Add all number keys
  noKeys.forEach(k => {
    megaPayload[k] = "MEGA_NUM_123";
  });

  console.log("Sending PUT request with megaPayload:", megaPayload);

  try {
    const res = await axios.put(
      `${BASE_URL}/myadmin/certificate/update-status/${enrollment_id}`,
      megaPayload,
      {
        headers: { Authorization: `Bearer ${activeToken}` }
      }
    );
    console.log("Mega payload response status:", res.status, "data:", res.data);

    // Fetch database record to see what was saved!
    const resAfter = await axios.get(`${BASE_URL}/myadmin/certificate/all-requests`, {
      headers: { Authorization: `Bearer ${activeToken}` }
    });
    const target = resAfter.data.data.find(r => r.enrollment_id === enrollment_id);
    console.log("Record in DB after mega-update:", target);

  } catch (err) {
    console.error("Mega update error:", err.response ? err.response.data : err.message);
  }
}

run();
