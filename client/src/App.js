import '../src/components/fontawesome-free-6.0.0-web/css/all.css';
import './App.css';
import Content from './components/contents/Content';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Nav from './components/navigator/Nav';
import { useEffect, useState } from 'react'
import Login from './components/login/Login';
import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import ButtonLogin from './components/buttonLogin/ButtonLogin';
import { gapi} from 'gapi-script'

const clientId = "781604133955-5vnqd8or7cev1jbloil96ossd4upl6av.apps.googleusercontent.com"

function App(props) {

  const [account, setAccount] = useState("Login")
  const [login, setLogin] = useState(false)
  

  const handleLogin = (acc, flag) => {
    setLogin(flag)
    setAccount(acc)
  }

  useEffect(() => {
    localStorage.length === 1 &&
    handleLogin(Object.keys(localStorage)[0], false)

    sessionStorage.length === 1 &&
    handleLogin("", true);

    const start = () => {
      gapi.client.init({
        clientId: clientId,
        scope:''
      })
    }
    gapi.load('client:auth2', start)

  }, [])

  return (
    <Router>
      <div className="App">
        {
          <>
            {
              login ?
                <Routes>
                  <Route path="/Login" element={<Login handleLogin={handleLogin} />} />
                </Routes>
                :
                <>
                  <Header />
                  <Nav acc={account} />
                  <Content />
                  <Footer />
                </>
            }
            <ButtonLogin handleLogin={handleLogin} acc={account} />
          </>
        }
      </div>
    </Router>
  );
}

export default App;
