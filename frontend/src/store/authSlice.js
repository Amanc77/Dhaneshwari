import { createSlice } from "@reduxjs/toolkit";

const STORAGE_USERS = "dhaneshwari_users";
const STORAGE_SESSION = "dhaneshwari_session";
const STORAGE_TOKEN = "dhaneshwari_auth_token";

function readSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: readSession(),
  },
  reducers: {
    setSession: (state, action) => {
      state.user = action.payload;
    },
    clearSession: (state) => {
      state.user = null;
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;
export const authReducer = authSlice.reducer;

export function authStorage() {
  return { STORAGE_USERS, STORAGE_SESSION, STORAGE_TOKEN };
}

