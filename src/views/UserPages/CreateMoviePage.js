// React Hooks
import { useRef, useEffect, useState, Fragment } from "react";

// React Router Hooks
import { useNavigate } from "react-router-dom";

// Firebase SDK functions
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

// Config references
import { auth, db } from "../../config/config";

// Helpers
import { validationInputs } from "./helpers/validation-inputs";
import { upperCaseFirstWord } from "../../helpers/helpers";

// Components
import InputText from "../../components/UI/Form/InputText";
import Multiselect from "multiselect-react-dropdown";
import GlobalLoader from "../../components/UI/Loaders/GlobalLoader";

// Attributes
import attributes from "./styles/CreateMoviePage.module.css";
import useFetchData from "../../hooks/useFetchData";
import ActorInput from "./ActorInput";

const CreateMoviePage = () => {
  const navigate = useNavigate();

  // Get initial Data
  const { data } = useFetchData(() => getDocs(collection(db, "actors")));

  // State variables
  const [movieTitle, setMovieTitle] = useState("");
  const [isMovieTitleValid, setIsMovieTitleValid] = useState(null);

  const [movieYear, setMovieYear] = useState("");
  const [isMovieYearValid, setIsMovieYearValid] = useState(null);

  const [movieDuration, setMovieDuration] = useState("");
  const [isMovieDurationValid, setIsMovieDurationValid] = useState(null);

  const [movieShortInfo, setMovieShortInfo] = useState("");
  const [isMovieShortInfoValid, setIsMovieShortInfoValid] = useState(null);

  const [movieMainImage, setMovieMainImage] = useState("");
  const [isMovieMainImageValid, setIsMovieMainImageValid] = useState(null);

  const [movieVideoPlaceholderImage, setMovieVideoPlaceholderImage] =
    useState("");
  const [
    isMovieVideoPlaceholderImageValid,
    setIsMovieVideoPlaceholderImageValid,
  ] = useState(null);

  const [genresVal, setGenresVal] = useState("");
  const [movieGenres, setMovieGenres] = useState([]);
  const [isGenresValid, setIsGenresValid] = useState(null);

  const [directorsVal, setDirectorsVal] = useState("");
  const [movieDirectors, setMovieDirectors] = useState([]);
  const [isDirectorsValid, setIsDirectorsValid] = useState(null);

  const [writersVal, setWritersVal] = useState("");
  const [movieWriters, setMovieWriters] = useState([]);
  const [isWritersValid, setIsWritersValid] = useState(null);

  const [actors, setActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [movieActors, setMovieActors] = useState([]);
  const [isActorsValid, setIsActorsValid] = useState(null);

  useEffect(() => {
    setActors(
      data?.docs?.map((el) => {
        const actorData = el.data();
        const actorName = actorData.actorName.split(" ");
        const uppercaseActorName = actorName
          .map((el) => upperCaseFirstWord(el))
          .join(" ");

        return {
          id: el.id,
          ...el.data(),
          actorName: uppercaseActorName,
        };
      })
    );
  }, [data]);

  // Handlers for directors, writers and genres
  const handleKeyDownAddDirectors = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setMovieDirectors((prev) => prev.concat(directorsVal));
      setDirectorsVal("");
      e.target.value = "";
    }
  };
  const handleKeyDownAddWriters = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setMovieWriters((prev) => prev.concat(writersVal));
      setWritersVal("");
      e.target.value = "";
    }
  };
  const handleKeyDownAddGenres = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setMovieGenres((prev) => prev.concat(genresVal));
      setGenresVal("");
      e.target.value = "";
    }
  };
  const handleSelectActors = (e) => {
    const actorInfo = actors.find((actor) => actor.id === e.target.value);
    setSelectedActors((prev) => prev.concat(actorInfo));
    setActors((prev) => prev.filter((el) => el.id !== e.target.value));

    if (e.target.value !== "") {
      setIsActorsValid(true);
    } else {
      setIsActorsValid(false);
    }
  };
  const handleAddToActors = (id, characterName) => {
    const findActor = selectedActors.find((actor) => actor.id === id);

    setMovieActors((prev) =>
      prev.concat({
        ...findActor,
        actorCharacterName: characterName,
        actorId: id,
        isStar: true,
      })
    );
    setSelectedActors((prev) => prev.filter((el) => el.id !== findActor.id));
  };

  // Create movie
  const handleCreateMovie = async (e) => {
    e.preventDefault();

    const areInputsValid = validationInputs([
      [movieTitle, setIsMovieTitleValid],
      [movieDuration, setIsMovieDurationValid],
      [movieYear, setIsMovieYearValid],
      [movieShortInfo, setIsMovieShortInfoValid],
      [movieMainImage, setIsMovieMainImageValid],
      [movieVideoPlaceholderImage, setIsMovieVideoPlaceholderImageValid],
      [movieGenres, setIsGenresValid],
      [movieDirectors, setIsDirectorsValid],
      [movieWriters, setIsWritersValid],
      [movieActors, setIsActorsValid],
    ]);

    if (!areInputsValid) {
      return;
    }

    try {
      const batch = writeBatch(db);

      const allMoviesDocs = await getDocs(collection(db, "movies"));
      if (
        allMoviesDocs.docs?.length > 0 &&
        allMoviesDocs.docs.find(
          (movie) =>
            movie.data().movieTitle?.toLowerCase() === movieTitle.toLowerCase()
        )
      ) {
        alert("already exists");
        return;
      }

      let movieStuff = {
        directors: movieDirectors,
        actors: movieActors,
        writers: movieWriters,
      };

      const movieToCreateDoc = await addDoc(collection(db, "movies"), {});
      batch.set(movieToCreateDoc, {
        movieTitle,
        movieYear,
        movieDuration,
        movieMainImage,
        movieVideoPlaceholderImage,
        movieShortInfo,
        movieGenres,
        movieStuff,
        moviePhotos: [],
        movieDidYouKnow: {},
        movieSynopsis: "",
        movieBoxOffice: {},
        authorId: auth.currentUser?.uid,
      });

      const genreDoc = await addDoc(collection(db, "genres"), {});

      batch.set(genreDoc, {
        movieGenres,
        movieId: movieToCreateDoc.id,
        movieTitle,
        movieYear,
        movieMainImage,
        movieShortInfo,
        movieStars: movieActors,
      });
      for (let actor of movieActors) {
        const actorRef = await getDoc(doc(db, "actors", actor.id));
        const actorData = actorRef.exists() && actorRef.data();

        if (actorData) {
          const filmRef = await addDoc(
            collection(db, "actors", actor.id, "filmography"),
            {
              movieId: movieToCreateDoc.id,
              movieTitle,
              movieYear,
              movieMainImage,
              movieActorName: actor.actorName,
              movieCharacterName: actor.actorCharacterName,
            }
          );

          batch.update(doc(db, "actors", actor.id), {
            filmography: actorData.filmography
              ? actorData.filmography.concat(filmRef.id)
              : [filmRef.id],
          });
        }
      }

      await batch.commit();

      setMovieTitle("");
      setMovieYear("");
      setMovieDuration("");
      setMovieShortInfo("");
      setMovieMainImage("");
      setMovieVideoPlaceholderImage("");
      setMovieGenres([]);
      setMovieActors([]);
      setMovieWriters([]);
      setMovieDirectors([]);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!auth.currentUser) {
    navigate("/login");
    return;
  } else {
    if (data.docs && data.docs.length > 0) {
      return (
        <div className={`${attributes["create-movie__wrapper"]} `}>
          <h2>Add movie</h2>
          <form onSubmit={handleCreateMovie}>
            {/* TITLE */}
            <InputText
              divClassName={attributes["form-control-group-half-col"]}
              id="title"
              labelText="Add Title"
              placeholderText="Add Title"
              value={movieTitle}
              onChange={setMovieTitle}
              resetValidity={setIsMovieTitleValid}
              error={isMovieTitleValid}
            />
            {/* DURATION */}
            <InputText
              divClassName={attributes["form-control-group-half-col"]}
              id="duration"
              labelText="Add Duration"
              placeholderText="Add Duration"
              value={movieDuration}
              onChange={setMovieDuration}
              resetValidity={setIsMovieDurationValid}
              error={isMovieDurationValid}
            />
            {/* YEAR */}
            <InputText
              divClassName={attributes["form-control-group-half-col"]}
              id="year"
              labelText="Add Year"
              placeholderText="Add Year"
              value={movieYear}
              onChange={setMovieYear}
              resetValidity={setIsMovieYearValid}
              error={isMovieYearValid}
            />
            {/* SHORT INFO */}
            <InputText
              divClassName={attributes["form-control-group-half-col"]}
              id="shortInfo"
              labelText="Add Short Info"
              placeholderText="Add Short Info"
              value={movieShortInfo}
              onChange={setMovieShortInfo}
              resetValidity={setIsMovieShortInfoValid}
              error={isMovieShortInfoValid}
            />
            {/* MAIN IMAGE */}
            <InputText
              divClassName={attributes["form-control-group-full-col"]}
              id="mainImage"
              labelText="Add Main Image"
              placeholderText="Add Main Image"
              value={movieMainImage}
              onChange={setMovieMainImage}
              resetValidity={setIsMovieMainImageValid}
              error={isMovieMainImageValid}
            />
            {/* VIDEO IMAGE */}
            <InputText
              divClassName={attributes["form-control-group-full-col"]}
              id="mainVideoImage"
              labelText="Add Main Image Video"
              placeholderText="Add Main Image Video"
              value={movieVideoPlaceholderImage}
              onChange={setMovieVideoPlaceholderImage}
              resetValidity={setIsMovieVideoPlaceholderImageValid}
              error={isMovieVideoPlaceholderImageValid}
            />
            {/* ACTORS */}

            <div className={attributes["form-control-group-full-col"]}>
              {isActorsValid !== null && isActorsValid === false && (
                <p className="error mbot1-rem_I">Select actors</p>
              )}
              {actors?.length > 0 ? (
                <select defaultValue="DEFAULT" onChange={handleSelectActors}>
                  <option value="DEFAULT">Select actor</option>
                  {actors &&
                    actors.map((el) => (
                      <option key={el.id} value={el.id}>
                        {el.actorName}
                      </option>
                    ))}
                </select>
              ) : (
                <p className={attributes["no-more-actors"]}>
                  No more actors to select
                </p>
              )}
              {selectedActors?.length > 0 &&
                selectedActors?.map((el) => (
                  <ActorInput
                    key={el.id}
                    actorName={el.actorName}
                    addToActors={handleAddToActors.bind(null, el.id)}
                  />
                ))}
              <div className={attributes["empty-div"]}></div>
              {movieActors && movieActors.length > 0 && (
                <Fragment>
                  <br />
                  <h5>Movie actors: </h5>
                </Fragment>
              )}
              <div className={attributes["selected-actors"]}>
                {movieActors &&
                  movieActors.length > 0 &&
                  movieActors.map((actor) => (
                    <p key={actor.id}>
                      {actor.actorName} - {actor.actorCharacterName}
                    </p>
                  ))}
              </div>
            </div>

            {/* DIRECTORS */}
            <InputText
              divClassName={attributes["form-control-group-half-col"]}
              id="directors"
              labelText="Add Directors (press Enter to add director)"
              placeholderText="Add Directors"
              value={directorsVal}
              onChange={setDirectorsVal}
              onKeyDown={handleKeyDownAddDirectors}
              valueList={movieDirectors}
              resetValidity={setIsDirectorsValid}
              error={isDirectorsValid}
            />
            {/* WRITERS */}
            <InputText
              divClassName={attributes["form-control-group-half-col"]}
              id="writers"
              labelText="Add Writers (press Enter to add director)"
              placeholderText="Add Writers"
              value={writersVal}
              onChange={setWritersVal}
              onKeyDown={handleKeyDownAddWriters}
              valueList={movieWriters}
              resetValidity={setIsWritersValid}
              error={isWritersValid}
            />
            {/* GENRES */}
            <InputText
              divClassName={attributes["form-control-group-full-col"]}
              id="genres"
              labelText="Add Genres (press Enter to add director)"
              placeholderText="Add Genres"
              value={genresVal}
              onChange={setGenresVal}
              onKeyDown={handleKeyDownAddGenres}
              valueList={movieGenres}
              resetValidity={setIsGenresValid}
              error={isGenresValid}
            />

            <button
              className={attributes["form-control-group-full-col"]}
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
      );
    } else {
      return <GlobalLoader bgColor="#1F1F1F" />;
    }
  }
};

export default CreateMoviePage;
