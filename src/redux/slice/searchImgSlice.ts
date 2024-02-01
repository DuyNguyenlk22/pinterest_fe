import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { searchImg } from '../../services/api';

const initialState = {
    imgSearch: null,
    isSearch: false
}

export const getImgSearch = createAsyncThunk("imgSearch",
    async (data: string, { dispatch }) => {
        try {
            let res = await searchImg(data)
            if (data) {
                dispatch(setIsSearch(true))
                dispatch(setData(res.data.content))
            }

            return res.data.content
        } catch (error: any) {
            dispatch(setIsSearch(false))
            throw new Error(`${error.message}`)
        }
    })

const searchImgSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducers: {
        setData: (state, { payload }) => {
            state.imgSearch = payload
        },
        setIsSearch: (state, { payload }) => {
            state.isSearch = payload
        }
    }
});

export const { setData, setIsSearch } = searchImgSlice.actions

export default searchImgSlice.reducer