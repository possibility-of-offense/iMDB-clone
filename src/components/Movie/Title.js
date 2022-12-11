import { useSelector } from "react-redux";
import { selectTitleYearDuration } from "../../features/movies/singleMovieSlice";
import classes from "./styles/Title.module.css";

const Title = () => {
  const { title, year, duration } = useSelector(selectTitleYearDuration);

  return (
    <div className={classes["title"]}>
      <h1>{title}</h1>
      <div className={classes["year-duration-wrapper"]}>
        <ul>
          <li>{year}</li>
          <li>{duration}</li>
        </ul>
      </div>
    </div>
  );
};

export default Title;
