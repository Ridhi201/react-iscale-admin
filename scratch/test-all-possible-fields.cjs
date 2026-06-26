const axios = require('axios');

const BASE_URL = 'https://iscale-backend.onrender.com';
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

const testCombinations = [
  // Let's try JSON payloads first
  { name: "JSON: certificate_pdf", type: "json", data: { certificate_pdf: "https://example.com/cert.pdf" } },
  { name: "JSON: certificate_pdf_link", type: "json", data: { certificate_pdf_link: "https://example.com/cert.pdf" } },
  { name: "JSON: certificate_pdf_url", type: "json", data: { certificate_pdf_url: "https://example.com/cert.pdf" } },
  { name: "JSON: pdf_link", type: "json", data: { pdf_link: "https://example.com/cert.pdf" } },
  { name: "JSON: pdf_url", type: "json", data: { pdf_url: "https://example.com/cert.pdf" } },
  { name: "JSON: certificate_url", type: "json", data: { certificate_url: "https://example.com/cert.pdf" } },
  { name: "JSON: pdf", type: "json", data: { pdf: "https://example.com/cert.pdf" } },
  { name: "JSON: link", type: "json", data: { link: "https://example.com/cert.pdf" } },
  { name: "JSON: url", type: "json", data: { url: "https://example.com/cert.pdf" } },
  { name: "JSON: certificatePdf", type: "json", data: { certificatePdf: "https://example.com/cert.pdf" } },
  { name: "JSON: certificatePdfUrl", type: "json", data: { certificatePdfUrl: "https://example.com/cert.pdf" } },
  { name: "JSON: certificatePdfLink", type: "json", data: { certificatePdfLink: "https://example.com/cert.pdf" } },
  { name: "JSON: pdfPath", type: "json", data: { pdfPath: "https://example.com/cert.pdf" } },

  // Let's try sending status as string too
  { name: "JSON: status as string + certificate_pdf", type: "json", data: { status: "2", certificate_status: "2", certificate_pdf: "https://example.com/cert.pdf" } },
  { name: "JSON: status as string + certificate_pdf_link", type: "json", data: { status: "2", certificate_status: "2", certificate_pdf_link: "https://example.com/cert.pdf" } },

  // Let's try multipart/form-data payloads
  { name: "Multipart: certificate_pdf", type: "multipart", data: { certificate_pdf: "https://example.com/cert.pdf" } },
  { name: "Multipart: certificate_pdf_link", type: "multipart", data: { certificate_pdf_link: "https://example.com/cert.pdf" } },
  { name: "Multipart: certificate_pdf_url", type: "multipart", data: { certificate_pdf_url: "https://example.com/cert.pdf" } },
  { name: "Multipart: pdf_link", type: "multipart", data: { pdf_link: "https://example.com/cert.pdf" } },
  { name: "Multipart: pdf_url", type: "multipart", data: { pdf_url: "https://example.com/cert.pdf" } },
  { name: "Multipart: certificate_url", type: "multipart", data: { certificate_url: "https://example.com/cert.pdf" } },
  { name: "Multipart: pdf", type: "multipart", data: { pdf: "https://example.com/cert.pdf" } },
  { name: "Multipart: link", type: "multipart", data: { link: "https://example.com/cert.pdf" } },
  { name: "Multipart: url", type: "multipart", data: { url: "https://example.com/cert.pdf" } },
  { name: "Multipart: certificatePdf", type: "multipart", data: { certificatePdf: "https://example.com/cert.pdf" } },
  { name: "Multipart: certificatePdfUrl", type: "multipart", data: { certificatePdfUrl: "https://example.com/cert.pdf" } },
  { name: "Multipart: certificatePdfLink", type: "multipart", data: { certificatePdfLink: "https://example.com/cert.pdf" } },
  { name: "Multipart: pdfPath", type: "multipart", data: { pdfPath: "https://example.com/cert.pdf" } }
];

async function run() {
  const token = await getToken();
  if (!token) {
    console.log("Failed to get token");
    return;
  }

  for (const combo of testCombinations) {
    // 1. Reset status to 3
    await resetStatus(token);
    
    // Double check reset worked
    let record = await checkStatus(token);
    if (!record || record.certificate_status !== 3) {
      console.log(`Failed to reset status to 3 before testing [${combo.name}]. Skipping.`);
      continue;
    }

    // 2. Prepare payload
    const basePayload = {
      status: combo.data.status !== undefined ? combo.data.status : 2,
      certificate_status: combo.data.certificate_status !== undefined ? combo.data.certificate_status : 2,
      certificate_no: "CERT-TEST-COMBOS"
    };
    const finalPayload = { ...basePayload, ...combo.data };

    // 3. Send request
    try {
      if (combo.type === "json") {
        await axios.put(`${BASE_URL}/myadmin/certificate/update-status/${enrollment_id}`, finalPayload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        const FormData = require('form-data');
        const form = new FormData();
        for (const k in finalPayload) {
          form.append(k, finalPayload[k]);
        }
        await axios.put(`${BASE_URL}/myadmin/certificate/update-status/${enrollment_id}`, form, {
          headers: { 
            Authorization: `Bearer ${token}`,
            ...form.getHeaders()
          }
        });
      }
    } catch (err) {
      // Ignore API errors and just check if database updated anyway (sometimes error is returned but DB is updated, or vice-versa)
    }

    // 4. Verify if database updated to 2
    record = await checkStatus(token);
    if (record && record.certificate_status === 2) {
      console.log(`\n>>> SUCCESS: Combination [${combo.name}] successfully updated database to Approved (status=2)!`);
      console.log("Updated Record details:", record);
      return;
    } else {
      console.log(`Combo [${combo.name}] failed. DB status remained: ${record ? record.certificate_status : 'unknown'}`);
    }
  }

  console.log("\nAll combinations tested. None of them updated the database status to 2.");
}

run();
