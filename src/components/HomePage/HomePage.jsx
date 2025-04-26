import React from "react";
import styles from "./HomePage.module.css";
import Logo from "../../assets/logo.png";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.block} ${styles.leftBlock}`}>
        <div className={styles.logo}>
          <img src={Logo} alt="TaskManager Logo" className={styles.logoImage} />
        </div>
        <div className={styles.slogan}>Легко. Швидко. Стильно.</div>
      </div>

      <div className={`${styles.block} ${styles.rightBlock}`}>
        <h1 className={styles.title}>
          Організуй свій день{" "}
          <span style={{ color: "#3b82f6" }}>без стресу</span>
        </h1>
        <p className={styles.description}>
          Керуйте завданнями, ставте пріоритети та досягайте цілей з інтуїтивно
          зрозумілим інтерфейсом і потужними функціями.
        </p>
        <ul className={styles.features}>
          <li>Управління проектами</li>
          <li>Дедлайни та нагадування</li>
          <li>Аналіз ефективності</li>
          <li>Мобільна доступність</li>
        </ul>
        <button className={styles.loginButton}>
          Увійти
          <span className={styles.buttonIcon}>➔</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
