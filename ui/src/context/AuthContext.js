import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = React.createContext({
  isLoggedIn: false,
  userRole: null,
  userDepartment: null,
  userGpa: null,
  userName: null,
  onLogin: (email, password) => {},
  exitHandler: () => {},
  setUserData: () => {},
  setUserDepartmentData: () => {},
  setUserGpaData: () => {},
  setUserNameData: () => {}
});

export const AuthContextProvider = (props) => {
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    const storedUserRole = localStorage.getItem("userRole");
    const storedUserDepartment = localStorage.getItem("userDepartment");
    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
      setUserRole(storedUserRole);
      setUserDepartment(storedUserDepartment);
      console.log("userRole", storedUserRole);
    }
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDepartment, setUserDepartment] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userGpa, setUserGpa] = useState(null);
  const [userName, setUserName] = useState(null);

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    const role = localStorage.getItem("userRole");
    const department = localStorage.getItem("userDepartment");
    if (role == "rector") {
      setUserRole("rector");
      console.log("user is a rector");
    } else if (role == "student") {
      setUserRole("student");
    } else if (role == "deansOffice") {
      setUserRole("deansOffice");
    } else {
      setUserRole("departmentOffice");
    }
    setIsLoggedIn(true);
    console.log("login");
  };
  const exitHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    console.log("exit");
  };

  const setUserData = (role, id) => {
    setUserRole(role);
  };

  const setUserDepartmentData = (department) => {
    setUserDepartment(department);
  };

  const setUserGpaData = (gpa) => {
    setUserGpa(gpa);
  };

  const setUserNameData = (name) => {
    setUserName(name);
  };


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userRole: userRole,
        userDepartment: userDepartment,
        userGpa: userGpa,
        userName: userName,
        setUserData: setUserData,
        setUserDepartmentData: setUserDepartmentData,
        setUserGpaData: setUserGpaData,
        setUserNameData: setUserNameData,
        onLogin: loginHandler,
        exitHandler: exitHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
