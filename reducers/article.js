import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    value: [],
}

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        addArticleToStore: (state, action) => {
            console.log('Add article', action.payload)
            state.value = [...state.value, action.payload];
        },
        removeArticleFromStore: (state, action) => {
            state.value = []
        }
    }
})

export const { addArticleToStore, removeArticleFromStore } = articleSlice.actions;
export default articleSlice.reducer