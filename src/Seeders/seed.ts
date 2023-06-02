import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    // Crear entrenador Red
    const red = await prisma.trainer.create({
      data: {
        name: "Red",
        hometown: "Pallet Town",
        teams: {
          create: [
            {
              name: "Red's Team 1",
              pokemons: {
                create: [
                  {
                    name: "Charizard",
                    level: 80,
                    trainer: { connect: { id: 1 } },
                    moves: {
                      create: [
                        { name: "Flamethrower", power: 95 },
                        { name: "Dragon Claw", power: 80 },
                        { name: "Earthquake", power: 100 },
                        { name: "Fire Blast", power: 110 },
                      ],
                    },
                  },
                  // Crear más pokémones con sus respectivos movimientos
                  {
                    name: "Pikachu",
                    level: 75,
                    trainer: { connect: { id: 1 } },
                    moves: {
                      create: [
                        { name: "Thunderbolt", power: 90 },
                        { name: "Quick Attack", power: 40 },
                        { name: "Iron Tail", power: 100 },
                        { name: "Volt Tackle", power: 120 },
                      ],
                    },
                  },
                  {
                    name: "Blastoise",
                    level: 82,
                    trainer: { connect: { id: 1 } },
                    moves: {
                      create: [
                        { name: "Hydro Pump", power: 110 },
                        { name: "Ice Beam", power: 95 },
                        { name: "Earthquake", power: 100 },
                        { name: "Focus Blast", power: 120 },
                      ],
                    },
                  },
                ],
              },
            },
            // Crear más equipos con pokémones y movimientos
          ],
        },
      },
    });

    console.log("Entrenador Red creado con éxito.");

    // Crear entrenador Blue
    const blue = await prisma.trainer.create({
      data: {
        name: "Blue",
        hometown: "Pallet Town",
        teams: {
          create: [
            {
              name: "Blue's Team 1",
              pokemons: {
                create: [
                  {
                    name: "Venusaur",
                    level: 80,
                    trainer: { connect: { id: 2 } },
                    moves: {
                      create: [
                        { name: "Solar Beam", power: 120 },
                        { name: "Sludge Bomb", power: 90 },
                        { name: "Giga Drain", power: 75 },
                        { name: "Sleep Powder", power: 0 },
                      ],
                    },
                  },
                  // Crear más pokémones con sus respectivos movimientos
                  {
                    name: "Alakazam",
                    level: 78,
                    trainer: { connect: { id: 2 } },
                    moves: {
                      create: [
                        { name: "Psychic", power: 90 },
                        { name: "Shadow Ball", power: 80 },
                        { name: "Thunder Punch", power: 75 },
                        { name: "Recover", power: 0 },
                      ],
                    },
                  },
                  {
                    name: "Gyarados",
                    level: 85,
                    trainer: { connect: { id: 2 } },
                    moves: {
                      create: [
                        { name: "Waterfall", power: 80 },
                        { name: "Earthquake", power: 100 },
                        { name: "Dragon Dance", power: 0 },
                        { name: "Outrage", power: 120 },
                      ],
                    },
                  },
                ],
              },
            },
            // Crear más equipos con pokémones y movimientos
          ],
        },
      },
    });

    console.log("Entrenador Blue creado con éxito.");

    // Cerrar la conexión de Prisma
    await prisma.$disconnect();
  } catch (error) {
    console.error("Error al crear los entrenadores:", error);
    process.exit(1);
  }
}

seed();
