import React, { Component } from 'react'
import { Badge, Button, Card, Col, Container, Form, ListGroup, ListGroupItem, Row, OverlayTrigger, Popover } from "react-bootstrap"
import PersonalProfileStyles from './PersonalProfileStyles'
import Main from '../../Settings/Template/Main'
import { Link } from 'react-router-dom'
import api from '../../../Shared/Settings/api/api'
import { getId } from '../../../Shared/Settings/Services/Auth/auth'

const headerProps = {
    icon: 'user',
    title: 'Perfil do Usuário'
}
export default class PersonalProfileScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mensagemErro: '',
            id: '',
            perfil: ''
        }
    }

    async carregarPerfilPersonal() {
        try {
            console.log(getId())
            const response = await api.post('staff/perfil', { id: getId() }).catch(erro => console.log(erro))
            if (response.data.personal) {
                const personal = response.data.personal
                this.setState({ 'perfil': personal })
            }
            console.log(this.state.perfil)
        } catch (error) {
            this.setState({ mensagemErro: error.message })
            console.log(error)
            console.log(error.message)
        }
    }
    async componentWillMount() {
        this.carregarPerfilPersonal();
    }
    render() {
        return (
            <>
                <Main {...headerProps}>
                    <Container style={PersonalProfileStyles.containerProfileScreen}>
                        <Row className="justify-content-center">
                            <Col className="p-0" sm={4} md={3}>
                                <Card style={PersonalProfileStyles.containerPhoto}>
                                    <i class="fa fa-id-badge" style={PersonalProfileStyles.photo}></i>
                                    <Card.Body>
                                        <Card.Title style={PersonalProfileStyles.txtTitleUsername}>{this.state.perfil.username}</Card.Title>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem style={PersonalProfileStyles.ListGroupPhoto}>{this.state.perfil.datanascimento}</ListGroupItem>
                                        <ListGroupItem style={PersonalProfileStyles.ListGroupPhoto}>{this.state.perfil.cref}</ListGroupItem>
                                    </ListGroup>
                                    <Card.Body >
                                        <Link to="/perfiledicao">
                                            <OverlayTrigger placement="bottom" delay={{ show: 200, hide: 500 }}
                                                overlay={<Popover style={PersonalProfileStyles.overlay}>Edite o 'Perfil do Usuário' clicando aqui.</Popover>}>
                                                <span className="d-inline-block">
                                                    <Button variant="outline-dark" size="sm" block style={PersonalProfileStyles.btnProfileScreen}>
                                                        <i className="fa fa-pencil" style={PersonalProfileStyles.i}></i> Editar Perfil
                                                </Button>
                                                </span>
                                            </OverlayTrigger>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col sm={{ span: 7 }}>
                                <div style={PersonalProfileStyles.containerInfoProfile}>
                                    <h1 style={PersonalProfileStyles.titleInfoProfile}><Badge variant="light">Personal Trainer</Badge></h1>
                                    <Col>
                                        <div>
                                            <Form>
                                                <Form.Group controlId="nome">
                                                    <Form.Label style={PersonalProfileStyles.txtLabel}>Nome</Form.Label>
                                                    <Form.Control disabled value={this.state.perfil.nome} />
                                                </Form.Group>

                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="email">
                                                        <Form.Label style={PersonalProfileStyles.txtLabel}>Email</Form.Label>
                                                        <Form.Control disabled value={this.state.perfil.email} />
                                                    </Form.Group>

                                                    <Form.Group as={Col} controlId="datanascimento">
                                                        <Form.Label style={PersonalProfileStyles.txtLabel}>Data de Nascimento</Form.Label>
                                                        <Form.Control disabled value={this.state.perfil.datanascimento} />
                                                    </Form.Group>
                                                </Form.Row>

                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="telefone">
                                                        <Form.Label style={PersonalProfileStyles.txtLabel}>Telefone</Form.Label>
                                                        <Form.Control disabled value={this.state.perfil.telefone} />
                                                    </Form.Group>

                                                    <Form.Group as={Col} controlId="cref">
                                                        <Form.Label style={PersonalProfileStyles.txtLabel}>CREF</Form.Label>
                                                        <Form.Control disabled value={this.state.perfil.cref} />
                                                    </Form.Group>
                                                </Form.Row>
                                            </Form>
                                        </div>
                                    </Col>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Main>
            </>
        )
    }
}