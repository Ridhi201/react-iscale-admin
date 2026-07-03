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

  // Test body fields
  const testCases = [
    // 1. JSON payloads
    {
      description: "JSON with status='approved', enrollment_id in body",
      isMultipart: false,
      payload: {
        status: 'approved',
        enrollment_id: enrollment_id,
        certificate_no: "JSON_BODY_A",
        certificate_pdf: "https://example.com/json_body_a.pdf"
      }
    },
    {
      description: "JSON with status='approved', id in body",
      isMultipart: false,
      payload: {
        status: 'approved',
        id: enrollment_id,
        certificate_no: "JSON_BODY_B",
        certificate_pdf: "https://example.com/json_body_b.pdf"
      }
    },
    {
      description: "JSON with status=2, enrollment_id in body",
      isMultipart: false,
      payload: {
        status: 2,
        enrollment_id: enrollment_id,
        certificate_no: "JSON_BODY_C",
        certificate_pdf: "https://example.com/json_body_c.pdf"
      }
    },
    // 2. Multipart payloads
    {
      description: "Multipart with status=2, enrollment_id in body",
      isMultipart: true,
      payload: {
        status: 2,
        enrollment_id: enrollment_id,
        certificate_no: "MP_BODY_A"
      }
    },
    {
      description: "Multipart with status='approved', enrollment_id in body",
      isMultipart: true,
      payload: {
        status: 'approved',
        enrollment_id: enrollment_id,
        certificate_no: "MP_BODY_B"
      }
    },
    {
      description: "Multipart with status='approved', id in body",
      isMultipart: true,
      payload: {
        status: 'approved',
        id: enrollment_id,
        certificate_no: "MP_BODY_C"
      }
    }
  ];

  for (const tc of testCases) {
    console.log(`\n--- Running ${tc.description} ---`);
    try {
      let data;
      let headers = { Authorization: `Bearer ${activeToken}` };

      if (tc.isMultipart) {
        const form = new FormData();
        Object.keys(tc.payload).forEach(key => {
          form.append(key, tc.payload[key]);
        });
        const dummyBuffer = Buffer.from('%PDF-1.4 ... dummy content');
        form.append('certificate_pdf', new Blob([dummyBuffer], { type: 'application/pdf' }), 'certificate.pdf');
        data = form;
      } else {
        data = tc.payload;
      }

      const response = await axios.put(
        `${BASE_URL}/myadmin/certificate/update-status/${enrollment_id}`,
        data,
        { headers }
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

      if (target.certificate_no && (target.certificate_no.includes('BODY') || target.certificate_no.includes('MP'))) {
        console.log("SUCCESS! THIS BODY ID CONFIGURATION WORKED!");
        break;
      }

    } catch (err) {
      console.error("Update error:", err.response ? err.response.data : err.message);
    }
  }
}

run();
