/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.token || req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Токен не знайдено' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Невірний токен' });
    }
    req.user = user; // user має містити поле id
    next();
  });
};
