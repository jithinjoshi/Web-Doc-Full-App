import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import doctorReducer from '../Redux/Doctor/doctorSlice';
import userReducer from '../Redux/User/userSlice';
import loadingReducer from '../Redux/Loader/LoadingSlice'
import paymentReducer from '../Redux/User/Paymentslice'
import chatUserReducer from '../Redux/Doctor/chatSlice'
import { persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  doctor: doctorReducer,
  user: userReducer,
  loading: loadingReducer,
  paymentDetails: paymentReducer,
  chatUser: chatUserReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store); // Export the persistor

