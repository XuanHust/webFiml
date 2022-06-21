import "./Login.scss"
import { useEffect, useState } from "react"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Vui lòng nhập username")
        .max(10, "username tối đa 50 ký tự"),
    password: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .max(10, "mật khẩu tối đa 20 kí tự"),
});

const Login1 = (props) => {

    const [currentView, setCurrentView] = useState("signUp");

    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const changeView = (view) => {
        setCurrentView(view);
    }

    const handleClick = () => {
        props.handleLogin(false);
    }
    const onLoginSubmit = (data) => {
        props.handleLogin(false);
        console.log("data", data)
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
                  <input type="text" id="username" required/>
                </li>
                <li>
                  <label for="email">Email:</label>
                  <input type="email" id="email" required/>
                </li>
                <li>
                  <label for="password">Password:</label>
                  <input type="password" id="password" required/>
                </li>
              </ul>
            </fieldset>
            <button>Submit</button>
            <button type="button" onClick={ () => changeView("logIn")}>Have an Account?</button>
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
                  <input type="text" id="username" {...register("username")} />
                </li>
                <li>
                  <label for="password">Password:</label>
                  <input type="password" id="password" {...register("password")} />
                </li>
                <li>
                  <i/>
                  <a onClick={ () => changeView("PWReset")} href="#">Forgot Password?</a>
                </li>
              </ul>
            </fieldset>
            <Link to="/MoviesTv" onClick={handleSubmit(onLoginSubmit)} className="button">Login</Link>
            <button type="button" onClick={ () => changeView("signUp")}>Create an Account</button>
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
                <input type="email" id="email" required/>
              </li>
            </ul>
          </fieldset>
          <button>Send Reset Link</button>
          <button type="button" onClick={ () => changeView("logIn")}>Go Back</button>
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

export default Login1;