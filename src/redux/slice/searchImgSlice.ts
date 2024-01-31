import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { searchImg } from '../../services/api';

const initialState = {
    imgSearch: null,
    isSearch: false
}

export const getImgSearch = createAsyncThunk("imgSearch",
    async (data: any, { dispatch }) => {
        try {
            let res = await searchImg(data)
            if (data) {
                dispatch(setData(res.data.content))
            }
            return res.data.content
        } catch (error) {
            throw new Error(`${error}`)
        }
    })

const searchImgSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducers: {
        setData: (state, { payload }) => {
            state.imgSearch = payload
            state.isSearch = true
        }
    }
});

export const { setData } = searchImgSlice.actions

export default searchImgSlice.reducer