
import { post, put, getBy } from "../servers.js";
export function rowsTableCinemas(data){
    return  data = 
            `<tr>
                <td>${data.codigo}</td>
                <td>${data.nombre}</td>
                <td>${data.direccion}</td>
                <td>${data.ciudad}</td>
                <td><button class="btnDelete" regid="${data._id}">-</button></td>
                <td><button class="btnUpdate" regid="${data._id}">Actualizar</button></td>
                <td><button class="btnVermas" regid="${data._id}">Ver Mas</button></td>
            </tr> `
}

export function rowAndHeadTableCinemas(rows,contenedor){
    const  ConenidoMain= `
                <table>    
                    <header>
                        <h1>Cines</h1>
                    </header>
                    <div>
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Direccion</th>
                                <th>Ciudad</th>
                                <th></th>
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
                <div id="Vercine" ></div>
                <div>
                    <button id="btnAgregar">Agregar Cine</button>
                </div>
        `
    contenedor.innerHTML = ConenidoMain;
}

export async function formCineRegister(campo, funcion) {
    const quitar = document.getElementById('btnAgregar')
    quitar.remove()
    campo.innerHTML = `
          <table class="table-Register">
                <thead>
                    <tr>
                        <th colspan="2">INGRESE LOS DATOS DEL CINE A REGISTRAR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr id="CampoCodeSalas">
                        <th>Codigo</th>
                        <td><input id="codeCinema" type="text" placeholder="Ingresar codigo de cine"></td>
                        
                    </tr>
                    <tr id="CampoChairSalas">
                        <th>Nombre</th>
                        <td><input id="nameCinema" type="text" placeholder="Ingresar nombre de cine"></td>
                        
                        
                    </tr>
                    <tr id="CampoMoreSalas">
                        <th>Direccion</th>
                        <td><input id="addressCinema" type="text" placeholder="Ingresar direccion de cine"></td>
                        
                        
                    </tr>
                    <tr id="AddFunctions">
                        <th>Ciudad</th>
                        <td><input id="locationCinema" type="text" placeholder="Ingresar ciudad de cine"></td>
                        
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="2">¿Desea registrar salas?</th>
                    </tr>
                    <tr>
                        <td><button id="salasSi" >SI</button></td>
                        <td><button id="salasNo" >NO</button></td>
                    </tr>
                </tfoot>
            </table>
            <div id="comfirmation"></div>
            
    `

    

    const salasNo = document.getElementById('salasNo')
    salasNo.addEventListener('click', ()=>{
        const cine = {
            codigo:document.getElementById('codeCinema').value,
            nombre:document.getElementById('nameCinema').value,
            direccion:document.getElementById('addressCinema').value,
            ciudad:document.getElementById('locationCinema').value,
            salas:[]
        }
        const comfirmation = document.getElementById('comfirmation')
        const pregunta = document.createElement('div')
        pregunta.innerHTML = `
                 <table id="table-Confirmation">
                    <thead>
                            <tr>
                               <th colspan="2" >Confirme la info antes de guardar</th>
                            </tr>
                    </thead> 
                    <tbody>
                            <tr>
                                <th>Codigo</th>
                                <td>${cine.codigo}</td>
                            </tr>
                            <tr>
                                <th>Nombre</th>
                                <td>${cine.nombre}</td>
                            </tr>
                            <tr>
                                <th>Nombre</th>
                                <td>${cine.direccion}</td>
                            </tr>
                            <tr>
                                <th>Nombre</th>
                                <td>${cine.ciudad}</td>
                            </tr>
                            <tr>
                                <th colspan="2">Sin Salas</th>
                            </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th><button id="Enviar" >Guardar</button></th>
                            <th><button id="Descartar" >Cancelar</button></th>
                        </tr>
                    </tfoot>
                </table>
        `
        comfirmation.append(pregunta)
        const enviar = document.getElementById('Enviar')
        enviar.addEventListener('click', async()=>{
            await post('/cinema/register', cine)
            funcion()
        })
        const cancelar = document.getElementById('Descartar')
        cancelar.addEventListener('click', async()=>{
            funcion()
        })
        
    })

  
    const salasSi = document.getElementById('salasSi')
    salasSi.addEventListener('click', ()=>{
        const cine = {
            codigo:document.getElementById('codeCinema').value,
            nombre:document.getElementById('nameCinema').value,
            direccion:document.getElementById('addressCinema').value,
            ciudad:document.getElementById('locationCinema').value,
            salas:[]
        }
        const btnNo = document.getElementById('salasNo')
        btnNo.remove()
        const th1 = document.createElement('th')
        const td1 = document.createElement('td')
        const th2 = document.createElement('th')
        const td2 = document.createElement('td')
        const btnMore = document.createElement('th')
        const btnFuntion = document.createElement('th')
        const campoCodeSalas = document.getElementById('CampoCodeSalas')
        const campoChairSalas = document.getElementById('CampoChairSalas')
        const campoMoreSalas = document.getElementById('CampoMoreSalas')
        
        th1.textContent = 'Codigo sala'
        td1.innerHTML = '<input id="codeSala" type="text" placeholder="Ingresar codigo de cine"></input>'
        th2.textContent = 'Numero sillas'
        td2.innerHTML = '<input id="numberChair" type="text" placeholder="Ingresar nombre de cine"></input>'
        btnMore.innerHTML = `<button id="moreRooms">Click para enviar sala</button><br>               
        <button id="enviar">Guardar</button>`
      
        campoCodeSalas.append(th1,td1)
        campoChairSalas.append(th2,td2)
        campoMoreSalas.append(btnMore)
        const moreRooms=document.getElementById('moreRooms')
        const addFunction = document.getElementById('funtions')
        if(moreRooms){
            moreRooms.addEventListener('click', ()=>{
                const dataActual = {
                    codigo:document.getElementById('codeSala').value,
                    totalSillas:document.getElementById('numberChair').value
                }
                cine.salas.push(dataActual)
                alert('se ah agregado sala correctamente')
                
            })
           

        }
        const enviar = document.getElementById('enviar')
        enviar.addEventListener('click', ()=>{
            let salas = cine.salas.map( sala =>{
                return sala =`<tr>
                        <td>${sala.codigo}</td>
                        <td>${sala.totalSillas}</td>
                    </tr>`
            }).join('')
            console.log(cine.salas)
            const comfirmation = document.getElementById('comfirmation')
            const pregunta = document.createElement('div')
            pregunta.innerHTML = `
                    <table id="table-Confirmation">
                        <thead>
                                <tr>
                                <th colspan="2" >Confirme la info antes de guardar</th>
                                </tr>
                        </thead> 
                        <tbody>
                                <tr>
                                    <th>Codigo</th>
                                    <td>${cine.codigo}</td>
                                </tr>
                                <tr>
                                    <th>Nombre</th>
                                    <td>${cine.nombre}</td>
                                </tr>
                                <tr>
                                    <th>Nombre</th>
                                    <td>${cine.direccion}</td>
                                </tr>
                                <tr>
                                    <th>Nombre</th>
                                    <td>${cine.ciudad}</td>
                                </tr>
                                <tr>
                                    <th colspan="2">Salas</th>
                                    ${salas}
                                </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th><button id="Enviar" >Guardar</button></th>
                                <th><button id="Descartar" >Cancelar</button></th>
                            </tr>
                        </tfoot>
                    </table>
            `
            comfirmation.append(pregunta)
            const enviar = document.getElementById('Enviar')
            enviar.addEventListener('click', async()=>{
                await post('/cinema/register', cine)
                funcion()
            })
            const cancelar = document.getElementById('Descartar')
            cancelar.addEventListener('click', async()=>{
                funcion()
            })
        }) 
        if(addFunction){
            addFunction.addEventListener('click')
        }
        
    })
    
}

export function formUpdateCine(campo, dataCine, funcion){
    const quitar = document.getElementById('btnAgregar')
    quitar.remove()
    campo.innerHTML= `
        <table>
            <thead>
                    <tr colspan="2" >Actualice los datos</tr>
            </thead>
            <tbody>
                    <tr>
                        <th>Codigo ${dataCine.codigo}</th>
                        <td><input id="newCode" type="text"></td>
                    </tr>
                    <tr>
                        <th>Nombre ${dataCine.nombre}</th>
                        <td><input id="newName" type="text"></td>
                    </tr>
                    <tr>
                        <th>Direccion ${dataCine.direccion}</th>
                        <td><input id="newAddress" type="text"></td>
                    </tr>
                    <tr>
                        <th>Ciudad ${dataCine.ciudad}</th>
                        <td><input id="newCity" type="text"></td>
                    </tr>
                    <tr>
                        <td id="showRoms">
                            <input id="newRooms" type="button" value="Salas">
                        </td>
                    </tr>
            </tbody>
           
            <tfoot>
                    <tr>
                        <td><button id="enviar" >Actualizar</button></td>
                        <td><button id="cancelar">Cancelar</button></td>
                    </tr>
            </tfoot>
        </table>
        <div id="comfirmation"></div>
    
    `
    const btnEnviar = document.getElementById('enviar')
    const newRooms = document.getElementById('newRooms')
    const cancelar = document.getElementById('cancelar')
    btnEnviar.addEventListener('click', ()=>{
        const data = {
            codigo:document.getElementById('newCode').value,
            nombre:document.getElementById('newName').value,
            direccion:document.getElementById('newAddress').value,
            ciudad:document.getElementById('newCity').value,
        }
        const confirmar = document.getElementById('comfirmation')
        confirmar.innerHTML = `
            <table>
                <thead>
                        <tr colspan="2" >Confirme los datos a actualizar</tr>
                </thead>
                <tbody>
                        <tr>
                            <th>Codigo</th>
                            <td>${data.codigo}</td>
                        </tr>
                        <tr>
                            <th>Nombre</th>
                            <td>${data.nombre}</td>
                        </tr>
                        <tr>
                            <th>Direccion</th>
                            <td>${data.direccion}</td>
                        </tr>
                        <tr>
                            <th>Ciudad</th>
                            <td>${data.ciudad}</td>
                        </tr>
                </tbody>
                <tfoot>
                        <tr>
                            <td><button id="enviar2" >Confirmar</button></td>
                            <td><button id="cancelar2">Cancelar</button></td>
                        </tr>
                </tfoot>
            </table>
        
        `
        const enviar = document.getElementById('enviar2')
        const cancelar = document.getElementById('cancelar2')

        cancelar.addEventListener('click', ()=>{
            funcion()
            
        })
        enviar.addEventListener('click', async()=>{
            await put('/cinema/update/', dataCine._id, data)
            funcion()
        })

        
    })

    newRooms.addEventListener('click',()=>{
        const addcampo = document.getElementById('showRoms')
        const showroms = dataCine.salas.map(sala=>{
            return sala = `
                <tr>
                    <td>${sala.codigo}</td>
                    <td>${sala.totalSillas}</td>
                </tr>
                <tr>
                    <td><input id="newRomCode" type="text" width="15px"></td>
                    <td><input id="newRomChair" type="number" width="15px"></td>
                </tr>
            `
        }).join('')
        addcampo.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>CODIGO</th>
                        <th>SILLAS</th>
                    </tr>
                </thead>
                <tbody>
                    ${showroms}
                </tbody>
            </table>
       `
       
        btnEnviar.addEventListener('click',()=>{
            const data = {
                codigo:document.getElementById('newCode').value,
                nombre:document.getElementById('newName').value,
                direccion:document.getElementById('newAddress').value,
                ciudad:document.getElementById('newCity').value,
                salas:[
                    {
                        codigo:document.getElementById('newRomCode').value,
                        totalSillas:document.getElementById('newRomChair').value
                    }
                ]
            }
            const salas = data.salas.map(sala=>{
                return sala = `
                    <tr>
                        <th>CODIGO</th>
                        <td>${sala.codigo}</td>
                        <th>SILLAS</th>
                        <td>${sala.totalSillas}</td>
                        
                    </tr>
                `
            }).join('')
            const confirmar = document.getElementById('comfirmation')
            confirmar.innerHTML = `
                <table>
                    <thead>
                            <tr colspan="2" >Confirme los datos a actualizar</tr>
                    </thead>
                    <tbody>
                            <tr>
                                <th>Codigo</th>
                                <td>${data.codigo}</td>
                            </tr>
                            <tr>
                                <th>Nombre</th>
                                <td>${data.nombre}</td>
                            </tr>
                            <tr>
                                <th>Direccion</th>
                                <td>${data.direccion}</td>
                            </tr>
                            <tr>
                                <th>Ciudad</th>
                                <td>${data.ciudad}</td>
                            </tr>
                            <tr>
                                <th>Salas</th>
                                ${salas}
                            </tr>
                    </tbody>
                    <tfoot>
                            <tr>
                                <td><button id="enviar2" >Confirmar</button></td>
                                <td><button id="cancelar2">Cancelar</button></td>
                            </tr>
                    </tfoot>
                </table>
            
            `
            const enviar = document.getElementById('enviar2')
            const cancelar = document.getElementById('cancelar2')

            cancelar.addEventListener('click', ()=>{
                funcion()
                
            })
            enviar.addEventListener('click', async()=>{
                await put('/cinema/update/', dataCine._id, data)
                funcion()
            })
        })
        

    })
    cancelar.addEventListener('click',()=>{
        funcion()
    })
}

export function detailsCine(campo,data,funcion){
    const salas = data.salas.map(sala =>{
        return sala = `
            <tr>
                <th>CODIGO</td>
                <td>${sala.codigo}</td>
                <td>SILLAS</td>
                <td>${sala.totalSillas}</td>
            </tr>
        `
    })
    
    campo.innerHTML = `
        <table>
            <thead>
                    <tr>Detalles del cine</tr>
            </thead>
            <tbody>
                    <tr>
                        <th>Codigo</th>
                        <td>${data.codigo}</td>
                    </tr>
                    <tr>
                        <th>Nombre</th>
                        <td>${data.nombre}</td>
                    </tr>
                    <tr>
                        <th>Direccion</th>
                        <td>${data.direccion}</td>
                    </tr>
                    <tr>
                        <th>Ciudad</th>
                        <td>${data.ciudad}</td>
                    </tr>
                    <tr>
                        <th colspan="2">Salas</th>
                        ${salas}
                    </tr>
            </tbody>
        </table>
        <button id="Volver">Volever</button>
    `
    const volver = document.getElementById('Volver')
    volver.addEventListener('click', ()=>{
        funcion()
    })
}