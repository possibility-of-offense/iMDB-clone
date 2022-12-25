import { useEffect, useState } from "react";
import { collection, doc, getDocs, where, getDoc } from "firebase/firestore";
import { db } from "../../config/config";
import { useParams } from "react-router-dom";
import PhotosGallery from "../../components/General/Diverse/PhotosGallery";

const MovieGallery = () => {
  const { id } = useParams();

  const [movieGalleryState, setMovieGalleryState] = useState([]);

  useEffect(() => {
    if (movieGalleryState.length === 0) {
      const fetching = async () => {
        try {
          const [movieGallery, movieGalleryDocs] = await Promise.all([
            getDoc(doc(db, "movies", id)),
            getDocs(collection(db, "movies", id, "movie_gallery")),
          ]);

          if (movieGallery.exists()) {
            let mapped = [...movieGallery.data().moviePhotos];

            if (movieGalleryDocs.docs.length > 0) {
              console.log(movieGalleryDocs.docs.length);
              mapped = mapped.concat(
                movieGalleryDocs.docs
                  .map((el) => ({ id: el.id, ...el.data() }))
                  .map((el) => el.url)
              );
            }

            setMovieGalleryState(mapped);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetching();
    }
  }, []);

  if (movieGalleryState.length === 0) {
    return <h1>No photos yet!</h1>;
  } else {
    return <PhotosGallery id={id} data={movieGalleryState} />;
  }
};

export default MovieGallery;
