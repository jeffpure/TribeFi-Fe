import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: storage,
};
const myPersistReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(myPersistReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);

export default store;

export type AppStore = typeof store;
