import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { categoryPropsType, CategoryWithPage, errorCategoryPropsType } from '../vite-env'

const initialState = {
    category: {} as categoryPropsType,
    scategory: {} as categoryPropsType,
    aCategory: {} as CategoryWithPage,
    isLoading: false as boolean,
    cmessage:'' as string|undefined,
    umessage: '' as string|undefined,
    dmessage: '' as string|undefined,
    errorCategoryMessage: {} as errorCategoryPropsType|null,
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

        createCategoryRequest: (state) => {
            state.isLoading = true;
        },
        createCategorySuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.cmessage = action.payload
        },
        createCategoryFails: (state, action: PayloadAction<errorCategoryPropsType>) => {
            state.isLoading = false;
            state.errorCategoryMessage = action.payload
        },

        getAllCategoryRequest: (state) => {
            state.isLoading = true;
        },
        getAllCategorySuccess: (state, action: PayloadAction<categoryPropsType>) => {
            state.isLoading = false;
            state.category = action.payload
        },
        getAllCategoryFails: (state, action: PayloadAction<errorCategoryPropsType>) => {
            state.isLoading = false;
            state.errorCategoryMessage = action.payload
        },

        getAllAdminCategoryRequest: (state) => {
            state.isLoading = true;
        },
        getAllAdminCategorySuccess: (state, action: PayloadAction<CategoryWithPage>) => {
            state.isLoading = false;
            state.aCategory = action.payload
        },
        getAllAdminCategoryFails: (state, action: PayloadAction<errorCategoryPropsType>) => {
            state.isLoading = false;
            state.errorCategoryMessage = action.payload
        },

        upadateCategoryRequest: (state) => {
            state.isLoading = true;
        },
        updateCategorySuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.umessage = action.payload
        },
        updateCategoryFails: (state, action: PayloadAction<errorCategoryPropsType>) => {
            state.isLoading = false;
            state.errorCategoryMessage = action.payload
        },

        getCategoryByIdRequest: (state) => {
            state.isLoading = true;
        },
        getCategoryByIdSuccess: (state, action: PayloadAction<categoryPropsType>) => {
            state.isLoading = false;
            state.scategory = action.payload
        },
        getCategoryByIdFails: (state, action: PayloadAction<errorCategoryPropsType>) => {
            state.isLoading = false;
            state.errorCategoryMessage = action.payload
        },

        deleteCategoryRequest: (state) => {
            state.isLoading = true;
        },
        deleteCategorySuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.dmessage = action.payload
        },
        deleteCategoryFails: (state, action: PayloadAction<errorCategoryPropsType>) => {
            state.isLoading = false;
            state.errorCategoryMessage = action.payload
        },

        clearCategoryState:(state) =>{
            state.cmessage=undefined,
            state.errorCategoryMessage =null;
            state.dmessage=undefined,
            state.umessage =undefined
        }
    }
}

)

export const {
    createCategoryRequest,
    createCategorySuccess,
    createCategoryFails,
    getAllCategoryRequest,
    getAllCategorySuccess,
    getAllCategoryFails,
    getCategoryByIdRequest,
    getCategoryByIdSuccess,
    getCategoryByIdFails,
    upadateCategoryRequest,
    updateCategorySuccess,
    updateCategoryFails,
    deleteCategoryRequest,
    deleteCategorySuccess,
    deleteCategoryFails,
    getAllAdminCategoryRequest,
    getAllAdminCategorySuccess,
    getAllAdminCategoryFails,
    clearCategoryState
    
} = categorySlice.actions

export default categorySlice.reducer