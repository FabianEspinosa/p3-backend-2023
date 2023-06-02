import { PrismaClient, Trainer } from '@prisma/client'
const prisma = new PrismaClient()

export const getTrainers = async (req, res) => {
  try {
    const trainers: Trainer[] = await prisma.trainer.findMany()
    res.json(trainers)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los entrenadores.' })
  }
}

export const createTrainer = async (req, res) => {
  const { name, hometown } = req.body

  try {
    const trainer: Trainer = await prisma.trainer.create({
      data: { name, hometown },
    })
    res.json(trainer)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el entrenador.' })
  }
}

export const getTrainerById = async (req, res) => {
  const { id } = req.params

  try {
    const trainer: Trainer | null = await prisma.trainer.findUnique({
      where: { id: parseInt(id) },
    })

    if (trainer) {
      res.json(trainer)
    } else {
      res.status(404).json({ error: 'Entrenador no encontrado.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el entrenador.' })
  }
}

export const updateTrainer = async (req, res) => {
  const { id } = req.params
  const { name, hometown } = req.body

  try {
    const updatedTrainer: Trainer | null = await prisma.trainer.update({
      where: { id: parseInt(id) },
      data: { name, hometown },
    })

    if (updatedTrainer) {
      res.json(updatedTrainer)
    } else {
      res.status(404).json({ error: 'Entrenador no encontrado.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el entrenador.' })
  }
}

export const deleteTrainer = async (req, res) => {
  const { id } = req.params

  try {
    const deletedTrainer: Trainer | null = await prisma.trainer.delete({
      where: { id: parseInt(id) },
    })

    if (deletedTrainer) {
      res.json(deletedTrainer)
    } else {
      res.status(404).json({ error: 'Entrenador no encontrado.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el entrenador.' })
  }
}
