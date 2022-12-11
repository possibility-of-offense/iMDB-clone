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
    </div>
  );
}

export default Home;
