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
                        <h1>Usuarios</h1>
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
                <div>
                    <button id="btnAgregar">Agregar Cine</button>
                </div>
        `
    contenedor.innerHTML = ConenidoMain;
}

export async function formRegisterCinema(contenedor, funcion) {
    // Arrays para almacenar múltiples salas y funciones
    const salas = [];
    let funcionesDeSala = [];

    // HTML inicial del formulario
    contenedor.innerHTML =
        `<div>
            <h2>Registro de Cine</h2>
            <table>
                <tbody>
                    <tr>
                        <td><p>Codigo</p></td>
                        <td><input type="text" id="codeCineRegister"></td>
                    </tr>
                    <tr>
                        <td><p>Nombre</p></td>
                        <td><input type="text" id="nameCineRegister"></td>
                    </tr>
                    <tr>
                        <td><p>Direccion</p></td>
                        <td><input type="tel" id="addressCineRegister"></td>
                    </tr>
                    <tr>
                        <td><p>Ciudad</p></td>
                        <td><input type="text" id="locationCineRegister"></td>
                    </tr>
                </tbody>
            </table>
            
            <h3>Salas y Funciones</h3>
            <div id="salasFormContainer"></div>
            
            <input type="button" id="addSalaBtn" value="Agregar Sala">
            <div id="ListaSalas"></div>

            <input type="button" name="btnEnviarRegistro" value="Enviar" id="btnEnviarRegistro">
        </div>`;
    
    // Contenedores
    const salasFormContainer = document.getElementById('salasFormContainer');
    const listaSalas = document.getElementById('ListaSalas');
    const addSalaBtn = document.getElementById('addSalaBtn');
    const btnEnviar = document.getElementById('btnEnviarRegistro');

    // Función para renderizar el formulario de salas y funciones
    const renderSalaForm = () => {
        // Reinicia las funciones para la nueva sala
        funcionesDeSala = []; 
        salasFormContainer.innerHTML = `
            <h3>Nueva Sala</h3>
            <table>
                <tbody>
                    <tr>
                        <td><p>Codigo de Sala</p></td>
                        <td><input type="text" id="codeSalaRegister"></td>
                    </tr>
                    <tr>
                        <td><p>Total de Sillas</p></td>
                        <td><input type="number" id="chairsSalaRegister"></td>
                    </tr>
                </tbody>
            </table>
            <div id="funcionesFormContainer"></div>
            <div id="ListaFunciones"></div>
            <input type="button" id="addFuncionBtn" value="Agregar Funcion">
            <input type="button" id="saveSalaBtn" value="Guardar Sala">
        `;

        const funcionesFormContainer = document.getElementById('funcionesFormContainer');
        const listaFunciones = document.getElementById('ListaFunciones');
        const addFuncionBtn = document.getElementById('addFuncionBtn');
        const saveSalaBtn = document.getElementById('saveSalaBtn');

        // Evento para agregar funciones
        addFuncionBtn.addEventListener('click', () => {
            funcionesFormContainer.innerHTML = `
                <h3>Nueva Función</h3>
                <table>
                    <tbody>
                        <tr>
                            <td><p>Pelicula</p></td>
                            <td><input type="text" id="film"></td>
                        </tr>
                        <tr>
                            <td><p>Fecha</p></td>
                            <td><input type="date" id="dateFilm"></td>
                        </tr>
                    </tbody>
                </table>
                <input type="button" id="saveFuncionBtn" value="Guardar Función">
            `;
            
            const saveFuncionBtn = document.getElementById('saveFuncionBtn');
            saveFuncionBtn.addEventListener('click', () => {
                const film = document.getElementById('film').value;
                const dateFilm = document.getElementById('dateFilm').value;
                
                if (film && dateFilm) {
                    funcionesDeSala.push({ pelicula: film, fecha: dateFilm });
                    listaFunciones.innerHTML += `<p>Función agregada: ${film} el ${dateFilm}.</p>`;
                    document.getElementById('film').value = '';
                    document.getElementById('dateFilm').value = '';
                } else {
                    alert('Por favor, completa los campos de la función.');
                }
            });
        });

        // Evento para guardar la sala y sus funciones
        saveSalaBtn.addEventListener('click', () => {
            const codeSala = document.getElementById('codeSalaRegister').value;
            const chairsSala = document.getElementById('chairsSalaRegister').value;
            
            if (codeSala && chairsSala) {
                salas.push({ codigo: codeSala, totalSillas: chairsSala, funciones: [...funcionesDeSala] });
                
                // Actualiza la visualización de salas
                listaSalas.innerHTML += `<p>Sala agregada: ${codeSala} (${chairsSala} sillas) con ${funcionesDeSala.length} funciones.</p>`;
                
                // Limpia el formulario de salas y funciones
                salasFormContainer.innerHTML = '';
            } else {
                alert('Por favor, completa los campos de la sala.');
            }
        });
    };

    // Evento inicial para mostrar el formulario de sala
    addSalaBtn.addEventListener('click', renderSalaForm);

    // Lógica para el botón de enviar final
    btnEnviar.addEventListener('click', async () => {
        const baseData = {
            codigo: document.getElementById('codeCineRegister').value,
            nombre: document.getElementById('nameCineRegister').value,
            direccion: document.getElementById('addressCineRegister').value,
            ciudad: document.getElementById('locationCineRegister').value,
            salas: salas 
        };
        const result = await post('/cinema/register', baseData);
        console.log(result);
        await funcion();
    });
}
export async function formUpdateCinema(contenedor,result, id, funcion){
    
  
    const salasHtml = result.salas.map(sala => {

       
        const funcionesHtml = sala.funciones.map(func => `
            <tr>
                <td id="Funcio_pelicula">${func.pelicula}</td>
                <td id="Funcio_fecha">${func.fecha}</td>
                <td><button class="btnDelete" regid="${result._id}">-</button></td>
                <td><button class="btnUpdate" regid="${result._id}">Actualizar</button></td>
            </tr>
        `).join(''); 

        
        return `
            <tr>
                <td id="sala_codigo">${sala.codigo}</td>
                <td id="sala_totalsillas">${sala.totalSillas}</td>
                
                <td>
                    <table>
                        <thead>
                            <tr>
                                <th>pelicula</th>
                                <th>fecha</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${funcionesHtml}
                        </tbody>
                    </table>
                </td>
                <td><button class="btnDelete" regid="${result._id}">-</button></td>
                <td><button class="btnUpdate" regid="${result._id}">Actualizar</button></td>
            </tr>
        `;
    }).join(''); 

   
    contenedor.innerHTML = `
         <div>
            <h2>Actualizar Datos del Cine</h2>
            <table>
                <tbody>
                    <tr>
                        <td><p>Codigo actual (${result.codigo})</p></td>
                        <td><input id="newCodeCinemaUpdate" type="text"></td>
                    </tr>
                    <tr>
                        <td><p>Nombre actual (${result.nombre})</p></td>
                        <td><input type="text" id="nameCinemaUpdate" name="nameCinemaUpdate"></td>
                    </tr>
                    <tr>
                        <td><p>Direccion actual (${result.direccion})</p></td>
                        <td><input type="tel" id="addressCinemaUpdate" name="addressCinemaUpdate"></td>
                    </tr>
                    <tr>
                        <td><p>Ciudad actual (${result.ciudad})</p></td>
                        <td><input type="text" id="locationCinemaUpdate" name="locationCinemaUpdate"></td>
                    </tr>
                </tbody>
            </table>

            <h2>Salas actuales</h2>
            <table>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Total sillas</th>
                        <th>Funciones</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${salasHtml}
                </tbody>
            </table>
            
            <input type="button" name="btnEnviarUpdate" value="Enviar nuevos datos" id="btnEnviarUpdate">
        </div>
    `;
    const btnenviarUpdate = document.getElementById('btnEnviarUpdate')
    btnenviarUpdate.addEventListener('click', async(event)=>{
        event.preventDefault()
        const dataNueva = {
            codigo:document.getElementById('newCodeCinemaUpdate').value,
            nombre:document.getElementById('nameCinemaUpdate').value,
            direccion:document.getElementById('addressCinemaUpdate').value,
            ciudad:document.getElementById('locationCinemaUpdate').value,
            salas:[
                {
                    codigo:document.getElementById('sala_codigo').value,
                    totalSillas:document.getElementById('sala_totalsillas').value,
                    funciones:[
                        {
                            pelicula:document.getElementById('Funcio_pelicula').value,
                            fecha:document.getElementById('Funcio_fecha').value,
                        }
                    ]
                }
            ]
        }
        const  result = await put('/cinema/update/', id, dataNueva) 
        console.log(result)
        await funcion()
    })    

    
    
                    

}