import asyncio

import sys
import requests

async def run():
  r = requests.post('http://localhost:8000/auth/login', json={'email': 'admin@searchily.ai', 'password': 'password'})
  token = r.json()['token']
  r2 = requests.post('http://localhost:8000/search', json={'query': 'test'}, headers={'Authorization': f'Bearer {token}'})
  task_id = r2.json()['task_id']
  print('Task id is:', task_id)
  r3 = requests.get(f'http://localhost:8000/search/status/{task_id}', headers={'Authorization': f'Bearer {token}'})
  print(r3.status_code)
  print(r3.text)

asyncio.run(run())
