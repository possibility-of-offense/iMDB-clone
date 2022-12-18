import { Link } from "react-router-dom";
import classes from "./styles/HeaderImageInfo.module.css";

const HeaderImageInfo = ({ img, title, year, link, heading }) => {
  return (
    <div className={classes["HeaderImageInfo__wrapper--header"]}>
      <figure>
        <img title="img" alt="img" src={img} />
      </figure>
      <div>
        <h4>
          <Link to={link}>
            {title} {year && <span>({year})</span>}
          </Link>
        </h4>
        <h2>{heading}</h2>
      </div>
    </div>
  );
};

export default HeaderImageInfo;
