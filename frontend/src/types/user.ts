export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
  message?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}