import { useParams } from "react-router-dom";
import HeaderImageInfo from "../components/General/HeaderImageInfo";
import classes from "./styles/Cast.module.css";

const Cast = () => {
  const { id } = useParams();

  return (
    <section className={classes["Cast__wrapper"]}>
      <div className={classes["Cast__wrapper--inner"]}>
        <div className={classes["Cast__wrapper-inner-grid"]}>
          <HeaderImageInfo
            img="https://m.media-amazon.com/images/M/MV5BYTNkMDMxMDMtMDlhNi00MzQxLTk4NTAtODc0YTFmNGVlNDAyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UX67_CR0,0,67,98_AL_.jpg"
            title="Seven Years in Tibet"
            year="1997"
            link={`/movies/${id}`}
            heading="Photo Gallery"
          />

          <div className={classes["Cast__wrapper--creators"]}>
            <div>
              <h5>
                <span>Directed by</span>
                <span></span>
              </h5>
              <p>Jean-Jacques Annaud</p>
            </div>

            <div>
              <h5>
                <span>Writers</span>
                <span></span>
              </h5>
              <p>Heinrich Harrer</p>
              <p>Becky Jonhston</p>
            </div>
          </div>

          <div className={classes["Cast__wrapper--body"]}>
            <p>
              <strong>Cast</strong>
            </p>
            <div className={classes["Cast__wrapper--body__grid"]}>
              <div>
                {" "}
                <figure>
                  <img
                    title="img"
                    alt="img"
                    src="https://m.media-amazon.com/images/M/MV5BMjA1MjE2MTQ2MV5BMl5BanBnXkFtZTcwMjE5MDY0Nw@@._V1_UX32_CR0,0,32,44_AL_.jpg"
                  />
                </figure>
                <p>Brad Pitt</p>
                <div>
                  <span> ... </span>
                  <p>Heinrich Harrer</p>
                </div>
              </div>
              <div>
                {" "}
                <figure>
                  <img
                    title="img"
                    alt="img"
                    src="https://m.media-amazon.com/images/M/MV5BMjA1MjE2MTQ2MV5BMl5BanBnXkFtZTcwMjE5MDY0Nw@@._V1_UX32_CR0,0,32,44_AL_.jpg"
                  />
                </figure>
                <p>Brad Pitt</p>
                <div>
                  <span> ... </span>
                  <p>Heinrich Harrer</p>
                </div>
              </div>
              <div>
                {" "}
                <figure>
                  <img
                    title="img"
                    alt="img"
                    src="https://m.media-amazon.com/images/M/MV5BMjA1MjE2MTQ2MV5BMl5BanBnXkFtZTcwMjE5MDY0Nw@@._V1_UX32_CR0,0,32,44_AL_.jpg"
                  />
                </figure>
                <p>Brad Pitt</p>
                <div>
                  <span> ... </span>
                  <p>Heinrich Harrer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cast;
