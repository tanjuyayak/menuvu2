import { httpService } from './httpService';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ValidateAccessCodeRequest,
  ValidateAccessCodeResponse,
} from '../types/auth';

export const authService = {
  login(request: LoginRequest): Promise<LoginResponse> {
    return httpService.post<LoginResponse>('/api/authentication/login', request);
  },

  register(request: RegisterRequest): Promise<RegisterResponse> {
    return httpService.post<RegisterResponse>('/api/authentication/register', request);
  },

  validateAccessCode(request: ValidateAccessCodeRequest): Promise<ValidateAccessCodeResponse> {
    return httpService.post<ValidateAccessCodeResponse>(
      '/api/authentication/validateaccesscode',
      request
    );
  },
};
