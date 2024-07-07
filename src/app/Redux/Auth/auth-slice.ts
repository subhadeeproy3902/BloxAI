import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<any>) => {
      state.user.id = action.payload.id
      state.user.email = action.payload.email;
      state.user.isAuth = true;
      state.user.accessToken = action.payload.accessToken;
      state.user.refreshToken = action.payload.refreshToken;
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
      state.user.image = action.payload.image;
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;