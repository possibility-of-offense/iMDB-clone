import { useSelector } from "react-redux";
import { selectTopCast } from "../../features/movies/singleMovieSlice";
import classes from "./styles/MembersMetaData.module.css";

const MembersMetaData = () => {
  const selectCreators = useSelector(
    (state) => state.singleMovie.singleMovie.creators
  );
  const membersData = selectCreators;
  const topCastData = useSelector(selectTopCast);

  if (membersData && topCastData) {
    const { directors, writers } = membersData;
    const getStars = Object.entries(topCastData).filter((el) => el[1].is_star);

    return (
      <section className={classes["members"]}>
        <div className={classes["members-single"]}>
          <p>Director{Object.values(directors).length === 1 ? "" : "s"}</p>
          <div>
            {Object.entries(directors).map((el) => (
              <p key={el[0]}>{el[1]}</p>
            ))}
          </div>
        </div>
        <div className={classes["members-single"]}>
          <p>Writer{Object.values(writers).length === 1 ? "" : "s"}</p>
          <div>
            {Object.entries(writers).map((el) => (
              <p key={el[0]}>{el[1]}</p>
            ))}
          </div>
        </div>
        <div className={classes["members-single"]}>
          <p>Stars</p>
          <div>
            {getStars.length > 0 &&
              getStars.map((el) => <p key={el[0]}>{el[1].name}</p>)}
          </div>
        </div>
      </section>
    );
  }
};

export default MembersMetaData;
