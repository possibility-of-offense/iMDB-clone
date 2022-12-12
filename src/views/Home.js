import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/General/Navigation";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
      </header>
      <Outlet />

      <footer>
        <h2>Some footer info will be here</h2>
      </footer>
    </div>
  );
}

export default Home;
