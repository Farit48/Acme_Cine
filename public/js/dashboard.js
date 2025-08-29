
import {post, get, remove, getBy} from './servers.js'

import {rowsTableUsers, rowAndHeadTableUsers, formRegister, formUpdate} from './userhandler.js'

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
    
    try{
        // Leer los datos para poner en la tabla
        async function restarTable(){
            const resultado =  await get('/user/read')
            console.log(resultado)
            const contenido = resultado.map(data => 
                rowsTableUsers(data)   
            ).join('');
            rowAndHeadTableUsers(contenido,mainDinamic)

            // Agregar un nuevo Usuario
            const btnAgregar = document.getElementById('btnAgregar')
            const agregarUser = document.getElementById('Agregar')
            if(btnAgregar && agregarUser){
                btnAgregar.addEventListener('click', async(event)=>{
                    event.preventDefault()
                    formRegister(agregarUser,restarTable); 
                     
                })
            }else{
                console.log('No existen los botones')
            }
            // Eliminar usuario con el boton de eliminar
            const btnDelete = document.querySelectorAll('.btnDelete')
            btnDelete.forEach(btn =>{
                btn.addEventListener('click',async (even)=>{
                    const id = even.target.getAttribute('regid')
                    console.log(id)
                    try{
                        const resultado = await remove(`/user/deleate/`, id)
                        console.log(resultado)
                        restarTable()
                    }catch(err){
                        console.log('Error en el metodo eliminar de dashboard', err)
                    }
                    
                })
            })

            // Actualizar usuario con el boton de actualizar
            const btnAcutalizar = document.querySelectorAll('.btnUpdate')
            const campodeActualizar = document.getElementById('Actualizar')
            btnAcutalizar.forEach(btn=>{
                btn.addEventListener('click', async(regid)=>{
                    
                    try{
                        const id = regid.target.getAttribute('regid')
                        console.log(id)
                        const resultado = await getBy('/user/readBy/', id)
                        console.log(resultado)
                        formUpdate(campodeActualizar,resultado,id)
                        restarTable()
                    }catch(err){
                         console.log('Error en el metodo leer primero para actualizar de dashboard', err)
                    }
                })
            })              
        }
        restarTable()
       
      
        
        
        // btnAcutalizar.forEach(btn=>{
        //     btn.addEventListener('click', async (regid) => {
            
        //         const id = regid.target.getAttribute('regid')
                
        //         const getUser = await fetch(`http://localhost:3002/user/read/${id}`,
        //             {
        //                 method:'GET',
        //                 headers: {
        //                     'Content-Type': 'application/json'
        //                 },
        //             }
        //         )
        //         if(getUser.ok && getUser.status === 201){
        //             const result = await getUser.json()
        //             campodeActualizar.innerHTML= `
        //                 <div>
        //                     <p>Nombre actual (${result.name})</p>
        //                     <input id="newNameUpdate" type="text"></input>
        //                     <p>Genero actual (${result.gender})</p>
        //                     <input type="text" name="gender" id="genderUpdate">
        //                     <p>Telefono actual (${result.phone})</p>
        //                     <input type="tel" id="phoneUpdate" name="phone">
        //                     <p>Rol actual (${result.rol})</p>
        //                     <input type="text" name="rol" id="rolUpdate">
        //                     <p>email actual (${result.email})</p>
        //                     <input type="email" id="emailUpdate" name="email">
        //                     <input type="button" name="btnEnviarUpdate" value="Enviar nuevos datos" id="btnEnviarUpdate">
        //                 </div>
        //             `
        //             const btnenviarUpdate = document.getElementById('btnEnviarUpdate')
        //             btnenviarUpdate.addEventListener('click', async(event)=>{
        //                 event.preventDefault()
        //                 const dataNueva = {
        //                     name:document.getElementById('newNameUpdate').value,
        //                     gender:document.getElementById('genderUpdate').value,
        //                     phone:document.getElementById('phoneUpdate').value,
        //                     rol:document.getElementById('rolUpdate').value,
        //                     email:document.getElementById('emailUpdate').value,
        //                 }
        //                 const  update = await fetch(`http://localhost:3002/user/update/${id}`,
        //                     {
        //                         method:'PUT',
        //                         headers: {
        //                             'Content-Type': 'application/json'
        //                         },
        //                         body: JSON.stringify(dataNueva)
        //                     }
        //                 )
        //                 if(update.ok && update.status === 201){
        //                     let result = update.json()
        //                     console.log(result)
        //                     alert('se actualiza eeeehh')
        //                 }else{
                            
        //                     alert('No se actualiza nada')  
        //                 }
        //             })
                    

        //         }else{
        //             alert('No se haya nada')
        //         }
            
            
        //     })
        // })
    }catch(err){
        console.log('error en el get de usuarios al hacer click en el boton usuarios')
    }
   
    
})



   




