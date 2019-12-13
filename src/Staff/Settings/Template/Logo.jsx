import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Logo.css'
import logo from '../../../Shared/Assets/LgStaffSemFundo.png'

export default props =>
    <aside>
        <Col className="logo" sm={3}>
            <Link to="/">
                <img src={logo} alt="logo" />
            </Link>
        </Col>
    </aside>