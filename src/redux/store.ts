import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ordersApi from './apis/orders.api';
import { setupListeners } from '@reduxjs/toolkit/query';
import restaurantsApi from './apis/restaurants.api';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducer = combineReducers({
  [ordersApi.reducerPath]: ordersApi.reducer,
  [restaurantsApi.reducerPath]: restaurantsApi.reducer
});

const persistedReducer = persistReducer({
  key: 'root',
  storage
}, reducer);

export default (preloadedState = {}) => {
  const store = configureStore({
    devTools: true,
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
        .concat(ordersApi.middleware)
        .concat(restaurantsApi.middleware)
    }
  });

  setupListeners(store.dispatch);

  const persistor = persistStore(store);

  return { store, persistor };
};
