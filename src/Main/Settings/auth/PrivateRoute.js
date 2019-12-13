import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import FakeAuth from "./FakeAuth"

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        FakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  )
}
export default PrivateRoute