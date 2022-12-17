import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/UI/Modals/Modal";
import { auth } from "../../config/config";

const SingleMoviePageEditPhotos = () => {
  const navigate = useNavigate();
  const selectMovieAuthorId = useSelector(
    (state) => state.singleMovie.singleMovie.authorId
  );
  const { id } = useParams();

  console.log(auth.currentUser, selectMovieAuthorId);

  useEffect(() => {
    if (auth.currentUser.uid !== selectMovieAuthorId) {
      navigate(`/movies/${id}`);
    }
  }, []);

  return (
    <Modal navigate={() => navigate(-1)}>
      <section>
        <form>
          <label>Add photos</label>
          <textarea type="text"></textarea>
        </form>
      </section>
    </Modal>
  );
};

export default SingleMoviePageEditPhotos;
