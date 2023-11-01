import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import { messageWithPage } from '../vite-env'


const initialState = {
    isLoading: false as boolean,
    dmessage:'' as string,
    allMessage:{} as messageWithPage,
    errMessage:'' as string,
    cmessage:'' as string
}

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        createContactMessageRequest: (state) => {
            state.isLoading = true;
          },
      
          createContactMessageSuccess: (state, action: PayloadAction<string>) => {
      
            state.isLoading = false;
            state.cmessage = action.payload
          },
      
          createContactMessageFails: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errMessage = action.payload
          },

          getAllContactMessageRequest: (state) => {
            state.isLoading = true;
          },
      
          getAllContactMessageSuccess: (state, action: PayloadAction<messageWithPage>) => {
      
            state.isLoading = false;
            state.allMessage = action.payload
          },
      
          getAllContactMessageFails: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errMessage = action.payload
          },

          deleteContactMessageRequest: (state) => {
            state.isLoading = true;
          },
      
          deleteContactMessageSuccess: (state, action: PayloadAction<string>) => {
      
            state.isLoading = false;
            state.dmessage = action.payload
          },
      
          deleteContactMessageFails: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errMessage = action.payload
          },

          clearContactState:(state)=>{
            state.cmessage='',
            state.errMessage = '',
            state.dmessage = ''
          }

    }})

export const {
   createContactMessageRequest,
   createContactMessageSuccess,
   createContactMessageFails,
   getAllContactMessageRequest,
   getAllContactMessageSuccess,
   getAllContactMessageFails,
   deleteContactMessageRequest,
   deleteContactMessageSuccess,
   deleteContactMessageFails,
   clearContactState
} = contactSlice.actions

export default contactSlice.reducer