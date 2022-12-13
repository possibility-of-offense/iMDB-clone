import { Link, useNavigate } from "react-router-dom";
import { upperCaseFirstWord } from "../../helpers/helpers";
import classes from "./styles/Genres.module.css";

const Genres = ({ genres }) => {
  const navigate = useNavigate();
  const handleKeyDown = (el) => {
    navigate(`/genres/${el}`);
  };
  return (
    <section className={classes["genres"]}>
      <ul>
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
};

export default Genres;
