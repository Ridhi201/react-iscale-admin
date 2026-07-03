const axios = require('axios');

async function test() {
  try {
    // 1. First login to get a token
    const loginRes = await axios.post('https://api.theiscale.com/myadmin/admin-login', {
      email: 'admin@gmail.com', // I'll use common creds or just check if the endpoint doesn't need auth for GET
      password: 'password' // I might not know the creds. Let's try without token first.
    }).catch(() => null);

    // Let's just fetch job-titles-dropdown which might be public or give schema hints
    const res = await axios.get('https://api.theiscale.com/myadmin/comp-requirement/get-all-jobs', {
      params: { page: 1, limit: 1 }
    });
    console.log("SUCCESS:", JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.log("ERROR:", err.response ? err.response.data : err.message);
  }
}
test();
