import axios from 'axios'

const putUsers = async (id,users) => {
    const url = `https://users-crud1.herokuapp.com/users/${id}/`
    const req = await axios.put(url, users)
    
    return req
    
}

export default putUsers