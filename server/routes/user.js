import express from 'express';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

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

router.post('/avatar', verifyToken, upload.single('avatar'), async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!req.file) {
      return res.status(400).json({ message: 'Файл не передано' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'avatars',
        resource_type: 'image',
        public_id: `user_${userId}_${Date.now()}`,
        overwrite: true,
      },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary error:', error);
          return res.status(500).json({ message: 'Помилка завантаження аватара' });
        }

        user.avatarUrl = result.secure_url;
        await user.save();

        res.json({ message: 'Аватар оновлено', avatarUrl: user.avatarUrl });
      }
    );

    stream.end(req.file.buffer);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('username email avatarUrl');
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});
});

export default router;
