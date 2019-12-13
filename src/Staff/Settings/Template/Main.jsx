import React from 'react'
import { Col } from "react-bootstrap"
import Header from './Header'
import './Main.css'

export default props =>
    <>
        <Col sm={{ span: 9, offset: 3 }} md={{ span: 10, offset: 2 }}>
            <Header {...props} />
            <main className="content container-fluid">
                <div className="p-3 mt-3">
                    {props.children}
                </div>
            </main>
        </Col>
    </>