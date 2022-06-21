import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Fimls from "../contents/fimls/Fimls";
import Home from "../contents/home/Home";
import "./Nav.scss"
import FimlDetail from "../contents/fimlDetail/FimlDetail";
import { useState, useEffect } from "react";
import WatchFiml from "../contents/fimlDetail/WatchFiml";
import axios from 'axios';

const Nav = (props) => {

    const [totalFiml, setTotalFiml] = useState([]);
    const [fimls, setFimls] = useState([]);

    const getData = () => {
        fetch('http://localhost:8080/totalFiml')
            .then(response => response.json())
            .then(response => setTotalFiml(response))
            .catch(error => console.error(error))
    }

    const handleClick = async (event) => {
        let link = event.target.getAttribute("value")
        const dataFilter = await axios.post('http://localhost:8080/selectType', { type: event.target.innerText, slug: event.target.getAttribute("value") });

        const getFimls = async () => {
            const getFiml = await fetch("http://localhost:8080/selectType/:link");
            const fiml = await getFiml.json();
            setFimls(fiml);
        }
        getFimls();
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
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
                        <div className="drop">
                            <Link to = "/selectType" value="hanhdong" onClick={(event) => handleClick(event)}>Hành Động</Link>
                            <Link to = "/selectType" value="tinhcam" onClick={(event) => handleClick(event)}>Tình Cảm</Link>
                            <Link to = "/selectType" value="haihuoc" onClick={(event) => handleClick(event)}>Hài Hước</Link>
                            <Link to = "/selectType" value="cotrang" onClick={(event) => handleClick(event)}>Cổ Trang</Link>
                            <Link to = "/selectType" value="kinhdi" onClick={(event) => handleClick(event)}>Kinh Dị</Link>
                            <Link to = "/selectType" value="tamly" onClick={(event) => handleClick(event)}>Tâm Lý</Link>
                            <Link to = "/selectType" value="hinhsu" onClick={(event) => handleClick(event)}>Hình Sự</Link>
                            <Link to = "/selectType" value="thanthoai" onClick={(event) => handleClick(event)}>Thần Thoại</Link>
                            <Link to = "/selectType" value="vientuong" onClick={(event) => handleClick(event)}>Viễn Tưởng</Link>
                            <Link to = "/selectType" value="giadinh" onClick={(event) => handleClick(event)}>Gia Đình</Link>
                            <Link to = "/selectType" value="khoahoc" onClick={(event) => handleClick(event)}>Khoa Học</Link>
                            <Link to = "/selectType" value="chinhkich" onClick={(event) => handleClick(event)}>Chính Kịch</Link>
                            <Link to = "/selectType" value="tailieu" onClick={(event) => handleClick(event)}>Tài Liệu</Link>
                            <Link to = "/selectType" value="phieuluu" onClick={(event) => handleClick(event)}>Phiêu Lưu</Link>
                            <Link to = "/selectType" value="chientranh" onClick={(event) => handleClick(event)}>Chiến Tranh</Link>
                            <Link to = "/selectType" value="vientuong" onClick={(event) => handleClick(event)}>Viễn Tưởng</Link>
                            <Link to = "/selectType" value="amnhac" onClick={(event) => handleClick(event)}>Âm Nhạc</Link>
                            <Link to = "/selectType" value="bian" onClick={(event) => handleClick(event)}>Bí Ẩn</Link>
                        </div>
                    </li>
                    <li>
                        <i class="fa-solid fa-earth-americas"></i>
                        <p>Quốc Gia</p>
                        <i class="fa-solid fa-angle-down"></i>
                        <div className="drop">
                            <Link to = "/selectType" value="trungquoc" onClick={(event) => handleClick(event)}>Trung Quốc</Link>
                            <Link to = "/selectType" value="nhatban" onClick={(event) => handleClick(event)}>Nhật Bản</Link>
                            <Link to = "/selectType" value="aumy" onClick={(event) => handleClick(event)}>Âu Mỹ</Link>
                            <Link to = "/selectType" value="anh" onClick={(event) => handleClick(event)}>Anh</Link>
                            <Link to = "/selectType" value="phap" onClick={(event) => handleClick(event)}>Pháp</Link>
                            <Link to = "/selectType" value="hanquoc" onClick={(event) => handleClick(event)}>Hàn Quốc</Link>
                            <Link to = "/selectType" value="y" onClick={(event) => handleClick(event)}>Ý</Link>
                            <Link to = "/selectType" value="nga" onClick={(event) => handleClick(event)}>Nga</Link>
                            <Link to = "/selectType" value="hongkong" onClick={(event) => handleClick(event)}>Hồng Kông</Link>
                            <Link to = "/selectType" value="canada" onClick={(event) => handleClick(event)}>Canada</Link>
                        </div>
                    </li>
                </div>
            </div>

            <Routes>
                <Route path="/danhsach/phimbo" element={<Fimls fimlType="series" />} />
                <Route path="danhsach/phimle" element={<Fimls fimlType="single" />} />
                <Route path="/danhsach/shows" element={<Fimls fimlType="shows" />} />
                <Route path="/danhsach/hoathinh" element={<Fimls fimlType="cartoon" />} />
                <Route path="/searchActor/fimls" element={<Fimls fimlType="searchActor/fimls" />} />
                <Route path="/selectType" element={<Fimls fimlType="" listFiml={fimls} />} />
                <Route path="/Login" element={<Home />} />
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
        </>
    )
}

export default Nav;