const dataUser = JSON.parse(localStorage.getItem('dataUser'))

const nameUser = document.getElementById('name')
nameUser.innerHTML = dataUser.name

const rolUser = document.getElementById('rol')
rolUser.innerHTML = dataUser.rol

const emailUser = document.getElementById('email')
emailUser.innerHTML = dataUser.email