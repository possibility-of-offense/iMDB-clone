import classes from "./styles/GridTwoColumns.module.css";

const GridTwoColumns = ({ sizing, children, layoutClasses }) => {
  if (sizing === "3/4") {
    return (
      <div
        className={`${classes["grid"]} ${layoutClasses ? layoutClasses : ""} ${
          classes["grid-third-fourth"]
        }`}
      >
        {children}
      </div>
    );
  } else if (sizing === "auto-1fr") {
    return (
      <div
        className={`${classes["grid"]} ${layoutClasses ? layoutClasses : ""} ${
          classes["grid-auto-1fr"]
        }`}
      >
        {children}
      </div>
    );
  } else if (sizing === "equal") {
    return (
      <div
        className={`${classes["grid"]} ${layoutClasses ? layoutClasses : ""} ${
          classes["grid-equal"]
        }`}
      >
        {children}
      </div>
    );
  }
};

export default GridTwoColumns;
