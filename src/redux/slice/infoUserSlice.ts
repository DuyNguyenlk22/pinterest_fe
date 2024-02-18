import { createSlice } from '@reduxjs/toolkit'
import { UserProps } from '../../model/userInterface';

interface stateProps {
    info: UserProps | null
}

const initialState: stateProps = {
    info: null
}

const infoUserSlice = createSlice({
    name: "infoUser",
    initialState,
    reducers: {
        setInfoUser: (state, { payload }) => {
            state.info = payload
        }
    }
});

export const { setInfoUser } = infoUserSlice.actions

export default infoUserSlice.reducer