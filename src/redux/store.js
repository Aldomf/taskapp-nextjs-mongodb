import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./features/counter/toastSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tasksApi } from "./services/tasksApi";

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
});

setupListeners(store.dispatch);
