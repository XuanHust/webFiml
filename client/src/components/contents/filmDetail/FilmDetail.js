import './FilmDetail.scss';
import {
    Link
} from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Comment from '../comment/Comment';


const FilmDetail = (props) => {
    const [actor, setActor] = useState([]);
    const [director, setDirector] = useState([]);
    const [category, setCategory] = useState([]);
    const [comment, setComment] = useState([]);
    const [postCommnent, setPostComment] = useState("");
    const [err, setErr] = useState(false);
    const [token, setToken] = useState();

    const onChangeComment = (e) => {
        setPostComment(e.target.value);
    }

    const comments = async () => {
        const getComment = await fetch('http://localhost:8080/comment');
        const com = await getComment.json();
        const comFilter = com.filter(item => item.idFilm === props.infor.id);
        setComment(comFilter);
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Beaer ${token}`
    }

    const CheckLogin = async () => {
        const data = await axios.post('http://localhost:8080/postComment',
            {
                user: props.acc,
                id: props.infor.id,
                comment: postCommnent,
                key: (Math.random() + 1).toString(36).substring(2)
            },
            {
                headers: headers
            });
        comments();
        setPostComment("");
        setErr(false);
    }

    const handleClick = async () => {
        props.acc === "Login" ?
            setErr(true)
            :
            CheckLogin();

    }

    const getData = async () => {
        setToken(localStorage.getItem(props.acc));
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

        getA();
        getC();
        getD();
        comments();
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='filmDetail-container'>
            <div className='filmDetail-content'>
                <div className='main-content'>
                    <div className='main-left'>
                        <p className='img'>
                            <img src={props.infor.thumbUrl} alt={props.infor.id}></img>
                        </p>
                        <button type='button'>
                            <Link to={"/" + props.infor.slug + "/movietv@"}>
                                <i class="fa-solid fa-play"></i>
                                <p>Xem Phim</p>
                            </Link>
                        </button>
                    </div>
                    <div className='main-right'>
                        <p className='title-main'>
                            <h2 className='title'>{props.infor.name}</h2>
                            <h2 className='subtitle'>{props.infor.originName}</h2>
                        </p>
                        <p className='infor'>
                            <p className='infor-left'>Trạng thái</p>
                            <p className='infor-right'>{props.infor.episodeCurrent}</p>
                        </p>
                        <p className='infor'>
                            <p className='infor-left'>Số tập</p>
                            <p className='infor-right'>{props.infor.episodeTotal}</p>
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
                                    director.map((item, index) => {
                                        return (
                                            <span>{`${item.name}, `}</span>
                                        )
                                    })
                                }
                            </p>

                        </p>
                        <p className='infor'>
                            <p className='infor-left'>Diễn viên</p>

                            <p className='infor-right'>
                                {
                                    actor.map((item, index) => {
                                        return (
                                            <span>{`${item.name}, `}</span>
                                        )
                                    })
                                }
                            </p>

                        </p>

                        <p className='infor'>
                            <p className='infor-left'>Thể loại</p>
                            <p className='infor-right'>
                                {
                                    category.map((item, index) => {
                                        return (
                                            <span>{`${item.name}, `}</span>
                                        )
                                    })
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
            <div className='content-content'>
                <div className='content-title'>
                    <i class="fa-solid fa-book"></i>
                    <p>Nội Dung film</p>
                </div>
            </div>
            <div className='content'>
                <p>
                    {props.infor.content}
                </p>
            </div>
            <div className='content-content'>
                <div className='content-title'>
                    <i class="fa-solid fa-comment"></i>
                    <p>Bình Luận</p>
                </div>
            </div>
            <div className='comments'>
                {
                    comment.map((item, index) => {
                        return (
                            <Comment user={item.user} id={item.idFilm} content={item.content} />
                        )
                    })
                }
            </div>
            <div className='comments'>
                <div className='post'>
                    <textarea className='postComment' placeholder='Post your comment...' onChange={(e) => onChangeComment(e)} value={postCommnent}></textarea>
                    <button type='button' className='button' onClick={() => handleClick()}>Post</button>
                </div>
                {
                    err &&
                    <p className='err'>Bạn cần đăng nhập để bình luận!</p>
                }
            </div>
        </div>
    )
}

export default FilmDetail;