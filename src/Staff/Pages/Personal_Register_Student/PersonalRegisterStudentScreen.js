import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row, Table, OverlayTrigger, Popover } from 'react-bootstrap'
import PersonalRegisterStyles from './PersonalRegisterStudentStyles'
import Main from '../../Settings/Template/Main'
import api from '../../../Shared/Settings/api/api'
import { staffStudentsDashboard, getStaffStudents } from '../../../Shared/Controllers/PersonalStudentsController'
import { getId } from '../../../Shared/Settings/Services/Auth/auth'


const headerProps = {
    icon: 'address-card',
    title: 'Pré-Cadastro dos Alunos'
}
const studentListTable = ''
export default class PersonalRegisterStudentScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pendings: [],
            errorMessage: '',
            successMessage: '',
            name: '',
            email: '',
            email_confirmation: '',
            chavedeacesso: '',
            status: '',
            reandOnlyInputs: [],
            studentsListForm: [],
            staffStudentsDashboard: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.preRegistration = this.preRegistration.bind(this)
    }

    handleSubmit = async e => {
        e.preventDefault()
        const { name, email, email_confirmation } = this.state
        try {
            if (name != '' && email != '' && email_confirmation != '') {
                const response = await api.post('staff/aluno/cadastrar', {
                    idStaff: getId(),
                    name: this.state.name,
                    email: this.state.email,
                    email_confirmation: this.state.email_confirmation
                })
            } else {
                throw new Error('Todos os campos são de preenchimento obrigatório.')
            }
        } catch (error) {
            this.setState({ errorMessage: error.message })
        }
    }

    preRegistration = e => {
        e.preventDefault()
        const { name, email, email_confirmation } = this.state
        if (name == '' || email == '' || email_confirmation == '') {
            this.setState({ errorMessage: 'Todos os campos são de preenchimento obrigatório' })
        }
        else if (name.length <= 3 || email.length <= 3 || email_confirmation.length <= 3) {
            this.setState({ errorMessage: 'Todos os campos precisam ter 3 ou mais caracteres.' })
        }
        else if (email != email_confirmation) {
            this.setState({ errorMessage: 'Os campos de email não conferem' })
        } else {
            let result = this.state.studentsListForm.indexOf(email)
            const student = { name, email, email_confirmation }
            const allow = this.state.staffStudentsDashboard.allowRegister - this.state.studentsListForm.length
            if (allow > 0) {
                this.setState(prevState => ({ studentsListForm: [...prevState.studentsListForm, student] }))
            } else {
                this.setState({ errorMessage: 'Você já possui o máximo de alunos pendentes para o seu plano.' })
            }
        }
    }

    async componentWillReceiveProps() {
    }
    async componentWillMount() {
        const response = staffStudentsDashboard().then(
            data => { this.setState({ staffStudentsDashboard: data }); this.setState({ pendings: data.pendingStudents }) }
        )
    }

    render() {
        let pendingStudentsList = this.state.studentsListForm.map((item, index) => {
            return (<tr><td>{item.name}</td><td>{item.email}</td><td>{this.state.staffStudentsDashboard.tokenList[index]}</td>                                    <td>
                <Col style={PersonalRegisterStyles.viewBtn}>
                    <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                        overlay={<Popover style={PersonalRegisterStyles.overlay}>Editar</Popover>}>
                        <span className="d-inline-block">
                            <Button variant="outline-warning" size="sm" style={PersonalRegisterStyles.btn}>
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
            </tr>)
        })
        let pendings = this.state.pendings.map((student, index) => {
            return (<tr><td>{student.nome}</td><td>{student.email}</td><td>{student.accessKey}</td><td>
                <Col style={PersonalRegisterStyles.viewBtn}>
                    <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }}
                        overlay={<Popover style={PersonalRegisterStyles.overlay}>Editar</Popover>}>
                        <span className="d-inline-block">
                            <Button variant="outline-warning" size="sm" style={PersonalRegisterStyles.btn}>
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
            </tr>)
        })
        return (
            <Main {...headerProps}>
                <>
                    <Container style={PersonalRegisterStyles.container}>
                        <div className="mb-3" style={PersonalRegisterStyles.containerExerciseQueue}>
                            <p style={PersonalRegisterStyles.titleBox}>Cadastro Aluno</p>
                            <Row className="justify-content-md-center">
                                <Col>
                                    <Form>
                                        <Form.Group controlId="nome">
                                            <Form.Label style={PersonalRegisterStyles.txt}>Nome:</Form.Label>
                                            <Form.Control onChange={e => this.setState({ name: e.target.value })}
                                                required placeholder="Digite seu nome completo" style={PersonalRegisterStyles.txtInput} />
                                        </Form.Group>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="email">
                                                <Form.Label style={PersonalRegisterStyles.txt}>Email:</Form.Label>
                                                <Form.Control onChange={e => this.setState({ email: e.target.value })}
                                                    required placeholder="Digite seu Email" style={PersonalRegisterStyles.txtInput} />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="email_confirmation">
                                                <Form.Label style={PersonalRegisterStyles.txt}>Confirme o email:</Form.Label>
                                                <Form.Control onChange={e => this.setState({ email_confirmation: e.target.value })}
                                                    required placeholder="Digite seu Email" style={PersonalRegisterStyles.txtInput} />
                                            </Form.Group>
                                        </Form.Row>
                                        {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
                                        <Row style={PersonalRegisterStyles.viewBtnPre}>
                                            <Button variant="secondary" size="sm" type="button" onClick={e => this.preRegistration(e)}>Pré-Cadastramento dos Alunos</Button>
                                        </Row>

                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </Container>

                    <Container style={PersonalRegisterStyles.containerTbl}>
                        <Table responsive size="sm" style={PersonalRegisterStyles.tbl}>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Chave de Acesso</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {pendings}
                                {pendingStudentsList}
                            </tbody>
                        </Table>
                    </Container>
                    <Container style={PersonalRegisterStyles.containerSaved}>

                        <OverlayTrigger placement="top" delay={{ show: 50, hide: 200 }}
                            overlay={<Popover style={PersonalRegisterStyles.overlay}>Atenção, confirme todos os dados antes de salvar!</Popover>}>
                            <span className="d-inline-block">
                                <Button variant="secondary" size="sm" >
                                    Salvar Todos os Alunos Listados
                                    <i className="fa fa-list" style={PersonalRegisterStyles.iSaved}></i>
                                </Button>
                            </span>
                        </OverlayTrigger>

                    </Container>
                </>
            </Main>
        )
    }
}