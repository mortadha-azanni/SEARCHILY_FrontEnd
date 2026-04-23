import axios from 'axios';

async function run() {
  const loginRes = await axios.post('http://localhost:8000/auth/login', { email: 'admin@searchily.ai', password: 'password' });
  const token = loginRes.data.token;
  
  const searchRes = await axios.post('http://localhost:8000/search', { query: 'test' }, { headers: { Authorization: 'Bearer ' + token } });
  const taskId = searchRes.data.task_id;
  
  console.log('Task ID:', taskId);
  
  // Poll status endpoint
  for (let i=0; i<5; i++) {
    const statusRes = await axios.get(`http://localhost:8000/search/status/${taskId}`);
    console.log(`POLL ${i}:`, statusRes.data);
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}
run().catch(console.error);
