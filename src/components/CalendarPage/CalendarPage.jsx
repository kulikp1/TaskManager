import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./CalendarPage.module.css";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

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

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Помилка при завантаженні задач:", error.message);
      }
    };

    fetchTasks();
  }, []);

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const dayTasks = tasks.filter((task) => {
      const taskDate = new Date(task.deadline).toDateString();
      return taskDate === date.toDateString();
    });

    return (
      <div className={styles.taskContainer}>
        {dayTasks.slice(0, 2).map((task) => (
          <div key={task._id} className={styles.taskItem}>
            • {task.text.length > 15 ? task.text.slice(0, 15) + "…" : task.text}
          </div>
        ))}
        {dayTasks.length > 2 && (
          <div className={styles.moreTasks}>+{dayTasks.length - 2} ще</div>
        )}
      </div>
    );
  };

  const selectedDayTasks = tasks.filter(
    (task) =>
      new Date(task.deadline).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className={styles.calendarPage}>
      <div className={styles.calendarWrapper}>
        <div className={styles.calendarSection}>
          <h2>Календар</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={tileContent}
            locale="uk-UA"
          />
        </div>
        <div className={styles.taskSection}>
          <h2>Задачі на {selectedDate.toLocaleDateString()}</h2>
          {selectedDayTasks.length === 0 ? (
            <p>Немає задач</p>
          ) : (
            <ul>
              {selectedDayTasks.map((task) => (
                <li key={task._id}>
                  {task.text} ({task.status})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
