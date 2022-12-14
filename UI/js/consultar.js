window.onload = init

function init() {
    cargarEmpleados()
}

function cargarEmpleados() {
    axios({
        method: 'get',
        url: 'http://localhost:3000/empleados/mostrar',
        headers: {
            'Authorization': "bearer " + localStorage.getItem('token')
        }
    }).then(function(res) {
        console.log(res)
        buscarEmpleado(res.data.message)
    }).catch(function(err) {
        console.log(err)
    })
}

function buscarEmpleado(empleados) {
    document.querySelector('.btn-primario').addEventListener('click', function() {
        const $buscar = document.getElementById('inputBuscar')
        const $apellidos = document.getElementById('inputApellidos')
        const $telefono = document.getElementById('inputNumero')
        const $correo = document.getElementById('inputCorreo')
        const $direccion = document.getElementById('inputDireccion')

        const nombre = $buscar.value

        var encontrado = false

        var apellidos 
        var telefono
        var correo 
        var direccion

        console.log(nombre)
        if (!(nombre.length == 0)) {
            for (let i = 0; i < empleados.length; i++) {
                console.log(empleados[i].nombre_empleado)
                if (nombre.toUpperCase() == empleados[i].nombre_empleado.toUpperCase()) {
                    encontrado = true
                    apellidos = empleados[i].apellidos_empleado
                    telefono = empleados[i].telefono_empleado
                    correo = empleados[i].correo_empleado
                    direccion = empleados[i].direccion_empleado
                }
            }
            if (encontrado) {
                $apellidos.value = apellidos
                $telefono.value = telefono
                $correo.value = correo
                $direccion.value = direccion
            }
            else {
                alert("Empleado no encontrado")
            }
        }
        else {
            alert("Ingresa un nombre")
        }
    })
}