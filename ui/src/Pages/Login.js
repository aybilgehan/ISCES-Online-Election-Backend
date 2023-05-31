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
          <a href="https://obs.iyte.edu.tr/oibs/ogrenci/start.aspx?gkm=00203557532210344083779833303377633221035475389363444032234311163446435585388723418434388366903333636720" className="forgot-password-link">Forgot Password</a>
        </form>
      )}
    </div>
  );
};

export default Login;
