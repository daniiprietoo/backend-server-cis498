import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;
const PORT = process.env.PORT || 3000;

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon DB
  },
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use(cors());

app.get("/", async (req, res) => {
  try {
    res.send("Hello World");
  } catch (error) {
    console.error("Query error:", error);
    res.send("Error");
  }
});

app.get("/books", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.get("/getbook", async (req, res) => {
  try {
    var id = req.query.id;
    console.log("ID:", id);
    const result = await pool.query ("SELECT * FROM books WHERE id=", id);
    console.log(result);
    res.json({ rows: result.rows });
  } catch (error) {
    console.error("Query error:", error);
    res.json({ rows: [] });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
