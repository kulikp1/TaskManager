import React from "react";
import Style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={Style.loaderWrapper}>
      <div className={Style.column}>
        <div className={Style.columnTitle}>
          Loading<span className={Style.dot}>.</span>
          <span className={Style.dot}>.</span>
          <span className={Style.dot}>.</span>
        </div>
        <div className={Style.taskCard}>Task 1</div>
        <div className={Style.taskCard}>Task 2</div>
        <div className={Style.taskCard}>Task 3</div>
        <div className={Style.taskCard}>Task 4</div>
        <div className={Style.taskCard}>Task 5</div>
      </div>
    </div>
  );
};

export default Loader;
