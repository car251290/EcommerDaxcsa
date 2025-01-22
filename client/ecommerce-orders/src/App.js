import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Orders from './components/Orders';
import OrderDetails from './components/OrderDetails';
import HomeBar from './components/HomeBar';
import { OrdersProvider } from './OrdersContext/OrdersContext'; 

const App = () => {
  return (
    <Router>
      <OrdersProvider>
        <HomeBar />
        <Routes>
          <Route path="/" element={<Orders />} />
          <Route path="/orderDetails" element={<OrderDetails />} />
        </Routes>
      </OrdersProvider>
    </Router>
  );
};

export default App;