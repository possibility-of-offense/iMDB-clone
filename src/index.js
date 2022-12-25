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

import SingleActorPage from "./views/SingleActorPage/SingleActorPage";
import SingleMoviePageEditPhotos from "./views/SingleMoviePage/SingleMoviePageEditPhotos";
import SingleMoviePageEditCast from "./views/SingleMoviePage/SingleMoviePageEditCast";
import SingleMoviePageEditStoryline from "./views/SingleMoviePage/SingleMoviePageEditStoryline";

// User Pages
import LoginPage from "./views/UserPages/LoginPage";
import UserPage from "./views/UserPages/UserPage";
import CreateMoviePage from "./views/UserPages/CreateMoviePage";

// Archives
import GenresPage from "./views/Archives/GenresPage";
import MovieGalleryRoot from "./views/Archives/MovieGalleryRoot";
import MovieGallery from "./views/Archives/MovieGallery";

import Cast from "./views/Cast";
import PersonGallery from "./views/PersonGallery";
import SingleMoviePageEditBoxOffice from "./views/SingleMoviePage/SingleMoviePageEditBoxOffice";
import AddMoviePhotos from "./views/AddMoviePhotos";
import MovieImage from "./views/MovieImage";
import AddActorPage from "./views/UserPages/AddActorPage";

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
          <Route
            path="edit-storyline"
            element={<SingleMoviePageEditStoryline />}
          ></Route>
          <Route
            path="edit-box-office"
            element={<SingleMoviePageEditBoxOffice />}
          ></Route>
        </Route>
        <Route
          path="/movies/:id/edit-cast"
          element={<SingleMoviePageEditCast />}
        ></Route>
        <Route
          path="/movies/:movieId/image/:imageEId"
          element={<MovieImage />}
        ></Route>
        <Route path="/actors/:id" element={<SingleActorPage />}></Route>
        <Route path="/genres/:id" element={<GenresPage />}></Route>
        <Route path="/movie-gallery/:id" element={<MovieGalleryRoot />}>
          <Route index element={<MovieGallery />}></Route>
          <Route path="add-photos" element={<AddMoviePhotos />}></Route>
        </Route>
        <Route path="/actor-gallery/:id" element={<PersonGallery />}></Route>
        <Route path="/cast/:id" element={<Cast />}></Route>
        {/* USER ROUTES */}
        <Route path="/create-movie" element={<CreateMoviePage />}></Route>
        <Route path="/user-page" element={<UserPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/add-actor" element={<AddActorPage />}></Route>
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
