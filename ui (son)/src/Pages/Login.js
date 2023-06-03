import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./Login.css";
import axios from "axios";
const Login = () => {
  const alertBox = (
    <div className="AlertBox">
      <h5>Wrong Credentials!</h5>
      <button onClick={changeAlertBoxVisible}>Ok</button>
    </div>
  );
  const [showAlert, setShowAlert] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const authCtx = useContext(AuthContext);
  function changeAlertBoxVisible() {
    setShowAlert(!showAlert);
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    const email = enteredEmail.trim();
    const password = enteredPassword.trim();
    try {
      const activationURL = `http://localhost:8080/login/${email}/${password}`;
      const res = await axios.get(activationURL);
      
     console.log("adsadsads", res);
      if (res.status === 200) {
        console.log(res.data.role)
        if(res.data.role === "student" || res.data.role === "candidate"){
        localStorage.setItem("uid", res.data.student.studentNumber);
        console.log("user id : " + res.data.student.studentNumber);
        const userDepartment = res.data.student.departmentId;
        console.log("user department : " + userDepartment)
        authCtx.setUserDepartmentData(userDepartment);
        localStorage.setItem("userDepartment", userDepartment);
        const userGpa = res.data.student.grade;
        authCtx.setUserGpaData(userGpa);
        localStorage.setItem("userGpa", userGpa);
        const userTerm = res.data.student.term;
        authCtx.setUserTermData(userTerm);
        localStorage.setItem("userTerm", userTerm);
        const userName = res.data.student.firstName;
        authCtx.setUserNameData(userName);
        const userLastName = res.data.student.lastName;
        authCtx.setUserLastNameData(userLastName);
        localStorage.setItem("userName", userName);
        localStorage.setItem("userLastName", userLastName);
        const isVoted = res.data.student.voted;
        console.log("isVoted : " + isVoted)
        if (isVoted === 0) {
          authCtx.setIsVotedData(true);
        }
        }
        console.log("user logged in")
        const userRole = res.data.role;
        authCtx.setUserData(userRole);
        localStorage.setItem("userRole", userRole);
        console.log("logine giriyor")
        authCtx.onLogin();
      }
    } catch (err) {
      changeAlertBoxVisible();
    }

    /*Backendden rol bilgisi gelecek, şu anlık test yaparken userRole'ü istediğin rolü yazarak deneyebilirsin.
    Ana roller: student, rector, dean's office, department office. Department office dökümanları kontrol edip
    eğer uygunsa dean's office e yollayacak. Deans office de onaylayacak, yani 2 tane onaylama aşaması olacak.
    Rektör ise election date'i set edecek veya seçimi eşitlikle biterse rastgele bitirme tuşuna tıklayacak ve seçim
    iki eşit oy alan iki kişi arasından biri seçilerek bitecek.*/
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    setFormIsValid(event.target.value.includes("@"));
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  return (
    <div className="login-container">
      <div className="login-page">
        <header>
          <h1>IZTECH ONLINE ELECTION SYSTEM</h1>
        </header>
        <div className="login-outer-box">
          <img
            src="https://bhib.iyte.edu.tr/wp-content/uploads/sites/115/2018/09/iyte_logo-tur.png"
            alt="IYTE Logo"
            className="login-logo"
          />

          <div className="login-left-inner-box">
            <div className="login-form">
              {showAlert ? (
                alertBox
              ) : (
                <form onSubmit={submitHandler}>
                  <label htmlFor="email">Email:</label>
                  <input
                    className="input"
                    placeholder="e-mail"
                    type="email"
                    id="email"
                    value={enteredEmail}
                    onChange={emailChangeHandler}
                  />
                  <label htmlFor="password">Password:</label>
                  <input
                    className="input"
                    placeholder="password"
                    type="password"
                    id="password"
                    value={enteredPassword}
                    onChange={passwordChangeHandler}
                  />
                  <button
                    className="button"
                    type="submit"
                    disabled={!formIsValid}
                  >
                    Login
                  </button>
                </form>
              )}
              <a
                href="https://obs.iyte.edu.tr/oibs/ogrenci/start.aspx?gkm=0020333453884031102355703550534436311053657033351388803446832232389283558535545383682197311153778435600"
                className="forgot-password-link"
              >
                Forgot Password
              </a>
            </div>
          </div>
          <div className="right-inner-box">
            <img
              className="login-img"
              src={require("../images/login/server_cluster.png")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
