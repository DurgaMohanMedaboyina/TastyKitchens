import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFilterLeft} from 'react-icons/bs'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import Footer from '../Footer'
import HotelIcon from '../HotelIcon'
import './index.css'

const LIMIT = 9

const LoadingConstants = {
  in: 'initial',
  lo: 'loading',
  su: 'success',
  fa: 'failure',
}

const Filters = ['Lowest', 'Highest']

class HomeRoute extends Component {
  state = {
    search: '',
    pgNumber: 1,
    total: 0,
    order: Filters[1],
    slider: LoadingConstants.ip,
    details: LoadingConstants.in,
    restaurantsData: [],
    carouselData: [],
  }

  componentDidMount() {
    this.renderOfferDetails()
    this.renderRestaurantDetails()
  }

  renderOfferDetails = async () => {
    this.setState({slider: LoadingConstants.lo})
    const offersUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(offersUrl, options)
    if (response.ok) {
      this.setState({slider: LoadingConstants.su})
      const data = await response.json()
      const offersData = data.offers.map(each => ({imageUrl: each.image_url}))
      this.setState({carouselData: offersData})
    }
  }

  renderRestaurantDetails = async () => {
    this.setState({details: LoadingConstants.lo})
    const {pgNumber, search, order} = this.state
    const offset = (pgNumber - 1) * LIMIT
    const restaurantsUrl = `https://apis.ccbp.in/restaurants-list?search=${search}&offset=${offset}&limit=${LIMIT}&sort_by_rating=${order}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantsUrl, options)
    if (response.ok) {
      this.setState({details: LoadingConstants.su})
      const data = await response.json()
      const restaurantsData = data.restaurants.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        rating: each.user_rating.rating,
        totalReviews: each.user_rating.total_reviews,
      }))
      const pages = data.total % 9
      const remaining = data.total - pages * 9
      if (remaining > 0) {
        this.setState({total: pages + 1})
      } else {
        this.setState({total: pages})
      }
      this.setState({restaurantsData})
    }
  }

  /*
  testid="restaurants-offers-loader"
  */

  OffersLoading = () => (
    <div>
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  /*
  testid="restaurants-details-loader"
  */

  RestaurantsLoading = () => (
    <div testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  recordInput = event => {
    this.setState({search: event.target.value})
  }

  renderFilter = event => {
    console.log(event.target.value)
    this.setState({order: event.target.value}, this.renderRestaurantDetails)
  }

  displayRestaurants = () => {
    const {restaurantsData, search, order} = this.state
    return (
      <div className="restaurants">
        <div className="searchContainer">
          <div>
            <input
              type="search"
              onChange={this.recordInput}
              placeholder="Search"
              value={search}
            />
            <button onClick={this.renderRestaurantDetails} type="button">
              <AiOutlineSearch />
            </button>
          </div>
          <div>
            <h1>Popular Restaurants</h1>
            <p>
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <BsFilterLeft className="FilterIcon" />
            <select onChange={this.renderFilter} value={order}>
              {Filters.map(each => (
                <option value={each}>{each}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="restaurantDetails" testid="restaurants-list-loader">
          {restaurantsData.map(each => (
            <HotelIcon details={each} key={each.id} />
          ))}
        </div>
        {this.renderPageDetails()}
      </div>
    )
  }

  displayOffers = () => {
    const {carouselData} = this.state
    console.log(carouselData)
    return (
      <div>
        <Slider dots>
          {carouselData.map(each => (
            <img src={each.imageUrl} key={each.id} alt="offer" />
          ))}
        </Slider>
      </div>
    )
  }

  renderOffers = () => {
    const {slider} = this.state

    switch (slider) {
      case LoadingConstants.lo:
        return this.OffersLoading()
      case LoadingConstants.su:
        return this.displayOffers()
      default:
        return null
    }
  }

  increasePageDetails = () => {
    const {pgNumber, total} = this.state
    if (pgNumber < total) {
      this.setState(
        prevState => ({
          pgNumber: prevState.pgNumber + 1,
        }),
        this.renderRestaurantDetails,
      )
    }
  }

  decreasePageDetails = () => {
    const {pgNumber} = this.state
    if (pgNumber > 1) {
      this.setState(
        prevState => ({
          pgNumber: prevState.pgNumber - 1,
        }),
        this.renderRestaurantDetails,
      )
    }
  }

  renderPageDetails = () => {
    const {pgNumber} = this.state
    return (
      <div className="incdecContainer">
        <button
          onClick={this.decreasePageDetails}
          type="button"
          testid="pagination-left-button"
        >
          PREV
        </button>
        <p className="pageNumber" testid="active-page-number">
          {pgNumber}
        </p>
        <button
          onClick={this.increasePageDetails}
          type="button"
          testid="pagination-right-button"
        >
          NEXT
        </button>
      </div>
    )
  }

  renderRestaurants = () => {
    const {details} = this.state
    switch (details) {
      case LoadingConstants.lo:
        return this.RestaurantsLoading()
      case LoadingConstants.su:
        return this.displayRestaurants()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="Container">
        <Header />
        {this.renderOffers()}
        {this.renderRestaurants()}
        <Footer />
      </div>
    )
  }
}

export default HomeRoute
