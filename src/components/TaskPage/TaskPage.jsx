/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Pencil } from "lucide-react";
import styles from "./TaskPage.module.css";
import AddTaskModal from "../Modals/AddTaskModal/AddTaskModal";
import DeleteConfirmModal from "../Modals/DeleteConfirmModal/DeleteConfirmModal";
import { div } from "framer-motion/client";

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
                              onChange={(e) =>
                                setEditedDeadline(e.target.value)
                              }
                            />
                            <button
                              className={styles.saveButton}
                              onClick={saveEdit}
                            >
                              Зберегти
                            </button>
                          </div>
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

        <div className={styles.addTaskContainer}>
          <button
            onClick={() => setShowAddModal(true)}
            className={styles.addButton}
          >
            <Plus size={18} /> Додати задачу
          </button>
        </div>

        <AnimatePresence>
          {showAddModal && (
            <AddTaskModal
              newTaskText={newTaskText}
              newTaskDeadline={newTaskDeadline}
              setNewTaskText={setNewTaskText}
              setNewTaskDeadline={setNewTaskDeadline}
              onAdd={handleAddTask}
              onClose={() => setShowAddModal(false)}
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
