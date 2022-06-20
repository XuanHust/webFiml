import './Home.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react'

import truonghanhca from '../../../assets/images/truonghanhca.jpg'
import ngocrong from '../../../assets/images/7vienngocrong.jpg'
import chienbinhmuadong from '../../../assets/images/chienbinhmuadong.jpg'
import chuatechiecnhan from '../../../assets/images/chuatechiecnhan.jpg'
import kingsman from '../../../assets/images/kingsman.jpg'
import loki1 from '../../../assets/images/loki1.jpg'
import minhlan from '../../../assets/images/minhlan.jpg'
import trutien2 from '../../../assets/images/trutien2.jpg'
import thieunien from '../../../assets/images/thieunientudaidanhbo.jpg'

import {
    Link
} from "react-router-dom";
import CardFiml from '../cardFiml/CardFiml'

const Home = (props) => {

    const [seriesFiml, setSeriesFiml] = useState([])
    const [oddFiml, setOddFiml] = useState([])
    const [shows, setShows] = useState([])
    const [cartoon, setCartoon] = useState([])

    const banner = [
        { id: "627212013a2c0c6289bb9cd7", url: truonghanhca, slug: "truong-ca-hanh" },
        { id: "627355803a2c0c6289bc6e7c", url: ngocrong, slug: "bay-vien-ngoc-rong-z" },
        { id: "62695c78fa02df5563cbeccb", url: chienbinhmuadong, slug: "falcon-va-chien-binh-mua-dong" },
        { id: "6262eaf9db43524328b0fc26", url: chuatechiecnhan, slug: "chua-te-cua-chiec-nhan-su-tro-ve-cua-nha-vua" },
        { id: "6266d1ad489068f643a21e09", url: kingsman, slug: "mat-vu-kingsman-kingsman-the-secret-service" },
        { id: "62700f343a2c0c6289b9e435", url: loki1, slug: "loki" },
        { id: "6269e1b7fa02df5563cc2fa6", url: minhlan, slug: "minh-lan-truyen" },
        { id: "626ab730fa02df5563cc9b2a", url: trutien2, slug: "tru-tien-thanh-van-chi-2" },
        { id: "626fc4263a2c0c6289b9bb8e", url: thieunien, slug: "thieu-nien-tu-dai-danh-bo" },
    ]

    const getData = () => {
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
    }

    useEffect(() => {
        getData();
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
                                banner && banner.length &&
                                banner.map((item, index) => {
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
export default Home;