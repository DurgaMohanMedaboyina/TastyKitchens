import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'
import './index.css'

class RestaurantDetails extends Component {
  state = {foodItems: [], orderData: []}

  componentDidMount() {
    this.renderRestaurantFoodItems()
    this.renderLocalStorage()
  }

  addItem = object => {
    const {orderData} = this.state
    const filter = orderData.filter(each => each.id !== object.id)
    console.log(filter)
    this.setState({orderData: [...filter, object]}, this.renderLocalStorage)
  }

  renderLocalStorage = () => {
    const {orderData} = this.state
    localStorage.setItem('data', JSON.stringify(orderData))
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
    console.log(data)
    const modifiedFoodItems = foodItems.map(each => ({
      id: each.id,
      name: each.name,
      imgUrl: each.image_url,
      cost: each.cost,
    }))
    this.setState({foodItems: modifiedFoodItems})
  }

  render() {
    const {foodItems} = this.state
    return (
      <div testid="restaurant-details-loader">
        <Header />
        <ul className="FoodItemDetails">
          {foodItems.map(each => (
            <FoodItem details={each} addItem={this.addItem} key={each.id} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }
}

export default RestaurantDetails
