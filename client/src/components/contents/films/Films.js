import './Films.scss';
import CardFilm from '../cardFilm/CardFilm';
import { useState, useEffect } from 'react';
import axios from 'axios';

import {
    Link
} from "react-router-dom";


const SeriesFilm = (props) => {

    const [sort, setSort] = useState("--Sắp xếp--")
    const [category, setCategory] = useState("--Thể loại--")
    const [nation, setNation] = useState("--Quốc gia--")
    const [year, setYear] = useState("--Năm--")
    const [film, setFilm] = useState([])
    const [data, setData] = useState()

    const handleSort = (event) => {
        setSort(event.target.value)
    }
    const handleCategory = (event) => {
        setCategory(event.target.value)
    }
    const handleNation = (event) => {
        setNation(event.target.value)
    }
    const handleYear = (event) => {
        setYear(event.target.value)
    }

    const handleFilter = async (filter) => {
        const dataFilter = await axios.post('http://localhost:8080/filterFilm', filter);
        const getFilms = async () => {
            const getFilm = await fetch('http://localhost:8080/filterFilm/films');
            const film = await getFilm.json();
            setFilm(film);
        }
        getFilms();
    }
    const handleClick = () => {
        const filter = {
            category: category,
            nation: nation,
            year: year,
            type: props.filmType,
        }
        handleFilter(filter);
    }

    const numberOfFilm = film.length
    const filmOfPage = 12
    const numberOfPage = Math.ceil(numberOfFilm / filmOfPage)
    let page = []
    let dataOfPage = []
    for (let i = 0; i < numberOfPage; i++) {
        page = [...page, i + 1]
    }
    const handlePage = (number) => {
        dataOfPage = []
        let maxNumber = filmOfPage * number
        if (filmOfPage * number > film.length) {
            maxNumber = film.length
        }
        for (let j = filmOfPage * (number - 1); j < maxNumber; j++) {
            dataOfPage = [...dataOfPage, film[j]]
        }
        setData(dataOfPage)
    }

    const getData = () => {
        fetch(`http://localhost:8080/${props.filmType}`)
            .then(response => response.json())
            .then(response => setFilm(response))
            .catch(error => console.error(error))
    }

    const takeData = () => {
        setFilm(props.listFilm)
    }

    // console.log("listdata", props.listFiml)

    useEffect(() => {
        props.filmType ?
            getData()
            :
            takeData()
    }, [props])

    return (
        <div className='films-container'>
            <div className='films-content'>
                <div className='title'>
                    <i class="fa-solid fa-folder-open"></i>
                    <p>Phim Bộ</p>
                </div>
                <div className='selector'>
                    <select onChange={(event) => handleSort(event)}>
                        <option>--Sắp xếp--</option>
                        <option>Mới cập nhật</option>
                        <option>Năm xuất bản</option>
                    </select>
                    <select onChange={(event) => handleCategory(event)}>
                        <option>--Thể loại--</option>
                        <option>Hành Động</option>
                        <option>Tình Cảm</option>
                        <option>Hài Hước</option>
                        <option>Cổ Trang</option>
                        <option>Kinh Dị</option>
                        <option>Tâm Lý</option>
                        <option>Hình Sự</option>
                        <option>Thần Thoại</option>
                        <option>Viễn Tưởng</option>
                        <option>Gia Đình</option>
                        <option>Khoa Học</option>
                        <option>Chính Kịch</option>
                        <option>Tài Liệu</option>
                        <option>Phiêu Lưu</option>
                        <option>Chiến Tranh</option>
                        <option>Viễn Tưởng</option>
                        <option>Âm Nhạc</option>
                        <option>Bí Ẩn</option>
                        <option>...</option>
                    </select>
                    <select onChange={(event) => handleNation(event)}>
                        <option>--Quốc gia--</option>
                        <option>Trung Quốc</option>
                        <option>Nhật Bản</option>
                        <option>Âu Mỹ</option>
                        <option>Anh</option>
                        <option>Pháp</option>
                        <option>Hàn Quốc</option>
                        <option>Ý</option>
                        <option>Nga</option>
                        <option>Hồng Kông</option>
                        <option>Canada</option>
                        <option>...</option>
                    </select>
                    <select onChange={(event) => handleYear(event)}>
                        <option>--Năm--</option>
                        <option>2022</option>
                        <option>2021</option>
                        <option>2020</option>
                        <option>2019</option>
                        <option>2018</option>
                        <option>2017</option>
                        <option>2016</option>
                        <option>2015</option>
                        <option>2014</option>
                        <option>2013</option>
                        <option>2012</option>
                        <option>2011</option>
                        <option>2010</option>
                        <option>...</option>
                    </select>
                    <button type='button'
                        onClick={() => handleClick()}
                    >Lọc Phim</button>
                </div>
                <div className='filmsAll'>
                    {
                        data && data.length ?
                            data.map((item, index) => {
                                return (
                                    <Link to={"/" + item.slug}>
                                        <CardFilm itemFilm={item} key={index} />
                                    </Link>
                                )
                            })
                            :
                            film.map((item, index) => {
                                if (index < 12) {
                                    return (
                                        <Link to={"/" + item.slug}>
                                            <CardFilm itemFilm={item} key={index} />
                                        </Link>
                                    )
                                }
                            })
                    }
                </div>
                <div className='pagination'>
                    <a href={`#a`}>&laquo;</a>
                    {
                        page && page.length &&
                        page.map((item, index) => {
                            return (
                                <a href={`#page${item}`} onClick={() => handlePage(item)} >{item}</a>
                            )
                        })
                    }
                    <a href="#a">&raquo;</a>
                </div>
            </div>
        </div>
    )
}

export default SeriesFilm;