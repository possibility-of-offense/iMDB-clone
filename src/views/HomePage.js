import { collection, getDocs } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { db } from "../config/config";
import useFetchData from "../hooks/useFetchData";

import classes from "./styles/HomePage.module.css";

const HomePage = () => {
  const { data } = useFetchData(() => getDocs(collection(db, "movies")));

  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetching = async () => {
      setStatus("pending");
      try {
        const docs = await getDocs(collection(db, "movies"));
        if (docs.docs.length > 0) {
          setMovies(docs.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setStatus("finished");
      }
    };
    fetching();
  }, []);

  useEffect(() => {
    // Refactor - check when you go to other route and then press back button
    if ([...searchParams.entries()].length > 0) {
      const entries = [...searchParams.entries()];
      if (entries.find((entry) => entry[0] === "no-actor")) {
        alert("actor was not found");
        setSearchParams("");
      }
    }
  }, [searchParams]);

  const mappedData =
    data &&
    data.docs?.length > 0 &&
    data.docs.map((el) => ({ id: el.id, ...el.data() }));

  return (
    <div className={classes["home-page"]}>
      <h1>Welcome to my iMDB clone</h1>

      {status !== "pending" ? (
        movies.length === 0 ? (
          <h2 style={{ textAlign: "center", color: "#fff" }}>
            No movies added
          </h2>
        ) : (
          <div className={classes["home-page__container"]}>
            {movies.length > 0 &&
              movies.map((el) => (
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
              ))}
          </div>
        )
      ) : (
        <div className={classes["home-page--skeletons"]}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
