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
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/config";
import { validateInputsFields } from "../helpers/helpers";

// Components
import InputText from "../components/UI/Form/InputText";
import Multiselect from "multiselect-react-dropdown";
import GlobalLoader from "../components/UI/Loaders/GlobalLoader";

// Classes
import classes from "./styles/CreateMoviePage.module.css";
import useFetchData from "../hooks/useFetchData";

const CreateMoviePage = () => {
  const navigate = useNavigate();

  const { data } = useFetchData(() => getDocs(collection(db, "actors")));

  const [movieTitle, setMovieTitle] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const [movieDuration, setMovieDuration] = useState("");
  const [movieMainImage, setMovieMainImage] = useState("");
  const [movieVideoPlaceholderImage, setMovieVideoPlaceholderImage] =
    useState("");
  const [movieShortInfo, setMovieShortInfo] = useState("");

  const [genresVal, setGenresVal] = useState("");
  const [movieGenres, setMovieGenres] = useState([]);

  const [movieStuff, setMovieStuff] = useState({
    actors: [],
    directors: [],
    writers: [],
  });

  const [selectedActors, setSelectedActors] = useState([]);
  const actorsRef = useRef([]);

  const [directorsVal, setDirectorsVal] = useState("");
  const [writersVal, setWritersVal] = useState("");

  // Invalid form state
  const [invalidForm, setInvalidForm] = useState(false);

  // Create movie
  const handleCreateMovie = async (e) => {
    e.preventDefault();

    if (
      !validateInputsFields([
        movieTitle,
        movieYear,
        movieDuration,
        movieMainImage,
        movieVideoPlaceholderImage,
        movieShortInfo,
      ])
    ) {
      setInvalidForm(true);
      alert("Empty fields spotted!");
      return;
    }

    try {
      const batch = writeBatch(db);

      const allMovies = await getDocs(collection(db, "movies"));
      if (
        allMovies.docs?.length > 0 &&
        allMovies.docs.find(
          (movie) =>
            movie.data().movieTitle?.toLowerCase() === movieTitle.toLowerCase()
        )
      ) {
        alert("already exists");
        return;
      }

      const movieDoc = await addDoc(collection(db, "movies"), {});

      batch.set(movieDoc, {
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
        movieId: movieDoc.id,
        movieTitle,
        movieYear,
        movieMainImage,
        movieShortInfo,
        movieStars: movieStuff.actors.filter((actor) => actor.isStar),
      });

      for (let actor of movieStuff.actors) {
        const actorRef = await getDoc(doc(db, "actors", actor.actorId));
        const actorData = actorRef.exists() && actorRef.data();

        if (actorData) {
          const filmRef = await addDoc(
            collection(db, "actors", actorRef.id, "filmography"),
            {
              movieId: movieDoc.id,
              movieTitle,
              movieYear,
              movieMainImage,
              movieActorName: actor.actorName,
              movieCharacterName: actor.movieCharacterName,
            }
          );

          batch.update(doc(db, "actors", actor.actorId), {
            filmography: actorData.filmography.concat(filmRef.id),
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
      setMovieStuff({ actors: [], directors: [], writers: [] });

      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  //   Key down handlers
  const handleKeyDownAddActors = (id, e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const [actorName, movieCharacterName, isActorStar] =
        e.target.value.split(" - ");

      setMovieStuff((prev) => {
        if (
          !prev.actors.find(
            (star) =>
              star.actorName === actorName &&
              star.movieCharacterName === movieCharacterName
          )
        ) {
          return {
            ...prev,
            actors: prev.actors.concat({
              actorId: id,
              actorName,
              movieCharacterName,
              isStar: isActorStar === "star" || false,
            }),
          };
        } else {
          return prev;
        }
      });

      setSelectedActors((prev) => prev.filter((el) => el.id !== id));
      e.target.value = "";
    }
  };
  const handleKeyDownAddDirectors = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setMovieStuff((prev) => ({
        ...prev,
        directors: prev.directors.concat(directorsVal),
      }));
      setDirectorsVal("");
      e.target.value = "";
    }
  };
  const handleKeyDownAddWriters = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setMovieStuff((prev) => ({
        ...prev,
        writers: prev.writers.concat(writersVal),
      }));
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

  if (!auth.currentUser) {
    navigate("/login");
    return;
  } else {
    if (data.docs && data.docs.length > 0) {
      return (
        <div
          className={`${classes["create-movie__wrapper"]} ${
            invalidForm ? classes["invalid-form"] : ""
          }`}
        >
          <h2>Create movie</h2>
          <form onSubmit={handleCreateMovie}>
            {/* TITLE */}
            <InputText
              divClassName={classes["form-control-group-half-col"]}
              id="title"
              labelText="Add Title"
              placeholderText="Add Title"
              value={movieTitle}
              onChange={setMovieTitle}
            />
            {/* DURATION */}
            <InputText
              divClassName={classes["form-control-group-half-col"]}
              id="duration"
              labelText="Add Duration"
              placeholderText="Add Duration"
              value={movieDuration}
              onChange={setMovieDuration}
            />
            {/* YEAR */}
            <InputText
              divClassName={classes["form-control-group-half-col"]}
              id="year"
              labelText="Add Year"
              placeholderText="Add Year"
              value={movieYear}
              onChange={setMovieYear}
            />
            {/* SHORT INFO */}
            <InputText
              divClassName={classes["form-control-group-half-col"]}
              id="shortInfo"
              labelText="Add Short Info"
              placeholderText="Add Short Info"
              value={movieShortInfo}
              onChange={setMovieShortInfo}
            />
            {/* MAIN IMAGE */}
            <InputText
              divClassName={classes["form-control-group-full-col"]}
              id="mainImage"
              labelText="Add Main Image"
              placeholderText="Add Main Image"
              value={movieMainImage}
              onChange={setMovieMainImage}
            />
            {/* VIDEO IMAGE */}
            <InputText
              divClassName={classes["form-control-group-full-col"]}
              id="mainVideoImage"
              labelText="Add Main Image Video"
              placeholderText="Add Main Image Video"
              value={movieVideoPlaceholderImage}
              onChange={setMovieVideoPlaceholderImage}
            />
            {/* ACTORS */}
            <div
              className={classes["form-control-group-full-col"]}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            >
              <div className={classes["form-control-group-full-col"]}>
                {selectedActors.length > 0 &&
                  selectedActors.map((selected, ind) => (
                    <input
                      ref={(el) => (actorsRef.current[ind] = el)}
                      key={selected.id}
                      defaultValue={selected.name}
                      onKeyDown={handleKeyDownAddActors.bind(null, selected.id)}
                      type="text"
                    />
                  ))}
              </div>
              <label>Add Actors</label>
              <Multiselect
                onSelect={(list, item) => {
                  setSelectedActors((prev) => prev.concat(item));
                }}
                onRemove={(list, item) => {
                  setSelectedActors((prev) => {
                    const findEl = prev.find((el) => el.id === item.id);
                    prev = prev.filter((el) => el.id !== findEl.id);
                    return prev;
                  });
                }}
                closeOnSelect="true"
                options={
                  data.docs &&
                  data.docs.map((el) => ({ id: el.id, name: el.data().name }))
                }
                displayValue="name"
              />
            </div>

            {/* DIRECTORS */}
            <InputText
              divClassName={classes["form-control-group-half-col"]}
              id="directors"
              labelText="Add Directors (press Enter to add director)"
              placeholderText="Add Directors"
              value={directorsVal}
              onChange={setDirectorsVal}
              onKeyDown={handleKeyDownAddDirectors}
              valueList={movieStuff.directors}
            />
            {/* WRITERS */}
            <InputText
              divClassName={classes["form-control-group-half-col"]}
              id="writers"
              labelText="Add Writers (press Enter to add director)"
              placeholderText="Add Writers"
              value={writersVal}
              onChange={setWritersVal}
              onKeyDown={handleKeyDownAddWriters}
              valueList={movieStuff.writers}
            />
            {/* GENRES */}
            <InputText
              divClassName={classes["form-control-group-full-col"]}
              id="genres"
              labelText="Add Genres (press Enter to add director)"
              placeholderText="Add Genres"
              value={genresVal}
              onChange={setGenresVal}
              onKeyDown={handleKeyDownAddGenres}
              valueList={movieGenres}
            />

            <button
              className={classes["form-control-group-full-col"]}
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
