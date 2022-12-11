import classes from "./styles/ShortDescription.module.css";

const ShortDescription = ({ shortInfo }) => {
  return <div className={classes["short-description"]}>{shortInfo}</div>;
};

export default ShortDescription;
