const express = require('express');
const router = express.Router();
let orders = require('../data/orders.json'); // Use let to allow modification

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// Get a specific order by ID
router.get('/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find(o => o.id === orderId);
  
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// Update order by ID (PUT)
router.put('/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const updatedOrder = req.body;

  // Find the order by ID and update it
  const index = orders.findIndex(o => o.id === orderId);
  
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updatedOrder }; 
    res.json(orders[index]);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// Delete order by ID (DELETE)
router.delete('/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const index = orders.findIndex(o => o.id === orderId);

  if (index !== -1) {
    orders = orders.filter(o => o.id !== orderId);
    res.status(200).json({ message: 'Order deleted successfully' });
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

module.exports = router;