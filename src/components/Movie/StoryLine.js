import DetailsList from "../General/DetailsList";
import SectionTitle from "./SectionTitle";
import classes from "./styles/StoryLine.module.css";

const StoryLine = ({ synopsis, genres, layoutClasses }) => {
  return (
    <section className={classes["story-line"]}>
      <SectionTitle moreInfo={false} layoutClasses={layoutClasses}>
        Storyline
      </SectionTitle>
      {synopsis && <p>{synopsis}</p>}
      <DetailsList
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
      />
    </section>
  );
};

export default StoryLine;
