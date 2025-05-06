import React, { useState, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "./SettingsModal.module.css";

const SettingsModal = ({
  isOpen,
  onClose,
  currentUsername,
  onUsernameChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [newUsername, setNewUsername] = useState(currentUsername);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setNewUsername(currentUsername);
      setError(null);
    }
  }, [isOpen, currentUsername]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!newUsername.trim()) return;

    setIsLoading(true);
    setIsSaved(false);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/user/username", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify({ username: newUsername }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Помилка оновлення");
      }

      localStorage.setItem("email", `${newUsername}@example.com`);
      onUsernameChange(newUsername);
      setIsSaved(true);

      setTimeout(() => setIsSaved(false), 2000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
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
