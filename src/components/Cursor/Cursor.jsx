import { useEffect } from "react";
import style from "./Cursor.module.css";

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");

    const moveCursor = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  return <div className={style.customCursor} />;
};

export default CustomCursor;
