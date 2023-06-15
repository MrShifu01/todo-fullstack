import { createSlice } from '@reduxjs/toolkit'

// A state slice to assign a page name to when a page is visited, which helps with disabling certain features on certain pages
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