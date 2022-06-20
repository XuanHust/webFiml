import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Login.scss"
import { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

//validation form

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

const Login = (props) => {

    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [err, setErr] = useState()

    const onLoginSubmit = (data) => {
        props.handleLogin(data);
        setErr(props.err)
    }
    return (
        <Router>
            <div className='login-container'>
                <div className="login">
                    <div className="login-content">
                        <div className="title">MovieTv</div>
                        <form>
                            <div className="field">
                                <label> Username: </label>
                                <input {...register("username")}></input>

                                {
                                    errors.username &&
                                    <p className="error">{errors.username?.message}</p>
                                }
                            </div>

                            <div className="field">
                                <label>Password: </label>
                                <input type="password" name="password" {...register("password")}></input>

                                {
                                    errors.password &&
                                    <p className="error">{errors.password?.message}</p>
                                }
                            </div>

                            <div className="field button">
                                <Link to="/">
                                    <button onClick={handleSubmit(onLoginSubmit)} className="button-login" type="submit">Login</button>
                                </Link>
                                <Link to="/signup">
                                    <button className="button-signup" type="button">Signup</button>
                                </Link>
                                {
                                    props.err &&
                                    <p className="error err">{err}</p>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default Login;