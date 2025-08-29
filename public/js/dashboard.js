import enviarRegistro from './register.js'


const dataUser = JSON.parse(localStorage.getItem('dataUser'))

const nameUser = document.getElementById('name')
nameUser.innerHTML = dataUser.name

const rolUser = document.getElementById('rol')
rolUser.innerHTML = dataUser.rol

const emailUser = document.getElementById('email')
emailUser.innerHTML = dataUser.email



const usersBtn = document.getElementById('UsuariosBtn')
const cinesBtn = document.getElementById('Cinesbtn')

const mainDinamic = document.getElementById('Main-dinamic')



usersBtn.addEventListener('click', async(event)=>{
    event.preventDefault()
    // Leer los datos para poner en la tabla
    const solicitud = await fetch('http://localhost:3002/user/read', 
        {
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    )
    const result = await solicitud.json();
    console.log(result)
    let contenido = result.map(data => `
        <tr>
            <td>${data.name}</td>
            <td>${data.gender}</td>
            <td>${data.phone}</td>
            <td>${data.email}</td>
            <td>${data.rol}</td>
            <td><button class="btnDelete" regid="${data._id}">-</button></td>
            <td><button class="btnUpdate" regid="${data._id}">Actualizar</button></td>
        </tr>   
    `).join('');
    const ConenidoMain= `
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
                    ${contenido}
                    </tbody>
                    
                </div>
            </table>
            <div id="Agregar"></div>
            <div id="Actualizar"></div>
            <div>
                <button id="btnAgregar">Agregar Usuario</button>
            </div>
    `
    
    mainDinamic.innerHTML = ConenidoMain

    // Eliminar usuario con el boton de eliminar
    const btnDelete = document.querySelectorAll('.btnDelete')
    btnDelete.forEach(btn =>{
        btn.addEventListener('click',async (even)=>{
            const id = even.target.getAttribute('regid')
            console.log(id)
            const del = await fetch(`http://localhost:3002/user/deleate/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            );
            if(del.ok  && del.status === 201){
                const response = await del.json();
                console.log('Usuario Eliminado con éxito:', response);
                window.location.reload()
                alert('Usuario Eliminado correctamente');
                
            } else {
            
                switch (del.status) {
                    case 500:
                        alert('Error del servidor')
                    default:
                        alert('Ocurrió un error. Inténtelo de nuevo más tarde.');
                }
            }
        })
    })

    // Abrir Formulario y enviar para registrar usuario
    const btnAgregar = document.getElementById('btnAgregar')
    const agregarUser = document.getElementById('Agregar')
    if(btnAgregar && agregarUser){
        btnAgregar.addEventListener('click', async(event)=>{
            event.preventDefault()
            agregarUser.innerHTML = `<div>
                    <p>nombre</p>
                    <input type="text" id="nameRegister" name="name">
                    <p>Genero</p>
                    <input type="text" name="gender" id="genderRegister">
                    <p>phone</p>
                    <input type="tel" id="phoneRegister" name="phone">
                    <p>Rol</p>
                    <input type="text" name="rol" id="rolRegister">
                    <p>email</p>
                    <input type="email" id="emailRegister" name="email">
                    <p>Contraseña</p>
                    <input type="password" id="passwordRegister" name="password">
                    <input type="button" name="btnEnviarRegistro" value="Enviar" id="btnEnviarRegistro">
                </div>`
        
            enviarRegistro('btnEnviarRegistro')
            
        
            
        })
    }else{
        console.log('No existen los botones')
    }

    const btnAcutalizar = document.querySelectorAll('.btnUpdate')
    const campodeActualizar = document.getElementById('Actualizar')
    btnAcutalizar.forEach(btn=>{
        btn.addEventListener('click', async (regid) => {
           
            const id = regid.target.getAttribute('regid')
            
            const getUser = await fetch(`http://localhost:3002/user/read/${id}`,
                {
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
            if(getUser.ok && getUser.status === 201){
                const result = await getUser.json()
                campodeActualizar.innerHTML= `
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
                    const  update = await fetch(`http://localhost:3002/user/update/${id}`,
                        {
                            method:'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(dataNueva)
                        }
                    )
                    if(update.ok && update.status === 201){
                        let result = update.json()
                        console.log(result)
                        alert('se actualiza eeeehh')
                    }else{
                        
                        alert('No se actualiza nada')  
                    }
                })
                

            }else{
                alert('No se haya nada')
            }
           
          
        })
    })
})



   




