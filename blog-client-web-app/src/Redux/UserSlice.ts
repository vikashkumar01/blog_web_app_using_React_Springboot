import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { errorMessagePropsType, errorUserMessage, signinPropsType, userPropsType, userWithPage } from "../vite-env";


const initialState = {
  user: {} as userPropsType | null,
  auser: {} as userWithPage | null,
  isLoading: false as boolean,
  smessage: '' as string | undefined,
  umessage: '' as string | undefined,
  dmessage: '' as string | undefined,
  Imessage: '' as string | undefined,
  isAuthenticated: false as boolean,
  isAdmin: false as boolean,
  errorMessage: {} as errorUserMessage | errorMessagePropsType | null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    signinRequest: (state) => {
      state.isLoading = true;
    },

    signinSuccess: (state, action: PayloadAction<signinPropsType>) => {

      state.isLoading = false;
      state.smessage = action.payload.message
      state.user = action.payload.user
      state.isAuthenticated = true
      state.isAdmin = !!action?.payload?.user?.roles?.find(role => role.name === "ROLE_ADMIN")
    },

    signinFails: (state, action: PayloadAction<errorUserMessage>) => {
      state.isLoading = false;
      state.errorMessage = action.payload
      state.isAuthenticated = false;
    },

    userRequest: (state) => {
      state.isLoading = true
    },
    userSuccess: (state, action: PayloadAction<userPropsType>) => {
      state.isLoading = false,
      state.isAuthenticated = true
      state.user = action.payload
      state.isAdmin = !!action?.payload?.roles?.find(role => role.name === "ROLE_ADMIN")
    },
    userFails: (state, action: PayloadAction<errorUserMessage>) => {
      state.isLoading = false
      state.isAuthenticated = false
      state.errorMessage = action.payload
    },

    getAlluserRequest: (state) => {
      state.isLoading = true
    },
    getAlluserSuccess: (state, action: PayloadAction<userWithPage>) => {
      state.isLoading = false,
        state.isAuthenticated = true
      state.auser = action.payload
    },
    getAlluserFails: (state, action: PayloadAction<errorUserMessage>) => {
      state.isLoading = false
      state.isAuthenticated = false
      state.errorMessage = action.payload
    },

    updateUserRequest: (state) => {
      state.isLoading = true
    },
    updateUserSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false,
        state.umessage = action.payload
    },
    updateUserFails: (state, action: PayloadAction<errorUserMessage>) => {
      state.isLoading = false
      state.errorMessage = action.payload
    },

    deleteUserRequest: (state) => {
      state.isLoading = true
    },
    deleteUserSuccess: (state, action: PayloadAction<userPropsType>) => {
      state.isLoading = false,
        state.isAuthenticated = false
      state.user = action.payload
    },
    deleteUserFails: (state, action: PayloadAction<errorUserMessage>) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.errorMessage = action.payload
    },

    uploadUserImageRequest: (state) => {
      state.isLoading = true
    },
    uploadUserImageSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false,
        state.Imessage = action.payload
    },
    uploadUserImageFails: (state, action: PayloadAction<errorUserMessage>) => {
      state.isLoading = false
      state.errorMessage = action.payload
    },

    logoutUserRequest: (state) => {
      state.isLoading = true
    },
    logoutUserSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false,
      state.isAuthenticated = false
      state.smessage = action.payload
      state.isAdmin = false
    },
    logoutUserFails: (state, action: PayloadAction<errorUserMessage>) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.isAdmin = true
      state.errorMessage = action.payload
    },

    userClearState: (state) => {
      state.smessage = undefined
      state.umessage = undefined
      state.dmessage = undefined
      state.Imessage = undefined
      state.errorMessage = null
    }
  }
})


export const {
  signinRequest,
  signinSuccess,
  signinFails,
  userRequest,
  userSuccess,
  userFails,
  getAlluserRequest,
  getAlluserSuccess,
  getAlluserFails,
  updateUserRequest,
  updateUserSuccess,
  updateUserFails,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFails,
  uploadUserImageRequest,
  uploadUserImageSuccess,
  uploadUserImageFails,
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserFails,
  userClearState
} = userSlice.actions

export default userSlice.reducer