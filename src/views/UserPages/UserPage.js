// Firebase SDK functions
import { collection, getDocs, query, where } from "firebase/firestore";

// React Hooks
import { useEffect, useState } from "react";

// React Router Elements
import { Link } from "react-router-dom";

// Config references
import { auth, db } from "../../config/config";

// Components
import GlobalLoader from "../../components/UI/Loaders/GlobalLoader";

// Attributes
import attributes from "./styles/UserPage.module.css";

// Assets
import personIcon from "./imgs/woman.png";

const UserPage = () => {
  const [status, setStatus] = useState(null);

  const [addedMovies, setAddedMoviews] = useState([]);
  const [addedActors, setAddedActors] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      setStatus("pending");
      try {
        const [moviesDocs, actorsDocs] = await Promise.all([
          getDocs(
            query(
              collection(db, "movies"),
              where("authorId", "==", auth?.currentUser?.uid)
            )
          ),
          getDocs(
            query(
              collection(db, "actors"),
              where("authorId", "==", auth?.currentUser?.uid)
            )
          ),
        ]);

        if (moviesDocs.docs.length > 0) {
          setAddedMoviews(
            moviesDocs.docs.map((el) => ({ id: el.id, ...el.data() }))
          );
        }

        if (actorsDocs.docs.length > 0) {
          setAddedActors(
            actorsDocs.docs.map((el) => ({ id: el.id, ...el.data() }))
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setStatus("finished");
      }
    };

    fetching();
  }, []);

  return status === "pending" ? (
    <GlobalLoader bgColor="#1F1F1F" />
  ) : (
    // Attributes
    <div className={attributes["user-page"]}>
      <div className={attributes["user-page__profile"]}>
        <h2>User: {auth?.currentUser?.email}</h2>
        <div>
          {auth?.currentUser?.photoURL ? (
            <img
              title="Person Icon"
              alt="Person Icon"
              src={auth?.currentUser?.photoURL}
            />
          ) : (
            <img title="Person Icon" alt="Person Icon" src={personIcon} />
          )}
          {/* TODO to be added */}
          <Link to={`/user-page/${auth?.currentUser?.uid}/edit-info`}>
            Edit user info
          </Link>
        </div>
      </div>
      <div className={attributes["user-page__added"]}>
        <div className={attributes["user-page__added--movies"]}>
          <h2>Added movies</h2>
          <div className={attributes.grid}>
            {addedMovies?.length > 0 ? (
              addedMovies.map((movie) => (
                <p key={movie.id}>
                  <Link to={`/movies/${movie.id}`}>{movie.movieTitle}</Link>
                </p>
              ))
            ) : (
              <p>No added movies yet!</p>
            )}
          </div>
        </div>

        <div className={attributes["user-page__added--actors"]}>
          <h2>Added actors</h2>
          <div className={attributes.grid}>
            {addedActors?.length > 0 ? (
              addedActors.map((actor) => (
                <p key={actor.id}>
                  <Link to={`/actors/${actor.id}`}>
                    {actor.actorName ? actor.actorName : "Unknown"}
                  </Link>
                </p>
              ))
            ) : (
              <p>No added actors yet!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
