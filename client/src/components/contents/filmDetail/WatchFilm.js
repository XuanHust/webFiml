import './WatchFilm.scss';
import cartoon from '../../../assets/audio/cartoon.mp4';
import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import axios from 'axios';
import Comment from '../comment/Comment';
import VideoApp from './VideoApp';
import ReactHlsPlayer from 'react-hls-player';

const WatchFilm = (props) => {
    const [espisode, setEspisode] = useState();
    const [espisodes, setEspisodes] = useState([]);
    const [server, setServer] = useState();
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
        const comFilter = com.filter(item => item.idFilm === props.film.id);
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
                id: props.film.id,
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

    const handleEpisode = (slug, item) => {
        setEspisode(item);
    }

    const data1 = (espisod) => {
        setEspisodes(espisod);
        setEspisode(espisod[0].link);
        setServer(espisod[0].serverName);

    }

    const getData = async () => {
        setToken(localStorage.getItem(props.acc));
        const data = await axios.post('http://localhost:8080/postData', { id: props.film.id });
        const getE = async () => {
            const getEspisodes = await fetch('http://localhost:8080/postData/espisodes');
            const espisod = await getEspisodes.json();
            data1(espisod);
        }
        getE();
        comments();
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='watchFilm-conatiner'>
            <div className='watchFilm-content'>
                <div className='main-film'>
                    {/* <VideoApp url={espisode} /> */}
                    <ReactHlsPlayer
                        src={espisode}
                        autoPlay={false}
                        controls={true}
                        width="100%"
                        height="auto"
                        poster='https://res.cloudinary.com/xuanhust/image/upload/v1656555977/samples/WebFiml/Op-ket-thuc-1-game4v-1645151815-49_dtpjpq.jpg'
                        hlsConfig={{
                            maxLoadingDelay: 4,
                            minAutoBitrate: 0,
                            lowLatencyMode: true,
                        }}
                    />
                </div>
                <div className='server'>
                    <p className='first'>
                        <i class="fa-solid fa-server"></i>
                        Server
                    </p>
                    <p className='second'>
                        {server}
                    </p>
                </div>
                <div className='name'>
                    <p className='nameTv'>
                        {props.film.name}
                    </p>
                    <p className='nameTa'>
                        {props.film.originName}
                    </p>
                </div>
                <div className='episodes'>
                    <p className='choose'>
                        <i class="fa-solid fa-tv"></i>
                        <p>Chọn Tập</p>
                    </p>
                    <div className='espisode'>
                        {
                            espisodes.map((item, index) => {
                                return (
                                    <button type='button' onClick={() => handleEpisode(index, item.link)}>
                                        <a href={`#tap${item.slug}`}>
                                            {item.slug}
                                        </a>
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='episodes'>
                    <div className='choose'>
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
        </div>
    )
}

export default WatchFilm;