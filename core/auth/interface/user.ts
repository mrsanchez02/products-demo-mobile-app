export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
}

export interface AuthRegisterErrorResp {
  statusCode: number;
  message:    string[];
  error:      string;
}

export interface AuthRegisterResp {
  email:    string;
  fullName: string;
  id:       string;
  isActive: boolean;
  roles:    string[];
  token:    string;
}
