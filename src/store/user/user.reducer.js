//import { createSlice } from "@reduxjs/toolkit";
import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
}

export function userReducer(state = INITIAL_STATE, action) {
    const {type, payload} = action;

    switch(type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload
            };
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            }
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
}

/*
export const userSlice = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload
        }
    }
});

export const { setCurrentUser } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
*/