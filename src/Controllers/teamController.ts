import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getTeams = async (req, res) => {
  try {
    const teams = await prisma.team.findMany({
      include: {
        pokemons: true,
      },
    })
    res.json(teams)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los equipos.' })
  }
}

export const getTeamById = async (req, res) => {
  const { id } = req.params

  try {
    const team = await prisma.team.findUnique({
      where: { id: parseInt(id) },
      include: {
        pokemons: true,
      },
    })

    if (team) {
      res.json(team)
    } else {
      res.status(404).json({ error: 'Equipo no encontrado.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el equipo.' })
  }
}

export const getTeamsByTrainerId = async (req, res) => {
  const { trainerId } = req.params

  try {
    const teams = await prisma.team.findMany({
      where: { trainerId: parseInt(trainerId) },
      include: {
        pokemons: true,
      },
    })

    res.json(teams)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los equipos del entrenador.' })
  }
}

export const createTeam = async (req, res) => {
  const { name, trainerId } = req.body

  try {
    const team = await prisma.team.create({
      data: { name, trainerId: parseInt(trainerId) },
    })
    res.json(team)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el equipo.' })
  }
}

export const addPokemonToTeam = async (req, res) => {
  const { teamId, pokemonId } = req.body

  try {
    const team = await prisma.team.findUnique({
      where: { id: parseInt(teamId) },
      include: { pokemons: true },
    })

    if (!team) {
      return res.status(404).json({ error: 'Equipo no encontrado.' })
    }

    if (team.pokemons.length >= 6) {
      return res.status(400).json({ error: 'El equipo ya tiene 6 Pokémon. No se pueden agregar más.' })
    }

    const pokemon = await prisma.pokemon.findUnique({
      where: { id: parseInt(pokemonId) },
    })

    if (!pokemon) {
      return res.status(404).json({ error: 'Pokémon no encontrado.' })
    }

    const updatedTeam = await prisma.team.update({
      where: { id: parseInt(teamId) },
      data: { pokemons: { connect: { id: parseInt(pokemonId) } } },
    })

    res.json(updatedTeam)
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el Pokémon al equipo.' })
  }
}

export const removePokemonFromTeam = async (req, res) => {
  const { teamId, pokemonId } = req.body

  try {
    const team = await prisma.team.findUnique({
      where: { id: parseInt(teamId) },
      include: { pokemons: true },
    })

    if (!team) {
      return res.status(404).json({ error: 'Equipo no encontrado.' })
    }

    const pokemon = await prisma.pokemon.findUnique({
      where: { id: parseInt(pokemonId) },
    })

    if (!pokemon) {
      return res.status(404).json({ error: 'Pokémon no encontrado.' })
    }

    const updatedTeam = await prisma.team.update({
      where: { id: parseInt(teamId) },
      data: { pokemons: { disconnect: { id: parseInt(pokemonId) } } },
    })

    res.json(updatedTeam)
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el Pokémon del equipo.' })
  }
}

export const updateTeam = async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const team = await prisma.team.findUnique({
      where: { id: parseInt(id) },
    })

    if (!team) {
      return res.status(404).json({ error: 'Equipo no encontrado.' })
    }

    const updatedTeam = await prisma.team.update({
      where: { id: parseInt(id) },
      data: { name },
    })

    res.json(updatedTeam)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el equipo.' })
  }
}

export const deleteTeam = async (req, res) => {
  const { id } = req.params

  try {
    const deletedTeam = await prisma.team.delete({
      where: { id: parseInt(id) },
    })

    if (deletedTeam) {
      res.json(deletedTeam)
    } else {
      res.status(404).json({ error: 'Equipo no encontrado.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el equipo.' })
  }
}
