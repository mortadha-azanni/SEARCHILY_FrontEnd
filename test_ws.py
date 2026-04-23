import asyncio
import websockets
import sys
import requests

async def run():
  r = requests.post('http://localhost:8000/auth/login', json={'email': 'admin@searchily.ai', 'password': 'password'})
  if r.status_code != 200: sys.exit('Login failed: ' + r.text)
  token = r.json()['token']
  
  r2 = requests.post('http://localhost:8000/search', json={'query': 'test'}, headers={'Authorization': f'Bearer {token}'})
  task_id = r2.json()['task_id']
  
  async with websockets.connect(f'ws://localhost:8000/ws/status/{task_id}?token={token}') as ws:
      for _ in range(5):
          try:
              print('RECV:', await ws.recv())
          except Exception as e:
              print(e)
              break

asyncio.run(run())
