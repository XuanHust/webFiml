import './Home.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'

import {
    Link
} from "react-router-dom";
import CardFiml from '../cardFiml/CardFiml'

const Home = (props) => {

    const [seriesFiml, setSeriesFiml] = useState([])
    const [oddFiml, setOddFiml] = useState([])
    const [shows, setShows] = useState([])
    const [cartoon, setCartoon] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/seriesFiml')
            .then(response => response.json())
            .then(response => setSeriesFiml(response))
            .catch(error => console.error(error))

        fetch('http://localhost:8080/oddFiml')
            .then(response => response.json())
            .then(response => setOddFiml(response))
            .catch(error => console.error(error))

        fetch('http://localhost:8080/shows')
            .then(response => response.json())
            .then(response => setShows(response))
            .catch(error => console.error(error))

        fetch('http://localhost:8080/cartoon')
            .then(response => response.json())
            .then(response => setCartoon(response))
            .catch(error => console.error(error))
    }, [])

    const settings = {
        arrow: true,
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <div className='container-home'>
                <div className='home-content'>
                    <div className='home-banner'>
                        <Slider {...settings}>
                            {
                                props.dataRedux.listBanner && props.dataRedux.listBanner.length &&
                                props.dataRedux.listBanner.map((item, index) => {
                                    return (
                                        <div className='banner'>
                                            <Link to={"/" + item.slug}>
                                                <img src={item.url} alt={item.id}></img>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>

                    <div className='home-phim'>
                        <div className='title'>
                            <p className='title-left'>
                                <i class="fa-solid fa-video"></i>
                                <p>Phim Bộ Đặc Sắc</p>
                            </p>
                            <p className='title-right'>
                                <Link to="/danhsach/phimbo">
                                    <p>Xem tất cả</p>
                                    <i class="fa-solid fa-angles-right"></i>
                                </Link>
                            </p>
                        </div>
                        <div className='phimbo-content'>
                            {
                                seriesFiml && seriesFiml.length &&
                                seriesFiml.map((item, index) => {
                                    return (
                                        index < 8 &&
                                        <Link to={"/" + item.slug}>
                                            <CardFiml itemPhim={item} key={index} />
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className='home-phim'>
                        <div className='title'>
                            <p className='title-left'>
                                <i class="fa-solid fa-film"></i>
                                <p>Phim Lẻ Đặc Sắc</p>
                            </p>
                            <p className='title-right'>
                                <Link to="/danhsach/phimle">
                                    <p>Xem tất cả</p>
                                    <i class="fa-solid fa-angles-right"></i>
                                </Link>
                            </p>
                        </div>
                        <div className='phimbo-content'>
                        {
                                oddFiml && oddFiml.length &&
                                oddFiml.map((item, index) => {
                                    return (
                                        index < 8 &&
                                        <Link to={"/" + item.slug}>
                                            <CardFiml itemPhim={item} key={index} />
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className='home-phim'>
                        <div className='title'>
                            <p className='title-left'>
                                <i class="fa-solid fa-film"></i>
                                <p>Shows Tổng Hợp</p>
                            </p>
                            <p className='title-right'>
                                <Link to="/danhsach/shows">
                                    <p>Xem tất cả</p>
                                    <i class="fa-solid fa-angles-right"></i>
                                </Link>
                            </p>
                        </div>
                        <div className='phimbo-content'>
                            {
                                shows && shows.length &&
                                shows.map((item, index) => {
                                    return (
                                        index < 8 &&
                                        <Link to={"/" + item.slug}>
                                            <CardFiml itemPhim={item} key={index} />
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className='home-phim'>
                        <div className='title'>
                            <p className='title-left'>
                                <i class="fa-solid fa-baby"></i>
                                <p>Hoạt Hình Vui Nhộn</p>
                            </p>
                            <p className='title-right'>
                                <Link to="/danhsach/hoathinh">
                                    <p>Xem tất cả</p>
                                    <i class="fa-solid fa-angles-right"></i>
                                </Link>
                            </p>
                        </div>
                        <div className='phimbo-content'>
                            {
                                cartoon && cartoon.length &&
                                cartoon.map((item, index) => {
                                    return (
                                        index < 8 &&
                                        <Link to={"/" + item.slug}>
                                            <CardFiml itemPhim={item} key={index} />
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return (
        {
            dataRedux: state
        }
    )
}

// const mapDispatchToProps = (dispatch) => {
//     return({
//         addItemRedux: (itemAdd) => dispatch({type: 'ADD_ITEM', payload: itemAdd})
//     })
// }
export default connect(mapStateToProps)(Home);