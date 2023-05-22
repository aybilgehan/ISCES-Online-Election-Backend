import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./Login.css";
import axios from "axios";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    const signInInfo = { email: enteredEmail, password: enteredPassword }
    try {
      const res = await axios.post(
        'localhost:8080/loginget',
        JSON.stringify(signInInfo)
      )
      if (res.data.status === 'success') {
        localStorage.setItem('uid', res.data.uid)
        localStorage.setItem(
          'userInfo',
          JSON.stringify({ email: signInInfo.email })
        )
        const userRole = res.data.role
        //const chefId = res.data.chefId

        //authCtx.setUserData(userRole, chefId)
        authCtx.setUserData(userRole)
        authCtx.onLogin({
          email: enteredEmail,
          password: enteredPassword,
        })
      } else {
        console.log('Wrong password or email')
      }
      // assump log in is successful
    } catch (err) {
      console.log(err)
    }
    /*Backendden rol bilgisi gelecek, şu anlık test yaparken userRole'ü istediğin rolü yazarak deneyebilirsin.
    Ana roller: student, rector, dean's office, department office. Department office dökümanları kontrol edip
    eğer uygunsa dean's office e yollayacak. Deans office de onaylayacak, yani 2 tane onaylama aşaması olacak.
    Rektör ise election date'i set edecek veya seçimi eşitlikle biterse rastgele bitirme tuşuna tıklayacak ve seçim
    iki eşit oy alan iki kişi arasından biri seçilerek bitecek.*/
    const userRole = "student";
    const userDepartment = "Computer Engineering";
    const userName = "Ahmet";
    const userGpa = "3.5";
    authCtx.isVoted = false
    authCtx.setUserData(userRole);
    authCtx.setUserDepartmentData(userDepartment);
    authCtx.setUserNameData(userName);
    authCtx.setUserGpaData(userGpa);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("userDepartment", userDepartment);
    localStorage.setItem("userName", userName);
    localStorage.setItem("userGpa", userGpa);
    const user = { enteredEmail, enteredPassword };
    authCtx.onLogin({
      email: enteredEmail,
      password: enteredPassword,
    });
    /* fetch("http://localhost:8080/authenticateTheUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(response => {
    console.log("student logged in")
    }

      if (response.ok) {
        return response.json()
      }
      throw response
    }).then(data => {
      console.log(data)
    }).catch(error => {
      console.log(error)
    })*/

    /* 
    return
    if (enteredEmail.includes('rector')) {
      const userRole = 'rector'
      authCtx.setUserData(userRole)
      navigate('/rectorsidebar')
      authCtx.onLogin({
        email: enteredEmail,
        password: enteredPassword,
      })
    }
    else if (enteredEmail.includes('dean')) {
      const userRole = 'dean'
      authCtx.setUserData(userRole)
      navigate('/deansidebar')
      authCtx.onLogin({
        email: enteredEmail,
        password: enteredPassword,
      })
    }
    else if (enteredEmail.includes('departmentsecretary')) {
      const userRole = 'dean'
      authCtx.setUserData(userRole)
      navigate('/secretarysidebar')
      authCtx.onLogin({
        email: enteredEmail,
        password: enteredPassword,
      })
    }
    else if (enteredEmail.includes('std')) {
      const userRole = 'student'
      authCtx.setUserData(userRole)
      navigate('/sidebar')
      authCtx.onLogin({
        email: enteredEmail,
        password: enteredPassword,
      }) 
    }
    else{
      return
    }
*/
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
      </form>
    </div>
  );
};

export default Login;
