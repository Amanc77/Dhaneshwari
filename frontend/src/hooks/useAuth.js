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

  const applyLoginResponse = (data, fallbackEmail) => {
    const apiUser = data?.user || {};
    const role = String(apiUser.role || "user").toLowerCase();
    const session = {
      id: apiUser.id || apiUser._id,
      name: apiUser.name || (role === "admin" ? "Admin" : ""),
      email: apiUser.email || fallbackEmail,
      phone: apiUser.phone || "",
      role,
    };
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
    if (data?.token) {
      localStorage.setItem(STORAGE_TOKEN, data.token);
    }
    dispatch(setSession(session));
    return { ok: true, user: session };
  };

  const signIn = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    try {
      const { data } = await api.post("/auth/login", {
        email: normalizedEmail,
        password,
      });
      return applyLoginResponse(data, normalizedEmail);
    } catch (error) {
      const status = error?.response?.status;
      const errMsg = String(error?.response?.data?.error || "");
      if (
        status === 404 &&
        errMsg.toLowerCase().includes("not found")
      ) {
        try {
          const { data } = await api.post("/admin/login", {
            email: normalizedEmail,
            password,
          });
          return applyLoginResponse(data, normalizedEmail);
        } catch (adminErr) {
          const message =
            adminErr?.response?.data?.error ||
            "Unable to sign in. Please try again.";
          return { ok: false, error: message };
        }
      }
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
    const r = String(user.role).toLowerCase();
    return roles.some((x) => String(x).toLowerCase() === r);
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
