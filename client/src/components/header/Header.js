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
    const [filmsSearch, setFilmsSearch] = useState([])
    const [flag, setFlag] = useState()

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const handFilm = (film) => {
        setFilmsSearch(film)
        filmsSearch.length >= 1 ?
            setFlag(true)
            :
            setFlag(false)
    }

    const searchFilm = async () => {
        // console.log("Search:", search);
        const dataSearch = await axios.post('http://localhost:8080/searchActor', { actor: search });
        const getFilms = async () => {
            const getFilm = await fetch('http://localhost:8080/searchActor/films');
            const film = await getFilm.json();
            handFilm(film);
        }
        getFilms();
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
                        <Link to="/searchActor/films">
                            <li onClick={() => searchFilm()}><i class="fa-solid fa-magnifying-glass"></i></li>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;