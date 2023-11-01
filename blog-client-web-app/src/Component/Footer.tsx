
import { Link } from 'react-router-dom';
import './footer.scss'

import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import ContactUs from '../Pages/ContactUs/ContactUs';
const Footer = () => {
  return (
    <div className='footer'>

      <div className='footer-left'>
        <span>VBlog</span>
        <span>VBlog@gmial.com</span>
        <div>

          <Link to={"/#"}>
            <BsFacebook size={30} color={'#ffff'}/>
          </Link>

          <Link to={"/#"}>
            <BsInstagram size={30} color={'#ffff'}/>
          </Link>

          <Link to={"/#"}>
            <BsTwitter size={30} color={'#ffff'}/>
          </Link>

        </div>

        
      </div>

      <div className='footer-right'>
        <span>Contact Us</span>
        <ContactUs/>
      </div>

    </div>
  )
}

export default Footer