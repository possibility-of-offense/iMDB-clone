import SectionTitle from "../General/SinglePage/SectionTitle";
import classes from "./styles/SingleMoviePageBoxOffice.module.css";

const SingleMoviePageBoxOffice = ({ boxOffice, layoutClasses, authorId }) => {
  const layoutClassesConditional =
    Object.values(boxOffice).length > 0 ? layoutClasses : "mbot2-rem";

  return (
    <section className={classes["box-office"]}>
      <SectionTitle
        authorId={authorId}
        moreInfo={false}
        layoutClasses={layoutClassesConditional}
        editLink="edit-box-office"
      >
        Box office
      </SectionTitle>
      <div className={classes["box-office__grid"]}>
        {boxOffice.budget && (
          <div>
            <h4>Budget</h4>
            <p>{boxOffice.budget}</p>
          </div>
        )}
        {Object.values(boxOffice).length > 0 ? (
          <div>
            <h4>Expected Profit</h4>
            <p>{boxOffice.expectedProfit}</p>
          </div>
        ) : (
          <h3 className="pbot1-rem">No box office info yet!</h3>
        )}
      </div>
    </section>
  );
};

export default SingleMoviePageBoxOffice;
