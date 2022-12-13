import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../config/config";
import { upperCaseFirstWord } from "../helpers/helpers";
import classes from "./styles/Genres.module.css";

const Genres = () => {
  const { id: title } = useParams();

  const [genresState, setGenresState] = useState([]);

  useEffect(() => {
    // if (genresState.length === 0) {
    const fetching = async () => {
      try {
        const docs = await getDocs(
          query(
            collection(db, "genres"),
            where("genres", "array-contains", title)
          )
        );

        const mapped = docs.docs.map((el) => ({ id: el.id, ...el.data() }));
        setGenresState(mapped);
      } catch (error) {
        console.log(error);
      }
    };

    fetching();
    // }
  }, []);

  const navigate = useNavigate();

  return (
    <section className={classes["genres__wrapper"]}>
      <div className={classes["genres__wrapper--inner"]}>
        <div className={classes["genres__wrapper-inner-grid"]}>
          <h2>{upperCaseFirstWord(title)} Movies</h2>
          <div className={classes["genres__wrapper-inner-grid__items"]}>
            {genresState.length > 0 &&
              genresState.map(
                (
                  { name, year, stars, short_info, genres, movieId, id, image },
                  i
                ) => (
                  <div key={id} className={classes["grid__item"]}>
                    <figure>
                      <img src={image} alt="img" title="img" />
                    </figure>
                    <div>
                      <h3 onClick={() => navigate("/movies/" + movieId)}>
                        {i + 1}. {name} ({year})
                      </h3>
                      <p className={classes["genres"]}>{genres?.join(", ")}</p>
                      <p className={classes["short-info"]}>{short_info}</p>
                      <div className={classes["stars"]}>
                        Stars:
                        <p>
                          {stars &&
                            Object.entries(stars).length > 0 &&
                            Object.entries(stars).map((el) => (
                              <Link key={el[0]} to={`/actors/${el[1].actorId}`}>
                                {el[1].name}
                              </Link>
                            ))}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Genres;
