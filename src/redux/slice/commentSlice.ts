import { createSlice } from '@reduxjs/toolkit'

interface quantityState {
    quantityCmt: number
}

const initialState: quantityState = {
    quantityCmt: 0
}


const commentSlice = createSlice({
    name: "allCommentImg",
    initialState,
    reducers: {
        setQuantity: (state, { payload }) => {
            state.quantityCmt = payload
        }
    }
});

export const { setQuantity } = commentSlice.actions

export default commentSlice.reducer