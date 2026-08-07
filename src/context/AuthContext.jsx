import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const register = (data) => {
    localStorage.setItem("admin", JSON.stringify(data));
  };

  const login = (username, password) => {
    const admin = JSON.parse(localStorage.getItem("admin"));

    if (
      admin &&
      admin.username === username &&
      admin.password === password
    ) {
      setUser(admin);
      localStorage.setItem("user", JSON.stringify(admin));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};