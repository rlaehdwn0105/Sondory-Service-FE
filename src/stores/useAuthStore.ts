import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { User, Credential } from "../types";

interface UseAuthStore {
  user: User | null;
  isSigningUp: boolean;
  isCheckingAuth: boolean;
  isLoggingOut: boolean;
  isLoggingIn: boolean;

  signup: (credentials: Credential) => Promise<void>;
  login: (credentials: Credential) => Promise<void>;
  logout: () => Promise<void>;
  authCheck: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}

export const useAuthStore = create<UseAuthStore>((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  signup: async (credentials: Credential) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Verification link has been sent. Please check your email.");
    } catch (error: any) {
      set({ isSigningUp: false, user: null });
      toast.error(error.response?.data?.message);
    }
  },

  login: async (credentials: Credential) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
    } catch (error: any) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response?.data?.message);
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error: any) {
      set({ isLoggingOut: false });
      toast.error(error.response?.data?.message);
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error: any) {
      set({ isCheckingAuth: false, user: null });
      // toast.error(error.response?.data?.message);
    }
  },
  verifyEmail: async (token: string) => {
    try {
      await axiosInstance.get(`/auth/verify?token=${token}`);
      toast.success( "Your email has been successfully verified.");
    } catch (error: any) {
      // toast.error(error.response?.data?.message);
    }
  }
}));
