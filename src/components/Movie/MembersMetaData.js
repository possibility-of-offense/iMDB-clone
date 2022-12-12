import { Link } from "react-router-dom";
import classes from "./styles/MembersMetaData.module.css";

const MembersMetaData = ({ creators, topCast }) => {
  const membersData = creators;
  const topCastData = topCast;

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
              getStars.map((el) => (
                <Link key={el[0].trim()} to={`/actors/${el[0].trim()}`}>
                  <p>{el[1].name}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    );
  }
};

export default MembersMetaData;
