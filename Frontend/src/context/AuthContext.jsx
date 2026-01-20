import axios, { HttpStatusCode } from "axios";
import { Children, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const Client = axios.create({
  baseURL: "http://localhost:8000/api/users",
});

export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState(authContext);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleRegister = async (name, username, email, password) => {
    try {
      let request = await Client.post("/register", {
        name,
        username,
        email,
        password,
      });

      if (request.status === HttpStatusCode.Created) {
        return request.data.message;
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async (email, username, password) => {
    
    try {
      let request = await Client.post("/login", {
        email,
        password,
        username,
      });

      if (request.status === HttpStatusCode.Ok) {
        localStorage.setItem("token", request.data.token);
      }
    } catch (error) {
      throw error;
    }
  };

  const data = {
    token,
    userData,
    setUserData,
    handleRegister,
    handleLogin,
  };

  return (
    <AuthContext.Provider
      value={data}
    >
      {children}
    </AuthContext.Provider>
  );
};
