import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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
import GlobalLoader from "../components/UI/GlobalLoader";

import { db } from "../config/config";

import classes from "./styles/Actor.module.css";

const Person = () => {
  const { id } = useParams();

  const [actorState, setActorState] = useState(null);

  useEffect(() => {
    async function fetching() {
      const document = await getDoc(doc(db, "actors", id));

      if (document.exists()) {
        setActorState(document.data());
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
            style={{ backgroundImage: `url(${actorState.main_image})` }}
          >
            <br />
            <Title
              titleInfo={{
                title: actorState.name,
                additional: [],
              }}
            />

            <HeroBanner
              images={[
                actorState.main_image,
                actorState.video_placeholder_image,
              ]}
              photosLink={`/actor-gallery/${id}`}
            />
            <GridTwoColumns sizing="3/4" layoutClasses="p1-rem">
              <ShortDescription shortInfo={actorState.short_bio} />
            </GridTwoColumns>
          </div>
        </div>
      </section>
      {/* <section className={`${classes["actor__additional"]} ptop2-rem`}>
        <div className="main-container">
          <GridTwoColumns sizing="3/4">
            <div>
              <Photos
                photos={actorState.photos}
                layoutClasses="mbot1-rem"
                link={`/actor-gallery/${id}`}
              />
              <KnownFor
                knownFor={actorState.known_for}
                layoutClasses="mbot2-rem"
              />

              <Filmography
                films={actorState.filmography}
                layoutClasses="mtop2-rem mbot2-rem"
              />

              <DidYouKnow
                facts={actorState.did_you_know}
                layoutClasses="mbot1-rem"
              />
            </div>
          </GridTwoColumns>
        </div>
      </section> */}
    </main>
  ) : (
    <GlobalLoader bgColor="#1F1F1F" />
  );
};

export default Person;
