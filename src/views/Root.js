import React from "react";
import { Outlet } from "react-router-dom";

import Navigation from "../components/General/Partials/Navigation";
import Footer from "../components/General/Partials/Footer";
import ScrollToTop from "../components/UI/ScrollToTop";

function Root() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
      </header>

      <ScrollToTop>
        <Outlet />
      </ScrollToTop>
      <Footer />
    </div>
  );
}

export default Root;
