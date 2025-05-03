/* eslint-disable no-unused-vars */
import express from "express";
import Task from "../models/Task.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Отримати всі таски користувача
router.get("/", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Помилка при отриманні задач" });
  }
});

// Додати нову таску
router.post("/add", verifyToken, async (req, res) => {
  try {
    const { text, deadline, status } = req.body;
    console.log('REQUEST BODY:', req.body);
    console.log('USER:', req.user);

    if (!text) {
      return res.status(400).json({ message: "Поле 'text' є обов'язковим" });
    }

    const newTask = new Task({
      text,
      deadline,
      status,
      user: req.user.userId
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('SERVER ERROR:', err);
    res.status(500).json({ message: "Помилка при створенні задачі" });
  }
});

// Оновити таску
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Задачу не знайдено" });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Помилка при оновленні задачі" });
  }
});

// Видалити таску
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Задачу не знайдено" });
    }

    res.status(200).json({ message: "Задачу видалено" });
  } catch (err) {
    res.status(500).json({ message: "Помилка при видаленні задачі" });
  }
});

export default router;
