import { PrismaClient, Move } from '@prisma/client'
const prisma = new PrismaClient()

export const getMoves = async (req, res) => {
  try {
    const moves: Move[] = await prisma.move.findMany()
    res.json(moves)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los movimientos.' })
  }
}

export const getMoveById = async (req, res) => {
  const { id } = req.params

  try {
    const move: Move | null = await prisma.move.findUnique({
      where: { id: parseInt(id) },
    })

    if (move) {
      res.json(move)
    } else {
      res.status(404).json({ error: 'Movimiento no encontrado.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el movimiento.' })
  }
}

export const createMove = async (req, res) => {
  const { name, power, pokemonId } = req.body

  try {
    const move: Move = await prisma.move.create({
      data: { name, power, pokemonId },
    })
    res.json(move)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el movimiento.' })
  }
}

export const updateMove = async (req, res) => {
  const { id } = req.params
  const { name, power, pokemonId } = req.body

  try {
    const updatedMove: Move | null = await prisma.move.update({
      where: { id: parseInt(id) },
      data: { name, power, pokemonId },
    })

    if (updatedMove) {
      res.json(updatedMove)
    } else {
      res.status(404).json({ error: 'Movimiento no encontrado.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el movimiento.' })
  }
}

export const deleteMove = async (req, res) => {
  const { id } = req.params

  try {
    const deletedMove: Move | null = await prisma.move.delete({
      where: { id: parseInt(id) },
    })

    if (deletedMove) {
      res.json(deletedMove)
    } else {
      res.status(404).json({ error: 'Movimiento no encontrado.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el movimiento.' })
  }
}
