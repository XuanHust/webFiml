import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import SeriesFiml from "../contents/seriesFiml/SeriesFiml";
import OddFiml from "../contents/oddFiml/OddFiml";
import Cartoon from "../contents/cartoon/Cartoon";
import Show from "../contents/shows/Show";
import Home from "../contents/home/Home";
import "./Nav.scss"
import FimlDetail from "../contents/fimlDetail/FimlDetail";
import { useState, useEffect } from "react";
import WatchFiml from "../contents/fimlDetail/WatchFiml";

const Nav = (props) => {

    const [totalFiml, setTotalFiml] = useState([])

    const getData = () => {
        fetch('http://localhost:8080/totalFiml')
            .then(response => response.json())
            .then(response => setTotalFiml(response))
            .catch(error => console.error(error))
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <Router>
            <div id="container-nav">
                <div className="nav-content">
                    <li className="home">
                        <Link to="/MoviesTv">
                            <i class="fa-solid fa-house-chimney"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/danhsach/phimbo">
                            <i class="fa-solid fa-video"></i>
                            <p>Phim Bộ</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/danhsach/phimle">
                            <i class="fa-solid fa-film"></i>
                            <p>Phim Lẻ</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/danhsach/shows">
                            <i class="fa-solid fa-tv-retro"></i>
                            <p>Shows</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/danhsach/hoathinh">
                            <i class="fa-solid fa-baby"></i>
                            <p>Hoạt Hình</p>
                        </Link>
                    </li>
                    <li>
                        <i class="fa-solid fa-folder"></i>
                        <p>Thể Loại</p>
                        <i class="fa-solid fa-angle-down"></i>
                    </li>
                    <li>
                        <i class="fa-solid fa-earth-americas"></i>
                        <p>Quốc Gia</p>
                        <i class="fa-solid fa-angle-down"></i>
                    </li>
                </div>
            </div>

            <Routes>
                <Route path="/danhsach/phimbo" element={<SeriesFiml />} />
                <Route path="danhsach/phimle" element={<OddFiml />} />
                <Route path="/danhsach/shows" element={<Show />} />
                <Route path="/danhsach/hoathinh" element={<Cartoon />} />
                <Route path="/MoviesTv" element={<Home />} />
                {
                    totalFiml && totalFiml.length &&
                    totalFiml.map((item, index) => {
                        return (
                            <Route path={"/" + item.slug + "/movietv@"} element={<WatchFiml phimz={item} />} />
                        )
                    })
                }

                {
                    totalFiml && totalFiml.length &&
                    totalFiml.map((item, index) => {
                        return (
                            <Route path={"/" + item.slug} element={<FimlDetail infor={item} />} />
                        )
                    })
                }
            </Routes>
        </Router>
    )
}

export default Nav;