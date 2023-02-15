import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

/*
const smallImageUrl =
  'https://res.cloudinary.com/ddgvegjgk/image/upload/v1635311318/tastykitchens/Rectangle_1457_ri10vf.png'
const largeImageURl =
  'https://res.cloudinary.com/ddgvegjgk/image/upload/v1635315803/tastykitchens/Rectangle_1457_noyo6j.png'
  */

const logoUrl =
  'https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  successLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failedLogin = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const apiLoginUrl = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiLoginUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.successLogin(data.jwt_token)
    } else {
      this.failedLogin(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showErrorMsg, errorMsg} = this.state

    return (
      <div className="wrapUpContainer">
        <div className="loginBackgroundContainer">
          <div className="loginFormContainer">
            <img src={logoUrl} alt="website logo" className="chefhatImage" />
            <h1 className="tastyKitchenHeading">Tasty Kitchens</h1>
            <img
              className="smallImage"
              src="https://res.cloudinary.com/ddgvegjgk/image/upload/v1635311318/tastykitchens/Rectangle_1457_ri10vf.png"
              alt="website login"
            />
            <h1>Login</h1>
            <form className="formContainer" onSubmit={this.onSubmitForm}>
              <label className="label" htmlFor="userName">
                USERNAME
              </label>
              <input
                className="inputElement"
                type="text"
                id="userName"
                onChange={this.onChangeUsername}
                value={username}
                placeholder="Username"
              />
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="inputElement"
                type="password"
                id="password"
                onChange={this.onChangePassword}
                value={password}
                placeholder="Password"
              />

              {showErrorMsg ? <p>*{errorMsg}</p> : null}
              <button className="loginButton" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
        <img
          className="displayImage"
          src="https://res.cloudinary.com/ddgvegjgk/image/upload/v1635311318/tastykitchens/Rectangle_1457_noyo6j.png"
          alt="website login"
        />
      </div>
    )
  }
}

export default LoginRoute
