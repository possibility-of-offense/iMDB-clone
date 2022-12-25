import SectionTitle from "./SectionTitle";

import classes from "./styles/SinglePageDidYouKnow.module.css";

const SinglePageDidYouKnow = ({ facts, layoutClasses }) => {
  const listFacts = Object.entries(facts).map((el) => ({
    id: el[0],
    ...el[1],
  }));

  return (
    <section className={classes["did-you-know"]}>
      <SectionTitle moreInfo={false} layoutClasses={layoutClasses}>
        Did you know
      </SectionTitle>
      {listFacts?.length > 0 ? (
        <div className={classes["did-you-know__list"]}>
          {listFacts.map((el) => (
            <div key={el.id}>
              <h4>{el.category}</h4>
              <p>{el.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <h3 class="pbot2-rem">No info yet!</h3>
      )}
    </section>
  );
};

export default SinglePageDidYouKnow;
