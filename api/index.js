import express from 'express';
import cors from 'cors';
import bookRouter from './routes/BookRoutes.js';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/shop', bookRouter);

app.get('/', (req, res) => {
  try {
    res.send('Hello from Express Server');
  } catch (error) {
    console.error('Query error:', error);
    res.send(' Sorry Error');
  }
});

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));
