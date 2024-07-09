import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  refreshToken: string;
  accessToken: string;
  image: string | undefined;
};

type AuthState = {
user:{
  isAuth: boolean;
  id:string;
  firstName: string;
  lastName: string;
  email: string;
  refreshToken:string;
  accessToken:string;
  image:string | undefined;
}
};

const initialState: AuthState = {
  user:{
    id:"",
    isAuth: false,
    firstName: "",
    lastName: "",
    email: "",
    accessToken: "",
    refreshToken: "",
    image:undefined
  }
};

export const auth = createSlice({
  name: "auth",
  initialState:initialState,
  reducers: {
    logOut: (state) => {
      state.user = { ...initialState.user };
    },
    logIn: (state, action: PayloadAction<UserState>) => {
      state.user = {
        ...action.payload,
        isAuth: true,
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;