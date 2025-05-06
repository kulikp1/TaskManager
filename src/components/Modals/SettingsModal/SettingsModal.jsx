import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "./SettingsModal.module.css";

const SettingsModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setIsLoading(true);
    setIsSaved(false);

    // Імітація збереження (напр. запиту на сервер)
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);

      setTimeout(() => setIsSaved(false), 2000); // приховати повідомлення через 2 сек
    }, 1500);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.iconCloseBtn} onClick={onClose}>
          <IoIosCloseCircleOutline size={30} />
        </button>

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

        <button
          className={styles.confirmBtn}
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Збереження..." : isSaved ? "Збережено!" : "Підтвердити"}
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
