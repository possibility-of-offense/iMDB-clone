import { useSelector } from "react-redux";
import { selectBoxOffice } from "../../features/movies/singleMovieSlice";
import MovieSectionTitle from "./MovieSectionTitle";
import classes from "./styles/BoxOffice.module.css";

const BoxOffice = () => {
  const boxOffice = useSelector(selectBoxOffice);

  return (
    <section className={classes["box-office"]}>
      <MovieSectionTitle moreInfo={false}>Box office</MovieSectionTitle>
      <div className={classes["box-office__grid"]}>
        {boxOffice.budget && (
          <div>
            <h4>Budget</h4>
            <p>{boxOffice.budget}</p>
          </div>
        )}
        {boxOffice.expected_profit && (
          <div>
            <h4>Expected Profit</h4>
            <p>{boxOffice.expected_profit}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BoxOffice;