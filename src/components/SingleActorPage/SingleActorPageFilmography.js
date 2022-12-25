import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { db } from "../../config/config";
import useFetchData from "../../hooks/useFetchData";
import SectionTitle from "../General/SinglePage/SectionTitle";

import classes from "./styles/SingleActorPageFilmography.module.css";

const SingleActorPageFilmography = ({ layoutClasses, films }) => {
  const { id } = useParams();
  const { data } = useFetchData(() =>
    getDocs(collection(db, "actors", id, "filmography"))
  );

  const listFilms = data.docs?.map((doc) => ({ id: doc.id, ...doc.data() }));

  return (
    <section>
      <SectionTitle layoutClasses={layoutClasses}>Filmography</SectionTitle>
      <div className={listFilms?.length > 0 && classes["filmography__grid"]}>
        {listFilms && listFilms.length > 0 ? (
          listFilms.map((el) => (
            <div key={el.id}>
              <figure>
                <img src={el.movieMainImage} alt="img" title="img" />
              </figure>
              <div>
                <div>
                  <h4>
                    <Link to={`/movies/${el.movieId.trim()}`}>
                      {el.movieTitle}
                    </Link>
                  </h4>
                  <p>{el.movieCharacterName}</p>
                </div>
                <p>{el.movieYear}</p>
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

export default SingleActorPageFilmography;
