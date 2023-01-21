import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { token: null },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signin: (state, action) => {
            state.value.token = action.payload.token;
            console.log('actionpayload value', action.payload.token)
        },
        signout: (state, action) => {
            state.value.token = null
        }
    },
});

export const { signin, signout } = userSlice.actions;
export default userSlice.reducer;
