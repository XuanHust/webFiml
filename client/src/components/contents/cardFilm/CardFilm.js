import './CardFilm.scss'

const CardFilm = (props) => {
    return (
        <div className='cardFilm'>
            <div className='cardFilm-content'>
                <p className='img'>
                    <img src={props.itemFilm.thumbUrl} alt={props.itemFilm.name}></img>
                </p>
                <p className='nameTv'>
                    {props.itemFilm.name}
                </p>
                <p className='nameTa'>
                    {props.itemFilm.originName}
                </p>
            </div>
        </div>
    )
}

export default CardFilm;