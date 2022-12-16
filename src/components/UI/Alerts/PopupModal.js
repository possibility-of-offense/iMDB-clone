import classes from "./styles/PopupModal.module.css";

const PopupModal = ({ children, onClick }) => {
  return (
    <div className={`${classes["msgbox-box"]}`}>
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
