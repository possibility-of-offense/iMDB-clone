import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RedirectionModal from "../../components/UI/Modals/RedirectionModal";
import { db } from "../../config/config";
import { upperCaseFirstWord } from "../../helpers/helpers";
import classes from "./styles/GenresPage.module.css";

const Genres = () => {
  const { id: title } = useParams();

  const [genresState, setGenresState] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetching = async () => {
      setStatus("pending");

      try {
        const docs = await getDocs(
          query(
            collection(db, "genres"),
            where("movieGenres", "array-contains", title)
          )
        );

        const mapped = docs.docs.map((el) => ({ id: el.id, ...el.data() }));
        setGenresState(mapped);
      } catch (error) {
        console.log(error);
      } finally {
        setStatus("finished");
      }
    };

    fetching();
  }, []);

  const navigate = useNavigate();

  return (
    <section className={classes["genres__wrapper"]}>
      <div className={classes["genres__wrapper--inner"]}>
        <div className={classes["genres__wrapper-inner-grid"]}>
          <h2>{upperCaseFirstWord(title)} Movies</h2>
          <div className={classes["genres__wrapper-inner-grid__items"]}>
            {genresState.length > 0
              ? genresState.map(
                  (
                    {
                      movieTitle,
                      movieYear,
                      movieStars,
                      movieShortInfo,
                      movieGenres,
                      id,
                      movieId,
                      movieMainImage,
                    },
                    i
                  ) => (
                    <div key={id} className={classes["grid__item"]}>
                      <figure>
                        <img src={movieMainImage} alt="img" title="img" />
                      </figure>
                      <div>
                        <h3 onClick={() => navigate("/movies/" + movieId)}>
                          {i + 1}. {movieTitle} ({movieYear})
                        </h3>
                        <p className={classes["genres"]}>
                          {movieGenres?.join(", ")}
                        </p>
                        <p className={classes["short-info"]}>
                          {movieShortInfo}
                        </p>
                        <div className={classes["stars"]}>
                          Stars:
                          <p>
                            {movieStars &&
                              movieStars.length > 0 &&
                              movieStars.map((el, i, arr) => (
                                <Link key={el.actorId} to={`/actors/${el.id}`}>
                                  {el.actorName}/{el.actorCharacterName}
                                  {i === arr.length - 1 ? "" : ", "}
                                </Link>
                              ))}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )
              : status === "finished" && (
                  <RedirectionModal>No genre found</RedirectionModal>
                )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Genres;
