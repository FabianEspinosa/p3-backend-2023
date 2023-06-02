import express from 'express'
import { getMoves, getMoveById, createMove, updateMove, deleteMove } from '../Controllers/moveController.js'

const moveRouter = express.Router()

// Obtener todos los movimientos
moveRouter.get('/', getMoves)

// Obtener un movimiento por su ID
moveRouter.get('/:id', getMoveById)

// Crear un nuevo movimiento
moveRouter.post('/', createMove)

// Actualizar un movimiento existente
moveRouter.put('/:id', updateMove)

// Eliminar un movimiento existente
moveRouter.delete('/:id', deleteMove)

export { moveRouter }
