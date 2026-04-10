🧠 Hook System Overview

You need 3 core hooks:

useChat           → orchestrator (main brain)
useChatSocket     → websocket handling
useMessages       → message state management

Optional but useful:

useProducts       → extracted from AI response
useHistory        → persistence (localStorage)
🧩 1. Data Model (LOCK THIS FIRST)

Everything depends on this.

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  status?: 'streaming' | 'done' | 'error'
}

type Product = {
  id: string
  title: string
  description: string
  price: string
  image: string
  url: string
  source: string
}

type ChatState = {
  messages: Message[]
  products: Product[]
  isLoading: boolean
  error: string | null
}
🔌 2. useChatSocket (LOW-LEVEL)
Responsibility:
Open WebSocket
Send query
Receive streaming data
Emit structured events
API Design
const {
  connect,
  disconnect,
  sendMessage,
  onMessage,
  onEnd,
  onError
} = useChatSocket()
Behavior
On send:
open socket (if not open)
send query
On receive:
partial chunks → stream text
final payload → includes products

🧠 Hook System Overview

You need 3 core hooks:

useChat           → orchestrator (main brain)
useChatSocket     → websocket handling
useMessages       → message state management

Optional but useful:

useProducts       → extracted from AI response
useHistory        → persistence (localStorage)
🧩 1. Data Model (LOCK THIS FIRST)

Everything depends on this.

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  status?: 'streaming' | 'done' | 'error'
}

type Product = {
  id: string
  title: string
  description: string
  price: string
  image: string
  url: string
  source: string
}

type ChatState = {
  messages: Message[]
  products: Product[]
  isLoading: boolean
  error: string | null
}
🔌 2. useChatSocket (LOW-LEVEL)
Responsibility:
Open WebSocket
Send query
Receive streaming data
Emit structured events
API Design
const {
  connect,
  disconnect,
  sendMessage,
  onMessage,
  onEnd,
  onError
} = useChatSocket()
Behavior
On send:
open socket (if not open)
send query
On receive:
partial chunks → stream text
final payload → includes products

🧠 Hook System Overview

You need 3 core hooks:

useChat           → orchestrator (main brain)
useChatSocket     → websocket handling
useMessages       → message state management

Optional but useful:

useProducts       → extracted from AI response
useHistory        → persistence (localStorage)
🧩 1. Data Model (LOCK THIS FIRST)

Everything depends on this.

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  status?: 'streaming' | 'done' | 'error'
}

type Product = {
  id: string
  title: string
  description: string
  price: string
  image: string
  url: string
  source: string
}

type ChatState = {
  messages: Message[]
  products: Product[]
  isLoading: boolean
  error: string | null
}
🔌 2. useChatSocket (LOW-LEVEL)
Responsibility:
Open WebSocket
Send query
Receive streaming data
Emit structured events
API Design
const {
  connect,
  disconnect,
  sendMessage,
  onMessage,
  onEnd,
  onError
} = useChatSocket()
Behavior
On send:
open socket (if not open)
send query
On receive:
partial chunks → stream text
final payload → includes products

🧠 Hook System Overview

You need 3 core hooks:

useChat           → orchestrator (main brain)
useChatSocket     → websocket handling
useMessages       → message state management

Optional but useful:

useProducts       → extracted from AI response
useHistory        → persistence (localStorage)
🧩 1. Data Model (LOCK THIS FIRST)

Everything depends on this.

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  status?: 'streaming' | 'done' | 'error'
}

type Product = {
  id: string
  title: string
  description: string
  price: string
  image: string
  url: string
  source: string
}

type ChatState = {
  messages: Message[]
  products: Product[]
  isLoading: boolean
  error: string | null
}
🔌 2. useChatSocket (LOW-LEVEL)
Responsibility:
Open WebSocket
Send query
Receive streaming data
Emit structured events
API Design
const {
  connect,
  disconnect,
  sendMessage,
  onMessage,
  onEnd,
  onError
} = useChatSocket()
Behavior
On send:
open socket (if not open)
send query
On receive:
partial chunks → stream text
final payload → includes products