import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { errorMessagePropsType, signupPropsType } from '../vite-env';



const initialState = {
    user: {} as signupPropsType | null,
    isLoading: false as boolean,
    errorMessage: {} as errorMessagePropsType | null
}

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {

        signupRequest: (state) => {
            state.isLoading = true;
        },

        signupSuccess: (state, action: PayloadAction<signupPropsType>) => {

            state.isLoading = false;
            state.user = action.payload
        },

        signupFails: (state, action: PayloadAction<errorMessagePropsType>) => {
            state.isLoading = false;
            state.errorMessage = action.payload
        },

        signupCleartState: (state) => {
            state.user = null
            state.errorMessage = null
        }

    }
})



export const {
    signupRequest,
    signupFails,
    signupSuccess,
    signupCleartState } = signupSlice.actions

export default signupSlice.reducer