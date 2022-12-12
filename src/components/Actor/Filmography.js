import SectionTitle from "../Movie/SectionTitle";

import classes from "./styles/Filmography.module.css";

const Filmography = ({ layoutClasses, films }) => {
  const listFilms = Object.entries(films).map((el) => ({
    id: el[0],
    ...el[1],
  }));

  return (
    <section>
      <SectionTitle moreInfo={true} layoutClasses={layoutClasses}>
        Filmography
      </SectionTitle>
      <div className={classes["filmography__grid"]}>
        {listFilms &&
          listFilms.length > 0 &&
          listFilms.map((el) => (
            <div key={el.id}>
              <figure>
                <img src={el.main_image} alt="img" title="img" />
              </figure>
              <div>
                <div>
                  <h4>{el.name}</h4>
                  <p>{el.characterName}</p>
                </div>
                <p>{el.year}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Filmography;
