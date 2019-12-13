import React, { Component } from 'react'
import { Card, Row, Container } from "react-bootstrap"
import PersonalDashboardStyles from './PersonalDashboardStyle'
import Main from '../../Settings/Template/Main'

const headerProps = {
    icon: 'fa fa-tachometer',
    title: 'Painel de Informações'
}

export default class PersonalDashboardScreen extends Component {
    render() {
        return (
            <>
                <Main {...headerProps}>
                    <Container style={PersonalDashboardStyles.container}>

                        <Row>
                            <Card style={PersonalDashboardStyles.cardContainer}>
                                <Card.Header style={PersonalDashboardStyles.cardHeader}><i className="fa fa-user" style={PersonalDashboardStyles.i}></i> Alunos Cadastrados</Card.Header>
                                <Card.Body style={PersonalDashboardStyles.cardBody}>
                                    <Card.Title style={PersonalDashboardStyles.cardTitle}>1</Card.Title>
                                </Card.Body>
                            </Card>

                            <Card style={PersonalDashboardStyles.cardContainer}>
                                <Card.Header style={PersonalDashboardStyles.cardHeader}> <i className="fa fa-users" style={PersonalDashboardStyles.i}></i> Grupos de Treinamento</Card.Header>
                                <Card.Body style={PersonalDashboardStyles.cardBody}>
                                    <Card.Title style={PersonalDashboardStyles.cardTitle}>4</Card.Title>
                                </Card.Body>
                            </Card>

                            <Card style={PersonalDashboardStyles.cardContainer}>
                                <Card.Header style={PersonalDashboardStyles.cardHeader}><i className="fa fa-line-chart" style={PersonalDashboardStyles.i}></i> Plano Cadastrado</Card.Header>
                                <Card.Body style={PersonalDashboardStyles.cardBody}>
                                    <Card.Title style={PersonalDashboardStyles.cardTitle}>Gratuito</Card.Title>
                                </Card.Body>
                            </Card>
                        </Row>

                    </Container>
                </Main>
            </>
        )
    }
}