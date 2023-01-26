import axios from "axios"

export default async function loginUser(userData){
    return axios.post('/api/users/login', userData)
}