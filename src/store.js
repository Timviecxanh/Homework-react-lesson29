import { configureStore } from "@reduxjs/toolkit";
import movieBookingReducer from "./MovieBookingRedux/slice";

const store = configureStore({
  reducer: {
    movieBookingReducer,
  },
});

export default store;
