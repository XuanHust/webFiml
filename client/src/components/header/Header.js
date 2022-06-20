import './Header.scss'
import logo from '../../assets/images/logo.jpg'


const Header = () => {
    return (
        <>
            <div id='container-header'>
                <div className='header-content'>
                    <div className='logo'>
                        <p>
                            <img src={logo} alt="Logo"></img>
                        </p>
                        <h2 className='title'>MoviesTV</h2>
                    </div>
                    <div className='search'>
                        <input type='text' placeholder='Nhập tên phim, diễn viên...'></input>
                        <li><i class="fa-solid fa-magnifying-glass"></i></li>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;