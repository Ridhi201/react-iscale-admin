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

  // Fetch users
  const usersRes = await axios.get(`${BASE_URL}/myadmin/app-users/all?page=1&limit=50`, {
    headers: { Authorization: `Bearer ${activeToken}` }
  });
  const users = usersRes.data.data;

  for (const user of users) {
    const candidateId = user._id;

    // Test Series enrollments
    const enrollTRes = await axios.get(`${BASE_URL}/myadmin/app-users-enrollments-details/test-series/all/${candidateId}?limit=100`, {
      headers: { Authorization: `Bearer ${activeToken}` }
    });
    if (enrollTRes.data?.data?.length > 0) {
      console.log(`TS Enrollments for user ${user.c_display_name}:`, JSON.stringify(enrollTRes.data.data, null, 2));
    }

    // Notes enrollments
    const enrollNRes = await axios.get(`${BASE_URL}/myadmin/app-users-enrollments-details/notes/all/${candidateId}?limit=100`, {
      headers: { Authorization: `Bearer ${activeToken}` }
    });
    if (enrollNRes.data?.data?.length > 0) {
      console.log(`Notes Enrollments for user ${user.c_display_name}:`, JSON.stringify(enrollNRes.data.data, null, 2));
    }

    // Test Series wishlists
    const wishTRes = await axios.get(`${BASE_URL}/myadmin/app-users-wishlist-details/test/series/all/${candidateId}?limit=100`, {
      headers: { Authorization: `Bearer ${activeToken}` }
    });
    if (wishTRes.data?.data?.length > 0) {
      console.log(`TS Wishlist for user ${user.c_display_name}:`, JSON.stringify(wishTRes.data.data, null, 2));
    }

    // Notes wishlists
    const wishNRes = await axios.get(`${BASE_URL}/myadmin/app-users-wishlist-details/notes/all/${candidateId}?limit=100`, {
      headers: { Authorization: `Bearer ${activeToken}` }
    });
    if (wishNRes.data?.data?.length > 0) {
      console.log(`Notes Wishlist for user ${user.c_display_name}:`, JSON.stringify(wishNRes.data.data, null, 2));
    }
  }
}

run();
