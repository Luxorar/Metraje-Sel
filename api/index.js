import dns from "node:dns";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import metrajesRoutes from "./routes/Metrajes.js";

// Solo en local: usar DNS de Google/Cloudflare para resolver mongodb+srv
if (!process.env.VERCEL) {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API funcionando"));
app.use("/api/metrajes", metrajesRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongo conectado"))
  .catch((err) => console.error("Error de Mongo:", err));

if (!process.env.VERCEL) {
  app.listen(process.env.PORT || 3000, () =>
    console.log("API en http://localhost:" + (process.env.PORT || 3000))
  );
}

export default app;