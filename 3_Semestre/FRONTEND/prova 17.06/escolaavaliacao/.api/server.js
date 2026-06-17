require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const professorRoutes = require("./src/routes/professor.routes");
const turmaRoutes = require("./src/routes/turma.routes");
const atividadeRoutes = require("./src/routes/atividade.routes");

app.use("/professor", professorRoutes);
app.use("/turma", turmaRoutes);
app.use("/atividade", atividadeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});