import './Footer.scss';
import { FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa';

export default function Footer() {
  return (
    <section className='footer'>
        <div className="container">
            <div className="wrapper">
                <h3>Quick Links</h3>
                <a href="#">home</a>
                <a href="#">dishes</a>
                <a href="#">about</a>
                <a href="#">menu</a>
            </div>
            <div className="wrapper">
                <h3>locations</h3>
                <a href="#">Nairobi</a>
                <a href="#">Ndumbuini</a>
                <a href="#">Nairobi CBD</a>
                <a href="#">Uthiru</a>
            </div>
            <div className="wrapper">
                <h3>contact us</h3>
                <a href="#">+254 797814027</a>
                <a href="#">valleydishes@gmail.com</a>
                <span>
                    <a href=""><FaFacebook className='link' /></a>
                    <a href=""><FaTwitter className='link'/></a>
                    <a href=""><FaInstagram className='link'/></a>
                </span>
            </div>
        </div>
        <div className="credit">&copy; 2024 by <span>Valley Dishes</span></div>
    </section>
  )
}
