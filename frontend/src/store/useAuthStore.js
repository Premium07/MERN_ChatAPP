import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingIn: false,
  isUpdatingProfile: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data, isCheckingAuth: false });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
