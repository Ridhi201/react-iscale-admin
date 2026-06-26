const axios = require('axios');

const BASE_URL = 'https://iscale-backend.onrender.com';
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

async function tryPayload(token, name, payload, useFormData = false) {
  try {
    let response;
    if (useFormData) {
      const FormData = require('form-data');
      const form = new FormData();
      for (const key in payload) {
        form.append(key, payload[key]);
      }
      response = await axios.put(`${BASE_URL}/myadmin/certificate/update-status/6a38e58f9ec4b73a297721bf`, form, {
        headers: { 
          Authorization: `Bearer ${token}`,
          ...form.getHeaders()
        }
      });
    } else {
      response = await axios.put(`${BASE_URL}/myadmin/certificate/update-status/6a38e58f9ec4b73a297721bf`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    console.log(`Payload [${name}] Success:`, response.data);
    return true;
  } catch (err) {
    console.log(`Payload [${name}] Error:`, err.response ? err.response.data : err.message);
    return false;
  }
}

async function run() {
  const token = await getToken();
  if (!token) {
    console.log("Failed to get token");
    return;
  }

  // 1. Original payload that failed (with certificate_pdf_link)
  // Let's try certificate_pdf as string but not ending in .pdf
  await tryPayload(token, "certificate_pdf as string (no .pdf)", {
    status: 2,
    certificate_status: 2,
    certificate_no: "CERT-TEST-1",
    certificate_pdf: "https://www.vecteezy.com/free-vector/certificate"
  });

  // 2. Try certificate_pdf ending in .pdf
  await tryPayload(token, "certificate_pdf ending in .pdf", {
    status: 2,
    certificate_status: 2,
    certificate_no: "CERT-TEST-2",
    certificate_pdf: "https://example.com/certificate.pdf"
  });

  // 3. Try with different key names
  await tryPayload(token, "pdf_link ending in .pdf", {
    status: 2,
    certificate_status: 2,
    certificate_no: "CERT-TEST-3",
    pdf_link: "https://example.com/certificate.pdf"
  });

  await tryPayload(token, "certificate_url ending in .pdf", {
    status: 2,
    certificate_status: 2,
    certificate_no: "CERT-TEST-4",
    certificate_url: "https://example.com/certificate.pdf"
  });

  // 4. Let's try Form Data with a buffer (mimicking file upload)
  const stream = require('stream');
  const buffer = Buffer.from("dummy pdf content");
  const readStream = new stream.PassThrough();
  readStream.end(buffer);

  await tryPayload(token, "Form Data file upload", {
    status: 2,
    certificate_status: 2,
    certificate_no: "CERT-TEST-5",
    certificate_pdf: readStream // passing stream
  }, true);
}

run();
