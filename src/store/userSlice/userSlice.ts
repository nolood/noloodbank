import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUsers} from "../../types/UsersType.ts";

type UserState = {
    isAuth: boolean,
    id: string,
    username: string,
    transferCard: string,
    transferId: string
    users: Array<IUsers>
}

const initialState: UserState = {
    isAuth: false,
    id: '',
    username: '',
    transferCard: '',
    transferId: '',
    users: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setId(state, action: PayloadAction<string>){
            state.id = action.payload
        },
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload
        },
        setTransferCard(state, action: PayloadAction<string>) {
            state.transferCard = action.payload
        },
        setTransferId(state, action: PayloadAction<string>) {
            state.transferId = action.payload
        },
        setUsersData(state, action: PayloadAction<Array<IUsers>>) {
            state.users = action.payload
        }
    }
})

export const {
    setUsersData,
    setTransferId,
    setTransferCard,
    setIsAuth,
    setId,
    setUsername
} = userSlice.actions;

export default userSlice.reducer;