import {Component} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {display: false}

  removeLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  showMenu = () => {
    this.setState({display: true})
  }

  closeMenu = () => {
    this.setState({display: false})
  }

  render() {
    const {display} = this.state
    return (
      <nav className="titleContainer">
        <ul className="tastyKitchensTitle">
          <Link to="/" className="Link">
            <img
              src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg"
              alt="website logo"
              className="chefhat"
            />
          </Link>
          <h1 className="tastyKitchen">Tasty Kitchens</h1>
          <GiHamburgerMenu onClick={this.showMenu} className="menuIcon" />
        </ul>
        {display && (
          <ul className="smallContainer">
            <Link to="/" className="Link">
              <h1 className="HomeTitle">Home</h1>
            </Link>
            <Link to="/cart" className="Link">
              <h1 className="HomeTitle">Cart</h1>
            </Link>
            <button
              onClick={this.removeLogout}
              type="button"
              className="Button Link"
            >
              Logout
            </button>
            <AiFillCloseCircle onClick={this.closeMenu} />
          </ul>
        )}
        <ul className="logOutButtonContainer">
          <Link to="/" className="Link">
            <h1 className="HomeTitle">Home</h1>
          </Link>
          <Link to="/cart" className="Link">
            <h1>Cart</h1>
          </Link>
          <button onClick={this.removeLogout} type="button" className="Button">
            Logout
          </button>
        </ul>
      </nav>
    )
  }
}

export default withRouter(Header)
