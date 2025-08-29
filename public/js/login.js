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
        const solicitud = await fetch('http://localhost:3002/log/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (solicitud.ok && solicitud.status === 200) {
            const result = await solicitud.json();
            console.log(result);
            localStorage.setItem('token', result.token);
            localStorage.setItem('dataUser', JSON.stringify(result.userData));
            window.location.href = '/views/dashboard.html';
        } else {
          
            switch (solicitud.status) {
                case 401:
                    alert('Usuario o contraseña incorrectos');
                    break;
                case 400:
                    alert('Faltan datos de usuario o contraseña'); 
                    break;
                case 500:
                    alert('Error del servidor')
                default:
                    alert('Ocurrió un error. Inténtelo de nuevo más tarde.');
            }
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        alert('No se pudo conectar con el servidor.');
    }
});