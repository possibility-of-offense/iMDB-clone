import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../config/config";
import useFetchData from "../hooks/useFetchData";

const HomePage = () => {
  const { data } = useFetchData(() => getDocs(collection(db, "movies")));

  const mappedData =
    data &&
    data.docs?.length > 0 &&
    data.docs.map((el) => ({ id: el.id, ...el.data() }));

  return (
    <div style={{ minHeight: "100vh", textAlign: "center" }}>
      <br />
      <h1>Home page</h1>

      {mappedData.length > 0 &&
        mappedData.map((el) => (
          <div key={el.id}>
            <Link to={`/movies/${el.id}`}>{el.movieTitle}</Link>
          </div>
        ))}
    </div>
  );
};

export default HomePage;
