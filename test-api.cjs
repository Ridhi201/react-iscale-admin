const axios = require('axios');

async function test() {
  try {
    const response = await axios.post('https://api.theiscale.com/myadmin/live-class/add', {
      title: "Test Class Team Member",
      class_date: "2026-05-26",
      duration: 60,
      start_time: "10:00 AM",
      meeting_link: "https://meet.google.com/abc",
      batch_id: "6a0b0678727cb034794e9a6e",
      teacher_id: "6a0c39ed0db957f72cd43585" // Shoaib Sir from team members
    }, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjE4ZDlmYzkzZDM0NjY4ZmQ0YzgxZCIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsInJvbGUiOjEsImlhdCI6MTc4MDY1NjM1NCwiZXhwIjoxNzgwNzQyNzU0fQ.RZhAyFUnoj6yk6O85tRLWC_De5eBLfPxoS7VwIw5uAM"
      }
    });
    console.log("Success:", response.data);
  } catch (err) {
    console.log("Error:", err.response ? err.response.data : err.message);
  }
}

test();
