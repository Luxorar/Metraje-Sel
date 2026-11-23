import { Router } from "express";
import Metraje from "../models/Metraje.js";

const router = Router();

// Listar todos
router.get("/", async (req, res) => {
  try {
    const metrajes = await Metraje.find().sort({ createdAt: -1 });
    res.json(metrajes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar uno
router.post("/", async (req, res) => {
  try {
    const nuevo = await Metraje.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar uno
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Metraje.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: "No encontrado" });
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;