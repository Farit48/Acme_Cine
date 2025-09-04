import { post, put, getBy } from "../servers.js";

export function rowsTableFunctions(data){
    return  data = 
            `<tr>
                <td>${data.Cine}</td>
                <td>${data.Sala}</td>
                <td>${data.Pelicula}</td>
                <td>${data.Fecha}</td>
                <td><button class="btnDelete" regid="${data._id}">-</button></td>
                <td><button class="btnUpdate" regid="${data._id}">Actualizar</button></td>
                <td><button class="btnVermas" regid="${data._id}">Ver Mas</button></td>
            </tr> `
}

export function rowAndHeadTableFunctions(rows,contenedor){
    const  ConenidoMain= `
                <table>    
                    <header>
                        <h1>FUnciones</h1>
                    </header>
                    <div>
                        <thead>
                            <tr>
                                <th>Cine</th>
                                <th>Sala</th>
                                <th>Pelicula</th>
                                <th>Fecha</th>
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
                <div id="Ver" ></div>
                <div>
                    <button id="btnAgregar">Agregar Funcion</button>
                </div>
        `
    contenedor.innerHTML = ConenidoMain;
}

export async function formFunctionRegister(campo, funcion) {
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
                        <th>Cine</th>
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
