import { productsAPI } from "@/core/api/productsApi"; 
import { User } from "../interface/user.interface";

export interface AuthResponse {
  id:       string;
  email:    string;
  fullName: string;
  isActive: boolean;
  roles:    string[];
  token:    string;
}

const returnUserToken = (data: AuthResponse): { user: User, token: string } => {
  const { token, ...user } = data;

  return {
    user,
    token
  }
}

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();

  try {
    const { data } = await productsAPI.post<AuthResponse>('/auth/login', { email, password });
    return returnUserToken(data);
    
  } catch (error) {
    console.log(error);
    return null;

  }
}

export const authCheckStatus = async () => {
  try {
    const { data } = await productsAPI.get<AuthResponse>('/auth/check-status');
    return returnUserToken(data);

  } catch (error) {
    return null;

  }
}

export const authRegister = async (fullName: string, email: string, password: string) => {
  email = email.toLowerCase();

  try {
    const { data } = await productsAPI.post<AuthResponse>('/auth/register', { email, password, fullName }, )
    console.log("🚀 ~ authRegister ~ data:", data)
    return returnUserToken(data);
    
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      console.log(error);
      // console.log(error.name);
      // console.log(error.message);
    }
    // console.log("🚀 ~ authRegister ~ error:", error)
    return null;

  }
}
