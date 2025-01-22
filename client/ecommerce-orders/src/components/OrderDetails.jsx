import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OrdersContext } from '../OrdersContext/OrdersContext';
import './css/Order.css'; // Import the CSS file

const OrderDetails = () => {
  const { selectedOrder, deleteOrder } = useContext(OrdersContext);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      navigate('/');
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  if (!selectedOrder) {
    return (
      <div className="container mt-4">
        <h1 className="text-center mb-4">Loading...</h1>
        <Link to="/" className="btn btn-secondary">Back to Orders</Link>
      </div>
    );
  }

  const cardStyle = {
    backgroundColor: 'aquamarine',
    color: 'black',
  };


  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Order #{selectedOrder.id} Details</h1>
      <div className="card mb-4" style={cardStyle}>
        <div className="card-body">
          <h5 className="card-title order-id">Order #{selectedOrder.id}</h5>
          <p className="card-subtitle mb-2 order-customer">{selectedOrder.customer}</p>
          <p><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
          <p><strong>Status:</strong> {selectedOrder.status}</p>
          <h6>Items:</h6>
          <ul>
            {selectedOrder.items.map((item, index) => (
              <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
            ))}
          </ul>
          <div className="d-flex justify-content-between mt-4">
            <Link to="/" className="btn btn-secondary">Back to Orders</Link>
            <button 
              onClick={() => handleDelete(selectedOrder.id)} 
              className="btn btn-danger"
            >
              <i className="bi bi-trash"></i> Delete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;