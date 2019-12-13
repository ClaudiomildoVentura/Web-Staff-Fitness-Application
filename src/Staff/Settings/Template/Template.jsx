import React from 'react'
import ReactDOM from "react-dom"
import "bootstrap/dist/css/bootstrap.css"
import 'font-awesome/css/font-awesome.min.css'
import './Template.css'
import StaffRoutes from '../../../Staff/Settings/Routes/StaffRoutes'

export default props => ReactDOM.render(<StaffRoutes />, document.getElementById("root"))