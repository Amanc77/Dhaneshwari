import { useDispatch, useSelector } from "react-redux";
import { clearSession, setSession, authStorage } from "../store/authSlice.js";
import api from "../api/axios.js";

function safeJsonParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  const { STORAGE_SESSION, STORAGE_TOKEN } = authStorage();

  const signOut = () => {
    try {
      localStorage.removeItem(STORAGE_SESSION);
      localStorage.removeItem(STORAGE_TOKEN);
    } catch {
      // ignore
    }
    dispatch(clearSession());
    return { ok: true };
  };

  const signIn = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });
      const apiUser = data?.user || {};
      const session = {
        id: apiUser.id || apiUser._id,
        name: apiUser.name || "",
        email: apiUser.email || email.trim().toLowerCase(),
        phone: apiUser.phone || "",
        role: apiUser.role || "user",
      };

      localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
      if (data?.token) {
        localStorage.setItem(STORAGE_TOKEN, data.token);
      }
      dispatch(setSession(session));
      return { ok: true, user: session };
    } catch (error) {
      const message =
        error?.response?.data?.error || "Unable to sign in. Please try again.";
      return { ok: false, error: message };
    }
  };

  const signUp = async (name, email, password, phone = "", role = "user") => {
    try {
      await api.post("/auth/signup", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        phone: phone.trim(),
        role,
      });
      return signIn(email, password);
    } catch (error) {
      const message =
        error?.response?.data?.error || "Unable to sign up. Please try again.";
      return { ok: false, error: message };
    }
  };

  const updateProfile = async (updates) => {
    try {
      const { data } = await api.put("/auth/profile", {
        name: updates.name,
        phone: updates.phone,
      });
      const current = safeJsonParse(localStorage.getItem(STORAGE_SESSION), {});
      const session = {
        id: data.id || data._id || current.id,
        name: data.name || current.name || "",
        email: data.email || current.email || "",
        phone: data.phone || "",
        role: data.role || current.role || "user",
      };
      localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
      dispatch(setSession(session));
      return { ok: true, user: session };
    } catch (error) {
      const message =
        error?.response?.data?.error || "Unable to update profile.";
      return { ok: false, error: message };
    }
  };

  const hasRole = (roles) => {
    if (!user?.role) return false;
    if (!roles || roles.length === 0) return true;
    return roles.includes(user.role);
  };

  return {
    user,
    isAuthenticated: Boolean(user),
    hasRole,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };
}
