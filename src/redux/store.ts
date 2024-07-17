// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import listReducer from "./features/listSlice";

export const store = configureStore({
  reducer: {
    list: listReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
