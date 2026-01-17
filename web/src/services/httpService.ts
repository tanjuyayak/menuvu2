import { ApiError } from './apiErrors';
import { config } from '../config';

const AUTH_TOKEN_KEY = 'authToken';

type RequestOptions = RequestInit;

function buildUrl(endpoint: string): string {
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }
  const base = config.baseUrl.endsWith('/') ? config.baseUrl.slice(0, -1) : config.baseUrl;
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const fullUrl = buildUrl(url);
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      
      if (errorData?.exceptionCode) {
        throw new ApiError(errorData.exceptionCode);
      }
      
      throw new ApiError('GENERAL_ERROR');
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError('NETWORK_ERROR');
    }
    
    throw new ApiError('GENERAL_ERROR');
  }
}

export const httpService = {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return request<T>(url, { ...options, method: 'GET' });
  },
  
  post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(url, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  },
};
