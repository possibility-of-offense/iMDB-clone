import { useParams } from "react-router-dom";
import PhotosGallery from "../components/General/PhotosGallery";

const MovieGallery = () => {
  const { id } = useParams();

  return <PhotosGallery id={id} />;
};

export default MovieGallery;
