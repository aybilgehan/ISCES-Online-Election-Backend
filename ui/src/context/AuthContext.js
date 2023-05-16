import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext({
  isLoggedIn: false,
  userRole: null,
  onLogout: () => {},
  onLogin: () => {},
  exitHandler: () => {},
  setUserData: () => {},
})

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const uid = localStorage.getItem('uid')
    if (uid !== undefined && uid !== null) {
      setIsLoggedIn(true)
    }
  }, [])
  const logoutHandler = () => {
    localStorage.removeItem('uid')
    localStorage.removeItem('userInfo')
    setIsLoggedIn(false)
  }

  const loginHandler = () => {
    setIsLoggedIn(true)
    console.log('login')
  }
  const exitHandler = () => {
    setIsLoggedIn(false)
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
        onLogout: logoutHandler,
        onLogin: loginHandler,
        exitHandler: exitHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
