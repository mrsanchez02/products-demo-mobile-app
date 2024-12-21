import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";
import { create } from "zustand";

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking'

export interface AuthState {
  status: AuthStatus
  token?: string;
  user?: User

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  changeStatus: (token?: string, user?:User) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()( (set, get) => ({
  // Properties
  status: 'checking',
  token: undefined,
  user: undefined,
  
  // Actions
  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);    
    return get().changeStatus(resp?.token, resp?.user);
  },

  changeStatus: async (token?: string, user?: User) => {

    if (!token || !user) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      await SecureStorageAdapter.deleteItem('token');
      return false;
    }

    set({
      status: 'authenticated',
      token: token,
      user: user
    })

    await SecureStorageAdapter.setItem('token', token);

    return true;
  },
  
  checkStatus: async () => {
    // if ( get().user ) {
    //   return;
    // }

    const resp = await authCheckStatus();
    get().changeStatus(resp?.token, resp?.user);

  },
  
  logout: async () => {
    // TODO: Clear Token del secure Storage
    await SecureStorageAdapter.deleteItem('token')
    set({ status: 'unauthenticated', token: undefined, user: undefined })

  }
}) )