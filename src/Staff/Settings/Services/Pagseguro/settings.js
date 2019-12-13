import axios from 'axios'
import api from '../../../../Shared/Settings/api/api'
let convert = require('xml-js');
let session = ''
export const apipagseguro = async () => {
    await axios.post('https://apipagsegurostafffitness.herokuapp.com/session'
    ).then(data => {session = data.data.content})
     .catch(erro => console.log(erro))
    }

export const getSessionID = async() => {
    await apipagseguro()
    return session
}