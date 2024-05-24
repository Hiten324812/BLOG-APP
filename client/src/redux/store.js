import { configureStore } from '@reduxjs/toolkit'
import usereducer from './user/userSlice'

export const store = configureStore({
  reducer: {
      user : usereducer
  },
})