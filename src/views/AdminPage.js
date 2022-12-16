import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/config";

const AdminPage = () => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      try {
        const [genresData, moviesData] = await Promise.all([
          getDocs(collection(db, "genres")),
          getDocs(collection(db, "movies")),
        ]);

        setGenres(genresData);
        setMovies(moviesData);
      } catch (error) {
        console.log(error);
      }
    };

    fetching();
  }, []);

  const handleDelete = async () => {
    try {
      let biggerCollection =
        genres.docs.length > movies.docs.length
          ? genres.docs.length
          : movies.docs.length;

      for (let i = 0; i < biggerCollection; i++) {
        if (genres.docs[i]) {
          await deleteDoc(doc(db, "genres", genres.docs[i].id));
        }
        if (movies.docs[i]) {
          await deleteDoc(doc(db, "movies", movies.docs[i].id));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Admin</h2>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default AdminPage;
