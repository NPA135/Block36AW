const prisma = require("./index");

const seed = async () => {
  const players = [
    { name: 'Buddy', status: 'field' },
    { name: 'Max', status: 'bench' },
    { name: 'Bella', status: 'field' },
    { name: 'Lucy', status: 'bench' },
    { name: 'Charlie', status: 'field' },
    { name: 'Daisy', status: 'bench' },
    { name: 'Molly', status: 'field' },
    { name: 'Bailey', status: 'bench' },
    { name: 'Lola', status: 'field' },
    { name: 'Rocky', status: 'bench' },
  ];

  await prisma.player.createMany({
    data: players,
  });
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
