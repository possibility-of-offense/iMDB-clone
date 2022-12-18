// Components
import SingleMoviePageSubNav from "../../components/SingleMoviePage/SingleMoviePageSubNav";

import SinglePageTitle from "../../components/General/SinglePage/SinglePageTitle";
import SinglePageHeroBanner from "../../components/General/SinglePage/SinglePageHeroBanner";
import SingleMoviePageGenres from "../../components/SingleMoviePage/SingleMoviePageGenres";
import SinglePageShortDescription from "../../components/General/SinglePage/SinglePageShortDescription";
import SingleMoviePageStuffMetaData from "../../components/SingleMoviePage/SingleMoviePageStuffMetaData";
import SingleMoviePagePhotos from "../../components/SingleMoviePage/SingleMoviePagePhotos";
import SingleMoviePageTopCast from "../../components/SingleMoviePage/SingleMoviePageTopCast";
import SingleMoviePageBoxOffice from "../../components/SingleMoviePage/SingleMoviePageBoxOffice";
import SingleMoviePageStoryLine from "../../components/SingleMoviePage/SingleMoviePageStoryLine";

import GlobalLoader from "../../components/UI/Loaders/GlobalLoader";
import GridTwoColumns from "../../components/UI/Layout/GridTwoColumns";

// Hooks / Functions
import { useEffect } from "react";
import { fetchSingleMovie } from "../../features/movies/singleMovieSlice";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useParams } from "react-router-dom";

// Classes
import classes from "./styles/SingleMoviePage.module.css";

// NOT VISIBLE YET
// import Details from "../components/SinglePageMovie/Details";
// import DetailsList from "../components/General/DetailsList";
// import DidYouKnow from "../components/SinglePageMovie/DidYouKnow";

const SingleMoviePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

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
    authorId,
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
            <SingleMoviePageSubNav link={`/cast/${id}`} />
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

        <section className={classes["single-movie__additional"]}>
          <div className="main-container">
            <GridTwoColumns sizing="3/4">
              <div>
                <SingleMoviePagePhotos
                  photos={moviePhotos}
                  layoutClasses="mbot2-rem"
                  link={`/movie-gallery/${id}`}
                  authorId={authorId}
                />
                <SingleMoviePageTopCast
                  layoutClasses="mbot1-rem"
                  id={id}
                  link={`/cast/${id}`}
                  authorId={authorId}
                />
                {/*
                <DetailsList
                  details={[
                    ...mappedMembersData,
                    {
                      description: "All cast & crew",
                      body: "/cast/" + id,
                    },
                  ]}
                /> */}
                <SingleMoviePageStoryLine
                  genres={movieGenres}
                  synopsis={movieSynopsis}
                  layoutClasses="mbot1-rem"
                  authorId={authorId}
                />
                {/* prettier-ignore */}
                {location.pathname.includes("/edit-storyline") && (
                  <div className="overflow-hidden">
                    <Outlet />
                  </div>
                )}
                {/* <DidYouKnow facts={did_you_know} layoutClasses="mbot1-rem" />
                <Details />  */}
                <SingleMoviePageBoxOffice
                  authorId={authorId}
                  boxOffice={movieBoxOffice}
                  layoutClasses="mbot1-rem"
                />
                {location.pathname.includes("/edit-box-office") && (
                  <div className="overflow-hidden">
                    <Outlet />
                  </div>
                )}

                {!location.pathname.includes("/edit-storyline") &&
                  !location.pathname.includes("/edit-box-office") && <Outlet />}
              </div>
            </GridTwoColumns>
          </div>
        </section>
      </main>
    );
  }
};

export default SingleMoviePage;
