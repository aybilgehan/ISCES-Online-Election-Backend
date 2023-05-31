import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./Login.css";
import axios from "axios";
const Login = (props) => {
  const alertBox = <div>Wrong password or ID<button onClick={changeAlertBoxVisible}>Ok</button></div>
  const [showAlert, setShowAlert] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const authCtx = useContext(AuthContext);
  function changeAlertBoxVisible() {
    setShowAlert(!showAlert)
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    const signInInfo = { email: enteredEmail, password: enteredPassword };
    const email = enteredEmail.trim();
    const password = enteredPassword.trim();
    console.log(signInInfo);
    try {
      const activationURL = `http://localhost:8080/loginget/${email}/${password}`;
      const res = await axios.get(activationURL);

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
<<<<<<< HEAD
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
            </div>
          </div>
          <div className="right-inner-box"></div>
        </div>
      </div>
=======
    <div className="container">
      {showAlert ? alertBox : (
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
          <button className="button" type="submit" disabled={!formIsValid}>
            Login
          </button>
          <a href="https://obs.iyte.edu.tr/oibs/ogrenci/start.aspx?gkm=0020333453884031102355703550534436311053657033351388803446832232389283558535545383682197311153778435600" className="forgot-password-link">Forgot Password</a>
        </form>
      )}
>>>>>>> d2512fa6ec3798c04fcd0efa3fac04597b1b1a28
    </div>
  );
};

export default Login;
