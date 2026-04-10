export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  status?: 'streaming' | 'done' | 'error';
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  url: string;
  source: string;
};

export type ChatState = {
  messages: Message[];
  products: Product[];
  isLoading: boolean;
  error: string | null;
  updatedAt?: number;
};

export type WsPayload = 
  | { type: 'start'; payload: { message_id: string } }
  | { type: 'chunk'; payload: { message_id: string; content: string } }
  | { type: 'products'; payload: { items: Product[] } }
  | { type: 'end'; payload: { message_id: string } }
  | { type: 'error'; payload: { message: string } };
