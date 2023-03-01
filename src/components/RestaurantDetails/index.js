import {Component} from 'react'
import {BiRupee, BiStar} from 'react-icons/bi'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'
import './index.css'

class RestaurantDetails extends Component {
  state = {foodItems: [], orderData: [], restaurantData: []}

  componentDidMount() {
    this.renderRestaurantFoodItems()
  }

  addItem = object => {
    const {orderData} = this.state
    const filter = orderData.filter(each => each.id !== object.id)
    this.setState({orderData: [...filter, object]}, this.renderLocalStorage)
  }

  removeItem = object => {
    const {orderData} = this.state
    const filter = orderData.filter(each => each.id !== object.id)
    this.setState({orderData: [...filter]}, this.renderLocalStorage)
  }

  renderLocalStorage = () => {
    const {orderData} = this.state
    localStorage.setItem('cartData', JSON.stringify(orderData))
  }

  renderRestaurantFoodItems = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const foodItems = data.food_items
    const restaurantData = {
      imageUrl: data.image_url,
      costForTwo: data.cost_for_two,
      location: data.location,
      name: data.name,
      rating: data.rating,
      reviewsCount: data.reviews_count,
      cuisine: data.cuisine,
    }
    const modifiedFoodItems = foodItems.map(each => ({
      id: each.id,
      name: each.name,
      imgUrl: each.image_url,
      cost: each.cost,
      rating: each.rating,
    }))
    this.setState({foodItems: modifiedFoodItems, restaurantData})
  }

  render() {
    const {foodItems, restaurantData} = this.state
    const {
      imageUrl,
      costForTwo,
      location,
      name,
      rating,
      reviewsCount,
      cuisine,
    } = restaurantData
    return (
      <div testid="restaurant-details-loader">
        <Header />
        <div className="restaurant">
          <img src={imageUrl} alt="restaurant" className="restaurantImage" />
          <div className="displaydetails">
            <h1>{name}</h1>
            <p>{cuisine}</p>
            <p>{location}</p>
            <p>
              <BiStar /> {rating}
            </p>
            <p>Reviews: {reviewsCount}</p>
            <p>
              Cost For Two: <BiRupee /> {costForTwo}
            </p>
          </div>
        </div>
        <ul className="FoodItemDetails">
          {foodItems.map(each => (
            <FoodItem
              details={each}
              addItem={this.addItem}
              removeItem={this.removeItem}
              key={each.id}
            />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }
}

export default RestaurantDetails
