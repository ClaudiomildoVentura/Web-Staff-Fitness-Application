import api from '../../../Shared/Settings/api/api'

export const getIMCsHistory = async () => {
    try {
        const response = await api.post('/studentImcHistory')
        if (response.data) {
            return response.data
        }
    } catch (error) {
        this.setState({ mensagemErro: error.message })
    }
}