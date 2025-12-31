import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { UserBase } from '@/types';

interface AuthStore {
  userStoreData: UserBase | null;
  setUserStoreData: (userStoreData: UserBase) => void;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userStoreData: null,
      setUserStoreData: (userStoreData) => set({ userStoreData }),
      showPassword: false,
      setShowPassword: (showPassword) => set({ showPassword })
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        userStoreData: state.userStoreData
      })
    }
  )
);
