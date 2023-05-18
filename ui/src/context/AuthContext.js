import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
const AuthContext = React.createContext({
  isLoggedIn: false,
  userRole: null,
  onLogin: (email, password, role) => {},
  exitHandler: () => {},
  setUserData: () => {},
})

export const AuthContextProvider = (props) => {
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
      setUserRole(storedUserRole);
      console.log('userRole', storedUserRole)
    }
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [userRole, setUserRole] = useState(null);

  
  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    const role = localStorage.getItem('userRole');
    if (role == 'rector') {
      setUserRole('rector');
      console.log('user is a rector')
    }
    else if (role == 'student') {
      setUserRole('student');
    }
    else if(role=='deansOffice'){
      setUserRole('deansOffice');
    }
    else{
      setUserRole('departmentOffice');
    }
    setIsLoggedIn(true)
    console.log('login')
  }
  const exitHandler = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
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
