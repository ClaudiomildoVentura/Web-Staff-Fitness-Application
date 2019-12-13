import React, { Component } from 'react'
import { Form, Button, Col, Container, Table, OverlayTrigger, Popover } from "react-bootstrap"
import Main from '../../Settings/Template/Main'
import PersonalRegisterStyles from './PersonalRegisterStudentStyles'
import api from '../../../Shared/Settings/api/api'
import { staffStudentsDashboard, getStaffStudents } from '../../../Shared/Controllers/PersonalStudentsController'
import { getId } from '../../../Shared/Settings/Services/Auth/auth'

const headerProps = {
    icon: 'table',
    title: 'Listagem dos Alunos Cadastrados'
}
let readOnlyInputs = []
export default class PersonalRegisterListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: '',
            name: '',
            email: '',
            email_confirmation: '',
            chavedeacesso: '',
            status: '',
            readOnlyInputs: [],
            studentsListForm: [],
            staffStudentsDashboard: []
        }
        this.makeEditable = this.makeEditable.bind(this)
    }

    async componentWillMount() {
        const response = staffStudentsDashboard().then(
            data => { this.setState({ staffStudentsDashboard: data.alunos }) }
        )
    }

    makeEditable = (e) => {
        console.log(e)
        readOnlyInputs[e.value] = !readOnlyInputs[e.value]
        console.log(readOnlyInputs[e.value])
    }
    render() {
        const studentListTable = this.state.staffStudentsDashboard.map((student, index) => {
            return (
                <tr>
                    {console.log(student)}
                    <td>{index + 1}</td>
                    <td>{student.nome}</td>
                    <td>
                        {student.email}
                    </td>
                    <td>{student.accessKey}</td>
                    <td>
                        {readOnlyInputs[index] = false}
                        <Col style={PersonalRegisterStyles.viewBtn}>
                            <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                                overlay={<Popover style={PersonalRegisterStyles.overlay}>Editar</Popover>}>
                                <span className="d-inline-block">
                                    <Button value={index} variant="outline-warning" onClick={e => this.makeEditable(e)} size="sm" style={PersonalRegisterStyles.btn}>
                                        <i className="fa fa-pencil" style={PersonalRegisterStyles.i}></i>
                                    </Button>
                                </span>
                            </OverlayTrigger>

                            <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                                overlay={<Popover style={PersonalRegisterStyles.overlay}>Excluir</Popover>}>
                                <span className="d-inline-block">
                                    <Button variant="outline-danger" size="sm" style={PersonalRegisterStyles.btn}>
                                        <i className="fa fa-trash" style={PersonalRegisterStyles.i}></i>
                                    </Button>
                                </span>
                            </OverlayTrigger>

                        </Col>
                    </td>
                </tr>
            )
        })

        return (
            <Main {...headerProps}>
                <Container style={PersonalRegisterStyles.containerList}>
                    <Table responsive size="sm" striped bordered hover style={PersonalRegisterStyles.tbl}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Chave de Acesso</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {studentListTable}
                            {console.log(readOnlyInputs)}
                        </tbody>
                    </Table>
                </Container>
            </Main>
        )
    }
}