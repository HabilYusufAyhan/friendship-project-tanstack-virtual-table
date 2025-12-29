import { create } from 'zustand';

interface AuthStore {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: true,
  setIsLogin: (isLogin) => set({ isLogin }),
  showPassword: false,
  setShowPassword: (showPassword) => set({ showPassword })
}));
