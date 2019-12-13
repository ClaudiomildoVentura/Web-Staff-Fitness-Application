import React from 'react'
import { Col, Nav, Accordion, Card } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell, faTachometerAlt, faSignOutAlt, faMale, faChild, faUserPlus, faList, faAngleLeft, faWallet } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import logo from '../../../Shared/Assets/LgStaffSemFundo.png'
import './Logo.css'
import './Nav.css'

export default props =>
    <Col className="menu-area m-0 p-0 flex-column" sm={3} md={2}>
        <aside>
            <Link to="/dashboard" className="logo">
                <img src={logo} alt="logo" />
            </Link>
            <Nav className="menu flex-row flex-sm-column">
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            <Nav.Link>
                                <FontAwesomeIcon icon={faMale} /> Personal<FontAwesomeIcon aria-hidden="true" className="seta pull-right" icon={faAngleLeft} />
                            </Nav.Link>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <React.Fragment>
                                <Link to="/dashboard"><FontAwesomeIcon icon={faTachometerAlt} /> Painel</Link>
                                <Link to="/perfil"><FontAwesomeIcon icon={faUserCircle} /> Perfil</Link>
                                <Link to="/planos"><i className="fa fa-line-chart"></i> Planos</Link>
                            </React.Fragment>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            <Nav.Link><FontAwesomeIcon icon={faChild} /> Alunos<span className="seta pull-right fa fa-arrow-circle-o-left" aria-hidden="true"></span></Nav.Link>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <React.Fragment>
                                <Link to="/alunos/cadastro"><FontAwesomeIcon icon={faUserPlus} /> Pré-Cadastro </Link>
                                <Link to="/alunos/lista"><FontAwesomeIcon icon={faList} /> Lista </Link>
                                <Link to="/imc"><i className="fa fa-calculator"></i> IMC</Link>
                            </React.Fragment>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                            <Nav.Link>
                                <FontAwesomeIcon icon={faDumbbell} /> Treinos<span className="seta pull-right fa fa-arrow-circle-o-left" aria-hidden="true"></span>
                            </Nav.Link>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <>
                                <Link to="/treinos/cadastro">
                                    <i className="fa fa-hand-grab-o"></i> Cadastro
                                      </Link>
                                <Link to="/treinos/listagem">
                                    <i className="fa fa-table"></i> Listagem
                                     </Link>
                            </>
                        </Accordion.Collapse>
                    </Card>
                    <Accordion>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="3">
                                <Nav.Link>
                                    <FontAwesomeIcon icon={faDumbbell} /> Grupo de Treinos<span className="seta pull-right fa fa-arrow-circle-o-left" aria-hidden="true"></span>
                                </Nav.Link>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                                <>
                                    <Link to="/grupos/cadastro">
                                        <i className="fa fa-users"></i> Cadastro dos Grupos
                                      </Link>
                                    <Link to="/grupos/listagem">
                                        <i className="fa fa-table"></i> Listagem
                                     </Link>
                                </>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Link to="/sair"><FontAwesomeIcon icon={faSignOutAlt} /> Deslogar</Link>
                        </Card>
                    </Accordion>
                </Accordion>
            </Nav>
        </aside>
    </Col>