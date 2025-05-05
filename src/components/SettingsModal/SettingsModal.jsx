import React from "react";
import styles from "./SettingsModal.module.css";

const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // Щоб клік по модалці не закривав її
      >
        <h2>Налаштування</h2>
        <p>Тут можна буде додати поля для налаштувань користувача.</p>
        <button onClick={onClose}>Закрити</button>
      </div>
    </div>
  );
};

export default SettingsModal;
