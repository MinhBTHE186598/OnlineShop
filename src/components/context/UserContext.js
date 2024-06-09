import React, { useContext, useState, useEffect } from 'react'

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userRole, setUserRole] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const value = { user, setUser, userRole, setUserRole, isLogin, setIsLogin };
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

