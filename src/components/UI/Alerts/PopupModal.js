import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import classes from "./styles/PopupModal.module.css";

const PopupModal = ({ children, onClick, position }) => {
  let pos = position || "right";

  const location = useLocation();
  const modalRef = useRef();

  useEffect(() => {
    if (location) {
      if (location.pathname === "/") {
        modalRef.current.classList.add(classes["white-bg"]);
      }
    }
  }, [location]);

  return (
    <div
      ref={modalRef}
      className={`${classes["msgbox-box"]} ${
        pos === "left" ? classes["left"] : classes["right"]
      }`}
    >
      <div className={classes["msgbox-content"]}>{children}</div>
      <div className={classes["msgbox-command"]}>
        <a onClick={onClick} className={classes["msgbox-close"]} href="/">
          Close
        </a>
      </div>
    </div>
  );
};

export default PopupModal;
