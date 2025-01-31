const express = require('express');
const router = express.Router();
const pool = require('./db');

// CRUD operations for products
// Create product
router.post('/', async (req, res) => {
  try {
    const { name, category_id } = req.body;
    const newProduct = await pool.query(
      "INSERT INTO products (name, category_id) VALUES($1, $2) RETURNING *",
      [name, category_id]
    );
    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get all products with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const products = await pool.query(
      `SELECT p.id AS "ProductId", p.name AS "ProductName", 
              c.id AS "CategoryId", c.name AS "CategoryName"
       FROM products p
       JOIN categories c ON p.category_id = c.id
       ORDER BY p.id
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const totalCount = await pool.query('SELECT COUNT(*) FROM products');

    res.json({
      products: products.rows,
      totalCount: parseInt(totalCount.rows[0].count),
      currentPage: page,
      totalPages: Math.ceil(parseInt(totalCount.rows[0].count) / limit)
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category_id } = req.body;
    const updateProduct = await pool.query(
      "UPDATE products SET name = $1, category_id = $2 WHERE id = $3 RETURNING *",
      [name, category_id, id]
    );
    res.json(updateProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.json("Product was deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;