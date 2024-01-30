import { configureStore } from '@reduxjs/toolkit'
import { courseSlice } from './courseSlice'

const store = configureStore({
    reducer: courseSlice.reducer,
    devTools: process.env.NODE_ENV !== "production",
})

export default store