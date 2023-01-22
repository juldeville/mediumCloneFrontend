import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    value: [],
}

export const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
        addTagToStore: (state, action) => {
            console.log('Add tag', action.payload)
            state.value = [...state.value, action.payload];
        },
        removeTagFromStore: (state, action) => {
            state.value = []
        }
    }
})

export const { addTagToStore, removeTagFromStore } = tagSlice.actions;
export default tagSlice.reducer