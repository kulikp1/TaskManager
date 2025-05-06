import React, { useState } from "react";
import styles from "./Header.module.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import SettingsModal from "../Modals/SettingsModal/SettingsModal";

const Header = () => {
  const [email, setEmail] = useState(
    localStorage.getItem("email") || "user@example.com"
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const username = email.split("@")[0];
  const initial = username.charAt(0).toUpperCase();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleSettings = () => {
    setIsSettingsOpen(true);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  const handleUsernameChange = (newUsername) => {
    setEmail(`${newUsername}@example.com`);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>Task Manager</div>
        <div className={styles.headerRight}>
          <div className={styles.userMenuWrapper}>
            <div className={styles.userInfo}>
              <span>{username}</span>
              <div className={styles.avatarPlaceholder}>{initial}</div>
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
      />
    </>
  );
};

export default Header;
