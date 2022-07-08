import "./Login.scss";
import logo from "../../assets/images/2659939281579738432-512.png"
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import React from "react";
import axios from "axios";
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';

const clientId = "781604133955-5vnqd8or7cev1jbloil96ossd4upl6av.apps.googleusercontent.com"

const Login = (props) => {

  const [currentView, setCurrentView] = useState("signUp");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [errCre, setErrCre] = useState(false);

  const [creUser, setCreUser] = useState("");
  const [crePass, setCrePass] = useState("");

  const [err, setErr] = useState();

  const [log, setLog] = useState(false)

  const handleCreUser = (e) => {
    setCreUser(e.target.value);
  }

  const handleCrePass = (e) => {
    setCrePass(e.target.value);
  }

  const createAcc = async (view, acc) => {
    setCurrentView(view);
    const data = await axios.post('http://localhost:8080/creAcc', { user: acc.user, pass: acc.pass });
  }

  const postAcc = async (acc, view) => {
    const data = await fetch("http://localhost:8080/allUser");
    const dataAcc = await data.json();
    const test = dataAcc.filter((item, index) => {
      return item.user === acc.user;
    })
    test.length !== 0 || (acc.user === "" || acc.pass === "") ?
      setErrCre(true)
      :
      createAcc(view, acc);
  }

  const handleCre = (view) => {
    setIsErr(false);
    let creAccount = {
      user: creUser,
      pass: crePass,
    }
    postAcc(creAccount, view);
  }

  const changeView = (view) => {
    setCurrentView(view);
    setIsErr(false);
    setErrCre(false);
  }

  const handleUser = (e) => {
    setUser(e.target.value);
  }

  const handlePass = (e) => {
    setPass(e.target.value);
  }

  const Acc = (acc) => {
    props.handleLogin(acc, false);
    setIsErr(false);
  }

  const setErrors = (msg) => {
    setIsErr(true);
    setErr(msg);
  }

  const validate = async (account) => {
    const dataFilter = await axios.post('http://localhost:8080/account', { user: account.user, pass: account.pass });
    localStorage.setItem(dataFilter.data.user, `${dataFilter.data.token}`);
    dataFilter.data.err ?
      setErrors(dataFilter.data.msg)
      :
      Acc(dataFilter.data.user);
  }

  const handleClick = () => {
    let account = {
      user: user,
      pass: pass,
    }
    validate(account);
  }

  //Google

  const createAccGoogle = async (acc) => {
    const data = await axios.post('http://localhost:8080/creAcc', { user: acc.user, pass: acc.pass });
    validate(acc);
  }

  const postAccGoogle = async (acc) => {
    const data = await fetch("http://localhost:8080/allUser");
    const dataAcc = await data.json();
    const test = dataAcc.filter((item, index) => {
      return item.user === acc.user;
    })
    test.length !== 0 || (acc.user === "" || acc.pass === "") ?
      validate(acc)
      :
      createAccGoogle(acc);
  }


  const onSuccess = (res) => {
    setLog(true);
    let account = {
      user: res.profileObj.givenName,
      pass: res.profileObj.googleId,
    }
    postAccGoogle(account);

    console.log('Login Success: ', res.profileObj);
  }

  const onFailure = (res) => {
    console.log("Login Failed:", res)
  }

  const onLogoutSuccess = () => {
    setLog(false)
    console.log("Logout Success")
  }

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
  })

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
  })


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
                {/* <li>
                  <label for="email">Email:</label>
                  <input type="email" id="email" required />
                </li> */}
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
                isErr &&
                <p className="err">{err}</p>
              }
            </fieldset>
            {
              log ?

                <p onClick={signOut} className="google">
                  <img src={logo} alt="google"></img>
                  <span className="buttonGoogle">Sign Out</span>
                </p>
                :
                <button onClick={signIn} className="google">
                  <img src={logo} alt="google"></img>
                  <span className="buttonGoogle">Sign in with Google</span>
                </button>
            }
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