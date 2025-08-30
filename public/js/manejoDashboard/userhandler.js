import { post, put } from "../servers.js";
export function rowsTableUsers(data){
    return  data = 
            `<tr>
                <td>${data.name}</td>
                <td>${data.gender}</td>
                <td>${data.phone}</td>
                <td>${data.email}</td>
                <td>${data.rol}</td>
                <td><button class="btnDelete" regid="${data._id}">-</button></td>
                <td><button class="btnUpdate" regid="${data._id}">Actualizar</button></td>
            </tr> `
}

export function rowAndHeadTableUsers(rows,contenedor){
    const  ConenidoMain= `
                <table>    
                    <header>
                        <h1>Usuarios</h1>
                    </header>
                    <div>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Genero</th>
                                <th>Telefono</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        ${rows}
                        </tbody>
                        
                    </div>
                </table>
                <div id="Agregar"></div>
                <div id="Actualizar"></div>
                <div>
                    <button id="btnAgregar">Agregar Usuario</button>
                </div>
        `
    contenedor.innerHTML = ConenidoMain;
}

export  async function formRegister(contenedor, funcion){
    contenedor.innerHTML=
        `<div>
            <p>nombre</p>
            <input type="text" id="nameRegister" name="name">
            <p>Genero</p>
            <input type="text" id="genderRegister" name="gender" >
            <p>phone</p>
            <input type="tel" id="phoneRegister" name="phone">
            <p>Rol</p>
            <input type="text" id="rolRegister" name="rol" >
            <p>email</p>
            <input type="email" id="emailRegister" name="email">
            <p>Contraseña</p>
            <input type="password" id="passwordRegister" name="password"><br>
            <input type="button" name="btnEnviarRegistro" value="Enviar" id="btnEnviarRegistro">
        </div>`;

    
  
    const btnEnviar = document.getElementById('btnEnviarRegistro');   
    btnEnviar.addEventListener('click', async()=>{
        const data = {
            name:document.getElementById('nameRegister').value,
            gender:document.getElementById('genderRegister').value,
            phone:document.getElementById('phoneRegister').value,
            rol:document.getElementById('rolRegister').value,
            email:document.getElementById('emailRegister').value,
            password:document.getElementById('passwordRegister').value
        }
        const result = await post('/user/register', data);
        console.log(result);
        await funcion()
    })
     
}
export function formUpdate(contenedor,result, id, funcion){
    contenedor.innerHTML=`
                        <div>
                            <p>Nombre actual (${result.name})</p>
                            <input id="newNameUpdate" type="text"></input>
                            <p>Genero actual (${result.gender})</p>
                            <input type="text" name="gender" id="genderUpdate">
                            <p>Telefono actual (${result.phone})</p>
                            <input type="tel" id="phoneUpdate" name="phone">
                            <p>Rol actual (${result.rol})</p>
                            <input type="text" name="rol" id="rolUpdate">
                            <p>email actual (${result.email})</p>
                            <input type="email" id="emailUpdate" name="email">
                            <input type="button" name="btnEnviarUpdate" value="Enviar nuevos datos" id="btnEnviarUpdate">
                        </div>
                    `
    const btnenviarUpdate = document.getElementById('btnEnviarUpdate')
    btnenviarUpdate.addEventListener('click', async(event)=>{
        event.preventDefault()
        const dataNueva = {
            name:document.getElementById('newNameUpdate').value,
            gender:document.getElementById('genderUpdate').value,
            phone:document.getElementById('phoneUpdate').value,
            rol:document.getElementById('rolUpdate').value,
            email:document.getElementById('emailUpdate').value,
        }
        const  result = await put('/user/update/', id, dataNueva) 
        console.log(result)
        await funcion()
    })
                    

}