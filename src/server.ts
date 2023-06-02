import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { trainerRouter } from './Routes/trainer.js'
import { pokemonRouter } from './Routes/pokemon.js'
import { moveRouter } from './Routes/move.js'
import { teamRouter } from './Routes/team.js'

const app = express()
const { SERVER_PORT } = process.env
app.use(morgan('dev'))
app.use(cors())
// Middleware para el manejo de datos JSON
app.use(express.json())

// Rutas principales
app.use('/trainers', trainerRouter)
app.use('/pokemon', pokemonRouter)
app.use('/moves', moveRouter)
app.use('/teams', teamRouter)

// Iniciar el servidor
app.listen(SERVER_PORT, () => {
  console.log(`Pokemon tournament API listening on: ${SERVER_PORT}`)
})
