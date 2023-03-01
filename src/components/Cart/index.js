import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'
import './index.css'

class Cart extends Component {
  state = {placedOrder: false, ItemsList: [], totalPrice: ''}

  componentDidMount() {
    this.renderLocalStorage()
  }

  increment = (quantity, id) => {
    const {ItemsList} = this.state
    const filter = ItemsList.filter(each => each.id !== id)
    const filtered = ItemsList.filter(each => each.id === id)
    filtered[0].quantity = quantity
    this.setState({ItemsList: [...filter, filtered[0]]}, this.pushLocalStorage)
  }

  decrement = (quantity, id) => {
    const {ItemsList} = this.state

    if (quantity < 1) {
      const filter = ItemsList.filter(each => each.id !== id)
      this.setState({ItemsList: [...filter]}, this.pushLocalStorage)
    } else {
      const filter = ItemsList.filter(each => each.id !== id)
      const filtered = ItemsList.filter(each => each.id === id)
      filtered[0].quantity = quantity
      this.setState(
        {ItemsList: [...filter, filtered[0]]},
        this.pushLocalStorage,
      )
    }
  }

  renderLocalStorage = () => {
    const CartDetails = localStorage.getItem('cartData')
    const list = JSON.parse(CartDetails)
    function reducer(acc, val) {
      return acc + val
    }
    if (list[0] !== undefined) {
      const priceDetails = list.map(each => each.quantity * each.cost)
      const totalPrice = priceDetails.reduce(reducer)
      this.setState({totalPrice, placedOrder: true, ItemsList: list})
      localStorage.setItem('cartData', JSON.stringify(list))
    } else {
      this.setState({ItemsList: []})
    }
  }

  pushLocalStorage = () => {
    const {ItemsList} = this.state
    localStorage.setItem('cartData', JSON.stringify(ItemsList))
    function reducer(acc, val) {
      return acc + val
    }
    if (ItemsList.length !== 0) {
      const priceDetails = ItemsList.map(each => each.quantity * each.cost)
      const totalPrice = priceDetails.reduce(reducer)
      this.setState({totalPrice})
      localStorage.setItem('cartData', JSON.stringify(ItemsList))
    }
  }

  changePlacedOrder = () => {
    this.setState({placedOrder: false, ItemsList: []})
  }

  successPlacedOrder = () => {
    const EmptyList = []
    this.setState({placedOrder: 'success'})
    localStorage.setItem('cartData', JSON.stringify(EmptyList))
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
          <ul className="cartContainer">
            {ItemsList.map(each => (
              <CartItem
                key={each.id}
                details={each}
                increment={this.increment}
                decrement={this.decrement}
              />
            ))}
          </ul>
          <div className="TotalOrder">
            <h1>Order Total:</h1>
            <p testid="total-price" className="totalPrice">
              <BiRupee /> {totalPrice}
            </p>
          </div>
          <button
            type="button"
            onClick={this.successPlacedOrder}
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
        alt="empty cart"
        className="OrderedFoodItem"
      />
      <h1>No Order Yet!</h1>
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
        alt="success"
      />
      <h1>Payment Successful</h1>
      <p>Thank you for ordering Your payment is successfully completed.</p>
      <Link to="/">
        <button
          className="button"
          type="button"
          onClick={this.changePlacedOrder}
        >
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  render() {
    const {placedOrder, ItemsList} = this.state

    switch (true) {
      case ItemsList.length === 0:
        return this.renderNoOrdersView()
      case placedOrder === true:
        return this.renderOrderedItemDetails()
      case placedOrder === 'success':
        return this.renderPaymentSuccessview()
      default:
        return null
    }
  }
}

export default Cart
