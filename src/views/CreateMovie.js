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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "../components/General/InputText";
import { db } from "../config/config";
import { validateInputsFields } from "../helpers/helpers";

import classes from "./styles/CreateMovie.module.css";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [actorsState, setActorsState] = useState([]);
  const [selectActors, setSelectActors] = useState([]);

  const [duration, setDuration] = useState("2h 13m");
  const [mainImage, setMainImage] = useState(
    "https://m.media-amazon.com/images/M/MV5BNjM1NDUyNGMtZTYxMi00YTFmLWE5YTgtNGExMjI1MWYwMGVlXkEyXkFqcGdeQXVyMzQ3Nzk5MTU@._V1_UX100_CR0,0,100,100_AL_.jpg"
  );
  const [videoPlaceholderImage, setVideoPlaceholderImage] = useState(
    "https://m.media-amazon.com/images/M/MV5BNjM1NDUyNGMtZTYxMi00YTFmLWE5YTgtNGExMjI1MWYwMGVlXkEyXkFqcGdeQXVyMzQ3Nzk5MTU@._V1_UX100_CR0,0,100,100_AL_.jpg"
  );
  const [shortInfo, setShortInfo] = useState("fight to the club");
  const [year, setYear] = useState("1997");
  const [title, setTitle] = useState("Fight club");

  const [directorsVal, setDirectorsVal] = useState("");
  const [directors, setDirectors] = useState(["Nikolai"]);

  const [writersVal, setWritersVal] = useState("");
  const [writers, setWriters] = useState(["Brat", "Mu"]);

  const [genresVal, setGenresVal] = useState("");
  const [genres, setGenres] = useState(["adventure", "fighting"]);

  const [invalidForm, setInvalidForm] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      try {
        const allActors = await getDocs(collection(db, "actors"));
        if (allActors.docs.length > 0) {
          //   allActors.docs.forEach((d) => console.log(d.data()));
          setActorsState(
            allActors.docs.map((el) => ({ id: el.id, ...el.data() }))
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, []);

  const handleCreateMovie = async (e) => {
    e.preventDefault();

    if (
      !validateInputsFields([
        duration,
        mainImage,
        videoPlaceholderImage,
        shortInfo,
        year,
        title,
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
          (movie) => movie.data().title?.toLowerCase() === title.toLowerCase()
        )
      ) {
        alert("already exists");
        return;
      }

      const movieDoc = await addDoc(collection(db, "movies"), {});

      batch.set(movieDoc, {
        title,
        year,
        duration,
        main_image: mainImage,
        video_placeholder_image: videoPlaceholderImage,
        short_info: shortInfo,
        genres,
        creators: {},
        top_cast: {},
        photos: [],
        did_you_know: {},
        synopsis: "",
        box_office: {},
      });

      const genreDoc = await addDoc(collection(db, "genres"), {});

      batch.set(genreDoc, {
        genres,
        movieId: movieDoc.id,
        image: mainImage,
        name: title,
        short_info: shortInfo,
        stars: actorsState,
        year,
      });

      for (let actor of selectActors) {
        const findActor = actorsState.find((actor) => actor.id === actor.id);

        if (findActor) {
          const filmRef = await addDoc(
            collection(db, "actors", actor.id, "filmography"),
            {
              movieId: movieDoc.id,
              characterName: "not available yet",
              main_image: findActor.main_image,
              name: findActor.name,
              year,
            }
          );

          const actorRef = doc(db, "actors", actor.id);
          const actorDoc = await getDoc(actorRef);

          const filmography = actorDoc.data().filmography;

          batch.update(actorRef, {
            filmography: filmography
              ? filmography.concat(filmRef.id)
              : [filmRef.id],
          });
        }

        // batch.update(actorRef, {
        //   filmography: {
        //     [movieDoc.id]: {
        //       characterName: "not available yet",
        //       main_image: actor.main_image,
        //       name: actor.name,
        //       year,
        //     },
        //   },
        // });
      }

      await batch.commit();

      setTitle("");
      setYear("");
      setDuration("");
      setShortInfo("");
      setMainImage("");
      setVideoPlaceholderImage("");
      setDirectors([]);
      setWriters([]);
      setGenres([]);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //   Key down handlers
  const handleKeyDownAddDirectors = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setDirectors((prev) => prev.concat(directorsVal));
      setDirectorsVal("");
      e.target.value = "";
    }
  };
  const handleKeyDownAddWriters = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setWriters((prev) => prev.concat(writersVal));
      setWritersVal("");
      e.target.value = "";
    }
  };
  const handleKeyDownAddGenres = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setGenres((prev) => prev.concat(genresVal));
      setGenresVal("");
      e.target.value = "";
    }
  };

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
          value={title}
          onChange={setTitle}
        />
        {/* DURATION */}
        <InputText
          divClassName={classes["form-control-group-half-col"]}
          id="duration"
          labelText="Add Duration"
          placeholderText="Add Duration"
          value={duration}
          onChange={setDuration}
        />
        {/* YEAR */}
        <InputText
          divClassName={classes["form-control-group-half-col"]}
          id="year"
          labelText="Add Year"
          placeholderText="Add Year"
          value={year}
          onChange={setYear}
        />

        {/* SHORT INFO */}
        <InputText
          divClassName={classes["form-control-group-half-col"]}
          id="shortInfo"
          labelText="Add Short Info"
          placeholderText="Add Short Info"
          value={shortInfo}
          onChange={setShortInfo}
        />
        <label>Add actor</label>
        <select
          multiple
          className={classes["form-control-group-full-col"]}
          onChange={(e) =>
            setSelectActors((prev) =>
              prev.concat({ id: e.target.value, name: e.target.textContent })
            )
          }
        >
          {actorsState.length > 0 &&
            actorsState.map((actor) => (
              <option key={actor.id} value={actor.id}>
                {actor.name}
              </option>
            ))}
        </select>

        {/* MAIN IMAGE */}
        <InputText
          divClassName={classes["form-control-group-full-col"]}
          id="mainImage"
          labelText="Add Main Image"
          placeholderText="Add Main Image"
          value={mainImage}
          onChange={setMainImage}
        />
        {/* VIDEO IMAGE */}
        <InputText
          divClassName={classes["form-control-group-full-col"]}
          id="mainVideoImage"
          labelText="Add Main Image Video"
          placeholderText="Add Main Image Video"
          value={videoPlaceholderImage}
          onChange={setVideoPlaceholderImage}
        />

        {/* DIRECTORS */}
        <InputText
          divClassName={classes["form-control-group-half-col"]}
          id="directors"
          labelText="Add Directors (press Enter to add director)"
          placeholderText="Add Directors"
          value={directorsVal}
          onChange={setDirectorsVal}
          onKeyDown={handleKeyDownAddDirectors}
          valueList={directors}
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
          valueList={writers}
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
          valueList={genres}
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
};

export default CreateMovie;
