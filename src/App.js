import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginRoute from './components/LoginRoute'
import NotFound from './components/NotFoundRoute'
import HomeRoute from './components/HomeRoute'
import Cart from './components/Cart'
import RestaurantDetails from './components/RestaurantDetails'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute
      exact
      path="/restaurant/:id"
      component={RestaurantDetails}
    />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <Route component={NotFound} />
  </Switch>
)

export default App
