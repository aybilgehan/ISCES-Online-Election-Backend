import React, { useState, useEffect } from "react";
const AuthContext = React.createContext({
  isVoted: false,
  isLoggedIn: false,
  userRole: null,
  userDepartment: null,
  userGpa: null,
  userName: null,
  userLastName: null,
  studentNumber: null,
  onLogin: (email, password) => {},
  exitHandler: () => {},
  setUserData: () => {},
  setUserDepartmentData: () => {},
  setUserGpaData: () => {},
  setUserNameData: () => {},
  setUserLastNameData: () => {},
  setIsVotedData: () => {},
  setStudentNumberData: () => {},
});

export const AuthContextProvider = (props) => {
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    const storedUserRole = localStorage.getItem("userRole");
    const storedUserDepartment = localStorage.getItem("userDepartment");
    const storedUserGpa = localStorage.getItem("userGpa");
    const storedUserName = localStorage.getItem("userName");
    const storedUserLastName = localStorage.getItem("userLastName");
    const storedIsVoted = localStorage.getItem("isVoted");
    const storedStudentNumber = localStorage.getItem("studentNumber");
    if (storedIsVoted === 0) {
      setIsVoted(true);
    }
    if (storedUserLoggedInInformation === "1") {
      setUserName(storedUserName);
      setUserLastName(storedUserLastName);
      setUserGpa(storedUserGpa);
      setIsLoggedIn(true);
      setUserRole(storedUserRole);
      setUserDepartment(storedUserDepartment);
      setStudentNumberData(storedStudentNumber);
    }
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDepartment, setUserDepartment] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userGpa, setUserGpa] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [isVoted, setIsVoted] = useState(false);
  const [studentNumber, setStudentNumber] = useState(null);
  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");

    const role = localStorage.getItem("userRole");
    if (role == "rector") {
      setUserRole("rector");
    } else if (role == "student") {
      setUserRole("student");
    } else if (role == "officer") {
      setUserRole("officer");
    }
    setIsLoggedIn(true);
  };
  const exitHandler = () => {
    localStorage.removeItem("userLastName");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userDepartment");
    localStorage.removeItem("userGpa");
    localStorage.removeItem("userName");
    localStorage.removeItem("isVoted");
    localStorage.removeItem("studentNumber");
    setIsLoggedIn(false);
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
  const setUserLastNameData = (lastName) => {
    setUserLastName(lastName);
  };
  const setStudentNumberData = (studentNumber) => {
    setStudentNumber(studentNumber);
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
        userLastName: userLastName,
        studentNumber: studentNumber,
        setUserLastNameData: setUserLastNameData,
        setUserData: setUserData,
        setUserDepartmentData: setUserDepartmentData,
        setUserGpaData: setUserGpaData,
        setUserNameData: setUserNameData,
        setIsVotedData: setIsVotedData,
        setStudentNumberData: setStudentNumber,
        onLogin: loginHandler,
        exitHandler: exitHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
