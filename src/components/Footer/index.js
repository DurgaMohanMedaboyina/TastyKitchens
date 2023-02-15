import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="Footer">
    <img
      src="https://res.cloudinary.com/dewlfbykg/image/upload/v1675843157/Vector_vg2blg.png"
      alt="website-footer-logo"
      className="Icon"
    />
    <h1>Tasty Kitchens</h1>
    <p>The only thing we are serious about is food. Contact us on</p>
    <div className="IconsContainer">
      <FaPinterestSquare className="Icon" testid="pintrest-social-icon" />
      <FaInstagram className="Icon" testid="instagram-social-icon" />
      <FaTwitter className="Icon" testid="twitter-social-icon" />
      <FaFacebookSquare className="Icon" testid="facebook-social-icon" />
    </div>
  </div>
)

export default Footer
