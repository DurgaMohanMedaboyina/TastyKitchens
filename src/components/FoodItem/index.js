import {Component} from 'react'
import {BiRupee, BiStar} from 'react-icons/bi'
import './index.css'

class FoodItem extends Component {
  state = {addbutton: false, quantity: 1}

  display = () => {
    this.setState({addbutton: true}, this.addit)
  }

  incrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}), this.addit)
  }

  decrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(
        prevState => ({quantity: prevState.quantity - 1}),
        this.addit,
      )
    } else {
      this.setState({addbutton: false}, this.removeIt)
    }
  }

  removeIt = () => {
    const {details, removeItem} = this.props
    const {imgUrl, name, id, cost, rating} = details
    const {quantity} = this.state
    const foodItem = {
      imageUrl: imgUrl,
      name,
      quantity,
      id,
      cost,
      rating,
    }
    removeItem(foodItem)
  }

  addit = () => {
    const {details, addItem} = this.props
    const {imgUrl, name, id, cost, rating} = details
    const {quantity} = this.state
    const foodItem = {
      imageUrl: imgUrl,
      name,
      quantity,
      id,
      cost,
      rating,
    }
    addItem(foodItem)
  }

  render() {
    const {addbutton, quantity} = this.state
    const {details} = this.props
    const {imgUrl, name, cost, rating} = details
    return (
      <li className="FoodItemContainer" testid="foodItem">
        <img src={imgUrl} alt={name} className="FoodItem" />
        <div className="DetailsContainer">
          <h1 className="ItemName">{name}</h1>
          <p>
            <BiRupee /> {cost}
          </p>
          <p>
            <BiStar />
            {rating}
          </p>
          {addbutton ? (
            <div className="buttonContainer">
              <button
                type="button"
                onClick={this.decrementQuantity}
                testid="decrement-count"
              >
                -
              </button>
              <p testid="active-count">{quantity}</p>
              <button
                type="button"
                onClick={this.incrementQuantity}
                testid="increment-count"
              >
                +
              </button>
            </div>
          ) : (
            <button onClick={this.display} type="button">
              Add
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
