import { Fragment, useEffect, useState } from "react";
import classes from "./styles/SingleMoviePageEditCast.module.css";

import { nanoid } from "nanoid";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/config";
import { useParams } from "react-router-dom";

const EditCastInput = ({ actors, editActors, updatePickedActors }) => {
  const [actor, setActor] = useState("choose-actor");
  const [inputValue, setInputValue] = useState("");

  const handleAddActor = (e) => {
    setActor(e.target.value);
    const foundActor = actors.find((actor) => actor.id === e.target.value);
    setInputValue(foundActor.name);

    editActors((prev) => {
      const found = prev.find((el) => el.id === e.target.value);

      if (found) {
        return prev.filter((el) => el.id !== found.id);
      }
    });
    updatePickedActors((prev) => prev.concat(foundActor));
  };

  useEffect(() => {
    if (inputValue) {
      const split = inputValue.split(/\s*\-\s*/);
      const last = split.pop();

      updatePickedActors((prev) => {
        const found = prev.findIndex((el) => el.id === actor);

        if (found || found === 0) {
          prev[found]["characterName"] = last;
          return prev;
        } else {
          return prev;
        }
      });
    }
  }, [inputValue]);

  return (
    <Fragment>
      <label htmlFor="pick-actor">Pick an actor</label>
      {actors.length > 0 ? (
        <select id="pick-actor" value={actor} onChange={handleAddActor}>
          <option disabled value="choose-actor">
            Pick an actor
          </option>
          {actors.map((actor) => (
            <option key={actor.id} value={actor.id}>
              {actor.name}
            </option>
          ))}
        </select>
      ) : (
        <p>No more actors to choose from</p>
      )}
      <input
        type="text"
        placeholder="Add cast member"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </Fragment>
  );
};

const SingleMoviePageEditCast = () => {
  const { id } = useParams();

  const [inputs, setInputs] = useState([]);
  const [hideButton, setHideButton] = useState(false);

  const [actorsData, setActorsData] = useState([]);
  const [pickedActors, setPickedActors] = useState([]);
  const [allActors, setAllActors] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      try {
        const actors = await getDocs(collection(db, "actors"));
        const movieRef = await getDoc(doc(db, "movies", id));

        if (actors.docs.length > 0 && movieRef.exists()) {
          const movieActors = movieRef.data();

          const mapped = actors.docs.map((d) => ({ id: d.id, ...d.data() }));

          const finalActors = [];
          for (let actor of mapped) {
            if (!movieActors.movieStuff.actors[actor.id])
              finalActors.push(actor);
          }

          setActorsData(finalActors);
          setAllActors(finalActors);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, []);

  // Handlers
  const handleAddInputs = () => {
    if (inputs.length < actorsData.length - 1) {
      setInputs((prev) => prev.concat(nanoid()));
    } else if (inputs.length === actorsData.length - 1) {
      setInputs((prev) => prev.concat(nanoid()));
      setHideButton(true);
    }
  };

  const handleAddCast = async (e) => {
    e.preventDefault();

    if (inputs.length === 0)
      return alert("No actors available for this movie!");

    try {
      const objs = {};

      const mappedPickedActors = pickedActors.map((el) => {
        objs[el.id] = {
          actorId: el.id,
          actorMainImage: el.main_image,
          actorName: el.name,
          characterName: el.characterName,
        };
      });

      await updateDoc(doc(db, "movies", id), {
        "movieStuff.actors": objs,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={classes["edit-cast__wrapper"]}>
      <div className="main-container">
        <h1>Edit cast</h1>
        <small>
          Add cast member in the input in the following format - e.g.: Brad Pitt
          - Heinrich Harrer
        </small>
        <form onSubmit={handleAddCast}>
          {!hideButton && (
            <button onClick={handleAddInputs} type="button">
              Add Cast
            </button>
          )}
          <hr />
          {inputs.length > 0 &&
            inputs.map((inp) => (
              <EditCastInput
                actors={actorsData}
                editActors={setActorsData}
                updatePickedActors={setPickedActors}
                key={inp}
              />
            ))}

          <br />
          <button type="submit">Save</button>
        </form>
      </div>
    </section>
  );
};

export default SingleMoviePageEditCast;
