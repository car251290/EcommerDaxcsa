const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ordersRouter = require('./routes/orders');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/orders', ordersRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));