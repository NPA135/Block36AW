const express = require('express');
const morgan = require('morgan');
const prisma = require('./prisma');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

// GET all players
app.get('/api/players', async (req, res) => {
  const players = await prisma.player.findMany();
  res.json(players);
});

// Create a new player
app.post('/api/players', async (req, res) => {
  const { name, status } = req.body;
  const player = await prisma.player.create({
    data: { name, status },
  });
  res.json(player);
});

// GET single player by ID
app.get('/api/players/:id', async (req, res) => {
  const { id } = req.params;
  const player = await prisma.player.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(player);
});

// Update player status
app.put('/api/players/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const player = await prisma.player.update({
    where: { id: parseInt(id) },
    data: { status },
  });
  res.json(player);
});

// Delete player by ID
app.delete('/api/players/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.player.delete({
    where: { id: parseInt(id) },
  });
  res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
