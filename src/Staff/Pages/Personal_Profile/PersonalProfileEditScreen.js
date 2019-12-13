import React, { Component } from 'react'
import { Button, Col, Container, Form, OverlayTrigger, Popover, Row } from "react-bootstrap"
import PersonalProfileStyles from './PersonalProfileStyles'
import Main from '../../Settings/Template/Main'
import { Link } from 'react-router-dom'
import PersonalProfileLoad, {profileEdit} from './PersonalProfileLoad'

const headerProps = {
    icon: 'pencil',
    title: 'Edite as Informações do seu Perfil'
}

export default class PersonalProfileEditScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            perfil: '',
            message: ''
        }
        this.changeValue = this.changeValue.bind(this)
    }

    async componentWillMount() {
        const perfil = PersonalProfileLoad().then(
            data => this.setState({ perfil: data })            
        )
    }

    changeValue = async e => {
        e.preventDefault();
        const {id, value} = e.target
		this.setState({ perfil: { ...this.state.perfil, [id]: value } })
    }
    
    editProfile = async e => {
        e.preventDefault()
        profileEdit(this.state.perfil)
    }

    render() {
        return (
            <>
                <Main {...headerProps}>
                    <Container style={PersonalProfileStyles.containerEditGeneral}>
                        <Col sm={{ span: 7 }}>
                            <Col style={PersonalProfileStyles.containerInfoProfile}>
                                {this.state.message && <p>{this.state.message}</p>}
                                    <Form.Group controlId="nome">
                                        <Form.Label style={PersonalProfileStyles.txtLabel}>Nome</Form.Label>
                                        <Form.Control type="text" defaultValue={this.state.perfil.nome} onChange={e => this.changeValue(e)}/>
                                    </Form.Group>

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="email">
                                            <Form.Label style={PersonalProfileStyles.txtLabel}>Email</Form.Label>
                                            <Form.Control type="email" defaultValue={this.state.perfil.email} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="datanascimento">
                                            <Form.Label style={PersonalProfileStyles.txtLabel}>Data de Nascimento</Form.Label>
                                            <Form.Control type="text" defaultValue={this.state.perfil.datanascimento} />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="Telefone">
                                            <Form.Label style={PersonalProfileStyles.txtLabel}>Telefone</Form.Label>
                                            <Form.Control type="text" defaultValue={this.state.perfil.telefone} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="cref">
                                            <Form.Label style={PersonalProfileStyles.txtLabel}>CREF</Form.Label>
                                            <Form.Control type="text" value={this.state.perfil.cref} />
                                        </Form.Group>
                                    </Form.Row>

                                    <Row style={PersonalProfileStyles.viewBtn}>
                                        <Link to="/perfil">
                                            <OverlayTrigger placement="bottom" delay={{ show: 100, hide: 500 }}
                                                overlay={<Popover style={PersonalProfileStyles.overlay}>Retorne para a página principal do 'Perfil do Usuário'.</Popover>}>
                                                <span className="d-inline-block">
                                                    <Button variant="secondary" size="sm" style={PersonalProfileStyles.btn}>
                                                        <i className="fa fa-reply-all" style={PersonalProfileStyles.i}></i> Voltar
                                                </Button>
                                                </span>
                                            </OverlayTrigger>
                                        </Link>

                                        <OverlayTrigger placement="bottom" delay={{ show: 100, hide: 2500 }}
                                            overlay={<Popover style={PersonalProfileStyles.overlay}>Tem certeza que deseja editar seus dados?
                                                     <Button onClick={e => this.editProfile(e)} variant="success" size="sm" style={PersonalProfileStyles.btn}>
                                            <i className="fa fa-check" style={PersonalProfileStyles.i}></i> Sim, altere.
                                           </Button>
                                            </Popover>}>
                                            <span className="d-inline-block">
                                        <Button variant="success" size="sm" style={PersonalProfileStyles.btn}>
                                            <i className="fa fa-check" style={PersonalProfileStyles.i}></i> Confirmar
                                           </Button>
                                           </span>
                                        </OverlayTrigger>

                                        <OverlayTrigger placement="bottom" delay={{ show: 100, hide: 500 }}
                                            overlay={<Popover style={PersonalProfileStyles.overlay}>Clique aqui e receba um e-mail com as devidas orientações.</Popover>}>
                                            <span className="d-inline-block">
                                                <Button variant="info" size="sm" style={PersonalProfileStyles.btn}>
                                                    <i className="fa fa-envelope-o" style={PersonalProfileStyles.i}></i> Alterar Senha
                                                </Button>
                                            </span>
                                        </OverlayTrigger>
                                    </Row>
                            </Col>
                        </Col>
                    </Container>
                </Main>
            </>
        )
    }
}