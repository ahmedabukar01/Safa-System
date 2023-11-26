"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
// import storage from 'redux-persist/lib/storage'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-community/async-storage';

// const rootReducers = combineReducers({
//     UserInfo: userSlice
// });

const persistConfig = {
    key: "user",
    storage: AsyncStorage
}

const rootReducer = combineReducers({
  UserInfo: userSlice,
  //add all your reducers here
},);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }),
 });