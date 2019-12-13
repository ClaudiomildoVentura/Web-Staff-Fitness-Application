import React from 'react'
import { Col } from 'react-bootstrap'
import './Header.css'

export default props =>
    <header>
        <Col className="header d-none d-sm-flex flex-column">
            <h1 className="mt-1">
                <i className={`fa fa-${props.icon}`}></i> {props.title}
            </h1>
        </Col>
    </header>