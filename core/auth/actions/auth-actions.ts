import { productsAPI } from "../api/productsApi";
import { User } from "../interface/user";

export interface AuthResponse {
  id:       string;
  email:    string;
  fullName: string;
  isActive: boolean;
  roles:    string[];
  token:    string;
}


const returnUserToken = (data: AuthResponse): {
  user: User,
  token: string
} => {
  const { token, ...user } = data;
  
  // const { id, email, fullName, isActive, roles, token } = data;
  // const user: User = {
  //   id, email, fullName, isActive, roles
  // }

  return {
    user,
    token
  }
}

export const authLogin = async (email: string, password: string) => {
  
  email = email.toLowerCase();

  try {
    const { data } = await productsAPI.post<AuthResponse>('/auth/login', {
      email, password
    });
    
    return returnUserToken(data);
    
  } catch (error) {
    console.log(error);
    // throw new Error('User and/or password not valid');
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

// TODO Hacer el register.