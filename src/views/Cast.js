import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, doc, getDocs, where, getDoc } from "firebase/firestore";
import { db } from "../config/config";
import HeaderImageInfo from "../components/General/Diverse/HeaderImageInfo";
import classes from "./styles/Cast.module.css";

const Cast = () => {
  const { id } = useParams();

  const [topCastState, setTopCastState] = useState([]);

  useEffect(() => {
    if (topCastState.length === 0) {
      const fetching = async () => {
        try {
          const docs = await getDocs(collection(db, "movies", id, "top_cast"));
          if (docs.docs.length > 0) {
            const mapped = docs.docs.map((el) => ({ id: el.id, ...el.data() }));
            setTopCastState(mapped);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetching();
    }
  }, []);

  if (topCastState.length > 0) {
    const { name, year, directors, writers } = topCastState[0];

    return (
      <section className={classes["Cast__wrapper"]}>
        <div className={classes["Cast__wrapper--inner"]}>
          <div className={classes["Cast__wrapper-inner-grid"]}>
            <HeaderImageInfo
              img="https://m.media-amazon.com/images/M/MV5BYTNkMDMxMDMtMDlhNi00MzQxLTk4NTAtODc0YTFmNGVlNDAyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UX67_CR0,0,67,98_AL_.jpg"
              title={name}
              year={year}
              link={`/movies/${id}`}
              heading="Photo Gallery"
            />

            <div className={classes["Cast__wrapper--creators"]}>
              <div>
                <h5>
                  <span>Directed by</span>
                  <span></span>
                </h5>
                {directors.length > 0 &&
                  directors.map((director) => (
                    <p key={director.split(" ").join("")}>{director}</p>
                  ))}
              </div>

              <div>
                <h5>
                  <span>Writers</span>
                  <span></span>
                </h5>

                {writers.length > 0 &&
                  writers.map((writer) => (
                    <p key={writer.split(" ").join("")}>{writer}</p>
                  ))}
              </div>
            </div>

            <div className={classes["Cast__wrapper--body"]}>
              <p>
                <strong>Cast</strong>
              </p>
              <div className={classes["Cast__wrapper--body__grid"]}>
                {topCastState.length > 0 &&
                  topCastState.map((cast) => (
                    <div key={cast.id}>
                      <figure>
                        <img title="img" alt="img" src={cast.image} />
                      </figure>
                      <p>
                        <Link to={`/actors/${cast.actorId}`}>
                          {cast.actorName}
                        </Link>
                      </p>
                      <div>
                        <span> ... </span>
                        <p>{cast.characterName}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Cast;
