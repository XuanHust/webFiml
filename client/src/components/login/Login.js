import "./Login.scss"
import { useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import React from "react";
import axios from "axios";

const Login = (props) => {

  const [currentView, setCurrentView] = useState("signUp");
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [err, setErr] = useState(false)
  const [errCre, setErrCre] = useState(false)

  const [creUser, setCreUser] = useState("")
  const [crePass, setCrePass] = useState("")

  const handleCreUser = (e) => {
    setCreUser(e.target.value);
  }

  const handleCrePass = (e) => {
    setCrePass(e.target.value)
  }

  const createAcc = async (view, acc) => {
    setCurrentView(view)
    const data = await axios.post('http://localhost:8080/creAcc', { user: acc.user, pass: acc.pass });
  }

  const postAcc = async (acc, view) => {
    const data = await fetch("http://localhost:8080/allUser")
    const dataAcc = await data.json();
    const test = dataAcc.filter((item, index) => {
      return item.user === acc.user
    })
    test.length !== 0 || (acc.user === "" || acc.pass === "") ?
      setErrCre(true)
      :
      createAcc(view, acc)
  }

  const handleCre = (view) => {
    setErr(false)
    let creAccount = {
      user: creUser,
      pass: crePass,
    }
    postAcc(creAccount, view)
  }

  const changeView = (view) => {
    setCurrentView(view);
    setErr(false)
    setErrCre(false)
  }

  const handleUser = (e) => {
    setUser(e.target.value)
  }

  const handlePass = (e) => {
    setPass(e.target.value)
  }

  const Acc = (acc) => {
    props.handleLogin(acc, false)
    setErr(false)
  }

  const setErrors = () => {
    setErr(true)
  }

  const validate = async (account) => {
    const dataFilter = await axios.post('http://localhost:8080/account', { user: account.user, pass: account.pass });
    const data = await fetch("http://localhost:8080/account");
    const dataUser = await data.json();
    const accounts = [...dataUser]
    accounts.length >= 1 && accounts[0].user ?
      Acc(accounts[0].user)
      :
      setErrors()
  }

  const handleClick = () => {
    let account = {
      user: user,
      pass: pass,
    }
    validate(account)
  }

  const currentViews = () => {
    switch (currentView) {
      case "signUp":
        return (
          <form>
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label for="username">Username:</label>
                  <input type="text" id="username" onChange={(e) => handleCreUser(e)} value={creUser} />
                </li>
                <li>
                  <label for="email">Email:</label>
                  <input type="email" id="email" required />
                </li>
                <li>
                  <label for="password">Password:</label>
                  <input type="password" id="password" onChange={(e) => handleCrePass(e)} value={crePass} />
                </li>
              </ul>
              {
                errCre &&
                <p className="err">Account already exists!</p>
              }
            </fieldset>
            <button type="button" onClick={() => handleCre("logIn")}>Submit</button>
            <button type="button" onClick={() => changeView("logIn")}>Have an Account?</button>
          </form>
        )
        break
      case "logIn":
        return (
          <form>
            <h2>Welcome Back!</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label for="username">Username:</label>
                  <input type="text" id="username" onChange={(event) => handleUser(event)} value={user} />
                </li>
                <li>
                  <label for="password">Password:</label>
                  <input type="password" id="password" onChange={(event) => handlePass(event)} value={pass} />
                </li>
                <li>
                  <i />
                  <a onClick={() => changeView("PWReset")} href="#">Forgot Password?</a>
                </li>
              </ul>
              {
                err &&
                <p className="err">Account password is incorrect!</p>
              }
            </fieldset>
            <button type="button" onClick={() => handleClick()} className="button">Login</button>
            <button type="button" onClick={() => changeView("signUp")}>Create an Account</button>
          </form>
        )
        break
      case "PWReset":
        return (
          <form>
            <h2>Reset Password</h2>
            <fieldset>
              <legend>Password Reset</legend>
              <ul>
                <li>
                  <em>A reset link will be sent to your inbox!</em>
                </li>
                <li>
                  <label for="email">Email:</label>
                  <input type="email" id="email" required />
                </li>
              </ul>
            </fieldset>
            <button>Send Reset Link</button>
            <button type="button" onClick={() => changeView("logIn")}>Go Back</button>
          </form>
        )
      default:
        break
    }
  }

  return (
    <section id="entry-page">
      {currentViews()}
    </section>
  )
}

export default Login;