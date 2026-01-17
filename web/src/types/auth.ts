// Request Types
export interface LoginRequest {
  email: string;
  type: 'email' | 'google';
  token?: string;
}

export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  type: 'email' | 'google';
  token?: string;
}

export interface ValidateAccessCodeRequest {
  loginAccessCodeId: string;
  accessCode: string;
}

// Response Types
export interface UserDetail {
  token: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface LoginResponse {
  isNewUser: boolean;
  loginAccessCodeId?: string;
  userDetail?: UserDetail;
}

export interface RegisterResponse {
  loginAccessCodeId?: string;
  userDetail?: UserDetail;
}

export interface ValidateAccessCodeResponse {
  userDetail: UserDetail;
}
