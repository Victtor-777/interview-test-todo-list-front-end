"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContextType, LoginRequest, User } from "@/types/auth";
import { jwtDecode } from "jwt-decode";
import { authService } from "@/services/auth-service";

interface AuthProviderProps {
  children: ReactNode;
}

interface JWTPayload {
  id: string;
  exp: number;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode<JWTPayload>(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem("token");
          setIsLoading(false);
          return;
        }

        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      const response = await authService.login(data);
      localStorage.setItem("token", response.accessToken);

      const userData = await authService.getCurrentUser();
      setUser(userData);

      router.push("/tasks");
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
