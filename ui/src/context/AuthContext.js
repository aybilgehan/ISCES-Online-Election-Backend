import React, { useState, useEffect } from "react";
const AuthContext = React.createContext({
  isVoted:true,
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
  setUserNameData: () => {},
  setIsVoted: () => {}
});

export const AuthContextProvider = (props) => {
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    const storedUserRole = localStorage.getItem("userRole");
    const storedUserDepartment = localStorage.getItem("userDepartment");
    const storedUserGpa = localStorage.getItem("userGpa");
    const storedUserName = localStorage.getItem("userName");
    const storedIsVoted = localStorage.getItem("isVoted");
    if (storedIsVoted === "true") {
      setIsVoted(true);
    }
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
  const [isVoted, setIsVoted] = useState(true);

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    const role = localStorage.getItem("userRole");
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
    console.log("dsjkads")
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    console.log("exit");
  };

  const setUserData = (role) => {
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
  const setIsVotedData = (isVoted) => {
    setIsVoted(isVoted);
  };


  return (
    <AuthContext.Provider
      value={{
        isVoted: isVoted,
        isLoggedIn: isLoggedIn,
        userRole: userRole,
        userDepartment: userDepartment,
        userGpa: userGpa,
        userName: userName,
        setUserData: setUserData,
        setUserDepartmentData: setUserDepartmentData,
        setUserGpaData: setUserGpaData,
        setUserNameData: setUserNameData,
        setIsVotedData: setIsVotedData,
        onLogin: loginHandler,
        exitHandler: exitHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
