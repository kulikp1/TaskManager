import React, { useState } from "react";
import styles from "./Header.module.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const Header = () => {
  const email = localStorage.getItem("email") || "user@example.com";
  const username = email.split("@")[0];
  const initial = username.charAt(0).toUpperCase();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>Task Manager</div>
      <div className={styles.headerRight}>
        <div className={styles.userMenuWrapper}>
          <div className={styles.userInfo} onClick={toggleMenu}>
            <span>{username}</span>
            <div className={styles.avatarPlaceholder}>{initial}</div>
            <span className={styles.chevron}>
              {menuOpen ? (
                <FaChevronUp size={14} />
              ) : (
                <FaChevronDown size={14} />
              )}
            </span>
          </div>
          {menuOpen && (
            <div className={styles.dropdownMenu}>
              <button onClick={() => alert("Налаштування")}>Settings</button>
              <button onClick={handleLogout}>LogOut</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
