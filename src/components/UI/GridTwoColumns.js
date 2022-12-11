import classes from "./styles/GridTwoColumns.module.css";

const GridTwoColumns = ({ sizing, children }) => {
  if (sizing === "3/4") {
    return (
      <div className={`${classes["grid"]} ${classes["grid-third-fourth"]}`}>
        {children}
      </div>
    );
  }
};

export default GridTwoColumns;
