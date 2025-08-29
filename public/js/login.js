import {post} from './servers.js'

const inicioSesion = document.getElementById('btnLogin');

inicioSesion.addEventListener('click', async (event) => {
    event.preventDefault();

    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    if (!user || !password) {
        alert('Debe ingresar datos');
        return; 
    }

    const data = { user, password };
 
    try {
        const resultado =  await post('/log/login', data)
        console.log(resultado);
        localStorage.setItem('token', resultado.token);
        localStorage.setItem('dataUser', JSON.stringify(resultado.userData));
        window.location.href = '/views/dashboard.html';
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        alert('No se pudo conectar con el servidor.');
    }
});