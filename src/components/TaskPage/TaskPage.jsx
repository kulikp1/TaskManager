/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Pencil } from "lucide-react";
import styles from "./TaskPage.module.css";
import AddTaskModal from "../Modals/AddTaskModal/AddTaskModal";
import DeleteConfirmModal from "../Modals/DeleteConfirmModal/DeleteConfirmModal";

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
  const [showAddModal, setShowAddModal] = useState(null);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:3000/api/tasks", {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        const tasksByColumn = {
          todo: [],
          inProgress: [],
          done: [],
        };

        res.data.forEach((task) => {
          tasksByColumn[task.status].push(task);
        });

        setColumns({
          todo: { title: "To Do", tasks: tasksByColumn.todo },
          inProgress: { title: "In Progress", tasks: tasksByColumn.inProgress },
          done: { title: "Done", tasks: tasksByColumn.done },
        });
      } catch (err) {
        console.error("Помилка при завантаженні тасків:", err);
      }
    };

    fetchTasks();
  }, [token]);

  const handleAddTask = async () => {
    if (!newTaskText.trim() || !showAddModal || !token) return;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/tasks/add",
        {
          text: newTaskText,
          deadline: newTaskDeadline || null,
          status: showAddModal,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const newTask = res.data;

      setColumns((prev) => ({
        ...prev,
        [showAddModal]: {
          ...prev[showAddModal],
          tasks: [...prev[showAddModal].tasks, newTask],
        },
      }));
    } catch (err) {
      console.error("Не вдалося додати таску:", err);
    }

    setNewTaskText("");
    setNewTaskDeadline("");
    setShowAddModal(null);
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
        (t) => t._id !== task._id
      );
      const targetTasks = [
        ...prev[targetColumn].tasks,
        { ...task, status: targetColumn },
      ];

      return {
        ...prev,
        [sourceColumn]: { ...prev[sourceColumn], tasks: sourceTasks },
        [targetColumn]: { ...prev[targetColumn], tasks: targetTasks },
      };
    });

    setDraggingTask(null);

    // Оновлення статусу на сервері
    axios
      .put(
        `http://localhost:3000/api/tasks/${task._id}`,
        { status: targetColumn },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .catch((err) => console.error("Помилка при зміні статусу:", err));
  };

  const confirmAndDelete = () => {
    const { columnKey, taskId } = confirmDelete;

    setColumns((prev) => ({
      ...prev,
      [columnKey]: {
        ...prev[columnKey],
        tasks: prev[columnKey].tasks.filter((t) => t._id !== taskId),
      },
    }));

    setConfirmDelete(null);

    axios
      .delete(`http://localhost:3000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => console.error("Помилка при видаленні:", err));
  };

  const handleEdit = (task, columnKey) => {
    setEditingTask({ taskId: task._id, columnKey });
    setEditedText(task.text);
    setEditedDeadline(task.deadline?.split("T")[0] || "");
  };

  const saveEdit = () => {
    if (!editingTask || !token) return;

    const { columnKey, taskId } = editingTask;

    setColumns((prev) => ({
      ...prev,
      [columnKey]: {
        ...prev[columnKey],
        tasks: prev[columnKey].tasks.map((task) =>
          task._id === taskId
            ? { ...task, text: editedText, deadline: editedDeadline }
            : task
        ),
      },
    }));

    axios
      .put(
        `http://localhost:3000/api/tasks/${taskId}`,
        { text: editedText, deadline: editedDeadline },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .catch((err) => console.error("Помилка при редагуванні:", err));

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
    <div>
      <header className={styles.header}>
        <div className={styles.headerLeft}>Task Manager</div>
        <div className={styles.headerRight}>
          <span>User</span>
          <div className={styles.avatarPlaceholder}>U</div>
        </div>
      </header>

      <div className={styles.taskPage}>
        <div className={styles.columns}>
          {Object.entries(columns).map(([key, column]) => (
            <div
              key={key}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(key)}
              className={styles.column}
            >
              <div className={styles.columnHeader}>
                <h2 className={styles.columnTitle}>{column.title}</h2>
                <button
                  onClick={() => setShowAddModal(key)}
                  className={styles.addIconButton}
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className={styles.taskList}>
                {column.tasks.map((task) => {
                  const isEditing =
                    editingTask?.taskId === task._id &&
                    editingTask?.columnKey === key;
                  const deadlineStatus = getDeadlineStatus(task.deadline);

                  return (
                    <motion.div
                      key={task._id}
                      draggable={!isEditing}
                      onDragStart={() => handleDragStart(task, key)}
                      className={`${styles.task} ${styles[deadlineStatus]}`}
                    >
                      {isEditing ? (
                        <div className={styles.editContainer}>
                          <input
                            className={styles.editInput}
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            placeholder="Назва задачі"
                          />
                          <input
                            type="date"
                            className={styles.editDate}
                            value={editedDeadline}
                            onChange={(e) => setEditedDeadline(e.target.value)}
                          />
                          <button
                            className={styles.saveButton}
                            onClick={saveEdit}
                          >
                            Зберегти
                          </button>
                        </div>
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
                            <button
                              className={styles.edit}
                              onClick={() => handleEdit(task, key)}
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              className={styles.delete}
                              onClick={() =>
                                setConfirmDelete({
                                  columnKey: key,
                                  taskId: task._id,
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

        <AnimatePresence>
          {showAddModal && (
            <AddTaskModal
              newTaskText={newTaskText}
              newTaskDeadline={newTaskDeadline}
              setNewTaskText={setNewTaskText}
              setNewTaskDeadline={setNewTaskDeadline}
              onAdd={handleAddTask}
              onClose={() => setShowAddModal(null)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {confirmDelete && (
            <DeleteConfirmModal
              onConfirm={confirmAndDelete}
              onCancel={() => setConfirmDelete(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskPage;
