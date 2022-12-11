import { useSelector } from "react-redux";
import DetailsList from "./DetailsList";
import MovieSectionTitle from "./MovieSectionTitle";
import classes from "./styles/StoryLine.module.css";

const StoryLine = () => {
  const synopsis = useSelector(
    (state) => state.singleMovie.singleMovie.synopsis
  );
  const selectGenres = useSelector((state) => {
    return state.singleMovie.singleMovie.genres;
  });

  return (
    <section className={classes["story-line"]}>
      <MovieSectionTitle moreInfo={false}>Storyline</MovieSectionTitle>
      <p>{synopsis}</p>
      <DetailsList
        details={[
          {
            description: "taglines",
            body: ["At the end of the world his real journey began."],
          },
          {
            description: "genres",
            body: selectGenres ? selectGenres : [],
          },
          {
            additionalLinks: [
              {
                title: "Parents guide",
                link: "/cast-and-crew",
              },
            ],
          },
        ]}
      />
    </section>
  );
};

export default StoryLine;
