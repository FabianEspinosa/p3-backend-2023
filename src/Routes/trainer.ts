import express from 'express'
import { getTrainers, createTrainer, getTrainerById, updateTrainer, deleteTrainer } from '../Controllers/trainerController.js'

const trainerRouter = express.Router()

// Obtener todos los entrenadores
trainerRouter.get('/', getTrainers)

// Obtener un entrenador por su ID
trainerRouter.get('/:id', getTrainerById)

// Crear un nuevo entrenador
trainerRouter.post('/', createTrainer)

// Actualizar un entrenador existente
trainerRouter.put('/:id', updateTrainer)

// Eliminar un entrenador existente
trainerRouter.delete('/:id', deleteTrainer)

export { trainerRouter }
