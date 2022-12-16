import SectionTitle from "./SectionTitle";
import classes from "./styles/DidYouKnow.module.css";

const DidYouKnow = ({ facts, layoutClasses }) => {
  const listFacts = Object.entries(facts).map((el) => ({
    id: el[0],
    ...el[1],
  }));

  return (
    <section className={classes["did-you-know"]}>
      <SectionTitle moreInfo={false} layoutClasses={layoutClasses}>
        Did you know
      </SectionTitle>
      {listFacts?.length > 0 && (
        <div className={classes["did-you-know__list"]}>
          {listFacts.map((el) => (
            <div key={el.id}>
              <h4>{el.category}</h4>
              <p>{el.text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DidYouKnow;
