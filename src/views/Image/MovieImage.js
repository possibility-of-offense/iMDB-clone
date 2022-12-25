// React Hooks
import { useEffect, useState } from "react";

// React Router hooks
import { useParams } from "react-router-dom";

// Firebase SDK functions
import { doc, getDoc } from "firebase/firestore";

// Config references
import { db } from "../../config/config";
import GlobalLoader from "../../components/UI/Loaders/GlobalLoader";

const MovieImage = () => {
  // State variables
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");

  // Movie id
  const { movieId, imageId } = useParams();

  // Fetch image
  useEffect(() => {
    const fetching = async () => {
      setStatus("pending");
      try {
        const imgRef = await getDoc(
          doc(db, "movies", movieId, "gallery", imageId)
        );

        if (imgRef.exists()) {
          setImage({ id: imgRef.id, ...imgRef.data() });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setStatus("finished");
      }
    };
    fetching();
  }, []);

  return (
    <div>
      <h2>Movie Image</h2>
      {status !== "pending" ? (
        Object.values(image).length > 0 && <img src={image.url} />
      ) : (
        <div>LOADING</div>
      )}
    </div>
  );
};

export default MovieImage;
