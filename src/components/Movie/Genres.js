import { useSelector } from "react-redux";
import classes from "./styles/Genres.module.css";

const Genres = () => {
  const selectGenres = useSelector((state) => {
    return state.singleMovie.singleMovie.genres;
  });

  return (
    <section className={classes["genres"]}>
      <ul>
        {selectGenres?.length > 0 &&
          selectGenres.map((el, i) => <li key={i}>{el}</li>)}
      </ul>
    </section>
  );
};

export default Genres;
