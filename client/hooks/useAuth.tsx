// useAuth.js
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for the token in cookies on mount
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
    }
  }, []);

  const login = (token: any) => {
    // Set the token in cookies on login
    Cookies.set("token", token);
    setIsAuthenticated(true);
    setToken(token);
  };

  const logout = () => {
    // Remove the token from cookies on logout
    Cookies.remove("token");
    setIsAuthenticated(false);
    setToken(null);
  };

  return { isAuthenticated, token, login, logout };
};

export default useAuth;
