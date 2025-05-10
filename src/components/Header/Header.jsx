/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import SettingsModal from "../Modals/SettingsModal/SettingsModal";
import { Link } from "react-router-dom"; // імпортуй Link

const Header = () => {
  const [email, setEmail] = useState("user@example.com");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("User");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Не вдалося отримати профіль");

        const data = await response.json();
        setEmail(data.email || "user@example.com");
        setAvatarUrl(data.avatarUrl || "");

        const extractedUsername =
          data.username?.trim() || data.email?.split("@")[0] || "User";
        setUsername(extractedUsername);

        localStorage.setItem("email", data.email);
        localStorage.setItem("avatarUrl", data.avatarUrl || "");
        localStorage.setItem("username", extractedUsername);
      } catch (err) {
        console.error("Помилка отримання профілю:", err.message);
      }
    };

    fetchProfile();
  }, []);

  const initial = username.charAt(0).toUpperCase();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleSettings = () => {
    setIsSettingsOpen(true);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("avatarUrl");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
    setEmail(`${newUsername}@example.com`);
    localStorage.setItem("username", newUsername);
    localStorage.setItem("email", `${newUsername}@example.com`);
  };

  const handleAvatarChange = (newAvatarUrl) => {
    setAvatarUrl(newAvatarUrl);
    localStorage.setItem("avatarUrl", newAvatarUrl);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>Task Manager</div>

        <div className={styles.headerRight}>
          <Link to="/calendar" className={styles.navLink}>
            Календар
          </Link>
          <div className={styles.userMenuWrapper}>
            <div className={styles.userInfo}>
              <span>{username}</span>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className={styles.avatarImage}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>{initial}</div>
              )}
              <button className={styles.toggleBtn} onClick={toggleMenu}>
                <span className={styles.chevron}>
                  {menuOpen ? (
                    <FaChevronUp size={14} />
                  ) : (
                    <FaChevronDown size={14} />
                  )}
                </span>
              </button>
            </div>
            {menuOpen && (
              <div className={styles.dropdownMenu}>
                <button onClick={toggleSettings}>Settings</button>
                <button onClick={handleLogout}>LogOut</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentUsername={username}
        onUsernameChange={handleUsernameChange}
        onAvatarChange={handleAvatarChange}
      />
    </>
  );
};

export default Header;
