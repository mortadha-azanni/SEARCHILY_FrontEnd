const axios = require('axios');
const WebSocket = require('ws');

async function run() {
  const loginRes = await axios.post('http://localhost:8000/auth/login', { email: 'admin@searchily.ai', password: 'password' });
  const token = loginRes.data.token;
  
  const searchRes = await axios.post('http://localhost:8000/search', { query: 'laptop' }, { headers: { Authorization: 'Bearer ' + token } });
  const taskId = searchRes.data.task_id;
  console.log("Task ID:", taskId);
  
  const ws = new WebSocket(`ws://localhost:8000/ws/status/${taskId}?token=${token}`);
  ws.on('message', (data) => console.log('RECV:', data.toString()));
  ws.on('close', () => console.log('CLOSED'));
  ws.on('error', console.error);
}
run();
