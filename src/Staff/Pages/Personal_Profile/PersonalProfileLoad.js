import api from '../../../Shared/Settings/api/api'
import { getId } from '../../../Shared/Settings/Services/Auth/auth'

export const profileEdit = async (data) => {
    try {
        const response = await api.post('staff/editarPerfil', data)
        if (response.data.success) {
            return 'Alterações realizadas com sucesso!'
        }
    } catch (erro) {
        console.log(erro)
        return erro.message
    }
}

const PersonalProfileLoad = async () => {
    try {
        const response = await api.post('staff/perfil', { id: getId() })
        if (response.data.personal) {
            const personal = response.data.personal
            return personal
        }
    } catch (error) {
        return error.message
    }
}
export default PersonalProfileLoad