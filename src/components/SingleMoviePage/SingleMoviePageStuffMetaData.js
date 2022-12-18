import { Link } from "react-router-dom";
import classes from "./styles/SingleMoviePageStuffMetaData.module.css";

const SingleMoviePageStuffMetaData = ({ stuff }) => {
  if (Object.values(stuff).length === 3) {
    const { actors, directors, writers } = stuff;
    const getActorStars = Object.entries(actors)
      .map(([id, val]) => ({
        id,
        ...val,
      }))
      .filter((actor) => actor.isStar);

    return (
      <section className={classes["members"]}>
        <div className={classes["members-single"]}>
          <p>Director{directors.length === 1 ? "" : "s"}</p>
          <div>
            {directors.map((el) => (
              <p key={el}>{el}</p>
            ))}
          </div>
        </div>
        <div className={classes["members-single"]}>
          <p>Writer{writers.length === 1 ? "" : "s"}</p>
          <div>
            {writers.map((el) => (
              <p key={el}>{el}</p>
            ))}
          </div>
        </div>
        <div className={classes["members-single"]}>
          <p>Stars</p>
          <div>
            {getActorStars.length > 0 &&
              getActorStars.map((el) => (
                <Link key={el.actorId} to={`/actors/${el.actorId}`}>
                  <p>{el.actorName}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    );
  }

  // const membersData = creators;
  // const topCastData = topCast;

  // if (membersData && topCastData) {
  //   const { directors, writers } = membersData;
  //   const getStars = Object.entries(topCastData).filter((el) => el[1].is_star);

  //   return (
  //     <section className={classes["members"]}>
  //       <div className={classes["members-single"]}>
  //         <p>Director{Object.values(directors).length === 1 ? "" : "s"}</p>
  //         <div>
  //           {Object.entries(directors).map((el) => (
  //             <p key={el[0]}>{el[1]}</p>
  //           ))}
  //         </div>
  //       </div>
  //       <div className={classes["members-single"]}>
  //         <p>Writer{Object.values(writers).length === 1 ? "" : "s"}</p>
  //         <div>
  //           {Object.entries(writers).map((el) => (
  //             <p key={el[0]}>{el[1]}</p>
  //           ))}
  //         </div>
  //       </div>
  //       <div className={classes["members-single"]}>
  //         <p>Stars</p>
  //         <div>
  //           {getStars.length > 0 &&
  //             getStars.map((el) => (
  //               <Link key={el[0].trim()} to={`/actors/${el[0].trim()}`}>
  //                 <p>{el[1].name}</p>
  //               </Link>
  //             ))}
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }
};

export default SingleMoviePageStuffMetaData;
