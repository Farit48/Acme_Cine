const inicioSesion = document.getElementById('btnLogin')




inicioSesion.addEventListener('click', async(event)=>{
    event.preventDefault();

    const data = {
        user:document.getElementById('user').value,
        password:document.getElementById('password').value
    };
   

    const post =  await fetch('http://localhost:3002/user/login', 
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }
        
    );
    
   
    if(post.ok){
        const result = await post.json()
        localStorage.setItem('token', result.token)
        window.location.href = '/views/registro.html'
    }
});