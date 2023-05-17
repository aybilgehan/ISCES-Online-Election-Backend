import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
const AuthContext = React.createContext({
  isLoggedIn: false,
  userRole: null,
  onLogin: () => {},
  exitHandler: () => {},
  setUserData: () => {},
})

export const AuthContextProvider = (props) => {
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [userRole, setUserRole] = useState(null);

  
  const loginHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(true)
    console.log(isLoggedIn)
    console.log('login')
  }
  const exitHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(false)
    console.log('exit')
  }

  const setUserData = (role, id) => {

    setUserRole(role);

  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userRole: userRole,
        setUserData: setUserData,
        onLogin: loginHandler,
        exitHandler: exitHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
