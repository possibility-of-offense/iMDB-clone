import { Link, useNavigate } from "react-router-dom";
import { upperCaseFirstWord } from "../../helpers/helpers";
import classes from "./styles/SingleMoviePageGenres.module.css";

const SingleMoviePageGenres = ({ genres }) => {
  const navigate = useNavigate();

  const handleKeyDown = (el) => {
    navigate(`/genres/${el}`);
  };

  if (genres && Array.isArray(genres) && genres.length > 0) {
    return (
      <section className={classes["genres"]}>
        <ul>
          <li>
            <Link to="/genres/testing-link">Testing link</Link>
          </li>
          {genres?.length > 0 &&
            genres.map((el, i) => (
              <li key={i}>
                <Link
                  onKeyDown={handleKeyDown.bind(null, el)}
                  to={`/genres/${el}`}
                >
                  {upperCaseFirstWord(el)}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    );
  }
};

export default SingleMoviePageGenres;
