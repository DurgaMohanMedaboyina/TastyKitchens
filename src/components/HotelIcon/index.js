import {Link} from 'react-router-dom'
import './index.css'

const HotelIcon = props => {
  const {details} = props
  const {name, imageUrl, rating, totalReviews, id} = details

  return (
    <Link to={`/restaurants/${id}`} className="link">
      <div className="IconContainer" testid="restaurant-item">
        <img src={imageUrl} alt={name} className="hotelImage" />
        <div className="detailsContainer">
          <h1 className="heading">{name}</h1>
          <p className="heading">{rating}</p>
          <h1 className="heading">{totalReviews}</h1>
        </div>
      </div>
    </Link>
  )
}

export default HotelIcon
