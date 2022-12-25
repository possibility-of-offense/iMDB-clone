import { Link } from "react-router-dom";
import SectionTitle from "../General/SinglePage/SectionTitle";

import classes from "./styles/SingleActorPageKnownFor.module.css";

const SingleActorPageKnownFor = ({ knownFor, layoutClasses }) => {
  const listknownFor =
    knownFor &&
    Object.entries(knownFor).map((el) => ({
      id: el[0],
      ...el[1],
    }));

  return (
    <section className={classes["known-for"]}>
      <SectionTitle moreInfo={false} layoutClasses={layoutClasses}>
        Known for
      </SectionTitle>
      <div className={classes["known-for__grid"]}>
        {listknownFor && listknownFor.length > 0 ? (
          listknownFor.map((el) => (
            <div key={el.id}>
              <figure>
                <img src={el.image} alt="img" title="img" />
              </figure>
              <div>
                <h4>
                  <Link to={`/movies/${el.id.trim()}`}>{el.name}</Link>
                </h4>

                <p>{el.year}</p>
                {/* TODO implement info popup modal */}
              </div>
            </div>
          ))
        ) : (
          <h3 class="pbot2-rem">No info yet!</h3>
        )}
      </div>
    </section>
  );
};

export default SingleActorPageKnownFor;
