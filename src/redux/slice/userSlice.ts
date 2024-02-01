import { createSlice } from '@reduxjs/toolkit'
import { localService } from '../../services/localService';
import { UserProps } from '../../model/userInterface';

interface infoStateProps {
    infoUser: UserProps
}

const initialState: infoStateProps = {
    infoUser: localService.get()
}

const userSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setInfo: (state, { payload }) => {
            state.infoUser = payload
        }
    }
});

export const { setInfo } = userSlice.actions

export default userSlice.reducer