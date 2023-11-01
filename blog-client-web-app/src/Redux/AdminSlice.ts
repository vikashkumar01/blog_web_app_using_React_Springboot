import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dashboardPropsTypes, errorMessagePropsType,errorUserMessage,userWithPage } from "../vite-env";


const initialState = {
  auser:{} as userWithPage | null,
  dashboard: {} as dashboardPropsTypes|null,
  isLoading: false as boolean,
  dmessage: '' as string|undefined,
  errorMessage: {} as errorUserMessage | errorMessagePropsType | null
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {

   
    getAlluserRequest: (state) => {
      state.isLoading = true
    },
    getAlluserSuccess: (state, action: PayloadAction<userWithPage>) => {
      state.isLoading = false,
      state.auser = action.payload
    },
    getAlluserFails: (state, action: PayloadAction<errorUserMessage>) => {
      state.isLoading = false
      state.errorMessage = action.payload
    },

    getDashBoardDataRequest: (state) => {
      state.isLoading = true
    },
    getDashBoardDataSuccess: (state, action: PayloadAction<dashboardPropsTypes>) => {
      state.isLoading = false,
      state.dashboard = action.payload
    },
    getDashBoardDateFails: (state, action: PayloadAction<errorUserMessage>) => {
      state.isLoading = false
      state.errorMessage = action.payload
    },

    

    deleteUserRequest: (state) => {
      state.isLoading = true
    },
    deleteUserSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false,
      state.dmessage = action.payload
    },
    deleteUserFails: (state, action: PayloadAction<errorUserMessage>) => {
      state.isLoading = false
      state.errorMessage = action.payload
    },

    userClearState: (state) => {
      state.dmessage = undefined
      state.errorMessage = null
    }
  }
})


export const {
  getAlluserRequest,
  getAlluserSuccess,
  getAlluserFails,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFails,
  getDashBoardDataRequest,
  getDashBoardDataSuccess,
  getDashBoardDateFails,
  userClearState
} = adminSlice.actions

export default adminSlice.reducer