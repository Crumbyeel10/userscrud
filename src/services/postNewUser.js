import axios from 'axios'

const postNewUser = async (newUser) => {
    const url = 'https://users-crud1.herokuapp.com/users/'
    const req = await axios.post(url, newUser)
    
    return req
    
}

export default postNewUser