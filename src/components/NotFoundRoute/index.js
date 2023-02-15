import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="NotFoundContainer">
    <img
      className="NotFoundImage"
      src="https://res.cloudinary.com/dewlfbykg/image/upload/v1675838832/Layer_1_ww0srh.png"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p>
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link to="/">
      <button type="button" className="homePageButton">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
