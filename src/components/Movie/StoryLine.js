import DetailsList from "./DetailsList";
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
