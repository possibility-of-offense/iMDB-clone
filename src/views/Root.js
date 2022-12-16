import React, { useEffect, useReducer, useState } from "react";
import { auth } from "../config/config";
import { onAuthStateChanged } from "firebase/auth";
import { Outlet, useLocation } from "react-router-dom";
import { rootReducer } from "../reducers/rootReducer";

import Navigation from "../components/General/Partials/Navigation";
import Footer from "../components/General/Partials/Footer";
import ScrollToTop from "../components/UI/ScrollToTop";
import GlobalLoader from "../components/UI/Loaders/GlobalLoader";
import PopupModal from "../components/UI/Alerts/PopupModal";

function Root() {
  const location = useLocation();

  const [rootState, rootDispatch] = useReducer(rootReducer, {
    fetchUserState: "pending",
    hasSignedOut: false,
    hasSignedIn: false,
  });

  const handleSignOut = (payload) => {
    rootDispatch({ type: "SET_HAS_SIGNED_OUT", payload });
  };

  const handleSignIn = (payload) => {
    rootDispatch({ type: "SET_HAS_SIGNED_IN", payload });
  };

  useEffect(() => {
    if (location.pathname === "/login") {
      rootDispatch({ type: "SET_HAS_SIGNED_OUT", payload: false });
      document.body.style.background = "#ddd";
    } else if (location.search === "?login=successfull") {
      handleSignIn(true);
    } else {
      document.body.style.background = "transparent";
    }
  }, [location]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        rootDispatch({ type: "SET_FETCH_USER_STATE", payload: "fullfilled" });
      } else {
        rootDispatch({ type: "SET_FETCH_USER_STATE", payload: "rejected" });
      }
    });
  }, [auth]);

  if (rootState.fetchUserState === "pending") {
    return <GlobalLoader bgColor="#1F1F1F" />;
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <Navigation alertSignetOut={handleSignOut} />
        </header>
        {rootState.hasSignedOut && (
          <PopupModal
            onClick={(e) => {
              e.preventDefault();
              handleSignOut(false);
            }}
          >
            You just sign out!
          </PopupModal>
        )}

        {rootState.hasSignedIn && (
          <PopupModal
            onClick={(e) => {
              e.preventDefault();
              handleSignIn(false);
            }}
          >
            You just sign in!
          </PopupModal>
        )}

        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
        <Footer />
      </div>
    );
  }
}

export default Root;
