import { createSlice,PayloadAction} from '@reduxjs/toolkit'
import { errorPostPropsType, postPropsType, postWithPage } from '../vite-env'

const initialState = {
    latestPost:{} as postWithPage,
    searchedPost:{} as postWithPage|null,
    cmessage:'' as string|undefined,
    umessage:'' as string|undefined,
    dpmessage:'' as string|undefined,
    post:{} as postWithPage|null,
    singlePost:{} as postPropsType,
    isLoading: false as boolean,
    errorMessage: {} as errorPostPropsType|null
}

const postSlice = createSlice({
   name:'post',
   initialState,
   reducers:{

        createPostRequest:(state)=>{
            state.isLoading = true
        },
        createPostSucceess:(state,action:PayloadAction<string>)=>{
            state.isLoading = false,
            state.cmessage = action.payload
        },
        createPostFails:(state,action:PayloadAction<errorPostPropsType>)=>{
            state.isLoading = false,
            state.errorMessage = action.payload
        },

        getAllPostRequest:(state)=>{
            state.isLoading = true
        },
        getAllPostSucceess:(state,action:PayloadAction<postWithPage>)=>{
            state.isLoading = false,
            state.post = action.payload
        },
        getAllPostFails:(state,action:PayloadAction<errorPostPropsType>)=>{
            state.isLoading = false,
            state.errorMessage = action.payload
        },

        getPostByIdRequest:(state)=>{
            state.isLoading = true
        },
        getPostByIdSucceess:(state,action:PayloadAction<postPropsType>)=>{
            state.isLoading = false,
            state.singlePost = action.payload
        },
        getPostByIdPostFails:(state,action:PayloadAction<errorPostPropsType>)=>{
            state.isLoading = false,
            state.errorMessage = action.payload
        },

        updatePostRequest:(state)=>{
            state.isLoading = true
        },
        updatePostSucceess:(state,action:PayloadAction<string>)=>{
            state.isLoading = false,
            state.umessage = action.payload
        },
        updatePostFails:(state,action:PayloadAction<errorPostPropsType>)=>{
            state.isLoading = false,
            state.errorMessage = action.payload
        },

        updatePostImageRequest:(state)=>{
            state.isLoading = true
        },
        updatePostImageSucceess:(state,action:PayloadAction<string>)=>{
            state.isLoading = false,
            state.umessage = action.payload
        },
        updatePostImageFails:(state,action:PayloadAction<errorPostPropsType>)=>{
            state.isLoading = false,
            state.errorMessage = action.payload
        },

        

        deletePostByIdRequest:(state)=>{
            state.isLoading = true
        },
        deletePostByIdSucceess:(state,action:PayloadAction<string>)=>{
            state.isLoading = false,
            state.dpmessage = action.payload
        },
        deletePostByIdFails:(state,action:PayloadAction<errorPostPropsType>)=>{
            state.isLoading = false,
            state.errorMessage = action.payload
        },

        getLatestPostRequest:(state)=>{
            state.isLoading = true
        },
        getLatestPostSucceess:(state,action:PayloadAction<postWithPage>)=>{
            state.isLoading = false,
            state.latestPost = action.payload
        },
        getLatestPostFails:(state,action:PayloadAction<errorPostPropsType>)=>{
            state.isLoading = false,
            state.errorMessage = action.payload
        },

        getSearchPostRequest:(state)=>{
            state.isLoading = true
        },
        getSearchPostSucceess:(state,action:PayloadAction<postWithPage|null>)=>{
            state.isLoading = false,
            state.searchedPost = action.payload
        },
        getSearchPostFails:(state,action:PayloadAction<errorPostPropsType>)=>{
            state.isLoading = false,
            state.errorMessage = action.payload
        },

        postClearState: (state) => {
            state.cmessage = undefined
            state.umessage = undefined
            state.dpmessage = undefined
            state.errorMessage = null
        }

         
   }
})

export const {
  createPostRequest,
  createPostSucceess,
  createPostFails,
  getAllPostRequest,
  getAllPostSucceess,
  getAllPostFails,
  getLatestPostRequest,
  getLatestPostSucceess,
  getLatestPostFails,
  getPostByIdRequest,
  getPostByIdSucceess,
  getPostByIdPostFails,
  updatePostRequest,
  updatePostSucceess,
  updatePostFails,
  updatePostImageRequest,
  updatePostImageSucceess,
  updatePostImageFails,
  deletePostByIdRequest,
  deletePostByIdSucceess,
  deletePostByIdFails,
  getSearchPostRequest,
  getSearchPostSucceess,
  getSearchPostFails,
  postClearState
} = postSlice.actions

export default postSlice.reducer