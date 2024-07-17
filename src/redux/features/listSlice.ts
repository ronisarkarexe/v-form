// redux/feature/listslice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User {
  email: string;
  name: string;
  password: string;
  position: string;
  rule: string;
  status: string;
}

interface IInitialState {
  users: User[];
  refresh: boolean;
  isLogin: boolean;
}

const initialState: IInitialState = {
  users: [],
  refresh: false,
  isLogin: false,
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    setRefresh: (state, action: PayloadAction<boolean>) => {
      state.refresh = action.payload;
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
});

export const { addUser, setRefresh, setIsLogin } = listSlice.actions;

export const selectRefreshState = (state: any) => state.list.refresh;
export const selectIsLoginState = (state: any) => state.list.isLogin;

export default listSlice.reducer;
