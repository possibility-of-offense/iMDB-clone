import SectionTitle from "../Movie/SectionTitle";

import classes from "./styles/KnownFor.module.css";

const KnownFor = ({ layoutClasses }) => {
  return (
    <section className={classes["known-for"]}>
      <SectionTitle moreInfo={false} layoutClasses={layoutClasses}>
        Known for
      </SectionTitle>
      <div className={classes["known-for__grid"]}>
        <div>
          <figure>
            <img
              src="https://m.media-amazon.com/images/M/MV5BZTllZTdlOGEtZTBmMi00MGQ5LWFjN2MtOGEyZTliNGY1MzFiXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_QL75_UX180_CR0,0,180,266_.jpg"
              alt="img"
              title="img"
            />
          </figure>
          <div>
            <h4>Ad Astra</h4>
            <p>2019</p>
            {/* TODO implement info popup modal */}
          </div>
        </div>
        <div>
          <figure>
            <img
              src="https://m.media-amazon.com/images/M/MV5BZTllZTdlOGEtZTBmMi00MGQ5LWFjN2MtOGEyZTliNGY1MzFiXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_QL75_UX180_CR0,0,180,266_.jpg"
              alt="img"
              title="img"
            />
          </figure>
          <div>
            <h4>Ad Astra</h4>
            <p>2019</p>
            {/* TODO implement info popup modal */}
          </div>
        </div>
        <div>
          <figure>
            <img
              src="https://m.media-amazon.com/images/M/MV5BZTllZTdlOGEtZTBmMi00MGQ5LWFjN2MtOGEyZTliNGY1MzFiXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_QL75_UX180_CR0,0,180,266_.jpg"
              alt="img"
              title="img"
            />
          </figure>
          <div>
            <h4>Ad Astra</h4>
            <p>2019</p>
            {/* TODO implement info popup modal */}
          </div>
        </div>
        <div>
          <figure>
            <img
              src="https://m.media-amazon.com/images/M/MV5BZTllZTdlOGEtZTBmMi00MGQ5LWFjN2MtOGEyZTliNGY1MzFiXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_QL75_UX180_CR0,0,180,266_.jpg"
              alt="img"
              title="img"
            />
          </figure>
          <div>
            <h4>Ad Astra</h4>
            <p>2019</p>
            {/* TODO implement info popup modal */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnownFor;
