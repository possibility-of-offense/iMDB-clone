import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/General/Footer";
import Navigation from "../components/General/Navigation";
import ScrollToTop from "../components/General/ScrollTop";

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
