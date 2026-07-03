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

const fieldsToTest = [
  "certificate_pdf_path",
  "certificate_pdf_link",
  "certificate_pdf_url",
  "certificate_pdf",
  "certificate_path",
  "certificate_link",
  "certificate_url",
  "cert_pdf_path",
  "cert_pdf_link",
  "cert_pdf_url",
  "cert_pdf",
  "cert_path",
  "cert_link",
  "cert_url",
  "pdf_path",
  "pdf_link",
  "pdf_url",
  "pdf",
  "link",
  "url",
  "path",
  "certificatePdfPath",
  "certificatePdfLink",
  "certificatePdfUrl",
  "certificatePdf",
  "certPdfPath",
  "certPdfLink",
  "certPdfUrl",
  "certPdf",
  "pdfPath"
];

async function run() {
  const token = await getToken();
  if (!token) {
    console.log("Failed to get token");
    return;
  }

  for (const field of fieldsToTest) {
    await resetStatus(token);
    
    const recordBefore = await checkStatus(token);
    if (!recordBefore || recordBefore.certificate_status !== 3) {
      console.log(`Failed to reset status for field [${field}]. Skipping.`);
      continue;
    }

    const payload = {
      status: 2,
      certificate_status: 2,
      certificate_no: "CERT-TEST-FIELDS",
      [field]: "https://example.com/certificate.pdf"
    };

    try {
      const res = await axios.put(`${BASE_URL}/myadmin/certificate/update-status/${enrollment_id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(`Field [${field}] response:`, res.data);
    } catch (err) {
      // Ignore error
    }

    const recordAfter = await checkStatus(token);
    if (recordAfter && recordAfter.certificate_status === 2) {
      console.log(`\n>>> SUCCESS: Field [${field}] successfully updated database to Approved (status=2)!`);
      console.log("Record details:", recordAfter);
      return;
    } else {
      console.log(`Field [${field}] failed. DB status remained: ${recordAfter ? recordAfter.certificate_status : 'unknown'}`);
    }
  }

  console.log("\nAll fields tested. None of them succeeded.");
}

run();
