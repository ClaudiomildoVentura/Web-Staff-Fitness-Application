import React, { Component } from 'react'
import { Container, Col, Row, Button } from "react-bootstrap"
import PersonalErroStyles from './PersonalErroStyles'
import Main from '../../Settings/Template/Main'
import { Link } from 'react-router-dom'

export default class PersonalErroScreen extends Component {
    render() {
        return (
            <>
                <Main >
                    <Container className="justify-content-md-center" style={PersonalErroStyles.container}>
                        <Row >
                            <Col sm={3}>
                                <h5 style={PersonalErroStyles.txtTitulo}>404 Erro Page</h5>
                            </Col>

                            <Col sm={2}>
                                <div style={PersonalErroStyles.txtNumber}>404</div>
                            </Col>
                            <Col style={PersonalErroStyles.body}>
                                <Row>
                                    <i className="fa fa-exclamation-triangle" style={PersonalErroStyles.icon}></i>
                                    <h5 style={PersonalErroStyles.textBody}>
                                        Oops! Página não encontrada.
                                    <br />
                                    </h5>
                                </Row>
                                <div style={PersonalErroStyles.textBody}>
                                    Não foi possível encontrar a página que você estava procurando.<br />
                                    Enquanto isso, você pode retornar ao dashboard. Clique no botão voltar.
                                            <div style={PersonalErroStyles.btn}>
                                        <Link to="/dashboard">
                                            <Button variant="warning" size="sm"
                                                style={PersonalErroStyles.btn}>
                                                <i className="fa fa-reply-all"></i>Voltar
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Main>
            </>
        )
    }
}