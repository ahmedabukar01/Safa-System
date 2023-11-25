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
        updateUser: (state, action) => {
            console.log('dddd', state, "action", action)
            state.role = action.payload
        }
    }
})

export const { updateUser} =  userSlice.actions;

export default userSlice.reducer;