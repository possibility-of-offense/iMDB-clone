import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeroBanner from "../components/Movie/HeroBanner";
import ShortDescription from "../components/Movie/ShortDescription";
import Title from "../components/Movie/Title";
import GridTwoColumns from "../components/UI/GridTwoColumns";
import { db } from "../config/config";

const Actor = () => {
  const titleInfo = {
    title: "Brad Pitt",
    additional: ["Producer", "Actor", "Executive"],
  };

  const { id } = useParams();

  const [actorState, setActorState] = useState(null);

  useEffect(() => {
    async function fetching() {
      const data = await getDocs(collection(db, "actors", id, "actor_page"));

      const mapped = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      if (mapped.length > 0) {
        setActorState(mapped);
      }
    }
    fetching();
  }, []);

  return actorState ? (
    <main>
      <section
        className="main-container__bg no-paddings"
        style={{ display: "grid" }}
      >
        <div className="container-single-movie" style={{ display: "flex" }}>
          <div
            className="container-single-movie__inner"
            style={{ backgroundImage: `url(${actorState[0].main_image})` }}
          >
            <br />
            <Title
              titleInfo={{
                title: actorState[0].name,
                additional: [],
              }}
            />

            <HeroBanner
              images={[
                actorState[0].main_image,
                actorState[0].video_placeholder_image,
              ]}
            />
            <GridTwoColumns sizing="3/4">
              <ShortDescription shortInfo={actorState[0].short_bio} />
            </GridTwoColumns>
          </div>
        </div>
      </section>
    </main>
  ) : (
    <h1>No info yet</h1>
  );
};

export default Actor;
