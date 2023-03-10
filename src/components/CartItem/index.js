import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import './index.css'

class CartItem extends Component {
  state = {quantity: '', id: ''}

  componentDidMount() {
    this.recordChange()
  }

  recordChange = () => {
    const {details} = this.props
    const {quantity, id} = details
    this.setState({quantity, id})
  }

  incrementQuantity = () => {
    this.setState(
      prevState => ({
        quantity: prevState.quantity + 1,
      }),
      this.renderincrementObject,
    )
  }

  decrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 0) {
      this.setState(
        prevState => ({
          quantity: prevState.quantity - 1,
        }),
        this.renderdecrementObject,
      )
    }
  }

  renderincrementObject = () => {
    const {increment, details} = this.props
    const {id} = details
    const {quantity} = this.state
    increment(quantity, id)
  }

  renderdecrementObject = () => {
    const {decrement, details} = this.props
    const {id} = details
    const {quantity} = this.state
    decrement(quantity, id)
  }

  render() {
    const {details} = this.props
    const {imageUrl, name, cost, quantity} = details
    return (
      <li testid="cartItem" className="OrderContainer">
        <div>
          <img src={imageUrl} alt={name} className="FoodItem" />
          <h1 className="dishname">{name}</h1>
        </div>
        <div className="DetailsContainer">
          <div className="buttonContainer">
            <button
              type="button"
              onClick={this.decrementQuantity}
              testid="decrement-quantity"
            >
              -
            </button>
            <p testid="item-quantity">{quantity}</p>
            <button
              type="button"
              onClick={this.incrementQuantity}
              testid="increment-quantity"
            >
              +
            </button>
          </div>
        </div>
        <p className="dishname">
          <BiRupee /> {cost}
        </p>
      </li>
    )
  }
}

export default CartItem
