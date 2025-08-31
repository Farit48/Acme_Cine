
const path = 'http://localhost:3002'



// Se crea funcion post para modularizar el codigo 
export  async function post(endPont, data){
    try{
        const token = localStorage.getItem('token'); 
        const solicitud = await fetch(`${path}${endPont}`, 
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            }
        )
        if(solicitud.ok && solicitud.status === 200) {
            return await solicitud.json()
        }else{   
            switch (solicitud.status) {
                case 401:
                    return alert('Error de validacion');
                    break;
                case 500:
                    return alert('Error del servidor')
                default:
                    return alert('Ocurrió un error. Inténtelo de nuevo más tarde.');
            }
        }
    }catch(err){
         console.log('Error en server.js', err)
    }
    
}

export async function put(endPont, id, data){
    try{
        console.log(data)
        const token = localStorage.getItem('token'); 
        const solicitud = await fetch(`${path}${endPont}${id}`,
            {
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify(data)
            }
            
        )
        if(solicitud.ok && solicitud.status === 200) {
            return await solicitud.json()
        }else{   
            switch (solicitud.status) {
                case 400:
                    return alert('Error al obtener usuarios');
                    break;
                default:
                    return alert('Ocurrió un error. Inténtelo de nuevo más tarde.');
            }
        }
    }catch(err){
        console.log('Error en server.js', err)
    }
}

export  async function get(endPont){
    try{
        const token = localStorage.getItem('token'); 
        const solicitud = await fetch(`${path}${endPont}`,
            {
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        )
        if(solicitud.ok && solicitud.status === 200) {
            return await solicitud.json()
        }else{   
            switch (solicitud.status) {
                case 400:
                    return alert('Error al obtener usuarios');
                    break;
                default:
                    return alert('Ocurrió un error. Inténtelo de nuevo más tarde.');
            }
        }
    }catch(err){
        console.log('Error en server.js', err)
    }
}

export async function getBy(endPont,id){
    try{
        const token = localStorage.getItem('token'); 
        const solicitud = await fetch(`${path}${endPont}${id}`,
            {
              method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },  
            }
        );
        alert(solicitud.status)
        if(solicitud.ok && solicitud.status === 200) {
            return await solicitud.json()
        }else{   
            switch (solicitud.status) {
                case 400:
                    return alert('Error al obtener usuarios');
                    break;
                default:
                    return alert('Ocurrió un error. Inténtelo de nuevo más tarde.');
            }
        }
    }catch(err){
        console.log('Error en server.js', err)
    }
}

export async function remove(endPont, id) {
    try{
        const token = localStorage.getItem('token'); 
        const solicitud = await fetch(`${path}${endPont}${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        );
        if(solicitud.ok  && solicitud.status === 200){
            
            return await solicitud.json();
            
        } else {
            switch (solicitud.status) {
                case 500:
                    return alert('Error del servidor')
                default:
                    return alert('Ocurrió un error. Inténtelo de nuevo más tarde.');
            }
                }
    }catch(err){
        console.log('Error en server.js', err)
    }
}