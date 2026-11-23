import dns from "node:dns";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import metrajesRoutes from "./routes/Metrajes.js";

// Solo en local: DNS de Google/Cloudflare para resolver mongodb+srv
if (!process.env.VERCEL) {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API funcionando"));
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Conexión reutilizable (necesaria en Vercel)
let conexion;
async function conectar() {
  if (mongoose.connection.readyState === 1) return;
  if (!conexion) {
    conexion = mongoose
      .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 })
      .catch((err) => {
        conexion = null;
        throw err;
      });
  }
  await conexion;
}

app.use(async (req, res, next) => {
  try {
    await conectar();
    next();
  } catch (err) {
    console.error("Error de Mongo:", err.message);
    res.status(500).json({ error: "No se pudo conectar a Mongo: " + err.message });
  }
});

app.use("/api/metrajes", metrajesRoutes);

if (!process.env.VERCEL) {
  app.listen(process.env.PORT || 3000, () =>
    console.log("API en http://localhost:" + (process.env.PORT || 3000))
  );
}

export default app;