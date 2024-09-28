import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  acessToken: string;
}

interface AuthState {
  status: boolean;
  userData: User | null;
}

const initialState: AuthState = {
  status: localStorage?.getItem("user") ? true : false,
  userData: JSON.parse(localStorage?.getItem("user")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User }>) => {
      state.status = true;
      state.userData = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logOut: (state) => {
      state.status = false;
      state.userData = null;
      localStorage.removeItem("user");
    },
  },
});

export default authSlice;
export const { login, logOut } = authSlice.actions;

export const useAuthContext = () => {
  const userData = useSelector(
    (state: { auth: AuthState }) => state.auth.userData
  );
  const status = useSelector((state: { auth: AuthState }) => state.auth.status);
  return { userData, status };
};
