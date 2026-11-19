import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import metrajesRoutes from "./routes/Metrajes.js";

app.use("/api/metrajes", metrajesRoutes);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API funcionando"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongo conectado"))
  .catch((err) => console.error("Error de Mongo:", err));

if (!process.env.VERCEL) {
  app.listen(process.env.PORT || 3000);
}

export default app;