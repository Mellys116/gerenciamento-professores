import express from "express";
import professorRoutes from "./routes/professorRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/professores", professorRoutes);

app.listen(PORT, () => {
  console.log(`Servidor a rodar em http://localhost:${PORT}`);
});