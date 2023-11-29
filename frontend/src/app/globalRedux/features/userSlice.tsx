"use client"

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    role: "",
    fullName: "",
    access: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserRole: (state, action) => {
            state.role = action.payload
        }
    }
})

export const { setUserRole} =  userSlice.actions;

export default userSlice.reducer;