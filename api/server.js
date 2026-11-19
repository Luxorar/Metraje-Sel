import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Metraje from './models/Metraje.js';
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/metrajes', async (_req, res) => {
  res.json(await Metraje.find().sort({ createdAt: 1 }));
});

app.post('/api/metrajes', async (req, res) => {
  try {
    res.status(201).json(await Metraje.create(req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete('/api/metrajes/:id', async (req, res) => {
  await Metraje.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

await mongoose.connect(process.env.MONGODB_URI);
app.listen(process.env.PORT, () => console.log('API lista en puerto', process.env.PORT));