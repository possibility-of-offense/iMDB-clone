import { useEffect, useState } from "react";
import { collection, doc, getDocs, where, getDoc } from "firebase/firestore";
import { db } from "../../config/config";
import { useParams } from "react-router-dom";
import PhotosGallery from "../../components/General/Diverse/PhotosGallery";
import GlobalLoader from "../../components/UI/Loaders/GlobalLoader";

const MovieGallery = () => {
  const { id } = useParams();

  const [movieGalleryState, setMovieGalleryState] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (movieGalleryState.length === 0) {
      const fetching = async () => {
        setStatus("pending");

        try {
          const [movieGallery, movieGalleryDocs] = await Promise.all([
            getDoc(doc(db, "movies", id)),
            getDocs(collection(db, "movies", id, "gallery")),
          ]);

          if (movieGallery.exists()) {
            let mapped = [...movieGallery.data().moviePhotos];

            if (movieGalleryDocs.docs.length > 0) {
              mapped = mapped.concat(
                movieGalleryDocs.docs.map((el) => ({ id: el.id, ...el.data() }))
              );
            }
            let unique = [];
            for (let movie of mapped) {
              if (!unique.find((e) => e.id === movie.id)) {
                unique.push(movie);
              }
            }

            setMovieGalleryState(unique);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setStatus("finished");
        }
      };

      fetching();
    }
  }, []);

  return status !== "pending" ? (
    <PhotosGallery id={id} data={movieGalleryState} />
  ) : (
    <GlobalLoader bgColor="#1F1F1F" />
  );
};

export default MovieGallery;
