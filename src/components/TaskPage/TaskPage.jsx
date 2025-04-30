import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import styles from "./TaskPage.module.css";

const initialColumns = {
  todo: { title: "To Do", tasks: [] },
  inProgress: { title: "In Progress", tasks: [] },
  done: { title: "Done", tasks: [] },
};

const TaskPage = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [newTaskText, setNewTaskText] = useState("");
  const [draggingTask, setDraggingTask] = useState(null);

  const handleAddTask = () => {
    if (!newTaskText.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      text: newTaskText,
    };

    setColumns((prev) => ({
      ...prev,
      todo: { ...prev.todo, tasks: [...prev.todo.tasks, newTask] },
    }));
    setNewTaskText("");
  };

  const handleDragStart = (task, sourceColumn) => {
    setDraggingTask({ task, sourceColumn });
  };

  const handleDrop = (targetColumn) => {
    if (!draggingTask) return;

    const { task, sourceColumn } = draggingTask;

    if (sourceColumn === targetColumn) return;

    setColumns((prev) => {
      const sourceTasks = prev[sourceColumn].tasks.filter(
        (t) => t.id !== task.id
      );
      const targetTasks = [...prev[targetColumn].tasks, task];

      return {
        ...prev,
        [sourceColumn]: { ...prev[sourceColumn], tasks: sourceTasks },
        [targetColumn]: { ...prev[targetColumn], tasks: targetTasks },
      };
    });

    setDraggingTask(null);
  };

  const handleDelete = (columnKey, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [columnKey]: {
        ...prev[columnKey],
        tasks: prev[columnKey].tasks.filter((t) => t.id !== taskId),
      },
    }));
  };

  return (
    <div className={styles.taskPage}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>Task Manager</div>

        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Enter new task"
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <button onClick={handleAddTask} className={styles.addButton}>
            <Plus size={18} /> Add
          </button>
        </div>

        <div className={styles.headerRight}>
          <span>User</span>
          <div className={styles.avatarPlaceholder}>U</div>
        </div>
      </header>

      <div className={styles.columns}>
        {Object.entries(columns).map(([key, column]) => (
          <div
            key={key}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(key)}
            className={styles.column}
          >
            <h2 className={styles.columnTitle}>{column.title}</h2>
            <div className={styles.taskList}>
              {column.tasks.map((task) => (
                <motion.div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task, key)}
                  className={styles.task}
                  whileHover={{ scale: 1.02 }}
                >
                  <span>{task.text}</span>
                  <button onClick={() => handleDelete(key, task.id)}>
                    <Trash2 className={styles.deleteIcon} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
