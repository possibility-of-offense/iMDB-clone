import classes from "./styles/GlobalLoader.module.css";

const GlobalLoader = ({ bgColor }) => {
  return (
    <div style={{ background: bgColor }} className={classes["global-loader"]}>
      <div className={classes["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default GlobalLoader;
