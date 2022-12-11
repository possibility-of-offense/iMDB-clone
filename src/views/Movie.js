import BoxOffice from "../components/Movie/BoxOffice";
import Details from "../components/Movie/Details";
import DetailsList from "../components/Movie/DetailsList";
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

import { useEffect } from "react";
import { fetchSingleMovie } from "../features/movies/singleMovieSlice";
import { useDispatch, useSelector } from "react-redux";

import classes from "./styles/Movie.module.css";
import { useParams } from "react-router-dom";

const Movie = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const selectSingleMovie = useSelector((state) => state.singleMovie);
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

  if (status === "loading") {
    return <div>LOADING...</div>;
  } else if (status === "succeeded") {
    return (
      <main className={classes["single-movie"]}>
        <section className={classes["single-movie__main"]}>
          <div className="container-single-movie">
            <SubNav />
            <Title />
            <HeroBanner />
            <GridTwoColumns sizing="3/4">
              <div>
                <Genres />
                <ShortDescription />
                <MembersMetaData />
              </div>
            </GridTwoColumns>
          </div>
        </section>
        <section className={classes["single-movie__additional"]}>
          <div className="container-single-movie">
            <GridTwoColumns sizing="3/4">
              <div>
                <Photos />
                <TopCast />
                <DetailsList
                  details={[
                    ...mappedMembersData,
                    {
                      additionalLinks: [
                        {
                          title: "All cast & crew",
                          link: "/cast-and-crew",
                        },
                      ],
                    },
                  ]}
                />
                <StoryLine />
                <DidYouKnow />
                <Details />
                <BoxOffice />
              </div>
            </GridTwoColumns>
          </div>
        </section>

        <footer>
          <h2>Some footer info will be here</h2>
        </footer>
      </main>
    );
  }
};

export default Movie;
