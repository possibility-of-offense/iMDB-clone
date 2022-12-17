import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SinglePageTitle from "../components/General/SinglePage/SinglePageTitle";
import SinglePageHeroBanner from "../components/General/SinglePage/SinglePageHeroBanner";
import SinglePageSubNav from "../components/General/SinglePage/SinglePageSubNav";
import SingleMoviePhotos from "../components/SingleMoviePage/SingleMoviePagePhotos";
import SinglePageShortDescription from "../components/General/SinglePage/SinglePageShortDescription";
import SingleActorPageFilmography from "../components/SingleActorPage/SingleActorPageFilmography";
import SingleActorPageKnownFor from "../components/SingleActorPage/SingleActorPageKnownFor";
import SinglePageDidYouKnow from "../components/General/SinglePage/SinglePageDidYouKnow";

import GridTwoColumns from "../components/UI/Layout/GridTwoColumns";
import GlobalLoader from "../components/UI/Loaders/GlobalLoader";

import { db } from "../config/config";

import classes from "./styles/SingleActorPage.module.css";

const SingleActorPage = () => {
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
        // style={{ display: "grid" }}
      >
        <div className="main-container">
          <div
            className={classes[`container-actor__inner`]}
            style={{ backgroundImage: `url(${actorState.main_image})` }}
          >
            <SinglePageSubNav />
            <SinglePageTitle
              titleInfo={{
                title: actorState.name,
                additional: [],
              }}
            />

            <SinglePageHeroBanner
              images={[
                actorState.main_image,
                actorState.video_placeholder_image,
              ]}
              photosLink={`/actor-gallery/${id}`}
            />
            <GridTwoColumns sizing="3/4" layoutClasses="p1-rem">
              <SinglePageShortDescription shortInfo={actorState.short_bio} />
            </GridTwoColumns>
          </div>
        </div>
      </section>
      <section className={`${classes["actor__additional"]} ptop2-rem`}>
        <div className="main-container">
          <GridTwoColumns sizing="3/4">
            <div>
              <SingleMoviePhotos
                photos={actorState.photos}
                layoutClasses="mbot1-rem"
                link={`/actor-gallery/${id}`}
              />
              {/* <SingleActorPageKnownFor
                knownFor={actorState.known_for}
                layoutClasses="mbot2-rem"
              /> */}

              <SingleActorPageFilmography
                films={actorState.filmography}
                layoutClasses="mtop2-rem mbot2-rem"
              />

              <SinglePageDidYouKnow
                facts={actorState.did_you_know}
                layoutClasses="mbot1-rem"
              />
            </div>
          </GridTwoColumns>
        </div>
      </section>
    </main>
  ) : (
    <GlobalLoader bgColor="#1F1F1F" />
  );
};

export default SingleActorPage;
