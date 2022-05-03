import Items from './components/Items';
import { useEffect, useState } from 'react';
import './App.css';
import getAllTodos from './services/getAllTodos';
import { useForm } from "react-hook-form";
import postNewUser from './services/postNewUser';
import deleteUser from './services/deleteUser';
import putUsers from './services/putUsers';

function App() {

  
//Hook use Form
const { register, handleSubmit, reset} = useForm();
//sets

const [users,setUsers] = useState([])
const [newUser,setNewUser] = useState({})
const [idDelete,setIdDelete] = useState()
const [editDefValues,setEditDefValues] = useState({})
const [editFormRes, setEditFormRes] = useState({})



////////reset para el boton setee los valores
const defaultValues = {first_name: "",last_name: "",email: "",birthday: "", password: "" }
///////Leyendo datos de api
  useEffect (() => {
    
    getAllTodos()

      .then(response => {
        setUsers(response.data)
      })
    
  },[])

  useEffect (() => {
    postNewUser(newUser)
    .then((response) => {
      setUsers([ response.data, ...users])
      
    })
  },[newUser,users])

  

  useEffect (() => {
    const filterTodo = (id) => {
      const array = users.filter((item) => item.id !== id)
     //  console.log(array[0])
      return array
   }
    if(idDelete){
      deleteUser(idDelete)
      .then((response) => {
        setUsers(filterTodo(idDelete))
        console.log("Usuario Eliminado")
      })
    }   
  },[idDelete,users])


  useEffect(() => {
    const filterUsers = (id) => {
      const newArr = users.filter((user) => id !== user.id)
      return newArr
    }
    if(editFormRes.id){
      putUsers(editFormRes.id, editFormRes)
        .then((res) => {
          console.log(res.data)
          setUsers([res.data, ...filterUsers(editFormRes.id)])
          setEditFormRes({})
        })
    }
  }, [editFormRes, users])


  useEffect(() => {
    if(editDefValues){
      reset(editDefValues)
    }
  }, [reset, editDefValues])

////////////////////////Funcion para eliminar usuario
  // const deleteUser = (id) => {

  //   const filterUser = users.filter((user) => user.id == id )
  //   console.log(filterUser)

  // }

  const handlerDelete = (id) => {
    setIdDelete(id)
    // setEditObj(obj)
    // console.log(obj)
  }

  

  const handlerOneEdit = (obj) => {
    setEditDefValues(obj)
    // console.log(obj)
    
    // console.log(obj)
  }



  // const filterTodo = (id) => {
  //    const array = users.filter((item) => item.id !== id)
  //   //  console.log(array[0])
  //    return array
  // }
  const handlerOnEditProduct = (data) => {
    setEditFormRes(data)
  }

  ///Listando atos de api
  const list = users.map((todo) => <Items key={todo.first_name}
   oneEdit={handlerOneEdit} onDelete={handlerDelete} id={todo}
   productObj={todo}/>)


  ///////////Evento del botton form seteando
  const onSubmit = (res) => {
    setNewUser(res)
    reset(defaultValues)
    handlerOnEditProduct(res)
    
  }

  
  

  return (
    <div className="App">
      <header className="App-header">



      {/* ///////Formulario */}
      <form onSubmit={handleSubmit(onSubmit) }>
        {/* <h3>Nombre de usuario</h3> */}
        <input  placeholder='first_name' {...register("first_name",{required : true})}  /> <br/>
        {/* <h3>Apellido</h3> */}
        <input placeholder='last_name'  {...register("last_name",{required : true})} /><br/>
        {/* <h3>Email</h3> */}
        <input placeholder='email'  {...register("email", {required : true})} /><br/>
        {/* {errors.} */}
        {/* <h3>Cumpleaños</h3> */}
        <input  placeholder='birthday' type="date"  {...register("birthday") } /><br/>
        {/* <button>Subir Usuario</button> */}
        {/* <h3>Password</h3>    */}
        <input  placeholder='password'  {...register("password",{required : true})} />
        <input type="submit"  />
        <input type="submit" value="Editar" />
      </form>

      {list}

      </header>
    </div>
  );
}

export default App;
