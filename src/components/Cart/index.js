import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'

import './index.css'

class Cart extends Component {
  state = {placedOrder: false, ItemsList: [], totalPrice: ''}

  componentDidMount() {
    this.renderCartDetails()
    this.renderLocalStorage()
  }

  renderCartDetails = () => {
    const CartDetails = localStorage.getItem('data')
    const ItemsList = JSON.parse(CartDetails)
    this.setState({ItemsList}, this.renderLocalStorage)
  }

  increment = (quantity, id) => {
    const {ItemsList} = this.state
    const filter = ItemsList.filter(each => each.id !== id)
    const filtered = ItemsList.filter(each => each.id === id)
    filtered[0].quantity = quantity
    this.setState(
      {ItemsList: [...filter, filtered[0]]},
      this.renderLocalStorage,
    )
  }

  decrement = (quantity, id) => {
    const {ItemsList} = this.state
    const filter = ItemsList.filter(each => each.id !== id)
    const filtered = ItemsList.filter(each => each.id === id)
    filtered[0].quantity = quantity
    this.setState(
      {ItemsList: [...filter, filtered[0]]},
      this.renderLocalStorage,
    )
  }

  renderLocalStorage = () => {
    const {ItemsList} = this.state
    const priceDetails = ItemsList.map(each => each.quantity * each.cost)
    function reducer(acc, val) {
      return acc + val
    }
    if (ItemsList.length !== 0) {
      const totalPrice = priceDetails.reduce(reducer)
      this.setState({totalPrice})
    }

    localStorage.setItem('data', JSON.stringify(ItemsList))
  }

  changePlacedOrder = () => {
    this.setState({placedOrder: true})
    localStorage.removeItem('data')
  }

  renderOrderedItemDetails = () => {
    const {ItemsList, totalPrice} = this.state
    return (
      <div className="TotalCart">
        <Header />
        <div className="CartContainer">
          <div className="titleHeadersContainer">
            <h1 className="header">Item</h1>
            <h1 className="header">Quantity</h1>
            <h1 className="header">Price</h1>
          </div>
          {ItemsList.map(each => (
            <div key={each.id} className="OrderContainer">
              <CartItem
                details={each}
                increment={this.increment}
                decrement={this.decrement}
              />
            </div>
          ))}
          <div className="TotalOrder">
            <h1>Order Total</h1>
            <p>{totalPrice}</p>
          </div>
          <button
            type="button"
            onClick={this.changePlacedOrder}
            className="button"
          >
            Place Order
          </button>
          <Footer />
        </div>
      </div>
    )
  }

  renderNoOrdersView = () => (
    <div className="ViewContainer">
      <img
        src="https://res.cloudinary.com/dewlfbykg/image/upload/v1676458708/OBJECTS_ymjkoi.png"
        className="OrderedFoodItem"
      />
      <h1>NO ORDERS YET!</h1>
      <p>Your cart is empty. Add something from the menu.</p>
      <Link to="/">
        <button type="button" className="button">
          Order Now
        </button>
      </Link>
    </div>
  )

  renderPaymentSuccessview = () => (
    <div className="ViewContainer">
      <img
        src="https://res.cloudinary.com/dewlfbykg/image/upload/v1676458942/check-circle.1_1_swoier.png"
        alt="empty cart"
      />
      <h1>Payment Successful</h1>
      <p>Thank you for ordering Your payment is successfully completed.</p>
      <Link to="/">
        <button className="button">Go To Home Page</button>
      </Link>
    </div>
  )

  render() {
    const {ItemsList, placedOrder} = this.state
    console.log(ItemsList[0])
    switch (true) {
      case ItemsList[0] === undefined:
        return this.renderNoOrdersView()
      case placedOrder === false:
        return this.renderOrderedItemDetails()
      case placedOrder === true:
        return this.renderPaymentSuccessview()
      default:
        return null
    }
  }
}

export default Cart
