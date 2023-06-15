import { createSlice } from '@reduxjs/toolkit'

export const editTodoSlice = createSlice({
    name: "edittodo",
    initialState:{
        id: null
    },
    reducers: {
        changeEditTodoId: (state, action) => {
            state.id = action.payload
        },

        resetEditTodoId: (state) => {
            state.id = null
        }
    }
})

export const { changeEditTodoId, resetEditTodoId } = editTodoSlice.actions

export default editTodoSlice.reducer