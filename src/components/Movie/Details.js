import DetailsList from "./DetailsList";
import MovieSectionTitle from "./MovieSectionTitle";
import classes from "./styles/Details.module.css";

const Details = () => {
  return (
    <section className={classes["details"]}>
      <MovieSectionTitle moreInfo={false}>Details</MovieSectionTitle>

      <DetailsList
        details={[
          {
            description: "Release Date",
            body: ["October 10, 1997 (United States)"],
          },
          {
            description: "Countries of origin",
            body: ["United States", "United kingdom"],
          },
          {
            description: "Languages",
            body: ["English", "German", "Mandarin", "Tibetan", "Hindi"],
          },
          {
            description: "Filming locations",
            body: ["La Plata", "Buenos Aires", "Argentina"],
          },
          {
            description: "Production companies",
            body: [
              "Mandalay Entertainment",
              "Reperage & Vanguard Films",
              "Applecross",
            ],
          },
        ]}
      />
    </section>
  );
};

export default Details;
