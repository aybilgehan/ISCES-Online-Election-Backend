import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./Login.css";
import axios from "axios";
const Login = (props) => {
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
    const signInInfo = { email: enteredEmail, password: enteredPassword };
    const email = enteredEmail.trim();
    const password = enteredPassword.trim();
    console.log(signInInfo);
    try {
      const activationURL = `http://localhost:8080/login/${email}/${password}}`;
      const res = await axios.get(activationURL);
      console.log(res);

      if (res.status === 200) {
        localStorage.setItem("uid", res.data.user.user_id);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ email: signInInfo.email })
        );
        const userRole = res.data.user.role;
        authCtx.setUserData(userRole);

        const isVoted = res.data.isVoted;
        if (isVoted === 0) {
          authCtx.setIsVotedData(true);
        }
        const userDepartment = res.data.user.departmentId;
        authCtx.setUserDepartmentData(userDepartment);
        const userName = res.data.user.firstName;
        authCtx.setUserNameData(userName);
        // const userGpa = res.data.gpa;
        //authCtx.setUserGpaData(userGpa);
        const userLastName = res.data.user.lastName;
        authCtx.setUserLastNameData(userLastName);

        localStorage.setItem("userRole", userRole);
        localStorage.setItem("userDepartment", userDepartment);
        localStorage.setItem("userName", userName);

        // localStorage.setItem("userGpa", userGpa);
        authCtx.onLogin({
          email: enteredEmail,
          password: enteredPassword,
        });
        console.log("Login successful");
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
                    placeholder="Enter your IYTE mail"
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
                href="https://obs.iyte.edu.tr/oibs/ogrenci/login.aspx"
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
