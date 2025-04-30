/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import styles from "./DeleteConfirmModal.module.css";

const DeleteConfirmModal = ({ onConfirm, onCancel }) => (
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
        <button onClick={onConfirm} className={styles.confirmButton}>
          Так
        </button>
        <button onClick={onCancel} className={styles.cancelButton}>
          Скасувати
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export default DeleteConfirmModal;
