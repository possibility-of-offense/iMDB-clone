import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/config";

import Modal from "../../components/UI/Modals/Modal";

import deleteIcon from "./imgs/delete.png";
import classes from "./styles/SingleMoviePageEditPhotos.module.css";
import { fetchSingleMovie } from "../../features/movies/singleMovieSlice";

const SingleMoviePageEditPhotos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authorId, moviePhotos } = useSelector(
    (state) => state.singleMovie.singleMovie
  );
  const { id } = useParams();

  useEffect(() => {
    if (auth.currentUser.uid !== authorId) {
      navigate(`/movies/${id}`);
    }
  }, []);

  const [photos, setPhotos] = useState(moviePhotos);
  const [photosState, setPhotosState] = useState("");
  const [showError, setShowError] = useState(null);

  const handleAddPhotos = async (e) => {
    e.preventDefault();
    setShowError(false);

    if (!photosState && photos.length === 0) {
      setShowError(true);
      return;
    } else {
      setShowError(false);
    }

    try {
      let newMoviePhotos = photos
        .concat(photosState.split("\n"))
        .filter((el) => el !== "");

      if (newMoviePhotos.length > 10) return;

      await updateDoc(doc(db, "movies", id), {
        moviePhotos: newMoviePhotos,
      });

      dispatch(fetchSingleMovie(id));

      navigate("/movies/" + id);
    } catch (error) {
      console.log(error);
    }

    setPhotosState("");
  };

  // DOM Handlers
  const handleTextareaChange = (e) => {
    if (e.target.value) {
      setShowError(false);
    }

    setPhotosState(e.target.value);
  };

  const handleDelete = (i, e) => {
    setPhotos((prev) => prev.filter((el, ind) => ind !== i));
  };

  return (
    <Modal navigate={() => navigate("/movies/" + id)}>
      <section className={classes["edit-form__wrapper"]}>
        {photos.length > 0 && (
          <div className={classes["photos-list"]}>
            {photos.map((photo, i) => (
              <p key={photo + "---" + i}>
                <span>{photo}</span>
                <span>
                  <img
                    onClick={handleDelete.bind(null, i)}
                    alt="Delete icon"
                    title="Delete icon"
                    src={deleteIcon}
                  />
                </span>
              </p>
            ))}
          </div>
        )}
        <form onSubmit={handleAddPhotos}>
          {showError && <p>The input is empty! Fill it before sending it!</p>}
          <div>
            <div>
              <label htmlFor="add-photos">Add photos</label>
              <small>
                Add different image URL's on different lines to add multiple
                photos/images!
              </small>
            </div>
            <button onClick={() => navigate("/movies/" + id)}>Go back</button>
          </div>
          <textarea
            value={photosState}
            onChange={handleTextareaChange}
            id="add-photos"
            type="text"
          ></textarea>
          <button
            onClick={() => {
              navigate(-1);
            }}
            type="submit"
          >
            Add photos
          </button>
        </form>
      </section>
    </Modal>
  );
};

export default SingleMoviePageEditPhotos;
