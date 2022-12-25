import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTopCast } from "../../features/movies/singleMovieSlice";
import SectionTitle from "../General/SinglePage/SectionTitle";

import classes from "./styles/SingleMoviePageTopCast.module.css";

const SingleMoviePageTopCast = ({ layoutClasses, id, link, authorId }) => {
  const topCast = useSelector(selectTopCast);
  const topCastList = topCast.map((el) => {
    const actorValues = Object.values(el);
    return {
      ...actorValues[0],
    };
  });

  const layoutClassesConditional = topCast > 0 ? layoutClasses : "mbot2-rem";

  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate("/actors/" + id.trim());
  };

  return (
    <section className={classes["top-cast"]}>
      <SectionTitle
        authorId={authorId}
        moreInfo={true}
        layoutClasses={layoutClassesConditional}
        link={link}
        editLink="edit-cast"
      >
        Top Cast
      </SectionTitle>
      <div className={classes["top-cast__grid"]}>
        {topCast?.length > 0 ? (
          topCast.map((actor) => (
            <div
              key={actor.actorId}
              onClick={handleNavigate.bind(null, actor.actorId)}
            >
              <div className={classes["top-cast__grid--image"]}>
                <img
                  src={actor.actorMainImage}
                  title={actor.actorName}
                  alt={actor.actorName}
                />
              </div>
              <div>
                <h4>{actor.actorName}</h4>
                <p>{actor.characterName}</p>
              </div>
            </div>
          ))
        ) : (
          <h3>No actors yet</h3>
        )}

        {topCast ? "" : <h3 className="pbot2-rem">No top cast info yet!</h3>}
      </div>
    </section>
  );
};

export default SingleMoviePageTopCast;
