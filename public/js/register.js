const btnEnviarRegistro = document.getElementById('btnEnviarRegistro')

btnEnviarRegistro.addEventListener('click', async(event)=>{
    event.preventDefault()

    const data = {
        name:document.getElementById('name').value,
        gender:document.getElementById('gender').value,
        phone:document.getElementById('phone').value,
        email:document.getElementById('email').value,
        password:document.getElementById('password').value,
    }

    const post = await fetch('http://localhost:3002/user/register', 
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        }
    )
    const response = await post.json();

    if(post.ok){
        console.log('Usuario registrado con éxito:', response);
        // Puedes agregar una redirección o un mensaje de éxito
        alert('Usuario creado correctamente');
    } else {
        console.error('Error al registrar usuario:', response);
        // Muestra el mensaje de error del servidor al usuario
        alert(`Error: ${response.message}`);
    }
})