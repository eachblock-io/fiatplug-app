import toggleReducer from "./features/toggleSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([apiSlice.middleware]),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
