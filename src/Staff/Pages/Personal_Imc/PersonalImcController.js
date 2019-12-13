import api from '../../../Shared/Settings/api/api'
import { getId } from '../../../Shared/Settings/Services/Auth/auth'


export const getIMCsHistory = async () => {
        try {
            const response = await api.post('/studentImcHistory')
            if (response.data) {
                  return response.data
//                const imcs = response.data.imcresp
//                this.setState({ 'imcx': imcs })
            }
        } catch (error) {
            this.setState({ mensagemErro: error.message })
        }
    }