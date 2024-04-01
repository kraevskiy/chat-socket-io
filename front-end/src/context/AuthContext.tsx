import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { APIUserType } from "@/types/api.types.ts";

type AuthContextType = {
  authUser: null | APIUserType;
  setAuthUser: Dispatch<SetStateAction<null | APIUserType>>;
}

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: () => {
  }
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const localUser = localStorage.getItem("chat-user") ? JSON.parse(localStorage.getItem("chat-user") || "") : null;
  const [authUser, setAuthUser] = useState<null | APIUserType>(localUser);

  return <AuthContext.Provider value={{
    authUser,
    setAuthUser
  }}>
    {children}
  </AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
}
