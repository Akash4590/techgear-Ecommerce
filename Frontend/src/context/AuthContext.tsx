import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";

export type UserRole = "user" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  emailNotifications?: boolean;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  loading: boolean;
  authFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // Har protected API call yahan se guzre — token invalid/expired ho to
  // automatically logout + redirect, koi bhi page ke andar raw error nahi dikhega.
  const authFetch = useCallback(
    async (url: string, options: RequestInit = {}) => {
      const currentToken = localStorage.getItem("token");

      const res = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: currentToken ? `Bearer ${currentToken}` : "",
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        window.location.href = "/login";
        // Chain ko yahin rok dein — calling page ka .json() try nahi karega
        throw new Error("Session expired");
      }

      return res;
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!token, login, logout, updateUser, loading, authFetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};