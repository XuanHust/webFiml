import '../src/components/fontawesome-free-6.0.0-web/css/all.css';
import './App.css';
import Content from './components/contents/Content';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Nav from './components/navigator/Nav';
import { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import Login from './components/login/Login';


function App(props) {

  const [apiRes, setApiRes] = useState()
  const [login, setLogin] = useState()
  const [err, setErr] = useState()

  const handleLoad = () => {
    const state = props.callApi()
  }

  const handleLogin = (login) => {
    console.log("login", login)
    login.username === "admin" && login.password === "admin" ?
      setLogin(true)
      :
      setErr("Username or password not corect!")
  }

  // fetch('http://localhost:8080/testApi')
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(error => console.error(error))

  useEffect(() => {
    window.addEventListener('load', handleLoad)
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


const mapStateToProps = (state) => {
  return (
    {
      dataRedux: state.listFilm
    }
  )
}

const mapDispatchToProps = (dispatch) => {
  return ({
    callApi: () => dispatch({ type: 'CALL_API' })
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
