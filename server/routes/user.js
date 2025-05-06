import express from 'express';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js'; 

const router = express.Router();

router.put('/username', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId; 

    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: 'Ім’я користувача обов’язкове' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    user.username = username;
    await user.save();

    res.json({ message: 'Ім’я користувача оновлено', username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

export default router;
