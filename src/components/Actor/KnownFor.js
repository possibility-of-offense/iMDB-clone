import SectionTitle from "../Movie/SectionTitle";

import classes from "./styles/KnownFor.module.css";

const KnownFor = ({ knownFor, layoutClasses }) => {
  const listknownFor = Object.entries(knownFor).map((el) => ({
    id: el[0],
    ...el[1],
  }));

  return (
    <section className={classes["known-for"]}>
      <SectionTitle moreInfo={false} layoutClasses={layoutClasses}>
        Known for
      </SectionTitle>
      <div className={classes["known-for__grid"]}>
        {listknownFor &&
          listknownFor.length > 0 &&
          listknownFor.map((el) => (
            <div key={el.id}>
              <figure>
                <img src={el.image} alt="img" title="img" />
              </figure>
              <div>
                <h4>{el.name}</h4>
                <p>{el.image}</p>
                {/* TODO implement info popup modal */}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default KnownFor;
