import { useEffect } from "react";
import { createPortal } from "react-dom";

import classes from "./styles/Modal.module.css";

const Modal = ({ children, navigate }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (e.target.id === "modal-wrapper") {
      navigate();
    }
  };

  return createPortal(
    <section
      id="modal-wrapper"
      onClick={handleClick}
      className={classes["modal__wrapper"]}
    >
      {children}
    </section>,
    document.getElementById("modal")
  );
};

export default Modal;
