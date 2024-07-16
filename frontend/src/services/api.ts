import axios, { AxiosInstance } from "axios";
import { User } from "../types/user";

const API_URL = "http://localhost:8081/api";

// Create a custom axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This is important for CORS with credentials
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor to include the authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const userService = {
  getUsers: () => axiosInstance.get<User[]>("/users"),
  getUser: (id: number) => axiosInstance.get<User>(`/users/${id}`),
  createUser: (userData: Omit<User, "id">) =>
    axiosInstance.post<User>("/users", userData),
  updateUser: (id: number, userData: Partial<User>) =>
    axiosInstance.put<User>(`/users/${id}`, userData),
  deleteUser: (id: number) => axiosInstance.delete(`/users/${id}`),
};

export const authService = {
  register: (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => 
    axios.post<User>(`${API_URL}/register`, userData),
  login: (credentials: { email: string; password: string }) => 
    axios.post<{ token: string; user: User }>(`${API_URL}/login`, credentials),
};

// Export the axios instance in case you need to use it elsewhere
export default axiosInstance;
