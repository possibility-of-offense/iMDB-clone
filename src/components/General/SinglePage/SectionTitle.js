import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../config/config";

// Classes and images
import classes from "./styles/SectionTitle.module.css";
import edit from "./imgs/edit.png";
import { useSelector } from "react-redux";

const SectionTitle = ({
  children,
  count,
  moreInfo,
  layoutClasses,
  link,
  authorId,
  editLink,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div
      className={`${classes["movie-section-title"]} ${
        moreInfo ? classes["movie-section-title--cursor"] : ""
      } ${layoutClasses}`}
    >
      <div onClick={handleNavigate}>
        <h2>{children}</h2>
        <span>{count}</span>
        {moreInfo && (
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            className="ipc-icon ipc-icon--chevron-right-inline ipc-icon--inline ipc-title-link ipc-title-link-chevron ipc-title--nomargin"
            id="iconContext-chevron-right-inline"
            viewBox="0 0 24 24"
            role="presentation"
          >
            <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path>
          </svg>
        )}
      </div>
      {auth && authorId && auth.currentUser?.uid === authorId && (
        <div>
          <Link to={editLink}>
            <img title="Edit" alt="Edit" src={edit} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default SectionTitle;
