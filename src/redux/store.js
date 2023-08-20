import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tasksApi } from "./services/tasksApi";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
});

setupListeners(store.dispatch);
