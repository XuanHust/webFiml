import "./ButtonLogin.scss";
import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import { useGoogleLogin, useGoogleLogout } from 'react-google-login';

const clientId = "781604133955-5vnqd8or7cev1jbloil96ossd4upl6av.apps.googleusercontent.com"

const ButtonLogin = (props) => {

    const [flag, setFlag] = useState(true);
    const [flg, setFlg] = useState(true);

    const handleClick = () => {
        props.handleLogin("", flag);
        let setFlags = !flag;
        localStorage.clear();

        if (flag === true) {
            sessionStorage.setItem("flag", false);
        } else {
            sessionStorage.clear();
            // setFlag(false)
            setFlg(true)
        }

        setFlag(setFlags);
    }

    const onLogoutSuccess = () => {
        console.log("Logout Success")
    }

    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
    })

    useEffect(() => {
        if (localStorage.length === 1) {
            setFlag(false);
            sessionStorage.clear();
        }
        sessionStorage.length === 1 &&
            setFlg(false)
    }, [])

    return (
        <div className="button-container">
            <div className="button" onClick={handleClick}>
                {
                    flag === true ?
                        <Link to="/Login">
                            {
                                flg === true ?
                                    <>
                                        <i class="fa-solid fa-user"></i>
                                        <p>Login</p>
                                    </>
                                    :
                                    <>
                                        <i class="fa-solid fa-right-to-bracket" ></i>
                                    </>
                            }

                        </Link>
                        :
                        <Link to="/MoviesTv">
                            <i class="fa-solid fa-right-to-bracket" onClick={signOut}></i>
                            <p>{props.acc}</p>
                        </Link>
                }
            </div>
        </div>
    )
}

export default ButtonLogin;