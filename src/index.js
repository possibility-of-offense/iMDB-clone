import React, { Fragment } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Movie from "./views/Movie";
import Actor from "./views/Person";
import Genres from "./views/Genres";
import Root from "./views/Root";
import Home from "./views/Home";
import MovieGallery from "./views/MovieGallery";
import Cast from "./views/Cast";
import PersonGallery from "./views/PersonGallery";

const container = document.getElementById("root");
const root = createRoot(container);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Fragment>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />}></Route>
        <Route path="/movies/:id" element={<Movie />}></Route>
        <Route path="/actors/:id" element={<Actor />}></Route>
        <Route path="/genres/:id" element={<Genres />}></Route>
        <Route path="/movie-gallery/:id" element={<MovieGallery />}></Route>
        <Route path="/person-gallery/:id" element={<PersonGallery />}></Route>
        <Route path="/cast/:id" element={<Cast />}></Route>
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
