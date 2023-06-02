import express from 'express'
import { getPokemons, getPokemonById, createPokemon, updatePokemon, deletePokemon } from '../Controllers/pokemonController.js'

const pokemonRouter = express.Router()

// Obtener todos los pokémon
pokemonRouter.get('/', getPokemons)

// Obtener un pokémon por su ID
pokemonRouter.get('/:id', getPokemonById)

// Crear un nuevo pokémon
pokemonRouter.post('/', createPokemon)

// Actualizar un pokémon existente
pokemonRouter.put('/:id', updatePokemon)

// Eliminar un pokémon existente
pokemonRouter.delete('/:id', deletePokemon)

export { pokemonRouter }
