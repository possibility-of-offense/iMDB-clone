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

// Root
import Root from "./views/Root";

// Pages
import HomePage from "./views/HomePage";
import SingleMoviePage from "./views/SingleMoviePage/SingleMoviePage";
import AdminPage from "./views/AdminPage";
import CreateMoviePage from "./views/CreateMoviePage";
import GenresPage from "./views/GenresPage";
import LoginPage from "./views/LoginPage";

import SingleActorPage from "./views/SingleActorPage";

import MovieGallery from "./views/MovieGallery";
import Cast from "./views/Cast";
import PersonGallery from "./views/PersonGallery";
import SingleMoviePageEditPhotos from "./views/SingleMoviePage/SingleMoviePageEditPhotos";
import SingleMoviePageEditCast from "./views/SingleMoviePage/SingleMoviePageEditCast";

const container = document.getElementById("root");
const root = createRoot(container);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Fragment>
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />}></Route>
        <Route path="/movies/:id" element={<SingleMoviePage />}>
          <Route
            path="edit-photos"
            element={<SingleMoviePageEditPhotos />}
          ></Route>
        </Route>
        <Route
          path="/movies/:id/edit-cast"
          element={<SingleMoviePageEditCast />}
        ></Route>
        <Route path="/actors/:id" element={<SingleActorPage />}></Route>
        <Route path="/genres/:id" element={<GenresPage />}></Route>
        <Route path="/movie-gallery/:id" element={<MovieGallery />}></Route>
        <Route path="/actor-gallery/:id" element={<PersonGallery />}></Route>
        <Route path="/cast/:id" element={<Cast />}></Route>
        <Route path="/create-movie" element={<CreateMoviePage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
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
