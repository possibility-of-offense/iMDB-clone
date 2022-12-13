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
import InputText from "../components/General/InputText";
import { db } from "../config/config";
import { validateInputsFields } from "../helpers/helpers";

import classes from "./styles/CreateMovie.module.css";

const CreateMovie = () => {
  const [actorsState, setActorsState] = useState([]);

  //   const [budget, setBudget] = useState("");
  //   const [expectedProfit, setExpectedProfit] = useState("");
  const [duration, setDuration] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [videoPlaceholderImage, setVideoPlaceholderImage] = useState("");
  const [shortInfo, setShortInfo] = useState("");
  //   const [synopsis, setSynopsis] = useState("");
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");

  const [directorsVal, setDirectorsVal] = useState("");
  const [directors, setDirectors] = useState([]);

  const [writersVal, setWritersVal] = useState("");
  const [writers, setWriters] = useState([]);

  const [genresVal, setGenresVal] = useState("");
  const [genres, setGenres] = useState([]);

  //   const [photosVal, setPhotosVal] = useState("");
  //   const [photos, setPhotos] = useState([]);

  //   const [didYouKnowVal, setDidYouKnowVal] = useState("");
  //   const [didYouKnow, setDidYouKnow] = useState({});

  //   const [topCastVal, setTopCastVal] = useState("");
  //   const [topCast, setTopCast] = useState({});

  const [invalidForm, setInvalidForm] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      try {
        const allActors = await getDocs(collection(db, "actors"));
        if (allActors.docs.length > 0) {
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
        // budget,
        // expectedProfit,
        duration,
        mainImage,
        videoPlaceholderImage,
        shortInfo,
        // synopsis,
        year,
        title,
        // directors,
        // writers,
        // genres,
        // photos,
        // didYouKnow,
        // topCast,
      ])
    ) {
      setInvalidForm(true);
      alert("Empty fields spotted!");
      return;
    }

    try {
      const batch = writeBatch(db);

      const movieDoc = await addDoc(collection(db, "movies"), {});

      batch.set(movieDoc, {
        // box_office: {
        //   budget,
        //   expected_profit: expectedProfit,
        // },
        // creators: {
        //   directors,
        //   writers,
        // },
        // did_you_know: didYouKnow,
        duration,
        main_image: mainImage,
        video_placeholder_image: videoPlaceholderImage,
        genres,
        // photos,
        short_info: shortInfo,
        // synopsis,
        title,
        year,
        // top_cast: topCast,
      });

      const genreDoc = await addDoc(collection(db, "genres"), {});

      //   let starData = {};
      //   for (let actor of Object.entries(topCast)) {
      //     starData[actor[0]] = {
      //       name: actor[1].name,
      //       actorId: actor[0],
      //     };
      //   }

      //   batch.set(genreDoc, {
      //     genres: genres,
      //     movieId: movieDoc.id,
      //     name: title,
      //     short_info: shortInfo,
      //     stars: starData,
      //     year,
      //   });

      //   const actorRef = doc(db, "actors", "ECVmCBTCN3Pnokm07jL9");
      //   const actorDoc = await getDoc(actorRef);

      //   batch.update(actorRef, {
      //     filmography: {
      //       ...actorDoc.data().filmography,
      //       [movieDoc.id]: {
      //         characterName: "1",
      //         main_image: "img",
      //         name: "name",
      //         year: 1500,
      //       },
      //     },
      //   });

      await batch.commit();
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
  //   const handleKeyDownAddPhotos = (e) => {
  //     if (e.key === "Enter") {
  //       e.preventDefault();
  //       setPhotos((prev) => prev.concat(photosVal));
  //       setPhotosVal("");
  //       e.target.value = "";
  //     }
  //   };
  //   const handleKeyDownAddDidYouKnow = (e) => {
  //     if (e.key === "Enter") {
  //       e.preventDefault();

  //       setDidYouKnow((prev) => {
  //         const last = { ...prev };
  //         if (Object.keys(last).length === 0) {
  //           prev["1"] = {
  //             category: "test",
  //             text: didYouKnowVal,
  //           };
  //           return prev;
  //         } else {
  //           const lastKey = Object.keys(last).slice().pop();

  //           prev[Number(lastKey) + 1] = {
  //             category: "test",
  //             text: didYouKnowVal,
  //           };
  //           return prev;
  //         }
  //       });
  //       setDidYouKnowVal("");

  //       e.target.value = "";
  //     }
  //   };
  //   const handleKeyDownAddTopCast = async (e) => {
  //     if (e.key === "Enter") {
  //       e.preventDefault();

  //       const findActor = await getDocs(
  //         query(
  //           collection(db, "actors"),
  //           where("name", ">=", topCastVal),
  //           where("name", "<=", topCastVal + "\uf8ff")
  //         )
  //       );

  //       if (findActor.docs.length > 0) {
  //         const actorRef = findActor.docs[0];
  //         const actorData = actorRef.data();

  //         const topCastValues = Object.values(topCast);

  //         if (!topCastValues.find((el) => el.text.includes(topCastVal))) {
  //           setTopCast((prev) => {
  //             prev[actorRef.id] = {
  //               name: actorData.name,
  //               characterName: "GOSHO",
  //               image: actorData.main_image,
  //               is_star: true,
  //             };
  //             return prev;
  //           });
  //           setTopCastVal("");
  //         }

  //         e.target.value = "";
  //       }
  //     }
  //   };

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
        {/* BUDGET */}
        {/* <InputText
          divClassName={classes["form-control-group-half-col"]}
          id="budget"
          labelText="Add Budget"
          placeholderText="Add Budget"
          value={budget}
          onChange={setBudget}
        /> */}
        {/* EXPECTED PROFIT */}
        {/* <InputText
          divClassName={classes["form-control-group-half-col"]}
          id="expectedProfit"
          labelText="Add Expected Profit"
          placeholderText="Add Expected Profit"
          value={expectedProfit}
          onChange={setExpectedProfit}
        /> */}
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
        <select className={classes["form-control-group-full-col"]}>
          {actorsState.length > 0 &&
            actorsState.map((actor) => (
              <option key={actor.id}>{actor.name}</option>
            ))}
        </select>
        {/* SYNOPSIS */}
        {/* <InputText
          divClassName={classes["form-control-group-full-col"]}
          id="synopsis"
          labelText="Add Synopsis"
          placeholderText="Add Synopsis"
          value={synopsis}
          onChange={setSynopsis}
        /> */}
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
        {/* FACTS */}
        {/* <InputText
          divClassName={classes["form-control-group-half-col"]}
          id="didYouKnow"
          labelText="Add Some Facts (press enter to add more than one)"
          placeholderText="Add Some Facts"
          value={didYouKnowVal}
          valueList={Object.values(didYouKnow).map((el) => el.text)}
          onChange={setDidYouKnowVal}
          onKeyDown={handleKeyDownAddDidYouKnow}
        /> */}
        {/* TOP CAST */}
        {/* <InputText
          divClassName={classes["form-control-group-half-col"]}
          type="text"
          labelText="Add Top Cast (press enter to add more than one)"
          placeholderText="Add Top Cast"
          value={topCastVal}
          valueList={Object.values(topCast).map((el) => el.name)}
          onChange={setTopCastVal}
          onKeyDown={handleKeyDownAddTopCast}
        /> */}
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
        {/* PHOTOS */}
        {/* <InputText
          divClassName={classes["form-control-group-full-col"]}
          id="photos"
          labelText="Add Photos (press Enter to add director)"
          placeholderText="Add Photos"
          value={photosVal}
          onChange={setPhotosVal}
          onKeyDown={handleKeyDownAddPhotos}
          valueList={photos}
        /> */}

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
