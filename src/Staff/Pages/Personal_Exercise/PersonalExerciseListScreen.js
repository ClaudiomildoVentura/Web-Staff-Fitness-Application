import React, { Component } from 'react'
import { Col, Container, Button, Table, OverlayTrigger, Popover } from "react-bootstrap"
import Main from '../../Settings/Template/Main'
import PersonalExerciseStyles from './PersonalExerciseStyles'

const headerProps = {
    icon: 'table',
    title: 'Listagem dos Exercícios Cadastrados'
}

export default class PersonalExerciseListScreen extends Component {
    render() {
        return (
            <Main {...headerProps}>
                <Container style={PersonalExerciseStyles.containerTbl}>
                    <Table responsive size="sm" striped bordered hover style={PersonalExerciseStyles.tbl}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Categoria</th>
                                <th>Equipamento</th>
                                <th>Nível</th>
                                <th>N° Séries</th>
                                <th>N° Repetições</th>
                                <th>N° Intervalos</th>
                                <th>Instruções do Treino</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>1.</td>
                                <td>Supino reto</td>
                                <td>Médio</td>
                                <td>Máquina de peito</td>
                                <td>3</td>
                                <td>2</td>
                                <td>10</td>
                                <td>1</td>
                                <td></td>
                                <Col style={PersonalExerciseStyles.viewBtnTbl}>
                                    <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                                        overlay={<Popover style={PersonalExerciseStyles.overlay}>Editar</Popover>}>
                                        <span className="d-inline-block">
                                            <Button variant="outline-warning" size="sm" style={PersonalExerciseStyles.btn}>
                                                <i className="fa fa-pencil" style={PersonalExerciseStyles.i}></i>
                                            </Button>
                                        </span>
                                    </OverlayTrigger>

                                    <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                                        overlay={<Popover style={PersonalExerciseStyles.overlay}>Excluir</Popover>}>
                                        <span className="d-inline-block">
                                            <Button variant="outline-danger" size="sm" style={PersonalExerciseStyles.btn}>
                                                <i className="fa fa-trash" style={PersonalExerciseStyles.i}></i>
                                            </Button>
                                        </span>
                                    </OverlayTrigger>
                                </Col>
                            </tr>

                            <tr>
                                <td>2.</td>
                                <td>Crucifixo com halteres</td>
                                <td>Avançado</td>
                                <td>Máquina de peito</td>
                                <td>2</td>
                                <td>3</td>
                                <td>8</td>
                                <td>1</td>
                                <td></td>
                                <Col style={PersonalExerciseStyles.viewBtnTbl}>
                                    <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                                        overlay={<Popover style={PersonalExerciseStyles.overlay}>Editar</Popover>}>
                                        <span className="d-inline-block">
                                            <Button variant="outline-warning" size="sm" style={PersonalExerciseStyles.btn}>
                                                <i className="fa fa-pencil" style={PersonalExerciseStyles.i}></i>
                                            </Button>
                                        </span>
                                    </OverlayTrigger>

                                    <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                                        overlay={<Popover style={PersonalExerciseStyles.overlay}>Excluir</Popover>}>
                                        <span className="d-inline-block">
                                            <Button variant="outline-danger" size="sm" style={PersonalExerciseStyles.btn}>
                                                <i className="fa fa-trash" style={PersonalExerciseStyles.i}></i>
                                            </Button>
                                        </span>
                                    </OverlayTrigger>
                                </Col>
                            </tr>

                            <tr>
                                <td>3.</td>
                                <td>Abdominal remador</td>
                                <td>Médio</td>
                                <td>Treino livre</td>
                                <td>3</td>
                                <td>4</td>
                                <td>10</td>
                                <td>1</td>
                                <td></td>
                                <Col style={PersonalExerciseStyles.viewBtnTbl}>
                                    <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                                        overlay={<Popover style={PersonalExerciseStyles.overlay}>Editar</Popover>}>
                                        <span className="d-inline-block">
                                            <Button variant="outline-warning" size="sm" style={PersonalExerciseStyles.btn}>
                                                <i className="fa fa-pencil" style={PersonalExerciseStyles.i}></i>
                                            </Button>
                                        </span>
                                    </OverlayTrigger>

                                    <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                                        overlay={<Popover style={PersonalExerciseStyles.overlay}>Excluir</Popover>}>
                                        <span className="d-inline-block">
                                            <Button variant="outline-danger" size="sm" style={PersonalExerciseStyles.btn}>
                                                <i className="fa fa-trash" style={PersonalExerciseStyles.i}></i>
                                            </Button>
                                        </span>
                                    </OverlayTrigger>
                                </Col>
                            </tr>

                            <tr>
                                <td>4.</td>
                                <td>Deltóide alternado</td>
                                <td>Médio</td>
                                <td>Treino livre</td>
                                <td>1</td>
                                <td>3</td>
                                <td>10</td>
                                <td>1</td>
                                <td></td>
                                <Col style={PersonalExerciseStyles.viewBtnTbl}>
                                    <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                                        overlay={<Popover style={PersonalExerciseStyles.overlay}>Editar</Popover>}>
                                        <span className="d-inline-block">
                                            <Button variant="outline-warning" size="sm" style={PersonalExerciseStyles.btn}>
                                                <i className="fa fa-pencil" style={PersonalExerciseStyles.i}></i>
                                            </Button>
                                        </span>
                                    </OverlayTrigger>

                                    <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                                        overlay={<Popover style={PersonalExerciseStyles.overlay}>Excluir</Popover>}>
                                        <span className="d-inline-block">
                                            <Button variant="outline-danger" size="sm" style={PersonalExerciseStyles.btn}>
                                                <i className="fa fa-trash" style={PersonalExerciseStyles.i}></i>
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