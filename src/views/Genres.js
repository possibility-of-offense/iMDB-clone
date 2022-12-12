import { useParams } from "react-router-dom";
import classes from "./styles/Genres.module.css";

const Genres = () => {
  const { id: title } = useParams();

  return (
    <section className={classes["genres__wrapper"]}>
      <div className={classes["genres__wrapper--inner"]}>
        <div className={classes["genres__wrapper-inner-grid"]}>
          <h2>{title} Movies</h2>
          <div className={classes["genres__wrapper-inner-grid__items"]}>
            <div className={classes["grid__item"]}>
              <figure>
                <img
                  src="https://m.media-amazon.com/images/M/MV5BNDRmNDliZTktZjA0Ny00ZjgxLTlmZTgtMWUxMzBiMDk1OTU2XkEyXkFqcGdeQXVyMTU5OTc2NTk@._V1_UX67_CR0,0,67,98_AL_.jpg"
                  alt="img"
                  title="img"
                />
              </figure>
              <div>
                <h3>1. Willow (2022)</h3>
                <p className={classes["genres"]}>Action, Adventure, Drama</p>
                <p className={classes["short-info"]}>
                  20 years after vanquishing the wicked queen Bavmorda, the
                  sorcerer Willow Ufgood leads a group of misfits on a dangerous
                  rescue mission into the unknown.
                </p>
                <p className={classes["stars"]}>
                  Stars:
                  <p>
                    <a href="#">Ruby Cruz</a>,<a href="#">Ruby Cruz</a>,
                    <a href="#">Ruby Cruz</a>,<a href="#">Ruby Cruz</a>,
                    <a href="#">Ruby Cruz</a>
                  </p>
                </p>
              </div>
            </div>
            <div className={classes["grid__item"]}>
              <figure>
                <img
                  src="https://m.media-amazon.com/images/M/MV5BNDRmNDliZTktZjA0Ny00ZjgxLTlmZTgtMWUxMzBiMDk1OTU2XkEyXkFqcGdeQXVyMTU5OTc2NTk@._V1_UX67_CR0,0,67,98_AL_.jpg"
                  alt="img"
                  title="img"
                />
              </figure>
              <div>
                <h3>1. Willow (2022)</h3>
                <p className={classes["genres"]}>Action, Adventure, Drama</p>
                <p className={classes["short-info"]}>
                  20 years after vanquishing the wicked queen Bavmorda, the
                  sorcerer Willow Ufgood leads a group of misfits on a dangerous
                  rescue mission into the unknown.
                </p>
                <p className={classes["stars"]}>
                  Stars:
                  <p>
                    <a href="#">Ruby Cruz</a>,<a href="#">Ruby Cruz</a>,
                    <a href="#">Ruby Cruz</a>,<a href="#">Ruby Cruz</a>,
                    <a href="#">Ruby Cruz</a>
                  </p>
                </p>
              </div>
            </div>
            <div className={classes["grid__item"]}>
              <figure>
                <img
                  src="https://m.media-amazon.com/images/M/MV5BNDRmNDliZTktZjA0Ny00ZjgxLTlmZTgtMWUxMzBiMDk1OTU2XkEyXkFqcGdeQXVyMTU5OTc2NTk@._V1_UX67_CR0,0,67,98_AL_.jpg"
                  alt="img"
                  title="img"
                />
              </figure>
              <div>
                <h3>1. Willow (2022)</h3>
                <p className={classes["genres"]}>Action, Adventure, Drama</p>
                <p className={classes["short-info"]}>
                  20 years after vanquishing the wicked queen Bavmorda, the
                  sorcerer Willow Ufgood leads a group of misfits on a dangerous
                  rescue mission into the unknown.
                </p>
                <p className={classes["stars"]}>
                  Stars:
                  <p>
                    <a href="#">Ruby Cruz</a>,<a href="#">Ruby Cruz</a>,
                    <a href="#">Ruby Cruz</a>,<a href="#">Ruby Cruz</a>,
                    <a href="#">Ruby Cruz</a>
                  </p>
                </p>
              </div>
            </div>
            <div className={classes["grid__item"]}>
              <figure>
                <img
                  src="https://m.media-amazon.com/images/M/MV5BNDRmNDliZTktZjA0Ny00ZjgxLTlmZTgtMWUxMzBiMDk1OTU2XkEyXkFqcGdeQXVyMTU5OTc2NTk@._V1_UX67_CR0,0,67,98_AL_.jpg"
                  alt="img"
                  title="img"
                />
              </figure>
              <div>
                <h3>1. Willow (2022)</h3>
                <p className={classes["genres"]}>Action, Adventure, Drama</p>
                <p className={classes["short-info"]}>
                  20 years after vanquishing the wicked queen Bavmorda, the
                  sorcerer Willow Ufgood leads a group of misfits on a dangerous
                  rescue mission into the unknown.
                </p>
                <p className={classes["stars"]}>
                  Stars:
                  <p>
                    <a href="#">Ruby Cruz</a>,<a href="#">Ruby Cruz</a>,
                    <a href="#">Ruby Cruz</a>,<a href="#">Ruby Cruz</a>,
                    <a href="#">Ruby Cruz</a>
                  </p>
                </p>
              </div>
            </div>
            <div className={classes["grid__item"]}>
              <figure>
                <img
                  src="https://m.media-amazon.com/images/M/MV5BNDRmNDliZTktZjA0Ny00ZjgxLTlmZTgtMWUxMzBiMDk1OTU2XkEyXkFqcGdeQXVyMTU5OTc2NTk@._V1_UX67_CR0,0,67,98_AL_.jpg"
                  alt="img"
                  title="img"
                />
              </figure>
              <div>
                <h3>1. Willow (2022)</h3>
                <p className={classes["genres"]}>Action, Adventure, Drama</p>
                <p className={classes["short-info"]}>
                  20 years after vanquishing the wicked queen Bavmorda, the
                  sorcerer Willow Ufgood leads a group of misfits on a dangerous
                  rescue mission into the unknown.
                </p>
                <p className={classes["stars"]}>
                  Stars:
                  <p>
                    <a href="#">Ruby Cruz</a>,<a href="#">Ruby Cruz</a>,
                    <a href="#">Ruby Cruz</a>,<a href="#">Ruby Cruz</a>,
                    <a href="#">Ruby Cruz</a>
                  </p>
                </p>
              </div>
            </div>
            <div className={classes["grid__item"]}>
              <figure>
                <img
                  src="https://m.media-amazon.com/images/M/MV5BNDRmNDliZTktZjA0Ny00ZjgxLTlmZTgtMWUxMzBiMDk1OTU2XkEyXkFqcGdeQXVyMTU5OTc2NTk@._V1_UX67_CR0,0,67,98_AL_.jpg"
                  alt="img"
                  title="img"
                />
              </figure>
              <div>
                <h3>1. Willow (2022)</h3>
                <p className={classes["genres"]}>Action, Adventure, Drama</p>
                <p className={classes["short-info"]}>
                  20 years after vanquishing the wicked queen Bavmorda, the
                  sorcerer Willow Ufgood leads a group of misfits on a dangerous
                  rescue mission into the unknown.
                </p>
                <p className={classes["stars"]}>
                  Stars:
                  <p>
                    <a href="#">Ruby Cruz</a>,<a href="#">Ruby Cruz</a>,
                    <a href="#">Ruby Cruz</a>,<a href="#">Ruby Cruz</a>,
                    <a href="#">Ruby Cruz</a>
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Genres;
