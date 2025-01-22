import React, { useContext } from 'react';
import { OrdersContext } from '../OrdersContext/OrdersContext';
import '../components/css/Order.css'; 

const Orders = () => {
  const { orders, fetchOrderDetails } = useContext(OrdersContext);

  if (!orders || orders.length === 0) {
    return <div className="container mt-4">No orders available</div>;
  }

  const cardStyle = {
    backgroundColor: 'aquamarine',
    color: 'black',
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Customer Orders</h1>
      <div className="row">
        {orders.map(order => (
          <div key={order.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card" style={cardStyle}>
              <div className="card-body">
                <h5 className="card-title">Order #{order.id}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{order.customer}</h6>
                <p className="card-text">
                  <strong>Total:</strong> ${order.total.toFixed(2)} <br />
                  <strong>Status:</strong> {order.status}
                </p>
                <button 
                  onClick={() => fetchOrderDetails(order.id)} 
                  className="btn btn-primary"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;