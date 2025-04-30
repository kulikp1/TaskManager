/* eslint-disable no-undef */
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // <--- Додано

import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

// ✅ Дозволити CORS для фронтенду на 5173 порту
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB підключено'))
  .catch(err => console.error('Помилка MongoDB:', err));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущено на порті ${PORT}`));
