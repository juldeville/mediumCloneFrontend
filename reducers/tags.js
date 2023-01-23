import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    value: null,
}

export const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
        addTagToStore: (state, action) => {
            console.log('Add tag', action.payload)
            state.value = action.payload;
        },
    }
})

export const { addTagToStore,  } = tagSlice.actions;
export default tagSlice.reducer