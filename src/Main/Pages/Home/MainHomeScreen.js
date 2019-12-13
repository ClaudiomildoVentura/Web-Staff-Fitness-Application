import React, { Component } from "react"
import { Button, Col, Form } from "react-bootstrap"
import MainHomeStyles from './MainHomeStyles'
import LgStaffSemFundo from "../../../Shared/Assets/LgStaffSemFundo.png"
import api from '../../../Shared/Settings/api/api'
import { login, setId } from '../../../Shared/Settings/Services/Auth/auth'
import { Link } from 'react-router-dom'

export default class MainHomeScreen extends Component {

  state = {
    email: "",
    password: "",
    error: "",
    sucesso: ""
  }

  handleSignIn = async e => {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("login", { email: this.state.email, password: this.state.password })
        if (response.data.status === 0) {
          if (response.data.nivelAcesso === 2) {
            this.setState({ error: "" });
            this.setState({ sucesso: response.data.message })
            login(response.data.accessToken.token)
            setId(response.data.userId);
            this.props.history.push('staff/dashboard')
          }
        } else {
          this.setState({ sucesso: "" });
          throw new Error(response.data.message)
        }
      } catch (err) {
        this.setState({
          error:
            err.message
        })
      }
    }
  }

  render() {
    return (
      <div style={MainHomeStyles.container}>
        <Col className="p-xs-0 p-sm-4" style={MainHomeStyles.containerLogin} xs={12} sm={{ span: 4, offset: 4 }}>
          <img style={MainHomeStyles.logo} src={LgStaffSemFundo} alt="" />
          {this.state.error && <p id="msgError" style={MainHomeStyles.msgError}>{this.state.error}</p>}
          {this.state.sucesso && <p id="msgSucesso" style={MainHomeStyles.msgSuccess}>{this.state.sucesso}</p>}
          <Form onSubmit={this.handleSignIn}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={MainHomeStyles.txt}>Login</Form.Label>
              <Form.Control type="email" onChange={e => this.setState({ email: e.target.value })} placeholder="Insira seu endereço de e-mail" autocomplete="off" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label style={MainHomeStyles.txt}>Senha</Form.Label>
              <Form.Control type="password" onChange={e => this.setState({ password: e.target.value })} placeholder="Insira sua senha" autocomplete="off" />
            </Form.Group>
            <div style={MainHomeStyles.viewBtn}>
              <Button className="btn" variant="secondary" type="submit">Fazer Login</Button>
              <Link to="/cadastro"><Button className='cadastro' variant="secondary">Cadastre-se</Button></Link>
            </div>
            <div style={{ color: 'white' }} className="my-sm-3 my-xs-1">
              <h4>VAMOS NOS EXERCITAR !</h4>
              <h5>Gerencie o treino dos seus alunos com facilidade</h5>
            </div>
          </Form>
        </Col>
      </div>
    )
  }
}