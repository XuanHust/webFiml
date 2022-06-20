import './Footer.scss'
import logo from '../../assets/images/logo.jpg'

const Footer = () => {
    return (
        <>
            <div id='container-footer'>
                <div className='content-footer'>
                    <div className='logo'>
                        <p>
                            <img src={logo} alt="Logo"></img>
                        </p>
                        <h2>MoviesTV</h2>
                    </div>
                    <div className='content'>
                        <p>Tất cả nội dung của trang web này được thu thập từ các trang web video chính thống trên Internet, và không cung cấp phát trực tuyến chính hãng. Nếu quyền lợi của bạn bị vi phạm, vui lòng thông báo cho chúng tôi, chúng tôi sẽ xóa nội dung vi phạm kịp thời, cảm ơn sự hợp tác của bạn!</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;