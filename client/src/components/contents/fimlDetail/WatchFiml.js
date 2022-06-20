import './WatchFiml.scss'
import cartoon from '../../../assets/audio/cartoon.mp4'
import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import axios from 'axios';

const WatchFiml = (props) => {
    const [episode, setEspisode] = useState()
    const [espisodes, setEspisodes] = useState([]);
    const [server, setServer] = useState();

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
                        title="Fiml MoviesTv" frameborder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
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
            </div>
        </div>
    )
}

export default WatchFiml;