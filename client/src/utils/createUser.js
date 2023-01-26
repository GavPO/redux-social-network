import axios from "axios"

export default async function createUser(userData){
    return axios.post('/api/users', userData)
}