"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [status, setStatus] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [resError, setResError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Checking local storage for previous authentication status
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
    }
  }, []);

  useEffect(() => {
    // Checking local storage for previous authentication status
    const storedStatus = localStorage.getItem("status");
    if (storedStatus) {
      setStatus(JSON.parse(storedStatus));
    }
  }, []);

  const signin = async (user) => {
    try {
      const res = await axios.post("/api/auth/signin", {
        email: user.email,
        password: user.password,
      });
      console.log(res);

      if (res.error) return setResError(res.error);

      if (res.status === 200) {
        setIsAuthenticated(true);
        setIsLoading(true);
        // Saving authentication status to local storage
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        setStatus(res.data.message)
        localStorage.setItem("status", JSON.stringify(res.data.message));
        return router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async (user) => {
    try {
      const res = await axios.post("/api/auth/signup", {
        fullname: user.fullname,
        email: user.email,
        password: user.password,
      });
      console.log(res);
      setResError("");
      if (res.status === 200) {
        setIsAuthenticated(true);
        setIsLoading(true);
        // Saving authentication status to local storage
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        setStatus(res.data.message)
        localStorage.setItem("user", JSON.stringify(res.data.message));
        return router.push("/");
      }
    } catch (error) {
      console.log(error);
      setResError(error.response?.data.message);
    }
  };

  const signout = async () => {
    try {
      const res = await axios.get("api/auth/logout");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
    setIsAuthenticated(false);
    // Removing authentication status from local storage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("status");
    router.push("/login");
  };

  useEffect(() => {
    const verifyToken = async (req) => {
      // const myTokenName = req.cookies.get("myTokenName");
      try {
        const res = await axios.get("api/auth/verifyToken");
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    verifyToken()
  })

  return (
    <AuthContext.Provider
      value={{ signin, signup, signout, resError, isLoading, isAuthenticated, status }}
    >
      {children}
    </AuthContext.Provider>
  );
};
