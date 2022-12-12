import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ minHeight: "100vh", textAlign: "center" }}>
      <br />
      <h1>Home page</h1>
      <Link to="/movies/ZCpKhxWwm9yl5pQrG2ah">Seven years in Tibet</Link>
      <br />
    </div>
  );
};

export default Home;
