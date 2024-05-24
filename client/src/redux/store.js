import { configureStore , combineReducers } from '@reduxjs/toolkit'
import usereducer from './user/userSlice'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { version } from 'react'
import persistStore from 'redux-persist/es/persistStore'

const rootReducer = combineReducers({
  user : usereducer
})

const persistConfig = {
  key : 'root',
  storage ,
  version : 1,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer: persistedReducer ,
  middleware : (getDefault) => getDefault({
    serializableCheck : false
  })
})

export const persistor = persistStore(store)