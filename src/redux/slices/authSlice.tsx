import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../types/authTypes';

const initialState: AuthState = {
    isLoggedIn: false,
    user: {}
};

export const authSlice = createSlice({
    name: 'authentication', // Исправлено название
    initialState,
    reducers: {
        isLogIn(state: AuthState, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setUser(state: AuthState, action: PayloadAction<any>) {
            state.user = action.payload;
        }
    },
});

export const { isLogIn, setUser } = authSlice.actions;

export default authSlice.reducer;
