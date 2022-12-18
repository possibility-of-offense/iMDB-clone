import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./styles/DetailsList.module.css";

const DetailsList = ({ details }) => {
  const getDescriptionAndBody = details
    .filter((el) => el.hasOwnProperty("description"))
    .map((el) => ({
      ...el,
      description: el.description[0].toUpperCase() + el.description.slice(1),
    }));
  const navigate = useNavigate();
  const handleNavigate = (body) => {
    if (body[0] === "/") {
      navigate(body);
    }
  };

  console.log(getDescriptionAndBody);

  return (
    <section className={classes["details-list"]}>
      {getDescriptionAndBody.length > 0 &&
        getDescriptionAndBody.map((el, i) => (
          <div key={i} className={classes["details-list__item"]}>
            <p
              className={el.body[0] === "/" ? "cursor-pointer" : ""}
              onClick={() => handleNavigate(el.body)}
            >
              {el.description}
            </p>
            <div>
              {Array.isArray(el.body) &&
                el.body.length > 0 &&
                el.body.map((single) => (
                  <p key={single.toLowerCase()}>
                    <Fragment>
                      {el.description === "Genres" ? (
                        <Link to={`/genres/${single}`}>{single}</Link>
                      ) : (
                        single
                      )}
                    </Fragment>
                  </p>
                ))}
              {el.description === "Taglines" && el.body && <p>{el.body}</p>}
            </div>
          </div>
        ))}
    </section>
  );
};

export default DetailsList;
