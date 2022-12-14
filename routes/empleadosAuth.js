const express = require('express')

const jwt = require('jsonwebtoken')

const empleadosAuth = express.Router()
const db = require('../config/database')

empleadosAuth.post('/login', async (req, res, next) => {
    const { correo_empleado, contrasena_empleado } = req.body
    const query = `SELECT * FROM empleados_autorizados WHERE correo_empleado = '${correo_empleado}' AND contrasena_empleado = '${contrasena_empleado}'`
    const rows = await db.query(query)

    if (correo_empleado && contrasena_empleado) {
        if (rows.length == 1) {
            const token = jwt.sign({
                id_empleado: rows[0].id_empleado, 
                correo_empleado: rows[0].correo_empleado
            }, "debugkey")
            return res.status(200).json({code: 200, message: token})
        }
        else {
            return res.status(200).json({code: 401, message: "Usuario y/o contraseña incorrectos"})
        }
    }
    return res.status(200).json({code: 500, message: "Campos incompletos"})
})

module.exports = empleadosAuth