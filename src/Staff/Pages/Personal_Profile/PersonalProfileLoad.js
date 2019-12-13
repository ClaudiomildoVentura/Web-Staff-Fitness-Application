import api from '../../../Shared/Settings/api/api'
import { getId } from '../../../Shared/Settings/Services/Auth/auth'

export const profileEdit = async (data) => {
    try{
        const response = await api.post('staff/editarPerfil', data).catch(erro=>console.log(erro))
        if(response.data.success){
            return 'Alterações realizadas com sucesso!'
        }
    }catch(erro){
        console.log(erro)
        return erro.message
    }
}


const PersonalProfileLoad = async () => {
    try {
        const response = await api.post('staff/perfil', { id: getId() })
        //console.log(response.data)
        if (response.data.personal) {
            const personal = response.data.personal
            return personal
            //            this.setState({'perfil': personal})
        }
    } catch (error) {
        //            this.setState({mensagemErro: error.message})
       //console.log(error)
        return error.message
    }
}
export default PersonalProfileLoad