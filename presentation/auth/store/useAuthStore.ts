import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import { create } from "zustand";

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking'

export interface AuthState {
  status: AuthStatus
  token?: string;
  user?: User

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  changeStatus: (token?: string, user?:User) => boolean;
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

  changeStatus: (token?: string, user?: User) => {

    if (!token || !user) {
      set({ status: 'unauthenticated', token: undefined, user: undefined })
      // TODO: llamar Logout
      return false;
    }

    set({
      status: 'authenticated',
      token: token,
      user: user
    })

    //TODO: Guardar el token en el secure storage

    return true;
  },
  
  checkStatus: async () => {
    const resp = await authCheckStatus();
    get().changeStatus(resp?.token, resp?.user);

  },
  
  logout: async () => {
    // TODO: Clear Token del secure Storage
    set({ status: 'unauthenticated', token: undefined, user: undefined })

  }
}) )