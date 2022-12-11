import { useSelector } from "react-redux";
import { selectShortInfo } from "../../features/movies/singleMovieSlice";
import classes from "./styles/ShortDescription.module.css";

const ShortDescription = () => {
  const shortInfo = useSelector(selectShortInfo);

  return <div className={classes["short-description"]}>{shortInfo}</div>;
};

export default ShortDescription;
