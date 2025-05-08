import React from "react";
import Style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={Style.loader}>
      <div className={Style.spinner}></div>
    </div>
  );
};

export default Loader;
