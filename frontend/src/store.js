import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './slices/pageSlice'
import editTodoReducer from './slices/editTodoSlice'

// The store of the global states
const store = configureStore({
    reducer: {
        edittodo: editTodoReducer,
        page: pageReducer
    }
})

export default store