import { addDoc, collection } from "firebase/firestore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/config";

const AddMoviePhotos = () => {
  const photos = [
    "https://images.unsplash.com/photo-1671371322375-d0ceee3b0eb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1671371322375-d0ceee3b0eb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1671371322375-d0ceee3b0eb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1671371322375-d0ceee3b0eb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1671371322375-d0ceee3b0eb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  ];
  const { id } = useParams();

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

  return <section>Movie photos</section>;
};

export default AddMoviePhotos;
