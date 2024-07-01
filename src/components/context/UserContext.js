import React, { useContext, useState, useEffect } from 'react'

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    } else {
      return {};
    }
  });
  const [userRole, setUserRole] = useState(() => {
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      return JSON.parse(storedUserRole);
    } else {
      return {};
    }
  });
  const [isLogin, setIsLogin] = useState(() => {
    const storedIsLogin = localStorage.getItem('isLogin');
    if (storedIsLogin) {
      return JSON.parse(storedIsLogin);
    } else {
      return false;
    }
  });
  const [userCart, setUserCart] = useState(() => {
    const storedUserCart = localStorage.getItem('userCart');
    if (storedUserCart) {
      return JSON.parse(storedUserCart);
    } else {
      return {};
    }
  })
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userRole', JSON.stringify(userRole));
    localStorage.setItem('isLogin', JSON.stringify(isLogin));
    localStorage.setItem('userCart', JSON.stringify(userCart));
  }, [user, userRole, isLogin, userCart]);


  const value = { user, setUser, userRole, setUserRole, isLogin, setIsLogin, userCart, setUserCart };
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}


