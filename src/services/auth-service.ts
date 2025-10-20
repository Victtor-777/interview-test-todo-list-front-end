import { api } from "@/lib/axios";
import { LoginRequest, LoginResponse, SignUpRequest, User } from "@/types/auth";
import { AxiosResponse } from "axios";

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = await api.post(
      "/auth/login",
      data
    );
    return response.data;
  },

  async signUp(data: SignUpRequest): Promise<User> {
    const response: AxiosResponse<User> = await api.post("/auth/signup", data);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response: AxiosResponse<User> = await api.get("/auth/me");
    return response.data;
  },
};
