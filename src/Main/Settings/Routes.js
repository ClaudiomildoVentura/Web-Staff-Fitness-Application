import React from "react"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import MainHome from "../Pages/Home/MainHomeScreen"
import MainRegistration from "../Pages/Registration/MainRegistrationScreen"
import PersonalErro from '../../Staff/Pages/Personal_Erro/PersonalErroScreen'
import Template from '../../Staff/Settings/Template/Template'
import fundoLogin from '../../Shared/Assets/fundoLogin.jpg'
import { isAuthenticated } from "../../Shared/Settings/Services/Auth/auth"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
    }
  />
)

const Routes = () => {
  return (
    <div className="py-sm-5 vh-100" style={{ backgroundImage: 'url(' + fundoLogin + ')', backgroundRepeat: 'repeat-x', backgroundSize: 'cover' }}>
      <Router basename="/">
        <Switch>
          <Route path="/" exact component={MainHome} />
          <Route path="/cadastro" component={MainRegistration} />
          <Route path="/staff/" component={Template} />
          <Route path="*" component={PersonalErro} />
        </Switch>
      </Router>
    </div>
  )
}
export default Routes