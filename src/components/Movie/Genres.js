import classes from "./styles/Genres.module.css";

const Genres = ({ genres }) => {
  return (
    <section className={classes["genres"]}>
      <ul>
        {genres?.length > 0 && genres.map((el, i) => <li key={i}>{el}</li>)}
      </ul>
    </section>
  );
};

export default Genres;
