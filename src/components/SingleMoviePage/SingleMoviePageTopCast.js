import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTopCast } from "../../features/movies/singleMovieSlice";
import SectionTitle from "../General/SinglePage/SectionTitle";

import classes from "./styles/SingleMoviePageTopCast.module.css";

const SingleMoviePageTopCast = ({ layoutClasses, id, link, authorId }) => {
  const topCast = useSelector(selectTopCast);
  const topCastList = Object.entries(topCast).map(([id, val]) => ({
    id,
    ...val,
  }));

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
        {topCastList?.length > 0 &&
          topCastList.map((actor) => (
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
          ))}

        {topCast ? "" : <h3 className="pbot2-rem">No top cast info yet!</h3>}
      </div>
    </section>
  );
};

export default SingleMoviePageTopCast;
