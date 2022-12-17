// import DetailsList from "../General/DetailsList";
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
      >
        Storyline
      </SectionTitle>
      {synopsis && <p>{synopsis}</p>}
      {/* <DetailsList
        details={[
          {
            description: "taglines",
            body: ["At the end of the world his real journey began."],
          },
          {
            description: "genres",
            body: genres ? genres : [],
          },
        ]}
      /> */}
      {synopsis ? "" : <h3 className="pbot2-rem">No synopsis info yet!</h3>}
    </section>
  );
};

export default SingleMoviePageStoryLine;
