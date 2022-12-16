import classes from "./styles/PopupModal.module.css";

const PopupModal = ({ children, onClick, position }) => {
  let pos = position || "right";

  return (
    <div
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
