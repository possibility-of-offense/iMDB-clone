import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../config/config";

import GlobalLoader from "../components/UI/Loaders/GlobalLoader";

import useFetchData from "../hooks/useFetchData";

import classes from "./styles/AddMoviePhotos.module.css";

const AddMoviePhotos = () => {
  // const photos = [
  //   "https://images.unsplash.com/photo-1671371322375-d0ceee3b0eb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  //   "https://images.unsplash.com/photo-1671371322375-d0ceee3b0eb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  //   "https://images.unsplash.com/photo-1671371322375-d0ceee3b0eb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  //   "https://images.unsplash.com/photo-1671371322375-d0ceee3b0eb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  //   "https://images.unsplash.com/photo-1671371322375-d0ceee3b0eb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  // ];
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useFetchData(() =>
    getDocs(collection(db, "movies", id, "movie_gallery"))
  );
  const [photos, setPhotos] = useState([]);
  const [addPhotos, setAddPhotos] = useState("");

  useEffect(() => {
    if (data && data.docs) {
      setPhotos(data.docs.map((el) => ({ id: el.id, ...el.data() })));
    }
  }, [data]);

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

  //   useEffect(() => {
  //     const addPhotos = async () => {
  //       for (let p of photos) {
  //         await addDoc(collection(db, "movies", id, "movie_gallery"), {
  //           url: p,
  //         });
  //       }
  //     };
  //     addPhotos();
  //   });

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const splitAddPhotos = addPhotos.split("\n");
      const concatanated = photos.concat(splitAddPhotos);

      const photosDocs = await getDocs(
        collection(db, "movies", id, "movie_gallery")
      );

      for (let p of photosDocs.docs) {
        await deleteDoc(doc(db, "movies", id, "movie_gallery", p.id));
      }

      for (let photo of concatanated) {
        if (photo) {
          await addDoc(collection(db, "movies", id, "movie_gallery"), {
            url: photo.hasOwnProperty("url") ? photo.url : photo,
          });
        }
      }

      navigate(`/movie-gallery/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = (photo) => {
    setPhotos((prev) => prev.filter((el) => el.id !== photo.id));
  };

  const handleChange = (e) => {
    setAddPhotos((prev) => (prev = e.target.value));
  };

  return authorChecking === "finish" ? (
    <section className={classes.photos}>
      <small>
        If you want to delete the photos from the selected photos section. go to
        the movie page and delete it from there!
      </small>
      {photos?.length > 0 && (
        <div>
          {photos.map((photo, i) => (
            <p
              onClick={handleRemove.bind(null, photo)}
              key={photo.id + "--" + i}
            >
              {photo.url.slice(0, 60)}
            </p>
          ))}
        </div>
      )}
      <br />
      <form onSubmit={handleAdd}>
        <label>Add more photos</label>
        <textarea
          rows="12"
          value={addPhotos}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Save</button>
      </form>
    </section>
  ) : (
    <GlobalLoader bgColor="#1F1F1F" />
  );
};

export default AddMoviePhotos;
