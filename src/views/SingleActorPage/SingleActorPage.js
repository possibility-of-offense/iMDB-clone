// React Hooks
import { useEffect, useState } from "react";

// React Router hooks
import { useParams, useNavigate } from "react-router-dom";

// Firebase SDK functions
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

// Config references
import { db } from "../../config/config";

// Components
import SinglePageTitle from "../../components/General/SinglePage/SinglePageTitle";
import SinglePageHeroBanner from "../../components/General/SinglePage/SinglePageHeroBanner";
import SinglePageSubNav from "../../components/General/SinglePage/SinglePageSubNav";
import SingleMoviePhotos from "../../components/SingleMoviePage/SingleMoviePagePhotos";
import SinglePageShortDescription from "../../components/General/SinglePage/SinglePageShortDescription";
import SingleActorPageFilmography from "../../components/SingleActorPage/SingleActorPageFilmography";
import SingleActorPageKnownFor from "../../components/SingleActorPage/SingleActorPageKnownFor";
import SinglePageDidYouKnow from "../../components/General/SinglePage/SinglePageDidYouKnow";

import GridTwoColumns from "../../components/UI/Layout/GridTwoColumns";
import GlobalLoader from "../../components/UI/Loaders/GlobalLoader";

// Classes
import classes from "./styles/SingleActorPage.module.css";

const SingleActorPage = () => {
  // Actor id
  const { id } = useParams();
  // React Router hooks
  const navigate = useNavigate();

  // State variables
  const [actorState, setActorState] = useState(null);

  useEffect(() => {
    async function fetching() {
      try {
        // Get actor document
        const actorDoc = await getDoc(doc(db, "actors", id));

        if (actorDoc.exists()) {
          setActorState(actorDoc.data());
        } else {
          navigate("/?no-actor");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetching();
  }, []);

  return actorState ? (
    <main className={`${classes["actor"]} pbot2-rem`}>
      <section className="main-container__bg no-paddings">
        <div className="main-container">
          <div
            className={classes[`container-actor__inner`]}
            style={{ backgroundImage: `url(${actorState.actorMainImage})` }}
          >
            <SinglePageSubNav />
            <SinglePageTitle
              titleInfo={{
                title: actorState.actorName,
                additional: [],
              }}
            />

            <SinglePageHeroBanner
              images={[
                actorState.actorMainImage,
                actorState.actorVideoPlaceholderImage,
              ]}
              photosLink={`/actor-gallery/${id}`}
            />
            <GridTwoColumns sizing="3/4" layoutClasses="p1-rem">
              <SinglePageShortDescription
                shortInfo={actorState.actorShortBio}
              />
            </GridTwoColumns>
          </div>
        </div>
      </section>
      <section className={`${classes["actor__additional"]} ptop2-rem`}>
        <div className="main-container">
          <GridTwoColumns sizing="3/4">
            <div>
              <SingleMoviePhotos
                photos={actorState.actorPhotos ? actorState.actorPhotos : []}
                layoutClasses="mbot1-rem"
                link={`/actor-gallery/${id}`}
              />

              <SingleActorPageKnownFor
                knownFor={actorState.actorKnownFor}
                layoutClasses="mbot1-rem"
              />

              <SingleActorPageFilmography
                films={actorState.filmography ? actorState.filmography : []}
                layoutClasses="mbot1-rem"
              />

              <SinglePageDidYouKnow
                facts={
                  actorState.actorDidYouKnow ? actorState.actorDidYouKnow : {}
                }
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
