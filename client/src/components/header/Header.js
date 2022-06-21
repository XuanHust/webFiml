import './Header.scss'
import logo from '../../assets/images/logo.jpg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";


const Header = () => {


    const [search, setSearch] = useState("")
    const [fimlsSearch, setFimlsSearch] = useState([])
    const [flag, setFlag] = useState()

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const handFiml = (fiml) => {
        setFimlsSearch(fiml)
        fimlsSearch.length >= 1 ?
            setFlag(true)
            :
            setFlag(false)
    }

    const searchFiml = async () => {
        console.log("Search:", search);
        const dataSearch = await axios.post('http://localhost:8080/searchActor', { actor: search });
        const getFimls = async () => {
            const getFiml = await fetch('http://localhost:8080/searchActor/fimls');
            const fiml = await getFiml.json();
            handFiml(fiml);
            // console.log("data:", fiml)
        }
        getFimls();
        setSearch("");
    }

    return (
        <>
            <div id='container-header'>
                <div className='header-content'>
                    <div className='logo'>
                        <p>
                            <img src={logo} alt="Logo"></img>
                        </p>
                        <h2 className='title'>MoviesTV</h2>
                    </div>
                    <div className='search'>
                        <input type='text' placeholder='Nhập tên phim, Tên diễn viên...'
                            onChange={(event) => handleSearch(event)}
                            value={search}></input>
                        <Link to="/searchActor/fimls">
                            <li onClick={() => searchFiml()}><i class="fa-solid fa-magnifying-glass"></i></li>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;