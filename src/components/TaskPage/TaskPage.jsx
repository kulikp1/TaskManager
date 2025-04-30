import React, { useState } from "react";
import styles from "./TaskPage.module.css";

const initialData = {
  todo: ["Створити план", "Зібрати команду"],
  inProgress: ["Верстати інтерфейс"],
  done: ["Підключити бекенд"],
};

const TaskPage = () => {
  const [tasks, setTasks] = useState(initialData);
  const [dragged, setDragged] = useState(null);

  const onDragStart = (column, index) => {
    setDragged({ column, index });
  };

  const onDrop = (targetColumn, targetIndex = null) => {
    if (!dragged) return;
    const item = tasks[dragged.column][dragged.index];
    const updatedSource = [...tasks[dragged.column]];
    updatedSource.splice(dragged.index, 1);

    const updatedTarget = [...tasks[targetColumn]];
    if (targetIndex !== null) {
      updatedTarget.splice(targetIndex, 0, item);
    } else {
      updatedTarget.push(item);
    }

    setTasks({
      ...tasks,
      [dragged.column]: updatedSource,
      [targetColumn]: updatedTarget,
    });
    setDragged(null);
  };

  return (
    <div className={styles.taskPage}>
      {Object.entries(tasks).map(([column, items]) => (
        <div
          key={column}
          className={styles.column}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDrop(column)}
        >
          <h3 className={styles.columnTitle}>
            {column === "todo"
              ? "До виконання"
              : column === "inProgress"
              ? "В процесі"
              : "Готово"}
          </h3>
          {items.map((task, index) => (
            <div
              key={index}
              className={styles.task}
              draggable
              onDragStart={() => onDragStart(column, index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(column, index)}
            >
              {task}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskPage;
