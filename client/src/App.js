import '../src/components/fontawesome-free-6.0.0-web/css/all.css';
import './App.css';
import Content from './components/contents/Content';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Nav from './components/navigator/Nav';
import { useEffect, useState } from 'react'
import Login from './components/login/Login';


function App(props) {

  const [apiRes, setApiRes] = useState()
  const [login, setLogin] = useState()
  const [err, setErr] = useState()

  const handleLogin = (login) => {
    console.log("login", login)
    login.username === "admin" && login.password === "admin" ?
      setLogin(true)
      :
      setErr("Username or password not corect!")
  }

  useEffect(() => {
    
  }, [])

  return (
    <div className="App">
      {
        // login ?
          <>
            <Header />
            <Nav />
            <Content />
            <Footer />
          </>
          // :
          // <>
          //   < Login handleLogin={handleLogin} err={err} />
          // </>

      }
    </div>
  );
}

export default App;
