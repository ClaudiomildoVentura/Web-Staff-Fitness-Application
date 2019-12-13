import React, { Component } from 'react'
import Main from '../../Settings/Template/Main'
import { Col, Container, Button, Table,  OverlayTrigger, Popover  } from "react-bootstrap"
import PersonalExerciseGroupStyles from './PersonalExerciseGroupStyles'

const headerProps = {
    icon: 'table',
    title: 'Listagem dos Grupos de Treinamento'
}

export default class PersonalExerciseGroupList extends Component {

    render() {
        return (
            <Main {...headerProps}>
                <Container style={PersonalExerciseGroupStyles.containerTbl}>
                    <Table responsive size="sm"  striped bordered hover style={PersonalExerciseGroupStyles.tbl}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome do grupo</th>
                                <th>Alunos</th>
                                <th>Tipo do Treino</th>
                                <th>Horário</th>
                                <th>Data</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>1.</td>
                                <td>Alunos Dona lindu</td>
                                <td>1</td>
                                <td>Funcional</td>
                                <td>06:00</td>
                                <td>05/01/2020</td>
                                <Col style={PersonalExerciseGroupStyles.viewBtn}>
                                <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                                            overlay={<Popover style={PersonalExerciseGroupStyles.overlay}>Editar</Popover>}>
                                            <span className="d-inline-block">
                                                <Button variant="outline-warning" size="sm" style={PersonalExerciseGroupStyles.btn}>
                                                    <i className="fa fa-pencil" style={PersonalExerciseGroupStyles.i}></i>
                                                </Button>
                                            </span>
                                        </OverlayTrigger>

                                        <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                                            overlay={<Popover style={PersonalExerciseGroupStyles.overlay}>Excluir</Popover>}>
                                            <span className="d-inline-block">
                                                <Button variant="outline-danger" size="sm" style={PersonalExerciseGroupStyles.btn}>
                                                    <i className="fa fa-trash" style={PersonalExerciseGroupStyles.i}></i>
                                                </Button>
                                            </span>
                                        </OverlayTrigger>
                                </Col>
                            </tr>

                            <tr>
                                <td>2.</td>
                                <td>Alunos Jaqueira</td>
                                <td>1</td>
                                <td>Funcional</td>
                                <td>06:00</td>
                                <td>05/01/2020</td>
                                <Col style={PersonalExerciseGroupStyles.viewBtn}>
                                <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                                            overlay={<Popover style={PersonalExerciseGroupStyles.overlay}>Editar</Popover>}>
                                            <span className="d-inline-block">
                                                <Button variant="outline-warning" size="sm" style={PersonalExerciseGroupStyles.btn}>
                                                    <i className="fa fa-pencil" style={PersonalExerciseGroupStyles.i}></i>
                                                </Button>
                                            </span>
                                        </OverlayTrigger>

                                        <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                                            overlay={<Popover style={PersonalExerciseGroupStyles.overlay}>Excluir</Popover>}>
                                            <span className="d-inline-block">
                                                <Button variant="outline-danger" size="sm" style={PersonalExerciseGroupStyles.btn}>
                                                    <i className="fa fa-trash" style={PersonalExerciseGroupStyles.i}></i>
                                                </Button>
                                            </span>
                                        </OverlayTrigger>
                                </Col>
                            </tr>

                            <tr>
                                <td>3.</td>
                                <td>Alunos Recife antigo</td>
                                <td>1</td>
                                <td>Funcional</td>
                                <td>18:30</td>
                                <td>17/09/2019</td>
                                <Col style={PersonalExerciseGroupStyles.viewBtn}>
                                <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                                            overlay={<Popover style={PersonalExerciseGroupStyles.overlay}>Editar</Popover>}>
                                            <span className="d-inline-block">
                                                <Button variant="outline-warning" size="sm" style={PersonalExerciseGroupStyles.btn}>
                                                    <i className="fa fa-pencil" style={PersonalExerciseGroupStyles.i}></i>
                                                </Button>
                                            </span>
                                        </OverlayTrigger>

                                        <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                                            overlay={<Popover style={PersonalExerciseGroupStyles.overlay}>Excluir</Popover>}>
                                            <span className="d-inline-block">
                                                <Button variant="outline-danger" size="sm" style={PersonalExerciseGroupStyles.btn}>
                                                    <i className="fa fa-trash" style={PersonalExerciseGroupStyles.i}></i>
                                                </Button>
                                            </span>
                                        </OverlayTrigger>
                                </Col>
                            </tr>

                            <tr>
                                <td>4.</td>
                                <td>Alunos Camaragibe</td>
                                <td>1</td>
                                <td>Funcional</td>
                                <td>18:30</td>
                                <td>16/09/2019</td>
                                <Col style={PersonalExerciseGroupStyles.viewBtn}>
                                <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                                            overlay={<Popover style={PersonalExerciseGroupStyles.overlay}>Editar</Popover>}>
                                            <span className="d-inline-block">
                                                <Button variant="outline-warning" size="sm" style={PersonalExerciseGroupStyles.btn}>
                                                    <i className="fa fa-pencil" style={PersonalExerciseGroupStyles.i}></i>
                                                </Button>
                                            </span>
                                        </OverlayTrigger>

                                        <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                                            overlay={<Popover style={PersonalExerciseGroupStyles.overlay}>Excluir</Popover>}>
                                            <span className="d-inline-block">
                                                <Button variant="outline-danger" size="sm" style={PersonalExerciseGroupStyles.btn}>
                                                    <i className="fa fa-trash" style={PersonalExerciseGroupStyles.i}></i>
                                                </Button>
                                            </span>
                                        </OverlayTrigger>
                                </Col>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </Main>
        )
    }
}