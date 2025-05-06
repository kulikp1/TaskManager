import React, { useState, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "./SettingsModal.module.css";

const SettingsModal = ({
  isOpen,
  onClose,
  currentUsername,
  onUsernameChange,
  onAvatarChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [newUsername, setNewUsername] = useState(currentUsername);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (isOpen) {
      setNewUsername(currentUsername);
      setError(null);
      setPreviewUrl("");
      setSelectedFile(null);
    }
  }, [isOpen, currentUsername]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!newUsername.trim()) return;

    setIsLoading(true);
    setIsSaved(false);
    setError(null);

    try {
      // 🔹 Оновлення імені користувача
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

      if (!response.ok) throw new Error(data.message || "Помилка оновлення");

      localStorage.setItem("email", `${newUsername}@example.com`);
      onUsernameChange(newUsername);

      // 🔹 Завантаження аватара на сервер
      if (selectedFile) {
        const formData = new FormData();
        formData.append("avatar", selectedFile);

        const uploadResponse = await fetch(
          "http://localhost:3000/api/user/avatar",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadData.message || "Помилка завантаження аватара");
        }

        const avatarUrl = uploadData.avatarUrl;
        localStorage.setItem("avatarUrl", avatarUrl);
        onAvatarChange(avatarUrl);
      }

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl("");
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
        </div>

        <div className={styles.section}>
          <label htmlFor="avatar">Аватар</label>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="preview"
              className={styles.avatarPreview}
            />
          ) : (
            <p className={styles.note}>Не вибрано аватар</p>
          )}
          <label htmlFor="fileUpload" className={styles.uploadLabel}>
            Обрати файл
          </label>
          <input
            id="fileUpload"
            type="file"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={handleFileChange}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

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
