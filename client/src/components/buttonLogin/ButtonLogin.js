import "./ButtonLogin.scss"
import { useEffect, useState } from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

const ButtonLogin = (props) => {

    const [flag, setFlag] = useState(true)

    const handleClick = () => {
        props.handleLogin("", flag);
        let setFlags = !flag;
        setFlag(setFlags);
    }

    return (
        <div className="button-container">
            <div className="button" onClick={handleClick}>
                {
                    flag === true ?
                        <Link to="/Login">
                            <i class="fa-solid fa-user"></i>
                            <p>Login</p>
                        </Link>
                        :
                        <Link to="/MoviesTv">
                            <i class="fa-solid fa-right-to-bracket"></i>
                            <p>{props.acc}</p>
                        </Link>
                }
            </div>
        </div>
    )
}

export default ButtonLogin;