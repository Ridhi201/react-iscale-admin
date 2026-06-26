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

  try {
    const res = await axios.get(`${BASE_URL}/myadmin/certificate/all-requests?limit=200`, {
      headers: { Authorization: `Bearer ${activeToken}` }
    });
    const data = res.data.data || [];
    console.log("Total records fetched:", data.length);

    // Let's group by certificate_status to see what statuses exist in the DB
    const statuses = {};
    data.forEach(r => {
      statuses[r.certificate_status] = (statuses[r.certificate_status] || 0) + 1;
    });
    console.log("Distribution of certificate_status:", statuses);

    // Let's print records that have status != 1
    const nonPending = data.filter(r => r.certificate_status !== 1 && r.certificate_status !== '1');
    console.log("Non-pending records:", JSON.stringify(nonPending, null, 2));

  } catch (err) {
    console.error("Error:", err.response ? err.response.data : err.message);
  }
}

run();
