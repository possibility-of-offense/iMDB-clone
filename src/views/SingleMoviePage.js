// Components
import SinglePageSubNav from "../components/General/SinglePage/SinglePageSubNav";
import SinglePageTitle from "../components/General/SinglePage/SinglePageTitle";
import SinglePageHeroBanner from "../components/General/SinglePage/SinglePageHeroBanner";
import SingleMoviePageGenres from "../components/SingleMoviePage/SingleMoviePageGenres";
import SinglePageShortDescription from "../components/General/SinglePage/SinglePageShortDescription";
import SingleMoviePageStuffMetaData from "../components/SingleMoviePage/SingleMoviePageStuffMetaData";

import GlobalLoader from "../components/UI/Loaders/GlobalLoader";
import GridTwoColumns from "../components/UI/Layout/GridTwoColumns";

// Hooks / Functions
import { useEffect } from "react";
import { fetchSingleMovie } from "../features/movies/singleMovieSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Classes
import classes from "./styles/SingleMoviePage.module.css";

// NOT VISIBLE YET
// import BoxOffice from "../components/SinglePageMovie/BoxOffice";
// import Details from "../components/SinglePageMovie/Details";
// import DetailsList from "../components/General/DetailsList";
// import DidYouKnow from "../components/SinglePageMovie/DidYouKnow";
// import Photos from "../components/SinglePageMovie/Photos";
// import StoryLine from "../components/SinglePageMovie/StoryLine";
// import TopCast from "../components/SinglePageMovie/TopCast";

const SingleMoviePage = () => {
  const dispatch = useDispatch();

  // Get params id
  const { id } = useParams();

  // Get singleMovie state
  const selectSingleMovie = useSelector((state) => state.singleMovie);

  // Destructure all state variables
  const {
    movieTitle,
    movieYear,
    movieDuration,
    movieMainImage,
    movieVideoPlaceholderImage,
    movieShortInfo,
    movieGenres,
    movieStuff,
    moviePhotos,
    movieDidYouKnow,
    movieSynopsis,
    movieBoxOffice,
  } = selectSingleMovie.singleMovie;

  const titleInfo = {
    title: movieTitle,
    additional: [movieYear, movieDuration],
  };

  const selectCreators = useSelector(
    (state) => state.singleMovie.singleMovie.creators
  );
  const membersData = selectCreators;
  let mappedMembersData;

  if (membersData) {
    mappedMembersData = Object.entries(membersData)
      .map((el) => {
        if (el[0] === "writers") {
          return {
            description: "writer",
            body: [...Object.values(el[1])],
          };
        } else if (el[0] === "directors") {
          return {
            description: "director",
            body: [...Object.values(el[1])],
          };
        }
      })
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  useEffect(() => {
    dispatch(fetchSingleMovie(id));
  }, []);

  const status = selectSingleMovie.status;

  if (status === "loading") {
    return <GlobalLoader bgColor="#1F1F1F" />;
  } else if (status === "succeeded") {
    return (
      <main className={`${classes["single-movie"]} pbot2-rem`}>
        <section className="main-container__bg">
          <div className="main-container">
            <SinglePageSubNav />
            <SinglePageTitle titleInfo={titleInfo} />
            <SinglePageHeroBanner
              images={[movieMainImage, movieVideoPlaceholderImage]}
              photosLink={`/movie-gallery/${id}`}
            />
            <GridTwoColumns sizing="3/4">
              <div>
                <SingleMoviePageGenres genres={movieGenres} />
                <SinglePageShortDescription shortInfo={movieShortInfo} />
                <SingleMoviePageStuffMetaData stuff={movieStuff} />
              </div>
            </GridTwoColumns>
          </div>
        </section>

        {/* // NOT VISIBLE YET */}
        {/* <section className={classes["single-movie__additional"]}>
          <div className="main-container">
            <GridTwoColumns sizing="3/4">
              <div>
                <Photos
                  photos={photos}
                  layoutClasses="mbot2-rem"
                  link={`/movie-gallery/${id}`}
                />
                <TopCast
                  layoutClasses="mbot1-rem"
                  id={id}
                  link={`/cast/${id}`}
                />
                <DetailsList
                  details={[
                    ...mappedMembersData,
                    {
                      description: "All cast & crew",
                      body: "/cast/" + id,
                    },
                  ]}
                />
                <StoryLine
                  genres={genres}
                  synopsis={synopsis}
                  layoutClasses="mbot1-rem"
                />
                <DidYouKnow facts={did_you_know} layoutClasses="mbot1-rem" />
                <Details />
                <BoxOffice boxOffice={box_office} layoutClasses="mbot1-rem" />
              </div>
            </GridTwoColumns>
          </div>
        </section> */}
      </main>
    );
  }
};

export default SingleMoviePage;