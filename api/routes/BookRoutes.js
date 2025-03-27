import express from "express";
import pool from "./PoolConnection.js";

const bookRouter = express.Router();

bookRouter.get("/books", async (req, res) => {
  try {
    const result = await pool.query("SELECT * from books");
    res.json({ rows: result.rows });
    console.log(result.rows.length);
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

bookRouter.get("/getbook", async (req, res) => {
  try {
    var id1 = req.query.id;
    console.log(id1);
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [id1]);
    console.log(result);
    res.json({ rows: result.rows });
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

bookRouter.post("/updateBook", async (req, res) => {
  try {
    var book = req.body;
    console.log(qry);
    const result = await pool.query(
      "UPDATE books SET title = $1, author = $2, price = $3, description = $4 WHERE id = $5",
      [book.title, book.author, book.price, book.description, book.id]
    );
    console.log(result);
    res.json({ ans: 1 });
  } catch (error) {
    console.error("Query error:", error);
    res.json({ ans: 0 });
  }
});

bookRouter.get("/deleteBook", async (req, res) => {
  try {
    var id1 = req.body.id;
    console.log(id1);
    const result = await pool.query(
      "DELETE FROM books WHERE id = $1",
      [id1]
    );
    console.log(result);
    res.json({ ans: 1 });
  } catch (error) {
    console.error("Query error:", error);
    res.json({ ans: 0 });
  }
});

bookRouter.post("/addBook", async (req, res) => {
  try {
    const { title, author, price, category_id} = req.body;
    console.log(req.body);
    const result = await pool.query(
      "INSERT INTO books (title, author, price, category_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, author, price, category_id]
    );
    res.json({ rows: result.rows });
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

export default bookRouter;
