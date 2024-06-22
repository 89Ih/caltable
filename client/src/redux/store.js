import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
// eslint-disable-next-line
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import globleReducer from "./globleSlice";
const reducer = combineReducers({
  globle: globleReducer,
});
/// Configuration for store Data in Storge
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
