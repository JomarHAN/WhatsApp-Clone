import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://whasapp-clone-be.herokuapp.com/'
})

export default instance