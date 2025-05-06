import express from 'express';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js'; // Підключаємо Cloudinary

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Оновлення username
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

// ✅ Оновлення аватара через Cloudinary
router.put('/avatar', verifyToken, upload.single('avatar'), async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    // Завантаження файлу в Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'avatars', resource_type: 'image' },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Помилка завантаження аватара' });
        }

        user.avatarUrl = result.secure_url;
        await user.save();

        res.json({ message: 'Аватар оновлено', avatarUrl: user.avatarUrl });
      }
    );

    stream.end(req.file.buffer); // Передаємо файл у Cloudinary
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

export default router;
