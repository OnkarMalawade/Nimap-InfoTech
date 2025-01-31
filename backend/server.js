const express = require('express');
const cors = require('cors');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});