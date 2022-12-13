import { useParams } from "react-router-dom";
import PhotosGallery from "../components/General/PhotosGallery";
import { collection, doc, getDocs, where, getDoc } from "firebase/firestore";
import { db } from "../config/config";
import { useEffect, useState } from "react";

const PersonGallery = () => {
  const { id } = useParams();

  const [actorGalleryState, setActorGalleryState] = useState([]);

  useEffect(() => {
    if (actorGalleryState.length === 0) {
      const fetching = async () => {
        try {
          const docs = await getDocs(
            collection(db, "actors", id, "actor_gallery")
          );
          if (docs.docs.length > 0) {
            const mapped = docs.docs.map((el) => ({ id: el.id, ...el.data() }));
            setActorGalleryState(mapped);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetching();
    }
  }, []);

  return <PhotosGallery id={id} data={actorGalleryState} endpoint="actors" />;
};

export default PersonGallery;
