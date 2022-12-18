import { collection, getDocs } from "firebase/firestore";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/config";
import useFetchData from "../hooks/useFetchData";

import classes from "./styles/HomePage.module.css";

const HomePage = () => {
  const { data } = useFetchData(() => getDocs(collection(db, "movies")));

  const mappedData =
    data &&
    data.docs?.length > 0 &&
    data.docs.map((el) => ({ id: el.id, ...el.data() }));

  return (
    <div className={classes["home-page"]}>
      <h1>Welcome to my iMDB clone</h1>

      <div className={classes["home-page__container"]}>
        {mappedData.length > 0 ? (
          mappedData.map((el) => (
            <div key={el.id}>
              <div>
                <figure>
                  <img
                    alt={el.movieTitle}
                    title={el.movieTitle}
                    src={el.movieMainImage}
                  />
                </figure>
              </div>
              <main>
                <header>
                  <h4>{el.movieTitle}</h4>
                </header>
                <div>
                  <Link to={`/movies/${el.id}`}>{el.movieTitle}</Link>
                </div>
              </main>
            </div>
          ))
        ) : (
          <div className={classes["home-page--skeletons"]}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
