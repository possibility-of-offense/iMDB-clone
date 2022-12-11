import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTopCast } from "../../features/movies/singleMovieSlice";
import MovieSectionTitle from "./MovieSectionTitle";
import classes from "./styles/TopCast.module.css";

const TopCast = () => {
  const topCast = useSelector(selectTopCast);
  const topCastList = Object.entries(topCast).map(([id, val]) => ({
    id,
    ...val,
  }));

  const navigate = useNavigate();
  console.log(topCastList);

  const handleNavigate = (id) => {
    navigate("/actors/" + id.trim());
  };

  return (
    <section className={classes["top-cast"]}>
      <MovieSectionTitle moreInfo={true}>Top Cast</MovieSectionTitle>
      <div className={classes["top-cast__grid"]}>
        {topCastList?.length > 0 &&
          topCastList.map((actor) => (
            <div key={actor.id} onClick={handleNavigate.bind(null, actor.id)}>
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
