import './FimlDetail.scss'
import { connect } from 'react-redux'
import {
    Link
} from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios'


const FimlDetail = (props) => {
    const [actor, setActor] = useState([]);
    const [director, setDirector] = useState([]);
    const [category, setCategory] = useState([]);
    const [espisodes, setEspisode] = useState([]);

    const getData = async () => {
        const data = await axios.post('http://localhost:8080/postData', { id: props.infor.id });

        const getA = async () => {
            const getActor = await fetch('http://localhost:8080/postData/actor');
            const actor = await getActor.json();
            setActor(actor);
        }
        const getD = async () => {
            const getDirector = await fetch('http://localhost:8080/postData/director');
            const director = await getDirector.json();
            setDirector(director);
        }

        const getC = async () => {
            const getCategory = await fetch('http://localhost:8080/postData/category');
            const category = await getCategory.json();
            setCategory(category);
        }

        // const getE = async () => {
        //     const getEspisodes = await fetch('http://localhost:8080/postData/espisodes');
        //     const espisodes = await getEspisodes.json();
        //     setEspisode(espisodes);
        // }
        getA();
        getC();
        getD();
        // getE();
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='phimdetail-container'>
            <div className='phimdetail-content'>
                <div className='main-content'>
                    <div className='main-left'>
                        <p className='img'>
                            <img src={props.infor.thumb_url} alt={props.infor.id}></img>
                        </p>
                        <button type='button'>
                            <Link to={"/" + props.infor.slug + "/movietv@"}>
                                <i class="fa-solid fa-play"></i>
                                <p>Watch fiml</p>
                            </Link>
                        </button>
                    </div>
                    <div className='main-right'>
                        <p className='title-main'>
                            <h2 className='title'>{props.infor.name}</h2>
                            <h2 className='subtitle'>{props.infor.origin_name}</h2>
                        </p>
                        <p className='infor'>
                            <p className='infor-left'>Trạng thái</p>
                            <p className='infor-right'>{props.infor.episode_current}</p>
                        </p>
                        <p className='infor'>
                            <p className='infor-left'>Số tập</p>
                            <p className='infor-right'>{props.infor.episode_total}</p>
                        </p>
                        <p className='infor'>
                            <p className='infor-left'>Thời lượng</p>
                            {
                                props.infor.time ?
                                    <p className='infor-right'>{props.infor.time}</p>
                                    :
                                    <p className='infor-right'>N/A</p>
                            }

                        </p>
                        <p className='infor'>
                            <p className='infor-left'>Năm phát hành</p>
                            {
                                props.infor.year ?
                                    <p className='infor-right'>{props.infor.year}</p>
                                    :
                                    <p className='infor-right'>N/A</p>
                            }
                        </p>
                        <p className='infor'>
                            <p className='infor-left'>Chất lượng</p>
                            {
                                props.infor.quality ?
                                    <p className='infor-right'>{props.infor.quality}</p>
                                    :
                                    <p className='infor-right'>N/A</p>
                            }

                        </p>
                        <p className='infor'>
                            <p className='infor-left'>Ngôn ngữ</p>
                            {
                                props.infor.lang ?
                                    <p className='infor-right'>{props.infor.lang}</p>
                                    :
                                    <p className='infor-right'>N/A</p>
                            }

                        </p>
                        <p className='infor'>
                            <p className='infor-left'>Đạo diễn</p>

                            <p className='infor-right'>
                                {
                                    // director.name ?
                                    director.map((item, index) => {
                                        return (
                                            <span>{`${item.name}, `}</span>
                                        )
                                    })
                                    // :
                                    // <span>Đang cập nhật</span>
                                }
                            </p>

                        </p>
                        <p className='infor'>
                            <p className='infor-left'>Diễn viên</p>

                            <p className='infor-right'>
                                {
                                    // actor[0].name ?
                                    actor.map((item, index) => {
                                        return (
                                            <span>{`${item.name}, `}</span>
                                        )
                                    })
                                    // :
                                    // <span>Đang cập nhật</span>
                                }
                            </p>

                        </p>

                        <p className='infor'>
                            <p className='infor-left'>Thể loại</p>
                            <p className='infor-right'>
                                {
                                    // actor[0].name ?
                                    category.map((item, index) => {
                                        return (
                                            <span>{`${item.name}, `}</span>
                                        )
                                    })
                                    // :
                                    // <span>Đang cập nhật</span>
                                }
                            </p>

                        </p>
                        <p className='infor'>
                            <p className='infor-left'>Quốc gia</p>
                            <p className='infor-right'>{props.infor.country}</p>
                        </p>
                    </div>
                </div>
            </div>
            <div className='noidung-content'>
                <div className='noidung-title'>
                    <i class="fa-solid fa-book"></i>
                    <p>Nội Dung fiml</p>
                </div>
            </div>
            <div className='noidung'>
                <p>
                    {props.infor.content}
                </p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return (
        {
            dataRedux: state
        }
    )
}

export default connect(mapStateToProps)(FimlDetail);