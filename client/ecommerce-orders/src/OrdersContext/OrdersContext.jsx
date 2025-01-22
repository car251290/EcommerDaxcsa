import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/orders')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  // Fetch order details by ID
  const fetchOrderDetails = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/orders/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedOrder(data);
        navigate(`/orderDetails`);
      } else {
        console.error("Failed to fetch order:", response.status);
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      setSelectedOrder(null);
    }
  }, [navigate]);

  // Delete order by ID
  const deleteOrder = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/orders/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
        console.log('Order deleted successfully');
      } else {
        console.error("Failed to delete order:", response.status);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  }, []);

  return (
    <OrdersContext.Provider value={{ orders, selectedOrder, fetchOrderDetails, deleteOrder, setOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};