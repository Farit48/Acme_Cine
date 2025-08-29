export default function enviarRegistro(btnName){
    const envio = document.getElementById(btnName)

    envio.addEventListener('click', async(event)=>{
        event.preventDefault()

        const data = {
            name:document.getElementById('nameRegister').value,
            gender:document.getElementById('genderRegister').value,
            phone:document.getElementById('phoneRegister').value,
            rol:document.getElementById('rolRegister').value,
            email:document.getElementById('emailRegister').value,
            password:document.getElementById('passwordRegister').value,
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
        

        if(post.ok  && post.status === 201){
            const response = await post.json();
            console.log('Usuario registrado con éxito:', response);
        
            alert('Usuario creado correctamente');
            
        } else {
          
            switch (post.status) {
                case 401:
                    alert('Datos erroneos');
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
    })
}

