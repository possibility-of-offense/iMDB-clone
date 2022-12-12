import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Filmography from "../components/Actor/Filmography";
import KnownFor from "../components/Actor/KnownFor";
import DidYouKnow from "../components/Movie/DidYouKnow";
import HeroBanner from "../components/Movie/HeroBanner";
import Photos from "../components/Movie/Photos";
import ShortDescription from "../components/Movie/ShortDescription";
import Title from "../components/Movie/Title";
import GridTwoColumns from "../components/UI/GridTwoColumns";
import { db } from "../config/config";

import classes from "./styles/Actor.module.css";

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
    <main className={`${classes["actor"]} pbot2-rem`}>
      <section
        className="main-container__bg no-paddings"
        style={{ display: "grid" }}
      >
        <div className="main-container" style={{ display: "flex" }}>
          <div
            className={classes[`container-actor__inner`]}
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
            <GridTwoColumns sizing="3/4" layoutClasses="p1-rem">
              <ShortDescription shortInfo={actorState[0].short_bio} />
            </GridTwoColumns>
          </div>
        </div>
      </section>
      <section className={`${classes["actor__additional"]} ptop2-rem`}>
        <div className="main-container">
          <GridTwoColumns sizing="3/4">
            <div>
              <Photos photos={actorState[0].photos} layoutClasses="mbot1-rem" />
              <KnownFor
                knownFor={actorState[0].known_for}
                layoutClasses="mbot2-rem"
              />
              <Filmography
                films={actorState[0].filomography}
                layoutClasses="mtop2-rem mbot1-rem"
              />
              <DidYouKnow
                facts={actorState[0].did_you_know}
                layoutClasses="mbot1-rem"
              />
            </div>
          </GridTwoColumns>
        </div>
      </section>
    </main>
  ) : (
    <h1>No info yet</h1>
  );
};

export default Actor;
