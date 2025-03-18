import express from 'express';

const userRouter = express.Router();
import pool from './PoolConnection.js';

userRouter.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * from users');
    res.json({ rows: result.rows });
    console.log(result.rows.length);
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});
