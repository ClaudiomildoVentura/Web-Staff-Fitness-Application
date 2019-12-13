import React, { Component } from 'react'
import { Alert, Button, Card, Container, OverlayTrigger, Popover } from "react-bootstrap"
import PersonalLogoutStyles from './PersonalLogoutStyles'
import Main from '../../Settings/Template/Main'
import { Link } from 'react-router-dom'

const headerProps = {
    icon: 'sign-out',
    title: 'Deslogar'
}

export default class PersonalLogoutScreen extends Component {

    signOut = () => {
        localStorage.clear()
        window.location.href = '/'
    }

    render() {
        return (
            <>
                <Main {...headerProps}>
                    <Container style={PersonalLogoutStyles.container}>
                        <Card style={PersonalLogoutStyles.card}>
                            <Alert variant={"secondary"}></Alert>
                            <Card.Header style={PersonalLogoutStyles.txtHeader}>Para deslogar da aplicação clique em 'Sim'</Card.Header>
                            <Card.Body>
                                <div style={PersonalLogoutStyles.container.btn}>
                                    <Button variant="secondary" size="sm" style={PersonalLogoutStyles.btn} onClick={this.signOut}>Sim</Button>
                                    <Link to="/dashboard">
                                        <OverlayTrigger placement="bottom" delay={{ show: 200, hide: 500 }}
                                            overlay={<Popover style={PersonalLogoutStyles.overlay}>Cancela e retorna para o 'Painel de Informações' !</Popover>}>
                                            <span className="d-inline-block">
                                                <Button variant="danger" size="sm" style={PersonalLogoutStyles.btn}>Cancelar
                                                </Button>
                                            </span>
                                        </OverlayTrigger>
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Container>
                </Main>
            </>
        )
    }
}