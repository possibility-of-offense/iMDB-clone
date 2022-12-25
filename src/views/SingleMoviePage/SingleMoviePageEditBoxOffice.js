import classes from "./styles/SingleMoviePageEditStoryline.module.css";

import { FaWindowClose } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/config";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSingleMovie } from "../../features/movies/singleMovieSlice";
import SingleMoviePageAccordionContainer from "../../components/SingleMoviePage/SingleMoviePageAccordionContainer";

const SingleMoviePageEditBoxOffice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [boxOffice, setBoxOffice] = useState({});
  const [pendingState, setPendingState] = useState(null);

  useEffect(() => {
    const fetching = async () => {
      setPendingState("pending");
      try {
        const document = await getDoc(doc(db, "movies", id));
        if (document.exists()) {
          if (Object.keys(document.data().movieBoxOffice).length === 0) {
            setBoxOffice({ budget: "", expectedProfit: "" });
          } else {
            setBoxOffice(document.data().movieBoxOffice);
          }
        }
      } catch (error) {
        console.log(error);
      }
      setPendingState("finish");
    };
    fetching();
  }, []);

  const handleEditStoryline = async (e) => {
    e.preventDefault();

    try {
      console.log(boxOffice);
      if (
        Object.values(boxOffice)
          .map((el) => Number(el))
          .some((el) => typeof el !== "number")
      )
        return alert("Not a number");

      await updateDoc(doc(db, "movies", id), {
        movieBoxOffice: boxOffice,
      });
      dispatch(fetchSingleMovie(id));
      navigate(`/movies/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return pendingState === "finish" ? (
    <SingleMoviePageAccordionContainer>
      <section className={classes["edit-storyline"]}>
        <h3>
          <span>Edit Box Office</span>
          <span>
            <FaWindowClose
              onClick={() => navigate(`/movies/${id}`)}
              color="#ed4337"
              className="cursor-pointer"
            />
          </span>
        </h3>
        <form onSubmit={handleEditStoryline}>
          <div>
            <label htmlFor="edit-storyline">Edit/add budget</label>
            <input
              type="number"
              value={boxOffice.budget}
              onChange={(e) => {
                setBoxOffice((prev) => {
                  return {
                    ...prev,
                    budget: e.target.value,
                  };
                });
              }}
              id="edit-storyline"
              placeholder="Add Budget"
            />
          </div>

          <div>
            <label htmlFor="edit-taglines">Edit/add expected profit</label>
            <input
              type="number"
              value={boxOffice.expectedProfit}
              onChange={(e) => {
                setBoxOffice((prev) => {
                  return {
                    ...prev,
                    expectedProfit: e.target.value,
                  };
                });
              }}
              placeholder="Add Expected Profit"
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </section>
    </SingleMoviePageAccordionContainer>
  ) : (
    // prettier-ignore
    pendingState === "pending" && (
        <div className={classes["lds-ellipsis"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )
  );
};

export default SingleMoviePageEditBoxOffice;
