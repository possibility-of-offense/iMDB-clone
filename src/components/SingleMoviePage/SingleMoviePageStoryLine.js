import DetailsList from "../General/SinglePage/DetailsList";
import SectionTitle from "../General/SinglePage/SectionTitle";
import classes from "./styles/SingleMoviePageStoryLine.module.css";

const SingleMoviePageStoryLine = ({
  synopsis,
  genres,
  layoutClasses,
  authorId,
}) => {
  const layoutClassesConditional = synopsis > 0 ? layoutClasses : "mbot2-rem";

  return (
    <section className={classes["story-line"]}>
      <SectionTitle
        moreInfo={false}
        layoutClasses={layoutClassesConditional}
        authorId={authorId}
        editLink="edit-storyline"
      >
        Storyline
      </SectionTitle>

      {synopsis?.storyline ? (
        <p>{synopsis.storyline}</p>
      ) : (
        <h3 className="pbot1-rem">No storyline info yet!</h3>
      )}
      <DetailsList
        details={[
          {
            description: "taglines",
            body: synopsis.taglines,
          },
          {
            description: "genres",
            body: genres ? genres : [],
          },
        ]}
      />
    </section>
  );
};

export default SingleMoviePageStoryLine;
