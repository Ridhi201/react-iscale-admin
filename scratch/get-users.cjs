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
        console.log("Successfully logged in with password:", password);
        return response.data.token;
      }
    } catch (err) {
      // ignore
    }
  }
  return null;
}

async function getUsers() {
  const token = await getToken();
  if (!token) {
    console.log("Failed to log in.");
    return;
  }
  try {
    const res = await axios.get(`${BASE_URL}/myadmin/app-users/all?page=1&limit=3`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Status:", res.status);
    console.log("Data sample:", JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error("Error:", err.response ? err.response.data : err.message);
  }
}

getUsers();
