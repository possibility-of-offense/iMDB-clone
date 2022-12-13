import { useEffect, useState } from "react";
import { collection, doc, getDocs, where, getDoc } from "firebase/firestore";
import { db } from "../config/config";
import { useParams } from "react-router-dom";
import PhotosGallery from "../components/General/PhotosGallery";

const MovieGallery = () => {
  const { id } = useParams();

  const [movieGalleryState, setMovieGalleryState] = useState([]);

  useEffect(() => {
    if (movieGalleryState.length === 0) {
      const fetching = async () => {
        try {
          const docs = await getDocs(
            collection(db, "movies", id, "movie_gallery")
          );
          if (docs.docs.length > 0) {
            const mapped = docs.docs.map((el) => ({ id: el.id, ...el.data() }));
            setMovieGalleryState(mapped);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetching();
    }
  }, []);

  return <PhotosGallery id={id} data={movieGalleryState} />;
};

export default MovieGallery;
