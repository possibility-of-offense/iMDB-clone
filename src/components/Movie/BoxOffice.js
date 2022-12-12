import SectionTitle from "./SectionTitle";
import classes from "./styles/BoxOffice.module.css";

const BoxOffice = ({ boxOffice, layoutClasses }) => {
  return (
    <section className={classes["box-office"]}>
      <SectionTitle moreInfo={false} layoutClasses={layoutClasses}>
        Box office
      </SectionTitle>
      <div className={classes["box-office__grid"]}>
        {boxOffice.budget && (
          <div>
            <h4>Budget</h4>
            <p>{boxOffice.budget}</p>
          </div>
        )}
        {boxOffice.expected_profit && (
          <div>
            <h4>Expected Profit</h4>
            <p>{boxOffice.expected_profit}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BoxOffice;
