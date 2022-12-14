window.onload = init

function init() {
    document.querySelector('.btn-primario').addEventListener('click', login)
}

function login() {
    var correo = document.getElementById('inputCorreo').value
    var contrasena = document.getElementById('inputContraseña').value

    axios({
        method: 'post',
        url: 'http://localhost:3000/empleadosAuth/login',
        data: {
            correo_empleado: correo, 
            contrasena_empleado: contrasena
        }
    }).then(function(res) {
        if (res.data.code === 200) {
            localStorage.setItem("token", res.data.message)
            window.location.href = "menu.html"
        }
        else if (res.data.code === 500) {
            alert("Campos incompletos")
        }
        else {
            alert("Usuario y/o contraseña incorrectos")
        }
    }).catch(function(err) {
        console.log(err)
    })
}