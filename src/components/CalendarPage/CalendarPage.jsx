import React, { useEffect, useState } from "react";
import styles from "./CalendarPage.module.css";
import Header from "../Header/Header";

const daysOfWeek = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
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

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const startDay = startOfMonth.getDay();

  const daysInMonth = [];
  for (let i = 0; i < startDay; i++) daysInMonth.push(null);
  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    daysInMonth.push(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
    );
  }

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const getTasksForDate = (date) =>
    tasks.filter(
      (task) => new Date(task.deadline).toDateString() === date.toDateString()
    );

  const selectedDayTasks = getTasksForDate(selectedDate);

  return (
    <div>
      <Header />
      <div className={styles.calendarPage}>
        <div className={styles.calendarWrapper}>
          <div className={styles.leftColumn}>
            <div className={styles.calendarSection}>
              <div className={styles.navigation}>
                <button onClick={() => changeMonth(-1)}>◀</button>
                <span>
                  {currentDate.toLocaleString("uk-UA", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button onClick={() => changeMonth(1)}>▶</button>
              </div>

              <div className={styles.grid}>
                {daysOfWeek.map((day) => (
                  <div key={day} className={styles.weekday}>
                    {day}
                  </div>
                ))}
                {daysInMonth.map((day, idx) => {
                  if (!day)
                    return <div key={idx} className={styles.emptyDay}></div>;

                  const dayTasks = getTasksForDate(day);

                  return (
                    <div
                      key={idx}
                      className={`${styles.day} ${
                        day.toDateString() === selectedDate.toDateString()
                          ? styles.selected
                          : ""
                      }`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className={styles.dayNumber}>{day.getDate()}</div>
                      <div className={styles.taskContainer}>
                        {dayTasks.slice(0, 2).map((task) => (
                          <div key={task._id} className={styles.taskItem}>
                            {task.text.length > 15
                              ? task.text.slice(0, 15) + "…"
                              : task.text}
                          </div>
                        ))}
                        {dayTasks.length > 2 && (
                          <div className={styles.moreTasks}>
                            +{dayTasks.length - 2} ще
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
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
      </div>
    </div>
  );
};

export default CalendarPage;
