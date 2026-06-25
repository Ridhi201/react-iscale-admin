const axios = require('axios');

const BASE_URL = 'https://iscale-backend.onrender.com';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjE4ZDlmYzkzZDM0NjY4ZmQ0YzgxZCIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsInJvbGUiOjEsImlhdCI6MTc4MDY1NjM1NCwiZXhwIjoxNzgwNzQyNzU0fQ.RZhAyFUnoj6yk6O85tRLWC_De5eBLfPxoS7VwIw5uAM';
const candidateId = '6a366498830e919c39b26ae1'; // Rishika

async function checkDetails() {
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

  const urls = [
    `/myadmin/app-users-enrollments-details/course/all/${candidateId}?limit=100`,
    `/myadmin/app-users-enrollments-details/test-series/all/${candidateId}?limit=100`,
    `/myadmin/app-users-enrollments-details/notes/all/${candidateId}?limit=100`,
    `/myadmin/app-users-wishlist-details/course/all/${candidateId}?limit=100`,
    `/myadmin/app-users-wishlist-details/test/series/all/${candidateId}?limit=100`,
    `/myadmin/app-users-wishlist-details/notes/all/${candidateId}?limit=100`
  ];

  for (const url of urls) {
    try {
      const res = await axios.get(`${BASE_URL}${url}`, {
        headers: { Authorization: `Bearer ${activeToken}` }
      });
      console.log(`URL: ${url} -> Status: ${res.status}, Length: ${res.data?.data?.length}`);
    } catch (err) {
      console.error(`URL: ${url} -> Error:`, err.response ? err.response.data : err.message);
    }
  }
}

checkDetails();
