import { useSelector } from "react-redux";
import { selectTopCast } from "../../features/movies/singleMovieSlice";
import MovieSectionTitle from "./MovieSectionTitle";
import classes from "./styles/TopCast.module.css";

const TopCast = () => {
  const topCast = useSelector(selectTopCast);
  const topCastList = Object.entries(topCast).map(([id, val]) => ({
    id,
    ...val,
  }));

  return (
    <section className={classes["top-cast"]}>
      <MovieSectionTitle moreInfo={true}>Top Cast</MovieSectionTitle>
      <div className={classes["top-cast__grid"]}>
        {topCastList?.length > 0 &&
          topCastList.map((actor) => (
            <div key={actor.id}>
              <div className={classes["top-cast__grid--image"]}>
                <img src={actor.image} title={actor.name} alt={actor.name} />
              </div>
              <div>
                <h4>{actor.name}</h4>
                <p>{actor.characterName}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default TopCast;
