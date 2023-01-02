import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
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
      const [docSnapshot, gallerySnapshot] = await Promise.all([
        getDoc(doc(db, "movies", id)),
        getDocs(collection(db, "movies", id, "gallery")),
      ]);
      if (docSnapshot.exists()) {
        console.log(gallerySnapshot);
        return {
          id: docSnapshot.id,
          ...docSnapshot.data(),
          imagesLen: gallerySnapshot.docs.length,
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
