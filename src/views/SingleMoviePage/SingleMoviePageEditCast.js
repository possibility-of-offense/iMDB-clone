import { Fragment, useEffect, useState } from "react";
import classes from "./styles/SingleMoviePageEditCast.module.css";

import { nanoid } from "nanoid";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/config";
import { useNavigate, useParams } from "react-router-dom";
import SingleMoviePageAccordionContainer from "../../components/SingleMoviePage/SingleMoviePageAccordionContainer";

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
      setActor("choose-actor");
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
    <SingleMoviePageAccordionContainer>
      <section className={classes["edit-cast-form"]}>
        {actors.length > 0 ? (
          <div className={classes["edit-cast-form__select"]}>
            <label htmlFor="pick-actor">Pick an actor</label>
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
          </div>
        ) : (
          <p className={classes["no-more-actors"]}>
            No more actors to choose from!
          </p>
        )}
        <input
          type="text"
          placeholder="Add cast member"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </section>
    </SingleMoviePageAccordionContainer>
  );
};

const SingleMoviePageEditCast = () => {
  const { id } = useParams();

  const [inputs, setInputs] = useState([]);
  const [hideButton, setHideButton] = useState(false);

  const [actorsData, setActorsData] = useState([]);
  const [pickedActors, setPickedActors] = useState([]);
  const [allActors, setAllActors] = useState([]);

  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetching = async () => {
      try {
        const actors = await getDocs(collection(db, "actors"));
        const movieRef = await getDoc(doc(db, "movies", id));

        if (actors.docs.length > 0 && movieRef.exists()) {
          const movieActors = movieRef.data();

          const mapped = actors.docs.map((d) => ({ id: d.id, ...d.data() }));

          const actorsAlreadyInMovie = [];
          const finalActors = [];

          for (let actor of mapped) {
            if (
              !movieActors.movieStuff.actors.find(
                (el) => Object.values(el)[0].actorId === actor.id
              )
            ) {
              finalActors.push(actor);
            } else {
              actorsAlreadyInMovie.push(actor);
            }
          }

          setActorsData(finalActors);
          setAllActors(actorsAlreadyInMovie);
          console.log(actorsAlreadyInMovie);
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

    setStatus("pending");

    if (inputs.length === 0)
      return alert("No actors available for this movie!");

    try {
      const additionalActors = {};

      const mappedPickedActors = pickedActors.map((el) => {
        additionalActors[el.id] = {
          actorId: el.id,
          actorMainImage: el.main_image,
          actorName: el.name,
          characterName: el.characterName,
        };
      });

      await updateDoc(doc(db, "movies", id), {
        "movieStuff.actors": arrayUnion(additionalActors),
      });
      navigate("/movies/" + id);
    } catch (error) {
      console.log(error);
    } finally {
      setStatus("finished");
    }
  };

  return (
    <section className={classes["edit-cast__wrapper"]}>
      <div className="main-container">
        <h1>Edit cast</h1>

        <form onSubmit={handleAddCast}>
          <div
            className={`${
              inputs.length > 0
                ? classes.instructions
                : classes["initial-instructions"]
            }`}
          >
            <small>
              Add cast member in the input in the following format - e.g.: Brad
              Pitt - Heinrich Harrer
            </small>
            {!hideButton && (
              <button
                onClick={handleAddInputs}
                type="button"
                className={classes["add-cast"]}
              >
                Add Cast
              </button>
            )}
          </div>
          {allActors?.length > 0 &&
            allActors.map((actor) => <p key={actor.id}>{actor.name}</p>)}
          {inputs.length > 0 && (
            <div className="overflow-hidden">
              {inputs.map((inp) => (
                <EditCastInput
                  actors={actorsData}
                  editActors={setActorsData}
                  updatePickedActors={setPickedActors}
                  key={inp}
                />
              ))}
              <div className={classes["save-wrapper"]}>
                {status === "pending" && (
                  <div className={classes["lds-ring"]}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                )}
                <button type="submit" className={classes.save}>
                  Save
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default SingleMoviePageEditCast;
