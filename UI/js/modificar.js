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
        almacenarEmpleado(res.data.message)
    }).catch(function(err) {
        console.log(err)
    })
}

function modificarEmpleadoCompleto(id, nombre, apellidos, telefono, correo, direccion) {
    axios({
        method: 'put', 
        url: 'http://localhost:3000/empleados/modificar',
        data: {
            id_empleado: id,
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
        alert("Empleado modificado correctamente")
    }).catch(function(err) {
        console.log(err)
    })
}

function modificarNombre(id, nombre) {
    axios({
        method: 'patch',
        url: 'http://localhost:3000/empleados/modificar/nombre',
        data: {
            id_empleado: id,
            nombre_empleado: nombre
        },
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        }
    }).then(function(res) {
        console.log(res)
        alert("Nombre modificado correctamente")
    }).catch(function(err) {
        console.log(err)
    })
}

function modificarApellidos(id, apellidos) {
    axios({
        method: 'patch',
        url: 'http://localhost:3000/empleados/modificar/apellidos',
        data: {
            id_empleado: id,
            apellidos_empleado: apellidos
        },
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        }
    }).then(function(res) {
        console.log(res)
        alert("Apellidos modificados correctamente")
    }).catch(function(err) {
        console.log(err)
    })
}

function modificarTelefono(id, telefono) {
    axios({
        method: 'patch',
        url: 'http://localhost:3000/empleados/modificar/telefono',
        data: {
            id_empleado: id,
            telefono_empleado: telefono
        },
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        }
    }).then(function(res) {
        console.log(res)
        alert("Teléfono modificado correctamente")
    }).catch(function(err) {
        console.log(err)
    })
}

function modificarCorreo(id, correo) {
    axios({
        method: 'patch',
        url: 'http://localhost:3000/empleados/modificar/correo',
        data: {
            id_empleado: id,
            correo_empleado: correo
        },
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        }
    }).then(function(res) {
        console.log(res)
        alert("Correo modificado correctamente")
    }).catch(function(err) {
        console.log(err)
    })
}

function modificarDireccion(id, direccion) {
    axios({
        method: 'patch',
        url: 'http://localhost:3000/empleados/modificar/direccion',
        data: {
            id_empleado: id,
            direccion_empleado: direccion
        },
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        }
    }).then(function(res) {
        console.log(res)
        alert("Dirección modificada correctamente")
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

function almacenarEmpleado(empleados) {
    const $select = document.getElementById('elegir')

    var indiceId = $select.selectedIndex
    var id = $select.options[indiceId].value

    var indice = $select.selectedIndex - 1
    var nombre = document.getElementById('inputNombre').value
    var apellidos = document.getElementById('inputApellidos').value
    var telefono = document.getElementById('inputNumero').value
    var correo = document.getElementById('inputCorreo').value
    var direccion = document.getElementById('inputDireccion').value

    document.getElementById('elegir').addEventListener('change', function() {
        indice = $select.selectedIndex - 1

        indiceId = $select.selectedIndex
        id = $select.options[indiceId].value

        if (indice === - 1) return

        nombre = document.getElementById('inputNombre').value
        apellidos = document.getElementById('inputApellidos').value
        telefono = document.getElementById('inputNumero').value
        correo = document.getElementById('inputCorreo').value
        direccion = document.getElementById('inputDireccion').value
    })

    document.querySelector('.btn-primario').addEventListener('click', function() {
        indiceId = $select.selectedIndex
        id = $select.options[indiceId].value
        nombre = document.getElementById('inputNombre').value
        apellidos = document.getElementById('inputApellidos').value
        telefono = document.getElementById('inputNumero').value
        correo = document.getElementById('inputCorreo').value
        direccion = document.getElementById('inputDireccion').value

        if (indiceId == 0) {
            alert("Selecciona un empleado")
        }
        else if (!(nombre.length == 0) && !(apellidos.length == 0) && !(telefono.length == 0) && !(correo.length == 0) && !(direccion.length == 0)) {
            if ((id == empleados[indice].id_empleado) && !(nombre == empleados[indice].nombre_empleado) && !(apellidos == empleados[indice].apellidos_empleado) 
            && !(telefono == empleados[indice].telefono_empleado) && !(correo == empleados[indice].correo_empleado) && !(direccion == empleados[indice].direccion_empleado)) {
                modificarEmpleadoCompleto(id, nombre, apellidos, telefono, correo, direccion)
                empleados[indice].nombre_empleado = nombre
                empleados[indice].apellidos_empleado = apellidos
                empleados[indice].telefono_empleado = telefono
                empleados[indice].correo_empleado = correo
                empleados[indice].direccion_empleado = direccion
            }    
            else if (!(nombre == empleados[indice].nombre_empleado)) {
                modificarNombre(id, nombre)
                empleados[indice].nombre_empleado = nombre
            }
            else if (!(apellidos == empleados[indice].apellidos_empleado)) {
                modificarApellidos(id, apellidos)
                empleados[indice].apellidos_empleado = apellidos
            }
            else if (!(telefono == empleados[indice].telefono_empleado)) {
                if (validarNumero(telefono)) {
                    modificarTelefono(id, telefono)
                    empleados[indice].telefono_empleado = telefono
                }  
            }
            else if (!(correo == empleados[indice].correo_empleado)) {
                if (validarEmail(correo)) {
                    modificarCorreo(id, correo)
                    empleados[indice].correo_empleado = correo
                }
            }
            else if (!(direccion == empleados[indice].direccion_empleado)) {
                modificarDireccion(id, direccion)
                empleados[indice].direccion_empleado = direccion
            }
            else {
                alert("Cambia los datos")
            }
        }
        else {
            alert("Campos incompletos")
        }
    })
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