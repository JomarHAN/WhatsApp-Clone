import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://whatsapp-clone-jmn.herokuapp.com/'
})

export default instance