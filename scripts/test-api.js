import axios from 'axios';

async function testEndpoints() {
  const baseUrl = 'https://api.theiscale.com';
  const endpoints = [
    '/myadmin/category/get-category',
    '/myadmin/category',
    '/myadmin/categories',
    '/myadmin/get-category',
    '/myadmin/get-categories',
    '/myadmin/category/get-all',
    '/myadmin/category/all',
    '/api/myadmin/category/get-category',
    '/api/category/get-category',
    '/category/get-category',
    '/api/categories',
    '/categories',
    '/category',
    '/admin/category/get-category'
  ];

  console.log("Testing endpoints...");
  for (const ep of endpoints) {
    try {
      const res = await axios.get(baseUrl + ep);
      console.log(`[SUCCESS] GET ${baseUrl + ep} -> Status: ${res.status}`);
    } catch (err) {
      console.log(`[ERROR] GET ${baseUrl + ep} -> Status: ${err.response ? err.response.status : err.message}`);
    }
  }
}

testEndpoints();
