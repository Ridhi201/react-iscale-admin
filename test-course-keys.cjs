const axios = require('axios');

const BASE_URL = 'https://api.theiscale.com';
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
      // ignore
    }
  }
  return null;
}

async function run() {
  const token = await getToken();
  if (!token) {
    console.log("No token");
    return;
  }
  
  try {
    const res = await axios.get(`${BASE_URL}/myadmin/course/all-courses?limit=10`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const courses = res.data.data;
    if (courses && courses.length > 0) {
      const validCourse = courses.find(c => c._id) || courses[0];
      console.log("Fetching details for course:", validCourse._id, validCourse.title);
      const detailRes = await axios.get(`${BASE_URL}/myadmin/course/course/${validCourse._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Course detail keys:", Object.keys(detailRes.data.data));
      console.log("Course detail content:", JSON.stringify(detailRes.data.data, null, 2));
    } else {
      console.log("No courses found.");
    }
  } catch (err) {
    console.log("Error:", err.response ? err.response.data : err.message);
  }
}

run();
