import axios from "axios"



const getAllTodos = async () => {
    const url = `https://users-crud1.herokuapp.com/users/`
    const req = await axios.get(url)
    return req
}

export default getAllTodos



