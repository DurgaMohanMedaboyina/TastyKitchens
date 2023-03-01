import {Link} from 'react-router-dom'
import {BiStar} from 'react-icons/bi'
import './index.css'

const HotelIcon = props => {
  const {details} = props
  const {name, imageUrl, rating, totalReviews, id} = details

  return (
    <Link to={`/restaurant/${id}`} className="link" testid="restaurant-item">
      <li className="IconContainer">
        <img src={imageUrl} alt={name} className="hotelImage" />
        <div className="detailsContainer">
          <h1 className="heading">{name}</h1>
          <p className="heading">
            <BiStar /> {rating}
          </p>
          <h1 className="heading">{totalReviews} reviews</h1>
        </div>
      </li>
    </Link>
  )
}

export default HotelIcon
