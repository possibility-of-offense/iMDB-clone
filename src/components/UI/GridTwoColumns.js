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
  }
};

export default GridTwoColumns;
