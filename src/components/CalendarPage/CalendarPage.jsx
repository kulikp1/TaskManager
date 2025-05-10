import React, { useEffect, useState } from "react";
import styles from "./CalendarPage.module.css";

const CalendarPage = () => {
  const [tasksByDate, setTasksByDate] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Не вдалося отримати задачі");

        const tasks = await response.json();
        const grouped = tasks.reduce((acc, task) => {
          const date = task.dueDate?.split("T")[0] || "Без дати";
          if (!acc[date]) acc[date] = [];
          acc[date].push(task);
          return acc;
        }, {});
        setTasksByDate(grouped);
      } catch (err) {
        console.error("Помилка:", err.message);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className={styles.calendarContainer}>
      <h1>Календар задач</h1>
      <div className={styles.calendarGrid}>
        {Object.keys(tasksByDate)
          .sort()
          .map((date) => (
            <div key={date} className={styles.dayColumn}>
              <h3>{date}</h3>
              <ul>
                {tasksByDate[date].map((task) => (
                  <li key={task.id}>{task.title}</li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CalendarPage;
