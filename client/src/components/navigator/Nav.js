
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
import { connect } from "react-redux";
import WatchFiml from "../contents/fimlDetail/WatchFiml";
import cartoon1 from "../../assets/audio/cartoon1.mp4"

const Nav = (props) => {

    const [seriesFiml, setSeriesFiml] = useState()
    const [oddFiml, setOddFiml] = useState()
    const [shows, setShows] = useState()
    const [cartoon, setCartoon] = useState()
    const [totalFiml, setTotalFiml] = useState([])

    const loadPhim = () => {

        setSeriesFiml(props.dataRedux.seriesFiml)
        setOddFiml(props.dataRedux.oddFiml)
        setShows(props.dataRedux.shows)
        setCartoon(props.dataRedux.cartoon)
    }

    const fimls = props.dataRedux.totalphim.filter(e => e.movie._id === props.dataRedux.listBanner.id)

    useEffect(() => {
        fetch('http://localhost:8080/totalFiml')
            .then(response => response.json())
            .then(response => setTotalFiml(response))
            .catch(error => console.error(error))
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
                    fimls &&
                    fimls.map((item, index) => {
                        return (
                            <Route path={'/' + item.movie.slug} element={<FimlDetail infor={item} />} />
                        )
                    })
                }


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

const mapStateToProps = (state) => {
    return (
        {
            dataRedux: state
        }
    )
}

export default connect(mapStateToProps)(Nav);