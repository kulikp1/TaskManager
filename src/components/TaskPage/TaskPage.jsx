/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Pencil } from "lucide-react";
import styles from "./TaskPage.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialColumns = {
  todo: { title: "To Do", tasks: [] },
  inProgress: { title: "In Progress", tasks: [] },
  done: { title: "Done", tasks: [] },
};

const TaskPage = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [draggingTask, setDraggingTask] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedDeadline, setEditedDeadline] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");

  const handleAddTask = () => {
    if (!newTaskText.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      text: newTaskText,
      createdAt: new Date().toISOString(),
      deadline: newTaskDeadline || "",
    };

    setColumns((prev) => ({
      ...prev,
      todo: { ...prev.todo, tasks: [...prev.todo.tasks, newTask] },
    }));

    setNewTaskText("");
    setNewTaskDeadline("");
    setShowAddModal(false);
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

  const confirmAndDelete = () => {
    const { columnKey, taskId } = confirmDelete;

    setColumns((prev) => ({
      ...prev,
      [columnKey]: {
        ...prev[columnKey],
        tasks: prev[columnKey].tasks.filter((t) => t.id !== taskId),
      },
    }));

    setConfirmDelete(null);
  };

  const handleEdit = (task, columnKey) => {
    setEditingTask({ taskId: task.id, columnKey });
    setEditedText(task.text);
    setEditedDeadline(task.deadline || "");
  };

  const saveEdit = () => {
    if (!editingTask) return;

    const { columnKey, taskId } = editingTask;

    setColumns((prev) => ({
      ...prev,
      [columnKey]: {
        ...prev[columnKey],
        tasks: prev[columnKey].tasks.map((task) =>
          task.id === taskId
            ? { ...task, text: editedText, deadline: editedDeadline }
            : task
        ),
      },
    }));

    setEditingTask(null);
  };

  const getDeadlineStatus = (deadline) => {
    if (!deadline) return "normal";

    const today = new Date();
    const date = new Date(deadline);
    const diff = date - today;

    if (diff < -86400000) return "overdue";
    if (diff < 86400000 && date.getDate() === today.getDate())
      return "dueToday";
    return "upcoming";
  };

  return (
    <div className={styles.taskPage}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>Task Manager</div>

        <div className={styles.inputContainer}>
          <button
            onClick={() => setShowAddModal(true)}
            className={styles.addButton}
          >
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
              {column.tasks.map((task) => {
                const isEditing =
                  editingTask?.taskId === task.id &&
                  editingTask?.columnKey === key;
                const deadlineStatus = getDeadlineStatus(task.deadline);

                return (
                  <motion.div
                    key={task.id}
                    draggable={!isEditing}
                    onDragStart={() => handleDragStart(task, key)}
                    className={`${styles.task} ${styles[deadlineStatus]}`}
                    whileHover={{ scale: 1.02 }}
                  >
                    {isEditing ? (
                      <>
                        <input
                          className={styles.editInput}
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                        />
                        <input
                          type="date"
                          className={styles.dateInput}
                          value={editedDeadline}
                          onChange={(e) => setEditedDeadline(e.target.value)}
                        />
                        <button onClick={saveEdit}>✅</button>
                      </>
                    ) : (
                      <>
                        <div>
                          <div className={styles.taskText}>{task.text}</div>
                          <div className={styles.taskMeta}>
                            <small>
                              Створено:{" "}
                              {new Date(task.createdAt).toLocaleString()}
                            </small>
                            {task.deadline && (
                              <small>
                                Дедлайн:{" "}
                                {new Date(task.deadline).toLocaleDateString()}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className={styles.taskActions}>
                          <button onClick={() => handleEdit(task, key)}>
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() =>
                              setConfirmDelete({
                                columnKey: key,
                                taskId: task.id,
                              })
                            }
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Модальне вікно додавання задачі */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3>Нова задача</h3>
              <input
                type="text"
                placeholder="Назва задачі"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className={styles.input}
              />
              <DatePicker
                selected={newTaskDeadline ? new Date(newTaskDeadline) : null}
                onChange={(date) =>
                  setNewTaskDeadline(date?.toISOString() || "")
                }
                placeholderText="Оберіть дедлайн"
                className={styles.datePickerInput}
                dateFormat="dd.MM.yyyy"
                minDate={new Date()}
              />

              <div className={styles.modalButtons}>
                <button
                  onClick={handleAddTask}
                  className={styles.confirmButton}
                >
                  Додати
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className={styles.cancelButton}
                >
                  Скасувати
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модалка підтвердження видалення */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <p>Ви впевнені, що хочете видалити цю задачу?</p>
              <div className={styles.modalButtons}>
                <button
                  onClick={confirmAndDelete}
                  className={styles.confirmButton}
                >
                  Так
                </button>
                <button
                  onClick={() => setConfirmDelete(null)}
                  className={styles.cancelButton}
                >
                  Скасувати
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskPage;
