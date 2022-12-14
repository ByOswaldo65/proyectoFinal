window.onload = init

function init() {
    if (localStorage.getItem("token")) {
        document.querySelector('.btn-primario').addEventListener('click', agregarEmpleado)
    }
    else {
        window.location.href = "login.html"
    }
}

function agregarEmpleado() {
    var nombre = document.getElementById('inputNombre').value
    var apellidos = document.getElementById('inputApellidos').value
    var telefono = document.getElementById('inputNumero').value
    var correo = document.getElementById('inputCorreo').value
    var direccion = document.getElementById('inputDireccion').value
    
    if (!nombre.length == 0 && !apellidos.length == 0 && !telefono.length == 0 && !correo.length == 0 && !direccion.length == 0) {
        var numero = parseInt(telefono)
        if ((validarNumero(numero)) && (validarEmail(correo))) {
            axios({
                method: 'post', 
                url: 'http://localhost:3000/empleados/agregar',
                data: {
                    nombre_empleado: nombre,
                    apellidos_empleado: apellidos,
                    telefono_empleado: telefono, 
                    correo_empleado: correo,
                    direccion_empleado: direccion
                },
                headers: {
                    'Authorization': "bearer " + localStorage.getItem("token")
                }
            }).then(function(res) {
                console.log(res)
                alert("Empleado agregado correctamente")
            }).catch(function(err) {
                console.log(err)
            })
        }
    } 
    else {
        alert("Campos incompletos")
    }
}

function validarNumero(valor) {
    var numero = parseInt(valor)

    if ((Number.isInteger(numero))) {
        return true
    } 
    else {
        alert("Ingresa un teléfono válido");
    }
}

function validarEmail(valor) {
    var correo = valor.toString()
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

    if (emailRegex.test(correo)){
        return true
    } 
    else {
        alert("Ingresa un correo válido");
    }
}