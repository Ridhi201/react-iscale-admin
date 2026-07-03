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

  const id = '6a366498830e919c39b26ae1';
  try {
    const res = await axios.get(`${BASE_URL}/myadmin/app-users/single/${id}`, {
      headers: { Authorization: `Bearer ${activeToken}` }
    });
    console.log("Single User Status:", res.status);
    console.log("Single User Data:", JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error("Single User Error:", err.response ? err.response.data : err.message);
  }
}

run();
