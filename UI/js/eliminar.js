window.onload = init 

function init() {
    if (localStorage.getItem("token")) {
        cargarEmpleados()
    }
}

function cargarEmpleados() {
    axios({
        method: 'get',
        url: 'http://localhost:3000/empleados/mostrar',
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        }
    }).then(function(res) {
        console.log(res)
        mostrarEmpleado(res.data.message)
        elegirEmpleado(res.data.message)
        almacenarEmpleado()
    }).catch(function(err) {
        console.log(err)
    })
}

function eliminarEmpleado(id) {
    axios({
        method: 'delete', 
        url: 'http://localhost:3000/empleados/eliminar',
        data: {
            id_empleado: id
        },
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        }
    }).then(function(res) {
        console.log(res) 
        alert("Empleado eliminado correctamente")
    }).catch(function(err) {
        console.log(err)
    })
}

function mostrarEmpleado(empleados) {
    const $select = document.getElementById('elegir')  
    for (let i = 0; i < empleados.length; i++) {
        const option = document.createElement('option')
        const valor = empleados[i].id_empleado
        option.value = valor
        option.text = valor
        $select.appendChild(option)
    }
}

function elegirEmpleado(empleados) {
    document.getElementById('elegir').addEventListener("change", function() {
        mostrarDatos(empleados)
    })
}

function mostrarDatos(empleados) {
    const $nombre = document.getElementById('inputNombre')
    const $apellidos = document.getElementById('inputApellidos')
    const $telefono = document.getElementById('inputNumero')
    const $correo = document.getElementById('inputCorreo')
    const $direccion = document.getElementById('inputDireccion')

    const $select = document.getElementById('elegir')
    const indice = $select.selectedIndex
    
    if (indice === -1) return

    const opcionSeleccionada = $select.options[indice].value
   
    if (opcionSeleccionada == empleados[indice - 1].id_empleado) {
        const nombre = empleados[indice - 1].nombre_empleado
        const apellidos = empleados[indice - 1].apellidos_empleado
        const telefono = empleados[indice - 1].telefono_empleado
        const correo = empleados[indice - 1].correo_empleado
        const direccion = empleados[indice - 1].direccion_empleado

        $nombre.value = nombre
        $apellidos.value = apellidos
        $telefono.value = telefono
        $correo.value = correo
        $direccion.value = direccion
    }
}

function almacenarEmpleado() {
    const $select = document.getElementById('elegir')

    var indiceId = $select.selectedIndex
    var id = $select.options[indiceId].value

    document.getElementById('elegir').addEventListener('change', function() {
        indiceId = $select.selectedIndex
        id = $select.options[indiceId].value

        if (indiceId === - 1) return
    })

    document.querySelector('.btn-primario').addEventListener('click', function() {
        const $nombre = document.getElementById('inputNombre')
        const $apellidos = document.getElementById('inputApellidos')
        const $telefono = document.getElementById('inputNumero')
        const $correo = document.getElementById('inputCorreo')
        const $direccion = document.getElementById('inputDireccion')

        indiceId = $select.selectedIndex
        id = $select.options[indiceId].value
        if (indiceId == 0) {
            alert("Selecciona un empleado")
        }
        else {
            eliminarEmpleado(id)
            $select.remove(indiceId);
            $select.selectedIndex = "Selecciona un empleado"
            indiceId = 0
            $nombre.value = null
            $apellidos.value = null
            $telefono.value = null
            $correo.value = null
            $direccion.value = null
        }
    })
}