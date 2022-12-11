import React, { Fragment } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Home from "./views/Home";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Movie from "./views/Movie";

const container = document.getElementById("root");
const root = createRoot(container);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Fragment>
      <Route path="/" element={<Home />}>
        <Route path="/movies/:id" element={<Movie />}></Route>
      </Route>
    </Fragment>
  )
);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
