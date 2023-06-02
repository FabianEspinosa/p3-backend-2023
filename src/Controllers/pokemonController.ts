import { PrismaClient, Pokemon } from '@prisma/client'
const prisma = new PrismaClient()

export const getPokemons = async (req, res) => {
  try {
    const pokemons: Pokemon[] = await prisma.pokemon.findMany()
    res.json(pokemons)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pokémon.' })
  }
}

export const getPokemonById = async (req, res) => {
  const { id } = req.params

  try {
    const pokemon: Pokemon | null = await prisma.pokemon.findUnique({
      where: { id: parseInt(id) },
    })

    if (pokemon) {
      res.json(pokemon)
    } else {
      res.status(404).json({ error: 'Pokémon no encontrado.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el pokémon.' })
  }
}

export const createPokemon = async (req, res) => {
  const { name, level, trainerId } = req.body

  try {
    const pokemon: Pokemon = await prisma.pokemon.create({
      data: { name, level, trainerId },
    })
    res.json(pokemon)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el pokémon.' })
  }
}

export const updatePokemon = async (req, res) => {
  const { id } = req.params
  const { name, level, trainerId } = req.body

  try {
    const updatedPokemon: Pokemon | null = await prisma.pokemon.update({
      where: { id: parseInt(id) },
      data: { name, level, trainerId },
    })

    if (updatedPokemon) {
      res.json(updatedPokemon)
    } else {
      res.status(404).json({ error: 'Pokémon no encontrado.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el pokémon.' })
  }
}

export const deletePokemon = async (req, res) => {
  const { id } = req.params

  try {
    const deletedPokemon: Pokemon | null = await prisma.pokemon.delete({
      where: { id: parseInt(id) },
    })

    if (deletedPokemon) {
      res.json(deletedPokemon)
    } else {
      res.status(404).json({ error: 'Pokémon no encontrado.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el pokémon.' })
  }
}
