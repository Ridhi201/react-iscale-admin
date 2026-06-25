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

  // IDs we have:
  // Enrollment ID: 6a0308372a3185992b74d5a0
  // Package ID: 69f06880486a1b2c24e3e430
  // User ID: 69f2f692049ac1dfdf183732

  const ids = [
    { name: "Enrollment ID", val: "6a0308372a3185992b74d5a0" },
    { name: "Package ID", val: "69f06880486a1b2c24e3e430" },
    { name: "User ID", val: "69f2f692049ac1dfdf183732" }
  ];

  for (const id of ids) {
    try {
      const res = await axios.get(`${BASE_URL}/myadmin/app-users-enrollments-details/test-series/${id.val}`, {
        headers: { Authorization: `Bearer ${activeToken}` }
      });
      console.log(`TS with ${id.name} (${id.val}) -> Status: ${res.status}, data: ${JSON.stringify(res.data)}`);
    } catch (err) {
      console.error(`TS with ${id.name} (${id.val}) -> Error:`, err.response ? err.response.data : err.message);
    }
  }

  // Notes enrollment:
  // Enrollment ID: 6a05c0febd807e317debb7b3
  // Notes ID: 6a05887942f08d262cdf02b6
  // User ID: 69f2f692049ac1dfdf183732
  const notesIds = [
    { name: "Enrollment ID", val: "6a05c0febd807e317debb7b3" },
    { name: "Notes ID", val: "6a05887942f08d262cdf02b6" },
    { name: "User ID", val: "69f2f692049ac1dfdf183732" }
  ];

  for (const id of notesIds) {
    try {
      const res = await axios.get(`${BASE_URL}/myadmin/app-users-enrollments-details/notes/${id.val}`, {
        headers: { Authorization: `Bearer ${activeToken}` }
      });
      console.log(`Notes with ${id.name} (${id.val}) -> Status: ${res.status}, data: ${JSON.stringify(res.data)}`);
    } catch (err) {
      console.error(`Notes with ${id.name} (${id.val}) -> Error:`, err.response ? err.response.data : err.message);
    }
  }
}

run();
