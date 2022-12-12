import BoxOffice from "../components/Movie/BoxOffice";
import Details from "../components/Movie/Details";
import DetailsList from "../components/General/DetailsList";
import DidYouKnow from "../components/Movie/DidYouKnow";
import Genres from "../components/Movie/Genres";
import HeroBanner from "../components/Movie/HeroBanner";
import MembersMetaData from "../components/Movie/MembersMetaData";
import Photos from "../components/Movie/Photos";
import ShortDescription from "../components/Movie/ShortDescription";
import StoryLine from "../components/Movie/StoryLine";
import SubNav from "../components/Movie/SubNav";
import Title from "../components/Movie/Title";
import TopCast from "../components/Movie/TopCast";
import GridTwoColumns from "../components/UI/GridTwoColumns";
import GlobalLoader from "../components/UI/GlobalLoader";

import { useEffect } from "react";
import { fetchSingleMovie } from "../features/movies/singleMovieSlice";
import { useDispatch, useSelector } from "react-redux";

import classes from "./styles/Movie.module.css";
import { useParams } from "react-router-dom";

const Movie = () => {
  const dispatch = useDispatch();

  // Get params id
  const { id } = useParams();

  // Get singleMovie state
  const selectSingleMovie = useSelector((state) => state.singleMovie);

  // Destructure all state variables
  const {
    title,
    year,
    duration,
    main_image,
    video_placeholder_image,
    short_info,
    genres,
    creators,
    top_cast,
    photos,
    did_you_know,
    synopsis,
    box_office,
  } = selectSingleMovie.singleMovie;
  const titleInfo = {
    title,
    additional: [year, duration],
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
    if (!Object.values(selectSingleMovie.singleMovie).length) {
      dispatch(fetchSingleMovie(id));
    } else {
      console.log("already");
    }
  }, []);

  const status = selectSingleMovie.status;

  console.log(mappedMembersData);

  if (status === "loading") {
    return <GlobalLoader bgColor="#1F1F1F" />;
  } else if (status === "succeeded") {
    return (
      <main className={`${classes["single-movie"]} pbot2-rem`}>
        <section className="main-container__bg">
          <div className="main-container">
            <SubNav />
            <Title titleInfo={titleInfo} />
            <HeroBanner
              images={[main_image, video_placeholder_image]}
              photosLink={`/movie-gallery/${id}`}
            />
            <GridTwoColumns sizing="3/4">
              <div>
                <Genres genres={genres} />
                <ShortDescription shortInfo={short_info} />
                <MembersMetaData creators={creators} topCast={top_cast} />
              </div>
            </GridTwoColumns>
          </div>
        </section>
        <section className={classes["single-movie__additional"]}>
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
        </section>
      </main>
    );
  }
};

export default Movie;
