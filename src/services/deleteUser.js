import axios from 'axios'

const deleteUser = async (id) => {
    const url = `http://users-crud1.herokuapp.com/users/${id}`
    const req = await axios.delete(url)
    
    return req
    
}

export default deleteUser