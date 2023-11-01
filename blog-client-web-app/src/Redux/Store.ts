import { configureStore } from '@reduxjs/toolkit'
import sigupSlice from './SignupSlice'
import UserSlice from './UserSlice'
import CategorySlice from './CategorySlice'
import PostSlice from './PostSlice'
import AdminSlice from './AdminSlice'
import ContactSlice from './ContactSlice'

export const store = configureStore({
  reducer: {
    signup:sigupSlice,
    user:UserSlice,
    category:CategorySlice,
    post:PostSlice,
    admin:AdminSlice,
    contact:ContactSlice
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch