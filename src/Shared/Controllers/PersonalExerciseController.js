import api from '../Settings/api/api'

export const getExercisesList = async () => {
    try {
        const response = await api.get('staff/lista/equipamentos')
        return response.data.equipamento
    } catch (error) {
        console.log(error)
        return error.message
    }
}

export const getCategoryList = async () => {
    try {
        const response = await api.get('/staff/lista/categorias')
        return response.data.categoria
    } catch (error) {
        console.log(error)
    }
}