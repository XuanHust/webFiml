import '../src/components/fontawesome-free-6.0.0-web/css/all.css';
import './App.css';
import Content from './components/contents/Content';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Nav from './components/navigator/Nav';
import { useEffect, useState } from 'react'
import Login from './components/login/Login';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ButtonLogin from './components/buttonLogin/ButtonLogin';


function App(props) {

  const [apiRes, setApiRes] = useState()
  const [login, setLogin] = useState(false)
  const [err, setErr] = useState()

  const handleLogin = (flag) => {
    setLogin(flag)
  }

  useEffect(() => {

  }, [])

  return (
    <Router>
      <div className="App">
        {
          <>
            {
              login ?
                <Routes>
                  <Route path="/MoviesTv" element={<Login handleLogin={handleLogin} />} />
                </Routes>
                :
                <>
                  <Header />
                  <Nav />
                  <Content />
                  <Footer />
                </>
                
            }
            <ButtonLogin handleLogin={handleLogin} />
          </>
        }
      </div>
    </Router>
  );
}

export default App;
