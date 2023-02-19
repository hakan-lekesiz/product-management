import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import userReducer from './features/user/userSlice'
import filterReducer from './features/filter/filterSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
        filter: filterReducer,
    },
})