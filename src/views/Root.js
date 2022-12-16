import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Navigation from "../components/General/Partials/Navigation";
import Footer from "../components/General/Partials/Footer";
import ScrollToTop from "../components/UI/ScrollToTop";
import { auth } from "../config/config";
import { onAuthStateChanged } from "firebase/auth";
import GlobalLoader from "../components/UI/Loaders/GlobalLoader";

function Root() {
  const [fetchUserState, setFetchUserState] = useState("pending");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFetchUserState("fullfilled");
      } else {
        setFetchUserState("rejected");
      }
    });
  }, []);

  if (fetchUserState === "pending") {
    return <GlobalLoader bgColor="#1F1F1F" />;
  } else {
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
}

export default Root;
