import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    value: null,
}

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        addArticleToStore: (state, action) => {
            console.log('Add article', action.payload)
            state.value = action.payload;
        },
    }
})

export const { addArticleToStore, } = articleSlice.actions;
export default articleSlice.reducer