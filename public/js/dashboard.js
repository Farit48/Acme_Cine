
import { get, remove, getBy} from './servers.js'

import {rowsTableUsers, rowAndHeadTableUsers, formRegister, formUpdate} from './manejoDashboard/userhandler.js'
import {rowsTableCinemas, rowAndHeadTableCinemas, formCineRegister, formUpdateCine, detailsCine} from './manejoDashboard/cinemahandler.js'
import {rowsTableFunctions,rowAndHeadTableFunctions, formFunctionRegister} from './manejoDashboard/functionshandler.js'


// Informacion del aside de cada perfil que inicia sesion
const dataUser = JSON.parse(localStorage.getItem('dataUser'))

const nameUser = document.getElementById('name')
nameUser.innerHTML = dataUser.name

const rolUser = document.getElementById('rol')
rolUser.innerHTML = dataUser.rol

const emailUser = document.getElementById('email')
emailUser.innerHTML = dataUser.email

// Botones de navegacion 

const usersBtn = document.getElementById('UsuariosBtn')
const cinesBtn = document.getElementById('Cinesbtn')
const funtionBtn = document.getElementById('FuncionesBtn')

const mainDinamic = document.getElementById('Main-dinamic')


// DASHBOAR DE USUSARIOS
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
                        formUpdate(campodeActualizar,resultado,id, restarTable)
                        
                    }catch(err){
                         console.log('Error en el metodo leer primero para actualizar de dashboard', err)
                    }
                })
            })              
        }
        restarTable()
       
    }catch(err){
        console.log('error en el get de usuarios al hacer click en el boton usuarios')
    }
})

// DASHBOARD CINES
cinesBtn.addEventListener('click', (event)=>{
    event.preventDefault()
    try{
        async function restarTableFunctions() {
            const resultado =  await get('/cinema/read')
            const contenido = resultado.map(data => 
                rowsTableCinemas(data)   
            ).join('');
            rowAndHeadTableCinemas(contenido,mainDinamic)
            
            // Agregar un Nuevo cine
            const btnAgregar = document.getElementById('btnAgregar')
            const agregarCine = document.getElementById('Agregar')
            if(btnAgregar && agregarCine){
                btnAgregar.addEventListener('click', async(event)=>{
                    event.preventDefault()
                    formCineRegister(agregarCine, restarTableFunctions); 
                     
                })
            }else{
                console.log('No existen los botones')
            }
            // Eliminar cine
            const btnDelete = document.querySelectorAll('.btnDelete')
            btnDelete.forEach(btn =>{
                btn.addEventListener('click',async (even)=>{
                    const id = even.target.getAttribute('regid')
                    console.log(id)
                    try{
                        const resultado = await remove(`/cinema/deleate/`, id)
                        console.log(resultado)
                        restarTableFunctions()
                    }catch(err){
                        console.log('Error en el metodo eliminar de dashboard', err)
                    }
                })
            })
            // Actualizar un cine
            const btnAcutalizar = document.querySelectorAll('.btnUpdate')
            const campodeActualizar = document.getElementById('Actualizar')
            btnAcutalizar.forEach(btn=>{
                btn.addEventListener('click', async(regid)=>{
                   try{
                        const id = regid.target.getAttribute('regid')
                        console.log(id)
                        const cine = await getBy('/cinema/readBy/', id)
                        console.log(cine) 
                        formUpdateCine(campodeActualizar, cine, restarTableFunctions)
                    } catch(err){
                        console.log('Error en el metodo leer primero para actualizar de dashboard', err)
                    }
                })
            })
            // Ver detalles del cine
            const verDetalles = document.querySelectorAll('.btnVermas')
            const campoDetalle = document.getElementById('Vercine')
            verDetalles.forEach(btn=>{
                btn.addEventListener('click',async(regid)=>{
                    console.log('epa')
                    try{
                        const id = regid.target.getAttribute('regid')
                        console.log(id)
                        const cine = await getBy('/cinema/readBy/', id)
                        detailsCine(campoDetalle,cine,restarTableFunctions)
                    }catch(err){

                    }
                })
            })              
        }
     
        

        restarTableFunctions()
    }catch(err){
        console.log('error en el get de cines al hacer click en el boton cines')
    }
})

// DASHBOARD FUNCIONES

funtionBtn.addEventListener('click', (event)=>{
    event.preventDefault()
    try{
        async function restarTableCines() {
            const resultado =  await get('/function/read')
            const contenido = resultado.map(data => 
                rowsTableFunctions(data)   
            ).join('');
            rowAndHeadTableFunctions(contenido,mainDinamic)

            // Agregar un Nuevo cine
            const btnAgregar = document.getElementById('btnAgregar')
            const agregarFunction = document.getElementById('Agregar')
            if(btnAgregar && agregarFunction){
                btnAgregar.addEventListener('click', async(event)=>{
                    event.preventDefault()
                    formFunctionRegister(agregarFunction, restarTableCines); 

                })
            }else{
                console.log('No existen los botones')
            }
            // Eliminar cine
            const btnDelete = document.querySelectorAll('.btnDelete')
            btnDelete.forEach(btn =>{
                btn.addEventListener('click',async (even)=>{
                    const id = even.target.getAttribute('regid')
                    console.log(id)
                    try{
                        const resultado = await remove(`/cinema/deleate/`, id)
                        console.log(resultado)
                        restarTableCines()
                    }catch(err){
                        console.log('Error en el metodo eliminar de dashboard', err)
                    }
                })
            })
            // Actualizar un cine
            const btnAcutalizar = document.querySelectorAll('.btnUpdate')
            const campodeActualizar = document.getElementById('Actualizar')
            btnAcutalizar.forEach(btn=>{
                btn.addEventListener('click', async(regid)=>{
                   try{
                        const id = regid.target.getAttribute('regid')
                        console.log(id)
                        const cine = await getBy('/cinema/readBy/', id)
                        console.log(cine) 
                        formUpdateCine(campodeActualizar, cine, restarTableCines)
                    } catch(err){
                        console.log('Error en el metodo leer primero para actualizar de dashboard', err)
                    }
                })
            })
            // Ver detalles del cine
            const verDetalles = document.querySelectorAll('.btnVermas')
            const campoDetalle = document.getElementById('Vercine')
            verDetalles.forEach(btn=>{
                btn.addEventListener('click',async(regid)=>{
                    console.log('epa')
                    try{
                        const id = regid.target.getAttribute('regid')
                        console.log(id)
                        const cine = await getBy('/cinema/readBy/', id)
                        detailsCine(campoDetalle,cine,restarTableCines)
                    }catch(err){
                    }
                })
            })              
        }
     

        restarTableCines()
    }catch(err){
        console.log('error en el get de cines al hacer click en el boton cines')
    }
})




