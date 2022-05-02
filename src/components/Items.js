

const Items = ({onDelete,id,oneEdit,productObj}) => {



    return(
        <div>
            <h3>Nombre:  {productObj.first_name} {productObj.last_name}</h3> 
            <h3> Correo: {productObj.email}</h3>
            <h3>Cumpleaños: {productObj.birthday}</h3>
            <h3>Password {productObj.password}</h3>

            <button onClick={() => onDelete(id.id)}>Eliminar</button>
            {/* <input id="edit" type="checkbox" onChange={editStatus} value='editar'  /> */}
            <button onClick={() => oneEdit(productObj)}>Editar</button>
            {/* <button id="edit">Editar</button> */}
        </div>
    )
}

export default Items