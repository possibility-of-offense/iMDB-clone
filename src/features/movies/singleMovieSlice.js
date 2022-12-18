import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../config/config";

const singleMovieSlice = createSlice({
  name: "singleMovie",
  initialState: {
    singleMovie: {},
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleMovie.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSingleMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleMovie = action.payload;
      })
      .addCase(fetchSingleMovie.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const fetchSingleMovie = createAsyncThunk(
  "singleMovie/fetchMovie",
  async (id) => {
    try {
      const docSnapshot = await getDoc(doc(db, "movies", id));
      if (docSnapshot.exists()) {
        return {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        };
      }
    } catch (error) {}
  }
);

export default singleMovieSlice.reducer;

export const selectTopCast = (state) =>
  state.singleMovie.singleMovie.movieStuff.actors;

export const selectBoxOffice = (state) =>
  state.singleMovie.singleMovie.box_office;

export const selectDidYouKnow = (state) =>
  state.singleMovie.singleMovie.did_you_know;
