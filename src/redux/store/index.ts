import { configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import {
  FLUSH, PAUSE,
  PERSIST, persistReducer, persistStore, PURGE,
  REGISTER, REHYDRATE
} from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';
import { weatherApi } from 'src/services/weatherService';
import rootReducer, { AppReducer } from './rootReducer';

const encryptor = encryptTransform({
  secretKey: process.env.REACT_APP_REDUX_SECRET_KEY,
  onError(error) {
    // Handle the error.
    console.log(error);
  },
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  transforms: [encryptor],
  blacklist: [weatherApi.reducerPath],
  whiteList: []
};

const persistedReducer = persistReducer<AppReducer>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(weatherApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
