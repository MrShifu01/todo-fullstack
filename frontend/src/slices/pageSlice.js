import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
    name: "page",
    initialState:{
        page: "login"
    },
    reducers: {
        changePage: (state, action) => {
            state.page = action.payload
        },

        resetPage: (state) => {
            state.page = "login"
        }
    }
})

export const { resetPage, changePage } = pageSlice.actions

export default pageSlice.reducer