import express from 'express';
import pool from './PoolConnection.js';

const bookRouter = express.Router();

bookRouter.get('/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * from books');
    res.json({ rows: result.rows });
    console.log(result.rows.length);
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

bookRouter.get('/getbook', async (req, res) => {
  try {
    var id1 = req.query.id;
    console.log(id1);
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id1]);
    console.log(result);
    res.json({ rows: result.rows });
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

bookRouter.post('/addbook', async (req, res) => {
  try {
    const { title, author, price, description } = req.body;
    console.log(req.body);
    const result = await pool.query(
      'INSERT INTO books (title, author, price, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, author, price, description]
    );
    res.json({ rows: result.rows });
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

export default bookRouter;