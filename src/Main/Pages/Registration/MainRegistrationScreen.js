import React, { Component } from "react"
import { Button, Col, Container, Form, OverlayTrigger, Popover, Row } from 'react-bootstrap'
import MainRegistrationStyles from './MainRegistrationStyles'
import LgStaffSemFundo from "../../../Shared/Assets/LgStaffSemFundo.png"
import api from '../../../Shared/Settings/api/api'
import { Link } from 'react-router-dom'
import InputMask from 'react-input-mask'

export default class MainRegistrationScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      nome: '',
      cpf: '',
      data: '',
      telefone: '',
      cref: '',
      email: '',
      password: '',
      email_confirmation: '',
      password_confirmation: '',
      error: '',
      sucesso: ''
    }
  }

  fazerCadastro = async e => {
    e.preventDefault()
    try {
      const response = await api.post('staff/registration', {
        username: this.state.username,
        nome: this.state.nome,
        cpf: this.state.cpf,
        datanascimento: this.state.data,
        telefone: this.state.telefone,
        cref: this.state.cref,
        email: this.state.email,
        password: this.state.password,
        email_confirmation: this.state.email_confirmation,
        password_confirmation: this.state.password_confirmation,
      })
      console.log(response)
      if (response.data.status === 0) {
        this.setState({ sucesso: response.data.message })
        this.props.history.push("/");
      } else {
        throw new Error(response.data.message)
      }
    } catch (erro) {
      this.setState({ error: erro.message })
      console.log(erro)
    }
  }

  render() {
    return (
      <>
        <Container style={MainRegistrationStyles.container}>
          <Row className="justify-content-md-center text-white">
            <Col md="auto">

              <Container>
                <Row className="justify-content-md-center">
                  <Col xs md="auto">
                    <img style={MainRegistrationStyles.logo} src={LgStaffSemFundo} alt="" />
                  </Col>
                </Row>
                {this.state.error && <p style={MainRegistrationStyles.msgError}>{this.state.error}</p>}
                {this.state.sucesso && <p style={MainRegistrationStyles.msgSuccess}>{this.state.sucesso}</p>}
              </Container>

              <Form onSubmit={this.fazerCadastro}>

                <Form.Row>
                  <Form.Group as={Col} sm={6} controlId="nome">
                    <Form.Label style={MainRegistrationStyles.txt}>Nome:</Form.Label>
                    <Form.Control onChange={e => this.setState({ nome: e.target.value })}
                      required
                      placeholder="Digite seu nome completo"
                      style={MainRegistrationStyles.txtInput} />
                  </Form.Group>

                  <Form.Group as={Col} sm={6} controlId="username">
                    <Form.Label style={MainRegistrationStyles.txt}>Username:</Form.Label>
                    <Form.Control onChange={e => this.setState({ username: e.target.value })}
                      required
                      type="text"
                      placeholder="Digite o nome de usuário"
                      style={MainRegistrationStyles.txtInput} />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} sm={3} md={3} controlId="cpf">
                    <Form.Label style={MainRegistrationStyles.txt}>Cpf:</Form.Label>
                    <InputMask className="form-control" mask="999.999.999-99" maskChar={null}
                      onChange={e => this.setState({ cpf: e.target.value })}
                      required
                      placeholder="Digite seu CPF"
                      style={MainRegistrationStyles.txtInput} />
                  </Form.Group>

                  <Form.Group as={Col} sm={3} md={3} controlId="datanascimento">
                    <Form.Label style={MainRegistrationStyles.txt}>Data de Nascimento:</Form.Label>
                    <InputMask className="form-control" mask="99/99/9999" maskChar={null}
                      onChange={e => this.setState({ data: e.target.value })}
                      required
                      placeholder="dd/mm/aaaa"
                      style={MainRegistrationStyles.txtInput} />
                  </Form.Group>

                  <Form.Group as={Col} sm={3} md={3} controlId="telefone">
                    <Form.Label style={MainRegistrationStyles.txt}>Telefone</Form.Label>
                    <InputMask className="form-control" mask="99999-9999" maskChar={null}
                      onChange={e => this.setState({ telefone: e.target.value })}
                      required
                      placeholder="98765-9100"
                      style={MainRegistrationStyles.txtInput} />
                  </Form.Group>

                  <Form.Group as={Col} sm={3} md={3} controlId="cref">
                    <Form.Label style={MainRegistrationStyles.txt}>N° CREF</Form.Label>
                    <Form.Control onChange={e => this.setState({ cref: e.target.value })}
                      required
                      placeholder="009227-G/PE"
                      style={MainRegistrationStyles.txtInput} />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="email">
                    <Form.Label style={MainRegistrationStyles.txt}>Email:</Form.Label>
                    <Form.Control onChange={e => this.setState({ email: e.target.value })}
                      required type="email"
                      placeholder="Digite seu email"
                      style={MainRegistrationStyles.txtInput} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="email_confirmation">
                    <Form.Label style={MainRegistrationStyles.txt}>Confirmar Email:</Form.Label>
                    <Form.Control onChange={e => this.setState({ email_confirmation: e.target.value })}
                      required
                      type="email"
                      placeholder="Confirme seu email"
                      style={MainRegistrationStyles.txtInput} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="password">
                    <Form.Label style={MainRegistrationStyles.txt}>Senha:</Form.Label>
                    <Form.Control onChange={e => this.setState({ password: e.target.value })}
                      required
                      type="password"
                      placeholder="Digite sua senha"
                      style={MainRegistrationStyles.txtInput} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="password_confirmation">
                    <Form.Label style={MainRegistrationStyles.txt}>Confirmar Senha:</Form.Label>
                    <Form.Control onChange={e => this.setState({ password_confirmation: e.target.value })}
                      required
                      type="password"
                      placeholder="Confirme sua senha"
                      style={MainRegistrationStyles.txtInput} />
                  </Form.Group>
                </Form.Row>

                <Row>
                  <Link className="btn btn-secondary" to="/"
                    style={MainRegistrationStyles.btn}>Voltar</Link>

                  <OverlayTrigger placement="bottom" delay={{ show: 200, hide: 500 }}
                    overlay={<Popover style={MainRegistrationStyles.overlay}>Para efetivar o seu cadastro clique aqui e receba um e-mail de confirmação!</Popover>}>
                    <span className="d-inline-block">
                      <Button type="submit" variant="secondary" style={MainRegistrationStyles.btn}>Enviar</Button>
                    </span>
                  </OverlayTrigger>

                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}