import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../config/config";

import GlobalLoader from "../../components/UI/Loaders/GlobalLoader";

import useFetchData from "../../hooks/useFetchData";

import attributes from "./styles/AddMoviePhotos.module.css";

const AddMoviePhotos = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useFetchData(() =>
    getDocs(collection(db, "movies", id, "gallery"))
  );
  const [addPhotos, setAddPhotos] = useState("");
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    const fetching = async () => {
      try {
        const getMovieData = await getDoc(doc(db, "movies", id));
        setMovieData({
          id: getMovieData.id,
          ...getMovieData.data(),
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  });

  const [authorChecking, setAuthorChecking] = useState(null);

  useEffect(() => {
    setAuthorChecking("pending");

    getDoc(doc(db, "movies", id))
      .then((data) => {
        if (data.exists()) {
          const movieData = data.data();

          if (
            auth &&
            !auth.currentUser &&
            movieData.authorId !== auth.currentUser?.uid
          ) {
            navigate(`/movie-gallery/${id}`);
          }
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setAuthorChecking("finish"));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const splitAddPhotos = addPhotos.split("\n");
      let concatanated = splitAddPhotos;

      const photosDocs = await getDocs(collection(db, "movies", id, "gallery"));

      for (let p of photosDocs.docs) {
        // if (!concatanated.find((el) => el.movieName !== p.data().movieName)) {
        //   concatanated.push(p.data());
        // }
        await deleteDoc(doc(db, "movies", id, "gallery", p.id));
      }

      for (let photo of concatanated) {
        if (photo) {
          await addDoc(collection(db, "movies", id, "gallery"), {
            url: photo.hasOwnProperty("url") ? photo.url : photo,
            movieName: movieData.movieTitle,
            movieYear: movieData.movieYear,
            movieId: movieData.id,
          });
        }
      }

      navigate(`/movie-gallery/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setAddPhotos((prev) => (prev = e.target.value));
  };

  return authorChecking === "finish" ? (
    <section className={attributes.photos}>
      <h2>Adding photos</h2>
      <div className={attributes["photos--inner"]}>
        <form onSubmit={handleAdd}>
          <label>Add more photos (add the urls on separate lines)</label>
          <div>
            <textarea value={addPhotos} onChange={handleChange}></textarea>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </section>
  ) : (
    <GlobalLoader bgColor="#1F1F1F" />
  );
};

export default AddMoviePhotos;
