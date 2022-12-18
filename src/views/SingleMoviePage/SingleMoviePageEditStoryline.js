import classes from "./styles/SingleMoviePageEditStoryline.module.css";

import { FaWindowClose } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/config";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSingleMovie } from "../../features/movies/singleMovieSlice";

const SingleMoviePageEditStoryline = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [synopsis, setSynopsis] = useState({});
  const [pendingState, setPendingState] = useState(null);

  useEffect(() => {
    const fetching = async () => {
      setPendingState("pending");
      try {
        const document = await getDoc(doc(db, "movies", id));
        if (document.exists()) {
          setSynopsis(document.data().movieSynopsis);
        }
      } catch (error) {
        console.log(error);
      }
      setPendingState("finish");
    };
    fetching();
  }, []);

  const handleEditStoryline = async (e) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "movies", id), {
        movieSynopsis: synopsis,
      });
      dispatch(fetchSingleMovie(id));
      navigate(`/movies/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return pendingState === "finish" ? (
    <section className={classes["edit-storyline"]}>
      <h3>
        <span>Edit Form</span>
        <span>
          <FaWindowClose
            onClick={() => navigate(`/movies/${id}`)}
            color="#ed4337"
            className="cursor-pointer"
          />
        </span>
      </h3>
      <form onSubmit={handleEditStoryline}>
        <div>
          <label htmlFor="edit-storyline">Edit/add storyline</label>
          <textarea
            value={synopsis.storyline}
            onChange={(e) => {
              setSynopsis((prev) => {
                return {
                  ...prev,
                  storyline: e.target.value,
                };
              });
            }}
            id="edit-storyline"
          ></textarea>
        </div>

        <div>
          <label htmlFor="edit-taglines">Edit/add taglines</label>
          <input
            value={synopsis.taglines}
            onChange={(e) => {
              setSynopsis((prev) => {
                return {
                  ...prev,
                  taglines: e.target.value,
                };
              });
            }}
            type="text"
            placeholder="Taglines..."
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </section>
  ) : (
    // prettier-ignore
    pendingState === "pending" && (
        <div className={classes["lds-ellipsis"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )
  );
};

export default SingleMoviePageEditStoryline;
