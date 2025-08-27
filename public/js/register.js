const btnEnviarRegistro = document.getElementById('btnEnviarRegistro')

btnEnviarRegistro,addEventListener('click', async(event)=>{
    event.preventDefault()

    const data = {
        name:document.getElementById('name').value,
        gender:document.getElementById('gender').value,
        phone:document.getElementById('phone').value,
        email:document.getElementById('email').value,
    }

    const post = await fetch('http://localhost:3002/user/register', 
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`beare ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        }
    )
})