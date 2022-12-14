import classes from "./styles/SinglePageTitle.module.css";

const SinglePageTitle = ({ titleInfo }) => {
  const { title, additional } = titleInfo;

  if (title && additional) {
    return (
      <div className={classes["title"]}>
        <h1>{title}</h1>
        <div className={classes["year-duration-wrapper"]}>
          <ul>
            {additional.length > 0 &&
              additional.map((el) => (
                <li key={String(el).split(" ").join("").toLowerCase()}>{el}</li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default SinglePageTitle;
