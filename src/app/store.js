import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import singleMovieSlice from "../features/movies/singleMovieSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    singleMovie: singleMovieSlice,
  },
});
