import express from 'express'
import { getTeams, getTeamById, getTeamsByTrainerId, createTeam, updateTeam, deleteTeam, addPokemonToTeam, removePokemonFromTeam } from '../Controllers/teamController.js'

const teamRouter = express.Router()

// Obtener todos los equipos
teamRouter.get('/', getTeams)

// Obtener un equipo por su ID
teamRouter.get('/:id', getTeamById)

// Obtener equipos por el ID del entrenador
teamRouter.get('/byTrainer/:trainerId', getTeamsByTrainerId)

// Crear un nuevo equipo
teamRouter.post('/', createTeam)

// Agregar un Pokémon al equipo
teamRouter.post('/addPokemon', addPokemonToTeam)

// Eliminar un Pokémon del equipo
teamRouter.post('/removePokemon', removePokemonFromTeam)

// Actualizar un equipo existente
teamRouter.put('/:id', updateTeam)

// Eliminar un equipo existente
teamRouter.delete('/:id', deleteTeam)

export { teamRouter }
