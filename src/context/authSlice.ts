import { encryptStorage } from "@/lib/storage";
import { createSlice } from "@reduxjs/toolkit";
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

const storedUser = encryptStorage?.getItem("user");
const initialState: AuthState = {
  status: !!storedUser,
  userData: storedUser ? storedUser : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.user;
      encryptStorage.setItem("user", action.payload.user);
    },
    logOut: (state) => {
      state.status = false;
      state.userData = null;
      encryptStorage.removeItem("user");
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
