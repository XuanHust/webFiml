import './CardFiml.scss'

const CardFiml = (props) => {
    return (
        <div className='cardPhim'>
            <div className='cardphim-conent'>
                <p className='img'>
                    <img src={props.itemPhim.thumb_url} alt={props.itemPhim.name}></img>
                </p>
                <p className='nametv'>
                    {props.itemPhim.name}
                </p>
                <p className='nameta'>
                    {props.itemPhim.origin_name}
                </p>
            </div>
        </div>
    )
}

export default CardFiml;