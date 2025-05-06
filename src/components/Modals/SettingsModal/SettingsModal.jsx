import React from "react";
import styles from "./SettingsModal.module.css";

const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Налаштування</h2>

        <div className={styles.section}>
          <label htmlFor="username">Ім’я користувача</label>
          <input
            id="username"
            type="text"
            placeholder="Введіть нове ім’я"
            className={styles.input}
            disabled
          />
        </div>

        <div className={styles.section}>
          <label>Аватар</label>
          <div className={styles.avatarOptions}>
            <div className={styles.avatar}>🧑</div>
            <div className={styles.avatar}>👩</div>
            <div className={styles.avatar}>🧔</div>
            <div className={styles.avatar}>👨‍💻</div>
          </div>
          <p className={styles.note}>(Поки що вибір аватара не активний)</p>
        </div>

        <button className={styles.closeBtn} onClick={onClose}>
          Закрити
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
