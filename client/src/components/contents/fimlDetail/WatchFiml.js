import './WatchFiml.scss'
import cartoon from '../../../assets/audio/cartoon.mp4'
import { useEffect, useState } from 'react';
import Iframe from 'react-iframe'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import axios from 'axios';
import Comment from '../comment/Comment';

const WatchFiml = (props) => {
    const [episode, setEspisode] = useState()
    const [espisodes, setEspisodes] = useState([]);
    const [server, setServer] = useState();
    const [comment, setComment] = useState([]);
    const [postCommnent, setPostComment] = useState("")
    const [err, setErr] = useState(false)


    const onChangeComment = (e) => {
        setPostComment(e.target.value)
    }

    const comments = async () => {
        const getComment = await fetch('http://localhost:8080/comment');
        const com = await getComment.json();
        const comFilter = com.filter(item => item.idfiml === props.phimz.id)
        setComment(comFilter);
    }

    const CheckLogin = async () => {
        const data = await axios.post('http://localhost:8080/postComment', { user: props.acc, id: props.phimz.id, comment: postCommnent, key: (Math.random() + 1).toString(36).substring(2) });
        comments();
        setPostComment("")
        setErr(false)
    }

    const handleClick = async () => {
        console.log("check>>", props.acc === "Login")
        props.acc === "Login" ?
            setErr(true)
            :
            CheckLogin()

    }

    const handleEpisode = (slug, item) => {
        setEspisode(item)
    }

    const data1 = (espisod) => {
        setEspisodes(espisod);
        setEspisode(espisod[0].link)
        setServer(espisod[0].server_name)

    }

    const getData = async () => {
        const data = await axios.post('http://localhost:8080/postData', { id: props.phimz.id });

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
        <div className='xemphim-conatiner'>
            <div className='xemphim-content'>
                <div className='main-phim'>
                    <iframe
                        src={episode}
                        // src="http://localhost:8080/video/"
                        title="Fiml MoviesTv" frameborder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                    {/* <Iframe url={episode}
                        width="450px"
                        height="450px"
                        id="myId"
                        className="myClassname"
                        display="initial"
                        position="relative" /> */}
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
                    <p className='nametv'>
                        {props.phimz.name}
                    </p>
                    <p className='nameta'>
                        {props.phimz.origin_name}
                    </p>
                </div>
                <div className='episodes'>
                    <p className='chontap'>
                        <i class="fa-solid fa-tv"></i>
                        <p>Chọn Tập</p>
                    </p>
                    <div className='tap'>
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
                    <div className='chontap'>
                        <i class="fa-solid fa-comment"></i>
                        <p>Bình Luận</p>
                    </div>
                </div>
                <div className='comments'>
                    {
                        comment.map((item, index) => {
                            return (
                                <Comment user={item.user} id={item.idfiml} content={item.content} />
                            )
                        })
                    }
                </div>
                <div className='comments'>
                    <div className='post'>
                        <textarea className='postcomment' placeholder='Post your comment...' onChange={(e) => onChangeComment(e)} value={postCommnent}></textarea>
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

export default WatchFiml;