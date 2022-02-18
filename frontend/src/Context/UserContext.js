import { createContext, useEffect, useState } from "react";
import { isAuthenticated } from "../services/authServices";

export const UserContext = createContext();

const Context = ({ children }) => {
  const userData = isAuthenticated();
  const [user, setUser] = useState(userData);

  useEffect(() => {}, [user]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default Context;
