/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AddTaskModal.module.css";

const AddTaskModal = ({
  newTaskText,
  newTaskDeadline,
  setNewTaskText,
  setNewTaskDeadline,
  onAdd,
  onClose,
}) => (
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
        onChange={(date) => setNewTaskDeadline(date?.toISOString() || "")}
        placeholderText="Оберіть дедлайн"
        className={styles.datePickerInput}
        dateFormat="dd.MM.yyyy"
        minDate={new Date()}
      />

      <div className={styles.modalButtons}>
        <button onClick={onAdd} className={styles.confirmButton}>
          Додати
        </button>
        <button onClick={onClose} className={styles.cancelButton}>
          Скасувати
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export default AddTaskModal;
