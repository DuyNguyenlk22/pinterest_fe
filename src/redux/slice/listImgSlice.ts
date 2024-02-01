import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getListImg } from '../../services/api'
import { imgProp } from '../../model/imageInterface'

const initialState = {
    listImg: Array<imgProp>
}

export const getAllImg = createAsyncThunk("listImg",
    async (_, { dispatch }) => {
        try {
            let res = await getListImg()
            dispatch(setListImage(res.data.content))
            return res.data.content
        } catch (error: any) {
            throw new Error(`${error.message}`)
        }
    })

const listImgSlice = createSlice({
    name: "listImg",
    initialState,
    reducers: {
        setListImage: (state, { payload }) => {
            state.listImg = payload
        }
    }
});

export const { setListImage } = listImgSlice.actions

export default listImgSlice.reducer