import React, { useState, useEffect } from 'react';

type OrderStatus = 'Pending Prep' | 'Ready for Livreur' | 'With Livreur';

interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
}

const DEFAULT_ORDERS: Order[] = [
  { id: '#ORD-9021', date: 'Today, 10:45 AM', total: 129.99, status: 'Pending Prep' },
  { id: '#ORD-9018', date: 'Yesterday', total: 89.99, status: 'With Livreur' },
];

export default function VendorOrders() {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('searchily_vendor_orders');
    return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('searchily_vendor_orders', JSON.stringify(orders));
  }, [orders]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const markAsReady = (id: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: 'Ready for Livreur' } : order
    ));
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch(status) {
      case 'Pending Prep':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 text-[10px] uppercase tracking-wider">{status}</span>;
      case 'Ready for Livreur':
        return <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-[10px] uppercase tracking-wider">{status}</span>;
      case 'With Livreur':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] uppercase tracking-wider">{status}</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-[10px] uppercase tracking-wider">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-normal uppercase tracking-tight text-mistral-black dark:text-warm-ivory">Orders</h1>
          <p className="text-mistral-black/60 dark:text-warm-ivory/60 mt-1">View and process customer orders.</p>
        </div>
      </div>

      {selectedOrder && (
        <div className="bg-cream dark:bg-mistral-black p-4 border border-mistral-black/10 dark:border-warm-ivory/10 shadow-mistral transition-colors flex justify-between items-start mb-6">
          <div>
            <h3 className="text-[14px] font-bold uppercase tracking-widest mb-2">Order Details: {selectedOrder.id}</h3>
            <p className="text-[14px] text-mistral-black/60 dark:text-warm-ivory/60">Date: {selectedOrder.date}</p>
            <p className="text-[14px] text-mistral-black/60 dark:text-warm-ivory/60">Total: ${selectedOrder.total.toFixed(2)}</p>
            <p className="text-[14px] text-mistral-black/60 dark:text-warm-ivory/60 mt-2">Mock details for order contents would appear here.</p>
          </div>
          <button onClick={() => setSelectedOrder(null)} className="text-mistral-black/50 hover:text-mistral-black transition-colors">✕</button>
        </div>
      )}

      <div className="bg-white dark:bg-mistral-black border border-mistral-black/10 dark:border-warm-ivory/10 shadow-mistral dark:shadow-none overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-mistral-black/10 dark:border-warm-ivory/10">
              <th className="p-4 text-[12px] font-normal uppercase tracking-widest text-mistral-black/60 dark:text-warm-ivory/60">Order ID</th>
              <th className="p-4 text-[12px] font-normal uppercase tracking-widest text-mistral-black/60 dark:text-warm-ivory/60">Date</th>
              <th className="p-4 text-[12px] font-normal uppercase tracking-widest text-mistral-black/60 dark:text-warm-ivory/60">Total</th>
              <th className="p-4 text-[12px] font-normal uppercase tracking-widest text-mistral-black/60 dark:text-warm-ivory/60">Status</th>
              <th className="p-4 text-[12px] font-normal uppercase tracking-widest text-mistral-black/60 dark:text-warm-ivory/60 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-mistral-black/5 dark:border-warm-ivory/5 hover:bg-mistral-black/5 dark:hover:bg-warm-ivory/5 transition-colors">
                <td className="p-4 text-[14px]">{order.id}</td>
                <td className="p-4 text-[14px]">{order.date}</td>
                <td className="p-4 text-[14px]">${order.total.toFixed(2)}</td>
                <td className="p-4 text-[14px]">{getStatusBadge(order.status)}</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="text-[12px] uppercase text-mistral-black/50 dark:text-warm-ivory/50 hover:text-mistral-orange mr-4 transition-colors"
                  >
                    View Details
                  </button>
                  {order.status === 'Pending Prep' && (
                    <button 
                      onClick={() => markAsReady(order.id)}
                      className="text-[12px] uppercase text-mistral-black bg-mistral-orange px-3 py-1 hover:bg-mistral-orange/80 transition-colors"
                    >
                      Mark Ready
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
