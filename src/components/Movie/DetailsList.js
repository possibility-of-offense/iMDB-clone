import { Link } from "react-router-dom";
import classes from "./styles/DetailsList.module.css";

const DetailsList = ({ details }) => {
  const getDescriptionAndBody = details
    .filter((el) => el.hasOwnProperty("description"))
    .map((el) => ({
      ...el,
      description: el.description[0].toUpperCase() + el.description.slice(1),
    }));

  const getAdditionalLinks = details.filter(
    (el) => !el.hasOwnProperty("description")
  );

  return (
    <section className={classes["details-list"]}>
      {getDescriptionAndBody.length > 0 &&
        getDescriptionAndBody.map((el, i) => (
          <div key={i} className={classes["details-list__item"]}>
            <p>{el.description}</p>
            <div>
              {el.body.length > 0 &&
                el.body.map((i) => <p key={i.toLowerCase()}>{i}</p>)}
            </div>
          </div>
        ))}
      {getAdditionalLinks[0]?.additionalLinks.length > 0 &&
        getAdditionalLinks[0]?.additionalLinks.map((el, i) => (
          <div key={i} className={classes["details-list__item"]}>
            <p>
              <Link to={el.link}>{el.title}</Link>
            </p>
          </div>
        ))}
    </section>
  );
};

export default DetailsList;
