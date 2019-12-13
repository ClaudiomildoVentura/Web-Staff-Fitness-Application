import React from "react"
import { Col } from 'react-bootstrap'
import Footer from '../Template/Footer'
import Nav from '../Template/Nav'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { isAuthenticated } from "../../../Shared/Settings/Services/Auth/auth"
import PersonalDashboard from '../../Pages/Personal_Dashboard/PersonalDashboardScreen'
import PersonalErro from '../../Pages/Personal_Erro/PersonalErroScreen'
import PersonalExercise from '../../Pages/Personal_Exercise/PersonalExerciseScreen'
import PersonalExerciseList from '../../Pages/Personal_Exercise/PersonalExerciseListScreen'
import PersonalExerciseGroup from '../../Pages/Personal_Exercise_Group/PersonalExerciseGroupScreen'
import PersonalExerciseGrouplist from '../../Pages/Personal_Exercise_Group/PersonalExerciseGroupList'
import PersonalImc from '../../Pages/Personal_Imc/PersonalImcScreen'
import PersonalLogout from '../../Pages/Personal_Logout/PersonalLogoutScreen'
import PersonalPlan from '../../Pages/Personal_Plan/PersonalPlanScreen'
import PersonalProfile from '../../Pages/Personal_Profile/PersonalProfileScreen'
import PersonalProfileEdit from '../../Pages/Personal_Profile/PersonalProfileEditScreen'
import PersonalRegisterStudentScreen from '../../Pages/Personal_Register_Student/PersonalRegisterStudentScreen'
import PersonalRegisterList from '../../Pages/Personal_Register_Student/PersonalRegisterListScreen'
import PersonalShopping from '../../Pages/Personal_Shopping/PersonalShoppingScreen'
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Col className="flex-column flex-sm-row m-0 p-0 d-flex">
          <Nav />
          <Component {...props} />
          <Footer />
        </Col>
      ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
    }
  />
)

const StaffRoutes = () => (
  <BrowserRouter basename="/staff">
    <Switch>
      <PrivateRoute exact path="/" component={PersonalExercise} />
      <PrivateRoute exact path="/dashboard" component={PersonalDashboard} />
      <PrivateRoute path="/imc" component={PersonalImc} />
      <PrivateRoute path="/sair" component={PersonalLogout} />
      <PrivateRoute path="/planos" component={PersonalPlan} />
      <PrivateRoute path="/perfil" component={PersonalProfile} />
      <PrivateRoute path="/perfiledicao" component={PersonalProfileEdit} />
      <PrivateRoute path="/compras" component={PersonalShopping} />
      <PrivateRoute exact path="/alunos/cadastro" component={PersonalRegisterStudentScreen} />
      <PrivateRoute path="/alunos/lista" component={PersonalRegisterList} />
      <PrivateRoute path="/compras" component={PersonalShopping} />
      <PrivateRoute path="/treinos/cadastro" component={PersonalExercise} />
      <PrivateRoute path="/treinos/listagem" component={PersonalExerciseList} />
      <PrivateRoute path="/grupos/cadastro" component={PersonalExerciseGroup} />
      <PrivateRoute path="/grupos/listagem" component={PersonalExerciseGrouplist} />
      <PrivateRoute path="*" component={PersonalErro} />
    </Switch>
  </BrowserRouter>
)
export default StaffRoutes