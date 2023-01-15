import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    value: [],
}

export const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        addBookmarkToStore: (state, action) => {
            console.log('Add bookmark', action.payload)
            state.value = [...state.value, action.payload];
        },
        removeBookmarkFromStore: (state, action) => {
            state.value = state.value.filter(bookmark => bookmark.title !== action.payload.title)
        }
    }
})

export const { addBookmarkToStore, removeBookmarkFromStore } = bookmarksSlice.actions;
export default bookmarksSlice.reducer