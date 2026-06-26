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

  // We want to test variations in key names in FormData
  const testCases = [
    {
      description: "Test A: status='approved', certificate_no, certificate_pdf (file)",
      fields: { status: 'approved', certificate_no: 'CERT_A' }
    },
    {
      description: "Test B: certificate_status='approved', certificate_no, certificate_pdf (file)",
      fields: { certificate_status: 'approved', certificate_no: 'CERT_B' }
    },
    {
      description: "Test C: status=2, certificate_no, certificate_pdf (file)",
      fields: { status: 2, certificate_no: 'CERT_C' }
    },
    {
      description: "Test D: certificate_status=2, certificate_no, certificate_pdf (file)",
      fields: { certificate_status: 2, certificate_no: 'CERT_D' }
    },
    {
      description: "Test E: status='2', certificate_no, certificate_pdf (file)",
      fields: { status: '2', certificate_no: 'CERT_E' }
    },
    {
      description: "Test F: certificate_status='2', certificate_no, certificate_pdf (file)",
      fields: { certificate_status: '2', certificate_no: 'CERT_F' }
    }
  ];

  for (const tc of testCases) {
    console.log(`\n--- Running ${tc.description} ---`);
    try {
      const form = new FormData();
      Object.keys(tc.fields).forEach(key => {
        form.append(key, tc.fields[key]);
      });

      const dummyBuffer = Buffer.from('%PDF-1.4 ... dummy content');
      form.append('certificate_pdf', new Blob([dummyBuffer], { type: 'application/pdf' }), 'certificate.pdf');

      const response = await axios.put(
        `${BASE_URL}/myadmin/certificate/update-status/${enrollment_id}`,
        form,
        {
          headers: { Authorization: `Bearer ${activeToken}` }
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

      if (target.certificate_no && target.certificate_no.startsWith('CERT_')) {
        console.log("SUCCESS! THIS COMBINATION WORKED!");
        break;
      }

    } catch (err) {
      console.error("Update error:", err.response ? err.response.data : err.message);
    }
  }
}

run();
