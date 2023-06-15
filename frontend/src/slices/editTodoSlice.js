import { createSlice } from '@reduxjs/toolkit'

// A state slice that sets the ID fo a todo to be edited
export const editTodoSlice = createSlice({
    name: "edittodo",
    initialState:{
        id: null
    },
    reducers: {
        // Changing the ID
        changeEditTodoId: (state, action) => {
            state.id = action.payload
        },

        // Resetting the ID to null
        resetEditTodoId: (state) => {
            state.id = null
        }
    }
})

export const { changeEditTodoId, resetEditTodoId } = editTodoSlice.actions

export default editTodoSlice.reducer