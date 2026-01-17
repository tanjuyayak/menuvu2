const AUTH_TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'userData';

export interface StoredUserData {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const authStorage = {
  setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  setUserData(userData: StoredUserData): void {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  },

  getUserData(): StoredUserData | null {
    const data = localStorage.getItem(USER_DATA_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  clear(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
