import { configureStore } from "@reduxjs/toolkit";
import singleMovieSlice from "../features/movies/singleMovieSlice";

export const store = configureStore({
  reducer: {
    singleMovie: singleMovieSlice,
  },
});
