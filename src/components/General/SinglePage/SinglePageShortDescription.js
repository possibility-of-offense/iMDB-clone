import classes from "./styles/SinglePageShortDescription.module.css";

const SinglePageShortDescription = ({ shortInfo }) => {
  if (shortInfo) {
    return <div className={classes["short-description"]}>{shortInfo}</div>;
  }
};

export default SinglePageShortDescription;
