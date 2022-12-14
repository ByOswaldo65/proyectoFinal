const express = require('express')
const empleados = express.Router()
const db = require('../config/database')

empleados.post('/agregar', async (req, res, next) => {
    const { nombre_empleado, apellidos_empleado, telefono_empleado, correo_empleado, direccion_empleado } = req.body

    if (nombre_empleado && apellidos_empleado && telefono_empleado && correo_empleado && direccion_empleado) {
        let query = "INSERT INTO empleados(nombre_empleado, apellidos_empleado, telefono_empleado, correo_empleado, direccion_empleado)"
        query += ` VALUES('${nombre_empleado}', '${apellidos_empleado}', ${telefono_empleado}, '${correo_empleado}', '${direccion_empleado}')`

        const rows = await db.query(query)

        if (rows.affectedRows == 1) {
            return res.status(200).json({code: 201, message: "Empleado agregado correctamente"})
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"})
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"})
})

empleados.put('/modificar', async (req, res, next) => {
    const { id_empleado, nombre_empleado, apellidos_empleado, telefono_empleado, correo_empleado, direccion_empleado } = req.body

    if (nombre_empleado && apellidos_empleado && telefono_empleado && correo_empleado && direccion_empleado) {
        let query = `UPDATE empleados SET nombre_empleado='${nombre_empleado}', apellidos_empleado='${apellidos_empleado}', `
        query += `telefono_empleado=${telefono_empleado}, correo_empleado='${correo_empleado}', direccion_empleado='${direccion_empleado}' WHERE id_empleado=${id_empleado}`

        const rows = await db.query(query)

        if (rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Empleado modificado correctamente"})
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"})
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"})
})

empleados.patch('/modificar/nombre', async (req, res, next) => {
    const { id_empleado, nombre_empleado } = req.body

    if (nombre_empleado) {
        const query = `UPDATE empleados SET nombre_empleado='${nombre_empleado}' WHERE id_empleado=${id_empleado}`

        const rows = await db.query(query)

        if (rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Nombre modificado correctamente"})
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"})
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"})
})

empleados.patch('/modificar/apellidos', async (req, res, next) => {
    const { id_empleado, apellidos_empleado } = req.body

    if (apellidos_empleado) {
        const query = `UPDATE empleados SET apellidos_empleado='${apellidos_empleado}' WHERE id_empleado=${id_empleado}`

        const rows = await db.query(query)

        if (rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Apellidos modificados correctamente"})
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"})
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"}) 
})

empleados.patch('/modificar/telefono', async (req, res, next) => {
    const { id_empleado, telefono_empleado } = req.body

    if (telefono_empleado) {
        const query = `UPDATE empleados SET telefono_empleado='${telefono_empleado}' WHERE id_empleado=${id_empleado}`

        const rows = await db.query(query)

        if (rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Teléfono modificado correctamente"})
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"})
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"}) 
})

empleados.patch('/modificar/correo', async (req, res, next) => {
    const { id_empleado, correo_empleado } = req.body

    if (correo_empleado) {
        const query = `UPDATE empleados SET correo_empleado='${correo_empleado}' WHERE id_empleado=${id_empleado}`

        const rows = await db.query(query)

        if (rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Correo modificado correctamente"})
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"})
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"}) 
})

empleados.patch('/modificar/direccion', async (req, res, next) => {
    const { id_empleado, direccion_empleado } = req.body

    if (direccion_empleado) {
        const query = `UPDATE empleados SET direccion_empleado='${direccion_empleado}' WHERE id_empleado=${id_empleado}`

        const rows = await db.query(query)

        if (rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Dirección modificada correctamente"})
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"})
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"}) 
})

empleados.delete('/eliminar', async (req, res, next) => {
    const { id_empleado } = req.body

    const query = `DELETE FROM empleados WHERE id_empleado=${id_empleado}`

    const rows = await db.query(query)

    if (rows.affectedRows == 1) {
        return res.status(200).json({code: 200, message: "Empleado eliminado correctamente"})
    }
    return res.status(404).json({code: 404, message: "Empleado no encontrado"})
})

empleados.get('/mostrar', async (req, res, next) => {
    const mostrar = await db.query("SELECT * FROM empleados")
    return res.status(200).json({code: 200, message: mostrar})
})

module.exports = empleados