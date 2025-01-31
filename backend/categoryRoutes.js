const express = require('express');
const router = express.Router();
const pool = require('./db');

// CRUD operations for categories
// Create category
router.post('/', async (req, res) => {
    try {
      const { name } = req.body;
      const newCategory = await pool.query(
        "INSERT INTO categories (name) VALUES($1) RETURNING *",
        [name]
      );
      res.json(newCategory.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
  
  // Get all categories
  router.get('/', async (req, res) => {
    try {
      const allCategories = await pool.query("SELECT * FROM categories");
      res.json(allCategories.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  
  // Update category
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updateCategory = await pool.query(
        "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
        [name, id]
      );
      res.json(updateCategory.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  
  // Delete category
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM categories WHERE id = $1", [id]);
      res.json("Category was deleted!");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

module.exports = router;