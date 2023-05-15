import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
//import axios from 'axios'

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [formIsValid, setFormIsValid] = useState(false)

  const authCtx = useContext(AuthContext)

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      )
    }, 500)

    return () => {
      clearTimeout(identifier)
    }
  }, [enteredEmail, enteredPassword])

  const emailChangeHandler = (event) => {
    event.preventDefault()
    setEnteredEmail(event.target.value)
    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    )
  }



   /* const submitHandler = async (event) => {
    const signInInfo = { email: enteredEmail, password: enteredPassword }
    event.preventDefault()
    try {
      const res = await axios.post(
        'http://127.0.0.1:3001/api/v1/users/login',
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
  }*/

  const exitHandlerSignInPage = (event) => {
    event.preventDefault()
    authCtx.exitHandler()
  }

  const createAnAccountHandler = (event) => {
    event.preventDefault()
    authCtx.exitHandler()
    authCtx.handleSignUp()
  }
  return (
    <div className="signin rounded">
      <form /*onSubmit={submitHandler}*/>
        <label htmlFor="email"></label>
        <input
          className="input-class mt-12 ml-4"
          placeholder="e-mail"
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
        />
        <br />
        <br />
        <label htmlFor="password"></label>
        <div className="form-class ml-4">
          <input
            className="input-class"
            placeholder="password"
            type="password"
            id="password"
            value={enteredPassword}
            onChange={"passwordChangeHandler"}
          />
        </div>
        <br />
        <br />
        <button
          type="submit"
          className="button-class mt-16"
          disabled={!formIsValid}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login;
