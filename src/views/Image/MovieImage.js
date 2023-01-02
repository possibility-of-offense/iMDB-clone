// React Hooks
import { useEffect, useState } from "react";

// React Router hooks
import { useParams, useNavigate, Link } from "react-router-dom";

// Firebase SDK functions
import { doc, getDoc } from "firebase/firestore";

// Config references
import { db } from "../../config/config";

// Attributes
import attributes from "./styles/MovieImage.module.css";

const MovieImage = () => {
  // State variables
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");

  // Movie id
  const { movieId, imageId } = useParams();

  // Navigate hook
  const navigate = useNavigate();

  // Fetch image
  useEffect(() => {
    const fetching = async () => {
      setStatus("pending");
      try {
        let imgRef;
        imgRef = await getDoc(doc(db, "movies", movieId, "gallery", imageId));

        if (!imgRef.exists()) {
          imgRef = await getDoc(doc(db, "movies", movieId));
          const imgData = imgRef.data();
          const findImage = imgData.moviePhotos.findIndex(
            (el) => el.id === imageId
          );
          if (findImage !== -1) {
            setImage(imgData.moviePhotos[findImage]);
          }
        } else if (imgRef.exists()) {
          setImage({ id: imgRef.id, ...imgRef.data() });

          console.log(imgRef.data());
        }
      } catch (error) {
        console.log(error);
      } finally {
        setStatus("finished");
      }
    };
    fetching();
  }, [imageId, movieId]);

  return (
    <section className={attributes["movie-image__wrapper"]}>
      <div className={attributes["movie-image__wrapper--content"]}>
        {status !== "pending" ? (
          Object.values(image).length > 0 && (
            <>
              <div
                className={attributes["go-back"]}
                onClick={() => navigate(`/movies/${movieId}`)}
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="ipc-icon ipc-icon--clear ipc-button__icon ipc-button__icon--pre"
                    id="iconContext-clear"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    role="presentation"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path>
                  </svg>
                  <p>Close</p>
                </div>
                <div onClick={() => navigate(-1)}>Go back</div>
              </div>
              <img
                src={image.url}
                alt={image.movieName}
                title={image.movieName}
              />
              <div className={attributes["movie-image__wrapper--content-info"]}>
                <h5>
                  <Link to={`/movies/${image.movieId}`}>
                    {image.movieName} ({image.movieYear})
                  </Link>
                </h5>
              </div>
            </>
          )
        ) : (
          <div className={attributes["skeleton"]}>
            <h2>Loading</h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieImage;
