import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/General/Footer";
import Navigation from "../components/General/Navigation";

function Root() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
      </header>
      <Outlet />

      <Footer />
    </div>
  );
}

export default Root;
