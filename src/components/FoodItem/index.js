import {Component} from 'react'
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
    }
  }

  addit = () => {
    const {details, addItem} = this.props
    const {imgUrl, name, id, cost} = details
    const {quantity} = this.state
    const foodItem = {
      imageUrl: imgUrl,
      name,
      quantity,
      id,
      cost,
    }
    addItem(foodItem)
  }

  render() {
    const {addbutton, quantity} = this.state
    const {details} = this.props
    const {imgUrl, name} = details
    return (
      <li className="FoodItemContainer" testid="foodItem">
        <img src={imgUrl} alt={name} className="FoodItem" />
        <div className="DetailsContainer">
          <p>{name}</p>
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
